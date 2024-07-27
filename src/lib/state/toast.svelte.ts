// Toast state

import { getContext, onDestroy, setContext } from 'svelte';

export type Toast = {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
};

// Toast without id
export type PartialToast = Pick<Toast, 'title' | 'message' | 'type'>;

class ToastState {
  toasts: Toast[] = $state([]);
  timeoutsMap: Map<string, number> = new Map();

  constructor() {
    setContext('toast', this);

    onDestroy(() => {
      this.toasts = [];
      this.clearTimeout();
    });
  }

  add(toast: PartialToast, duration = 5000) {
    const id = crypto.randomUUID();

    this.toasts.push({
      ...toast,
      id,
    });

    this.setTimeout(id, duration);
  }

  setTimeout(id: string, duration: number) {
    this.timeoutsMap.set(
      id,
      setTimeout(() => this.remove(id), duration)
    );
  }

  /**
   * Clears the timeout for a specific ID, or clears all timeouts if no ID is provided.
   *
   * @param id - The ID of the timeout to clear. If not provided, all timeouts will be cleared.
   */
  clearTimeout(id?: string) {
    if (!id) {
      // Clear all timeouts
      this.timeoutsMap.forEach((timeout) => {
        clearTimeout(timeout);
      });
      return this.timeoutsMap.clear();
    }
    const timeout = this.timeoutsMap.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.timeoutsMap.delete(id);
    }
  }

  remove(id: string) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.clearTimeout(id);
  }
}

const TOAST_KEY = Symbol('TOAST_CTX');

export function setToastState() {
  return setContext(TOAST_KEY, new ToastState());
}

export function getToastState() {
  return getContext<ReturnType<typeof setToastState>>(TOAST_KEY);
}
