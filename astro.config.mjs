import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

// Helper to extract frontmatter data using simple regex
function getBlogDates() {
  const blogDir = path.resolve('src/content/blog');
  const dates = {};
  if (!fs.existsSync(blogDir)) return dates;

  const files = fs.readdirSync(blogDir);
  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
    const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    
    // Extract slug, pubDate, updatedDate
    const slugMatch = content.match(/slug:\s*["']?([^"'\r\n]+)["']?/);
    const pubDateMatch = content.match(/pubDate:\s*["']?([^"'\r\n]+)["']?/);
    const updatedDateMatch = content.match(/updatedDate:\s*["']?([^"'\r\n]+)["']?/);
    
    if (slugMatch) {
      const slug = slugMatch[1].trim();
      const pubDate = pubDateMatch ? pubDateMatch[1].trim() : null;
      const updatedDate = updatedDateMatch ? updatedDateMatch[1].trim() : null;
      
      const dateStr = updatedDate || pubDate;
      if (dateStr) {
        // format date safely
        try {
          const dateObj = new Date(dateStr);
          if (!isNaN(dateObj.getTime())) {
            dates[slug] = dateObj.toISOString().split('T')[0];
          }
        } catch (e) {
          // ignore parsing error
        }
      }
    }
  }
  return dates;
}

// Helper to get route dates from file modification times
function getRouteDates() {
  const routeDir = path.resolve('src/content/rute');
  const dates = {};
  if (!fs.existsSync(routeDir)) return dates;

  const files = fs.readdirSync(routeDir);
  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
    
    const filePath = path.join(routeDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const fromMatch = content.match(/from:\s*["']?([^"'\r\n]+)["']?/);
    const toMatch = content.match(/to:\s*["']?([^"'\r\n]+)["']?/);
    
    if (fromMatch && toMatch) {
      const from = fromMatch[1].trim().toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
      const to = toMatch[1].trim().toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
      const url = `/${from}/${to}/`;
      
      const stats = fs.statSync(filePath);
      dates[url] = stats.mtime.toISOString().split('T')[0];
    }
  }
  return dates;
}

const blogDates = getBlogDates();
const routeDates = getRouteDates();
const BUILD_DATE = new Date().toISOString().split('T')[0];

// https://astro.build/config
export default defineConfig({
  site: 'https://lincahtravel.web.id',
  trailingSlash: 'always',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [react(), sitemap({
    filter: (page) => {
      const excluded = [
        '/batu-marta/', '/baturaja/', '/bayung-lencir/', '/belitang/',
        '/betung/', '/danau-ranau/', '/indralaya/', '/jambi/',
        '/kayu-agung/', '/kikim/', '/kuala-tungkal/', '/lahat/',
        '/lampung/', '/lubuklinggau/', '/martapura/', '/muara-bulian-jambi/',
        '/muara-dua/', '/muara-enim/', '/pagaralam/', '/palembang/',
        '/prabumulih/', '/sekayu/', '/sungai-lilin/', '/talang-padang/',
        '/tebing-tinggi/', '/tugumulyo/'
      ];
      const path = new URL(page).pathname;
      return !excluded.includes(path);
    },
    serialize(item) {
      const pathname = new URL(item.url).pathname;

      // Homepage uses build date
      if (pathname === '/') {
        item.lastmod = new Date(BUILD_DATE);
        return item;
      }

      // Check if the item is a blog post
      const blogMatch = pathname.match(/^\/blog\/([^/]+)\/$/);
      if (blogMatch && blogDates[blogMatch[1]]) {
        item.lastmod = new Date(blogDates[blogMatch[1]]);
        return item;
      }
      
      // Check if the item is a route page (not city hub)
      const routeMatch = pathname.match(/^\/([^\/]+)\/([^\/]+)\/$/);
      if (routeMatch && routeMatch[1] !== routeMatch[2]) {
        if (routeDates[pathname]) {
          item.lastmod = new Date(routeDates[pathname]);
        }
      }
      
      return item;
    }
  })],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
