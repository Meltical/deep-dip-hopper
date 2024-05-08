import react from "@vitejs/plugin-react"
import { defineConfig } from "wxt"

// See https://wxt.dev/api/config.html
export default defineConfig({
	vite: () => ({
		plugins: [react()],
	}),
	manifest: () => ({
		host_permissions: ["https://dips-plus-plus.xk.io/live_heights/global", "https://trackmania.io/api/player/*"],
		permissions: ["activeTab"],
	}),
})
