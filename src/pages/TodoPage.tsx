import { useTodos } from '@/hooks/useTodos';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFilters from '@/components/TodoFilters';
import TodoStats from '@/components/TodoStats';
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

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logoWrap}>
            <span className={styles.logoIcon}>✓</span>
          </div>
          <h1 className={styles.title}>My Todos</h1>
          <p className={styles.subtitle}>Stay organised, get things done.</p>
        </header>

        <TodoStats
          total={totalCount}
          active={activeCount}
          completed={completedCount}
        />

        <main className={styles.main}>
          <TodoInput onAdd={addTodo} />
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
    </div>
  );
}
