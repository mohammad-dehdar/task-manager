# Task Manager — Agent Context

> این فایل را در هر session اول بخوان. تمام تصمیمات معماری اینجاست.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 |
| State | Zustand v5 |
| Validation | Zod |
| HTTP Client | Axios |
| Class utils | clsx + tailwind-merge → `cn()` |
| CVA | class-variance-authority |
| Icons | lucide-react |

---

## Absolute Rules — Never Break These

1. **Import paths** must always use `@/` aliases. Relative imports (`../`) are ONLY allowed between siblings inside the same folder.
2. **`page.tsx`** files contain ONE import and ONE JSX line — nothing else.
3. **Every folder** that exports components MUST have an `index.ts` barrel file.
4. **Types** for a feature live inside that feature. Shared/global types live in `src/types/`.
5. **No logic in UI components** (`components/ui/`). They are purely presentational, driven by props.
6. **`components/shared/`** components handle repetitive patterns via props — keep feature components thin.
7. **Zustand stores** for a feature live inside `features/<name>/store/`. Global stores live in `src/store/`.
8. **All environment variables** are accessed via `src/config/env.ts` — never `process.env` directly in components.
9. **Fonts** are defined only in `src/config/fonts.ts`.
10. **Providers** live in `src/providers/` and are composed in `src/providers/index.tsx`.

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── tasks/page.tsx
│   │   ├── projects/page.tsx
│   │   └── settings/page.tsx
│   ├── layout.tsx                # Root layout — mounts <Providers>
│   └── globals.css
│
├── components/
│   ├── ui/                       # Atom-level, zero logic
│   │   ├── button/
│   │   │   ├── button.tsx
│   │   │   ├── button.css
│   │   │   └── types.ts
│   │   ├── input/
│   │   ├── badge/
│   │   ├── modal/
│   │   ├── dropdown/
│   │   ├── avatar/
│   │   ├── checkbox/
│   │   ├── select/
│   │   ├── textarea/
│   │   ├── tooltip/
│   │   ├── skeleton/
│   │   ├── types.d.ts            # Shared UI types (ColorVariant, SizeVariant…)
│   │   └── index.ts              # export * from every component
│   │
│   ├── shared/                   # Molecule-level, props-driven, no feature logic
│   │   ├── page-header/
│   │   ├── data-table/
│   │   ├── empty-state/
│   │   ├── error-boundary/
│   │   ├── confirm-dialog/
│   │   ├── search-input/
│   │   └── index.ts
│   │
│   └── layout/                   # App shell pieces
│       ├── sidebar/
│       ├── header/
│       ├── footer/
│       └── index.ts
│
├── features/
│   ├── auth/
│   │   ├── api/                  # axios calls
│   │   ├── components/           # LoginPage, RegisterPage…
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   ├── schema/               # zod schemas
│   │   ├── store/                # zustand slice
│   │   ├── types/
│   │   └── constants/
│   │
│   ├── tasks/
│   │   ├── api/
│   │   ├── components/
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   ├── schema/
│   │   ├── store/
│   │   ├── types/
│   │   └── constants/
│   │
│   ├── projects/
│   └── settings/
│
├── providers/
│   ├── query-provider.tsx
│   ├── theme-provider.tsx
│   └── index.tsx                 # Composes all providers
│
├── store/                        # Global zustand stores
│   ├── ui-store.ts
│   └── index.ts
│
├── hooks/                        # Global hooks
│   ├── use-debounce.ts
│   ├── use-media-query.ts
│   └── index.ts
│
├── types/                        # Global TypeScript types
│   ├── api.ts
│   ├── common.ts
│   └── index.ts
│
├── schema/                       # Global zod schemas
│   └── index.ts
│
├── constants/                    # Global constants
│   ├── routes.ts
│   ├── query-keys.ts
│   └── index.ts
│
├── utils/
│   ├── cn.ts                     # clsx + twMerge
│   ├── format.ts
│   ├── api.ts                    # axios instance
│   └── index.ts
│
└── config/
    ├── env.ts
    └── fonts.ts
```

---

## Page Pattern (immutable)

```tsx
// src/app/(dashboard)/tasks/page.tsx
import { TasksPage } from '@/features/tasks/components';

export default function Tasks() {
  return <TasksPage />;
}
```

---

## Import Rules (tsconfig paths)

```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/components/ui": ["./src/components/ui/index.ts"],
    "@/components/shared": ["./src/components/shared/index.ts"],
    "@/components/layout": ["./src/components/layout/index.ts"],
    "@/features/*": ["./src/features/*/index.ts"],
    "@/hooks": ["./src/hooks/index.ts"],
    "@/store": ["./src/store/index.ts"],
    "@/utils": ["./src/utils/index.ts"],
    "@/types": ["./src/types/index.ts"],
    "@/constants": ["./src/constants/index.ts"],
    "@/config/*": ["./src/config/*"]
  }
}
```

---

## Barrel File Pattern

```ts
// components/ui/index.ts
export * from './button';
export * from './input';
export * from './badge';
// …

// re-export shared types
export type * from './types.d';
```

```ts
// features/tasks/components/index.ts
export * from './tasks-page';
export * from './task-card';
export * from './task-form';
```

---

## Zustand Store Pattern

```ts
// features/tasks/store/tasks-store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Task } from '../types';

interface TasksState {
  tasks: Task[];
  selectedTask: Task | null;
  isLoading: boolean;
  setTasks: (tasks: Task[]) => void;
  selectTask: (task: Task | null) => void;
  setLoading: (v: boolean) => void;
}

