import styles from "./RecentIssuesTable.module.scss";

interface Props {
  incidents: any[];
}

export default function RecentIssuesTable({ incidents }: Props) {
  const recent = [...incidents]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  
  const statusText = (status: string) => {
    switch (status) {
      case "open":
        return "Abierta";
      case "closed":
        return "Cerrada";
      case "on_pause":
        return "En Pausa";
      default:
        return status;
    }
  }

  return (
    <div className={`${styles.card} surface-card`}>
      <div className={styles.header}>
        <div>
          <h3>Incidencias Recientes</h3>
          <p className={styles.subtitle}>
            Las últimas incidencias creadas en el sistema.
          </p>
        </div>
      </div>

      {recent.length === 0 ? (
        <div className={styles.emptyState}>
          No hay incidencias recientes disponibles.
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Titulo</th>
              <th>Estado</th>
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
                    {statusText(incident.status)}
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
