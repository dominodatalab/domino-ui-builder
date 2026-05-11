# TextInput

```tsx
import { TextInput } from '@domino/extensions';
```

Single-line text input. In Domino, **always wrap in `FieldWrapper`** to get the label, caption, optional flag, tooltip, and error text — never add these manually.

## Props

```ts
// Extends AntD InputProps with:
interface TextInputProps {
  size?: 'small' | 'middle' | 'large';  // default: 'middle'
  // All standard AntD Input props...
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  allowClear?: boolean | { clearIcon?: ReactNode };
  maxLength?: number;
  showCount?: boolean;
  variant?: 'outlined' | 'filled' | 'borderless';
}
```

### Sub-components

```tsx
TextInput.Search    // Input with search button/icon
TextInput.Password  // Input with show/hide password toggle
TextInput.Group     // Group multiple inputs inline
```

## Standard pattern — always use with FieldWrapper (from storybook)

```tsx
import { TextInput, FieldWrapper, Button } from '@domino/extensions';

<FieldWrapper
  label="Project name"
  extra="This is a caption under the input."
  optional
  tooltip="Help message content"
  errorText={errorText}
  extraAction={
    <Button color="regular" size="small" type="tertiary">
      Extra action
    </Button>
  }
>
  <TextInput placeholder="Enter project name" />
</FieldWrapper>
```

### Basic controlled input

```tsx
const [value, setValue] = useState('');

<TextInput
  value={value}
  onChange={e => setValue(e.target.value)}
  placeholder="Enter text"
  aria-label="Field name"
/>
```

### With prefix icon

```tsx
import { IconResolver } from '@domino/extensions';

<TextInput
  prefix={<IconResolver collection="regular" icon="MagnifyingGlass" aria-label="" iconSize="small" />}
  placeholder="Search..."
  aria-label="Search"
  allowClear
/>
```

### Search variant

```tsx
<TextInput.Search
  placeholder="Search by name"
  onSearch={handleSearch}
  aria-label="Search"
  allowClear
/>
```

### Password variant

```tsx
<TextInput.Password
  value={password}
  onChange={e => setPassword(e.target.value)}
  placeholder="Enter password"
  aria-label="Password"
/>
```

## AntD behavioral notes

- **Dynamic prefix/suffix causes focus loss**: When `prefix`, `suffix`, or `showCount` are conditionally added/removed, React destroys and recreates the DOM node — the input loses focus. Fix: always render `prefix={condition ? <Icon /> : <span />}` (an empty `<span />` keeps the DOM stable).
- **Controlled mode consistency**: When using `value` prop, the displayed value must always reflect the actual state — including while async validation is running. Showing a different value than `value` causes form submission misalignment.
- **`showCount`** renders the count below the input. Combine with `maxLength` to show `x/max` format.

## Guidelines

- In forms, always place `TextInput` inside a `DominoFormItem` (which handles label, validation, error display) — never create separate `<label>` elements.
- Outside of forms (e.g., search/filter bars), wrap in `FieldWrapper` for label + caption.
- Use `size="small"` inside table cells, toolbars, and compact layouts.
- Use `allowClear` on search/filter inputs so users can reset quickly.
