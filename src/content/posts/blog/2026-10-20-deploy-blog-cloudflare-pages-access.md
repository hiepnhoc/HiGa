---
title: Deploy blog lên Cloudflare Pages và khoá bằng Cloudflare Access
date: 2026-10-20
tags: [cloudflare, zero-trust, pages]
status: done
tldr: >-
  Repo GitHub → Cloudflare Pages (project name = subdomain *.pages.dev) → bật Access policy,
  phải thêm hostname gốc `higa.pages.dev` vì wildcard `*.higa.pages.dev` không match root.
  Login bằng One-time PIN qua email, policy "Allow Members" tự tạo đừng xoá.
---

## Bối cảnh

Muốn có một trang `higa.pages.dev` làm sổ tay cá nhân, có khoá đăng nhập kiểu
Cloudflare Access (nhập email → nhận code) giống mấy blog đã thấy.

## Đã làm

### 1. Cloudflare Pages từ repo GitHub

- Repo phải có ít nhất 1 commit, Cloudflare mới cho connect.
- Dashboard → **Workers & Pages → Create → Pages → Connect to Git**. Nếu không thấy tab
  Pages (Cloudflare đang giấu dần để đẩy Workers), vào thẳng:
  `https://dash.cloudflare.com/?to=/:account/pages/new/provider/github`
- **Project name quyết định subdomain**: `higa` → `higa.pages.dev`. Tên này global, ai lấy rồi
  thì không đổi subdomain được, chỉ còn cách gắn custom domain.
- Build settings cho site tĩnh: preset *None*, build command trống, output `/`.
- Dễ nhầm sang wizard **Workers** (form có "Deploy command: npx wrangler deploy") — cái đó ra
  `*.workers.dev` chứ không phải `*.pages.dev`.

### 2. Cấp quyền GitHub App

GitHub App *Cloudflare Workers and Pages* → chọn **Only select repositories**, chỉ tick repo
cần deploy. Permission read/write code/checks/deployments/PR là mặc định, không bỏ được.

### 3. Khoá bằng Cloudflare Access

Pages project → **Settings → Access policy → Enable**. Nó tự tạo:

- Zero Trust team (lần đầu phải đặt tên team)
- Application `higa - Cloudflare Pages` với destination `*.higa.pages.dev`
- Policy `Allow Members - Cloudflare Pages` (tag *Legacy*) — cho member của Cloudflare account vào

Muốn cho người khác → Create new policy: Action *Allow*, Include → *Emails* → nhập email.

## Kết luận & lưu ý

- **`*.higa.pages.dev` không bao gồm `higa.pages.dev`.** Mặc định Access chỉ chặn preview
  deployment. Muốn chặn production phải vào Application → Destinations → *Add public hostname*,
  Subdomain **để trống**, Domain `higa.pages.dev`, rồi **Save ở cuối trang** (Save policy thôi chưa đủ).
- Đừng xoá policy *Allow Members*: xoá là chính mình cũng bị khoá ngoài.
- Access không có "mật khẩu cố định". Muốn đỡ login hoài: Session duration → 1 month, hoặc thêm
  Google/GitHub login. Muốn password thật thì bỏ Access, tự viết Basic Auth bằng Pages Functions
  (`functions/_middleware.js` + env `SITE_PASSWORD`).
- `*.pages.dev` bị gắn `X-Robots-Tag: noindex`, Google không index; cần SEO thì gắn custom domain.
- Test bằng tab ẩn danh; tab thường đang login Cloudflare có cookie `CF_Authorization` sẵn.

## Link liên quan

- https://developers.cloudflare.com/pages/
- https://developers.cloudflare.com/cloudflare-one/policies/access/
