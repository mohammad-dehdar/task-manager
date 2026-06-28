'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components/ui';
import { ROUTES } from '@/constants';

import { authApi } from '../api';
import { useAuthStore } from '../store';
import { loginSchema, type LoginSchema } from '../schema';

export function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const loginMutation = useMutation({
    mutationFn: (dto: LoginSchema) => authApi.login(dto),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginSchema) => {
    loginMutation.mutate(data, {
      onSuccess: (responseData) => {
        login(responseData.user, responseData.token);
        localStorage.setItem('token', responseData.token);
        router.push(ROUTES.DASHBOARD);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        state={errors.email ? 'error' : 'default'}
        hint={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        state={errors.password ? 'error' : 'default'}
        hint={errors.password?.message}
        {...register('password')}
      />
      <Button
        type="submit"
        variant="fill"
        color="primary"
        fullWidth
        isLoading={loginMutation.isPending}
      >
        Sign In
      </Button>
      {loginMutation.isError && (
        <p className="text-sm text-error-500 text-center">
          {loginMutation.error.message || 'Login failed. Please try again.'}
        </p>
      )}
    </form>
  );
}
