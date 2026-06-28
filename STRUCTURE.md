# Project Structure — Complete Reference

> این فایل ground truth ساختار پروژه است. agent باید هر فایلی را دقیقاً در این مسیر بسازد.

---

## Full File Tree

```
task-manager/
├── public/
│   └── favicon.ico
│
├── src/
│   │
│   ├── app/                              # Next.js App Router
│   │   ├── (auth)/
│   │   │   ├── layout.tsx                # Centered card layout for auth pages
│   │   │   ├── login/
│   │   │   │   └── page.tsx              # → import { LoginPage } from '@/features/auth/components'
│   │   │   └── register/
│   │   │       └── page.tsx              # → import { RegisterPage }
│   │   │
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx                # Sidebar + Header shell
│   │   │   ├── page.tsx                  # → import { DashboardPage }
│   │   │   ├── loading.tsx               # Dashboard skeleton
│   │   │   ├── tasks/
│   │   │   │   ├── page.tsx              # → import { TasksPage }
│   │   │   │   └── loading.tsx
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx              # → import { ProjectsPage }
│   │   │   │   └── loading.tsx
│   │   │   └── settings/
│   │   │       ├── page.tsx              # → import { SettingsPage }
│   │   │       └── loading.tsx
│   │   │
│   │   ├── layout.tsx                    # Root layout — fonts + <Providers>
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   └── globals.css                   # Tailwind v4 @theme inline
│   │
│   ├── components/
│   │   │
│   │   ├── ui/                           # Atom-level — zero business logic
│   │   │   ├── button/
│   │   │   │   ├── button.tsx
│   │   │   │   ├── button.css
│   │   │   │   ├── types.ts
│   │   │   │   └── index.ts
│   │   │   ├── input/
│   │   │   │   ├── input.tsx
│   │   │   │   ├── input.css
│   │   │   │   ├── types.ts
│   │   │   │   └── index.ts
│   │   │   ├── textarea/
│   │   │   │   └── ... (same pattern)
│   │   │   ├── select/
│   │   │   │   └── ...
│   │   │   ├── checkbox/
│   │   │   │   └── ...
│   │   │   ├── badge/
│   │   │   │   └── ...
│   │   │   ├── avatar/
│   │   │   │   └── ...
│   │   │   ├── tooltip/
│   │   │   │   └── ...
│   │   │   ├── skeleton/
│   │   │   │   └── ...
│   │   │   ├── modal/
│   │   │   │   └── ...
│   │   │   ├── dropdown/
│   │   │   │   └── ...
│   │   │   ├── types.d.ts                # ColorVariant, SizeVariant, RadiusVariant…
│   │   │   └── index.ts                  # export * from all + export type * from types.d
│   │   │
│   │   ├── shared/                       # Molecule-level — props-driven patterns
│   │   │   ├── page-header/
│   │   │   │   ├── page-header.tsx
│   │   │   │   ├── types.ts
│   │   │   │   └── index.ts
│   │   │   ├── data-table/
│   │   │   │   └── ...
│   │   │   ├── empty-state/
│   │   │   │   └── ...
│   │   │   ├── confirm-dialog/
│   │   │   │   └── ...
│   │   │   ├── search-input/
│   │   │   │   └── ...
│   │   │   ├── error-boundary/
│   │   │   │   └── ...
│   │   │   └── index.ts
│   │   │
│   │   └── layout/                       # App shell
│   │       ├── sidebar/
│   │       │   ├── sidebar.tsx
│   │       │   ├── sidebar-item.tsx
│   │       │   ├── types.ts
│   │       │   └── index.ts
│   │       ├── header/
│   │       │   ├── header.tsx
│   │       │   ├── types.ts
│   │       │   └── index.ts
│   │       └── index.ts
│   │
│   ├── features/
│   │   │
│   │   ├── auth/
│   │   │   ├── api/
│   │   │   │   ├── auth.api.ts
│   │   │   │   └── index.ts
│   │   │   ├── components/
│   │   │   │   ├── login-page.tsx
│   │   │   │   ├── register-page.tsx
│   │   │   │   ├── login-form.tsx
│   │   │   │   ├── register-form.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── use-login.ts
│   │   │   │   ├── use-register.ts
│   │   │   │   └── index.ts
│   │   │   ├── schema/
│   │   │   │   ├── login.schema.ts
│   │   │   │   ├── register.schema.ts
│   │   │   │   └── index.ts
│   │   │   ├── store/
│   │   │   │   ├── auth-store.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── auth.types.ts
│   │   │   │   └── index.ts
│   │   │   └── constants/
│   │   │       └── index.ts
│   │   │
│   │   ├── dashboard/
│   │   │   ├── api/
│   │   │   │   ├── dashboard.api.ts
│   │   │   │   └── index.ts
│   │   │   ├── components/
│   │   │   │   ├── dashboard-page.tsx
│   │   │   │   ├── stats-card.tsx
│   │   │   │   ├── recent-tasks.tsx
│   │   │   │   ├── tasks-by-status.tsx
│   │   │   │   ├── upcoming-deadlines.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── dashboard.types.ts
│   │   │   │   └── index.ts
│   │   │   └── constants/
│   │   │       └── index.ts
│   │   │
│   │   ├── tasks/
│   │   │   ├── api/
│   │   │   │   ├── tasks.api.ts
│   │   │   │   └── index.ts
│   │   │   ├── components/
│   │   │   │   ├── tasks-page.tsx
│   │   │   │   ├── task-list.tsx
│   │   │   │   ├── task-card.tsx
│   │   │   │   ├── task-form.tsx
│   │   │   │   ├── task-filters.tsx
│   │   │   │   ├── task-board.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── use-tasks.ts
│   │   │   │   ├── use-task.ts
│   │   │   │   ├── use-create-task.ts
│   │   │   │   ├── use-update-task.ts
│   │   │   │   ├── use-delete-task.ts
│   │   │   │   └── index.ts
│   │   │   ├── schema/
│   │   │   │   ├── task.schema.ts
│   │   │   │   └── index.ts
│   │   │   ├── store/
│   │   │   │   ├── tasks-store.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── task.types.ts
│   │   │   │   └── index.ts
│   │   │   └── constants/
│   │   │       ├── task.constants.ts
│   │   │       └── index.ts
│   │   │
│   │   ├── projects/
│   │   │   ├── api/
│   │   │   │   ├── projects.api.ts
│   │   │   │   └── index.ts
│   │   │   ├── components/
│   │   │   │   ├── projects-page.tsx
│   │   │   │   ├── project-card.tsx
│   │   │   │   ├── project-form.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   └── index.ts
│   │   │   ├── schema/
│   │   │   │   ├── project.schema.ts
│   │   │   │   └── index.ts
│   │   │   ├── store/
│   │   │   │   ├── projects-store.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── project.types.ts
│   │   │   │   └── index.ts
│   │   │   └── constants/
│   │   │       └── index.ts
│   │   │
│   │   └── settings/
│   │       ├── components/
│   │       │   ├── settings-page.tsx
│   │       │   ├── profile-tab.tsx
│   │       │   ├── appearance-tab.tsx
│   │       │   ├── notifications-tab.tsx
│   │       │   └── index.ts
│   │       ├── hooks/
│   │       │   └── index.ts
│   │       ├── schema/
│   │       │   └── index.ts
│   │       ├── store/
│   │       │   └── index.ts
│   │       └── types/
│   │           └── index.ts
│   │
│   ├── providers/
│   │   ├── theme-provider.tsx
│   │   ├── query-provider.tsx
│   │   └── index.tsx
│   │
│   ├── store/                            # Global stores
│   │   ├── ui-store.ts
│   │   └── index.ts
│   │
│   ├── hooks/                            # Global hooks
│   │   ├── use-debounce.ts
│   │   ├── use-media-query.ts
│   │   ├── use-outside-click.ts
│   │   └── index.ts
│   │
│   ├── types/                            # Global types
│   │   ├── api.ts
│   │   ├── common.ts
│   │   └── index.ts
│   │
│   ├── schema/                           # Global zod schemas
│   │   ├── common.schema.ts
│   │   └── index.ts
│   │
│   ├── constants/                        # Global constants
│   │   ├── routes.ts
│   │   ├── query-keys.ts
│   │   └── index.ts
│   │
│   ├── utils/                            # Utility functions
│   │   ├── cn.ts
│   │   ├── api.ts
│   │   ├── format.ts
│   │   └── index.ts
│   │
│   ├── config/
│   │   ├── env.ts
│   │   └── fonts.ts
│   │
│   └── middleware.ts                     # Route protection
│
├── .env.local
├── .env.example
├── .eslintrc.json
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Page File Pattern (IMMUTABLE)

Every `page.tsx` file must look EXACTLY like this:

```tsx
import { TasksPage } from '@/features/tasks/components';

