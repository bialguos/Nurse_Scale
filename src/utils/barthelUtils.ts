import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { BarthelRecord } from '../types/barthel';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy HH:mm', { locale: es });
};

export const getBarthelResultText = (score: number): string => {
  if (score < 20) return "Dependencia total";
  if (score < 40) return "Dependencia grave";
  if (score < 60) return "Dependencia moderada";
  if (score < 100) return "Dependencia leve";
  return "Independencia";
};

export const getBarthelResultColor = (score: number): string => {
  if (score < 20) return "#e74c3c"; // Rojo - Dependencia total
  if (score < 40) return "#e67e22"; // Naranja - Dependencia grave
  if (score < 60) return "#f1c40f"; // Amarillo - Dependencia moderada
  if (score < 100) return "#3498db"; // Azul - Dependencia leve
  return "#2ecc71"; // Verde - Independencia
};

export const calculateTotalScore = (record: Partial<BarthelRecord>): number => {
  if (!record.items || record.items.length === 0) return 0;
  return record.items.reduce((total, item) => total + item.value, 0);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const barthelScoreDescriptions = [
  { min: 0, max: 19, text: "Dependencia total", description: "Necesita ayuda para todas las actividades de la vida diaria." },
  { min: 20, max: 39, text: "Dependencia grave", description: "Necesita ayuda para la mayoría de las actividades de la vida diaria." },
  { min: 40, max: 59, text: "Dependencia moderada", description: "Necesita ayuda para algunas actividades de la vida diaria." },
  { min: 60, max: 99, text: "Dependencia leve", description: "Necesita ayuda mínima para las actividades de la vida diaria." },
  { min: 100, max: 100, text: "Independencia", description: "Puede realizar todas las actividades de la vida diaria sin ayuda." }
];