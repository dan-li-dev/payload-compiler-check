import { Project, PropertyAssignment, SyntaxKind } from 'ts-morph';
import {globby} from 'globby';
import chalk from 'chalk';
import path from 'path';
export default async function checkCollectionAlignment() {
 // ---- 2. COLLECTIONS CHECK ----
 const collectionsDir = './src/collections/';
 const files = await globby(['*.ts'], { cwd: collectionsDir });
 const collectionFiles = files.map((f:string) => path.basename(f, '.ts'));

 const project = new Project();
 const configPath = './src/payload.config.ts';
 const source = project.addSourceFileAtPath(configPath);

 // Find export or assignment named `config`
 const configExport = source.getVariableDeclaration('config')
   || source.getExportAssignment(() => true)?.getExpression();

 if (!configExport) {
   console.error(chalk.red('❌ Could not find a config export in payload.config.ts'));
   process.exit(1);
 }

 // Find collections property
 const collectionsProp = source.getDescendantsOfKind(SyntaxKind.PropertyAssignment)
   .find((pa): pa is PropertyAssignment => pa.getName() === 'collections');

 if (!collectionsProp) {
   console.error(chalk.red('❌ No `collections` property found in payload.config.ts'));
   process.exit(1);
 }

 // Get registered collection names
 const registeredCollections = collectionsProp.getInitializer()?.asKind(SyntaxKind.ArrayLiteralExpression)
   ?.getElements()
   .map((el): string => el.getText().replace(/['"`]/g, ''))
   ?? [];

 console.log(chalk.blue(`\nFound collections in config: ${registeredCollections.join(', ')}`));

 // Compare file list and config
 const missingInConfig = collectionFiles.filter(f => !registeredCollections.includes(f));
 const missingInFiles = registeredCollections.filter(c => !collectionFiles.includes(c));

 if (missingInConfig.length > 0) {
   console.warn(chalk.yellow(`⚠️  These files are missing from payload.config.ts: ${missingInConfig.join(', ')}`));
 }
 if (missingInFiles.length > 0) {
   console.warn(chalk.yellow(`⚠️  These collections in payload.config.ts do not have a file in collections/: ${missingInFiles.join(', ')}`));
 }
 if (missingInConfig.length === 0 && missingInFiles.length === 0) {
   console.log(chalk.green('✅ All collections are in sync!'));
 }
}