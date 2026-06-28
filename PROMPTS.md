# Prompts — Step-by-Step Build Guide

> هر پرامپت را **به ترتیب** و **یکی یکی** به agent بده.
> بعد از هر مرحله تأیید کن که فایل‌ها درست ساخته شدند، سپس مرحله بعد.

---

## STEP 0 — Context Injection (همیشه اول)

```
Read agents.md, design.md and structure.md carefully before writing any code.
These files define all architectural decisions, import rules, and patterns for this project.
Do not deviate from them under any circumstances.

You also have these skills installed — reference them when relevant:
- next-best-practices: for any App Router file, RSC boundary, or async pattern
- vercel-react-best-practices: for data fetching, memoization, bundle decisions
- tailwind-design-system: for globals.css, @theme blocks, dark mode config
- vercel-composition-patterns: for component API design, compound components
- typescript-advanced-types: for generics, discriminated unions, Zod type inference
- webapp-testing: for E2E verification in the final step

When a situation is covered by both a skill and agents.md, agents.md wins.
```

---

## STEP 1 — Project Bootstrap

```
Initialize a Next.js 15 project with the following exact configuration:
- TypeScript strict mode
- App Router (no Pages Router)
- Tailwind CSS v4
- src/ directory
- No default ESLint config (we'll add our own)

After init, install these packages:
- zustand
- axios
- zod
- class-variance-authority
- clsx
- tailwind-merge
- lucide-react

Do NOT install @tanstack/react-query yet. We add that in a later step.
```

---

## STEP 2 — tsconfig paths

```
Update tsconfig.json to add these path aliases exactly as shown:

{
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./src/*"],
      "@/components/ui": ["./src/components/ui/index.ts"],
      "@/components/shared": ["./src/components/shared/index.ts"],
      "@/components/layout": ["./src/components/layout/index.ts"],
      "@/hooks": ["./src/hooks/index.ts"],
      "@/store": ["./src/store/index.ts"],
      "@/utils": ["./src/utils/index.ts"],
      "@/types": ["./src/types/index.ts"],
      "@/constants": ["./src/constants/index.ts"],
      "@/config/*": ["./src/config/*"],
      "@/providers": ["./src/providers/index.tsx"]
    }
  }
}

Also add an ESLint rule to enforce no relative imports going up more than 0 levels
(siblings with ./ are OK, ../ is forbidden outside the same feature folder).
```

---

## STEP 3 — Global Config Files

```
Create these files exactly:

1. src/config/env.ts
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  CI: process.env.CI || false,
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
};

2. src/config/fonts.ts
- Import Inter and a Persian font (use next/font/google)
- Export them as fontSans and fontDana

3. src/utils/cn.ts
- Create a cn() helper using clsx + tailwind-merge

4. src/utils/api.ts
- Create an axios instance using env.API_URL
- Add request interceptor that attaches Bearer token from localStorage

5. src/utils/index.ts
- Barrel: export * from './cn'; export * from './api'; export * from './format';

6. src/constants/routes.ts
- Export ROUTES object with all app routes as string constants

7. src/constants/query-keys.ts  
- Export QUERY_KEYS object for React Query (we'll use later)

8. src/constants/index.ts — barrel file
```

---

## STEP 4 — Global Types

```
Create these type files:

src/types/api.ts — common API response shapes:
- ApiResponse<T>
- PaginatedResponse<T>
- ApiError

src/types/common.ts — shared app types:
- ID = string
- Timestamp = string (ISO 8601)
- Theme = 'light' | 'dark'

src/types/index.ts — barrel: export type * from './api'; export type * from './common';
```

---

## STEP 5 — Tailwind v4 Theme

```
Replace src/app/globals.css with a full Tailwind v4 CSS-first config.
Use @theme inline block. Include ALL of these token groups:

Colors: primary (50–900), secondary (50–900), neutral (0, 50–900),
        success (50–900), info (50–900), warning (50–900), error (50–900)

Base values for each:
- primary-500: #fd6519
- secondary-500: #6366f1
- neutral-500: #6b7280
- success-500: #10B981
- info-500: #3B82F6
- warning-500: #F59E0B
- error-500: #EF4444
- neutral-0: #ffffff

Border radius: --radius-xxs through --radius-4xl
Fonts: --font-dana and --font-poppins pointing to CSS vars from Next.js fonts

Also add:
- :root CSS vars (same values, without --color- prefix for backward compat)
- .dark override for --background and --foreground
- @layer base with html and body defaults
```

---

## STEP 6 — UI Component: Button

```
Build the Button component in src/components/ui/button/.

Files to create:
- button/types.ts — ButtonBaseProps and ButtonProps interfaces (see design.md for props list)
- button/button.css — full CSS using @layer components with all variants from design.md
- button/button.tsx — the component (reference the existing button.tsx pattern in agents.md)
- button/index.ts — export * from './button'; export type * from './types';

Requirements:
- Use cva() for variant composition
- Support as='button' and as='link' (Next.js Link)
- isLoading shows spinner (lucide LoaderCircle) + optional loadingText
- startIcon / endIcon support
- All 4 variants × 6 colors × disabled states must be in CSS
- Full dark mode support
```

