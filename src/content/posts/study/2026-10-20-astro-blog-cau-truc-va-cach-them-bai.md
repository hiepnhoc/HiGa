---
title: Cấu trúc blog HiGa (Astro) và cách thêm bài
date: 2026-10-20
tags: [astro, higa, markdown]
tldr: Chuyên mục = folder trong src/content/posts. Tạo bài bằng npm run new -- <section> "Tiêu đề" tag1,tag2, push main là Cloudflare tự build.
---

## Cấu trúc

```
src/content/posts/<section>/<yyyy-mm-dd>-<slug>.md   bài viết
src/content/sections/<section>.md                     mô tả + thứ tự chuyên mục (tuỳ chọn)
```

Thêm folder mới trong `posts/` là có chuyên mục mới trên menu, không sửa code.

## Thêm bài

```bash
npm run new -- study "Tiêu đề bài" cloudflare,wrangler
git add -A && git commit -m "post: ..." && git push
```

Frontmatter: `title`, `date`, `tags`, `source` (link gốc), `status` (idea/wip/done),
`tldr` (1–3 dòng để nhớ lại), `draft`.

## Lưu ý

- Search (Pagefind) chỉ có sau `npm run build`, `npm run dev` không có.
- Bài `status: wip|idea` được gom ở mục "Đang dở" trên trang chủ.
- Cloudflare build: preset Astro, `npm run build`, output `dist`, Node 22 từ `.node-version`.
