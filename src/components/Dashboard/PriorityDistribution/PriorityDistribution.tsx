import styles from "./PriorityDistribution.module.scss";

interface Props {
  incidents: any[];
}

export default function PriorityDistribution({
  incidents,
}: Props) {
  const high = incidents.filter((i) => i.priority === "high").length;
  const medium = incidents.filter((i) => i.priority === "medium").length;
  const low = incidents.filter((i) => i.priority === "low").length;

  return (
    <div className={`${styles.card} surface-card`}>
      <div className={styles.header}>
        <h3>Priority Distribution</h3>
        <p className={styles.subtitle}>Severity split across active incidents.</p>
      </div>
      <div className={styles.metric}>
        <span>High</span>
        <strong>{high}</strong>
      </div>
      <div className={styles.metric}>
        <span>Medium</span>
        <strong>{medium}</strong>
      </div>
      <div className={styles.metric}>
        <span>Low</span>
        <strong>{low}</strong>
      </div>
    </div>
  );
}