---

## STEP 7 — UI Components: Core Set

```
Build these UI components following the EXACT same pattern as Button.
Each gets its own folder with: types.ts, component.tsx, component.css, index.ts.

Build in this order:

1. Input — with label, hint, startIcon, endIcon, size (sm/md/lg), state (default/error/success)
2. Textarea — similar to Input but multiline, with resize control
3. Select — custom styled select, same size/state variants as Input  
4. Checkbox — with label, indeterminate state, size variants
5. Badge — color (all ColorVariant), size (sm/md/lg), dot variant
6. Avatar — src, fallback initials, size, status dot
7. Tooltip — content, position (top/right/bottom/left), delay
8. Skeleton — width/height/rounded variants for loading states
9. Modal — title, description, footer slot, size (sm/md/lg/xl), onClose
10. Dropdown — trigger slot, items array, position

After all are built, create:
- src/components/ui/types.d.ts with shared types (ColorVariant, SizeVariant, RadiusVariant, etc.)
- src/components/ui/index.ts that barrels all components and re-exports types.d.ts
```

---

## STEP 8 — Shared Components

```
Build these shared (molecule-level) components in src/components/shared/.
They use UI components internally and accept props — no feature-specific logic.

1. PageHeader
   Props: title, description?, breadcrumbs?, actions? (ReactNode)

2. DataTable
   Props: columns (header + accessor + cell renderer), data[], isLoading, emptyState

3. EmptyState
   Props: icon, title, description?, action? (ReactNode)

4. ConfirmDialog
   Props: isOpen, onClose, onConfirm, title, description, isLoading, confirmLabel, cancelLabel, confirmColor

5. SearchInput
   Props: value, onChange, placeholder, isLoading, onClear

6. ErrorBoundary
   Class component that catches errors and shows a fallback UI

Create src/components/shared/index.ts barrel.
```

---

## STEP 9 — Layout Components

```
Build layout shell components in src/components/layout/.

1. Sidebar
   - Collapsible (icon-only at 64px, full at 240px)
   - Navigation items from ROUTES constants
   - Active state based on current pathname (usePathname)
   - User avatar + name at bottom

2. Header
   - Height 64px
   - Left: hamburger menu (mobile) / page title
   - Right: theme toggle + notifications icon + user avatar dropdown

3. Footer (minimal, optional)
   - Copyright text

Create src/components/layout/index.ts barrel.
Create the dashboard layout at src/app/(dashboard)/layout.tsx
that composes Sidebar + Header + {children}.
```

---

## STEP 10 — Providers

```
Create these provider files:

1. src/providers/theme-provider.tsx
   - Manages light/dark theme
   - Persists to localStorage
   - Toggles .dark class on <html>
   - Exposes useTheme() hook

2. src/providers/query-provider.tsx
   - First install @tanstack/react-query
   - Wrap children with QueryClientProvider
   - Include ReactQueryDevtools in development

3. src/providers/index.tsx
   - Compose ThemeProvider > QueryProvider > children

4. Update src/app/layout.tsx
   - Import fonts from src/config/fonts.ts
   - Apply font CSS vars to <html>
   - Wrap everything in <Providers>
```

---

## STEP 11 — Auth Feature

```
Build the auth feature in src/features/auth/.

Structure:
auth/
├── api/auth.api.ts          # login, register, logout, refreshToken
├── components/
│   ├── login-page.tsx       # Full login page UI
│   ├── register-page.tsx    # Full register page UI  
│   ├── login-form.tsx       # Form using react-hook-form + zod
│   ├── register-form.tsx
│   └── index.ts
├── hooks/
│   ├── use-login.ts         # mutation hook wrapping auth API
│   ├── use-register.ts
│   └── index.ts
├── schema/
│   ├── login.schema.ts      # zod: email + password
│   ├── register.schema.ts   # zod: name + email + password + confirm
│   └── index.ts
├── store/
│   ├── auth-store.ts        # user, token, isAuthenticated, setUser, logout
│   └── index.ts
├── types/
│   ├── auth.types.ts        # User, LoginDto, RegisterDto, AuthResponse
│   └── index.ts
└── constants/
    └── index.ts

Pages to create:
- src/app/(auth)/login/page.tsx  → imports LoginPage
- src/app/(auth)/register/page.tsx → imports RegisterPage
- Create (auth)/layout.tsx with centered card layout

Requirements:
- Use react-hook-form with zodResolver
- On successful login, save token to auth-store + redirect to dashboard
- Show loading state on submit button
- Show field-level error messages
```

---

## STEP 12 — Tasks Feature

