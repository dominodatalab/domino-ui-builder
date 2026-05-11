# SideBar

```tsx
import { SideBar } from '@domino/extensions';
```

Vertical navigation sidebar with collapsible sub-menus and a collapse toggle button. Used for page-level navigation within a section of the app.

## Props

```ts
interface SideBarProps {
  items: MenuItem[];           // AntD menu items with Domino extensions
  section?: ReactElement;      // Section header label (e.g. project name)
  name?: ReactElement;         // Current context name (e.g. page name)
  tag?: ReactElement;          // Context tag (e.g. status badge)
  onClick?: MenuProps['onClick'];
  selectedKeys?: string[];     // Currently active menu item keys
  collapsed: boolean;          // Whether the sidebar is collapsed to icon-only
  handleCollapse: () => void;  // Callback to toggle collapse state
}

// MenuItem is AntD's MenuItemType with support for:
interface MenuItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  children?: MenuItem[];  // Sub-menu items
  type?: 'group' | 'divider';
}
```

## Examples

### Basic sidebar (from storybook)

```tsx
import { SideBar } from '@domino/extensions';
import { useState } from 'react';

const menuItems = [
  {
    key: 'overview',
    label: 'Overview',
    icon: <IconResolver collection="light" icon="House" aria-label="overview" />,
  },
  {
    key: 'runs',
    label: 'Runs',
    icon: <IconResolver collection="light" icon="Play" aria-label="runs" />,
    children: [
      { key: 'runs-active', label: 'Active' },
      { key: 'runs-scheduled', label: 'Scheduled' },
      { key: 'runs-completed', label: 'Completed' },
    ],
  },
  {
    key: 'files',
    label: 'Files',
    icon: <IconResolver collection="light" icon="Folder" aria-label="files" />,
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: <IconResolver collection="light" icon="Gear" aria-label="settings" />,
  },
];

const [collapsed, setCollapsed] = useState(false);

<div style={{ height: 700 }}>
  <SideBar
    items={menuItems}
    section={<span>Projects</span>}
    name={<span>Quick Start</span>}
    tag={<span>Ideation</span>}
    selectedKeys={['overview']}
    collapsed={collapsed}
    handleCollapse={() => setCollapsed(c => !c)}
    onClick={({ key }) => navigate(key)}
  />
</div>
```

### Without header metadata

```tsx
<SideBar
  items={menuItems}
  selectedKeys={[currentRoute]}
  collapsed={collapsed}
  handleCollapse={() => setCollapsed(c => !c)}
  onClick={({ key }) => navigate(key)}
/>
```

## AntD behavioral notes

- **`triggerSubMenuAction="click"`**: Domino sets this internally — sub-menus expand on click, not hover.
- **`collapsed`**: When `true`, the sidebar shrinks to 64px (icon-only). Labels are hidden but icons remain visible with tooltips.
- **`selectedKeys`**: Must match the `key` of the currently active menu item exactly. This controls the highlighted state.
- **Sub-menus**: Pass `children` on a menu item to create an expandable sub-menu. The parent item becomes a non-navigable group header.

## Guidelines

- Always wrap `SideBar` in a container with a fixed height and `overflow: hidden` — the sidebar manages its own scroll.
- Derive `selectedKeys` from the current route — don't manage it independently from navigation.
- Use `section`, `name`, and `tag` to give context about what the sidebar is navigating (e.g. which project, which environment).
- Keep top-level items to 5–7; use sub-menus for deeper hierarchies rather than adding more top-level items.
