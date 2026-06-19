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
    <div className={styles.card}>
      <span>{title}</span>

      <h2>{value}</h2>
    </div>
  );
}