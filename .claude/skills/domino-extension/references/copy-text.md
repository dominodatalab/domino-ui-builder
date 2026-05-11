# CopyText

```tsx
import { CopyText } from '@domino/extensions';
```

Displays text with a clipboard copy button. Clicking the icon copies the text and shows a success toast. Use for API keys, file paths, commands, and any value users need to paste elsewhere.

## Props

```ts
interface CopyTextProps {
  text: string;                  // Text to display and copy to clipboard
  onCopy?: (text: string) => void;  // Optional callback after successful copy
  style?: CSSProperties;
  className?: string;
}
```

## Examples

### File path (from storybook)

```tsx
import { CopyText } from '@domino/extensions';

<CopyText text="/domino/datasets/project-files/data.csv" />
```

### API key

```tsx
<CopyText text="sk-prod-a1b2c3d4e5f6g7h8i9j0" />
```

### In a KeyValue panel

```tsx
<KeyValue
  keyLabel="API endpoint"
  value={<CopyText text="https://api.example.com/v1" />}
/>
```

### In a table cell

```tsx
{
  key: 'apiKey',
  dataIndex: 'apiKey',
  title: 'API Key',
  render: (key) => <CopyText text={key} />,
}
```

### With custom copy callback

```tsx
<CopyText
  text={command}
  onCopy={(text) => {
    analytics.track('command_copied', { command: text });
  }}
/>
```

## Behavior notes

- **Success toast**: `CopyText` internally calls `Toastr.success()` after copying — no need to handle this in `onCopy`.
- **Display**: Renders the full `text` string inline with a copy icon button to the right.
- **Clipboard API**: Uses the browser's `navigator.clipboard.writeText()`. Works in secure contexts (HTTPS) only.

## Guidelines

- Use `CopyText` for any value users regularly need to paste: API keys, tokens, file paths, CLI commands, connection strings.
- Keep `text` as the raw value (not formatted) — what's displayed is what gets copied.
- Don't truncate very long values with CSS `overflow: hidden` — the full value must be visible for users to verify what they're copying. For very long strings, consider showing a truncated display with a separate "copy full path" icon button.
