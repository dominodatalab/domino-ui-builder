# DatePicker

```tsx
import { DatePicker } from '@domino/extensions';
```

Date (and optionally time) picker. Always wrap in `FieldWrapper` outside of forms, or in `DominoFormItem` inside forms.

## Props

```ts
interface DatePickerProps extends AntDatePickerProps {
  // All standard AntD DatePicker props:
  value?: Dayjs;
  defaultValue?: Dayjs;
  onChange?: (date: Dayjs | null, dateString: string) => void;
  placeholder?: string;
  disabled?: boolean;
  showTime?: boolean | TimepickerProps;  // Enable time selection
  format?: string | string[];            // Display format, e.g. 'YYYY-MM-DD HH:mm'
  disabledDate?: (current: Dayjs) => boolean;
  allowClear?: boolean;
  picker?: 'date' | 'week' | 'month' | 'quarter' | 'year';
}

// Range picker
import { DatePicker } from '@domino/extensions';
const { RangePicker } = DatePicker;

interface RangePickerProps extends AntRangePickerProps {
  value?: [Dayjs, Dayjs];
  onChange?: (dates: [Dayjs, Dayjs] | null, dateStrings: [string, string]) => void;
  showTime?: boolean;
  disabledDate?: (current: Dayjs) => boolean;
}
```

> AntD v5 uses `dayjs` for date values — **not** `moment.js`. Import `dayjs` when constructing default values.

## Examples

### Datetime select with FieldWrapper (from storybook)

```tsx
import { DatePicker, FieldWrapper, Button } from '@domino/extensions';

<FieldWrapper
  label="Input label"
  extra="This is a caption under an input."
  optional
  tooltip="Help message content"
  extraAction={
    <Button size="small" type="tertiary">Action</Button>
  }
>
  <DatePicker
    showTime
    placeholder="Placeholder text"
  />
</FieldWrapper>
```

### Date only (no time)

```tsx
<FieldWrapper label="Start date" optional>
  <DatePicker
    placeholder="Select date"
    format="YYYY-MM-DD"
    onChange={(date, dateString) => setStartDate(dateString)}
  />
</FieldWrapper>
```

### Range picker

```tsx
<FieldWrapper label="Date range" optional>
  <DatePicker.RangePicker
    showTime
    onChange={(dates, dateStrings) => {
      setStart(dateStrings[0]);
      setEnd(dateStrings[1]);
    }}
  />
</FieldWrapper>
```

### Disable past dates

```tsx
import dayjs from 'dayjs';

<DatePicker
  disabledDate={(current) => current && current < dayjs().startOf('day')}
  placeholder="Select future date"
/>
```

### Inside a DominoFormItem

```tsx
<DominoFormItem
  name="scheduledAt"
  label="Schedule date"
  rules={[{ required: true, message: 'Please select a date.' }]}
>
  <DatePicker showTime aria-label="Schedule date" style={{ width: '100%' }} />
</DominoFormItem>
```

## AntD behavioral notes

- **`dayjs` values**: AntD v5 requires `dayjs` objects. Never use `moment` — it's not bundled. When setting `value` or `defaultValue`, wrap with `dayjs('2024-01-01')`.
- **`showTime`**: Can be a boolean or a `TimepickerProps` object to configure time granularity (e.g. `showTime={{ format: 'HH:mm' }}`).
- **Width**: `DatePicker` defaults to a fixed width that may not fill its container. Use `style={{ width: '100%' }}` inside forms.
- **`picker="month"`**: Shows only year/month selection — useful for billing or reporting periods.
- **Locale**: Date format follows the configured AntD locale. Set locale globally at the `ConfigProvider` level.

## Guidelines

- Always use `FieldWrapper` (or `DominoFormItem`) — never render a bare `DatePicker` without a label.
- Use `showTime` for scheduling UIs (jobs, runs, pipelines).
- Use `disabledDate` to prevent selecting logically invalid ranges (e.g. can't end before start).
- Use `DatePicker.RangePicker` when selecting a span — don't use two separate `DatePicker`s.
