import { DowntonItem, DowntonRecord } from '../types/downton';

export const downtonItems: DowntonItem[] = [
  {
    id: 1,
    name: "Caídas previas",
    options: [
      { value: 0, label: "No" },
      { value: 1, label: "Sí" }
    ]
  },
  {
    id: 2,
    name: "Medicamentos",
    options: [
      { value: 0, label: "Ninguno" },
      { value: 1, label: "Tranquilizantes/sedantes" },
      { value: 1, label: "Diuréticos" },
      { value: 1, label: "Hipotensores (no diuréticos)" },
      { value: 1, label: "Antiparkinsonianos" },
      { value: 1, label: "Antidepresivos" },
      { value: 1, label: "Otros medicamentos" }
    ]
  },
  {
    id: 3,
    name: "Déficits sensoriales",
    options: [
      { value: 0, label: "Ninguno" },
      { value: 1, label: "Alteraciones visuales" },
      { value: 1, label: "Alteraciones auditivas" },
      { value: 1, label: "Extremidades (ictus, etc.)" }
    ]
  },
  {
    id: 4,
    name: "Estado mental",
    options: [
      { value: 0, label: "Orientado" },
      { value: 1, label: "Confuso" }
    ]
  },
  {
    id: 5,
    name: "Deambulación",
    options: [
      { value: 0, label: "Normal" },
      { value: 1, label: "Segura con ayuda" },
      { value: 1, label: "Insegura con/sin ayuda" },
      { value: 1, label: "Imposible" }
    ]
  },
  {
    id: 6,
    name: "Edad",
    options: [
      { value: 0, label: "< 65 años" },
      { value: 1, label: "≥ 65 años" }
    ]
  }
];

export const mockDowntonRecords: DowntonRecord[] = [
  {
    id: "1",
    date: "2025-01-05T08:30:00",
    score: 3,
    professional: "Dr. Martínez Gómez",
    items: [
      { itemId: 1, value: 1, selectedOptions: [{ value: 1, label: "Sí" }] },
      { itemId: 2, value: 1, selectedOptions: [{ value: 1, label: "Tranquilizantes/sedantes" }] },
      { itemId: 3, value: 0, selectedOptions: [{ value: 0, label: "Ninguno" }] },
      { itemId: 4, value: 0, selectedOptions: [{ value: 0, label: "Orientado" }] },
      { itemId: 5, value: 0, selectedOptions: [{ value: 0, label: "Normal" }] },
      { itemId: 6, value: 1, selectedOptions: [{ value: 1, label: "≥ 65 años" }] }
    ]
  },
  {
    id: "2",
    date: "2025-02-10T09:45:00",
    score: 4,
    professional: "Dra. Sánchez Ruiz",
    items: [
      { itemId: 1, value: 1, selectedOptions: [{ value: 1, label: "Sí" }] },
      { itemId: 2, value: 1, selectedOptions: [{ value: 1, label: "Tranquilizantes/sedantes" }] },
      { itemId: 3, value: 1, selectedOptions: [{ value: 1, label: "Alteraciones visuales" }] },
      { itemId: 4, value: 0, selectedOptions: [{ value: 0, label: "Orientado" }] },
      { itemId: 5, value: 1, selectedOptions: [{ value: 1, label: "Insegura con/sin ayuda" }] },
      { itemId: 6, value: 0, selectedOptions: [{ value: 0, label: "< 65 años" }] }
    ]
  }
];