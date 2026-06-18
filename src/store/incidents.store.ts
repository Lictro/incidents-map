import { Incident } from "@/types/incident";
import { create } from "zustand";

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