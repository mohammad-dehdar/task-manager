'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { ROUTES } from '@/constants';

import { authApi } from '../api';
import { useAuthStore } from '../store';
import type { LoginDto } from '../types';

export function useLogin() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: (dto: LoginDto) => authApi.login(dto),
    onSuccess: (data) => {
      login(data.user, data.token);
      localStorage.setItem('token', data.token);
      router.push(ROUTES.DASHBOARD);
    },
  });
}
