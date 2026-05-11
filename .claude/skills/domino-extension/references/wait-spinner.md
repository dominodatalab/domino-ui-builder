# WaitSpinner

```tsx
import { WaitSpinner } from '@domino/extensions';
```

Loading indicator. Use during data fetching, async operations, or component initialization. Renders either inline or as a full-page overlay.

## Props

```ts
interface WaitSpinnerProps {
  forPage?: boolean;    // Center spinner with full viewport height. Default: false
  size?: 'small' | 'default' | 'large';
  spinning?: boolean;   // Control visibility. Default: true
  tip?: string;         // Loading text shown below spinner
}
```

## Examples

### Full-page spinner (while loading initial data)

```tsx
import { WaitSpinner } from '@domino/extensions';

if (isLoading) {
  return <WaitSpinner forPage />;
}
```

### Inline spinner (within a card or section)

```tsx
if (isLoading) {
  return <WaitSpinner />;
}
```

### Inside a Modal (per Domino convention)

```tsx
<Modal open={open} title="Edit Configuration" ...>
  {isLoading ? <WaitSpinner forPage /> : <ConfigForm />}
</Modal>
```

### Controlled spinner overlay on content

```tsx
<WaitSpinner spinning={isLoading} tip="Saving changes...">
  <div>
    <p>Content that is loading...</p>
  </div>
</WaitSpinner>
```

### Small spinner (for inline/compact contexts)

```tsx
<Space>
  <WaitSpinner size="small" />
  <span>Validating...</span>
</Space>
```

## AntD behavioral notes

- **`forPage={true}`**: Centers the spinner vertically in the viewport — use for page-level loading states before content renders.
- **`spinning={false}`**: When used as an overlay wrapper, set `spinning={false}` to show content without the overlay. Avoid conditional rendering of the spinner wrapper itself.
- **`tip`**: The loading text renders below the spinner. Keep it brief (e.g. "Loading...", "Saving changes...").

## Guidelines

- Use `forPage` when replacing the entire page content during initial load.
- Use plain `<WaitSpinner />` (no `forPage`) inside cards, sections, or modals.
- In modals, show `<WaitSpinner forPage />` when the modal body is loading — don't use `confirmLoading` as a substitute.
- Don't show both a spinner and empty/skeleton content — pick one loading pattern per area.
- For button-level loading (saving), use `Button loading` prop instead of a `WaitSpinner`.
