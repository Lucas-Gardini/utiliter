import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vuetify({ autoImport: true })],
	resolve: {
		alias: {
			"@": "/src",
			"@assets": "/src/assets",
			"@components": "/src/components",
			"@layouts": "/src/layouts",
			"@pages": "/src/pages",
			"@plugins": "/src/plugins",
			"@utils": "/src/utils",
		},
	},
});
