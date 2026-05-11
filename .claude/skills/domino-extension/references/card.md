# Card

```tsx
import { Card } from '@domino/extensions';
```

Content container with optional title, help tooltip, title-area extras, and body padding control.

## Props

```ts
interface CardProps extends Omit<AntCardProps, 'size' | 'actions'> {
  title?: ReactNode;          // Card title — renders in header with H3 typography
  helpMessage?: ReactNode;    // Tooltip shown on an info icon next to the title
  titleExtra?: ReactNode;     // Content in the title row right of the help icon (e.g. a Select)
  extra?: ReactNode;          // Content at the far right of the card header
  noPadding?: boolean;        // Remove default body padding
  dataTest?: string;          // default: 'domino-card'
}
```

### Sub-components

```tsx
Card.TitleText   // Typography.H3 — use inside custom title content
Card.Grid        // AntD Card.Grid — for grid layouts inside a card
Card.Meta        // AntD Card.Meta — for media + description layout
```

## Examples

### Full card with title, help, and extra actions (from storybook)

```tsx
import { Card, ActionDropdown, Button, Select, Space } from '@domino/extensions';

<Card
  title="Card title"
  helpMessage="This is a help message explaining what this card does."
  titleExtra={<Select placeholder="Placeholder text" />}
  extra={
    <Space>
      <Button type="secondary">Save</Button>
      <ActionDropdown buttonType="tertiary" menu={{ items: [] }} />
    </Space>
  }
>
  <p>Card body content</p>
</Card>
```

### Simple card with just a title

```tsx
<Card title="Configuration">
  <p>Body content here.</p>
</Card>
```

### Card without padding (for tables and custom layouts)

```tsx
<Card title="Results" noPadding>
  <DominoTable columns={columns} dataSource={data} />
</Card>
```

### Card without title (plain container)

```tsx
<Card>
  <p>Just content, no header.</p>
</Card>
```

## AntD behavioral notes

- **`extra`**: Renders in the top-right corner of the card header. Appears only when `title` is also set.
- **`titleExtra`**: Domino-specific — appears in the title row, immediately right of the help icon and left of `extra`. Suitable for a filter `Select` or a small piece of metadata.
- **`helpMessage`**: Renders as a `CircleInfo` icon tooltip next to the title.
- **`size`**: Omitted in Domino's Card — use `noPadding` when you need to remove body spacing.

## Guidelines

- Use `helpMessage` when the card's purpose might not be obvious — keep the message brief (1–2 sentences).
- Use `titleExtra` for contextual controls that affect what the card displays (e.g., a time-range `Select`).
- Use `extra` for card-level actions (save, export, overflow menu).
- Use `noPadding` when the card body contains a table or other full-bleed component.
- Never style `Card` directly with `style` or `className` for layout — wrap it in a styled `div` instead.
