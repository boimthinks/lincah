import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://lincahtravel.web.id',
  trailingSlash: 'always',
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
    }
  })],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
