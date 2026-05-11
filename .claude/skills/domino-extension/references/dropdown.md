# Dropdown

```tsx
import { Dropdown } from '@domino/extensions';
```

Low-level dropdown that wraps any trigger element and shows a menu or custom panel. For button-triggered action menus, prefer `ActionDropdown` which handles the button and chevron automatically.

## Props

```ts
interface DropdownProps extends AntDropdownProps {
  menu?: MenuProps;               // AntD menu definition
  dropdownRender?: (originNode: ReactNode) => ReactNode;  // Custom dropdown content
  trigger?: ('click' | 'hover' | 'contextMenu')[];  // default: ['hover']
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight' | 'bottom' | 'top';
  disabled?: boolean;
  open?: boolean;                 // Controlled visibility
  onOpenChange?: (open: boolean) => void;
  children: ReactElement;         // The trigger element
  dataTest?: string;
}
```

### Menu item shape

```ts
// AntD MenuItemType
{
  key: string;
  label: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  type?: 'divider' | 'group';
  children?: MenuItemType[];
  icon?: ReactNode;
  onClick?: MenuInfo => void;
}
```

## Examples

### Click-triggered dropdown menu

```tsx
import { Dropdown, Button } from '@domino/extensions';

<Dropdown
  trigger={['click']}
  menu={{
    items: [
      { key: 'edit', label: 'Edit' },
      { key: 'duplicate', label: 'Duplicate' },
      { type: 'divider' },
      { key: 'delete', label: 'Delete', danger: true },
    ],
    onClick: ({ key }) => handleAction(key),
  }}
>
  <Button type="secondary">Options</Button>
</Dropdown>
```

### Custom dropdown content

```tsx
<Dropdown
  trigger={['click']}
  dropdownRender={() => (
    <div style={{ padding: 16, background: '#fff', borderRadius: 8 }}>
      <p>Custom panel content</p>
      <Button type="primary" size="small">Action</Button>
    </div>
  )}
>
  <Button type="tertiary">Show panel</Button>
</Dropdown>
```

### Hover-triggered (default)

```tsx
<Dropdown
  menu={{
    items: [
      { key: '1', label: 'Profile' },
      { key: '2', label: 'Settings' },
      { key: '3', label: 'Logout', danger: true },
    ],
  }}
>
  <span>User menu</span>
</Dropdown>
```

### Controlled visibility

```tsx
const [open, setOpen] = useState(false);

<Dropdown
  open={open}
  onOpenChange={setOpen}
  trigger={['click']}
  menu={{ items }}
>
  <Button type="secondary">Filter</Button>
</Dropdown>
```

## AntD behavioral notes

- **`trigger` default is `['hover']`**: Unlike `ActionDropdown` which always uses `['click']`, the base `Dropdown` defaults to hover. Always specify `trigger={['click']}` for user-initiated action menus.
- **Menu `onClick`**: Receives `{ key, keyPath, domEvent }`. Use `key` to identify the selected item.
- **`placement`**: `'bottomLeft'` (default) aligns the left edge of the dropdown to the left edge of the trigger. Use `'bottomRight'` for right-aligned triggers.
- **Portal rendering**: The dropdown panel renders in a portal — it won't be clipped by `overflow: hidden` containers.

## Guidelines

- For button + chevron + action menu patterns, use `ActionDropdown` instead — it handles the button styling automatically.
- Use `Dropdown` when you need a custom trigger (link, icon, or complex element) or custom dropdown content.
- Always use `trigger={['click']}` for action menus — hover menus cause accidental activations.
- Use `danger: true` on menu items only for irreversible destructive actions.
