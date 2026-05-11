# Radio

```tsx
import { Radio } from '@domino/extensions';
```

Radio button for single selection. Domino's `Radio.Group` extends AntD with `vertical` layout, per-option `tooltip`, and `icon` support for button-style groups.

## Props

### Radio props

```ts
interface RadioProps extends AntRadioProps {
  description?: string;   // Secondary text below the label
  dataTest?: string;
}
```

### Radio.Group props

```ts
interface RadioGroupProps extends Omit<AntRadioGroupProps, 'options'> {
  options?: RadioOption[];
  vertical?: boolean;         // Stack options vertically (Domino-specific)
  disabled?: boolean;
  optionType?: 'default' | 'button';
}

interface RadioOption {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
  description?: string;       // Secondary text below the label
  tooltip?: string;           // Tooltip shown on the individual option (Domino-specific)
  icon?: ReactNode;           // Icon for button-style groups (Domino-specific)
}
```

## Examples

### Vertical radio group with descriptions and per-option tooltip (from storybook)

```tsx
<DominoForm form={form} layout="vertical">
  <DominoFormItem
    name="radio"
    label="Compute tier"
    tooltip="Select the hardware allocation for this run"
    optional
    rules={[{ required: true, message: 'Please select a compute tier.' }]}
  >
    <Radio.Group
      vertical
      options={[
        {
          label: 'Small',
          value: 'small',
          description: 'Optional metadata about this option',
        },
        {
          label: 'Medium',
          value: 'medium',
          disabled: true,
          description: 'Optional metadata about this option',
          tooltip: 'Not possible to select',
        },
        {
          label: 'Large',
          value: 'large',
          description: 'Optional metadata about this option',
        },
      ]}
    />
  </DominoFormItem>
</DominoForm>
```

### Button-style radio group with icons (from storybook)

```tsx
import { IconResolver } from '@domino/extensions';

<DominoFormItem name="storageType" label="Storage type" optional>
  <Radio.Group
    optionType="button"
    options={[
      {
        label: 'Local',
        value: 'local',
        description: 'Fast local SSD storage',
        icon: <IconResolver aria-label="database icon" icon="Database" collection="light" />,
      },
      {
        label: 'S3',
        value: 's3',
        description: 'Amazon S3 object storage',
        icon: <IconResolver aria-label="cloud icon" icon="Cloud" collection="light" />,
      },
      {
        label: 'NFS',
        value: 'nfs',
        description: 'Network file system',
        icon: <IconResolver aria-label="server icon" icon="Server" collection="light" />,
      },
    ]}
  />
</DominoFormItem>
```

### Inline horizontal group (default)

```tsx
<Radio.Group value={plan} onChange={e => setPlan(e.target.value)}>
  <Radio value="starter">Starter</Radio>
  <Radio value="pro">Pro</Radio>
  <Radio value="enterprise" disabled>Enterprise</Radio>
</Radio.Group>
```

## AntD behavioral notes

- **`buttonStyle="solid"`**: Makes button-group Radio render solid filled backgrounds when selected (v5.21.0+). The Domino wrapper may not expose this — use `optionType="button"` instead which achieves a similar visual.
- **`Radio.Group onChange`**: Returns a `RadioChangeEvent`, so read `e.target.value` for the selected value.
- Always wrap individual `Radio` components in `Radio.Group` — it manages mutual exclusivity and the change handler.

## Guidelines

- Use `vertical={true}` for option lists with `description` — horizontal layout doesn't show descriptions well.
- Use `tooltip` on individual options to explain why a specific option is disabled, not the whole group.
- Use `optionType="button"` + `icon` for visual mode-selectors (storage type, compute type) where icons help distinguish options.
- For 2–4 short options without descriptions, consider `Segmented` for a more compact layout.
- For more than ~6 options, use `Select` instead.
