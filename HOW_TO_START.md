# How to start from scratch — Minimal Vite 8 + TypeScript + React app

A step-by-step recipe for scaffolding a brand-new app that uses everything in this repo: the component library, the Claude Skill, and (optionally) the Storybook MCP.

## Prerequisites

- Node.js **>= 20.19** (Vite 8 requires Node 20.19+ or 22.12+)
- `yarn`

## 1. Scaffold a Vite 8 + React + TypeScript app

```bash
yarn create vite@8 my-domino-app --template react-ts
cd my-domino-app
yarn install
```

## 2. Install `@domino/extensions` and its peer dependencies

```bash
yarn add file:/absolute/path/to/domino-ui-builder/domino-extensions-package/domino-extensions-v1.0.1.tgz
yarn add react-router@5.3.4 react-router-dom@^5.3.0
```

> React and React-DOM are already scaffolded by Vite at the required version (`18.2.0`).

## 3. Update `tsconfig.json`

Make sure these compiler options are set (Vite's template already sets most):

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "jsx": "react-jsx"
  }
}
```

## 4. Replace `src/main.tsx`

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { DominoThemeProviderDecorator } from '@domino/extensions';
import '@domino/extensions/style.css';
import App from './App';

function useStaticStore() {
  return {
    formattedPrincipal: undefined,
    whiteLabelSettings: undefined,
  };
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DominoThemeProviderDecorator useStoreHook={useStaticStore}>
      <App />
    </DominoThemeProviderDecorator>
  </React.StrictMode>,
);
```

## 5. Replace `src/App.tsx` with a smoke test

```tsx
import { Button, Card, Typography } from '@domino/extensions';

export default function App() {
  return (
    <Card>
      <Typography.H1>Hello from @domino/extensions</Typography.H1>
      <Button type="primary" onClick={() => alert('It works!')}>
        Click me
      </Button>
    </Card>
  );
}
```

## 6. Wire up the Claude Skill (optional but recommended)

From inside `my-domino-app`:

```bash
mkdir -p .claude/skills
cp -r /path/to/domino-ui-builder/.claude/skills/domino-extension \
      .claude/skills/domino-extension
```

Now Claude Code, when run inside `my-domino-app`, has full knowledge of every `@domino/extensions` component.

## 7. Wire up the Storybook MCP (optional)

```bash
claude mcp add --scope project storybook \
  -- npx -y @storybook/mcp \
  --url https://main--60c0de3f60dd96003bdcb1a1.chromatic.com/
```

## 8. Run it

```bash
yarn dev
```

Open the URL Vite prints. You should see a styled Domino card with a working primary button. From here, ask Claude Code to build the rest of your app — it now knows the design system, the live storybook, and the exact component API.
