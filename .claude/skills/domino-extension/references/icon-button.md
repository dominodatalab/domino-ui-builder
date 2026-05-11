# IconButton

```tsx
import { IconButton } from '@domino/extensions';
```

Icon-only button with a mandatory tooltip. `IconButton` enforces accessibility — it requires `tooltipMessage` and automatically wraps the icon in a `Tooltip`, so the user always knows what the button does.

## Props

```ts
interface IconButtonProps {
  type: 'primary' | 'secondary' | 'tertiary';
  icon: string;                        // FontAwesome icon name (e.g. 'Trash', 'Edit', 'Plus')
  tooltipMessage: string;              // Required — shown on hover
  tooltipPlacement?: TooltipPlacement; // default: 'top'
  color?: 'regular' | 'danger';       // default: 'regular'
  size?: 'default' | 'small';         // default: 'default'
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: MouseEvent) => void;
  ariaLabel?: string;
  dataTest?: string;                   // default: 'default-icon-button'
}
```

> Unlike `Button`, `IconButton` does **not** accept `children` — it is icon-only by design. The icon is always from the `light` FontAwesome collection.

## Examples

### Three button types (from storybook)

```tsx
import { IconButton } from '@domino/extensions';

// Primary
<IconButton
  type="primary"
  icon="Plus"
  tooltipMessage="Add item"
/>

// Secondary
<IconButton
  type="secondary"
  icon="Edit"
  tooltipMessage="Edit"
/>

// Tertiary
<IconButton
  type="tertiary"
  icon="Trash"
  tooltipMessage="Delete"
  color="danger"
/>
```

### Disabled with tooltip explanation

```tsx
<IconButton
  type="secondary"
  icon="Play"
  tooltipMessage="Save your changes before running"
  disabled
/>
```

### Small size (for table cells and toolbars)

```tsx
<IconButton
  type="tertiary"
  icon="EllipsisVertical"
  tooltipMessage="More options"
  size="small"
/>
```

## AntD behavioral notes

- The tooltip wraps the button — the `tooltipMessage` is shown on hover even when `disabled`. This is the recommended pattern for explaining why a button is disabled, unlike plain `Button` where tooltips don't show on disabled elements without extra wrapping.
- `size="small"` reduces both the button size and the icon size proportionally.

## Guidelines

- Always use `IconButton` for icon-only actions — never use `Button` with just an icon and no label, as `IconButton` mandates the tooltip that `Button` doesn't enforce.
- Use `tooltipMessage` to describe the action ("Delete project"), not just repeat the icon name ("Trash").
- Use `color="danger"` with `type="tertiary"` for destructive icon actions in lists or tables.
- Prefer `size="small"` inside table rows and compact toolbars.
