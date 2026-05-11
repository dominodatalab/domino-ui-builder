# IconResolver

```tsx
import { IconResolver } from '@domino/extensions';
```

FontAwesome icon renderer. Always use `IconResolver` — never import FontAwesome icons directly or use other icon packages.

## Props

```ts
interface IconResolverProps<C extends IconCollection = 'light'> {
  collection: 'light' | 'regular' | 'solid' | 'brands' | 'duotone';
  icon: string;              // FontAwesome icon name in PascalCase (e.g. 'MagnifyingGlass', 'Plus')
  'aria-label': string;      // Required for accessibility
  iconSize?: IconSize;       // Named size (preferred over fontSize)
  fontSize?: number;         // Raw pixel size (use iconSize when possible)
  color?: ThemeColor;        // Theme color token (e.g. 'palette.primary')
  dataTest?: string;
}

type IconSize = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge';
// Maps to: 12px, 16px, 24px, 64px, 96px, 160px
```

## Icon collections

| Collection | Use case |
|------------|----------|
| `light` | Default — most UI icons (buttons, labels, navigation) |
| `regular` | Slightly heavier stroke — for emphasis or contrast against `light` |
| `solid` | Filled icons — for active states, warnings, or strong emphasis |
| `brands` | Brand logos — GitHub, Slack, AWS, etc. |
| `duotone` | Two-color icons — for illustrations and decorative use |

## Icon size map

| `iconSize` | Pixels |
|------------|--------|
| `xSmall` | 12px |
| `small` | 16px |
| `medium` | 24px |
| `large` | 64px |
| `xLarge` | 96px |
| `xxLarge` | 160px |

## Examples

### Standard button icon (from storybook)

```tsx
import { IconResolver } from '@domino/extensions';

<Button type="primary" icon={<IconResolver iconSize="xSmall" collection="light" icon="Plus" aria-label="add" />}>
  Add item
</Button>
```

### Search input prefix

```tsx
<TextInput
  prefix={<IconResolver collection="regular" icon="MagnifyingGlass" aria-label="" iconSize="small" />}
  placeholder="Search..."
/>
```

### Brand icon (GitHub)

```tsx
<IconResolver
  collection="brands"
  icon="Github"
  aria-label="GitHub"
  iconSize="small"
/>
```

### Colored icon

```tsx
<IconResolver
  collection="light"
  icon="CircleCheck"
  aria-label="success"
  iconSize="small"
  color="palette.success"
/>
```

### Info icon with tooltip

```tsx
<Tooltip title="This setting affects all runs in the project">
  <IconResolver
    collection="light"
    icon="CircleInfo"
    aria-label="info"
    iconSize="small"
    color="palette.textSecondary"
  />
</Tooltip>
```

### Decorative duotone icon (empty state)

```tsx
<IconResolver
  collection="duotone"
  icon="LayerPlus"
  aria-label=""
  iconSize="large"
/>
```

## Guidelines

- **Always use `'light'` collection by default** — it matches most Domino UI patterns.
- **Always provide `aria-label`**: Use a descriptive label for interactive icons ("add", "delete"); use an empty string `""` for purely decorative icons.
- **Always use `iconSize`** instead of raw `fontSize` — named sizes are consistent with the design system.
- Find icon names at the [FontAwesome icon gallery](https://fontawesome.com/icons) and convert to PascalCase (e.g. `magnifying-glass` → `MagnifyingGlass`).
- Never mock `IconResolver` in tests — the CLAUDE.md testing guidelines explicitly forbid it.
