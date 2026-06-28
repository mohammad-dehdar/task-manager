'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components/ui';
import { ROUTES } from '@/constants';

import { authApi } from '../api';
import { useAuthStore } from '../store';
import { registerSchema, type RegisterSchema } from '../schema';

export function RegisterForm() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const registerMutation = useMutation({
    mutationFn: (dto: RegisterSchema) => authApi.register({ name: dto.name, email: dto.email, password: dto.password }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterSchema) => {
    registerMutation.mutate(data, {
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
        label="Name"
        placeholder="Your name"
        state={errors.name ? 'error' : 'default'}
        hint={errors.name?.message}
        {...register('name')}
      />
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
      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        state={errors.confirmPassword ? 'error' : 'default'}
        hint={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Button
        type="submit"
        variant="fill"
        color="primary"
        fullWidth
        isLoading={registerMutation.isPending}
      >
        Create Account
      </Button>
      {registerMutation.isError && (
        <p className="text-sm text-error-500 text-center">
          {registerMutation.error.message || 'Registration failed. Please try again.'}
        </p>
      )}
    </form>
  );
}
