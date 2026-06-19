"use client";

import Link from "next/link";

import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        Incident Tracker
      </div>

      <div className={styles.links}>
        <Link href="/">Mapa</Link>

        <Link href="/dashboard">
          Dashboard
        </Link>
      </div>
    </nav>
  );
}