"use client";

import { useEffect } from "react";

import IncidentMap from "@/components/IncidentMap/IncidentMap";

import incidentsData from "@/data/incidents.mock.json";

import { useIncidentStore } from "@/store/incidents.store";

export default function Home() {
  const setIncidents =
    useIncidentStore((state) => state.setIncidents);

  useEffect(() => {
    setIncidents(incidentsData);
  }, [setIncidents]);

  return <IncidentMap />;
}