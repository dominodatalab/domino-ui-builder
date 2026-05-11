# AnchorLinks

```tsx
import { AnchorLinks } from '@domino/extensions';
```

Side-scrolling navigation that renders both the anchor menu and the content sections it links to. Each item renders its own content via a `renderContent` function and handles scroll-based active link highlighting automatically.

## Props

```ts
interface AnchorLinksProps {
  items: AnchorLinkItem[];
  getContainer?: () => HTMLElement;  // Scroll container — defaults to window
  onClick?: (e: MouseEvent, link: { title: ReactNode; href: string }) => void;
}

interface AnchorLinkItem {
  key: string;
  title: ReactNode;          // Nav link label
  href: string;              // Anchor hash (e.g. '#section-1')
  renderContent: (id: string) => ReactNode;  // Renders the section content with the given id
  children?: AnchorLinkItem[];  // Nested anchor items
}
```

## Examples

### Basic anchor links (from storybook)

```tsx
import { AnchorLinks } from '@domino/extensions';

const Section = ({ id }: { id: string }) => (
  <div id={id} style={{ height: 500 }}>
    Content for {id}
  </div>
);

<AnchorLinks
  items={[
    {
      key: 'overview',
      title: 'Overview',
      href: '#overview',
      renderContent: (id) => <Section id={id} />,
    },
    {
      key: 'settings',
      title: 'Settings',
      href: '#settings',
      renderContent: (id) => <Section id={id} />,
    },
    {
      key: 'advanced',
      title: 'Advanced',
      href: '#advanced',
      renderContent: (id) => <Section id={id} />,
    },
  ]}
/>
```

### With nested items (from storybook)

```tsx
<AnchorLinks
  items={[
    {
      key: 'item1',
      title: 'Section 1',
      href: '#item1',
      renderContent: (id) => <Section id={id} />,
    },
    {
      key: 'item2',
      title: 'Section 2',
      href: '#item2',
      renderContent: (id) => <Section id={id} />,
      children: [
        {
          key: 'item2-1',
          title: 'Sub-section 2.1',
          href: '#item2-1',
          renderContent: (id) => <Section id={id} />,
          children: [
            {
              key: 'item2-1-1',
              title: 'Sub-section 2.1.1',
              href: '#item2-1-1',
              renderContent: (id) => <Section id={id} />,
            },
          ],
        },
      ],
    },
  ]}
/>
```

### With custom scroll container

```tsx
const containerRef = useRef<HTMLDivElement>(null);

<div ref={containerRef} style={{ height: 600, overflow: 'auto' }}>
  <AnchorLinks
    items={items}
    getContainer={() => containerRef.current!}
  />
</div>
```

## AntD behavioral notes

- **`href` must be an anchor hash**: Each `href` should be `#id` matching the `id` attribute set on the rendered section. The `renderContent` function receives the `id` (without `#`) to apply to the section container.
- **Scroll detection**: AntD Anchor watches scroll position and highlights the link corresponding to the section currently in view. This only works when the section elements are in the DOM.
- **`getContainer`**: Required when the scrolling container is not `window` — pass a function returning the DOM element that scrolls.

## Guidelines

- Use `AnchorLinks` for long single-page settings forms or documentation pages where users need to jump to sections.
- Each `renderContent` must apply the `id` argument to the root element of the section — without this, scroll tracking won't work.
- Use `children` nesting for hierarchical sections (e.g. "Advanced" with "Performance" and "Security" sub-sections).
- Keep anchor titles short (2–4 words) — they appear in a narrow sidebar.
