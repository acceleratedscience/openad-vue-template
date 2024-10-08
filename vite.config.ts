import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		// vueDevTools(),
		svgLoader({
			svgoConfig: {
				plugins: [
					{
						name: 'preset-default',
						params: {
							overrides: {
								removeViewBox: false,
							},
						},
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
<<<<<<< HEAD
<<<<<<< HEAD
				additionalData: '@import "@/assets/template-css/_shared.scss";',
=======
				additionalData: '@import "@/assets/_shared.scss";',
>>>>>>> 0861eb5 (Free Palestine)
=======
				additionalData: '@import "@/assets/_shared.scss";',
>>>>>>> 0861eb5 (Free Palestine)
			},
		},
	},
})
