"use client";

import { useState } from "react";

import styles from "./CreateIncidentModal.module.scss";
import { XIcon } from "@phosphor-icons/react";

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
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="incident-modal-title">
        <div className={styles.header}>
          <div>
            <h2 id="incident-modal-title">Crear Incidencia</h2>
          </div>
          <div onClick={onClose} className={styles.headerXButton} aria-label="Cerrar modal">
            <XIcon size={20} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="incident-title">Título</label>
            <input
              id="incident-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Escribe un resumen breve"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="incident-description">Descripción</label>
            <textarea
              id="incident-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Describe el problema y el contexto"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="incident-priority">Prioridad</label>
            <select
              id="incident-priority"
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
            <button type="button" className="button button-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="button button-primary">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
