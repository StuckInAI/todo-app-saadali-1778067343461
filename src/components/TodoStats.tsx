import styles from './TodoStats.module.css';

type TodoStatsProps = {
  total: number;
  active: number;
  completed: number;
};

export default function TodoStats({ total, active, completed }: TodoStatsProps) {
  return (
    <div className={styles.stats}>
      <div className={styles.stat}>
        <span className={styles.statValue}>{total}</span>
        <span className={styles.statLabel}>Total</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.stat}>
        <span className={styles.statValue + ' ' + styles.activeValue}>{active}</span>
        <span className={styles.statLabel}>Active</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.stat}>
        <span className={styles.statValue + ' ' + styles.completedValue}>{completed}</span>
        <span className={styles.statLabel}>Done</span>
      </div>
    </div>
  );
}
