import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@components': fileURLToPath(new URL('./src/components', import.meta.url)),
			'@store': fileURLToPath(new URL('./src/store', import.meta.url)),
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@use "./src/scss/1-settings" as *;
					@use "./src/scss/2-tools" as *;
					@use "./src/scss/3-base" as *;
					@use "./src/scss/4-classes" as *;
					@use "./src/scss/5-layout" as *;
					@use "./src/scss/8-trumps" as *;
				`
			}
		}
	}
})
