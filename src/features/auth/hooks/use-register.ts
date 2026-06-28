'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { ROUTES } from '@/constants';

import { authApi } from '../api';
import { useAuthStore } from '../store';
import type { RegisterDto } from '../types';

export function useRegister() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: (dto: RegisterDto) => authApi.register(dto),
    onSuccess: (data) => {
      login(data.user, data.token);
      localStorage.setItem('token', data.token);
      router.push(ROUTES.DASHBOARD);
    },
  });
}
