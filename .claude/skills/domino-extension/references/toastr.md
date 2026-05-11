# Toastr

```tsx
import { Toastr } from '@domino/extensions';
```

Imperative toast notification system. Call `Toastr.success()`, `Toastr.error()`, or `Toastr.warning()` to show a notification that auto-dismisses (or stays until closed).

## API

```ts
// All methods are static — no component needed
Toastr.success(text: string, options?: ToastrOptions): void;
Toastr.error(text: string, options?: ToastrOptions): void;
Toastr.warning(text: string, options?: ToastrOptions): void;

interface ToastrOptions {
  supportingText?: string;  // Secondary text below main message
  duration?: number;        // Auto-dismiss seconds. 0 = never auto-dismiss. Default: 3
  showButton?: boolean;     // Show "View more details" action button
  showCloseIcon?: boolean;  // Show × close button. Default: true
  onButtonClick?: () => void;  // Handler for the action button
}
```

## Examples

### Success notification (from storybook pattern)

```tsx
import { Toastr } from '@domino/extensions';

// After a successful save:
Toastr.success('Changes saved successfully.');
```

### Error notification (persists until closed)

```tsx
// Errors default to duration=0 (never auto-dismiss):
Toastr.error('Failed to start workspace. Please try again.', {
  supportingText: 'Check the logs for detailed error information.',
  showButton: true,
  onButtonClick: () => navigateToLogs(),
});
```

### Warning notification

```tsx
Toastr.warning('Your session will expire in 5 minutes.', {
  supportingText: 'Save your work to avoid losing changes.',
  duration: 10,
});
```

### Success with supporting text

```tsx
Toastr.success('Project created', {
  supportingText: 'my-new-project is ready. You can now add files and collaborators.',
  duration: 5,
});
```

### Error without auto-dismiss

```tsx
Toastr.error('API connection failed', {
  supportingText: 'Unable to reach the server. Check your network connection.',
  duration: 0,     // Stay until user closes
  showButton: true,
  onButtonClick: () => window.location.reload(),
});
```

## Toast types reference

| Type | Duration default | Use case |
|------|-----------------|----------|
| `success` | 3s | Action completed successfully |
| `error` | 0 (no auto-dismiss) | Action failed, requires attention |
| `warning` | 3s | Potential issue, not blocking |

## AntD behavioral notes

- `Toastr` is implemented on top of AntD's `notification` API but with Domino's visual style and simplified interface.
- **Stacking**: Multiple toasts stack vertically. They don't replace each other — each `Toastr.*()` call adds a new notification.
- **`duration: 0`**: The toast stays open until the user clicks the close icon. Domino applies this default for errors automatically.

## Guidelines

- Use `Toastr` for transient feedback after user actions (form submit, file upload, item delete).
- Never use `Toastr` for persistent errors that require the user to take action — use a `Callout` in the page instead.
- Keep `text` brief (one sentence). Use `supportingText` for additional context.
- Use `showButton` + `onButtonClick` to provide a quick action (e.g. "View logs", "Undo") without requiring navigation.
- `Toastr.error()` should almost always have `duration: 0` — errors need to be seen.
