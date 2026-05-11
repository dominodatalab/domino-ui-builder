# Callout

```tsx
import { Callout } from '@domino/extensions';
```

Inline contextual message banner. Use for non-blocking informational alerts, warnings, and error messages within page content. Supports types: `neutral`, `info`, `success`, `warning`, `error`.

> Note: The previous `InfoBox` / `SuccessBox` / `WarningBox` / `DangerBox` components are superseded by `Callout` with the `type` prop.

## Props

```ts
interface CalloutProps {
  type: 'neutral' | 'info' | 'success' | 'warning' | 'error';
  message: ReactNode;            // Main callout message
  extra?: ReactNode;             // Extra content on the right side (e.g. a Link or Button)
  leftContent?: ReactNode;       // Extra content on the left side (e.g. ProgressBar)
  leftContentMinWidth?: string;  // Min-width for the left content area (e.g. '40px')
}
```

## Examples

### Info callout (from storybook)

```tsx
import { Callout, Link } from '@domino/extensions';

<Callout
  type="info"
  message="This is a callout message"
  extra={
    <Link showIcon to="/docs" type="icon-link-end">
      Learn more
    </Link>
  }
/>
```

### Warning callout

```tsx
<Callout
  type="warning"
  message="Your trial expires in 3 days. Upgrade to continue using all features."
  extra={
    <Button type="primary" size="small">Upgrade</Button>
  }
/>
```

### Error callout

```tsx
<Callout
  type="error"
  message="The workspace failed to start. Check the logs for more details."
/>
```

### Success callout

```tsx
<Callout
  type="success"
  message="Your changes have been saved successfully."
/>
```

### With left content (progress indicator)

```tsx
import { ProgressBar } from '@domino/extensions';

<Callout
  type="info"
  message="Building environment — this may take a few minutes."
  leftContent={<ProgressBar percent={60} />}
  leftContentMinWidth="40px"
/>
```

### Neutral informational callout

```tsx
<Callout
  type="neutral"
  message="Projects in this workspace are shared with your team."
/>
```

## Guidelines

- Use `type="info"` for general information the user should be aware of.
- Use `type="warning"` for potential issues that require attention but don't block the user.
- Use `type="error"` for failures, validation errors, or critical issues.
- Use `type="success"` for confirmation after a successful action.
- Use `type="neutral"` for passive information with no urgency.
- Use `extra` for a single related action (link or small button) — don't put multiple actions in `extra`.
- Place `Callout` at the top of a form, card, or section — not in the middle of content.
- For blocking notifications that require user action, use a `Modal` instead.
