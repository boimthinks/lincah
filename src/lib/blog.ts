import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * Ambil artikel blog yang layak tayang.
 *
 * Aturannya:
 *   - draft: true -> tidak dibangun, tidak tayang
 *   - selain itu  -> dibangun dan ikut terdeploy
 *
 * Tanggal TIDAK dipakai menyaring. `pubDate` hanya label yang tampil di
 * halaman. Kapan artikel benar-benar tayang ditentukan oleh kapan status draft
 * dilepas lalu situs di-deploy, sehingga tanggalnya selalu tanggal sungguhan.
 *
 * Semua halaman dan komponen yang menampilkan artikel WAJIB memakai helper ini,
 * bukan getCollection('blog') langsung, supaya draft tidak bocor ke build,
 * sitemap, beranda, sidebar, maupun daftar blog.
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  return getCollection('blog', ({ data }) => data.draft !== true);
}

/** Urutkan artikel dari tanggal terbaru ke terlama. */
export function sortPostsDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}
