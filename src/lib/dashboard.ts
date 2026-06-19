export function calculateAverageResolutionDays(
  incidents: any[]
) {
  const closedIncidents = incidents.filter(
    (incident) =>
      incident.status === "closed" &&
      incident.closingDate
  );

  if (!closedIncidents.length) return 0;

  const totalDays = closedIncidents.reduce(
    (sum, incident) => {
      const created = new Date(
        incident.createdAt
      );

      const closed = new Date(
        incident.closingDate
      );

      const diffMs =
        closed.getTime() - created.getTime();

      const diffDays =
        diffMs / (1000 * 60 * 60 * 24);

      return sum + diffDays;
    },
    0
  );

  return (
    totalDays / closedIncidents.length
  ).toFixed(1);
}

export function calculateApprovalRate(
  incidents: any[]
) {
  if (!incidents.length) return 0;

  const approved = incidents.filter(
    (i) => i.approval
  ).length;

  return Math.round(
    (approved / incidents.length) * 100
  );
}

export function calculateOverdue(
  incidents: any[]
) {
  const now = new Date();

  return incidents.filter(
    (incident) =>
      incident.status === "open" &&
      incident.dueDate &&
      new Date(incident.dueDate) < now
  ).length;
}