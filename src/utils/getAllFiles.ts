import { globby } from "globby";

export const getAllFiles = async (
  patterns: string[] = ["src/**/*.{ts,tsx}"]
) => {
  return await globby(patterns);
};
