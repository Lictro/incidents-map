import styles from "./IssueTypes.module.scss";

interface Props {
  incidents: any[];
}

export default function IssueTypes({ incidents }: Props) {
  const counts: Record<string, number> = {};

  incidents.forEach((incident) => {
    const type = incident.type?.name ?? "Unknown";
    counts[type] = (counts[type] || 0) + 1;
  });

  return (
    <div className={`${styles.card} surface-card`}>
      <div className={styles.header}>
        <h3>Issue Types</h3>
        <p className={styles.subtitle}>Reported categories of site issues.</p>
      </div>
      {Object.entries(counts).length === 0 ? (
        <div className={styles.emptyState}>No issue types available.</div>
      ) : (
        <div className={styles.list}>
          {Object.entries(counts).map(([type, count]) => (
            <div key={type} className={styles.row}>
              <span>{type}</span>
              <strong>{count}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
