import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { FirebaseError } from 'firebase/app';
import { SignIn, VideoCamera } from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';
import { FormError, TextField } from '@/components/ui/Field';
import { useAuth } from './AuthProvider';

const errorMessages: Record<string, string> = {
  'auth/invalid-credential': 'El correo o la contraseña no son correctos.',
  'auth/invalid-email': 'Escribe un correo válido.',
  'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos y vuelve a intentarlo.',
  'auth/network-request-failed': 'No hay conexión. Revisa tu internet.',
};

export function LoginPage() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const redirectTo = (location.state as { from?: string } | null)?.from ?? '/consultorio';

  if (user) return <Navigate to={redirectTo} replace />;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError(null);
    setSubmitting(true);
    try {
      await signIn(String(form.get('email')), String(form.get('password')));
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const code = err instanceof FirebaseError ? err.code : '';
      setError(errorMessages[code] ?? 'No se pudo iniciar sesión. Inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-dvh lg:grid-cols-2">
      <section className="relative isolate flex flex-col justify-between gap-10 overflow-hidden bg-blush p-8 sm:p-12 max-lg:hidden">
        <div className="flex items-center gap-2.5">
          <img src="/logo-mark.svg" alt="" className="h-[45px] w-[43px]" />
          <span className="flex flex-col gap-1.5 leading-none">
            <span className="text-[19px] font-semibold text-ink">Dr. Flavio Sattui</span>
            <span className="text-xs tracking-[0.03em] text-gold-muted">Atención Médica Especializada</span>
          </span>
        </div>
        <div className="flex max-w-md flex-col gap-4">
          <p className="flex items-center gap-2.5 text-body-1 font-medium text-primary-soft">
            <VideoCamera size={20} />
            Panel de gestión
          </p>
          <h1 className="text-title-1 font-semibold text-fg-1">
            Tus pacientes, tu agenda y tus <span className="text-gold">teleconsultas</span> en un solo lugar.
          </h1>
        </div>
        <p className="text-caption-1 text-fg-4">Acceso exclusivo para el equipo médico.</p>
      </section>

      <section className="flex items-center justify-center p-6 sm:p-12">
        <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-5">
          <img src="/logo-mark.svg" alt="" className="h-[45px] w-[43px] lg:hidden" />
          <div className="flex flex-col gap-2">
            <h2 className="text-title-2 font-semibold text-fg-1">Iniciar sesión</h2>
            <p className="text-caption-1 text-fg-4">Ingresa con el correo que te dio el administrador.</p>
          </div>
          <TextField label="Correo" name="email" type="email" autoComplete="email" required />
          <TextField label="Contraseña" name="password" type="password" autoComplete="current-password" required />
          <FormError message={error} />
          <Button type="submit" icon={SignIn} disabled={submitting}>
            {submitting ? 'Ingresando…' : 'Ingresar'}
          </Button>
        </form>
      </section>
    </main>
  );
}
