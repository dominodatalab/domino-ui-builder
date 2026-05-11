# Wizard

```tsx
import { Wizard, WizardStepContent } from '@domino/extensions';
```

Multi-step form flow. Renders a step indicator sidebar and navigates through sequential steps with Next/Back/Finish buttons. Always rendered inside a `Modal` with `removeBodyPaddings` and `forStepperContent`.

> For comprehensive Wizard documentation and patterns, use the `wizard-builder` skill. This file covers the core API.

## Props

```ts
interface WizardProps {
  steps: WizardStepConfig[];
  onFinish: () => void | Promise<void>;
  onCancel: () => void;
  // Controlled mode:
  current?: number;
  onChange?: (current: number, next: number) => void;
  stepStatuses?: StepStatus[];
  onStepStatusChange?: (statuses: StepStatus[]) => void;
  // Button customization:
  submitActionText?: ReactNode;   // default: 'Finish'
  submitAriaLabel?: string;
  cancelActionText?: ReactNode;   // default: 'Cancel'
  isLoading?: boolean;            // Loading on finish button
  isModalContent?: boolean;       // default: true
}

interface WizardStepConfig {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  content: ReactNode;              // Use <WizardStepContent> as wrapper
  validateStep?: () => boolean | Promise<boolean>;  // Return false to block Next
  onStepChange?: () => Promise<void>;  // Called when navigating away
  hidden?: boolean;                // Conditionally hide a step
  btnText?: string | ReactNode;    // Override 'Next' button text for this step
}
```

### WizardStepContent

```tsx
interface WizardStepContentProps {
  children: ReactNode;
  minHeight?: number;   // Minimum height for the step panel (default: auto)
  className?: string;
}
```

## Examples

### Basic wizard in a modal (from storybook)

```tsx
import { Wizard, WizardStepContent, Modal } from '@domino/extensions';

const [isOpen, setIsOpen] = useState(false);

const steps = [
  {
    title: 'Basic Information',
    subtitle: 'Enter your personal details',
    content: (
      <WizardStepContent minHeight={520}>
        <div style={{ padding: '20px' }}>
          <TextInput placeholder="Name" style={{ width: '100%', marginBottom: '10px' }} />
          <TextInput placeholder="Email" style={{ width: '100%' }} />
        </div>
      </WizardStepContent>
    ),
  },
  {
    title: 'Additional Details',
    content: (
      <WizardStepContent minHeight={520}>
        <div style={{ padding: '20px' }}>
          <TextArea placeholder="Description" style={{ width: '100%' }} />
        </div>
      </WizardStepContent>
    ),
  },
  {
    title: 'Review',
    content: (
      <WizardStepContent minHeight={520}>
        <div style={{ padding: '20px' }}>
          <p>Review your information before submitting.</p>
        </div>
      </WizardStepContent>
    ),
  },
];

<>
  <Button type="primary" onClick={() => setIsOpen(true)}>Open Wizard</Button>
  <Modal
    open={isOpen}
    onCancel={() => setIsOpen(false)}
    size="xl"
    title="Create New Resource"
    footer={null}
    removeBodyPaddings
    forStepperContent
  >
    <Wizard
      steps={steps}
      onFinish={() => {
        handleSubmit();
        setIsOpen(false);
      }}
      onCancel={() => setIsOpen(false)}
      submitActionText="Create"
    />
  </Modal>
</>
```

### Step with async validation

```tsx
const steps = [
  {
    title: 'Name',
    content: (
      <WizardStepContent>
        <DominoFormItem name="name" label="Project name" rules={[{ required: true }]}>
          <TextInput aria-label="Project name" />
        </DominoFormItem>
      </WizardStepContent>
    ),
    validateStep: async () => {
      try {
        await form.validateFields(['name']);
        return true;
      } catch {
        return false;
      }
    },
  },
];
```

### Conditional step (hidden based on selection)

```tsx
const steps = [
  {
    title: 'Type',
    content: <WizardStepContent>...</WizardStepContent>,
  },
  {
    title: 'Advanced',
    hidden: selectedType !== 'advanced',  // Skipped when not advanced
    content: <WizardStepContent>...</WizardStepContent>,
  },
  {
    title: 'Review',
    content: <WizardStepContent>...</WizardStepContent>,
  },
];
```

## Behavioral notes

- **Step validation**: Return `false` (or `Promise<false>`) from `validateStep` to block the user from advancing. The Next button becomes disabled only if `validateStep` is defined and returns false.
- **Hidden steps**: Steps with `hidden={true}` are excluded from the navigation — the step count and current index reflect only visible steps.
- **`isLoading`**: Shows a spinner on the Finish button during async `onFinish`. Reset to `false` after completion.
- **Modal setup**: Always pass `footer={null}`, `removeBodyPaddings`, and `forStepperContent` to the wrapping Modal — the Wizard manages its own footer navigation.

## Guidelines

- Use `Wizard` for sequential multi-step flows where each step depends on completing the previous one.
- Use `validateStep` for per-step validation — don't disable the Next button manually.
- Use `hidden` for conditionally skippable steps rather than adding/removing steps from the array (which would reset current index).
- Keep each step focused on a single concern — a step with more than ~5 fields is probably two steps.
- For the `wizard-builder` skill for complete patterns including controlled mode, clickable steps, and multi-step form validation.
