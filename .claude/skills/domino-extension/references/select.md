# Select

```tsx
import { Select } from '@domino/extensions';
```

Dropdown select with search, multi-select, and rich custom option labels.

## Props

```ts
interface SelectProps extends Omit<AntSelectProps, 'options'> {
  options?: SelectOption[];
  mode?: 'multiple' | 'tags';
  showSearch?: boolean;
  filterOption?: boolean | ((input: string, option: SelectOption) => boolean);
  optionFilterProp?: string;      // Key used for filtering — use 'data-search' for complex labels
  labelInValue?: boolean;         // onChange delivers { label, value } instead of just value
  maxCount?: number;              // Max selected items before remaining are disabled
  maxTagCount?: number | 'responsive';
  virtual?: boolean;              // Virtual scroll for large lists (default: true)
  loading?: boolean;
  disabled?: boolean;
  allowClear?: boolean;
  dropdownWidth?: number | string;
  dataTest?: string;
}
```

### Sub-components

```tsx
Select.Option        // Individual option element (alternative to options prop)
Select.OptGroup      // Option group header
Select.OptionLabel   // Domino-specific rich label (icon + text + extra + metadata)
```

### OptionLabel props

```tsx
<Select.OptionLabel
  leftIcon={<ReactNode />}   // Icon before the label
  extra="extra text"          // Right-aligned secondary text
  metadata="metadata text"   // Smaller text below the label
  dataTest="option-label"
>
  Label text
</Select.OptionLabel>
```

## Examples

### Single select in a FieldWrapper (from storybook)

```tsx
<FieldWrapper label="Input label" extra="This is a caption under an input." optional tooltip="Help message content">
  <Select
    optionFilterProp="data-search"
    options={options}
    placeholder="Select an option"
  />
</FieldWrapper>
```

### With rich OptionLabel (from storybook)

```tsx
import { IconResolver } from '@domino/extensions';

<Select placeholder="Select environment" aria-label="Environment">
  {environments.map(env => (
    <Select.Option key={env.id} value={env.id} data-search={env.name}>
      <Select.OptionLabel
        leftIcon={<IconResolver aria-label="github icon" collection="brands" icon="Github" />}
        metadata={`${env.cores} cores • ${env.memory} GB`}
        extra={env.status}
      >
        {env.name}
      </Select.OptionLabel>
    </Select.Option>
  ))}
</Select>
```

### Multi-select with validation (from storybook)

```tsx
<DominoForm form={form} layout="vertical">
  <DominoFormItem
    name="tags"
    label="Input label"
    extra="This is a caption under an input."
    optional
    tooltip="Help message content"
    rules={[{ required: true, message: 'This field is required.' }]}
  >
    <Select mode="multiple" placeholder="Select an option" />
  </DominoFormItem>
  <Button type="primary" htmlType="submit">Submit</Button>
</DominoForm>
```

### Searchable select

```tsx
<Select
  showSearch
  optionFilterProp="label"
  filterOption={(input, option) =>
    String(option?.label).toLowerCase().includes(input.toLowerCase())
  }
  options={users.map(u => ({ label: u.name, value: u.id }))}
  placeholder="Search users..."
  aria-label="User"
/>
```

## AntD behavioral notes

- **`optionFilterProp`**: When using `Select.Option` children (not `options` prop), set `optionFilterProp="data-search"` and add `data-search={searchableText}` on each `Select.Option`. This lets AntD search by that attribute rather than the React node label.
- **`labelInValue`**: Setting `labelInValue={true}` makes `onChange` deliver `{ label, value }` objects instead of just the value. Useful when you need to display the label after selection without re-fetching.
- **`maxCount`**: When the user selects `maxCount` items, remaining options are automatically disabled. This prevents needing manual disabled logic.
- **`virtual`**: Virtual scroll is enabled by default for performance. Disable only if you need to render custom DOM that relies on all options being mounted.
- **Copying/pasting**: Works only in `mode="tags"` and `mode="multiple"`.

## Guidelines

- Always use `optionFilterProp="data-search"` when options have complex JSX labels — otherwise search won't work.
- Use the `options` prop (array) instead of `<Select.Option>` children when possible — it avoids unnecessary DOM nodes and is more performant.
- Use `Select.OptionLabel` for rich options that need icons, metadata, or extra info.
- Combine with `DominoFormItem` for form validation; use `FieldWrapper` for standalone selects outside forms.