export default function Tasks() {
  return <TasksPage />;
}
```

No other code, no other imports, no layout wrapping.

---

## Barrel File Pattern (REQUIRED for every component folder)

```ts
// components/ui/button/index.ts
export * from './button';
export type * from './types';
```

```ts
// components/ui/index.ts  
export * from './button';
export * from './input';
export * from './badge';
// ... all components
export type * from './types.d';
```

```ts
// features/tasks/components/index.ts
export * from './tasks-page';
export * from './task-card';
export * from './task-form';
export * from './task-list';
export * from './task-filters';
export * from './task-board';
```

---

## Import Examples (CORRECT vs WRONG)

```ts
// ✅ CORRECT
import { Button } from '@/components/ui';
import { Input, Badge } from '@/components/ui';
import { PageHeader } from '@/components/shared';
import { TaskCard } from '@/features/tasks/components';
import { useTasksStore } from '@/features/tasks/store';
import { cn } from '@/utils';
import { ROUTES } from '@/constants';
import { env } from '@/config/env';

// ✅ CORRECT — sibling import
import { TaskFilters } from './task-filters'; // inside features/tasks/components/

// ❌ WRONG — never do this
import { Button } from '../../components/ui/button/button';
import { cn } from '../../../utils/cn';
import { useTasksStore } from '../store/tasks-store';
```

---

## CVA Pattern Reference

```ts
// Always this structure for UI components
import { cva, type VariantProps } from 'class-variance-authority';

export const componentVariants = cva('base-class', {
  variants: {
    variant: { fill: 'fill-class', outline: 'outline-class' },
    color: { primary: 'primary-class', secondary: 'secondary-class' },
    size: { sm: 'sm-class', md: 'md-class', lg: 'lg-class' },
  },
  defaultVariants: { variant: 'fill', color: 'primary', size: 'md' },
  compoundVariants: [
    { variant: 'fill', color: 'primary', className: 'compound-class' },
  ],
});

export type ComponentVariants = VariantProps<typeof componentVariants>;
```