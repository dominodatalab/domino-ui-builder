# Accordion

```tsx
import { Accordion } from '@domino/extensions';
```

Collapsible content panels. Domino's `Accordion` accepts an `items` array with an optional `summary` prop that shows a preview of the content while the panel is collapsed.

## Props

```ts
interface AccordionProps extends Omit<AntCollapseProps, 'items'> {
  items: AccordionItem[];
  defaultActiveKey?: string | string[];
  activeKey?: string | string[];
  onChange?: (keys: string | string[]) => void;
  dataTest?: string;
}

interface AccordionItem {
  key: string;
  title: ReactNode;       // Panel header label
  children: ReactNode;    // Panel body content
  summary?: ReactNode;    // Preview text shown next to the title when collapsed (Domino-specific)
  disabled?: boolean;
}
```

## Examples

### Default single panel (from storybook)

```tsx
import { Accordion } from '@domino/extensions';

<Accordion
  items={[
    {
      key: '1',
      title: 'Accordion title',
      children: 'This is the accordion content that can be collapsed and expanded.',
    },
  ]}
/>
```

### With summary (from storybook)

```tsx
<Accordion
  items={[
    {
      key: '1',
      title: 'Hardware utilization',
      summary: '50% CPU, 60% memory',
      children: (
        <div>
          <p>CPU usage: 50%</p>
          <p>Memory usage: 60%</p>
          <p>Disk usage: 30%</p>
        </div>
      ),
    },
  ]}
/>
```

### Multiple panels with summary, one expanded by default (from storybook)

```tsx
<Accordion
  defaultActiveKey={['1']}
  items={[
    {
      key: '1',
      title: 'Model configuration',
      summary: 'Classification model',
      children: (
        <div>
          <p>Created: 15-01-24</p>
          <p>Model Type: Classification</p>
          <p>Hardware Tier: Small</p>
        </div>
      ),
    },
    {
      key: '2',
      title: 'Dependencies',
      summary: '3 packages installed',
      children: <p>PySy and 2 others</p>,
    },
    {
      key: '3',
      title: 'Execution history',
      children: <p>This panel has no summary.</p>,
    },
  ]}
/>
```

### Controlled accordion

```tsx
const [activeKeys, setActiveKeys] = useState<string[]>(['1']);

<Accordion
  activeKey={activeKeys}
  onChange={(keys) => setActiveKeys(Array.isArray(keys) ? keys : [keys])}
  items={panels}
/>
```

## AntD behavioral notes

- **Multiple panels open**: By default AntD Collapse allows multiple panels open simultaneously. To allow only one at a time (accordion behavior), set `accordion={true}` on the component.
- **`defaultActiveKey`**: Accepts either a string (single key) or string array (multiple). Use an array even for a single panel to keep types consistent.
- **`summary`**: Domino-specific — renders next to the title header when the panel is collapsed. Useful for showing a "current value" preview without expanding.

## Guidelines

- Use `summary` when the panel title alone doesn't convey the current state (e.g. "Hardware Tier" → summary: "Small, 4 CPUs").
- Use `defaultActiveKey` to pre-open panels that users are most likely to interact with first.
- Keep panel titles short and descriptive — they're always visible.
- For simple show/hide of a single block, a `Collapse` or conditional render may be simpler than `Accordion`.
