# Grid (Row / Col)

```tsx
import { Row, Col } from '@domino/extensions';
```

24-column responsive grid layout based on CSS Flexbox. `Row` is the container, `Col` is the cell. Use for form layouts, dashboard grids, and side-by-side panels.

## Props

### Row props

```ts
interface RowProps extends AntRowProps {
  gutter?: number | [number, number] | { xs, sm, md, lg, xl, xxl };
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
  align?: 'top' | 'middle' | 'bottom' | 'stretch';
  wrap?: boolean;   // default: true
}
```

### Col props

```ts
interface ColProps extends AntColProps {
  span?: number;        // 1–24, portion of the row this column occupies
  offset?: number;      // Columns to skip before this column
  xs?: number | ColSize;  // Breakpoint overrides
  sm?: number | ColSize;
  md?: number | ColSize;
  lg?: number | ColSize;
  xl?: number | ColSize;
  xxl?: number | ColSize;
}
```

## Examples

### Two-column form layout

```tsx
import { Row, Col } from '@domino/extensions';

<Row gutter={[16, 16]}>
  <Col span={12}>
    <FieldWrapper label="First name">
      <TextInput placeholder="First name" />
    </FieldWrapper>
  </Col>
  <Col span={12}>
    <FieldWrapper label="Last name">
      <TextInput placeholder="Last name" />
    </FieldWrapper>
  </Col>
</Row>
```

### Responsive columns (full on mobile, half on desktop)

```tsx
<Row gutter={[16, 24]}>
  <Col xs={24} md={12}>
    <Card title="CPU Usage">...</Card>
  </Col>
  <Col xs={24} md={12}>
    <Card title="Memory Usage">...</Card>
  </Col>
</Row>
```

### Three-column equal grid

```tsx
<Row gutter={16}>
  <Col span={8}><MetricCard label="Jobs" value={142} /></Col>
  <Col span={8}><MetricCard label="Runs" value={3821} /></Col>
  <Col span={8}><MetricCard label="Models" value={56} /></Col>
</Row>
```

### Sidebar + main content (1/3 + 2/3)

```tsx
<Row gutter={24} align="top">
  <Col span={8}>
    <SidePanel />
  </Col>
  <Col span={16}>
    <MainContent />
  </Col>
</Row>
```

### Centered single column

```tsx
<Row justify="center">
  <Col span={16}>
    <Card title="Centered form">...</Card>
  </Col>
</Row>
```

## AntD behavioral notes

- **`gutter`**: A single number sets horizontal gutter. `[horizontal, vertical]` sets both. For responsive gutters, use the object form `{ xs: 8, md: 16 }`.
- **`span` sums to 24**: Each `Row`'s `Col` spans should sum to 24. Cols exceeding 24 wrap to a new line (when `wrap={true}`).
- **`offset`**: Pushes a column right by the specified number of columns without taking up space — useful for centering a single column.
- **Nested grids**: You can nest `Row`/`Col` inside a `Col` — each nested `Row` resets the 24-column grid.

## Guidelines

- Use `gutter={[16, 16]}` for standard spacing (horizontal, vertical gap).
- Use responsive breakpoints (`xs`, `md`, `lg`) for dashboards — avoid fixed spans for content that needs to work on different screen sizes.
- For simple horizontal stacking, `Space` is often simpler than a 1-row `Row`/`Col` grid.
