---
title: Kịch bản demo Kiro IDE, Kiro Crew, Amazon Quick — từng bước, prompt sẵn, dự phòng
date: 2026-10-20
tags: [aws, kiro, kiro-crew, amazon-quick, demo, quarkus, presentation]
status: wip
tldr: >-
  5 phân đoạn demo ~35 phút trên project fee-demo (Quarkus): spec-driven → hook/steering → CLI →
  Crew (lesson, subagent, cron, heartbeat, Slack) → Quick (nếu có tài khoản). Kit file + prompt ở
  /demo/aws-kiro-quick/. Checklist chuẩn bị và dự phòng cho từng đoạn.
---

## Bối cảnh

**Slide:** [/slides/aws-kiro-quick/](/slides/aws-kiro-quick/) · [bản offline](/slides/aws-kiro-quick/offline.html) · [tải PowerPoint (.pptx)](/slides/aws-kiro-quick/amazon-quick-va-kiro.pptx)

Slide ở [/slides/aws-kiro-quick/](/slides/aws-kiro-quick/) nói về tính năng; bài này là phần
**demo sống** đi kèm. Mọi demo chạy trên một project nhỏ `fee-demo` (Quarkus, tính phí + thuế
cho một lệnh chứng khoán, số liệu ví dụ công khai) để có một ví dụ Java cụ thể.

Bộ file dùng ngay: [/demo/aws-kiro-quick/README.md](/demo/aws-kiro-quick/README.md) (cách tạo
project, Crew setup), [/demo/aws-kiro-quick/PROMPTS.md](/demo/aws-kiro-quick/PROMPTS.md) (prompt
gõ sẵn theo thứ tự), `kiro/steering/*.md`, `kiro/hooks/*.json`, `src/FeeResource.java`.

## Chuẩn bị trước (ngày hôm trước)

- [ ] Tạo `fee-demo` theo README, chạy `mvn test` một lần cho Maven tải xong dependency.
- [ ] Mở `fee-demo` bằng Kiro IDE, kiểm tra panel thấy 3 steering + 2 hook. Chạy thử prompt 1 **một
      lần ở branch khác** để biết Kiro sinh spec mất bao lâu và còn đủ credit; xong `git checkout`
      về branch sạch (giữ branch đã chạy làm dự phòng).
- [ ] `kirocrew gateway` chạy được, dashboard mở được, workspace `fee-demo` đã add. Thử `cron add`
      + `cron trigger` một lần rồi xoá.
- [ ] Slack bot (tuỳ chọn): nếu không kịp thì bỏ phân đoạn 4e, không ảnh hưởng mạch.
- [ ] Amazon Quick: đăng nhập thử tier Free/Plus (không cần AWS account). Không vào được → dùng
      video chính thức + screenshot, dành 3 phút.
- [ ] Đăng nhập Cloudflare Access cho higa.pages.dev **trước** khi lên máy chiếu (mã email).
- [ ] Tắt notification, font terminal ≥ 16pt, màn hình 1920×1080 hoặc fullscreen slide (phím F).
- [ ] Mạng dự phòng (4G) — mọi thứ đều gọi model qua mạng.

## Phân đoạn 1 — Kiro IDE: spec-driven (10 phút)

Slide 8 đang mở. Chuyển sang IDE, chat mode **Spec**, dán prompt 1.

