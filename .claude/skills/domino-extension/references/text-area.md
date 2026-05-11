# TextArea

```tsx
import { TextArea } from '@domino/extensions';
```

Multi-line text input. Like `TextInput`, always wrap in `FieldWrapper` outside of forms, or in `DominoFormItem` inside forms.

## Props

```ts
interface TextAreaProps extends AntTextAreaProps {
  // All standard AntD Input.TextArea props:
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;                                    // Fixed number of visible rows
  autoSize?: boolean | { minRows?: number; maxRows?: number }; // Auto-resize
  maxLength?: number;
  showCount?: boolean;
  allowClear?: boolean | { clearIcon?: ReactNode };
  variant?: 'outlined' | 'filled' | 'borderless';
  dataTest?: string;                                // default: 'default-text-area'
}
```

## Examples

### With FieldWrapper (from storybook)

```tsx
import { TextArea, FieldWrapper } from '@domino/extensions';

<FieldWrapper
  label="Description"
  extra="This is a caption under the input."
  optional
  tooltip="Help message content"
>
  <TextArea
    placeholder="Enter description"
    autoSize={{ minRows: 3, maxRows: 6 }}
  />
</FieldWrapper>
```

### Inside a DominoFormItem

```tsx
<DominoFormItem
  name="description"
  label="Description"
  rules={[{ required: true, message: 'Description is required.' }]}
>
  <TextArea
    placeholder="Enter description"
    rows={4}
    maxLength={500}
    showCount
    aria-label="Description"
  />
</DominoFormItem>
```

### Controlled with character count

```tsx
const [value, setValue] = useState('');

<TextArea
  value={value}
  onChange={e => setValue(e.target.value)}
  maxLength={200}
  showCount
  autoSize={{ minRows: 2, maxRows: 8 }}
  placeholder="Enter notes..."
  aria-label="Notes"
/>
```

## AntD behavioral notes

- **`autoSize`**: When `autoSize={true}`, the textarea grows with content but has no maximum. Use `{ minRows, maxRows }` to bound growth. This is almost always preferable to a fixed `rows` count.
- **`showCount`**: Renders the character count below the textarea. Combine with `maxLength` to show `x/max` format.
- **`allowClear`**: Renders an ✕ icon to clear the field. Works the same as on `TextInput`.
- **Resize handle**: AntD disables the native browser resize handle when `autoSize` is used. To manually disable the handle on a fixed-size textarea, set `style={{ resize: 'none' }}`.

## Guidelines

- Prefer `autoSize={{ minRows: 3 }}` over a fixed `rows` count — it avoids the jarring scroll-inside-textarea experience.
- Use `maxLength` + `showCount` to let users know when they're approaching a limit.
- In forms, use `DominoFormItem` for label and validation; outside forms use `FieldWrapper`.
