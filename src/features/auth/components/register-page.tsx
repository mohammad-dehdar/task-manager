import Link from 'next/link';

import { ROUTES } from '@/constants';

import { RegisterForm } from './register-form';

export function RegisterPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Create an account</h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Enter your details to get started
        </p>
      </div>
      <RegisterForm />
      <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
        Already have an account?{' '}
        <Link
          href={ROUTES.LOGIN}
          className="font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}