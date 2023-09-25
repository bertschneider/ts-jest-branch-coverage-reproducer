import type { Config } from "jest";

const config: Config = {
	verbose: true,
	projects: [
		{
			preset: "ts-jest",
			testMatch: ["<rootDir>/*.test.ts"],
		},
	],
	coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
	modulePathIgnorePatterns: ["/node_modules", "/dist/"],
};

export default config;
