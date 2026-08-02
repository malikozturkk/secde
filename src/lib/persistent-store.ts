export interface PersistentStore<T> {
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  subscribe: (listener: () => void) => () => void;
  set: (updater: T | ((current: T) => T)) => void;
  reset: () => void;
}

export function createPersistentStore<T>(
  key: string,
  defaultValue: T,

  revive: (raw: unknown) => T | null
): PersistentStore<T> {
  let cache: T = defaultValue;
  let hydrated = false;
  const listeners = new Set<() => void>();

  const readStorage = (): T => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return defaultValue;
      return revive(JSON.parse(raw)) ?? defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const writeStorage = (value: T): void => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  };

  const emit = (): void => listeners.forEach((l) => l());

  return {
    getSnapshot: () => {
      if (!hydrated) {
        cache = readStorage();
        hydrated = true;
      }
      return cache;
    },
    getServerSnapshot: () => defaultValue,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    set: (updater) => {
      const current = typeof window === "undefined" ? defaultValue : cache;
      const next =
        typeof updater === "function"
          ? (updater as (c: T) => T)(current)
          : updater;
      if (Object.is(next, cache)) return;
      cache = next;
      hydrated = true;
      writeStorage(next);
      emit();
    },
    reset: () => {
      cache = defaultValue;
      hydrated = true;
      writeStorage(defaultValue);
      emit();
    },
  };
}
