# Autocomplete

```tsx
import { Autocomplete } from '@domino/extensions';
```

Free-text input with a filterable suggestion dropdown. Unlike `Select`, the user can type any value — suggestions are optional. The trigger input is passed as `children`, giving you control over the input component used.

## Props

```ts
interface AutocompleteProps extends AntAutoCompleteProps {
  options?: AutocompleteOption[];
  value?: string;
  onChange?: (value: string, option: DefaultOptionType | DefaultOptionType[]) => void;
  onSelect?: (value: string, option: DefaultOptionType) => void;
  onSearch?: (value: string) => void;
  filterOption?: boolean | ((inputValue: string, option: DefaultOptionType) => boolean);
  loading?: boolean;
  disabled?: boolean;
  children?: ReactNode;   // The input trigger (TextInput, TextInput.Search, etc.)
}

interface AutocompleteOption {
  value: string;
  label?: ReactNode;  // Rich label using Select.OptionLabel
}
```

## Examples

### With FieldWrapper and rich option labels (from storybook)

```tsx
import { Autocomplete, TextInput, FieldWrapper, Select, IconResolver } from '@domino/extensions';

const options = [
  {
    value: 'Apple',
    label: (
      <Select.OptionLabel
        leftIcon={<IconResolver aria-label="fruit icon" collection="brands" icon="Github" />}
        metadata="metadata"
        extra="extra"
      >
        Apple
      </Select.OptionLabel>
    ),
  },
  {
    value: 'Banana',
    label: (
      <Select.OptionLabel
        leftIcon={<IconResolver aria-label="fruit icon" collection="brands" icon="Github" />}
        metadata="metadata"
        extra="extra"
      >
        Banana
      </Select.OptionLabel>
    ),
  },
];

const filter = (inputValue: string, option) =>
  String(option?.value).toLowerCase().includes(inputValue.toLowerCase());

const [value, setValue] = useState('');

<FieldWrapper label="Autocomplete label" optional extra="Caption">
  <Autocomplete
    options={options}
    filterOption={filter}
    value={value}
    onChange={setValue}
  >
    <TextInput placeholder="Search" />
  </Autocomplete>
</FieldWrapper>
```

### With async loading (from storybook)

```tsx
const [loading, setLoading] = useState(false);
const [value, setValue] = useState('');

const handleSearch = () => {
  setLoading(true);
  fetchOptions(value).then(opts => {
    setOptions(opts);
    setLoading(false);
  });
};

<Autocomplete
  options={filteredOptions}
  loading={loading}
  onSearch={handleSearch}
  value={value}
  onChange={setValue}
>
  <TextInput placeholder="Search fruits" />
</Autocomplete>
```

### With search input variant (from storybook)

```tsx
const [value, setValue] = useState('');

<Autocomplete
  options={filteredOptions}
  value={value}
  onChange={setValue}
  onSelect={setValue}
>
  <TextInput.Search placeholder="Search..." />
</Autocomplete>
```

## AntD behavioral notes

- **`children` as trigger**: The `children` prop replaces the default AntD input. You can pass any input component (`TextInput`, `TextInput.Search`, etc.) — AntD wires up the value and events automatically.
- **`filterOption`**: When `true`, AntD filters by the `value` string. Pass a custom function to filter by a computed field. When `false`, no filtering occurs — manage filtering externally with `onSearch`.
- **`onSearch` vs `onChange`**: `onSearch` fires as the user types (before selecting). `onChange` fires on both typing and option selection. For async search, use `onSearch` to trigger the fetch and `onChange` to update the displayed value.
- **`loading`**: Shows a spinner in the dropdown — use during async option fetching.

## Guidelines

- Use `Autocomplete` when the user might type a value that isn't in the suggestion list. For constrained selection, use `Select`.
- Wrap in `FieldWrapper` for label and caption outside forms; use `DominoFormItem` inside forms.
- Use `Select.OptionLabel` for rich option labels (icon, metadata, extra) — the same sub-component works in both `Select` and `Autocomplete`.
- Always implement `filterOption` or manage filtering in `onSearch` — without filtering, all options always show.
