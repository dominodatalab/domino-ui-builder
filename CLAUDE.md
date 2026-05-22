# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A **Vite + React 18 + TypeScript seed project** preconfigured with Domino's design-system component library. The intent is that someone clones this and starts building UI immediately, asking Claude to compose screens with Domino components.

Two things make this seed Domino-specific:

1. **`domino-base-components-v1.0.0.tgz`** — a pre-built NPM tarball of `@domino/base-components`, Domino's React component library. It is installed via a `file:` dependency in `package.json`, so `npm install` wires it up like any other package. The tarball contains only `dist/`, `package.json`, and `README.md` — no source, no tests, no bundled Claude assets.
2. **Storybook MCP** — `.mcp.json` at the repo root registers an HTTP MCP server pointing at the live Storybook (https://main--60c0de3f60dd96003bdcb1a1.chromatic.com/mcp). `.claude/settings.local.json` already enables it and allows `mcp__storybook` tools. This is the source of truth for component APIs in this project.

### Standard scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — typecheck (`tsc -b`) and produce a production build
- `npm run lint` — ESLint
- `npm run preview` — preview the production build

## Entry point

`src/main.tsx` wraps the app in `DominoThemeProviderDecorator` and `HashRouter` (from `react-router-dom` v5). `src/App.tsx` contains a starter screen using `Card`, `Button`, `Space`, `Typography`, and `IconResolver` — feel free to replace it wholesale.

By default `DominoThemeProviderDecorator` tries to fetch user and white-label data from the Domino backend. For standalone use, pass a static `useStoreHook` prop — pattern documented in `node_modules/@domino/base-components/README.md`. The current `main.tsx` does **not** pass one, so backend requests will fail silently in a non-Domino environment; the UI still renders with defaults.

## When you're asked to write Domino UI code

**Always check the Storybook MCP for an existing Domino component before building one yourself.** Before writing any UI — a button, a table, a form field, a modal, a layout primitive, a toast, a tag, an icon, anything — query the Storybook MCP first. If `@domino/base-components` already ships something that fits, use it. Only fall back to a custom component (plain HTML, styled-components, or composing lower-level primitives) when the MCP confirms no Domino component covers the need. This applies even for "simple" elements that feel trivial to hand-roll — the design system almost always has them, and rolling your own breaks visual consistency with the rest of Domino.

Use the **Storybook MCP** as the source of truth for component APIs — do not invent props or guess at component shapes. The workflow is:

1. `mcp__storybook__list-all-documentation` once at the start to discover available component and docs IDs.
2. `mcp__storybook__get-documentation` with the `id` from that list to retrieve full props, usage examples, and stories for the component you need.
3. `mcp__storybook__get-documentation-for-story` for additional docs from a specific story variant not included in the initial component docs.

If a component or prop is not documented, do not invent it — report that it was not found, and only then consider a custom implementation.

Imports are always named, from the root of the package:

```tsx
import { Button, Modal, IconResolver } from '@domino/base-components';
```

The library requires React 18 and React Router 5 (both `react-router` and `react-router-dom` at 5.3.4), and the tree must be inside `DominoThemeProviderDecorator`. No separate stylesheet import is needed — the theme provider handles it.

If you need to inspect actual component implementations or type definitions (e.g. when the MCP doesn't cover something), look at `node_modules/@domino/base-components/dist/index.d.ts` or extract the tarball with `tar -xzf domino-base-components-v1.0.0.tgz`.

## Updating the bundled library

The shipped library is the tarball at the repo root. To update component knowledge or behavior, the edit needs to happen in the upstream source that produces the tarball, then a new `domino-base-components-v<next>.tgz` needs to be dropped in and the `file:` dependency updated. Do not hand-edit files under `node_modules/` — they're replaced on every reinstall.

## Things that are not in this repo

- No source for `@domino/base-components` itself — only the prebuilt tarball.
- No bundled Claude Skill inside the tarball. Component API knowledge comes from the Storybook MCP, not a local skill. (Older versions of this README claimed a `domino-extension` skill shipped under `node_modules/@domino/base-components/.claude/`; that is no longer the case.)
- No CI, no `.github/`.
- No test setup (no Jest/Vitest/Playwright configured).
