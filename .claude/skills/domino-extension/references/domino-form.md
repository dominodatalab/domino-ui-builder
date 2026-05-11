# DominoForm / DominoFormItem / FieldWrapper

```tsx
import { DominoForm, DominoFormItem, FieldWrapper } from '@domino/extensions';
```

Form infrastructure for building validated forms.
- `DominoForm` — form container with AntD `Form` underneath
- `DominoFormItem` — form field wrapper with label, validation, error display
- `FieldWrapper` — standalone label+caption wrapper for inputs **outside** of forms

## Props

### DominoForm

```ts
interface DominoFormProps<T> extends Omit<AntFormProps<T>, 'form'> {
  form: FormInstance<T>;     // From useForm() — required
  layout?: 'vertical' | 'horizontal' | 'inline';  // default: 'vertical'
  onFinish?: (values: T) => void;
  onFinishFailed?: (errorInfo: ValidateErrorEntity<T>) => void;
  initialValues?: Partial<T>;
}
```

### DominoFormItem

```ts
interface DominoFormItemProps extends AntFormItemProps {
  name?: string | string[];   // Field path in the form values object
  label?: ReactNode;
  rules?: Rule[];
  tooltip?: ReactNode;        // Info icon tooltip on the label
  optional?: boolean;         // Shows "(optional)" label
  extra?: ReactNode;          // Caption text below the field
  valuePropName?: string;     // default: 'value'. Use 'checked' for checkboxes/toggles
}
```

### FieldWrapper

```ts
interface FieldWrapperProps {
  label?: ReactNode;
  extra?: ReactNode;           // Caption below the input
  optional?: boolean;
  tooltip?: ReactNode;
  errorText?: string;
  extraAction?: ReactNode;     // Action link/button next to the label
  dataTest?: string;
  children: ReactNode;
}
```

## Examples

### Complete form with validation

```tsx
import { DominoForm, DominoFormItem, Button } from '@domino/extensions';
import { Form } from 'antd';

interface ProjectFormValues {
  name: string;
  description: string;
  visibility: 'public' | 'private';
}

const [form] = Form.useForm<ProjectFormValues>();

const handleSubmit = (values: ProjectFormValues) => {
  createProject(values);
};

<DominoForm<ProjectFormValues>
  form={form}
  layout="vertical"
  onFinish={handleSubmit}
  initialValues={{ visibility: 'private' }}
>
  <DominoFormItem
    name="name"
    label="Project name"
    rules={[
      { required: true, message: 'Project name is required.' },
      { max: 50, message: 'Name must be 50 characters or fewer.' },
    ]}
    tooltip="Choose a descriptive name for your project"
  >
    <TextInput placeholder="my-project" aria-label="Project name" />
  </DominoFormItem>

  <DominoFormItem
    name="description"
    label="Description"
    optional
    extra="Briefly describe what this project is for."
  >
    <TextArea
      placeholder="Describe your project..."
      autoSize={{ minRows: 3 }}
      aria-label="Description"
    />
  </DominoFormItem>

  <DominoFormItem
    name="visibility"
    label="Visibility"
    rules={[{ required: true, message: 'Please select visibility.' }]}
  >
    <Radio.Group
      vertical
      options={[
        { label: 'Private', value: 'private', description: 'Only you and collaborators can access.' },
        { label: 'Public', value: 'public', description: 'Anyone can view this project.' },
      ]}
    />
  </DominoFormItem>

  <Button type="primary" htmlType="submit">Create project</Button>
</DominoForm>
```

### Checkbox in a form

```tsx
<DominoFormItem name="acceptTerms" valuePropName="checked">
  <Checkbox>I agree to the terms and conditions</Checkbox>
</DominoFormItem>
```

### Toggle in a form

```tsx
<DominoFormItem name="isEnabled" valuePropName="checked">
  <Toggle label="Enable notifications" />
</DominoFormItem>
```

### FieldWrapper (outside a form)

```tsx
import { FieldWrapper } from '@domino/extensions';

<FieldWrapper
  label="Search"
  extra="Filter results by name"
  tooltip="Type to search"
  extraAction={
    <Button size="small" type="tertiary">Clear</Button>
  }
>
  <TextInput
    placeholder="Search projects..."
    allowClear
    aria-label="Search"
  />
</FieldWrapper>
```

### Dynamic fields (add/remove)

```tsx
<DominoForm form={form} layout="vertical" onFinish={handleSubmit}>
  <Form.List name="environment_variables">
    {(fields, { add, remove }) => (
      <>
        {fields.map(({ key, name, ...restField }) => (
          <Space key={key} align="baseline">
            <DominoFormItem
              {...restField}
              name={[name, 'key']}
              rules={[{ required: true, message: 'Key required.' }]}
            >
              <TextInput placeholder="KEY" aria-label="Variable key" />
            </DominoFormItem>
            <DominoFormItem
              {...restField}
              name={[name, 'value']}
            >
              <TextInput placeholder="VALUE" aria-label="Variable value" />
            </DominoFormItem>
            <IconButton
              type="tertiary"
              icon="Trash"
              tooltipMessage="Remove variable"
              onClick={() => remove(name)}
            />
          </Space>
        ))}
        <Button type="secondary" onClick={() => add()}>Add variable</Button>
      </>
    )}
  </Form.List>
</DominoForm>
```

## AntD behavioral notes

- **`Form.useForm()`**: Always call this at the component level and pass the instance to `DominoForm`. Never instantiate form without `useForm`.
- **`name` prop**: Links `DominoFormItem` to a form field. Nested paths use arrays: `name={['user', 'address', 'city']}`.
- **`valuePropName`**: AntD reads `value` by default. For `Checkbox` and `Toggle`, set `valuePropName="checked"` so AntD reads the `checked` prop instead.
- **`initialValues`**: Set on `DominoForm`, not on individual fields. Changing `initialValues` after mount does not re-initialize — use `form.setFieldsValue()` for programmatic updates.
- **Validation**: Triggered automatically on submit (`htmlType="submit"`). Trigger on blur with `validateTrigger="onBlur"` for instant feedback.

## Guidelines

- Always use `DominoFormItem` for form fields — never add label/error elements manually.
- Use `FieldWrapper` only outside of forms (search bars, standalone filters).
- Always pass the generic type to `DominoForm<FormValues>` for TypeScript inference.
- Always add `aria-label` to form inputs — `DominoFormItem`'s `label` is for display only.
- Never wrap `DominoFormItem` in styled components — it breaks AntD's form context.
