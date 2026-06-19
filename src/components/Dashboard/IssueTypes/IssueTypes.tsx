import styles from "./IssueTypes.module.scss";

interface Props {
  incidents: any[];
}

export default function IssueTypes({
  incidents,
}: Props) {
  const counts: Record<string, number> = {};

  incidents.forEach((incident) => {
    const type =
      incident.type?.name ?? "Unknown";

    counts[type] =
      (counts[type] || 0) + 1;
  });

  return (
    <div className={styles.card}>
      <h3>Issue Types</h3>

      {Object.entries(counts).map(
        ([type, count]) => (
          <div key={type}>
            {type}: {count}
          </div>
        )
      )}
    </div>
  );
}