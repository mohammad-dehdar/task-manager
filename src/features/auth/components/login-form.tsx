'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components/ui';

import { useLogin } from '../hooks';
import { loginSchema, type LoginSchema } from '../schema';

export function LoginForm() {
  const loginMutation = useLogin();

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
    loginMutation.mutate(data);
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
