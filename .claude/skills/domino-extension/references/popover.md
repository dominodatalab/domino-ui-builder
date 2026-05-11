# Popover

```tsx
import { Popover } from '@domino/extensions';
```

Rich overlay with a header, body, and optional footer. Use when the content needs more space than a `Tooltip` — e.g. confirmation dialogs, filter panels, or detail previews.

## Props

```ts
interface PopoverProps extends Omit<AntPopoverProps, 'content'> {
  title?: ReactNode;     // Header text
  body?: ReactNode;      // Main body content (replaces AntD's 'content' prop)
  footer?: ReactNode;    // Footer content — typically action buttons
  placement?: PopoverPlacement;  // default: 'top'
  trigger?: 'hover' | 'click' | 'focus';  // default: 'hover'
  open?: boolean;        // Controlled visibility
  onOpenChange?: (open: boolean) => void;
  children: ReactElement; // Trigger element
}
```

> Note: Domino's `Popover` uses `body` instead of AntD's `content` prop. Do not use `content` — it won't render.

## Examples

### Delete confirmation popover (from storybook)

```tsx
import { Popover, Button, Link } from '@domino/extensions';

<Popover
  placement="top"
  title="Delete this item?"
  trigger="click"
  body={
    <div>
      <div>This action cannot be undone. Are you sure you want to continue?</div>
      <div style={{ marginTop: '8px' }}>
        <Link to="https://docs.domino.ai/">Learn more</Link>
      </div>
    </div>
  }
  footer={
    <>
      <Button type="tertiary">Cancel</Button>
      <Button type="tertiary" color="danger">Delete</Button>
    </>
  }
>
  <Button type="primary">Click me</Button>
</Popover>
```

### Filter panel (click-triggered)

```tsx
const [open, setOpen] = useState(false);

<Popover
  title="Filter by"
  trigger="click"
  placement="bottomLeft"
  open={open}
  onOpenChange={setOpen}
  body={
    <div style={{ minWidth: 240 }}>
      <Select placeholder="Status" options={statusOptions} style={{ width: '100%' }} />
    </div>
  }
  footer={
    <>
      <Button type="tertiary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button type="primary" onClick={handleApply}>Apply</Button>
    </>
  }
>
  <Button type="secondary">
    <IconResolver collection="light" icon="Filter" aria-label="filter" />
    Filter
  </Button>
</Popover>
```

### Hover info preview

```tsx
<Popover
  title="Environment details"
  placement="right"
  body={
    <div>
      <p>Python 3.10 • 4 CPUs • 16 GB RAM</p>
      <p>Last updated 3 days ago</p>
    </div>
  }
>
  <span style={{ cursor: 'help' }}>my-env-v2</span>
</Popover>
```

## AntD behavioral notes

- **`body` not `content`**: Domino maps `body` to AntD's `content` prop internally. Using AntD's raw `content` prop won't render anything — always use `body`.
- **Portal rendering**: Like `Tooltip`, `Popover` renders in a portal at the body level and won't be clipped by `overflow: hidden`.
- **`trigger="click"`**: For confirmation and filter panels, always use click — hover popovers with interactive content are hard to use.
- **Closing on outside click**: When `trigger="click"`, clicking outside the popover closes it automatically (AntD behavior). For controlled panels, use `open` + `onOpenChange`.

## Guidelines

- Use `Popover` instead of `Tooltip` when content includes links, buttons, or more than 2 sentences.
- Use `Popover` instead of `Modal` for lightweight confirmations or quick-access panels that don't need to block the full page.
- Always use `trigger="click"` for popovers with interactive footer actions — hover popovers with buttons are inaccessible.
- Keep `body` content concise — if the popover needs a form with many fields, open a `Drawer` or `Modal` instead.
