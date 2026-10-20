# HiGa

Sổ tay cá nhân — https://higa.pages.dev. Astro + Markdown, build tĩnh, deploy tự động qua
Cloudflare Pages mỗi khi push `main`.

## Cấu trúc

```
src/content/posts/<section>/<yyyy-mm-dd>-<slug>.md   ← bài viết
src/content/sections/<section>.md                     ← mô tả + thứ tự chuyên mục (tuỳ chọn)
src/pages/                                             ← trang: index, [section], tags, archive, search, rss
src/lib/posts.ts                                       ← helper (section lấy từ tên folder)
```

**Chuyên mục = folder.** Tạo folder mới trong `src/content/posts/` là có mục mới trên menu,
không cần sửa code. Muốn đặt tên hiển thị/mô tả/thứ tự thì thêm file cùng tên trong
`src/content/sections/`.

Mục hiện có: `blog` · `research` · `study` · `work` · `til` · `log`.

## Viết bài

```bash
npm run new -- study "Tiêu đề bài" cloudflare,wrangler
# → src/content/posts/study/2026-10-20-tieu-de-bai.md
```

Frontmatter:

```yaml
title: Tiêu đề
date: 2026-10-20
updated: 2026-10-25        # tuỳ chọn
tags: [aws, eks]           # đi xuyên chuyên mục
source: https://github.com/... # link gốc (repo, paper, bài Medium)
status: done               # idea | wip | done — khác done thì hiện badge
tldr: 1–3 dòng để nhớ lại  # hiện ở list và đầu bài
draft: false               # true → chỉ hiện khi dev, không build
```

Khung thân bài gợi ý: **Bối cảnh → Đã làm / đã học → Kết luận & lưu ý → Link liên quan**.
Bài `til` có thể bỏ hết, chỉ cần vài dòng.

## Chạy local

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # dist/ + index Pagefind (search chỉ có sau khi build)
npm run preview
```

## Cloudflare Pages

| Setting | Giá trị |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output | `dist` |
| Node | `.node-version` = 22 |

Trang được khoá bằng Cloudflare Access (One-time PIN qua email).
