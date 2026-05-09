import { useEffect } from 'react';
import type { FilterType } from '@/types';

type UseKeyboardShortcutsOptions = {
  onFocusInput: () => void;
  onClearCompleted: () => void;
  onSetFilter: (f: FilterType) => void;
  completedCount: number;
};

export function useKeyboardShortcuts({
  onFocusInput,
  onClearCompleted,
  onSetFilter,
  completedCount,
}: UseKeyboardShortcutsOptions) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      const isEditing = tag === 'INPUT' || tag === 'TEXTAREA';

      // N — focus input (works even when not editing)
      if (e.key === 'n' && !isEditing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        onFocusInput();
        return;
      }

      // Escape — blur any focused input
      if (e.key === 'Escape' && isEditing) {
        (e.target as HTMLElement).blur();
        return;
      }

      // Skip the rest when typing
      if (isEditing) return;

      // 1 — All filter
      if (e.key === '1') {
        onSetFilter('all');
        return;
      }

      // 2 — Active filter
      if (e.key === '2') {
        onSetFilter('active');
        return;
      }

      // 3 — Completed filter
      if (e.key === '3') {
        onSetFilter('completed');
        return;
      }

      // X — Clear completed
      if (e.key === 'x' && completedCount > 0) {
        onClearCompleted();
        return;
      }

      // ? — Toggle shortcuts help (handled by component)
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onFocusInput, onClearCompleted, onSetFilter, completedCount]);
}
