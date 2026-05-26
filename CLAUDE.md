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

Use the **Storybook MCP** as the source of truth for component APIs — do not invent props or guess at component shapes. The MCP exposes four categories of docs and all four are required reading:

- **`Foundations/*`** — Colors, Typography, Spacing, UX writing. The design language itself (tokens, capitalization rules, voice).
- **`Templates/*`** — Detail page, list views, etc. Reference compositions to match before inventing your own page layout.
- **`Patterns/*`** — Feedback, helper text, etc. Cross-component patterns.
- **Component docs** — Per-component props and examples.

Workflow:

1. `mcp__storybook__list-all-documentation` once at the start to discover every documented entry — Foundations, Templates, Patterns, and components.
2. **For new page composition**, fetch the relevant `Foundations/*` and `Templates/*` docs FIRST, before drilling into components. Pages are composed from patterns and templates, not just components. Skipping this step is how page backgrounds end up as hex literals and headings end up Title Case.
3. `mcp__storybook__get-documentation` for each entry you plan to use. Read **both** the props/args **and** the guidance prose. The prose is where rules like *"place actions in the header"* or *"use `descriptionText` for captions"* live; skimming for props alone misses half the doc.
4. `mcp__storybook__get-documentation-for-story` for additional docs from a specific story variant not included in the initial component docs.

If a component or prop is not documented, do not invent it — report that it was not found, and only then consider a custom implementation.

Imports are always named, from the root of the package:

```tsx
import { Button, Modal, IconResolver } from '@domino/base-components';
```

The library requires React 18 and React Router 5 (both `react-router` and `react-router-dom` at 5.3.4), and the tree must be inside `DominoThemeProviderDecorator`. No separate stylesheet import is needed — the theme provider handles it.

