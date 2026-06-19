import styles from "./page.module.scss";

export default function DashboardPage() {
  return (
    <main className={styles.container}>
      <h1>Dashboard</h1>

      <p>
        Incident metrics will be displayed
        here.
      </p>
    </main>
  );
}