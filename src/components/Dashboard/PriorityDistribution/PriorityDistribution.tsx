import styles from "./PriorityDistribution.module.scss";

interface Props {
  incidents: any[];
}

export default function PriorityDistribution({
  incidents,
}: Props) {
  const high = incidents.filter(
    (i) => i.priority === "high"
  ).length;

  const medium = incidents.filter(
    (i) => i.priority === "medium"
  ).length;

  const low = incidents.filter(
    (i) => i.priority === "low"
  ).length;

  return (
    <div className={styles.card}>
      <h3>Priority Distribution</h3>

      <div>High: {high}</div>
      <div>Medium: {medium}</div>
      <div>Low: {low}</div>
    </div>
  );
}