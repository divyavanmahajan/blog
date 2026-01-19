import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: process.env.SITE || 'https://divyavanmahajan.github.io',
    base: process.env.BASE || '/',
    vite: {
        server: {
            allowedHosts: ['picodvm-blog.tuns.sh', '.tuns.sh', 'localhost', '127.0.0.1'],
        },
    },
});
