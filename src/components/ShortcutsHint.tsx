import { Keyboard } from 'lucide-react';
import styles from './ShortcutsHint.module.css';

type ShortcutsHintProps = {
  onOpen: () => void;
};

export default function ShortcutsHint({ onOpen }: ShortcutsHintProps) {
  return (
    <button className={styles.hint} onClick={onOpen} title="Keyboard shortcuts (?)">
      <Keyboard size={15} />
      <span>Shortcuts</span>
      <kbd className={styles.kbd}>?</kbd>
    </button>
  );
}
