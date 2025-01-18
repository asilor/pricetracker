import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    appDir: "bundle",
    files: {
      assets: 'static'
    },
    outDir: "dev",
    output: {
      bundleStrategy: "split",
    },
    paths: {
      base: "",
      assets: "",
    },
  },
};

export default config;