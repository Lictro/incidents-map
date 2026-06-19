"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Navbar.module.scss";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/", label: "Mapa" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <div className={styles.brandMark}>IM</div>
        <div className={styles.brandText}>
          <span className={styles.brandName}>Manejo de Incidentes</span>
        </div>
      </div>

      <div className={styles.links}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.link} ${isActive ? styles.active : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
