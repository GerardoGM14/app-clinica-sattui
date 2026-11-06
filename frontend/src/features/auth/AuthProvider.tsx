// Session state: the Firebase user plus their staff profile (users/{uid}), which carries the role.
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { StaffProfile } from '@/types';

interface AuthState {
  user: User | null;
  /** null when signed in without a staff profile (no access to the panel). */
  profile: StaffProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<unknown>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StaffProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => onAuthStateChanged(auth, (next) => {
    setUser(next);
    if (!next) {
      setProfile(null);
      setLoading(false);
    }
  }), []);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    return onSnapshot(
      doc(db, 'users', user.uid),
      (snap) => {
        setProfile(snap.exists() ? { ...(snap.data() as Omit<StaffProfile, 'uid'>), uid: snap.id } : null);
        setLoading(false);
      },
      () => {
        setProfile(null);
        setLoading(false);
      },
    );
  }, [user]);

  const value: AuthState = {
    user,
    profile,
    loading,
    signIn: (email, password) => signInWithEmailAndPassword(auth, email, password),
    signOut: () => signOut(auth),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>');
  return context;
}

/** Signed-in staff profile; only call it inside routes guarded by <RequireAuth>. */
export function useProfile() {
  const { profile } = useAuth();
  if (!profile) throw new Error('useProfile needs a signed-in staff member');
  return profile;
}

/** Doctors only see their own patients and appointments; admins see everyone's (undefined = no filter). */
export function useDoctorScope() {
  const profile = useProfile();
  return profile.role === 'doctor' ? profile.uid : undefined;
}
