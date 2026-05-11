# CodeEditor / CodeEditorControlled

```tsx
import { CodeEditor } from '@domino/extensions';
```

Syntax-highlighted code editor powered by CodeMirror. Use for YAML, JSON, Python snippets, and other structured text. Always wrap in `FieldWrapper` for label, caption, and error display.

## Props

### CodeEditor (uncontrolled)

```ts
interface CodeEditorProps extends Omit<CodeEditorControlledProps, 'onChange' | 'value'> {
  initialValue?: string;    // Starting content (not reactive after mount)
  onChange?: (value: string) => void;
  preprocessor?: (value: string) => string;  // Transform initialValue before display
}
```

### CodeEditorControlled (controlled)

```ts
interface CodeEditorControlledProps {
  value: string;            // Controlled content
  onChange: (value: string, change: EditorChange) => void;
  mode?: string;            // Language mode: 'yaml' | 'javascript' | 'python' | 'json' etc.
  isEditable?: boolean;     // default: false (read-only)
  lineNumbers?: boolean;    // default: true
  disabled?: boolean;
  errorText?: string;
}
```

## Examples

### Editable YAML editor with FieldWrapper (from storybook)

```tsx
import { CodeEditor, FieldWrapper } from '@domino/extensions';

<FieldWrapper
  label="Input label"
  extra="This is a caption under an input."
  optional
  tooltip="Help message content"
>
  <CodeEditor
    preprocessor={(value) => value}
    isEditable
    initialValue={'jupyter:\n\ttitle: "Jupyter (Python, R, Julia)"'}
    lineNumbers
  />
</FieldWrapper>
```

### Read-only code display

```tsx
<CodeEditor
  initialValue={configContent}
  isEditable={false}
  lineNumbers
/>
```

### Controlled editor

```tsx
import { CodeEditorControlled } from '@domino/extensions';

const [code, setCode] = useState('# Write your code here\n');

<FieldWrapper label="Script" errorText={errors.script}>
  <CodeEditorControlled
    value={code}
    onChange={(value) => setCode(value)}
    mode="python"
    isEditable
    lineNumbers
  />
</FieldWrapper>
```

### Inside a DominoFormItem

```tsx
<DominoFormItem
  name="configYaml"
  label="Configuration"
  rules={[{ required: true, message: 'Configuration is required.' }]}
>
  <CodeEditorControlled
    mode="yaml"
    isEditable
    lineNumbers
  />
</DominoFormItem>
```

## AntD / CodeMirror behavioral notes

- **`CodeEditor` vs `CodeEditorControlled`**: Use `CodeEditor` when you only need the final value on submit (uncontrolled). Use `CodeEditorControlled` when you need to react to every change or manage the value in state.
- **`preprocessor`**: Called on `initialValue` before display. The default preprocessor handles JSON-stringified content — explicitly pass `(value) => value` if your content is already plain text.
- **`mode`**: Accepts CodeMirror mode names. Common values: `'yaml'`, `'javascript'`, `'python'`, `'json'`, `'shell'`, `'markdown'`.
- **`isEditable={false}`**: Renders a read-only code display — suitable for showing config snapshots, command output, or reference code.

## Guidelines

- Always wrap in `FieldWrapper` (or `DominoFormItem`) — never render a bare `CodeEditor` without a label.
- Use `CodeEditor` (uncontrolled) for standalone editors where you only need the value on form submit.
- Use `CodeEditorControlled` when you need live validation or reactive state.
- Set `mode` to enable syntax highlighting — default is plain text.
- Always set `isEditable={true}` explicitly for editable editors — the default is read-only.
