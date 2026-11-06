import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { LockSimple } from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';
import { EmptyState, Spinner } from '@/components/ui/Feedback';
import { useAuth } from './AuthProvider';

/** Only signed-in staff (users/{uid} exists) get past this guard. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, profile, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  if (!profile) {
    return (
      <main className="grid min-h-dvh place-items-center p-4">
        <EmptyState icon={LockSimple} title="Tu cuenta no tiene acceso al panel">
          <p>Pide al administrador que te registre como parte del equipo.</p>
          <Button size="sm" variant="outline" className="mt-4" onClick={signOut}>
            Cerrar sesión
          </Button>
        </EmptyState>
      </main>
    );
  }
  return children;
}

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { profile } = useAuth();
  return profile?.role === 'admin' ? children : <Navigate to="/consultorio" replace />;
}
