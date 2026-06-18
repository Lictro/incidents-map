"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import styles from "./IncidentMap.module.scss";
import { useIncidentStore } from "@/store/incidents.store";

mapboxgl.accessToken =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

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

export default function IncidentMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const incidents = useIncidentStore(
    (state) => state.incidents
  );

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

    markersRef.current.forEach((marker) =>
      marker.remove()
    );
    markersRef.current = [];

    incidents.forEach((incident) => {
      const el = document.createElement("div");

      el.style.width = "14px";
      el.style.height = "14px";
      el.style.borderRadius = "50%";
      el.style.cursor = "pointer";
      el.style.backgroundColor = getMarkerColor(
        incident.priority
      );

      const popup = new mapboxgl.Popup({
        offset: 25,
      }).setHTML(`
        <div style="min-width:180px">
          <strong>${incident.title}</strong>
          <p style="margin:4px 0;">
            ${incident.locationDescription ?? ""}
          </p>
          <small>
            Priority: ${incident.priority}
          </small>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([
          incident.coordinates.lng,
          incident.coordinates.lat,
        ])
        .setPopup(popup)
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });
  }, [incidents]);

  return (
    <div ref={mapContainer} className={styles.map} />
  );
}