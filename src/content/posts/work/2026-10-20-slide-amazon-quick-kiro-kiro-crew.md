---
title: Slide trình bày Amazon Quick, Kiro IDE và Kiro Crew — tính năng và use case kinh điển
date: 2026-10-20
updated: 2026-10-25
tags: [aws, kiro, kiro-crew, amazon-quick, agentic-ai, slide, presentation]
tldr: >-
  Deck trình bày cho CloudNexus: Quick (business user) vs Kiro (dev); Kiro IDE với Specs/Hooks/Steering;
  Kiro Crew (4/8/2026, open source) chạy nhiều session, có memory, lịch, multi-agent. Slide HTML ở
  /slides/aws-kiro-quick/.
---

## Bối cảnh

Cần trình bày + demo về Amazon Quick, Kiro, Kiro IDE và Kiro Crew cho CloudNexus (việc riêng, không liên quan công ty). Nhờ Claude tra cứu
tình hình mới nhất rồi dựng slide HTML tự chứa, đẩy lên đây để mở trực tiếp khi demo.

**Mở slide:** [/slides/aws-kiro-quick/](/slides/aws-kiro-quick/) — phím `←` `→` chuyển, `N` bật
ghi chú thuyết trình, `F` toàn màn hình, `#n` trên URL để nhảy thẳng tới slide n.

**Bản offline (nhúng sẵn ảnh, một file):** [/slides/aws-kiro-quick/offline.html](/slides/aws-kiro-quick/offline.html)

**Tải PowerPoint (.pptx, chữ và bảng sửa được, có ghi chú thuyết trình):** [amazon-quick-va-kiro.pptx](/slides/aws-kiro-quick/amazon-quick-va-kiro.pptx)

Bản hiện tại (23/10/2026): 30 slide, hai phần Amazon Quick và Kiro (IDE, CLI, Crew), mỗi slide ghi nguồn
chính thức, ảnh chụp sản phẩm từ AWS và Kiro, có slide Model trong Kiro.

## Nội dung chính đã gom

- **Hai nhánh:** Quick cho business user (kế thừa Q Business + QuickSight), Kiro cho dev (kế thừa
  Q Developer, ngừng 15/5/2026).
- **Amazon Quick:** Chat & Spaces, Index, Research, Sight, Flows, Automate, Apps in Quick, browser
  extension / desktop app. Hơn 50 connector, MCP. Giá Professional $20, Enterprise $40 /user/tháng,
  +$250/account/tháng; 2026 thêm tier Free/Plus cá nhân. Use case: đối soát hoá đơn (Finance Amazon),
  tổng hợp xuyên hệ thống, research định kỳ chạy trong Flows, ops văn phòng hằng ngày.
- **Kiro:** một agent harness, nhiều bề mặt (IDE, CLI, Web, Mobile, Crew) qua ACP; cloud session;
  model Claude Opus 4.8 / Auto; Powers.
- **Kiro IDE:** spec-driven (requirements EARS → design → tasks → agent song song → property-based
  test), hooks, steering, autopilot, agent focus mode (experimental), MCP, nền Code OSS.
- **Kiro Crew:** ra mắt 4/8/2026, từ dự án nội bộ MeshClaw (39k builder nội bộ), Apache 2.0 nhưng
  harness vẫn đóng, chạy trên Kiro CLI. Memory/lessons/skills, schedule/heartbeat/webhook, multi-agent,
  Apps (DevFleets, Task Runner, Issue Radar), kênh Slack/Discord/Telegram/Teams. Bảo mật: sandbox,
  deny-by-default, audit log có ký, chạy local không cần AWS account. Use case: incident nhiều repo,
  migration nhiều giờ, morning digest fix flaky test, triage ticket.

## Kết luận & lưu ý

- Crew là phần mới nhất, đáng demo nhất; nhưng ngốn token hơn CLI đơn lẻ và gắn chặt hệ Kiro.
- Quick: tính năng agentic phụ thuộc region, cần kiểm tra trước khi hứa với nghiệp vụ.
- Kịch bản demo đề xuất nằm ở slide cuối: Kiro IDE spec flow → steering + hook → Crew dashboard.

## Link liên quan

- https://kiro.dev/blog/introducing-kiro-crew/
- https://kiro.dev/ide/
- https://github.com/kirodotdev/KiroCrew
- https://aws.amazon.com/blogs/aws/reimagine-the-way-you-work-with-ai-agents-in-amazon-quick-suite/
