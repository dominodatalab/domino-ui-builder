# EmptyState

```tsx
import { EmptyState } from '@domino/extensions';
```

Placeholder for empty content areas. Two sizes: `small` for inline empty content (table cells, list areas), `large` for full-page or major section empty states.

## Props

```ts
interface EmptyStateProps {
  size: 'small' | 'large';
  text: string;              // Explanatory message
  icon?: string;             // FontAwesome icon name (large size only, e.g. 'LayerPlus')
  button?: {
    buttonText: string;
    onButtonClick: () => void;
    buttonIcon?: ReactNode;
  };
  link?: ReactNode;          // Link element (use <Link> component)
}
```

## Examples

### Small empty state (from storybook)

```tsx
import { EmptyState, Link } from '@domino/extensions';

<EmptyState
  size="small"
  text="Body text explaining why the area is empty and what the user can do to populate it."
  link={
    <Link style={{ fontSize: '14px' }} to="https://docs.domino.ai/" target="_blank" showIcon>
      Learn more
    </Link>
  }
/>
```

### Large empty state with icon and button (from storybook)

```tsx
import { EmptyState, Link, IconResolver } from '@domino/extensions';

<EmptyState
  size="large"
  text="No datasets have been added yet. Create your first dataset to get started."
  icon="LayerPlus"
  button={{
    buttonText: 'Add dataset',
    onButtonClick: () => openCreateDatasetModal(),
    buttonIcon: <IconResolver collection="regular" icon="Plus" aria-label="add" />,
  }}
  link={
    <Link style={{ fontSize: '14px' }} to="https://docs.domino.ai/docs/datasets" target="_blank" showIcon>
      View documentation
    </Link>
  }
/>
```

### Empty table state (small, inside a table)

```tsx
<EmptyState
  size="small"
  text="No runs match your current filters."
/>
```

### Empty page state (large, no button)

```tsx
<EmptyState
  size="large"
  icon="FolderOpen"
  text="This project has no files yet. Push files from your local machine to get started."
  link={
    <Link to="https://docs.domino.ai/docs/files" target="_blank" showIcon>
      How to add files
    </Link>
  }
/>
```

## AntD behavioral notes

No direct AntD base — `EmptyState` is a Domino-specific component. The large variant includes an illustration/icon area, while small is text-only with an optional link.

## Guidelines

- Use `size="small"` inside tables, list panels, and card bodies.
- Use `size="large"` for full-page or major section empty states (first-run experience, no results).
- Always explain **why** the area is empty and **what to do** — don't just say "No items found."
- Include a `button` when there's a clear primary action to add content (e.g. "Create project").
- Include a `link` when there's documentation or help that explains the feature.
- Don't show both an action button and a link on `size="small"` — keep it simple.
