import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** "blog/deploy-cloudflare" → section "blog", slug "deploy-cloudflare" */
export function splitId(id: string) {
  const i = id.indexOf('/');
  // bỏ prefix ngày trong tên file: 2026-10-20-foo → foo (ngày đã có trong frontmatter)
  const clean = (s: string) => s.replace(/\//g, '-').replace(/^\d{4}-\d{2}-\d{2}-/, '');
  if (i === -1) return { section: 'misc', slug: clean(id) };
  return { section: id.slice(0, i), slug: clean(id.slice(i + 1)) };
}

export function sectionOf(post: Post) {
  return splitId(post.id).section;
}

export function slugOf(post: Post) {
  return splitId(post.id).slug;
}

export function urlOf(post: Post) {
  const { section, slug } = splitId(post.id);
  return `/${section}/${slug}/`;
}

/** Tất cả bài, bỏ draft khi build production, mới nhất trước. */
export async function allPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', (p) => import.meta.env.DEV || !p.data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function sectionMeta() {
  const metas = await getCollection('sections');
  const map = new Map<string, { title: string; description?: string; order: number }>();
  for (const m of metas) map.set(m.id, m.data);
  return map;
}

/** Danh sách section động: lấy từ folder thực tế, gộp với mô tả nếu có. */
export async function allSections() {
  const posts = await allPosts();
  const meta = await sectionMeta();
  const counts = new Map<string, number>();
  for (const p of posts) {
    const s = sectionOf(p);
    counts.set(s, (counts.get(s) ?? 0) + 1);
  }
  // section có mô tả nhưng chưa có bài vẫn hiện (count 0)
  for (const key of meta.keys()) if (!counts.has(key)) counts.set(key, 0);

  return [...counts.entries()]
    .map(([id, count]) => ({
      id,
      count,
      title: meta.get(id)?.title ?? id,
      description: meta.get(id)?.description,
      order: meta.get(id)?.order ?? 99,
    }))
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
}

export async function allTags() {
  const posts = await allPosts();
  const counts = new Map<string, number>();
  for (const p of posts) for (const t of p.data.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** tldr là plain text: bỏ backtick markdown */
export function plain(s?: string) {
  return s?.replace(/`/g, "");
}

export function fmtDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function monthKey(d: Date) {
  return d.toISOString().slice(0, 7);
}
