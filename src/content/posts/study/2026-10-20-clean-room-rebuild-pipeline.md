---
title: clean-room-rebuild — pipeline reverse-engineer rồi rebuild theo kiểu clean-room, đóng gói thành Claude Code skill
date: 2026-10-20
tags: [clean-room, reverse-engineering, claude-code, skill, agent-pipeline, laya]
status: wip
tldr: >-
  Bốn vai, mỗi vai một quyền nhìn: REA (room A) đọc bản gốc → SPEC + EVIDENCE; spec gate chấm 4 check C1–C4
  bằng Laya chạy local; rebuilder (room B, session mới) chỉ thấy SPEC + ARCHITECTURE; tester viết test từ SPEC,
  mỗi rule 1 mutant phải bị bắt. EVIDENCE không bao giờ vào room B. Cổng pháp lý chạy trước mọi thứ.
---

## Bối cảnh

Muốn rebuild từng feature của một app mình **được phép phân tích** mà không để code gốc "rò" sang
bản mới. Mô hình clean-room kinh điển: người đọc bản gốc và người viết lại là hai người khác nhau,
chỉ nói chuyện qua bản spec. Áp lên agent: hai phòng, mỗi phòng một session, kèm một "gate" độc lập
ở giữa và một vòng test/mutation để chắc bản rebuild thật sự theo spec chứ không ăn may.

Đã đóng gói thành Claude Code skill `clean-room-rebuild`, gọi bằng `/clean-room-rebuild`.

## Bước 0 — Cổng pháp lý (bắt buộc, chạy trước mọi thứ)

Trước khi phân tích sâu phải xác định và báo lại:

1. Source là gì, của hãng nào (đọc metadata: `Info.plist` / manifest / `package.json` / headers).
2. License: open-source (MIT/GPL/Apache…), của chính mình, hay thương mại đóng.
3. EULA/ToS có cấm reverse engineer không.

Quy tắc dừng:

- **Open-source / của mình / được phép rõ ràng** → chạy đủ pipeline.
- **App đóng, thương mại, hoặc EULA cấm RE** → chỉ đọc cấu trúc lộ thiên (metadata, danh sách
  framework/lib, quyền/entitlements, endpoint domain). Không decompile, không rebuild. Nói rõ lý do,
  hỏi có đổi target không.
- Bất kể source nào: không trích xuất secret/token/khoá ký, không giúp vượt DRM/license.

Mỗi source mới lặp lại cổng này. Pipeline khả chuyển, nhưng "được chạy tới đâu" tuỳ source.

## Bốn vai, mỗi vai một quyền nhìn

| Vai | Được thấy | Không được thấy | Sinh ra |
|---|---|---|---|
| REA investigator (room A) | bản gốc, strings, pseudocode, trace | code rebuild | `SPEC.md`, `EVIDENCE.md`, `QUESTIONS.md` |
| Spec gate | `SPEC.md` + `EVIDENCE.md` | bản gốc, code rebuild | `GATE.json` |
| Rebuilder (room B, **session mới**) | `SPEC.md`, `ARCHITECTURE.md`, `tests/` | bản gốc, `EVIDENCE.md`, pseudocode | code trong `rebuild/` |
| Tester + mutator | `SPEC.md`, code rebuild | bản gốc, `EVIDENCE.md` | `tests/`, `mutants/`, `MUTATION.json` |

Ba nguyên tắc không phá:

1. **`EVIDENCE.md` không bao giờ vào room B.** Proof lẫn vào spec là clean-room mất hiệu lực.
2. Mỗi rule trong SPEC phải có evidence tương ứng (R1 ↔ E1). Rule không proof → gate trả về room A,
   không drop im lặng.
3. Test viết từ SPEC **trước khi** tester xem code rebuild; mỗi rule có đúng 1 mutant phải bị test bắt.

## Phân loại source → tool cho room A

- Web/website: REA page structure + JS bundle + HAR.
- Electron/JS: REA đọc `app.asar`, bundle, IPC, preload.
- Native (Mach-O / ELF / PE): REA + Ghidra (hoặc Hopper/IDA) lấy pseudocode + strings + xref.
- Android APK: REA + jadx/apktool.
- .NET: REA + .NET static viewer.

**Chỉ agent room A và tool ngoài đổi theo source.** Gate, rebuilder, tester giữ nguyên.

## Cấu trúc thư mục

```
project/
├── original/            # chỉ room A đọc, gitignore
├── features/<slug>/
│   ├── SPEC.md          # vào room B
│   ├── EVIDENCE.md      # KHÔNG vào room B
│   ├── QUESTIONS.md
│   ├── GATE.json
│   └── MUTATION.json
├── ARCHITECTURE.md      # chung, vào room B
├── rebuild/             # code mới
├── tests/<slug>/
└── mutants/<slug>/
```

