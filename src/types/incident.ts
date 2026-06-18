export interface Incident {
  id: string;
  sequenceId: string;
  title: string;
  description: string;

  priority: "low" | "medium" | "high";

  status: "open" | "closed";

  coordinates: {
    lat: number;
    lng: number;
  };

  locationDescription: string;
}