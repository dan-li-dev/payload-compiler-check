import fs from "fs";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import chalk from "chalk";
export const checkPayloadImport = (filePath) => {
    const code = fs.readFileSync(filePath, "utf-8");
    const ast = parse(code, { sourceType: "module", plugins: ["typescript"] });
    traverse(ast, {
        ImportDeclaration(path) {
            const source = path.node.source.value;
            if (source.includes("payload")) {
                if (filePath.includes("client") || filePath.includes("components")) {
                    console.log(chalk.red(`❌ Payload import in client file: ${filePath}`));
                }
            }
        },
    });
};
