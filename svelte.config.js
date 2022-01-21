import adapter from "@sveltejs/adapter-vercel";
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({}),
        vite: {
            envPrefix: ['VITE_', 'VERCEL_', 'FINAL_URL'],
        },
    },
    preprocess: preprocess(),
};

export default config;
