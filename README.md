# payloadcms-compiler-check

A CLI tool to ensure your **Payload CMS** client-side code only imports valid Payload collections and that all collections used in client code are consistent with those defined in your Payload config.

## Features

- Detects invalid or missing Payload collection imports in client-side files (e.g., React/Next.js components).
- Flags use of collections that are not present or out-of-sync with your `payload.config.ts` collections array.
- Ensures updates to collections are reflected across your codebase, reducing runtime errors from stale imports.
- Provides actionable suggestions to fix collection mismatches or import issues.

## Installation

Install the package globally or locally via npm:

```bash
npm install -g payloadcms-compiler-check
```

#### Or install it in your project:

```bash
npm install payloadcms-compiler-check
```

## Usage

Run the CLI on your project’s source directory:

```bash
npx payloadcms-compiler-check ./src
```

- The tool scans all .js, .jsx, .ts, and .tsx files in the specified directory for Payload imports.
- If no path is provided, it defaults to ./src.

## Example Output

### Given a file with issues:

```js
// src/components/ArticleList.tsx
import { usePayload } from 'payload-react';
import { BlogPosts } from '../collections/BlogPosts'; // This collection does not exist in config

export default function ArticleList() {
  // ...
}
```

### Running the tool:

```bash
npx payloadcms-compiler-check ./src
```

### Output:

```bash
Checking Payload collections in ./src...

Diagnostics:
- src/components/ArticleList.tsx:2:10 - Imported collection "BlogPosts" not found in payload.config.ts.
  Suggestion: Add "BlogPosts" to your payload.config.ts collections or remove the import.

1 issue(s) found.
```

## Contributing

#### Fork the repository: https://github.com/dan-li-dev/payloadcms-compiler-check

#### Create a feature branch: git checkout -b feature/add-collection-check

#### Commit your changes: git commit -m "Add check for invalid collection imports"

#### Push to the branch: git push origin feature/add-collection-check

#### Open a pull request.

## License
MIT License. See LICENSE for details.
