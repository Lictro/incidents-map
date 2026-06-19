import { Incident } from "@/types/incident";
import { create } from "zustand";
import incidentsMock from "@/data/incidents.mock.json";

interface IncidentStore {
  incidents: Incident[];
  addIncident: (incident: Omit<Incident, "id">) => void;
  setIncidents: (incidents: Incident[]) => void;
}

export const useIncidentStore = create<IncidentStore>((set) => ({
  incidents: incidentsMock as Incident[],

  addIncident: (incident) =>
    set((state) => ({
      incidents: [
        {
          ...incident,
          id: crypto.randomUUID(),
          sequenceId: String(
            state.incidents.length + 1
          ).padStart(4, "0")
        },
        ...state.incidents,
      ],
    })),

  setIncidents: (incidents) =>
    set({
      incidents,
    }),
}));
