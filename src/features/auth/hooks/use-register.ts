'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { ROUTES } from '@/constants';

import { authApi } from '../api';
import { useAuthStore } from '../store';
import type { RegisterDto } from '../types';

export function useRegister() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const mutation = useMutation({
    mutationFn: (dto: RegisterDto) => authApi.register(dto),
  });

  useEffect(() => {
    if (mutation.isSuccess && mutation.data) {
      login(mutation.data.user, mutation.data.token);
      localStorage.setItem('token', mutation.data.token);
      router.push(ROUTES.DASHBOARD);
    }
  }, [mutation.isSuccess, mutation.data, login, router]);

  return mutation;
}
