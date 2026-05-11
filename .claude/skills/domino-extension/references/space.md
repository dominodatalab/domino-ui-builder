# Space

```tsx
import { Space } from '@domino/extensions';
```

Inline spacing component for arranging sibling elements with consistent gaps. Use for button groups, icon+label pairs, and horizontal/vertical stacks. For grid-based layouts, use `Row`/`Col`.

## Props

```ts
interface SpaceProps extends AntSpaceProps {
  direction?: 'horizontal' | 'vertical';  // default: 'horizontal'
  align?: 'start' | 'end' | 'center' | 'baseline';
  wrap?: boolean;         // Wrap to next line when overflowing
  gap?: SpacingToken | number;  // Domino spacing token or pixel value
  size?: 'small' | 'middle' | 'large' | number | [number, number];
}
```

### Space.Compact

```tsx
// Removes gaps and merges borders between children (for input groups, button groups)
<Space.Compact>
  <TextInput />
  <Button type="primary">Search</Button>
</Space.Compact>
```

## Examples

### Button group (from common usage)

```tsx
import { Space, Button } from '@domino/extensions';

<Space>
  <Button type="primary">Save</Button>
  <Button type="secondary">Cancel</Button>
</Space>
```

### Icon + label pair

```tsx
<Space gap="spacingXSmall" align="center">
  <IconResolver collection="light" icon="CircleCheck" aria-label="success" />
  <span>Completed</span>
</Space>
```

### Vertical stack

```tsx
<Space direction="vertical" style={{ width: '100%' }}>
  <TextInput placeholder="Name" />
  <TextInput placeholder="Email" />
  <TextInput placeholder="Phone" />
</Space>
```

### Wrapping inline tags

```tsx
<Space wrap>
  {tags.map(tag => (
    <Tag key={tag.id} type="user-generated">{tag.name}</Tag>
  ))}
</Space>
```

### Compact input + button

```tsx
<Space.Compact>
  <TextInput placeholder="Search projects..." style={{ width: 240 }} />
  <Button type="primary">Search</Button>
</Space.Compact>
```

### Custom gap with Domino spacing token

```tsx
<Space gap="spacingSmall" direction="vertical">
  <Typography.Text>Label</Typography.Text>
  <Typography.BodyDefault>Description</Typography.BodyDefault>
</Space>
```

## AntD behavioral notes

- **`size` vs `gap`**: AntD uses `size` for spacing; Domino adds `gap` which accepts design tokens. Prefer `gap` with a token value for consistency with the design system.
- **`Space.Compact`**: Removes inter-element gaps and collapses borders — use for input+button search bars or segmented button groups that look like a single unit.
- **`wrap`**: When horizontal and content overflows, elements wrap to the next line. Essential for tag collections.
- **`align="center"`**: Vertically centers children — essential when mixing elements of different heights (icon + text).

## Guidelines

- Use `Space` for small groups of related elements (2–5 siblings) — not for page-level layout (use `Row`/`Col`).
- Use `Space.Compact` only for input+action pairs that visually merge (search bar, inline filter).
- For button groups at the bottom of forms/modals, use `Space` with `justify-content: flex-end` on the container, not `Space` alignment.
- Prefer `gap` with a design token over raw pixel numbers to stay aligned with the spacing system.
