'use client';

import { useState, useTransition } from 'react';
import { loginAction } from './actions';

interface LoginFormProps {
  redirectedFrom?: string;
}

export default function LoginForm({ redirectedFrom }: LoginFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      try {
        const result = await loginAction(null, formData);
        if (result?.error) {
          setErrorMessage(result.error);
        }
      } catch (err: unknown) {
        // Next.js redirect throws a NEXT_REDIRECT error which should not be caught as an error
        if (err instanceof Error && err.message.includes('NEXT_REDIRECT')) {
          return;
        }
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {redirectedFrom && (
        <input type="hidden" name="redirectedFrom" value={redirectedFrom} />
      )}

      {errorMessage && (
        <div className="alert alert-error" role="alert">
          {errorMessage}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.375rem' }}
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="user@centre.org"
          disabled={isPending}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.375rem' }}
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          disabled={isPending}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isPending}
        style={{ marginTop: '0.5rem', width: '100%' }}
      >
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