export const useTasksStore = create<TasksState>()(
  devtools(
    (set) => ({
      tasks: [],
      selectedTask: null,
      isLoading: false,
      setTasks: (tasks) => set({ tasks }),
      selectTask: (task) => set({ selectedTask: task }),
      setLoading: (v) => set({ isLoading: v }),
    }),
    { name: 'tasks-store' },
  ),
);
```

---

## env.ts Pattern

```ts
// src/config/env.ts
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  CI: process.env.CI || false,
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
};
```

---

## Tailwind v4 Config Pattern

`app/globals.css` (no `tailwind.config.js` — v4 is CSS-first):

```css
@import 'tailwindcss';

@theme inline {
  --font-sans: var(--font-inter);
  --color-primary-500: #fd6519;
  /* … full scale … */
  --radius-sm: 8px;
}
```

---

## API Layer Pattern

```ts
// utils/api.ts — single axios instance
import axios from 'axios';
import { env } from '@/config/env';

export const api = axios.create({
  baseURL: env.API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

```ts
// features/tasks/api/tasks.api.ts
import { api } from '@/utils';
import type { Task, CreateTaskDto } from '../types';

export const tasksApi = {
  getAll: () => api.get<Task[]>('/tasks').then((r) => r.data),
  getById: (id: string) => api.get<Task>(`/tasks/${id}`).then((r) => r.data),
  create: (dto: CreateTaskDto) => api.post<Task>('/tasks', dto).then((r) => r.data),
  update: (id: string, dto: Partial<CreateTaskDto>) =>
    api.patch<Task>(`/tasks/${id}`, dto).then((r) => r.data),
  delete: (id: string) => api.delete(`/tasks/${id}`),
};
```

---

## Zod + Types Pattern

```ts
// features/tasks/schema/task.schema.ts
import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.string().datetime().optional(),
  projectId: z.string().uuid().optional(),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
```

```ts
// features/tasks/types/task.types.ts
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  dueDate?: string;
  projectId?: string;
  createdAt: string;
  updatedAt: string;
}
```

---

## Providers Pattern

```tsx
// src/providers/index.tsx
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
}
```

```tsx
// src/app/layout.tsx
import { Providers } from '@/providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

## Installed skills.sh Skills — Read These Before Writing Code

These skills are installed via `npx skills add` and loaded automatically.
**Each covers a specific domain — defer to them when relevant:**

### `next-best-practices` (vercel-labs/next-skills)
- Covers: file conventions, RSC boundaries, async `params`/`searchParams`, `error.tsx`, `loading.tsx`, metadata API, image/font optimization, route handlers
- **Defer to this for**: anything touching `app/` directory, Server vs Client Component decisions, `'use client'` placement
- Key rule: Server Components are default. Add `'use client'` only when you need hooks, event handlers, or browser APIs. Never make a layout a Client Component.

### `vercel-react-best-practices` (vercel-labs/agent-skills)
- Covers: 70 rules across 8 categories — waterfall elimination, bundle optimization, re-render prevention, memoization, hydration
- **Defer to this for**: data fetching patterns, `React.cache()`, parallel fetches, `useMemo`/`useCallback` decisions, bundle splitting
- Key rule: Fetch data in Server Components when possible. Parallel-fetch with `Promise.all`. Never fetch in `useEffect` if you can fetch on the server.

### `tailwind-design-system` (wshobson/agents)
- Covers: Tailwind v4 `@theme` blocks, OKLCH colors, `@custom-variant` for dark mode, CVA patterns, v3→v4 migration checklist
- **Defer to this for**: any `globals.css` decisions, custom utility directives `@utility`, container queries, `color-mix()` for alpha
- Key rule: No `tailwind.config.js` in v4. All config goes in CSS via `@theme inline {}`.

### `vercel-composition-patterns` (vercel-labs/agent-skills)
- Covers: compound components, render props, state lifting, context composition, React 19 APIs (`use()` instead of `useContext`, no `forwardRef`)
- **Defer to this for**: any component that needs flexible slots, when you feel tempted to add a boolean prop
- Key rule: If a component accumulates more than 3 boolean props controlling layout, refactor to compound component or children slots.

### `typescript-advanced-types` (wshobson/agents)
- Covers: generics with constraints, conditional types, mapped types, template literals, discriminated unions, type-safe API clients
- **Defer to this for**: typing `tasksApi`, Zustand store generics, Zod inferred types, `ApiResponse<T>` generic wrappers
- Key rule: Use `z.infer<typeof schema>` as the single source of truth for DTO types. Never duplicate type definitions manually.

### `webapp-testing` (anthropics/skills)
- Covers: Playwright scripts, server lifecycle management, DOM inspection patterns, selector strategies
- **Defer to this for**: STEP 18 verification, writing E2E tests for auth flow and task CRUD
- Key rule: Screenshot first, then identify selectors, then write assertions.

---

## How Skills Interact With Our Architecture

| Situation | Which skill governs |
|---|---|
| Should this be a Server or Client Component? | `next-best-practices` |
| How to fetch task data? | `vercel-react-best-practices` (parallel, server-side) |
| How to set up dark mode in CSS? | `tailwind-design-system` |
| Button has too many boolean props | `vercel-composition-patterns` |
| How to type `ApiResponse<Task[]>`? | `typescript-advanced-types` |
| Verifying the app works after STEP 18 | `webapp-testing` |
| Everything else (imports, structure, patterns) | `agents.md` (this file) |