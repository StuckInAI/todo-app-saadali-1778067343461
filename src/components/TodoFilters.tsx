import clsx from 'clsx';
import type { FilterType } from '@/types';
import styles from './TodoFilters.module.css';

type TodoFiltersProps = {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
};

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function TodoFilters({ filter, onFilterChange }: TodoFiltersProps) {
  return (
    <div className={styles.filters}>
      {FILTERS.map((f) => (
        <button
          key={f.value}
          className={clsx(styles.filterBtn, filter === f.value && styles.active)}
          onClick={() => onFilterChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
