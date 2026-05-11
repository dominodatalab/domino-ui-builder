# Badge

```tsx
import { Badge } from '@domino/extensions';
```

Small count or status indicator overlaid on a trigger element. Domino's `Badge` (exported as `BadgeWrapper`) has `type` for semantic coloring and `hideCount` for dot-only mode.

## Props

```ts
interface BadgeProps extends Omit<AntBadgeProps, 'color' | 'dot' | 'status' | 'text'> {
  count?: number | string;   // Badge content
  type?: 'neutral' | 'success' | 'alert';  // Semantic color (Domino-specific)
  hideCount?: boolean;       // Show dot only, no count number
  children?: ReactNode;      // Element the badge overlays
}
```

## Examples

### Alert badge on an icon (from storybook)

```tsx
import { Badge } from '@domino/extensions';
import { IconResolver } from '@domino/extensions';

<Badge count={3} type="alert">
  <IconResolver collection="light" icon="Bell" aria-label="notifications" />
</Badge>
```

### Neutral badge

```tsx
<Badge count={42} type="neutral">
  <Button type="secondary">Messages</Button>
</Badge>
```

### Success badge (for "all good" counts)

```tsx
<Badge count={7} type="success">
  <span>Passed checks</span>
</Badge>
```

### Dot-only (no number)

```tsx
<Badge type="alert" hideCount>
  <IconResolver collection="light" icon="Bell" aria-label="notifications" />
</Badge>
```

### Inside a Button (from button storybook)

```tsx
import { Badge, Space, Button } from '@domino/extensions';

<Button type="primary">
  <Space gap="spacingXSmall">
    <span>Notifications</span>
    <Badge count={3} type="alert" />
  </Space>
</Button>
```

### In Tabs (via TabItem.badgeCount)

```tsx
// Prefer Tab's built-in showBadge + badgeCount props over wrapping label with Badge:
<Tabs
  items={[
    { key: 'alerts', label: 'Alerts', showBadge: true, badgeCount: 5, children: ... },
  ]}
/>
```

## AntD behavioral notes

- **`overflowCount`**: AntD displays `99+` when count exceeds 99. Override with `overflowCount={999}` for larger numbers.
- **No children = standalone**: When `Badge` has no children, it renders as an inline indicator without positioning overlay — useful inside text or button labels.
- **Positioning**: When wrapping a child element, the badge positions absolutely at the top-right corner of the child's bounding box.
- **`showZero`**: By default, `count={0}` hides the badge. Pass `showZero={true}` to always show the badge even when count is 0.

## Guidelines

- Use `type="alert"` for errors, warnings, and unread notifications.
- Use `type="success"` for passed items, healthy counts, or green statuses.
- Use `type="neutral"` for informational counts with no urgency.
- Use `hideCount` when the exact number is less important than the presence of something.
- For tab-level counts, use `Tabs` item's built-in `showBadge` + `badgeCount` props.
