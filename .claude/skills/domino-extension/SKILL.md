---
name: domino-extension
description: >
  In-depth usage reference for every component in @domino/extensions, with real storybook examples,
  AntD behavioral notes, and Domino-specific patterns. Use this skill when you need to know how to
  correctly use a specific component — its exact props (verified from source), storybook-based examples,
  AntD gotchas, and when to choose one component over another.
  Covers: Button, IconButton, ButtonWithTooltip, TextInput, TextArea, Select, Cascader, Autocomplete,
  DatePicker, RangePicker, Checkbox, Radio, Toggle, Segmented, Dropdown, ActionDropdown, Modal, Drawer,
  Card, Popover, Tooltip, Grid, Space, Accordion, Tabs, Breadcrumb, AnchorLinks, SideBar, Link,
  RouterLink, Badge, Tag, EmptyState, Callout boxes, Toastr, WaitSpinner, DominoTable, Tree,
  KeyValue, MetadataBar, DominoForm, DominoFormItem, EditInlineContainer, Wizard, Typography,
  IconResolver, CopyText, CodeEditor, Markdown.
---

# Domino Extension — Component Reference

Complete usage reference for `@domino/extensions` with real storybook examples, AntD behavioral notes,
and Domino-specific patterns sourced directly from the codebase.

All components use named imports:

```tsx
import { Button, Modal, IconResolver } from '@domino/extensions';
```

## Component Index

### Buttons & Actions
| Component | Reference | Description |
|-----------|-----------|-------------|
| `Button` / `ButtonWithTooltip` | [button.md](references/button.md) | Primary action buttons with type, color, size, icon, badge variants |
| `IconButton` | [icon-button.md](references/icon-button.md) | Icon-only button with mandatory tooltip |
| `ActionDropdown` / `IconDropdown` | [action-dropdown.md](references/action-dropdown.md) | Text or icon triggered action menus |

### Form Inputs
| Component | Reference | Description |
|-----------|-----------|-------------|
| `TextInput` | [text-input.md](references/text-input.md) | Single-line text input — use inside `FieldWrapper` |
| `TextArea` | [text-area.md](references/text-area.md) | Multi-line text input |
| `Select` | [select.md](references/select.md) | Searchable single/multi select with `OptionLabel` |
| `Cascader` | [cascader.md](references/cascader.md) | Hierarchical multi-level select |
| `Autocomplete` | [autocomplete.md](references/autocomplete.md) | Input with suggestion dropdown |
| `DatePicker` / `RangePicker` | [date-picker.md](references/date-picker.md) | Date and date range pickers |
| `Checkbox` | [checkbox.md](references/checkbox.md) | Checkbox with optional `descriptionText` |
| `Radio` | [radio.md](references/radio.md) | Radio group with `vertical`, `icon`, per-option `tooltip` |
| `Toggle` | [toggle.md](references/toggle.md) | On/off toggle switch |
| `Segmented` | [segmented.md](references/segmented.md) | Segmented button group |

### Overlays & Containers
| Component | Reference | Description |
|-----------|-----------|-------------|
| `Modal` | [modal.md](references/modal.md) | Dialog with size presets, custom footer sub-components |
| `Drawer` | [drawer.md](references/drawer.md) | Side panel with `Drawer.Footer` / `Drawer.PrimaryAction` pattern |
| `Popover` | [popover.md](references/popover.md) | Rich content popover with title, body, footer |
| `Tooltip` | [tooltip.md](references/tooltip.md) | Hover tooltip — `title` prop, AntD flip behavior |
| `Dropdown` | [dropdown.md](references/dropdown.md) | Menu triggered by click or hover |

### Layout
| Component | Reference | Description |
|-----------|-----------|-------------|
| `Card` | [card.md](references/card.md) | Content container with `titleExtra`, `helpMessage`, `extra` |
| `Row` / `Col` | [grid.md](references/grid.md) | 24-column responsive grid with gutter tuples |
| `Space` / `Space.Compact` | [space.md](references/space.md) | Gap utility, input+button compact combos |
| `Accordion` | [accordion.md](references/accordion.md) | Expandable sections with `summary` preview |

### Navigation
| Component | Reference | Description |
|-----------|-----------|-------------|
| `Tabs` | [tabs.md](references/tabs.md) | Tab panels with badge counts |
| `Breadcrumb` | [breadcrumb.md](references/breadcrumb.md) | `isRouteLink` for internal vs external paths |
| `AnchorLinks` | [anchor-links.md](references/anchor-links.md) | In-page scrollspy navigation |
| `SideBar` | [side-bar.md](references/side-bar.md) | Collapsible sidebar with sub-menus |
| `Link` / `RouterLink` | [link.md](references/link.md) | External anchor vs React Router link |

### Feedback & Status
| Component | Reference | Description |
|-----------|-----------|-------------|
| `Badge` | [badge.md](references/badge.md) | Count indicator with neutral/success/alert types |
| `Tag` | [tag.md](references/tag.md) | Semantic label with user-generated/success/danger/warning |
| `EmptyState` | [empty-state.md](references/empty-state.md) | Small/large empty placeholders |
| `InfoBox` / `SuccessBox` / `WarningBox` / `DangerBox` | [callout.md](references/callout.md) | Contextual message banners |
| `Toastr` | [toastr.md](references/toastr.md) | Imperative toast notifications |
| `WaitSpinner` | [wait-spinner.md](references/wait-spinner.md) | Loading spinner |

### Data Display
| Component | Reference | Description |
|-----------|-----------|-------------|
| `DominoTable` | [domino-table.md](references/domino-table.md) | Typed table with resizable columns and cell components |
| `Tree` / `SearchableTree` | [tree.md](references/tree.md) | Hierarchical tree with checkboxes and search |
| `KeyValue` | [key-value.md](references/key-value.md) | Labeled key-value metadata display |
| `MetadataBar` | [metadata-bar.md](references/metadata-bar.md) | Horizontal bar of labeled metadata items |

### Forms
| Component | Reference | Description |
|-----------|-----------|-------------|
| `DominoForm` / `DominoFormItem` | [domino-form.md](references/domino-form.md) | Form container with validation and `FieldWrapper` |
| `EditInlineContainer` | [edit-inline.md](references/edit-inline.md) | Inline editing with async save |

### Wizards
| Component | Reference | Description |
|-----------|-----------|-------------|
| `Wizard` | [wizard.md](references/wizard.md) | Multi-step workflow |

### Typography & Content
| Component | Reference | Description |
|-----------|-----------|-------------|
| `Typography` | [typography.md](references/typography.md) | H1/H2/H3 headings and body text variants |
| `Markdown` | [markdown.md](references/markdown.md) | Markdown rendering with mention support |
| `CopyText` | [copy-text.md](references/copy-text.md) | Display + clipboard copy |
| `CodeEditor` | [code-editor.md](references/code-editor.md) | Syntax-highlighted code editor |

### Icons
| Component | Reference | Description |
|-----------|-----------|-------------|
| `IconResolver` | [icon-resolver.md](references/icon-resolver.md) | FontAwesome unified icon system |
