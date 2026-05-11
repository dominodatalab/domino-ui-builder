# MetadataBar

```tsx
import { MetadataBar } from '@domino/extensions';
```

Horizontal bar of small metadata items, typically shown below a page title or card header. Each item has a tooltip label and displays with a user icon. Supports inline tags at the end.

## Props

```ts
interface MetadataBarProps {
  children: ReactNode | ReactNode[];  // MetadataBar.Item elements
  tags?: string[];                    // Tags rendered at the end of the bar (truncated if many)
  dataTest?: string;                  // default: 'metadata-bar'
}

// Item sub-component
interface MetadataItemProps {
  children: ReactNode;        // The displayed value (name, date, etc.)
  tooltipMessage?: string;    // Tooltip explaining what this value represents
  dataTest?: string;
}
```

## Examples

### Basic metadata bar (from storybook)

```tsx
import { MetadataBar } from '@domino/extensions';

<MetadataBar>
  <MetadataBar.Item tooltipMessage="Created by">John Smith</MetadataBar.Item>
  <MetadataBar.Item tooltipMessage="Project">Project Name</MetadataBar.Item>
  <MetadataBar.Item tooltipMessage="Last modified">Jan 15, 2026</MetadataBar.Item>
</MetadataBar>
```

### With tags

```tsx
<MetadataBar tags={['machine-learning', 'python', 'gpu', 'tensorflow', 'nlp']}>
  <MetadataBar.Item tooltipMessage="Owner">alice@example.com</MetadataBar.Item>
  <MetadataBar.Item tooltipMessage="Created">Jan 15, 2026</MetadataBar.Item>
  <MetadataBar.Item tooltipMessage="Status">Active</MetadataBar.Item>
</MetadataBar>
```

### Run details below a page title

```tsx
<MetadataBar>
  <MetadataBar.Item tooltipMessage="Started by">sebastian</MetadataBar.Item>
  <MetadataBar.Item tooltipMessage="Duration">4m 32s</MetadataBar.Item>
  <MetadataBar.Item tooltipMessage="Hardware tier">Small (4 CPUs / 8 GB RAM)</MetadataBar.Item>
  <MetadataBar.Item tooltipMessage="Environment">python-3.10-minimal</MetadataBar.Item>
</MetadataBar>
```

## Guidelines

- Use `MetadataBar` for compact metadata rows on page/entity headers (run details, project info, model metadata).
- Always add `tooltipMessage` to each `MetadataBar.Item` — the user icon alone doesn't communicate what the value represents.
- Use `tags` for user-generated keyword tags — they're automatically truncated with `+N more` when the list overflows.
- Keep each item value short (1 line max). For longer values, use `KeyValue` in a sidebar panel instead.
- Limit to 3–5 items — more than that makes the bar feel cluttered.
