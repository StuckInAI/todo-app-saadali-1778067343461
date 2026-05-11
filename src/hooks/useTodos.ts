import { useState, useEffect } from 'react';
import type { Todo, FilterType } from '@/types';

const STORAGE_KEY = 'todo-app-todos';
const DEFAULT_TODOS: Omit<Todo, 'id'>[] = [
  { text: 'Welcome to your Todo App! 🎉', completed: false, createdAt: Date.now() - 4000 },
  { text: 'Try pressing ? to see keyboard shortcuts', completed: false, createdAt: Date.now() - 3000 },
  { text: 'Click a todo to mark it as complete', completed: true, createdAt: Date.now() - 2000 },
  { text: 'Use filters to view active or completed todos', completed: false, createdAt: Date.now() - 1000 },
];

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_TODOS.map(todo => ({
        ...todo,
        id: generateId(),
      }));
    }
    return JSON.parse(raw) as Todo[];
  } catch {
    return DEFAULT_TODOS.map(todo => ({
      ...todo,
      id: generateId(),
    }));
  }
}

function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  function addTodo(text: string): void {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      { id: generateId(), text: trimmed, completed: false, createdAt: Date.now() },
      ...prev,
    ]);
  }

  function toggleTodo(id: string): void {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id: string): void {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(id: string, text: string): void {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t))
    );
  }

  function clearCompleted(): void {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
    totalCount: todos.length,
  };
}
