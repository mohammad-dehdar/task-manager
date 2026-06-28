'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Select } from '@/components/ui';

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'fa', label: 'Persian (Farsi)' },
];

const THEME_OPTIONS = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'system', label: 'System' },
] as const;

export function AppearanceTab() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-1">Theme</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">Select your preferred theme</p>
        <div className="flex gap-3">
          {THEME_OPTIONS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                mounted && theme === t.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                  : 'border-neutral-200 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-500'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-1">Language</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">Select your preferred language</p>
        <Select
          options={LANGUAGE_OPTIONS}
          defaultValue="en"
        />
      </div>
    </div>
  );
}