## Ép quyền nhìn — chỗ quan trọng nhất

Claude Code không tự cô lập file theo subagent, nên ép bằng hai lớp:

1. **Prompt**: mỗi agent ghi rõ thư mục được/không được đọc.
2. **Cơ học (lớp thật)**: rebuilder chạy với working dir **không chứa** `original/` và
   `EVIDENCE.md` — ví dụ một folder chỉ có `SPEC.md`, `ARCHITECTURE.md`, `tests/`.

Lớp 1 chỉ là lời dặn; lớp 2 mới là thứ đảm bảo.

## Spec gate — 4 kiểm tra cho mỗi rule

| Mã | Kiểm tra | Fail khi |
|---|---|---|
| C1 cited | rule có mã evidence | không trỏ evidence nào |
| C2 grounded | evidence có nội dung thật (file:line, trace, hằng) | rỗng / chỉ nhắc lại rule |
| C3 behavioral | rule mô tả hành vi, không dán code gốc | chứa code/constant bí mật |
| C4 testable | đủ cụ thể để viết test | mơ hồ |

`GATE.json`: mỗi rule có C1–C4, `verdict` (pass | back_to_rea), `confidence`, `note`;
`summary.gate_passed`. **C3 fail là rò clean-room** → luôn sửa trước khi sang room B.

### Model chạy gate

Mặc định **Laya** (open-weights Apache-2.0, System-1 decision engine, chạy local) qua MCP server
của nó (`pip install 'laya[mcp]'`) — không quota, không phí, dữ liệu không rời máy. Fallback:
Haiku với output JSON đúng schema. JEV cũng thay được nếu còn quota (lý do đổi sang Laya là key JEV
hết quota) — cùng loại model, schema `GATE.json` giữ nguyên dù đổi model nào.

Map check → kiểu câu hỏi Laya (`router.predict(state, questions)`):

- C1, C2, C3 → `noul` (trả xác suất yes) → đổ vào `confidence`
- C4 → `score` (thang cụ thể/mơ hồ)
- verdict → `choice` (pass | back_to_rea)

Hai lưu ý bắt buộc giữ:

- Laya/JEV là **classifier System-1**, quyết định nhanh, không reasoning sâu. Rule về bảo mật,
  tiền, license vẫn cần **tầng hai** (reasoning model hoặc người đối chiếu proof ↔ rule).
- Zero-shot checkpoint yếu; độ chính xác nhảy mạnh khi **fine-tune** trên vài trăm quyết định gate
  mẫu của chính dự án. Với rule quan trọng, verdict của gate là lọc sơ bộ, không phải phán quyết cuối.

## Test & mutation

- Test viết **từ SPEC**, không từ code rebuild (tránh tautology). Mỗi rule Rn → ít nhất 1 test
  `test_Rn_*`.
- Mutation: mỗi rule sinh đúng 1 mutant phá chính rule đó; test phải kill được. Mutant sống → test
  yếu, **thêm test, không sửa code**.
- Behavior diff (nếu app chạy được): cùng input qua bản gốc và rebuild, so output ở tầng hành vi
  (không so code) → bắt rule bị drop âm thầm mà không phá clean-room.

## Vòng `/goal`

DONE của một feature khi **tất cả** đúng: `gate_passed == true`; mọi test spec pass;
`MUTATION.all_killed == true`; behavior diff sạch (hoặc mọi khác biệt được 1 rule giải thích);
`QUESTIONS.md` không còn câu mở.

Vòng lặp (tối đa `MAX_ROUNDS = 5`): A investigate → gate → B rebuild (câu hỏi ghi `QUESTIONS.md`,
route qua gate về A cập nhật SPEC, **không nhét pseudocode cho room B**) → test/mutate.

Mỗi round phải giảm ít nhất một trong: rule fail gate / test fail / mutant sống / câu hỏi mở.
Round không giảm gì → dừng, ghi `BLOCKED.md`, chờ người. Quyết định không đảo ngược (xoá, ghi đè
ngoài `rebuild/`) → luôn dừng hỏi người.

Nhiều feature: chạy tuần tự từng slug; một feature BLOCKED không chặn feature khác.

## Trạng thái & việc tiếp

- Skill đã lưu, pipeline chạy được trên lý thuyết cho 5 loại source.
- Chưa có bộ quyết định gate mẫu để fine-tune Laya — zero-shot còn yếu, đang coi gate là lọc sơ bộ.
- Muốn thử thật trên từng loại source để chốt REA agent cho mỗi loại.
