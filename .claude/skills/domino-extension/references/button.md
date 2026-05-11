# Button, ButtonWithTooltip

```tsx
import { Button, ButtonWithTooltip } from '@domino/extensions';
```

## Button

### Props

```ts
interface ButtonProps extends Omit<AntButtonProps, 'type' | 'color' | 'danger' | 'ghost'> {
  type: 'primary' | 'secondary' | 'tertiary' | 'link';
  color?: 'regular' | 'danger';   // default: 'regular'
  size?: 'large' | 'middle' | 'small';
  loading?: boolean | { delay?: number };
  disabled?: boolean;
  icon?: ReactNode;
  block?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}
```

> Note: `ghost`, `danger`, and the native AntD `type` are omitted — use Domino's `type` and `color` instead.

### Type variants (from storybook)

```tsx
// Highest emphasis — one per page section
<Button type="primary">Primary</Button>

// Secondary actions
<Button type="secondary">Secondary</Button>

// Low emphasis
<Button type="tertiary">Tertiary</Button>

// Inline link-style
<Button type="link">Link</Button>
```

### Color variants

```tsx
<Button type="primary" color="regular">Primary regular</Button>
<Button type="secondary" color="regular">Secondary regular</Button>
<Button type="tertiary" color="regular">Tertiary regular</Button>
<Button type="link" color="regular">Link regular</Button>

<Button type="primary" color="danger">Primary danger</Button>
<Button type="secondary" color="danger">Secondary danger</Button>
<Button type="tertiary" color="danger">Tertiary danger</Button>
<Button type="link" color="danger">Link danger</Button>
```

### Size variants

```tsx
<Button type="primary">Default size</Button>
<Button type="primary" size="small">Small size</Button>
```

### States

```tsx
<Button type="primary">Default</Button>
<Button type="primary" loading>Loading</Button>
<Button type="primary" disabled>Disabled</Button>
```

### With icons (from storybook)

```tsx
import { IconResolver } from '@domino/extensions';

// Icon + label
<Button
  type="primary"
  icon={<IconResolver iconSize="xSmall" collection="light" icon="Plus" aria-label="add" />}
>
  Add item
</Button>

// Icon only (no label text) — must provide aria-label on Button
<Button
  type="secondary"
  icon={<IconResolver iconSize="xSmall" collection="light" icon="Edit" aria-label="edit" />}
  aria-label="Edit"
/>

// Danger icon-only
<Button
  type="primary"
  color="danger"
  icon={<IconResolver iconSize="xSmall" collection="light" icon="Trash" aria-label="delete" />}
  aria-label="Delete"
/>
```

### With badge (from storybook)

```tsx
import { Badge, Space } from '@domino/extensions';

<Button type="primary">
  <Space gap="spacingXSmall">
    <span>Notifications</span>
    <Badge count={3} type="alert" />
  </Space>
</Button>

<Button type="secondary">
  <Space gap="spacingXSmall">
    <span>Messages</span>
    <Badge count={12} type="alert" />
  </Space>
</Button>
```

### AntD behavioral notes

- `loading` accepts `{ delay?: number }` — e.g. `loading={{ delay: 500 }}` shows spinner only after 500ms, avoiding flicker for fast operations.
- For icon-only buttons without a visible label, always set `aria-label` directly on `<Button>` (not only on the inner `IconResolver`).
- `block={true}` makes the button stretch to full container width.
- `htmlType="submit"` is needed for buttons inside a `<DominoForm>` that should trigger form submission.

---

## ButtonWithTooltip

```ts
interface ButtonWithTooltipProps extends ButtonProps {
  tooltipContent: ReactNode;             // Required — tooltip body
  tooltipPlacement?: TooltipPlacement;  // default: 'top'
}
```

### Examples (from storybook)

```tsx
// Create action with hint
<ButtonWithTooltip
  type="primary"
  tooltipContent="This action will create a new project"
  icon={<IconResolver collection="light" icon="Plus" aria-label="add" />}
>
  Create project
</ButtonWithTooltip>

// Disabled with explanation
<ButtonWithTooltip
  type="secondary"
  tooltipContent="You must save your changes first"
  disabled
  icon={<IconResolver collection="light" icon="Play" aria-label="run" />}
>
  Run
</ButtonWithTooltip>

// Destructive with tooltip warning
<ButtonWithTooltip
  type="primary"
  color="danger"
  tooltipContent="This action cannot be undone"
  tooltipPlacement="top"
  icon={<IconResolver collection="light" icon="Trash" aria-label="delete" />}
>
  Delete forever
</ButtonWithTooltip>
```

## Guidelines

- Use at most **one** `primary` button per visible section.
- Prefer `ButtonWithTooltip` + `disabled` over hiding unavailable actions.
- For icon-only buttons enforce `IconButton` — it mandates `tooltipMessage` and handles accessibility automatically.
- When a `Button` has `icon` and no `children`, add `aria-label` on the `Button` element itself.
