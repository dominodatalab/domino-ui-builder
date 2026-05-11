# Domino UI Builder

A toolkit for building Domino-looking applications and extensions. This repository pairs the **`@domino/extensions`** React component library — an implementation of the Domino Design System — with **Claude Skills** that teach Claude Code how to use those components correctly.

The live storybook for the component library is hosted at:

➡️ **https://main--60c0de3f60dd96003bdcb1a1.chromatic.com/**

---

## Repository layout

```
domino-ui-builder/
├── .claude/
│   └── skills/
│       └── domino-extension/   # Claude Skill — component reference for @domino/extensions
│           ├── SKILL.md
│           └── references/     # 45 per-component reference docs
└── domino-extensions-package/
    └── domino-extensions-v1.0.1.tgz   # Pre-built NPM tarball of @domino/extensions
```

---

## 1. Using the Claude Skills

This repo ships with a Claude Skill, [`domino-extension`](.claude/skills/domino-extension/SKILL.md), that gives Claude Code in-depth knowledge of every component in `@domino/extensions`: exact props (verified from source), real storybook examples, AntD behavioral notes, and Domino-specific patterns.

### What's a Claude Skill?

A Claude Skill is a folder containing a `SKILL.md` file (with YAML frontmatter describing when to use it) plus any reference docs the skill needs. When Claude Code starts up in a workspace, it discovers skills under `.claude/skills/` and loads them on demand whenever the user's request matches the skill's `description`.

### How to use it in this repo

The skill is already wired up under [.claude/skills/domino-extension/](.claude/skills/domino-extension/). You don't need to do anything to enable it — just open this repo in Claude Code (CLI, VS Code extension, or JetBrains plugin) and ask questions like:

- *"How do I use a `Modal` with a custom footer?"*
- *"Build a form with `TextInput`, `Select`, and a submit `Button`."*
- *"What's the difference between `ActionDropdown` and `Dropdown`?"*

Claude will automatically consult the skill, look up the relevant reference file under [references/](.claude/skills/domino-extension/references/), and produce code that matches the real component API.

### Using the skill in a downstream project

If you want the same component knowledge in **your own** project (not just inside this repo), copy the skill folder into your project:

```bash
cp -r /path/to/domino-ui-builder/.claude/skills/domino-extension \
      ./your-project/.claude/skills/
```

The skill is also bundled inside the `@domino/extensions` tarball (under `node_modules/@domino/extensions/.claude/skills/` after install), so an alternative is to symlink it:

```bash
mkdir -p .claude/skills
ln -s ../../node_modules/@domino/extensions/.claude/skills/domino-extension \
      .claude/skills/domino-extension
```

---

## 2. The Storybook MCP

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) servers expose external tools and data to AI clients like Claude Code. The **Storybook MCP** is an MCP server that exposes a Storybook instance — Domino's live storybook of `@domino/extensions` components — to Claude, so Claude can:

- List every story and component available
- Read the rendered HTML/JSX of a specific story
- Pull the args/props that a story uses
- Cross-reference what the skill says with what's actually published

This is complementary to the `domino-extension` skill: the skill is the offline, curated reference; the MCP server is the live source of truth.

### Configuring the Storybook MCP

Add the server to your Claude Code MCP configuration. From the repo root:

```bash
claude mcp add --scope project storybook \
  -- npx -y @storybook/mcp \
  --url https://main--60c0de3f60dd96003bdcb1a1.chromatic.com/
```

This writes a `.mcp.json` entry like:

```json
{
  "mcpServers": {
    "storybook": {
      "command": "npx",
      "args": [
        "-y",
        "@storybook/mcp",
        "--url",
        "https://main--60c0de3f60dd96003bdcb1a1.chromatic.com/"
      ]
    }
  }
}
```

Restart Claude Code, then verify with `/mcp` — you should see the `storybook` server connected.

### Using it

Once connected, Claude can call tools like `list_stories`, `get_story`, `get_component_props`. Try:

- *"Use the Storybook MCP to list every story under the `Button` component."*
- *"Fetch the source of the `Modal/With Custom Footer` story and adapt it for my page."*
- *"What args does the `DominoTable/Basic` story pass in?"*

---

## 3. Installing the NPM package

The component library is distributed as a tarball at [domino-extensions-package/domino-extensions-v1.0.1.tgz](domino-extensions-package/domino-extensions-v1.0.1.tgz).

### Install

```bash
yarn add file:/absolute/path/to/domino-ui-builder/domino-extensions-package/domino-extensions-v1.0.1.tgz
```

### Install peer dependencies

`@domino/extensions` requires React 18 and React Router 5:

```bash
yarn add react@18.2.0 react-dom@18.2.0 react-router@5.3.4 react-router-dom@^5.3.0
```

### Import the stylesheet (once, at the entry point)

```tsx
import '@domino/extensions/style.css';
```

### Wrap your app with the theme provider

```tsx
import { DominoThemeProviderDecorator } from '@domino/extensions';
import '@domino/extensions/style.css';

function App() {
  return (
    <DominoThemeProviderDecorator>
      <YourApp />
    </DominoThemeProviderDecorator>
  );
}
```

### Standalone usage (no Domino backend)

By default `DominoThemeProviderDecorator` fetches user and white-label data from the Domino backend. For apps running outside the Domino platform, pass a static `useStoreHook` to skip those network calls:

```tsx
function useStaticStore() {
  return {
    formattedPrincipal: undefined,
    whiteLabelSettings: undefined,
  };
}

<DominoThemeProviderDecorator useStoreHook={useStaticStore}>
  <YourApp />
</DominoThemeProviderDecorator>
```

### TypeScript configuration

Add the following to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "jsx": "react-jsx"
  }
}
```

For full installation instructions, troubleshooting, and standalone-mode details, see the [`INSTALL.md`](domino-extensions-package/) bundled inside the tarball.

---

## How to start from scratch

For a step-by-step recipe to scaffold a brand-new Vite 8 + TypeScript + React app that uses the component library, the Claude Skill, and the Storybook MCP, see **[HOW_TO_START.md](HOW_TO_START.md)**.

---

## License

See [LICENSE](LICENSE).
