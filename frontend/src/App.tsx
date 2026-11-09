import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { AuthProvider } from '@/features/auth/AuthProvider';
import { RequireAuth, RequireAdmin } from '@/features/auth/RequireAuth';
import { LoginPage } from '@/features/auth/LoginPage';
import { AppShell } from '@/components/layout/AppShell';
import { Spinner } from '@/components/ui/Feedback';

// Each screen is downloaded only when it is opened.
const ConsultorioPage = lazy(() => import('@/features/consultorio/ConsultorioPage').then((m) => ({ default: m.ConsultorioPage })));
const AgendaPage = lazy(() => import('@/features/appointments/AgendaPage').then((m) => ({ default: m.AgendaPage })));
const PatientsPage = lazy(() => import('@/features/patients/PatientsPage').then((m) => ({ default: m.PatientsPage })));
const StaffPage = lazy(() => import('@/features/staff/StaffPage').then((m) => ({ default: m.StaffPage })));

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              element={
                <RequireAuth>
                  <AppShell />
                </RequireAuth>
              }
            >
              <Route index element={<Navigate to="/consultorio" replace />} />
              <Route path="consultorio" element={<ConsultorioPage />} />
              <Route path="agenda" element={<AgendaPage />} />
              <Route path="pacientes" element={<PatientsPage />} />
              <Route
                path="equipo"
                element={
                  <RequireAdmin>
                    <StaffPage />
                  </RequireAdmin>
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/consultorio" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
