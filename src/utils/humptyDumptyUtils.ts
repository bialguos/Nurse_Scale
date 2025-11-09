import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { HumptyDumptyRecord } from '../types/humptyDumpty';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy HH:mm', { locale: es });
};

export const getHumptyDumptyResultText = (score: number): string => {
  if (score >= 23) return "Alto riesgo";
  if (score >= 15) return "Riesgo moderado";
  if (score >= 7) return "Bajo riesgo";
  return "Muy bajo riesgo";
};

export const getHumptyDumptyResultColor = (score: number): string => {
  if (score >= 23) return "#e74c3c"; // Rojo - Alto riesgo
  if (score >= 15) return "#f1c40f"; // Amarillo - Riesgo moderado
  if (score >= 7) return "#3498db"; // Azul - Bajo riesgo
  return "#2ecc71"; // Verde - Muy bajo riesgo
};

export const calculateTotalScore = (record: Partial<HumptyDumptyRecord>): number => {
  if (!record.items || record.items.length === 0) return 0;
  return record.items.reduce((total, item) => total + item.value, 0);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const humptyDumptyScoreDescriptions = [
  { min: 23, max: 29, text: "Alto riesgo", description: "Implementar precauciones de alto riesgo de caídas" },
  { min: 15, max: 22, text: "Riesgo moderado", description: "Implementar precauciones de riesgo moderado de caídas" },
  { min: 7, max: 14, text: "Bajo riesgo", description: "Implementar precauciones de bajo riesgo de caídas" },
  { min: 0, max: 6, text: "Muy bajo riesgo", description: "Cuidados básicos de enfermería" }
];