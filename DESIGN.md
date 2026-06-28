# Design System Reference

> همیشه قبل از ساختن هر کامپوننتی این فایل را چک کن.

---

## Color Tokens (Tailwind v4 CSS custom properties)

| Token | Value | Usage |
|---|---|---|
| `primary-500` | `#fd6519` | CTA buttons, active states |
| `primary-400` | `#ff8f4d` | Hover |
| `primary-300` | `#ffb585` | Active press |
| `secondary-500` | `#6366f1` | Secondary actions |
| `success-500` | `#10B981` | Done, success states |
| `error-500` | `#EF4444` | Delete, error states |
| `warning-500` | `#F59E0B` | Warnings |
| `info-500` | `#3B82F6` | Info states |
| `neutral-0` | `#ffffff` | White |
| `neutral-50` | `#f9fafb` | Page background |
| `neutral-800` | `#1f2937` | Body text |
| `neutral-900` | `#111827` | Headings |

---

## Typography Scale

| Class | Size | Usage |
|---|---|---|
| `text-xs` | 12px | Labels, captions |
| `text-sm` | 14px | Secondary text |
| `text-base` | 16px | Body |
| `text-lg` | 18px | Subheadings |
| `text-xl` | 20px | Section headings |
| `text-2xl` | 24px | Page headings |
| `text-3xl` | 30px | Hero headings |

Font: `--font-dana` (primary), `--font-poppins` (Latin fallback)

---

## Border Radius Tokens

| Token | Value |
|---|---|
| `radius-xxs` | 4px |
| `radius-xs` | 6px |
| `radius-sm` | 8px |
| `radius-md` | 10px |
| `radius-lg` | 12px |
| `radius-xl` | 16px |
| `radius-2xl` | 20px |
| `radius-3xl` | 24px |
| `radius-4xl` | 32px |

---

## Button Component

### Variants
- `fill` — solid background (default)
- `outline` — bordered, transparent bg
- `ghost` — no border, transparent bg
- `link` — underline on hover

### Colors
`primary` | `secondary` | `success` | `error` | `gray` | `white`

### Sizes (className prop)
| Class | Padding | Radius |
|---|---|---|
| `button-text-xs` | `px-4 py-1` | `rounded-md` |
| `button-text-sm` | `px-4 py-2` | `rounded-lg` |
| `button-text-md` | `px-6 py-3` | `rounded-xl` (default) |
| `button-text-lg` | `px-8 py-4` | `rounded-xl` |

### Icon-only Sizes
`button-icon-xs` | `button-icon-sm` | `button-icon-md` | `button-icon-lg`

### Props
```ts
interface ButtonProps {
  as?: 'button' | 'link';
  variant?: 'fill' | 'outline' | 'ghost' | 'link';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'gray' | 'white';
  rounded?: boolean;
  fullWidth?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  href?: string;           // when as='link'
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  loadingClasses?: string;
}
```

### Usage Examples
```tsx
<Button variant="fill" color="primary">ذخیره</Button>
<Button variant="outline" color="error" startIcon={<TrashIcon />}>حذف</Button>
<Button variant="ghost" color="gray" isLoading loadingText="در حال ارسال...">ارسال</Button>
<Button as="link" href="/tasks" variant="link" color="secondary">مشاهده همه</Button>
```

---

## Shared UI Types

```ts
// components/ui/types.d.ts
export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'neutral'
  | 'warning';

export type RadiusVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type OrientationVariant = 'horizontal' | 'vertical';
export type PositionVariant = 'top' | 'right' | 'bottom' | 'left';
```

---

## Input Component (pattern to follow)

```tsx
// components/ui/input/input.tsx
import { cn } from '@/utils';
import { cva } from 'class-variance-authority';
import type { InputProps } from './types';

export const inputVariants = cva('input', {
  variants: {
    size: {
      sm: 'input-sm',
      md: 'input-md',
      lg: 'input-lg',
    },
    state: {
      default: 'input-default',
      error: 'input-error',
      success: 'input-success',
    },
  },
  defaultVariants: { size: 'md', state: 'default' },
});

export const Input: React.FC<InputProps> = ({
  className,
  size,
  state,
  label,
  hint,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <div className="input-field-wrapper">
        {startIcon && <span className="input-icon-start">{startIcon}</span>}
        <input className={cn(inputVariants({ size, state }), className)} {...props} />
        {endIcon && <span className="input-icon-end">{endIcon}</span>}
      </div>
      {hint && <p className={cn('input-hint', state === 'error' && 'input-hint-error')}>{hint}</p>}
    </div>
  );
};
```

---

## Badge Component (pattern)

```tsx
// Used for task priority and status
<Badge color="error" size="sm">High Priority</Badge>
<Badge color="success" size="sm">Done</Badge>
<Badge color="warning" size="sm">In Progress</Badge>
```

---

## Layout Dimensions

| Element | Value |
|---|---|
| Sidebar width | `240px` (collapsed: `64px`) |
| Header height | `64px` |
| Max content width | `1440px` |
| Content padding (mobile) | `20px` |
| Content padding (desktop) | `52px` (px-13) |

---

## Dark Mode

- Toggle via `.dark` class on `<html>`
- Managed by `ThemeProvider` in `src/providers/theme-provider.tsx`
- All components MUST have dark variants using Tailwind `dark:` prefix

---

## Task Card Visual Spec

```
┌─────────────────────────────────────┐
│  [checkbox]  Task Title        [···]│
│              Project name           │
│  [High] [In Progress]    📅 Dec 25 │
└─────────────────────────────────────┘
```

Priority badge colors:
- `high` → `error`
- `medium` → `warning`  
- `low` → `success`

Status badge colors:
- `todo` → `neutral`
- `in-progress` → `info`
- `done` → `success`

---

## Empty State Pattern

```tsx
// Always use components/shared/empty-state
<EmptyState
  icon={<ClipboardIcon />}
  title="هیچ تسکی وجود ندارد"
  description="اولین تسک خود را بسازید"
  action={<Button variant="fill" color="primary">ساخت تسک</Button>}
/>
```