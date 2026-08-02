import { create } from 'zustand';

export type ToastTone = 'info' | 'success' | 'warning' | 'error';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
  /** ms; 0 = no auto-dismiss. */
  duration: number;
}

export interface ToastInput {
  title: string;
  description?: string;
  tone?: ToastTone;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
  push: (t: ToastInput) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}

let seq = 0;
const nextId = () => `t_${Date.now().toString(36)}_${(seq++).toString(36)}`;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (t) => {
    const id = nextId();
    const toast: Toast = {
      id,
      title: t.title,
      description: t.description,
      tone: t.tone ?? 'info',
      duration: t.duration ?? 4500,
    };
    set((s) => ({ toasts: [...s.toasts, toast] }));
    return id;
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) })),
  clear: () => set({ toasts: [] }),
}));

/** API imperativa (fuera de React) + azúcar por tono. */
export const toast = {
  show: (t: ToastInput) => useToastStore.getState().push(t),
  info: (title: string, description?: string) => useToastStore.getState().push({ title, description, tone: 'info' }),
  success: (title: string, description?: string) => useToastStore.getState().push({ title, description, tone: 'success' }),
  warning: (title: string, description?: string) => useToastStore.getState().push({ title, description, tone: 'warning' }),
  error: (title: string, description?: string) => useToastStore.getState().push({ title, description, tone: 'error' }),
  dismiss: (id: string) => useToastStore.getState().dismiss(id),
};
