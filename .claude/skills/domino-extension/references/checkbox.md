# Checkbox

```tsx
import { Checkbox } from '@domino/extensions';
```

Standard checkbox for boolean or multi-selection. Domino's `Checkbox` adds a `descriptionText` prop for secondary help text below the label.

## Props

```ts
interface DominoCheckboxProps extends AntCheckboxProps {
  descriptionText?: string;    // Optional secondary text below the label (Domino-specific)
  dataTest?: string;
}
```

### Checkbox.Group props

```ts
interface CheckboxGroupProps {
  options?: (string | CheckboxOption)[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (checkedValues: CheckboxValueType[]) => void;
  disabled?: boolean;
}

interface CheckboxOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}
```

## Examples

### Single checkbox with description (from storybook)

```tsx
const [checked1, setChecked1] = useState(false);
const [checked2, setChecked2] = useState(false);

<Checkbox
  checked={checked1}
  onChange={e => setChecked1(e.target.checked)}
>
  Option 1
</Checkbox>

<Checkbox
  checked={checked2}
  onChange={e => setChecked2(e.target.checked)}
  descriptionText="Optional metadata about this option"
>
  Option 2
</Checkbox>
```

### Checkbox group

```tsx
<Checkbox.Group
  options={[
    { label: 'Enable logging', value: 'logging' },
    { label: 'Enable metrics', value: 'metrics' },
    { label: 'Enable alerts', value: 'alerts', disabled: true },
  ]}
  value={enabledFeatures}
  onChange={setEnabledFeatures}
/>
```

### Select-all with indeterminate state (AntD pattern)

```tsx
const allValues = ['logging', 'metrics', 'alerts'];
const [checked, setChecked] = useState<string[]>([]);

const isAll = checked.length === allValues.length;
const isIndeterminate = checked.length > 0 && !isAll;

<Checkbox
  indeterminate={isIndeterminate}
  checked={isAll}
  onChange={e => setChecked(e.target.checked ? allValues : [])}
>
  Select all
</Checkbox>

<Checkbox.Group
  options={allValues.map(v => ({ label: v, value: v }))}
  value={checked}
  onChange={setChecked}
/>
```

### Inside a DominoFormItem

```tsx
<DominoFormItem name="acceptTerms" valuePropName="checked">
  <Checkbox>I agree to the terms and conditions</Checkbox>
</DominoFormItem>
```

## AntD behavioral notes

- **`indeterminate`**: Visual-only state — does not affect the `checked` value. It signals "partial selection" to the user (dash icon instead of tick). You must manage the actual selection state yourself.
- **`Checkbox.Group` vs individual checkboxes**: Use `Checkbox.Group` whenever options are mutually non-exclusive and you want a single `onChange` callback with an array of selected values. Individual checkboxes are for standalone boolean fields.
- **`valuePropName="checked"`**: Required when using `Checkbox` inside `DominoFormItem` — AntD Form reads `checked` not `value` for checkboxes.

## Guidelines

- Use `descriptionText` to explain what a checkbox option does when the label alone isn't sufficient.
- Always use positive framing: "Enable notifications" not "Disable notification suppression".
- Use `indeterminate` on "select all" checkboxes when some but not all items are selected.
- For a single boolean setting that takes effect immediately (no form submit needed), use `Toggle` instead.
