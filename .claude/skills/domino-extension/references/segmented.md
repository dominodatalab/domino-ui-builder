# Segmented

```tsx
import { Segmented } from '@domino/extensions';
```

Compact mutually exclusive option selector rendered as a button group. Best for 2–4 short options where descriptions aren't needed. For longer option lists or options with descriptions, use `Radio.Group`.

## Props

```ts
interface SegmentedProps extends AntSegmentedProps {
  options: (string | number | SegmentedOption)[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  block?: boolean;          // Stretch to fill container width
  size?: 'large' | 'middle' | 'small';
  dataTest?: string;
}

interface SegmentedOption {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
  icon?: ReactNode;
}
```

## Examples

### Basic segmented control (from storybook)

```tsx
import { Segmented } from '@domino/extensions';

<Segmented
  options={['Daily', 'Weekly', 'Monthly']}
  defaultValue="Daily"
  onChange={(value) => console.log('Selected:', value)}
/>
```

### Controlled

```tsx
const [period, setPeriod] = useState<string>('daily');

<Segmented
  value={period}
  onChange={setPeriod}
  options={[
    { label: 'Day', value: 'daily' },
    { label: 'Week', value: 'weekly' },
    { label: 'Month', value: 'monthly' },
  ]}
/>
```

### With icons

```tsx
import { IconResolver } from '@domino/extensions';

<Segmented
  options={[
    {
      label: 'Grid',
      value: 'grid',
      icon: <IconResolver collection="light" icon="Grid2" aria-label="grid view" />,
    },
    {
      label: 'List',
      value: 'list',
      icon: <IconResolver collection="light" icon="List" aria-label="list view" />,
    },
  ]}
  defaultValue="grid"
/>
```

### Block (full width)

```tsx
<Segmented
  block
  options={['Option A', 'Option B', 'Option C']}
  defaultValue="Option A"
/>
```

## AntD behavioral notes

- **`onChange`**: Receives the `value` directly (not an event object) — unlike `Radio.Group` which returns `e.target.value`.
- **`block`**: When true, each segment stretches equally to fill the container. Useful for full-width controls at the top of a panel.
- **Disabled options**: Set `disabled: true` on individual `SegmentedOption` objects to disable specific choices without disabling the whole control.
- **Icons only**: Omit `label` in a `SegmentedOption` when you want icon-only segments. Ensure each icon has a descriptive `aria-label`.

## Guidelines

- Use `Segmented` for 2–4 short options without descriptions (e.g. view mode, time period, display format).
- Use `Radio.Group` when options need descriptions or tooltips.
- Use `Select` when there are more than 4 options.
- Don't mix icon-only and label-only segments in the same group — be consistent.