If you need to inspect actual component implementations or type definitions (e.g. when the MCP doesn't cover something), look at `node_modules/@domino/base-components/dist/index.d.ts` or extract the tarball with `tar -xzf domino-base-components-v1.0.0.tgz`.

**Before reaching for a `custom*` escape hatch on a component** (`customHeader`, `customFooter`, `customBody`, etc.), read the component's `.d.ts` for less invasive options. The MCP often shows a simplified example (e.g. `title="Card title"`) while the underlying type may accept a richer value (`ReactNode`). The `custom*` slots override default padding, alignment, and other built-in conventions — using them to solve a problem the regular prop already handles silently breaks the design.

## Design system rules

Most design rules live in Storybook (`Foundations/*`, `Templates/*`, component docs); the Self-review step below verifies your output against them. Two pieces that are NOT in Storybook and need to be in front of you here:

- **Use tokens for every visual value.** Resolve through `useGetThemeValue` (inline styles) or `themeHelper` (styled-components) against the tokens documented in `Foundations/Colors`, `Foundations/Spacing`, etc. The Self-review greps will flag any hex/pixel/named-color literals as bugs.
- **Token *names* and resolved *values* are not interchangeable.** Some component props (e.g. `<Space gap>`, sizing enums) accept token *names* as string literals like `"spacingMedium"`. Other styles (inline `style={{ padding: ... }}`, styled-components values) need the resolved string like `"8px"` returned by `useGetThemeValue('spacing.medium')`. Passing the wrong form **silently no-ops** — `<Space gap={useGetThemeValue('spacing.medium')}>` collapses the gap with no error because `"8px"` isn't a valid enum value for `gap`. Check the prop's TypeScript type: a union of named tokens means "pass the name"; a `string | number` means "pass a resolved value." Verify computed CSS in DevTools after the change.

## Production-build gotchas

Some `@domino/base-components` patterns work in dev mode but break in minified production bundles. Verify with a production build (`npm run build && npm run preview`) before shipping:

- **`DominoTable` columns must NOT set `width`.** Setting `width` triggers a `ResizableHeader` code path that resolves to an undefined component in minified bundles, producing React error #130 (blank page, "element type is invalid"). Let columns auto-size, or render a custom equivalent.
- **Prefer top-level exports over namespace-attached helpers.** Patterns like `DominoTable.Cell.ActionDropdownCell` can drop out of production bundles depending on tree-shaking. Use top-level exports (e.g. `ActionDropdown` with an `EllipsisVertical` `IconResolver` child) for per-row menus and similar.

## Self-review before declaring done

Functional verification (it renders, console is clean, screenshots look fine) does not catch design-system drift. A red callout renders red; a hardcoded `#fafbfc` background looks correct in a screenshot. Prose checklists are easy to write and easy to lie about — "I verified card actions are in extra" doesn't mean it actually happened. The checks below are runnable, not aspirational. When you report the task complete, only claim what you actually ran.

### 1. Mechanical checks (run these greps)

Run each grep against the files you touched. Every match needs a justification or a fix.

```bash
# Hex color literals — forbidden in component code
grep -rEn '#[0-9a-fA-F]{3,8}\b' src/

# Pixel literals in style values — usually a missing token
grep -rEn '(padding|margin|gap|width|height|top|right|bottom|left|fontSize|borderRadius):\s*[0-9]+(px)?' src/

# Freestanding Typography used as a field caption — should be each component's documented caption slot
grep -rn 'Typography\.Text type="BodySmall"' src/

# Resolved-value-as-token-name antipattern — passing useGetThemeValue's output to a name-prop
grep -rEn '(gap|size|type)=\{?useGetThemeValue\(' src/
```

### 2. Against Storybook

These checks have canonical docs in Storybook. Fetch them via the MCP if you haven't already, then verify your output matches:

- **Capitalization** → `Foundations/UX writing`. Sentence case throughout, except for first-class Domino named entities (Hardware Tier, Environment, Workspace, etc. — full list in the doc).
- **Page chrome** (backgrounds, vertical rhythm, anchor-rail widths, column proportions) → `Foundations/Colors` + `Foundations/Spacing` + `Templates/*`. The layout SVGs in those docs are the proof; prose alone won't catch proportion drift.

Beyond these two, every component you used has guidance prose in its own doc — re-read it for action placement, caption conventions, and similar per-component rules you may have skimmed past on first fetch.

### 3. Visual-fidelity check (when there's a design reference)

If you started from reference images (refactoring an existing page, matching a Figma comp), screenshot the new prototype at the same viewport size as the reference and compare side-by-side. The MCP returns prose docs but not the layout SVGs Storybook ships with — prose alone can't catch proportion or layout drift. A "looks plausible" screenshot is not the same as a side-by-side match.

### 4. Honest summary

When reporting the task complete, only claim what the greps and screenshots actually verified. "I checked card actions" without running the grep or visually scanning the relevant Cards is a false claim. The honest forms:

- "Ran `grep -rEn '#[0-9a-fA-F]{3,8}\b' src/` — 0 matches."
- "Visually scanned 7 Cards across `Settings.tsx` and `Dataset.tsx`; all actions in `extra`."
- "Screenshot-compared against reference: backgrounds match, vertical rhythm matches."

Reporting "looks good to me" or "I followed the rules" without naming what you verified is the trust-me failure mode this section exists to prevent.

## Updating the bundled library

The shipped library is the tarball at the repo root. To update component knowledge or behavior, the edit needs to happen in the upstream source that produces the tarball, then a new `domino-base-components-v<next>.tgz` needs to be dropped in and the `file:` dependency updated. Do not hand-edit files under `node_modules/` — they're replaced on every reinstall.

## Things that are not in this repo

- No source for `@domino/base-components` itself — only the prebuilt tarball.
- No bundled Claude Skill inside the tarball. Component API knowledge comes from the Storybook MCP, not a local skill. (Older versions of this README claimed a `domino-extension` skill shipped under `node_modules/@domino/base-components/.claude/`; that is no longer the case.)
- No CI, no `.github/`.
- No test setup (no Jest/Vitest/Playwright configured).
