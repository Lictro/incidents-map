import styles from "./StatCard.module.scss";

interface Props {
  title: string;
  value: string | number;
}

export default function StatCard({
  title,
  value,
}: Props) {
  return (
    <div className={`${styles.card} surface-card`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}