1. **Requirements** hiện ra: dừng, đọc to 2 acceptance criteria dạng EARS ("WHEN quantity không
   phải bội số 100 THEN hệ thống SHALL trả 400 INVALID_QUANTITY…"). Hỏi người nghe: thiếu rule gì không?
   Nếu ai nói "lô lẻ", ghi nhận — đó là mồi cho bước 3.
2. **Design**: chỉ chỗ Kiro chọn `BigDecimal` + `HALF_UP`, `BusinessException`, package `domain/`
   — không ai nhắc, do steering. Duyệt.
3. **Tasks**: cho xem mỗi task link về requirement. Bấm *Start task* cho task 1, để chạy; task 2–3
   có thể chạy song song (nếu IDE đề xuất).
4. Trong lúc chạy: dán prompt 2 (lô lẻ) để cho thấy spec được cập nhật trước khi sửa code.
5. Mở test jqwik Kiro sinh: bất biến "phí không âm", "netAmount(SELL) < grossValue". Chạy
   `mvn -q test` ngay trong terminal IDE.

**Điểm nhấn khi nói:** spec là tài liệu review được, không phải prompt trôi đi; quyết định (làm
tròn, lô chẵn) nằm trong `design.md` cho người sau đọc.

**Dự phòng:** credit hết / model chậm → `git checkout demo-ran` (branch đã chạy hôm trước), mở
`.kiro/specs/order-quote/` đọc 3 file, chạy test.

## Phân đoạn 2 — Hook & steering (4 phút)

Slide 9.

- **Hook agent:** mở `FeeResource.java`, đổi `/fees` → `/fee-schedule`, lưu. Panel hook sáng lên,
  mở `docs/API.md` → đã cập nhật. Nói: "senior dev không bao giờ quên cập nhật tài liệu".
- **Hook command:** mở một test trong `domain/`, thêm một assertion sai, lưu → test chạy, báo đỏ
  ngay trong chat. Sửa lại, lưu → xanh.
- **Steering:** dán prompt 4. Chỉ vào output: record `*Response`, test happy + lỗi, dòng mới trong
  `API.md` — toàn bộ do `structure.md` ép.

**Dự phòng:** hook không bắn → mở file `.kiro/hooks/update-api-docs.json` giải thích schema
(`trigger: PostFileSave`, `matcher` regex, `action.type: agent`), rồi chạy thủ công bằng cách
dán prompt trong file vào chat.

## Phân đoạn 3 — Kiro CLI (2 phút)

Slide 7 (một harness, nhiều bề mặt). Terminal: `kiro-cli chat`, dán prompt 5. CLI đọc cùng
steering + spec vừa tạo trong IDE. Nói: cùng harness, chỉ khác bề mặt; cloud session còn cho
tiếp tục từ web/điện thoại.

## Phân đoạn 4 — Kiro Crew (12 phút)

Slide 11–14. Dashboard Crew đã mở sẵn trong tab trình duyệt, gateway chạy trong terminal riêng.

- **4a. Lesson (1 phút):** dán prompt 6 → `kirocrew learn list` trong terminal cho thấy lesson
  được ghi, scope workspace. Nói: sửa một lần, nhớ mãi, và mình xem/xoá được.
- **4b. Subagent song song (3 phút):** dán prompt 6b (research jqwik + viết test lô lẻ). Chuyển
  sang **Activity view**: hai card, reasoning và tool call chạy thời gian thực. Nói về ACP và việc
  mọi bước đều quan sát được.
- **4c. Approval (1 phút):** khi một subagent xin chạy `mvn test` hoặc ghi file → bấm duyệt trên
  dashboard. Nói: deny-by-default, audit log có ký.
- **4d. Lịch (3 phút):** terminal, prompt 7: `cron add` morning-digest 7h sáng giờ VN, `cron list`,
  `cron trigger <id>` để chạy ngay. Kết quả hiện trong dashboard sau ~1–2 phút. Trong lúc chờ,
  nói slide 14 (một ngày với Crew).
- **4e. Heartbeat + Slack (3 phút, tuỳ chọn):** prompt 8 theo dõi PR #1; mở `~/.kiro/crew/workspace/HEARTBEAT.md`
  cho thấy task dạng checkbox. Lấy điện thoại, nhắn bot Slack prompt 9 — trả lời cùng workspace,
  cùng memory.

**Điểm nhấn khi nói:** Crew không phải IDE mới; nó là lớp orchestration chạy trên Kiro CLI, dùng
lại nguyên `.kiro` của phân đoạn 1–2. Chạy local, không cần AWS account.

**Dự phòng:** gateway lỗi → `kirocrew doctor`, `kirocrew restart`. Vẫn lỗi → chiếu screenshot
dashboard chụp hôm trước (chụp sẵn Activity view, Schedule panel, Memory panel) và đọc
`HEARTBEAT.md`, `crons.json`.

## Phân đoạn 5 — Amazon Quick (5 phút, nếu có tài khoản)

Slide 4–6.

- Tạo Space "CloudNexus demo", upload 2–3 PDF công khai (ví dụ tài liệu Kiro Crew, bài blog Quick Suite).
- **Quick Research** với prompt 10a → báo cáo có trích dẫn, chỉ vào phần nguồn nội bộ vs web.
- **Quick Flows** với prompt 10b → flow tạo bằng lời, có lịch. Không cần chạy thật.
- Browser extension: bôi đen một đoạn trên trang kiro.dev → "Summarize this selection".

**Dự phòng:** không có tài khoản hoặc region chưa mở → video overview của AWS (aboutamazon.com,
bài Quick Suite) tua tới đoạn Research + Automate, 3 phút, rồi sang bảng chốt slide 15.

## Thứ tự & thời lượng

| # | Phân đoạn | Slide | Phút |
|---|---|---|---|
| 0 | Mở đầu, hai nhánh, timeline | 1–3 | 3 |
| 1 | Kiro IDE spec-driven | 8 | 10 |
| 2 | Hook & steering | 9–10 | 4 |
| 3 | Kiro CLI | 7 | 2 |
| 4 | Kiro Crew | 11–14 | 12 |
| 5 | Amazon Quick | 4–6 | 5 |
| 6 | Chốt + hỏi đáp | 15–16 | 5 |

Tổng ~40 phút. Nếu chỉ có 20 phút: bỏ 3 và 5, rút 4 còn 4a/4b/4d.

## Kết luận & lưu ý

- Hai thứ dễ hỏng nhất: credit Kiro và mạng. Luôn có branch `demo-ran` và screenshot dự phòng.
- Không demo trên repo công ty; `fee-demo` là project ví dụ, số liệu phí/thuế là ví dụ công khai.
- Tên lệnh `kiro-cli chat` và flag `cron add` lấy từ docs ngày 20/10/2026 — chạy thử trước vì
  CLI đổi nhanh.
- Ghi lại câu hỏi của người nghe để cập nhật bài này (`status: wip`).

## Link liên quan

- https://kiro.dev/docs/hooks/ — schema hook (`version`, `trigger`, `matcher`, `action`)
- https://kiro.dev/docs/steering/ — front matter `inclusion`, foundation files
- https://kiro.dev/docs/crew/features/cron/ — `kirocrew cron add`, HEARTBEAT.md
- https://kiro.dev/docs/crew/interfaces/cli-reference/ — `spawn`, `learn`, `token`, `run`
- https://kiro.dev/docs/crew/interfaces/slack/ — kết nối Slack
