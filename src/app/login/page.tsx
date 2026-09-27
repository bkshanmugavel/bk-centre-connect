import type { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Sign In | BK Centre Connect',
  description: 'Sign in to BK Centre Connect portal',
};

interface LoginPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedParams = await searchParams;
  const redirectedFrom = typeof resolvedParams.redirectedFrom === 'string'
    ? resolvedParams.redirectedFrom
    : undefined;
  const errorParam = typeof resolvedParams.error === 'string'
    ? resolvedParams.error
    : undefined;

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div className="card container-narrow">
        <header style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--color-text)' }}>
            BK Centre Connect
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            Sign in with your individual account
          </p>
        </header>

        {errorParam === 'auth_callback_failed' && (
          <div className="alert alert-error" role="alert">
            Authentication link invalid or expired. Please sign in with your password.
          </div>
        )}

        <LoginForm redirectedFrom={redirectedFrom} />

        <footer style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          Access restricted to authorized centre users and administrators.
        </footer>
      </div>
    </main>
  );
}
