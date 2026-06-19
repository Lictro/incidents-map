"use client";

import { useIncidentStore } from "@/store/incidents.store";

import StatCard from "@/components/Dashboard/StatCard/StatCard";
import PriorityDistribution from "@/components/Dashboard/PriorityDistribution/PriorityDistribution";
import IssueTypes from "@/components/Dashboard/IssueTypes/IssueTypes";
import RecentIssuesTable from "@/components/Dashboard/RecentIssuesTable/RecentIssuesTable";

import {
  calculateApprovalRate,
  calculateAverageResolutionDays,
  calculateOverdue,
} from "@/lib/dashboard";

import styles from "./page.module.scss";

export default function DashboardPage() {
  const incidents = useIncidentStore(
    (state) => state.incidents
  );

  console.log("Incidents in Dashboard:", incidents);

  const total = incidents.length;

  const open = incidents.filter(
    (i) => i.status === "open"
  ).length;

  const closed = incidents.filter(
    (i) => i.status === "closed"
  ).length;

  return (
    <main className={styles.container}>
      <h1>Dashboard</h1>

      <div className={styles.stats}>
        <StatCard
          title="Total Issues"
          value={total}
        />

        <StatCard
          title="Open Issues"
          value={open}
        />

        <StatCard
          title="Closed Issues"
          value={closed}
        />

        <StatCard
          title="Approval Rate"
          value={`${calculateApprovalRate(
            incidents
          )}%`}
        />

        <StatCard
          title="Avg Resolution"
          value={`${calculateAverageResolutionDays(
            incidents
          )} days`}
        />

        <StatCard
          title="Overdue"
          value={calculateOverdue(
            incidents
          )}
        />
      </div>

      <div className={styles.grid}>
        <PriorityDistribution
          incidents={incidents}
        />

        <IssueTypes
          incidents={incidents}
        />
      </div>

      <RecentIssuesTable
        incidents={incidents}
      />
    </main>
  );
}