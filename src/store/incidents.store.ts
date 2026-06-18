import { create } from "zustand";

export interface Incident {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  severity: "low" | "medium" | "high";
}

interface IncidentStore {
  incidents: Incident[];
  addIncident: (incident: Incident) => void;
  setIncidents: (incidents: Incident[]) => void;
}

export const useIncidentStore = create<IncidentStore>((set) => ({
  incidents: [],

  addIncident: (incident) =>
    set((state) => ({
      incidents: [...state.incidents, incident],
    })),

  setIncidents: (incidents) =>
    set({
      incidents,
    }),
}));