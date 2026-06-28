import type { TaskPriority, TaskStatus } from '../types';

export interface Option {
  value: string;
  label: string;
  color: string;
}

export const STATUS_OPTIONS: Option[] = [
  { value: 'todo', label: 'To Do', color: 'neutral' },
  { value: 'in-progress', label: 'In Progress', color: 'info' },
  { value: 'done', label: 'Done', color: 'success' },
];

export const PRIORITY_OPTIONS: Option[] = [
  { value: 'low', label: 'Low', color: 'success' },
  { value: 'medium', label: 'Medium', color: 'warning' },
  { value: 'high', label: 'High', color: 'error' },
];

export const STATUS_MAP: Record<TaskStatus, string> = {
  'todo': 'neutral',
  'in-progress': 'info',
  'done': 'success',
};

export const PRIORITY_MAP: Record<TaskPriority, string> = {
  low: 'success',
  medium: 'warning',
  high: 'error',
};
