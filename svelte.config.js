import adapter from '@sveltejs/adapter-auto';
import autoprefixer from 'autoprefixer';
import sveltePreprocess from 'svelte-preprocess';
import seqPreprocessor from 'svelte-sequential-preprocessor';
import { preprocessThrelte } from '@threlte/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: seqPreprocessor([
		sveltePreprocess({
			postcss: {
				plugins: [autoprefixer]
			},
			scss: {
				prependData: `@import './src/lib/styles/mixins.scss';`
			}
		}),
		preprocessThrelte()
	]),
	preprocess: seqPreprocessor([
		sveltePreprocess({
			postcss: {
				plugins: [autoprefixer]
			}
		}),
		preprocessThrelte()
	]),
	kit: {
		adapter: adapter()
	}
};

export default config;
