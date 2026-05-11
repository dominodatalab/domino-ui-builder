# Modal

```tsx
import { Modal } from '@domino/extensions';
```

Dialog overlay for confirmations, forms, and detail views. Domino's `Modal` adds `size`, `danger`, `removeBodyPaddings`, `hideCancelButton`, and `confirmDisabled` props.

## Props

```ts
interface ModalProps extends Omit<AntModalProps, 'width' | 'footer'> {
  size?: 'sm' | 'md' | 'lg' | 'xl';   // default: 'md'. Maps to fixed pixel widths
  danger?: boolean;                     // Red confirm button (for destructive actions)
  confirmDisabled?: boolean;            // Disable the OK button
  removeBodyPaddings?: boolean;         // Remove default body padding (for full-bleed tables)
  hideCancelButton?: boolean;           // Hide the Cancel button
  open: boolean;
  title: ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: ReactNode;                   // default: 'OK'
  cancelText?: ReactNode;              // default: 'Cancel'
  confirmLoading?: boolean;            // Loading spinner on OK button
  closable?: boolean;                  // Show × close button (default: true)
  // Custom footer (for 3-button layouts):
  footer?: ReactNode;
}
```

### Footer sub-components (for 3-button layouts)

```tsx
import {
  ModalFooterContainer,
  ModalCancelButton,
  ModalSecondaryButton,
  ModalOkButton,
} from '@domino/extensions';
```

## Examples

### Standard two-button modal (from storybook)

```tsx
import { Modal } from '@domino/extensions';

const [open, setOpen] = useState(false);

<Modal
  open={open}
  size="md"
  title="Modal title"
  onOk={() => handleConfirm()}
  onCancel={() => setOpen(false)}
  okText="Confirm"
  cancelText="Cancel"
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

### Danger confirmation modal (from storybook)

```tsx
<Modal
  open={open}
  size="md"
  title="Delete project"
  danger
  onOk={handleDelete}
  onCancel={() => setOpen(false)}
  okText="Delete"
  confirmLoading={isDeleting}
>
  <p>This action cannot be undone. The project and all its data will be permanently deleted.</p>
</Modal>
```

### Three-button modal with secondary action (from storybook)

```tsx
import {
  Modal,
  ModalFooterContainer,
  ModalCancelButton,
  ModalSecondaryButton,
  ModalOkButton,
} from '@domino/extensions';

<Modal
  open={open}
  title="Publish changes"
  footer={
    <ModalFooterContainer>
      <ModalCancelButton onClick={() => setOpen(false)}>Cancel</ModalCancelButton>
      <ModalSecondaryButton onClick={handleSaveDraft}>Save draft</ModalSecondaryButton>
      <ModalOkButton onClick={handlePublish}>Publish</ModalOkButton>
    </ModalFooterContainer>
  }
>
  <p>Choose how to proceed with your changes.</p>
</Modal>
```

### Modal without padding (for full-bleed tables)

```tsx
<Modal
  open={open}
  size="lg"
  title="Select environment"
  removeBodyPaddings
  onOk={handleSelect}
  onCancel={() => setOpen(false)}
>
  <DominoTable columns={columns} dataSource={data} />
</Modal>
```

### Size reference

| Size | Width |
|------|-------|
| `sm` | 480px |
| `md` | 600px |
| `lg` | 800px |
| `xl` | 1024px |

## AntD behavioral notes

- **ESC key**: Calls `onCancel` by default. Set `keyboard={false}` to disable.
- **`maskClosable`**: Clicking outside the modal calls `onCancel` by default in AntD. Domino may override this — check if your modal unintentionally closes on backdrop click.
- **`confirmLoading`**: Shows a spinner on the OK button and disables it during async operations. Reset to `false` after the operation completes (success or error).
- **`destroyOnClose`**: When `true`, the modal children unmount when closed — useful to reset form state. When `false` (default), the modal is hidden but children stay mounted.
- **Never style Modal directly** — use `removeBodyPaddings` for padding control and `size` for width control.

## Guidelines

- Use `size="sm"` for simple confirmations (1–2 sentences + 2 buttons).
- Use `size="md"` for forms with a few fields.
- Use `size="lg"` or `size="xl"` for complex forms, tables, or detail views.
- Use `danger={true}` for irreversible destructive actions — never for warnings.
- For 3+ buttons, use `footer` with `ModalFooterContainer` sub-components.
- Show `<WaitSpinner />` in modal body when `loading={true}` — don't use `confirmLoading` as a substitute for loading content.
