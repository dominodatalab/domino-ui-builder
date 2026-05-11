# Tree / SearchableTree

```tsx
import { Tree, SearchableTree } from '@domino/extensions';
```

Hierarchical tree component for directory structures, taxonomy browsers, and nested data. `SearchableTree` adds a search input that filters tree nodes.

## Props

### Tree props

```ts
interface TreeProps extends AntTreeProps {
  treeData: TreeDataNode[];
  checkable?: boolean;          // Show checkboxes
  checkedKeys?: string[];
  onCheck?: (keys: string[], info: CheckInfo) => void;
  selectedKeys?: string[];
  onSelect?: (keys: string[], info: SelectInfo) => void;
  expandedKeys?: string[];
  onExpand?: (keys: string[]) => void;
  defaultExpandAll?: boolean;
  showIcon?: boolean;
  icon?: ReactNode | ((props) => ReactNode);
  loadData?: (node: EventDataNode) => Promise<void>;  // Async load children
}

interface TreeDataNode {
  key: string;
  title: ReactNode;
  children?: TreeDataNode[];
  disabled?: boolean;
  isLeaf?: boolean;
  icon?: ReactNode;
  checkable?: boolean;
}
```

### SearchableTree props

```ts
interface SearchableTreeProps extends TreeProps {
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
}
```

## Examples

### Basic tree (from storybook)

```tsx
import { Tree } from '@domino/extensions';

const treeData = [
  {
    key: 'src',
    title: 'src',
    children: [
      { key: 'components', title: 'components', children: [
        { key: 'Button.tsx', title: 'Button.tsx', isLeaf: true },
        { key: 'Input.tsx', title: 'Input.tsx', isLeaf: true },
      ]},
      { key: 'utils.ts', title: 'utils.ts', isLeaf: true },
    ],
  },
  {
    key: 'package.json',
    title: 'package.json',
    isLeaf: true,
  },
];

<Tree
  treeData={treeData}
  defaultExpandAll
/>
```

### Tree with icons (from storybook)

```tsx
<Tree
  showIcon
  treeData={treeData}
  icon={({ isLeaf }) =>
    isLeaf
      ? <IconResolver collection="light" icon="File" aria-label="file" />
      : <IconResolver collection="light" icon="Folder" aria-label="folder" />
  }
/>
```

### Checkable tree (from storybook)

```tsx
const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

<Tree
  checkable
  treeData={treeData}
  checkedKeys={checkedKeys}
  onCheck={(keys) => setCheckedKeys(keys as string[])}
/>
```

### SearchableTree

```tsx
import { SearchableTree } from '@domino/extensions';

<SearchableTree
  treeData={treeData}
  searchPlaceholder="Search files..."
  defaultExpandAll
/>
```

### Async load children (lazy tree)

```tsx
const loadData = async (node: EventDataNode) => {
  const children = await fetchChildren(node.key);
  setTreeData(origin => updateTreeData(origin, node.key, children));
};

<Tree
  treeData={treeData}
  loadData={loadData}
/>
```

## AntD behavioral notes

- **`checkable` vs `selectable`**: By default, nodes are selectable (highlight on click). When `checkable={true}`, clicking toggles the checkbox — but the node is still selectable. Use `selectable={false}` to disable selection when using checkboxes only.
- **`onCheck` keys**: Receives `(checkedKeys, info)` where `checkedKeys` is a flat array of all checked keys — including parent nodes when `checkStrictly={false}` (default). With `checkStrictly={true}`, parent and child check states are independent.
- **`defaultExpandAll`**: Expands all nodes on initial render. For large trees, this can be slow — use `defaultExpandedKeys` for specific nodes instead.
- **`loadData`**: For async trees, set `isLeaf: false` on nodes that have children to be loaded, and `isLeaf: true` on actual leaf nodes — otherwise AntD won't trigger `loadData`.

## Guidelines

- Use `Tree` for hierarchical data that users browse (file systems, org charts, category trees).
- Use `SearchableTree` when the tree has more than ~20 nodes and users need to find items quickly.
- Use `checkable` for multi-select scenarios (selecting files, permissions).
- Use `icon` to visually distinguish file types, folders, or node categories.
