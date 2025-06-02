import { globby } from "globby";
export const getAllFiles = async (patterns = ["src/**/*.{ts,tsx}"]) => {
    return await globby(patterns);
};
