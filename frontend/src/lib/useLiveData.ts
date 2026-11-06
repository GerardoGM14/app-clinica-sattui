// Subscribes to a live Firestore source (see the watch* functions in src/features/*/api.ts)
// and re-subscribes whenever `deps` change. Pass `null` to skip the subscription.
import { useEffect, useState } from 'react';
import type { Unsubscribe } from 'firebase/firestore';

export type Watcher<T> = (onData: (data: T) => void, onError: (error: Error) => void) => Unsubscribe;

export function useLiveData<T>(watch: Watcher<T> | null, deps: unknown[]) {
  const [state, setState] = useState<{ data: T | undefined; loading: boolean; error: Error | null }>({
    data: undefined,
    loading: watch !== null,
    error: null,
  });

  useEffect(() => {
    if (!watch) {
      setState({ data: undefined, loading: false, error: null });
      return;
    }
    setState((prev) => ({ ...prev, loading: true, error: null }));
    return watch(
      (data) => setState({ data, loading: false, error: null }),
      (error) => {
        console.error(error);
        setState({ data: undefined, loading: false, error });
      },
    );
  }, deps);

  return state;
}
