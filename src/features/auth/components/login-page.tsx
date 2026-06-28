import Link from 'next/link';

import { ROUTES } from '@/constants';

import { LoginForm } from './login-form';

export function LoginPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Welcome back</h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Sign in to your account to continue
        </p>
      </div>
      <LoginForm />
      <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
        Don&apos;t have an account?{' '}
        <Link
          href={ROUTES.REGISTER}
          className="font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}