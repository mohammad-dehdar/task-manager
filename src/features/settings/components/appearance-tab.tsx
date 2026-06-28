'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Select } from '@/components/ui';

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'fa', label: 'Persian (Farsi)' },
];

export function AppearanceTab() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold text-neutral-800 mb-1">Theme</h3>
        <p className="text-xs text-neutral-500 mb-3">Select your preferred theme</p>
        <div className="flex gap-3">
          {['light', 'dark', 'system'].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                mounted && theme === t
                  ? 'border-primary-500 bg-primary-50 text-primary-600'
                  : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-neutral-800 mb-1">Language</h3>
        <p className="text-xs text-neutral-500 mb-3">Select your preferred language</p>
        <Select
          options={LANGUAGE_OPTIONS}
          defaultValue="en"
        />
      </div>
    </div>
  );
}
