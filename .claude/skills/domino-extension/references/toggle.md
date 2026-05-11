# Toggle

```tsx
import { Toggle } from '@domino/extensions';
```

Boolean on/off switch. Use when a setting takes effect immediately — no form submit needed. For settings inside a form submission flow, prefer `Checkbox`.

## Props

```ts
interface ToggleProps extends Omit<SwitchProps, 'checkedChildren' | 'unCheckedChildren' | 'size'> {
  label?: ReactNode;     // Text label displayed to the right of the switch (Domino-specific)
  className?: string;
  dataTest?: string;
  // From AntD SwitchProps:
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: MouseEvent) => void;
  disabled?: boolean;
  loading?: boolean;
}
```

> `checkedChildren`, `unCheckedChildren`, and `size` are omitted from Domino's `Toggle`. Use the `label` prop for labeling — it renders to the right of the switch.

## Examples

### Basic toggle with label (from storybook)

```tsx
import { Toggle } from '@domino/extensions';

<Toggle label="Toggle Label" />
```

### Controlled toggle

```tsx
const [enabled, setEnabled] = useState(false);

<Toggle
  checked={enabled}
  onChange={setEnabled}
  label="Enable notifications"
/>
```

### Disabled state

```tsx
<Toggle
  checked={true}
  disabled
  label="Auto-save (always on)"
/>
```

### Loading state (while async operation completes)

```tsx
const [checked, setChecked] = useState(false);
const [loading, setLoading] = useState(false);

const handleChange = async (value: boolean) => {
  setLoading(true);
  await updateSetting(value);
  setChecked(value);
  setLoading(false);
};

<Toggle
  checked={checked}
  loading={loading}
  onChange={handleChange}
  label="Sync data automatically"
/>
```

### Inside a DominoFormItem

```tsx
<DominoFormItem name="isEnabled" valuePropName="checked">
  <Toggle label="Enable feature" />
</DominoFormItem>
```

## AntD behavioral notes

- **`onChange`**: Receives `(checked: boolean, event)` — the boolean value directly, unlike `Checkbox` which uses `e.target.checked`. This makes Toggle easier to wire to state.
- **`loading`**: Shows a spinner on the handle while an async operation is running. Use this to prevent double-clicks during save.
- **`size`**: Omitted intentionally in Domino's Toggle — a fixed size ensures visual consistency across the app.

## Guidelines

- Use `Toggle` for settings that save immediately (live updates), not for form fields that submit in bulk.
- Always add a `label` — a toggle without visible text is ambiguous.
- Use `loading` during async saves to give feedback and prevent duplicate actions.
- For a binary form field submitted as part of a larger form, use `Checkbox` with `valuePropName="checked"`.
