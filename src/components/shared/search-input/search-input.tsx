'use client';

import { Search, X, LoaderCircle } from 'lucide-react';

import { Input } from '@/components/ui';

import type { SearchInputProps } from './types';

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  isLoading = false,
  onClear,
}: SearchInputProps) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      startIcon={isLoading ? <LoaderCircle className="animate-spin" size={16} /> : <Search size={16} />}
      endIcon={
        value ? (
          <button
            onClick={() => {
              onChange('');
              onClear?.();
            }}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X size={14} />
          </button>
        ) : undefined
      }
    />
  );
}