```
Build the tasks feature in src/features/tasks/.

Structure:
tasks/
├── api/tasks.api.ts         # getAll, getById, create, update, delete, updateStatus
├── components/
│   ├── tasks-page.tsx       # Main page: header + filters + list/board view
│   ├── task-list.tsx        # List of TaskCard components
│   ├── task-card.tsx        # Individual task card (see design.md spec)
│   ├── task-form.tsx        # Create/Edit form in a Modal
│   ├── task-filters.tsx     # Status, priority, project filter bar
│   ├── task-board.tsx       # Kanban board (todo/in-progress/done columns)
│   └── index.ts
├── hooks/
│   ├── use-tasks.ts         # useQuery for task list
│   ├── use-task.ts          # useQuery for single task
│   ├── use-create-task.ts   # useMutation
│   ├── use-update-task.ts   # useMutation
│   ├── use-delete-task.ts   # useMutation with confirm dialog
│   └── index.ts
├── schema/
│   ├── task.schema.ts       # createTaskSchema, updateTaskSchema
│   └── index.ts
├── store/
│   ├── tasks-store.ts       # filters state, view mode (list/board), selectedTask
│   └── index.ts
├── types/
│   ├── task.types.ts        # Task, CreateTaskDto, UpdateTaskDto, TaskFilter
│   └── index.ts
└── constants/
    ├── task.constants.ts    # PRIORITY_OPTIONS, STATUS_OPTIONS with labels and colors
    └── index.ts

Page: src/app/(dashboard)/tasks/page.tsx → imports TasksPage
```

---

## STEP 13 — Projects Feature

```
Build src/features/projects/ with the same structure as tasks.

Entities:
- Project: id, name, description, color, taskCount, createdAt

Components:
- ProjectsPage — grid of project cards + create button
- ProjectCard — name, color swatch, task count badge, actions menu
- ProjectForm — create/edit modal

API: getAll, getById, create, update, delete

Page: src/app/(dashboard)/projects/page.tsx → imports ProjectsPage
```

---

## STEP 14 — Dashboard (Home) Feature

```
Build src/features/dashboard/.

Components:
- DashboardPage — overview layout
- StatsCard — shows a number, label, trend arrow, color
- RecentTasks — last 5 tasks with status badges
- TasksByStatus — simple bar chart or visual counts (todo/in-progress/done)
- UpcomingDeadlines — tasks due in next 7 days

Stats to show:
- Total tasks
- Completed today
- In progress  
- Overdue

Page: src/app/(dashboard)/page.tsx → imports DashboardPage
```

---

## STEP 15 — Settings Feature

```
Build src/features/settings/.

Components:
- SettingsPage — tabbed layout
- ProfileTab — name, email, avatar upload
- AppearanceTab — theme toggle (light/dark), language selector
- NotificationsTab — toggle switches for notification types

Page: src/app/(dashboard)/settings/page.tsx → imports SettingsPage
```

---

## STEP 16 — Global Store

```
Create src/store/ui-store.ts:
- sidebarCollapsed: boolean + toggle
- activeModal: string | null + open/close helpers
- notification queue (for toast messages)

Create src/store/index.ts barrel.
```

---

## STEP 17 — Route Protection

```
Create src/middleware.ts:
- Check for auth token in cookies
- Redirect unauthenticated users to /login
- Redirect authenticated users away from /login and /register
- Protect all routes under (dashboard)
```

---

## STEP 18 — Final Polish

```
Final pass — check every file:

1. Verify every component folder has an index.ts barrel
2. Verify page.tsx files contain only one import and one JSX line
3. Verify no relative ../ imports exist outside sibling files
4. Add loading.tsx for each route in (dashboard) using Skeleton components
5. Add error.tsx for each route showing an error UI
6. Add not-found.tsx at app level
7. Ensure all components have dark mode variants
8. Run TypeScript: npx tsc --noEmit — fix all errors
9. Run the dev server and verify the app loads
```

---

## Quick Reference Prompts

### When adding a new UI component:
```
Add a new [ComponentName] component to src/components/ui/[component-name]/.
Follow the exact same pattern as the Button component:
- types.ts with Props interface extending appropriate HTML element
- component.css in @layer components with CVA classes
- component.tsx using cva() and cn()
- index.ts barrel

Add it to src/components/ui/index.ts.
Reference design.md for colors and sizing.
```

### When adding a new feature:
```
Add a new feature called [name] to src/features/[name]/.
Follow the structure in agents.md exactly:
api/, components/, hooks/, schema/, store/, types/, constants/
Each subfolder needs an index.ts barrel.
Create the page at src/app/(dashboard)/[name]/page.tsx 
importing [Name]Page from the feature.
```

### When fixing imports:
```
Audit all imports in src/. 
Fix any that use relative ../ paths — they must use @/ aliases instead.
The ONLY allowed relative imports are ./sibling within the same folder.
```