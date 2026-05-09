import { useRef, useState, useCallback } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFilters from '@/components/TodoFilters';
import TodoStats from '@/components/TodoStats';
import ShortcutsHelp from '@/components/ShortcutsHelp';
import ShortcutsHint from '@/components/ShortcutsHint';
import styles from './TodoPage.module.css';

export default function TodoPage() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
    totalCount,
  } = useTodos();

  const [showShortcuts, setShowShortcuts] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleSetFilter = useCallback(setFilter, [setFilter]);
  const handleClearCompleted = useCallback(clearCompleted, [clearCompleted]);

  useKeyboardShortcuts({
    onFocusInput: focusInput,
    onClearCompleted: handleClearCompleted,
    onSetFilter: handleSetFilter,
    completedCount,
  });

  // Toggle shortcuts panel with "?"
  useState(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      const isEditing = tag === 'INPUT' || tag === 'TEXTAREA';
      if (e.key === '?' && !isEditing) {
        setShowShortcuts((v) => !v);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logoWrap}>
            <span className={styles.logoIcon}>✓</span>
          </div>
          <h1 className={styles.title}>My Todos</h1>
          <p className={styles.subtitle}>Stay organised, get things done.</p>
          <div className={styles.hintRow}>
            <ShortcutsHint onOpen={() => setShowShortcuts(true)} />
          </div>
        </header>

        <TodoStats
          total={totalCount}
          active={activeCount}
          completed={completedCount}
        />

        <main className={styles.main}>
          <TodoInput onAdd={addTodo} inputRef={inputRef} />
          <TodoFilters filter={filter} onFilterChange={setFilter} />
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
          {completedCount > 0 && (
            <button className={styles.clearBtn} onClick={clearCompleted}>
              Clear {completedCount} completed
            </button>
          )}
        </main>
      </div>

      {showShortcuts && (
        <ShortcutsHelp onClose={() => setShowShortcuts(false)} />
      )}
    </div>
  );
}
