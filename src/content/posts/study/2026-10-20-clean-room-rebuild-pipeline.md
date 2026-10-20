---
title: clean-room-rebuild — pipeline reverse-engineer rồi rebuild theo kiểu clean-room, đóng gói thành Claude Code skill
date: 2026-10-20
tags: [clean-room, reverse-engineering, claude-code, skill, agent-pipeline]
status: wip
tldr: >-
  Hai phòng tách biệt: REA điều tra app → viết SPEC + EVIDENCE → spec gate (Laya, open-weights, chạy local)
  → session Opus mới chỉ thấy SPEC để rebuild → vòng test/mutation. Có cổng pháp lý bắt buộc trước khi chạy sâu.
---

## Bối cảnh

Muốn rebuild một feature từ app mình **được phép phân tích**, nhưng không để code gốc "rò" sang
bản rebuild. Mô hình clean-room kinh điển: người đọc code gốc và người viết lại không được là
cùng một người, chỉ nói chuyện với nhau qua bản spec. Áp cái đó lên agent: hai phòng, hai session.

## Pipeline

```
[Legal gate]  ─ bắt buộc, chưa qua thì không chạy tiếp
     │
[Room A: REA] ─ agent điều tra source (web / Electron / native / APK / .NET)
     │           output: SPEC.md (hành vi, I/O, edge case) + EVIDENCE.md (chứng cứ, không có code)
     ▼
[Spec gate]   ─ model độc lập đọc SPEC: đủ chưa, có lọt code/định danh gốc không, mơ hồ chỗ nào
     │           → pass / trả về Room A
     ▼
[Room B: Rebuild] ─ session Opus MỚI, context sạch, chỉ nhận SPEC
     │
[Test / mutation loop] ─ chạy test từ SPEC, mutation để chắc không "ăn may"
```

Điểm chính:

- **Chỉ Room A đổi theo loại source.** Web, Electron, native, APK, .NET — mỗi loại một REA agent
  khác, các phòng còn lại giữ nguyên. Nên mở rộng được mà không phải viết lại pipeline.
- **Room B không bao giờ thấy source gốc**, kể cả EVIDENCE. Đây là chỗ làm nên tính clean-room.
- **Spec gate** là model riêng để không "tự chấm bài mình".

## Chọn model cho spec gate

- Ban đầu định dùng JEV nhưng key hết quota.
- Chuyển sang **Laya**: open-weights, Apache-2.0, chạy local qua MCP server của nó → không phụ
  thuộc quota, spec không rời máy.
- Fallback: Haiku.

## Trạng thái

- Đã đóng gói thành Claude Code skill `clean-room-rebuild` (gọi bằng `/clean-room-rebuild`).
- Đang mở rộng REA agent cho từng loại source; mới chỉ chạy thật trên một vài loại.

## Lưu ý

- Cổng pháp lý không phải hình thức: phải có quyền phân tích app đó (license, hợp đồng, hoặc
  code của mình) trước khi để REA chạy.
- Nếu SPEC có đoạn nào trông "giống code gốc" thì gate phải trả về, không cho qua.
