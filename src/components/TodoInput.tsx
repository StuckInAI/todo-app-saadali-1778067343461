import { useState } from 'react';
import { Plus } from 'lucide-react';
import styles from './TodoInput.module.css';

type TodoInputProps = {
  onAdd: (text: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
};

export default function TodoInput({ onAdd, inputRef }: TodoInputProps) {
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
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="Add a new todo… (press N to focus)"
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
