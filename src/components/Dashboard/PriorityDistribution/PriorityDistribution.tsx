import styles from "./PriorityDistribution.module.scss";

interface Props {
  incidents: any[];
}

export default function PriorityDistribution({ incidents }: Props) {
  const high = incidents.filter((i) => i.priority === "high").length;
  const medium = incidents.filter((i) => i.priority === "medium").length;
  const low = incidents.filter((i) => i.priority === "low").length;

  return (
    <div className={`${styles.card} surface-card`}>
      <div className={styles.header}>
        <h3>Distribución de Prioridad</h3>
        <p className={styles.subtitle}>
          Distribución de gravedad entre las incidencias activas.
        </p>
      </div>
      <div className={styles.metric}>
        <span>Alta</span>
        <strong>{high}</strong>
      </div>
      <div className={styles.metric}>
        <span>Media</span>
        <strong>{medium}</strong>
      </div>
      <div className={styles.metric}>
        <span>Baja</span>
        <strong>{low}</strong>
      </div>
    </div>
  );
}
