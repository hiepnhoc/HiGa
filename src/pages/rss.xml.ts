import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { allPosts, urlOf, sectionOf } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await allPosts();
  return rss({
    title: 'HiGa',
    description: 'Sổ tay cá nhân',
    site: context.site!,
    items: posts.slice(0, 50).map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.tldr ?? '',
      link: urlOf(p),
      categories: [sectionOf(p), ...p.data.tags],
    })),
  });
}
