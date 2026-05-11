# Cascader

```tsx
import { Cascader } from '@domino/extensions';
```

Hierarchical option selector. Displays a drill-down panel for nested data (e.g. region → country → city). Supports single and multiple selection.

## Props

```ts
interface CascaderProps extends AntCascaderProps {
  options: CascaderOption[];
  multiple?: boolean;           // Allow multiple selections
  expandTrigger?: 'click' | 'hover'; // default: 'click'
  placeholder?: string;
  defaultValue?: string[][];   // Array of value paths for multi-select
  value?: string[][];
  onChange?: (value: string[][], selectedOptions: CascaderOption[][]) => void;
  disabled?: boolean;
  showSearch?: boolean | CascaderSearchConfig;
  allowClear?: boolean;
  dataTest?: string;
}

interface CascaderOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  children?: CascaderOption[]; // Nested options
}
```

## Examples

### Single select (from storybook)

```tsx
import { Cascader } from '@domino/extensions';

const options = [
  {
    value: 'fruits',
    label: 'Fruits',
    children: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
    ],
  },
  {
    value: 'vegetables',
    label: 'Vegetables',
    children: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
    ],
  },
];

<Cascader
  options={options}
  placeholder="Select an option"
/>
```

### Multiple select with hover expand (from storybook)

```tsx
<Cascader
  options={options}
  multiple
  expandTrigger="hover"
  placeholder="Select options"
/>
```

### Multiple select with default values (from storybook)

```tsx
<Cascader
  options={options}
  multiple
  expandTrigger="hover"
  defaultValue={[
    ['fruits', 'apple'],
    ['fruits', 'banana'],
    ['grains', 'rice'],
  ]}
/>
```

### With FieldWrapper (from storybook)

```tsx
import { Cascader, FieldWrapper } from '@domino/extensions';

<FieldWrapper
  label="Input label"
  extra="This is a caption under an input."
  optional
  tooltip="Help message content"
>
  <Cascader
    options={options}
    multiple
    expandTrigger="hover"
    defaultValue={[
      ['fruits', 'apple'],
      ['vegetables', 'carrot'],
    ]}
  />
</FieldWrapper>
```

### With search

```tsx
<Cascader
  options={options}
  showSearch
  placeholder="Search..."
/>
```

## AntD behavioral notes

- **Value paths**: Each selected value is an array path like `['fruits', 'apple']` — not just the leaf value. For multi-select, you get an array of arrays.
- **`expandTrigger="hover"`**: Opens sub-panels on hover instead of click — preferred for deep hierarchies where click-to-expand gets tedious.
- **`showSearch`**: When enabled, AntD renders a search input. By default it searches by joining path labels. Pass a `filter` function to `showSearch` for custom search logic.
- **Popup positioning**: The cascade panels render in a portal — they will overflow fixed-height containers correctly.
- **`suffixIcon`**: AntD v5 removed the default suffix icon customization that was available in v4. Use CSS overrides only if needed.

## Guidelines

- Use `Cascader` for truly hierarchical data (3+ levels or parent–child relationships). For flat lists use `Select`.
- Use `expandTrigger="hover"` for hierarchies where users browse rather than search.
- Always use `FieldWrapper` for label, caption, and error display — never add these manually.
- Show at most 3–4 levels deep; more than that usually means the data model should be refactored.
