# domino-ui-builder

A Vite + React 18 + TypeScript seed project preconfigured with Domino's design-system component library (`@domino/base-components`) and a Storybook MCP server that lets Claude Code look up verified component APIs on demand.

Clone it, run `npm install`, and ask Claude to start composing screens.

## Getting started

```bash
npm install
npm run dev
```

That's it. The app at `src/App.tsx` already imports `Button`, `Card`, `IconResolver`, `Space`, and `Typography` from `@domino/base-components` as a starting example. Edit it and Claude can take over from there.

### Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — typecheck (`tsc -b`) and produce a production build
- `npm run lint` — ESLint
- `npm run preview` — preview the production build

## How the Domino pieces are wired

- **`@domino/base-components`** is installed from the local tarball `domino-base-components-v1.0.0.tgz` via a `file:` dependency in `package.json`. No private registry access needed.
- **`src/main.tsx`** wraps the app in `DominoThemeProviderDecorator` (the required theme provider) and `HashRouter` from `react-router-dom` v5. React Router 5 is a peer dependency of the library.
- Imports are named, from the root of the package:
  ```tsx
  import { Button, Modal, IconResolver } from '@domino/base-components';
  ```

By default `DominoThemeProviderDecorator` tries to fetch user and white-label data from the Domino backend. For standalone use outside the Domino platform, pass a static `useStoreHook` — see the package README at `node_modules/@domino/base-components/README.md` for the pattern.

## Working with Claude

The project ships a **Storybook MCP server** for Claude Code, configured in `.mcp.json` and pointing at the live Storybook (https://main--60c0de3f60dd96003bdcb1a1.chromatic.com/mcp). `.claude/settings.local.json` already enables the server and allows `mcp__storybook` tools.

Through that server, Claude can call:

- `list-all-documentation` — enumerate every documented component
- `get-documentation` — retrieve full props, usage examples, and stories for a component
- `get-documentation-for-story` — fetch a specific story variant

Ask Claude for a component by name (Button, DominoTable, Modal, DominoForm, …) and it will look up the verified API through the MCP rather than guessing.

## Storybook

The live component library is browsable at https://main--60c0de3f60dd96003bdcb1a1.chromatic.com/.
