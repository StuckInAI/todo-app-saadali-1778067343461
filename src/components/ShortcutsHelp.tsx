import { useEffect } from 'react';
import { X, Keyboard } from 'lucide-react';
import styles from './ShortcutsHelp.module.css';

type ShortcutsHelpProps = {
  onClose: () => void;
};

const SHORTCUTS = [
  { keys: ['N'], description: 'Focus the new todo input' },
  { keys: ['Enter'], description: 'Submit / confirm todo' },
  { keys: ['Esc'], description: 'Cancel editing / blur input' },
  { keys: ['1'], description: 'Show All todos' },
  { keys: ['2'], description: 'Show Active todos' },
  { keys: ['3'], description: 'Show Completed todos' },
  { keys: ['X'], description: 'Clear all completed todos' },
  { keys: ['?'], description: 'Toggle this shortcuts panel' },
];

export default function ShortcutsHelp({ onClose }: ShortcutsHelpProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>
            <Keyboard size={18} />
            Keyboard Shortcuts
          </span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close shortcuts">
            <X size={18} />
          </button>
        </div>
        <ul className={styles.list}>
          {SHORTCUTS.map((s) => (
            <li key={s.description} className={styles.row}>
              <span className={styles.keys}>
                {s.keys.map((k) => (
                  <kbd key={k} className={styles.kbd}>{k}</kbd>
                ))}
              </span>
              <span className={styles.desc}>{s.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
