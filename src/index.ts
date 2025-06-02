#!/usr/bin/env node

import { Command } from "commander";
import { getAllFiles } from "./utils/getAllFiles";
import { checkPayloadImport } from "./rules/checkPayloadImport";
import checkCollectionAlignment from "./checks/collectionAlignment";

const program = new Command();

program
  .name("payloadcms-compiler-check")
  .description("Check for common PayloadCMS build and usage issues")
  .action(async () => {
    // ---- 1. Run generic rules on all files ----
    const files = await getAllFiles();
    for (const file of files) {
      await checkPayloadImport(file);
    }

   await checkCollectionAlignment();

    console.log("\n✅ Done checking PayloadCMS rules.");
  });

program.parse();
