"use client";

import { useState } from "react";

import styles from "./CreateIncidentModal.module.scss";

interface Props {
  isOpen: boolean;
  coordinates: {
    lat: number;
    lng: number;
  } | null;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
  }) => void;
}

export default function CreateIncidentModal({
  isOpen,
  coordinates,
  onClose,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  if (!isOpen || !coordinates) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      title,
      description,
      priority,
    });

    setTitle("");
    setDescription("");
    setPriority("medium");

    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Crear incidencia</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Título</label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Descripción</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Prioridad</label>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as "low" | "medium" | "high")
              }
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div className={styles.coordinates}>
            <span>Lat: {coordinates.lat.toFixed(6)}</span>

            <span>Lng: {coordinates.lng.toFixed(6)}</span>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>

            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
