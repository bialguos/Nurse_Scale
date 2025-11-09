import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { DowntonRecord } from '../types/downton';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy HH:mm', { locale: es });
};

export const getDowntonResultText = (score: number): string => {
  if (score >= 3) return "Alto riesgo de caídas";
  return "Bajo riesgo de caídas";
};

export const getDowntonResultColor = (score: number): string => {
  if (score >= 3) return "#e74c3c"; // Rojo - Alto riesgo
  return "#2ecc71"; // Verde - Bajo riesgo
};

export const calculateTotalScore = (record: Partial<DowntonRecord>): number => {
  if (!record.items || record.items.length === 0) return 0;
  return record.items.reduce((total, item) => total + item.value, 0);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const downtonScoreDescriptions = [
  { min: 0, max: 2, text: "Bajo riesgo de caídas", description: "Riesgo bajo de sufrir caídas" },
  { min: 3, max: 10, text: "Alto riesgo de caídas", description: "Riesgo alto de sufrir caídas, requiere medidas preventivas" }
];