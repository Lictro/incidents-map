"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import styles from "./IncidentMap.module.scss";
import { Incident } from "@/types/incident";

mapboxgl.accessToken =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

interface Props {
  incidents: Incident[];
}

function getMarkerColor(priority: string) {
  switch (priority) {
    case "high":
      return "#EF4444";

    case "medium":
      return "#F59E0B";

    default:
      return "#22C55E";
  }
}

export default function IncidentMap({
  incidents,
}: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",

      center: [-74.05772, 4.652022],

      zoom: 15,
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    incidents.forEach((incident) => {
      const markerElement = document.createElement("div");

      markerElement.style.width = "16px";
      markerElement.style.height = "16px";
      markerElement.style.borderRadius = "50%";
      markerElement.style.cursor = "pointer";
      markerElement.style.backgroundColor =
        getMarkerColor(incident.priority);

      const popup = new mapboxgl.Popup({
        offset: 25,
      }).setHTML(`
        <div>
          <h3>${incident.title}</h3>
          <p>${incident.locationDescription}</p>
          <p>Priority: ${incident.priority}</p>
          <p>Status: ${incident.status}</p>
        </div>
      `);

      new mapboxgl.Marker(markerElement)
        .setLngLat([
          incident.coordinates.lng,
          incident.coordinates.lat,
        ])
        .setPopup(popup)
        .addTo(mapRef.current!);
    });
  }, [incidents]);

  return (
    <div
      ref={mapContainer}
      className={styles.map}
    />
  );
}