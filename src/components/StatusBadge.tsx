import type { ProjectStatus } from '../data/types';
import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  status: ProjectStatus;
  label: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const isLive = status === 'production' || status === 'operational-infra';
  const isProgress = status === 'in-development' || status === 'staging';

  const variantClass = isLive
    ? styles.production
    : isProgress
      ? styles.progress
      : styles.completed;

  return (
    <span className={`${styles.badge} ${variantClass}`}>
      <span className={styles.dot} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

