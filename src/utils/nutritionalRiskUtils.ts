import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { NutritionalRiskRecord } from '../types/nutritionalRisk';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy HH:mm', { locale: es });
};

export const getNutritionalRiskResultText = (score: number): string => {
  if (score >= 4) return "Alto riesgo";
  if (score >= 2) return "Riesgo medio";
  return "Bajo riesgo";
};

export const getNutritionalRiskResultColor = (score: number): string => {
  if (score >= 4) return "#e74c3c"; // Rojo - Alto riesgo
  if (score >= 2) return "#f39c12"; // Naranja - Riesgo medio
  return "#2ecc71"; // Verde - Bajo riesgo
};

export const calculateTotalScore = (record: Partial<NutritionalRiskRecord>): number => {
  if (!record.items || record.items.length === 0) return 0;
  return record.items.reduce((total, item) => total + item.value, 0);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const nutritionalRiskScoreDescriptions = [
  {
    min: 4,
    max: 9,
    text: "Alto riesgo",
    description: "Requiere intervención nutricional inmediata. Derivar al equipo de nutrición. Monitorización estrecha del estado nutricional."
  },
  {
    min: 2,
    max: 3,
    text: "Riesgo medio",
    description: "Requiere seguimiento y valoración nutricional. Considerar consulta con nutrición. Repetir cribado en 3 días."
  },
  {
    min: 0,
    max: 1,
    text: "Bajo riesgo",
    description: "Continuar con cuidados básicos de enfermería. Repetir cribado semanalmente durante la hospitalización."
  }
];
