import { useMemo } from 'react';
import { useLiveData } from '@/lib/useLiveData';
import { watchStaff } from './api';

/** Live staff list plus quick lookups (doctors only, name by uid). */
export function useStaff() {
  const { data = [], loading, error } = useLiveData(watchStaff, []);
  return useMemo(
    () => ({
      staff: data,
      doctors: data.filter((member) => member.role === 'doctor'),
      nameOf: (uid: string) => data.find((member) => member.uid === uid)?.name ?? '—',
      loading,
      error,
    }),
    [data, loading, error],
  );
}
