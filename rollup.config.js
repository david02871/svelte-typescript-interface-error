import svelte from 'rollup-plugin-svelte';
import livereload from 'rollup-plugin-livereload';
import typescript from "@rollup/plugin-typescript";
import preprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			dev: true,
			extensions: [".svelte"],
			css: css => {
				css.write('public/build/bundle.css');
			},
			preprocess: preprocess()
		}),
		typescript(),
		!production && serve(),
		!production && livereload('public'),
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
