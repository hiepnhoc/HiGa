# HiGa — sổ tay cá nhân (higa.pages.dev)

Astro site, content tĩnh. Chủ repo là hiepln. Khi được bảo "đẩy lên HiGa / higa.pages.dev /
đẩy vào <mục>", viết bài rồi commit + push thẳng lên `main`; Cloudflare Pages tự build.

## Viết bài

- Đường dẫn: `src/content/posts/<section>/<yyyy-mm-dd>-<slug>.md` (slug không dấu, gạch nối).
- Section = folder. Mục hiện có: blog, research, study, work, til, log. Mục mới → tạo folder,
  thêm `src/content/sections/<section>.md` (title, description, order).
- Frontmatter bắt buộc: `title`, `date`, `tags`. Tuỳ chọn: `source` (link gốc), `status`
  (idea | wip | done, mặc định done), `tldr` (1–3 dòng, plain text), `updated`, `draft`.
- Khung thân bài: Bối cảnh → Đã làm / đã học → Kết luận & lưu ý → Link liên quan.
  Bài `til` chỉ cần vài dòng, bỏ khung.
- Ngôn ngữ: tiếng Việt, thuật ngữ/tên kỹ thuật và trích dẫn tiếng Anh giữ nguyên.
- Chỉ ghi những gì đã trao đổi thật; không bịa chi tiết. Không đưa secret, key, thông tin nội bộ
  nhạy cảm của công ty vào bài.

## Chia sẻ công khai

- Site khoá bằng Cloudflare Access. Riêng `/share/*` được mở (Access application riêng, policy Bypass).
- Bài muốn chia sẻ: thêm `share: true` vào frontmatter → có thêm bản `/share/<slug>/` (layout không có
  menu, không lộ chuyên mục khác) và nằm trong danh sách `/share/`.
- Slide, demo, ảnh trong `public/` xem công khai qua `/share/slides/…`, `/share/demo/…`, `/share/img/…`
  (rewrite trong `public/_redirects`). Link `/slides/…` trong bài share tự đổi sang `/share/…`.
- Không đặt `share: true` cho bài có thông tin công việc hoặc dữ liệu riêng tư.

## Commit

- Message: `post(<section>): <tiêu đề ngắn>`; sửa code site thì ghi bình thường.
- `npm run build` phải pass trước khi push nếu có sửa code ngoài `src/content/`.
