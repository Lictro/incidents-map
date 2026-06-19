"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import styles from "./IncidentMap.module.scss";

import { useIncidentStore } from "@/store/incidents.store";
import CreateIncidentModal from "../CreateIncidentModal/CreateIncidentModal";
import { PlusIcon } from "@phosphor-icons/react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

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

  const [isCreating, setIsCreating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const incidents = useIncidentStore((state) => state.incidents);
  const addIncident = useIncidentStore((state) => state.addIncident);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

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

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    incidents.forEach((incident) => {
      const el = document.createElement("div");
      el.className = styles.marker;
      el.style.backgroundColor = getMarkerColor(
        incident.priority
      );

      const popup = new mapboxgl.Popup({
        offset: 24,
        className: "incident-popup",
      }).setHTML(`
        <div class="map-popup">
          <h4>${incident.title}</h4>
          <p>${incident.locationDescription ?? "Sin ubicación"}</p>
          <div class="map-popup__keys">
            <span>Priority</span>
            <strong>${incident.priority}</strong>
          </div>
          <div class="map-popup__keys">
            <span>Status</span>
            <strong>${incident.status}</strong>
          </div>
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

  useEffect(() => {
    if (!mapRef.current) return;

    const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
      if (!isCreating) return;

      const { lat, lng } = e.lngLat;
      setSelectedCoordinates({ lat, lng });
      setIsModalOpen(true);
      setIsCreating(false);
    };

    mapRef.current.on("click", handleMapClick);
    mapRef.current.getCanvas().style.cursor =
      isCreating ? "crosshair" : "";

    return () => {
      mapRef.current?.off("click", handleMapClick);
    };
  }, [isCreating]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.mapFrame}>
        <div ref={mapContainer} className={styles.map} />

        <div className={styles.overlayTopLeft}>
          <div className={styles.legendCard}>
            <span className={styles.legendTitle}>Prioridad</span>
            <div className={styles.legendItems}>
              <span className={`${styles.legendItem} ${styles.high}`}>
                Alta
              </span>
              <span className={`${styles.legendItem} ${styles.medium}`}>
                Media
              </span>
              <span className={`${styles.legendItem} ${styles.low}`}>
                Baja
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className={`${styles.floatingButton} button button-primary`}
        >
          
          {isCreating ? "Selecciona un punto..." : <><PlusIcon size={20} />Crear Incidencia</>}
        </button>
      </div>

      <CreateIncidentModal
        isOpen={isModalOpen}
        coordinates={selectedCoordinates}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          if (!selectedCoordinates) return;

          addIncident({
            title: data.title,
            description: data.description,
            priority: data.priority,
            status: "open",
            coordinates: {
              lat: selectedCoordinates.lat,
              lng: selectedCoordinates.lng,
            },
            locationDescription: "",
          } as any);

          setSelectedCoordinates(null);
        }}
      />
    </section>
  );
}
