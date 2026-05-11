# Drawer

```tsx
import { Drawer } from '@domino/extensions';
```

Side panel that slides in from the edge of the screen. Domino's `Drawer` has an opinionated footer pattern with `Drawer.Footer`, `Drawer.CloseButton`, `Drawer.SecondaryAction`, and `Drawer.PrimaryAction` sub-components.

## Props

```ts
interface DrawerProps extends Omit<AntDrawerProps, 'footer'> {
  buttonLabel: ReactNode;      // Label for the trigger button
  title: ReactNode;            // Drawer header title
  footer?: ReactNode;          // Footer content — use Drawer.Footer sub-components
  width?: number | string;     // default: 464
  children: ReactNode;         // Drawer body content
  dataTest: string;
  // Controlled mode:
  isControlled?: boolean;
  controlledVisibility?: boolean;
  controlledShowDrawer?: () => void;
  controlledCloseDrawer?: () => void;
}
```

### Footer sub-components

```tsx
Drawer.Footer            // Container for footer actions
Drawer.CloseButton       // Cancel/close button (wired to drawer context automatically)
Drawer.SecondaryAction   // Middle action button (e.g. "Save")
Drawer.PrimaryAction     // Primary confirm button
```

> `Drawer.CloseButton` reads its close handler from context automatically — no `onClick` needed.

## Examples

### Standard drawer with footer (from storybook)

```tsx
import { Drawer } from '@domino/extensions';

<Drawer
  title="Edit Permissions: GeneralAdmin"
  buttonLabel="Open"
  dataTest="permissions-drawer"
  footer={
    <Drawer.Footer>
      <Drawer.CloseButton />
      <Drawer.SecondaryAction onClick={handleSave}>Save</Drawer.SecondaryAction>
      <Drawer.PrimaryAction onClick={handleSubmit}>Submit</Drawer.PrimaryAction>
    </Drawer.Footer>
  }
>
  <p>Drawer content goes here.</p>
</Drawer>
```

### Controlled drawer (parent manages open state)

```tsx
const [isOpen, setIsOpen] = useState(false);

<>
  <Button type="secondary" onClick={() => setIsOpen(true)}>
    Edit settings
  </Button>

  <Drawer
    title="Settings"
    buttonLabel="Edit settings"
    dataTest="settings-drawer"
    isControlled
    controlledVisibility={isOpen}
    controlledShowDrawer={() => setIsOpen(true)}
    controlledCloseDrawer={() => setIsOpen(false)}
    footer={
      <Drawer.Footer>
        <Drawer.CloseButton />
        <Drawer.PrimaryAction onClick={handleSave}>Save</Drawer.PrimaryAction>
      </Drawer.Footer>
    }
  >
    <p>Settings form content.</p>
  </Drawer>
</>
```

### With only close and primary action

```tsx
<Drawer
  title="View details"
  buttonLabel="View"
  dataTest="details-drawer"
  footer={
    <Drawer.Footer>
      <Drawer.CloseButton />
      <Drawer.PrimaryAction onClick={handleConfirm}>Confirm</Drawer.PrimaryAction>
    </Drawer.Footer>
  }
>
  <p>Detail content.</p>
</Drawer>
```

## AntD behavioral notes

- **`mask={false}`**: Domino's Drawer does not render an overlay mask — the rest of the page remains interactive.
- **`closable={false}`**: The native AntD close button is hidden. Domino uses a custom `×` icon in the title bar.
- **`width`**: Defaults to 464px. Override when you need more horizontal space for complex forms.
- **No `onClose` at top level**: In Domino's pattern, the close handler flows through `DrawerContext` — `Drawer.CloseButton` reads it automatically without needing an explicit `onClick`.

## Guidelines

- Always include `Drawer.Footer` with at least `Drawer.CloseButton` — drawers without a close mechanism frustrate users.
- Use the controlled mode (`isControlled`) when you need to open the drawer programmatically (e.g., from a table row click).
- Prefer `Drawer.SecondaryAction` for non-destructive mid-priority actions (save draft, save without submitting).
- Keep drawer width at the default 464px unless the content genuinely requires more space.
