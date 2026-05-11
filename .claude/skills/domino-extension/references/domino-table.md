# DominoTable

```tsx
import { DominoTable } from '@domino/extensions';
```

Full-featured data table with pagination, sorting, row selection, and customizable cell renderers. Built on AntD Table with Domino's design system styling.

> For detailed DominoTable documentation, the `domino-table` skill has comprehensive coverage. This file covers common patterns.

## Props

```ts
interface DominoTableProps<T> extends Omit<AntTableProps<T>, 'columns'> {
  columns: DominoColumnType<T>[];
  dataSource: T[];
  loading?: boolean;
  pagination?: TablePaginationConfig | false;
  rowSelection?: TableRowSelection<T>;
  onChange?: (pagination, filters, sorter, extra) => void;
  rowKey?: string | ((record: T) => string);
  scroll?: { x?: number | string; y?: number | string };
  locale?: TableLocale;   // Custom empty state text
}

interface DominoColumnType<T> extends AntColumnType<T> {
  dataIndex: string | string[];
  key: string;
  title: ReactNode;
  render?: (value: any, record: T, index: number) => ReactNode;
  sorter?: boolean | CompareFn<T>;
  sortOrder?: SortOrder;
  width?: number | string;
  ellipsis?: boolean;
  fixed?: 'left' | 'right' | boolean;
  align?: 'left' | 'center' | 'right';
  tooltip?: ReactNode;    // Domino-specific: tooltip on the column header
}
```

## Examples

### Basic table (from storybook)

```tsx
import { DominoTable } from '@domino/extensions';

interface Run {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed';
  duration: string;
}

const columns: DominoColumnType<Run>[] = [
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Run name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: 'Status',
    render: (status) => <Tag type={status === 'failed' ? 'danger' : 'success'}>{status}</Tag>,
  },
  {
    key: 'duration',
    dataIndex: 'duration',
    title: 'Duration',
    align: 'right',
  },
];

<DominoTable
  columns={columns}
  dataSource={runs}
  rowKey="id"
  loading={isLoading}
/>
```

### With pagination and row selection (from storybook)

```tsx
const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

<DominoTable
  columns={columns}
  dataSource={data}
  rowKey="id"
  pagination={{
    pageSize: 20,
    total: totalCount,
    current: page,
    onChange: (page) => setPage(page),
  }}
  rowSelection={{
    selectedRowKeys: selectedKeys,
    onChange: (keys) => setSelectedKeys(keys as string[]),
  }}
/>
```

### With ActionDropdown in rows (from storybook)

```tsx
const columns: DominoColumnType<Item>[] = [
  // ... other columns
  {
    key: 'actions',
    title: '',
    width: 64,
    fixed: 'right',
    render: (_, record) => (
      <ActionDropdown
        buttonType="tertiary"
        menu={{
          items: [
            { key: 'edit', label: 'Edit' },
            { key: 'delete', label: 'Delete', danger: true },
          ],
          onClick: ({ key }) => handleAction(key, record),
        }}
      >
        Actions
      </ActionDropdown>
    ),
  },
];
```

### With CopyText cell (from storybook)

```tsx
{
  key: 'id',
  dataIndex: 'id',
  title: 'ID',
  render: (id) => <CopyText text={id} />,
}
```

### With tooltip header (from storybook)

```tsx
{
  key: 'cpuLimit',
  dataIndex: 'cpuLimit',
  title: 'CPU limit',
  tooltip: 'Maximum CPU cores available to this job',
}
```

### Custom empty state

```tsx
<DominoTable
  columns={columns}
  dataSource={[]}
  locale={{
    emptyText: (
      <EmptyState
        size="small"
        text="No runs match your filters."
      />
    ),
  }}
/>
```

## AntD behavioral notes

- **`sorter`**: When `true`, renders sort arrows but no client-side sort — manage sorting externally via `onChange`. Pass a comparator function for client-side sorting.
- **`fixed` columns**: Requires `scroll={{ x: totalWidth }}` to enable horizontal scrolling — without it, fixed columns don't work.
- **`ellipsis`**: Truncates text with `...` when overflow. Combine with `title` tooltip or `render` to provide the full value on hover.
- **`rowKey`**: Must uniquely identify each row. Prefer a record field like `"id"` over index-based keys — index keys break row selection and animations when data changes.

## Guidelines

- Always set `rowKey` to a unique field — never rely on the default index.
- Use `fixed="right"` for actions columns so they stay visible during horizontal scroll.
- Use `loading={isLoading}` from your data-fetching hook — don't show an empty table while loading.
- For server-side pagination, always control `pagination.current` and `pagination.total` from state.
