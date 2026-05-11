# Tabs

```tsx
import { Tabs } from '@domino/extensions';
```

Horizontal tab navigation. Domino's `Tabs` extends AntD with `showBadge` and `badgeCount` per-tab item props.

## Props

```ts
interface TabsProps extends Omit<AntTabsProps, 'items'> {
  items: TabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  tabBarExtraContent?: ReactNode;  // Extra content rendered in the tab bar (e.g. a button)
}

interface TabItem {
  key: string;
  label: ReactNode;         // Tab header label
  children?: ReactNode;     // Tab body content
  disabled?: boolean;
  showBadge?: boolean;      // Show a count badge on the tab label (Domino-specific)
  badgeCount?: number;      // Badge number (Domino-specific)
}
```

## Examples

### Basic tabs (from storybook)

```tsx
import { Tabs } from '@domino/extensions';

<Tabs
  items={[
    { key: '1', label: 'Tab 1', children: 'Content of Tab 1' },
    { key: '2', label: 'Tab 2', children: 'Content of Tab 2' },
    { key: '3', label: 'Tab 3', children: 'Content of Tab 3' },
  ]}
/>
```

### Tabs with badge counts (from storybook)

```tsx
<Tabs
  items={[
    {
      key: '1',
      label: 'Active',
      showBadge: true,
      badgeCount: 5,
      children: 'Active jobs content',
    },
    {
      key: '2',
      label: 'Queued',
      showBadge: true,
      badgeCount: 12,
      children: 'Queued jobs content',
    },
    {
      key: '3',
      label: 'Completed',
      showBadge: true,
      badgeCount: 99,
      children: 'Completed jobs content',
    },
    { key: '4', label: 'Failed', children: 'Failed jobs content' },
  ]}
/>
```

### Controlled tabs

```tsx
const [activeTab, setActiveTab] = useState('overview');

<Tabs
  activeKey={activeTab}
  onChange={setActiveTab}
  items={[
    { key: 'overview', label: 'Overview', children: <Overview /> },
    { key: 'settings', label: 'Settings', children: <Settings /> },
    { key: 'activity', label: 'Activity', children: <Activity /> },
  ]}
/>
```

### With extra content in tab bar

```tsx
<Tabs
  items={tabs}
  tabBarExtraContent={
    <Button type="primary" icon={<IconResolver collection="light" icon="Plus" aria-label="add" />}>
      New run
    </Button>
  }
/>
```

## AntD behavioral notes

- **Tab content mounting**: By default, AntD renders all tab panels but only shows the active one. Set `destroyInactiveTabPane={true}` to unmount inactive panels — useful for heavy components or when you need to re-initialize state on tab switch.
- **`tabBarExtraContent`**: Renders to the right of the tab headers. Useful for add/filter buttons that scope to the entire tabbed view.
- **`onChange`**: Fires on tab click, receiving the `key` string of the newly active tab.
- **`type="card"`**: Renders tabs with a card-style visual. The default style is underline.

## Guidelines

- Use `badgeCount` to communicate unread counts, pending items, or errors on specific tabs.
- Use `defaultActiveKey` to start on the most relevant tab; use `activeKey` when parent state controls navigation.
- Keep the number of tabs to 5 or fewer — more tabs signal a need to restructure the information architecture.
- Don't use tabs for sequential step flows — use `Wizard` instead.
