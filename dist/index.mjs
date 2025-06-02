var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/utils/getAllFiles.ts
import { globby } from "globby";
var getAllFiles;
var init_getAllFiles = __esm({
  "src/utils/getAllFiles.ts"() {
    "use strict";
    getAllFiles = async (patterns = ["src/**/*.{ts,tsx}"]) => {
      return await globby(patterns);
    };
  }
});

// src/rules/checkPayloadImport.ts
import fs from "fs";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import chalk from "chalk";
var checkPayloadImport;
var init_checkPayloadImport = __esm({
  "src/rules/checkPayloadImport.ts"() {
    "use strict";
    checkPayloadImport = (filePath) => {
      const code = fs.readFileSync(filePath, "utf-8");
      const ast = parse(code, { sourceType: "module", plugins: ["typescript"] });
      traverse(ast, {
        ImportDeclaration(path) {
          const source = path.node.source.value;
          if (source.includes("payload")) {
            if (filePath.includes("client") || filePath.includes("components")) {
              console.log(
                chalk.red(`\u274C Payload import in client file: ${filePath}`)
              );
            }
          }
        }
      });
    };
  }
});

// src/index.ts
import { Command } from "commander";
var require_index = __commonJS({
  "src/index.ts"() {
    init_getAllFiles();
    init_checkPayloadImport();
    var program = new Command();
    program.name("payloadcms-compiler-check").description("Check for common PayloadCMS build and usage issues").action(async () => {
      const files = await getAllFiles();
      for (const file of files) {
        await checkPayloadImport(file);
      }
      console.log("\n\u2705 Done checking PayloadCMS rules.");
    });
    program.parse();
  }
});
export default require_index();
