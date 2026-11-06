// Layout of variant 3: icon rail on the left (top bar on phones) and the current page beside it.
import { NavLink, Outlet } from 'react-router';
import { CalendarBlank, IdentificationBadge, SignOut, Users, VideoCamera, type Icon } from '@phosphor-icons/react';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth, useProfile } from '@/features/auth/AuthProvider';

interface NavItem {
  to: string;
  label: string;
  icon: Icon;
  adminOnly?: boolean;
}

const nav: NavItem[] = [
  { to: '/consultorio', label: 'Consultorio', icon: VideoCamera },
  { to: '/agenda', label: 'Agenda', icon: CalendarBlank },
  { to: '/pacientes', label: 'Pacientes', icon: Users },
  { to: '/equipo', label: 'Equipo', icon: IdentificationBadge, adminOnly: true },
];

export function AppShell() {
  const profile = useProfile();
  const { signOut } = useAuth();

  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <aside className="z-20 flex shrink-0 items-center gap-3 border-b border-stroke bg-surface px-3 py-2 lg:sticky lg:top-0 lg:h-dvh lg:w-24 lg:flex-col lg:gap-4 lg:border-r lg:border-b-0 lg:px-2 lg:py-6">
        <img src="/logo-mark.svg" alt="Dr. Flavio Sattui" className="h-10 w-[38px] shrink-0 lg:h-11 lg:w-[43px]" />

        <nav className="flex flex-1 gap-1 overflow-x-auto [scrollbar-width:none] lg:w-full lg:flex-col lg:gap-2" aria-label="Menú principal">
          {nav
            .filter((item) => !item.adminOnly || profile.role === 'admin')
            .map(({ to, label, icon: IconComponent }) => (
              <NavLink
                key={to}
                to={to}
                className="flex shrink-0 flex-col items-center gap-1 rounded-xl px-3 py-2 text-[11px] font-medium text-fg-4 transition-colors hover:text-primary aria-[current=page]:bg-primary-tint aria-[current=page]:text-primary"
              >
                <IconComponent size={24} />
                {label}
              </NavLink>
            ))}
        </nav>

        <div className="flex items-center gap-1 lg:flex-col lg:gap-2">
          <span title={`${profile.name} · ${profile.role === 'admin' ? 'Administrador' : 'Médico'}`}>
            <Avatar name={profile.name} specialty={profile.specialty} size="sm" />
          </span>
          <button type="button" onClick={signOut} aria-label="Cerrar sesión" title="Cerrar sesión" className="grid size-9 place-items-center rounded-full text-fg-4 hover:bg-surface-muted hover:text-primary">
            <SignOut size={20} />
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
