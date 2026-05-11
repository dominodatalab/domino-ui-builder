# Typography

```tsx
import { Typography } from '@domino/extensions';
```

Semantic text components that apply Domino's type scale. Always use these instead of plain HTML tags or custom font styles.

## Components

```ts
Typography.H1       // Page title
Typography.H2       // Sub-page heading; drawer/modal/wizard titles
Typography.H3       // Section heading; card/popover/accordion titles

Typography.Text     // Body text — accepts 'type' prop for size/weight variants
```

### Typography.Text types

```ts
type TextType =
  | 'BodyDefault'       // Primary body text, paragraphs (default)
  | 'BodyDefaultStrong' // Emphasized body text, labels
  | 'BodySmall'         // Secondary text, captions, metadata
  | 'BodySmallStrong'   // Emphasized small text
  | 'BodyCode';         // Code snippets, technical values (monospace)
```

## Type scale reference (from storybook)

| Component | Size | Weight | Use case |
|-----------|------|--------|----------|
| `H1` | Large title | Normal | Page titles |
| `H2` | Large | Medium | Sub-page headings; modal/wizard/drawer titles |
| `H3` | Medium | Medium | Section headings; card/popover/accordion titles |
| `BodyDefault` | Small | Normal | Primary body text, paragraphs |
| `BodyDefaultStrong` | Small | Medium | Emphasized body text, labels |
| `BodySmall` | Tiny | Normal | Secondary text, captions, metadata |
| `BodySmallStrong` | Tiny | Medium | Emphasized small text |
| `BodyCode` | Small | Normal | Code snippets, technical values (monospace) |

## Examples

### Headings (from storybook)

```tsx
import { Typography } from '@domino/extensions';

// Page title
<Typography.H1>Project Overview</Typography.H1>

// Modal/drawer title
<Typography.H2>Edit Configuration</Typography.H2>

// Card section title
<Typography.H3>Hardware Settings</Typography.H3>
```

### Body text variants (from storybook)

```tsx
// Default body text
<Typography.Text>This is standard body text used for paragraphs.</Typography.Text>

// Emphasized / label
<Typography.Text type="BodyDefaultStrong">Important note</Typography.Text>

// Caption / metadata
<Typography.Text type="BodySmall">Last updated 3 days ago</Typography.Text>

// Emphasized small
<Typography.Text type="BodySmallStrong">Required field</Typography.Text>

// Code / technical value
<Typography.Text type="BodyCode">/usr/local/bin/python</Typography.Text>
```

### In practice

```tsx
// Page header
<Typography.H1>Projects</Typography.H1>
<Typography.Text type="BodySmall">All your projects in one place.</Typography.Text>

// Card with section
<Card>
  <Typography.H3>Compute settings</Typography.H3>
  <Typography.Text>Configure the hardware resources for this run.</Typography.Text>
</Card>

// Metadata row
<Space direction="vertical" gap="spacingXSmall">
  <Typography.Text type="BodyDefaultStrong">Hardware Tier</Typography.Text>
  <Typography.Text type="BodySmall">Small (4 CPUs / 8 GB RAM)</Typography.Text>
</Space>
```

## AntD behavioral notes

- **`Typography.Text` from AntD** supports `copyable`, `ellipsis`, `editable`, `code`, `mark` — these are available if needed but Domino's type scale `type` prop is separate from AntD's `type` (which controls color: 'secondary', 'success', 'warning', 'danger').
- Don't use AntD's `Typography.Title` directly — use `Typography.H1`, `Typography.H2`, `Typography.H3` from Domino instead.

## Guidelines

- Use `H1` once per page (the page title). Use `H2` for major section headings inside modals, wizards, or drawers. Use `H3` for sub-sections inside cards and content containers.
- Use `BodySmall` / `BodySmallStrong` for all metadata, captions, and secondary text — never `font-size: 12px` in CSS.
- Use `BodyCode` for file paths, commands, environment variable names, and other technical values.
- Never set `font-size`, `font-weight`, or `line-height` on text content — always reach for a `Typography` variant.
