'use client';

import { Menu, Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Avatar, Dropdown } from '@/components/ui';
import { useAuthStore } from '@/features/auth/store';

import type { HeaderProps } from './types';
import './header.css';

export function Header({ onMenuClick, title }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    router.push('/login');
  };

  useEffect(() => setMounted(true), []);

  return (
    <header className="header">
      <div className="header-left hidden md:block">
        <button className="header-menu-btn" onClick={onMenuClick} aria-label="Toggle menu">
          <Menu size={20} />
        </button>
        {title && <h1 className="header-title">{title}</h1>}
      </div>

      <div className="header-right">
        <button
          className="header-icon-btn"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {mounted && theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="header-icon-btn header-notification-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="header-notification-dot" />
        </button>

        <Dropdown
          trigger={<Avatar size="sm" fallback={user?.name?.charAt(0) || 'U'} className="cursor-pointer" />}
          items={[
            { label: user?.email || '' },
            { label: 'Settings', onClick: () => router.push('/settings') },
            { label: 'Logout', onClick: handleLogout, destructive: true },
          ]}
          position="bottom-end"
        />
      </div>
    </header>
  );
}
