"use client";

import { useEffect } from "react";

import IncidentMap from "@/components/IncidentMap/IncidentMap";
import type { Incident } from "@/types/incident";

import incidentsData from "@/data/incidents.mock.json";

import { useIncidentStore } from "@/store/incidents.store";

export default function Home() {
  const setIncidents = useIncidentStore((state) => state.setIncidents);

  useEffect(() => {
    setIncidents(incidentsData as Incident[]);
  }, [setIncidents]);

  return <IncidentMap />;
}
