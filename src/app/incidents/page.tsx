"use client";

import IncidentMap from "@/components/IncidentMap/IncidentMap";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.page}>
      <IncidentMap />
    </main>
  );
}
