# Link / RouterLink

```tsx
import { Link, RouterLink } from '@domino/extensions';
```

Two link components for different navigation contexts:
- `Link` — standard `<a>` element for external URLs and absolute paths
- `RouterLink` — React Router `<Link>` for in-app navigation

## Props

```ts
interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;                 // href / URL
  disabled?: boolean;
  showIcon?: boolean;         // Show external link icon after label
  color?: ThemeColor;         // default: 'palette.primary'
  tooltipMessage?: string;    // Tooltip on hover (especially useful for disabled links)
  type?: 'icon-link-end';     // Icon variant
  target?: '_blank' | '_self' | string;
}

// RouterLink has the same interface but 'to' navigates via React Router
```

## Examples

### External link (from storybook)

```tsx
import { Link } from '@domino/extensions';

<Link to="https://docs.domino.ai/" target="_blank" showIcon>
  Documentation
</Link>
```

### React Router link (from storybook)

```tsx
import { RouterLink } from '@domino/extensions';
import { BrowserRouter } from 'react-router-dom';

<RouterLink to="/projects/my-project">
  My Project
</RouterLink>
```

### With external link icon

```tsx
<Link to="https://domino.ai/" target="_blank" showIcon>
  Learn more
</Link>
```

### Disabled link with tooltip

```tsx
<Link
  to="/settings"
  disabled
  tooltipMessage="You need admin permissions to access this page"
>
  Admin Settings
</Link>
```

### Small link (in EmptyState and captions)

```tsx
<Link
  style={{ fontSize: '14px' }}
  to="https://docs.domino.ai/docs/"
  target="_blank"
  showIcon
>
  View documentation
</Link>
```

## AntD behavioral notes

- **`showIcon`**: Appends a small `ArrowUpRightFromSquare` icon after the text — signals to users that the link opens in a new tab or navigates externally.
- **`disabled`**: When true, renders the link as plain non-clickable text. Unlike `<a href="">`, this prevents navigation completely.
- **`target="_blank"`**: Always pair with `rel="noopener noreferrer"` for security — the Domino component handles this automatically.

## Guidelines

- Use `RouterLink` for all in-app navigation — it integrates with React Router's history and avoids full page reloads.
- Use `Link` for external URLs and documentation links.
- Always add `target="_blank"` + `showIcon` for external links — users expect visual cues when a link opens a new tab.
- Use `disabled` + `tooltipMessage` to explain why a link is unavailable rather than hiding it.
- Avoid custom `color` overrides — the default primary blue matches the design system.
