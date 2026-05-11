# ActionDropdown

```tsx
import { ActionDropdown } from '@domino/extensions';
```

Button that opens a dropdown menu of actions. Used for secondary or overflow actions — typically in table rows, card headers, or toolbars. The trigger is always a click (not hover).

## Props

```ts
interface ActionDropdownProps extends Omit<DropdownProps, 'menu' | 'trigger'> {
  menu: MenuProps;              // AntD MenuProps — defines menu items
  buttonType?: 'primary' | 'secondary' | 'tertiary';  // default: 'secondary'
  children?: ReactNode;        // Button label text
  disabled?: boolean;
  hideButtonChevron?: boolean; // Hide the down-arrow icon
  dataTest?: string;           // default: 'default-action-dropdown'
}
```

### Menu item shape

```ts
// Standard AntD MenuItemType
{
  key: string;
  label: ReactNode;
  disabled?: boolean;
  danger?: boolean;    // Renders label in red
  type?: 'divider' | 'group';
  children?: MenuItemType[];  // For groups
  icon?: ReactNode;
}
```

### MetadataMenuItem

For rich menu items with icons and metadata, use `MetadataMenuItem`:

```tsx
import { MetadataMenuItem } from '@domino/extensions';

<MetadataMenuItem
  leftContent={<IconResolver collection="brands" icon="Github" aria-label="github icon" />}
  metadata="secondary text"
  onClick={handleClick}
>
  Item label
</MetadataMenuItem>
```

## Examples

### Basic usage (from storybook)

```tsx
import { ActionDropdown } from '@domino/extensions';

<ActionDropdown
  buttonType="secondary"
  menu={{
    items: [
      {
        key: 'group-1',
        label: 'Actions',
        type: 'group',
        children: [
          { key: '1', label: 'Edit' },
          { key: '2', label: 'Duplicate' },
          { key: '3', label: 'Delete', danger: true },
          {
            key: '4',
            label: 'Disabled action',
            disabled: true,
          },
        ],
      },
    ],
    onClick: ({ key }) => handleAction(key),
  }}
>
  Actions
</ActionDropdown>
```

### With MetadataMenuItem (from storybook)

```tsx
import { ActionDropdown, MetadataMenuItem } from '@domino/extensions';

<ActionDropdown
  buttonType="tertiary"
  menu={{
    items: [
      {
        key: '1',
        label: (
          <MetadataMenuItem
            leftContent={<IconResolver collection="brands" icon="Github" aria-label="github" />}
            metadata="Run on GitHub Actions"
          >
            GitHub
          </MetadataMenuItem>
        ),
      },
      {
        key: '2',
        label: (
          <MetadataMenuItem
            leftContent={<IconResolver collection="light" icon="Server" aria-label="server" />}
            metadata="Run on local cluster"
          >
            Local
          </MetadataMenuItem>
        ),
      },
    ],
  }}
>
  Run on
</ActionDropdown>
```

### Table row actions (compact)

```tsx
<ActionDropdown
  buttonType="tertiary"
  hideButtonChevron
  menu={{
    items: [
      { key: 'edit', label: 'Edit' },
      { key: 'delete', label: 'Delete', danger: true },
    ],
    onClick: ({ key }) => handleRowAction(key, record),
  }}
>
  <IconResolver collection="light" icon="EllipsisVertical" aria-label="row actions" />
</ActionDropdown>
```

## AntD behavioral notes

- **Menu `onClick`**: The click handler receives `{ key, keyPath, domEvent }`. Use `key` to identify which item was selected.
- **`danger: true`**: Renders the menu item label in red — use only for irreversible destructive actions.
- **`type: 'divider'`**: Renders a horizontal separator between groups.
- **`type: 'group'`**: Renders a non-interactive group header with optional `label`.
- **Dropdown placement**: Defaults to `bottomLeft`. Override with the `placement` prop from `DropdownProps`.

## Guidelines

- Use `ActionDropdown` when you have 3+ secondary actions — fewer actions should use separate buttons.
- Use `type: 'group'` to organize items into labeled sections when there are more than 5 items.
- Use `danger: true` only for destructive actions (delete, reset). Show a confirmation modal on click.
- For icon-only triggers (e.g. `⋮` in a table row), set `hideButtonChevron` and pass an `EllipsisVertical` icon as children.
