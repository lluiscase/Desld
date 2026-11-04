import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	resolve: {
		alias: {
			"react-native": "react-native-web",
			"@/app": path.resolve(rootDir, "./app"),
			"@/widgets": path.resolve(rootDir, "./src/widgets"),
			"@/features": path.resolve(rootDir, "./src/features"),
			"@/entities": path.resolve(rootDir, "./src/entities"),
			"@/shared": path.resolve(rootDir, "./src/shared"),
		},
	},
	test: {
		globals: true,
		environment: "node",
		include: ["src/**/*.test.ts", "tests/**/*.test.ts"],
	},
});
