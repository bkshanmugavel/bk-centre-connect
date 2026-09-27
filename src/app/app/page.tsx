import { createClient } from '@/lib/supabase/server';

export default async function AppPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <section className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span
            style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-success)',
            }}
          />
          <h1 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--color-text)' }}>
            Foundation Active
          </h1>
        </div>

        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          You are signed in as <strong style={{ color: 'var(--color-text)' }}>{user?.email}</strong>.
        </p>

        <div
          style={{
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            fontSize: '0.85rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.6,
          }}
        >
          <div style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.375rem' }}>
            Next Step: Database Migrations
          </div>
          <div>
            The Next.js and Supabase authentication foundation is ready. Business modules (Centres, People, Courses, Attendance, Profiles) will be enabled incrementally via version-controlled Supabase migrations.
          </div>
        </div>
      </section>

      <section className="card">
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text)' }}>
          Multi-Centre Architecture Ready
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          Centre-level data isolation will be enforced via PostgreSQL Row Level Security (RLS) once tables and roles (<code>SUPER_ADMIN</code>, <code>CENTRE_USER</code>) are migrated.
        </p>
      </section>
    </div>
  );
}
