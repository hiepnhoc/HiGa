---
title: Cloudflare Access wildcard `*.domain` không match domain gốc
date: 2026-10-20
tags: [cloudflare, zero-trust]
tldr: Muốn chặn cả `higa.pages.dev` lẫn preview thì Destinations phải có 2 dòng, một dòng Subdomain để trống.
---

Destination `*.higa.pages.dev` chỉ match `abc.higa.pages.dev`, không match `higa.pages.dev`.
Pages bật Access mặc định chỉ tạo dòng wildcard → production vẫn public.

Thêm dòng thứ hai với Subdomain trống → cả hai đều bị chặn.
