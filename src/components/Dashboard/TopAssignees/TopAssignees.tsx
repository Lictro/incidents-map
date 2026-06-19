import styles from "./TopAssignees.module.scss";

interface Props {
  incidents: any[];
}

export default function TopAssignees({
  incidents,
}: Props) {
  const assigneeCounts: Record<string, number> = {};

  incidents.forEach((incident) => {
    incident.assignees?.forEach(
      (assignee: any) => {
        assigneeCounts[assignee.name] =
          (assigneeCounts[assignee.name] || 0) + 1;
      }
    );
  });

  const topAssignees = Object.entries(
    assigneeCounts
  )
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className={styles.card}>
      <h3>Top Assignees</h3>

      <div className={styles.list}>
        {topAssignees.map(
          ([name, count], index) => (
            <div
              key={name}
              className={styles.row}
            >
              <div className={styles.rank}>
                #{index + 1}
              </div>

              <div className={styles.name}>
                {name}
              </div>

              <div className={styles.count}>
                {count}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}