import { useState } from 'react';
import { Plus } from 'lucide-react';
import styles from './TodoInput.module.css';

type TodoInputProps = {
  onAdd: (text: string) => void;
};

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value);
      setValue('');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Add a new todo…"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        autoFocus
      />
      <button
        className={styles.addBtn}
        type="submit"
        disabled={!value.trim()}
        aria-label="Add todo"
      >
        <Plus size={20} />
      </button>
    </form>
  );
}
