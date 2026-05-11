# EditInlineContainer

```tsx
import { EditInlineContainer } from '@domino/extensions';
```

Click-to-edit text field. Shows static text until the user clicks, then switches to an inline input. `EditInlineContainer` manages the editing state, error handling, and async save logic — use it instead of the raw `EditInline` component.

## Props

```ts
interface EditInlineContainerProps {
  value?: string;                        // Current text value (controlled)
  handleFailableSubmit?: (currentVal: string, prevVal?: string) => Promise<boolean>;
  // Returns true = save succeeded, false = show error state
  disabled?: boolean;
  disabledReason?: string;               // Tooltip shown when disabled
  placeholder?: string;                  // default: 'Set Text'
  emptyText?: string;                    // Text shown when value is empty
  size?: 'small' | 'default';           // default: 'default'
  isEditInline?: boolean;                // Force edit mode on
  isError?: boolean;                     // Force error state
  onStart?: () => void;                  // Called when editing starts
  onCancel?: () => void;                 // Called when editing is cancelled
  onChange?: (value: string) => void;    // Called on every keystroke
}
```

## Examples

### Async save with error handling

```tsx
import { EditInlineContainer } from '@domino/extensions';

const handleSave = async (newName: string, prevName: string): Promise<boolean> => {
  try {
    await updateProjectName({ id: projectId, name: newName });
    Toastr.success('Project name updated.');
    return true;  // Save succeeded — exit edit mode
  } catch (error) {
    Toastr.error('Failed to update project name.');
    return false; // Save failed — stay in edit mode with error state
  }
};

<EditInlineContainer
  value={projectName}
  handleFailableSubmit={handleSave}
  placeholder="Enter project name"
/>
```

### Disabled state with tooltip

```tsx
<EditInlineContainer
  value={projectName}
  disabled
  disabledReason="You need edit permissions to rename this project"
/>
```

### Small size (for compact contexts)

```tsx
<EditInlineContainer
  value={tagName}
  handleFailableSubmit={handleSave}
  size="small"
  placeholder="Tag name"
/>
```

### With empty state text

```tsx
<EditInlineContainer
  value={description}
  handleFailableSubmit={handleSave}
  placeholder="Add a description"
  emptyText="No description"
/>
```

## Behavior notes

- **Editing trigger**: Clicking the text enters edit mode. Pressing `Enter` submits. Pressing `Escape` cancels.
- **Error state**: When `handleFailableSubmit` returns `false`, the input stays in edit mode with a red border. The user must either fix the value and submit again, or press `Escape` to cancel.
- **Loading state**: While `handleFailableSubmit` is executing, the input shows a loading indicator and blocks further edits.
- **`onCancel`**: Called when the user presses `Escape`. The internal value reverts to the last persisted value.

## Guidelines

- Always use `EditInlineContainer`, not raw `EditInline` — the container handles all the async/error state.
- Use `handleFailableSubmit` for async saves to external APIs. Always return `true` on success and `false` on failure.
- Show `Toastr` notifications in the submit handler — don't rely on the error state alone to communicate failures.
- Use `disabled` + `disabledReason` when the user lacks permission to edit.
- For multi-line content, use `TextArea` in a `DominoFormItem` instead — `EditInlineContainer` is for single-line text.
