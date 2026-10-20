#!/usr/bin/env node
// Tạo bài mới: npm run new -- <section> "Tiêu đề" [tag1,tag2]
// Ví dụ:       npm run new -- study "Dùng wrangler deploy Pages" cloudflare,wrangler
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const [section, title, tagsArg] = process.argv.slice(2);
if (!section || !title) {
  console.error('Usage: npm run new -- <section> "Tiêu đề" [tag1,tag2]');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .replace(/đ/g, 'd')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const date = new Date().toISOString().slice(0, 10);
const tags = tagsArg ? tagsArg.split(',').map((t) => t.trim()).filter(Boolean) : [];
const dir = join('src', 'content', 'posts', section);
const file = join(dir, `${date}-${slug}.md`);

if (existsSync(file)) {
  console.error(`Đã tồn tại: ${file}`);
  process.exit(1);
}

mkdirSync(dir, { recursive: true });
writeFileSync(
  file,
  `---
title: ${JSON.stringify(title)}
date: ${date}
tags: [${tags.join(', ')}]
status: done
tldr: ""
---

## Bối cảnh

## Đã làm / đã học

## Kết luận & lưu ý

## Link liên quan
`,
);
console.log(`Tạo: ${file}`);
