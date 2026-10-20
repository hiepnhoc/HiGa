import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Mọi bài nằm trong src/content/posts/<section>/<slug>.md
// <section> là folder → thêm folder mới = thêm chuyên mục mới, không cần sửa code.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // link gốc: repo GitHub, paper, bài Medium...
    source: z.string().url().optional(),
    // research/study: dở dang hay xong
    status: z.enum(['idea', 'wip', 'done']).default('done'),
    // 1–3 dòng: đọc là nhớ lại được bài nói gì
    tldr: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Mô tả cho từng chuyên mục (tuỳ chọn). Section không có ở đây vẫn hiện bình thường.
const sections = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/sections' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(99),
  }),
});

export const collections = { posts, sections };
