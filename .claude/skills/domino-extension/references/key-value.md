# KeyValue

```tsx
import { KeyValue } from '@domino/extensions';
```

Vertical key-value display for metadata panels, detail views, and settings summaries. Shows a label, value, optional extra action, and optional metadata line.

## Props

```ts
interface KeyValueProps {
  keyLabel: ReactNode;    // The label / key text
  value?: ReactNode;      // The value to display. Null/undefined shows a placeholder dash
  extra?: ReactNode;      // Optional action next to the key (e.g. a small Button)
  metadata?: ReactNode;   // Optional secondary text below the value
}
```

### MultiValue sub-component

For displaying multiple values in a truncated list with a tooltip overflow:

```tsx
import { MultiValue } from '@domino/extensions';

<MultiValue
  values={[
    { key: 'tag1', value: <span>Tag 1</span>, rawValue: 'Tag 1' },
    { key: 'tag2', value: <span>Tag 2</span>, rawValue: 'Tag 2' },
  ]}
  maxVisibleItems={5}
  tooltipPlacement="bottom"
/>
```

## Examples

### Single value with icon (from storybook)

```tsx
import { KeyValue, Space, IconResolver, Button } from '@domino/extensions';

<KeyValue
  keyLabel="Git repository"
  extra={
    <Button size="small" type="tertiary">Edit</Button>
  }
  value={
    <Space>
      <IconResolver collection="brands" icon="Github" aria-label="github icon" />
      <span>my-org/my-repo</span>
    </Space>
  }
/>
```

### Multi value with truncation (from storybook)

```tsx
import { KeyValue, MultiValue } from '@domino/extensions';

<KeyValue
  keyLabel="Tags"
  extra={<Button size="small" type="tertiary">Add</Button>}
  value={
    <MultiValue
      tooltipPlacement="bottom"
      values={[
        { key: '1', value: <span>machine-learning</span>, rawValue: 'machine-learning' },
        { key: '2', value: <span>python</span>, rawValue: 'python' },
        { key: '3', value: <span>gpu</span>, rawValue: 'gpu' },
        { key: '4', value: <span>tensorflow</span>, rawValue: 'tensorflow' },
        { key: '5', value: <span>nlp</span>, rawValue: 'nlp' },
        { key: '6', value: <span>classification</span>, rawValue: 'classification' },
      ]}
      maxVisibleItems={5}
    />
  }
  metadata="Optional metadata"
/>
```

### Link value (from storybook)

```tsx
import { KeyValue, Link } from '@domino/extensions';

<KeyValue
  keyLabel="Documentation"
  value={
    <Link showIcon to="https://docs.domino.ai/" target="_blank" rel="noopener noreferrer">
      View docs
    </Link>
  }
  metadata="Updated 3 days ago"
/>
```

### Copy-text value (from storybook)

```tsx
import { KeyValue, CopyText } from '@domino/extensions';

<KeyValue
  keyLabel="API endpoint"
  value={<CopyText text="https://api.example.com/v1" />}
/>
```

### Empty state (no value)

```tsx
<KeyValue
  keyLabel="Description"
  value={null}   // Renders placeholder dash
/>
```

## Guidelines

- Use `KeyValue` in sidebar panels, detail drawers, and settings overview sections.
- Use `extra` for a small edit/manage button — keep it `size="small"` and `type="tertiary"`.
- Use `metadata` for secondary context like timestamps, ownership, or source info.
- Use `MultiValue` when a key can have multiple values — it handles truncation gracefully.
- Keep `keyLabel` short (1–3 words) — it's always visible above the value.
