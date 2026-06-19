import styles from "./RecentIssuesTable.module.scss";

interface Props {
  incidents: any[];
}

export default function RecentIssuesTable({
  incidents,
}: Props) {
  const recent = [...incidents]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className={`${styles.card} surface-card`}>
      <div className={styles.header}>
        <div>
          <h3>Recent Issues</h3>
          <p className={styles.subtitle}>
            Latest issues reported across the job site.
          </p>
        </div>
      </div>

      {recent.length === 0 ? (
        <div className={styles.emptyState}>
          No recent incidents available.
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {recent.map((incident) => (
              <tr key={incident.id}>
                <td>{incident.sequenceId}</td>
                <td>{incident.title}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      styles[incident.status] ?? ""
                    }`}
                  >
                    {incident.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
