// jest.config.ts
import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/tests/setup-jest.ts"],
  moduleDirectories: ["node_modules", "utils", __dirname],
};

export default config;
