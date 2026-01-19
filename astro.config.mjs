import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: process.env.SITE || 'https://divyavanmahajan.github.io',
    base: process.env.BASE || '/blog/',
});
