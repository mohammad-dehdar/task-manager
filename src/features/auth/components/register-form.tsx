'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@/components/ui';

import { useRegister } from '../hooks';
import { registerSchema, type RegisterSchema } from '../schema';

export function RegisterForm() {
  const registerMutation = useRegister();

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
    const { confirmPassword: _, ...dto } = data;
    registerMutation.mutate(dto);
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
