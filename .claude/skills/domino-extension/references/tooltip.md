# Tooltip

```tsx
import { Tooltip } from '@domino/extensions';
```

Hover tooltip. For simple text tooltips, also consider the `tooltipRenderer` utility which wraps any element imperatively.

## Props

```ts
interface TooltipProps extends AntTooltipProps {
  title: ReactNode;             // Tooltip content
  placement?: TooltipPlacement; // default: 'top'
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu';  // default: 'hover'
  children: ReactElement;       // Must be a single element that accepts mouse events
  isLabelDashed?: boolean;      // Add dashed underline to trigger text (Domino-specific)
  mouseEnterDelay?: number;     // Seconds before showing (default: 0.1)
  mouseLeaveDelay?: number;     // Seconds before hiding (default: 0.1)
}
```

### `tooltipRenderer` utility

```tsx
import { tooltipRenderer } from '@domino/extensions';

tooltipRenderer(
  content: ReactNode,     // Tooltip text
  element: ReactNode,     // Wrapped element
  placement?: TooltipPlacement
): ReactNode
```

## Examples

### Basic tooltip (from storybook)

```tsx
import { Tooltip } from '@domino/extensions';

<Tooltip title="I'm a tooltip. Hopefully I'm helpful!" placement="topLeft">
  <span>Hover over this to show the tooltip</span>
</Tooltip>
```

### On a button

```tsx
<Tooltip title="This action requires admin permissions" placement="top">
  <Button type="secondary" disabled>Configure</Button>
</Tooltip>
```

### Dashed label (for contextual term explanations)

```tsx
<Tooltip
  title="Hardware Tier defines the CPU, GPU, and memory allocated to this run."
  isLabelDashed
>
  <span>Hardware Tier</span>
</Tooltip>
```

### Using `tooltipRenderer` imperatively

```tsx
import { tooltipRenderer } from '@domino/extensions';

// In JSX — wraps a disabled menu item
{tooltipRenderer(
  'You need write access to perform this action',
  <div style={{ opacity: 0.5 }}>Restricted action</div>,
  'right'
)}
```

### Tooltip with rich content

```tsx
<Tooltip
  title={
    <div>
      <strong>Premium feature</strong>
      <p>Upgrade to access this capability.</p>
    </div>
  }
  placement="bottom"
>
  <IconResolver collection="light" icon="CircleInfo" aria-label="info" />
</Tooltip>
```

## AntD behavioral notes

- **Child must accept mouse events**: The `children` element must forward `onMouseEnter` / `onMouseLeave`. If wrapping a `disabled` HTML button, wrap it in a `<span>` — disabled buttons suppress events.
- **`title`** is the tooltip content prop (not `content`). Confusingly, `Popover` uses `body` for content — don't mix them up.
- **Portal rendering**: Tooltips render in a portal at the body level. They won't be clipped by `overflow: hidden` containers.
- **`getPopupContainer`**: By default the tooltip appends to `document.body`. Override with `getPopupContainer` to scope it to a specific DOM element.
- **`destroyTooltipOnHide`**: By default, the tooltip DOM persists between hovers. Set to `true` to destroy on hide — useful for dynamic content.

## Guidelines

- Use `Tooltip` for explanations ≤ 2 sentences. For longer content, use `Popover`.
- Wrap disabled elements in `<span>` before adding a `Tooltip` — disabled form controls swallow mouse events.
- Use `isLabelDashed` when the trigger is a text term that users might not know (glossary-style).
- Never put interactive content (links, buttons) inside a `Tooltip` — use `Popover` instead.
- Use `tooltipRenderer` for imperative patterns (menu items, conditional wrapping) and `<Tooltip>` for declarative JSX.
