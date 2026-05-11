# Tag

```tsx
import { Tag } from '@domino/extensions';
```

Small label for categorization, status, or metadata. Domino's `Tag` has a `type` prop for semantic colors and supports `closable` for removable tags.

## Props

```ts
interface TagProps extends Omit<AntTagProps, 'color'> {
  type?: 'user-generated' | 'success' | 'danger' | 'warning';  // default: 'user-generated'
  closable?: boolean;          // Show × close button
  onClose?: (e: MouseEvent) => void;
  children: ReactNode;         // Tag label text
}
```

## Examples

### User-generated tag (from storybook)

```tsx
import { Tag } from '@domino/extensions';

<Tag type="user-generated">machine-learning</Tag>
```

### Status tags

```tsx
<Tag type="success">Active</Tag>
<Tag type="warning">Pending</Tag>
<Tag type="danger">Failed</Tag>
```

### Closable tag (for removal)

```tsx
const [tags, setTags] = useState(['python', 'tensorflow', 'gpu']);

<Space wrap>
  {tags.map(tag => (
    <Tag
      key={tag}
      type="user-generated"
      closable
      onClose={() => setTags(tags.filter(t => t !== tag))}
    >
      {tag}
    </Tag>
  ))}
</Space>
```

### Tag list from data

```tsx
<Space wrap>
  {project.tags.map(tag => (
    <Tag key={tag.id} type="user-generated">{tag.name}</Tag>
  ))}
</Space>
```

### Mixed status tags in a table cell

```tsx
const statusTag = {
  running: <Tag type="success">Running</Tag>,
  failed:  <Tag type="danger">Failed</Tag>,
  queued:  <Tag type="warning">Queued</Tag>,
  stopped: <Tag type="user-generated">Stopped</Tag>,
};

// In column render:
render: (status) => statusTag[status] ?? <Tag>{status}</Tag>
```

## AntD behavioral notes

- **`closable`**: Adds an `×` button. The `onClose` handler receives the mouse event. To prevent the tag from removing itself automatically, call `e.preventDefault()`.
- **`onClose`**: When `closable` is true but `onClose` is not provided, AntD hides the tag on close by default (DOM-level). Always manage visibility in state via `onClose`.
- **`color` prop**: AntD's `color` prop is omitted in Domino — use `type` instead to ensure design-system semantic colors.

## Guidelines

- Use `type="user-generated"` (blue-grey) for user-entered labels, categories, and keywords.
- Use `type="success"` / `type="danger"` / `type="warning"` for status indicators that communicate health.
- Use `closable` only for tags the user can remove (e.g. filter chips, user-added tags).
- Wrap tag collections in `<Space wrap>` to handle overflow gracefully.
- Keep tag text short (1–3 words). Long tags should be truncated or replaced with a different component.
