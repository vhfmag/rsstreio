import adapter from "@sveltejs/adapter-vercel";
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({}),
        vite: {
            envPrefix: 'VITE_',
        }
    },
    preprocess: preprocess(),
};

export default config;
