'use client';

import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Avatar } from '@/components/ui';
import { useAuthStore } from '@/features/auth/store';
import { ROUTES } from '@/constants';
import { cn } from '@/utils';

import type { SidebarProps } from './types';
import './sidebar.css';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: ROUTES.DASHBOARD },
  { label: 'Tasks', icon: CheckSquare, href: ROUTES.TASKS },
  { label: 'Projects', icon: FolderKanban, href: ROUTES.PROJECTS },
  { label: 'Settings', icon: Settings, href: ROUTES.SETTINGS },
];

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);

  return (
    <aside className={cn('sidebar', collapsed && 'sidebar-collapsed')}>
      <div className="sidebar-header">
        {!collapsed && (
          <span className="sidebar-logo">Task Manager</span>
        )}
        <button className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn('sidebar-item', isActive && 'sidebar-item-active')}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <Avatar
          size="sm"
          fallback={user?.name?.charAt(0)?.toUpperCase() || 'U'}
          src={user?.avatar}
        />
        {!collapsed && (
          <div className="sidebar-user">
            <span className="sidebar-user-name">{user?.name || 'User'}</span>
            <span className="sidebar-user-email">{user?.email || ''}</span>
          </div>
        )}
      </div>
    </aside>
  );
}