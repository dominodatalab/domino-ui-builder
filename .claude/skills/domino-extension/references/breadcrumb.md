# Breadcrumb

```tsx
import { Breadcrumb } from '@domino/extensions';
```

Navigation trail showing the current page's position in the hierarchy. Renders as clickable links separated by `/` separators.

## Props

```ts
interface BreadcrumbProps extends AntBreadcrumbProps {
  items: BreadcrumbItem[];
}

interface BreadcrumbItem {
  path: string;           // URL path for the link
  breadcrumbName: string; // Display label
  // OR in AntD v5 format:
  href?: string;
  title?: ReactNode;
}
```

## Examples

### Standard breadcrumb (from storybook)

```tsx
import { Breadcrumb } from '@domino/extensions';

<Breadcrumb
  items={[
    { path: '/project', breadcrumbName: 'My Project' },
    { path: '/data', breadcrumbName: 'Data' },
    { path: '/datasource', breadcrumbName: 'My Data Source' },
  ]}
/>
```

### With React Router integration

```tsx
import { Breadcrumb } from '@domino/extensions';
import { useLocation } from 'react-router-dom';

// The last item is the current page (not clickable)
<Breadcrumb
  items={[
    { path: '/projects', breadcrumbName: 'Projects' },
    { path: `/projects/${projectId}`, breadcrumbName: projectName },
    { path: '#', breadcrumbName: 'Settings' },  // Current page
  ]}
/>
```

### With icons in breadcrumb items

```tsx
<Breadcrumb
  items={[
    {
      href: '/',
      title: <IconResolver collection="light" icon="Home" aria-label="home" />,
    },
    {
      href: '/projects',
      title: 'Projects',
    },
    {
      title: projectName,  // No href — current page
    },
  ]}
/>
```

## AntD behavioral notes

- **Last item**: The last `BreadcrumbItem` renders as plain text (not a link) by convention — it represents the current page.
- **`isRouteLink`**: Some Domino breadcrumb implementations use a `isRouteLink` prop to choose between `<a>` and React Router `<Link>`. Check the specific Breadcrumb variant being used.
- **Separator**: Defaults to `/`. Override with `separator` prop (e.g. `separator=">"`).
- **`itemRender`**: AntD prop to customize how each item renders — useful for integrating with React Router's `Link` component.

## Guidelines

- Always make intermediate items clickable links. Only the last item (current page) should be non-interactive.
- Keep breadcrumb labels short — use the page name, not the full title.
- Show breadcrumbs only when the page is 2+ levels deep. Top-level pages don't need a breadcrumb.
- Place breadcrumbs at the top of the page content, above the page title.
