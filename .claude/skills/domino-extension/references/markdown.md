# Markdown

```tsx
import { Markdown } from '@domino/extensions';
```

Renders Markdown content as formatted HTML. Supports GitHub Flavored Markdown (GFM), math equations (LaTeX), raw HTML execution, and `@mention` links.

## Props

```ts
interface MarkdownRendererProps extends Options {  // react-markdown Options
  children: string;                  // Markdown string to render
  supportMentions?: boolean;         // Replace @username with profile links
  shouldExecuteHtmlInMarkdown?: boolean;  // Override global HTML execution setting
  dataTest?: string;
}
```

> `Options` extends `react-markdown`'s props — you can pass custom `components` for overriding how specific elements render.

## Examples

### Basic markdown rendering

```tsx
import { Markdown } from '@domino/extensions';

<Markdown>
  {`# Project Overview

This project uses **Python 3.10** and requires the following setup:

\`\`\`bash
pip install requirements.txt
\`\`\`

See the [documentation](https://docs.domino.ai/) for more details.`}
</Markdown>
```

### Rendering stored markdown content

```tsx
<Markdown>{project.description}</Markdown>
```

### With @mention support

```tsx
// Converts "@username" to a link: [@username](/u/username)
<Markdown supportMentions>
  {comment.body}
</Markdown>
```

### With math equations

```tsx
// Supports LaTeX via remark-math + rehype-mathjax
<Markdown>
  {`The formula is: $E = mc^2$

Display equation:
$$\\int_0^\\infty e^{-x} dx = 1$$`}
</Markdown>
```

### Read-only description field

```tsx
// Common pattern: markdown description below a title
<Space direction="vertical">
  <Typography.H3>{model.name}</Typography.H3>
  {model.description && <Markdown>{model.description}</Markdown>}
</Space>
```

## Supported markdown features

- **GitHub Flavored Markdown (GFM)**: Tables, task lists, strikethrough
- **Math**: LaTeX via `$inline$` and `$$display$$` syntax
- **Raw HTML**: Configurable — controlled by global store setting and `shouldExecuteHtmlInMarkdown`
- **Code blocks**: Syntax highlighting via GitHub markdown CSS
- **`@mentions`**: Converted to user profile links when `supportMentions={true}`

## Guidelines

- Use `Markdown` for user-generated content: project descriptions, run notes, comments, documentation.
- Enable `supportMentions` in collaborative contexts (comments, activity feeds) where users @-mention each other.
- Don't use `Markdown` for static UI text — use `Typography` components instead.
- Be aware of XSS risk: HTML execution in markdown is controlled by a global setting — don't override `shouldExecuteHtmlInMarkdown` unless absolutely necessary.
- For editable markdown, combine with `TextArea` or `CodeEditor` in edit mode and `Markdown` in view mode.
