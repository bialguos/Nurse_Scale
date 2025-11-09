import { PercentileDataPoint } from '../types/percentiles';
import { percentilesData } from '../data/percentilesData';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Convertir edad en años y meses a meses totales
export const ageToMonths = (years: number, months: number): number => {
  return years * 12 + months;
};

// Convertir meses totales a años y meses
export const monthsToAge = (totalMonths: number): { years: number; months: number } => {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return { years, months };
};

// Encontrar los datos de percentil más cercanos para una edad dada
const findNearestDataPoints = (
  age: number,
  data: PercentileDataPoint[]
): { prev: PercentileDataPoint | null; next: PercentileDataPoint | null } => {
  let prev: PercentileDataPoint | null = null;
  let next: PercentileDataPoint | null = null;

  for (let i = 0; i < data.length; i++) {
    if (data[i].age === age) {
      return { prev: data[i], next: data[i] };
    }
    if (data[i].age < age) {
      prev = data[i];
    }
    if (data[i].age > age && !next) {
      next = data[i];
      break;
    }
  }

  return { prev, next };
};

// Interpolar valor entre dos puntos
const interpolate = (x: number, x0: number, y0: number, x1: number, y1: number): number => {
  if (x1 === x0) return y0;
  return y0 + ((x - x0) * (y1 - y0)) / (x1 - x0);
};

// Obtener valor en un percentil específico para una edad dada
export const getValueAtPercentile = (
  age: number,
  percentile: number,
  type: 'weight' | 'height',
  gender: 'male' | 'female'
): number => {
  const data = percentilesData[type][gender];
  const { prev, next } = findNearestDataPoints(age, data);

  if (!prev || !next) return 0;

  const percentileKey = `p${percentile.toString().replace('.', '')}` as keyof PercentileDataPoint;

  if (prev.age === next.age) {
    return prev[percentileKey] as number;
  }

  const value0 = prev[percentileKey] as number;
  const value1 = next[percentileKey] as number;

  return interpolate(age, prev.age, value0, next.age, value1);
};

// Calcular en qué percentil se encuentra un valor dado
export const calculatePercentile = (
  age: number,
  value: number,
  type: 'weight' | 'height',
  gender: 'male' | 'female'
): number => {
  const percentiles = [0.4, 2, 9, 25, 50, 75, 91, 98, 99.6];

  // Obtener valores en cada percentil para esta edad
  const valuesAtPercentiles = percentiles.map((p) => ({
    percentile: p,
    value: getValueAtPercentile(age, p, type, gender),
  }));

  // Si el valor está fuera de rango
  if (value <= valuesAtPercentiles[0].value) return 0.4;
  if (value >= valuesAtPercentiles[valuesAtPercentiles.length - 1].value) return 99.6;

  // Encontrar entre qué percentiles está el valor
  for (let i = 0; i < valuesAtPercentiles.length - 1; i++) {
    const current = valuesAtPercentiles[i];
    const next = valuesAtPercentiles[i + 1];

    if (value >= current.value && value <= next.value) {
      // Interpolar para encontrar el percentil exacto
      return interpolate(
        value,
        current.value,
        current.percentile,
        next.value,
        next.percentile
      );
    }
  }

  return 50; // Valor por defecto
};

// Calcular diferencia de percentiles
export const calculatePercentileDifference = (
  weightPercentile: number,
  heightPercentile: number
): number => {
  return Math.abs(weightPercentile - heightPercentile);
};

// Obtener interpretación de la diferencia de percentiles
export const getPercentileDifferenceInterpretation = (difference: number): string => {
  if (difference === 0) return 'Sin diferencia';
  if (difference === 1) return '1 columna de diferencia';
  if (difference === 2) return '2 columnas de diferencia';
  return '3 o más columnas de diferencia';
};

// Obtener puntuación STAMP basada en diferencia de percentiles (Anexo 4 del PDF)
export const getStampScore = (difference: number): number => {
  // Según el Anexo 4: Paso 1 - Diferencia columnas peso y talla
  // 0 ó 1 columnas = 0 puntos
  // = 2 columnas = 1 punto
  // ≥ 3 columnas = 3 puntos
  const percentileRanges = [0.4, 2, 9, 25, 50, 75, 91, 98, 99.6];

  // Convertir diferencia de percentiles a diferencia de columnas
  let columnDiff = 0;
  for (let i = 0; i < percentileRanges.length - 1; i++) {
    if (difference >= (percentileRanges[i + 1] - percentileRanges[i])) {
      columnDiff++;
    }
  }

  if (columnDiff <= 1) return 0;
  if (columnDiff === 2) return 1;
  return 3;
};

// Obtener el color del indicador según percentil
export const getPercentileColor = (percentile: number): string => {
  if (percentile < 2) return '#ef4444'; // Rojo - muy bajo
  if (percentile < 9) return '#f97316'; // Naranja - bajo
  if (percentile < 25) return '#eab308'; // Amarillo - bajo normal
  if (percentile <= 75) return '#22c55e'; // Verde - normal
  if (percentile <= 91) return '#eab308'; // Amarillo - alto normal
  if (percentile <= 98) return '#f97316'; // Naranja - alto
  return '#ef4444'; // Rojo - muy alto
};

// Obtener texto descriptivo del percentil
export const getPercentileDescription = (percentile: number): string => {
  if (percentile < 2) return 'Muy bajo (< P2)';
  if (percentile < 9) return 'Bajo (P2-P9)';
  if (percentile < 25) return 'Bajo normal (P9-P25)';
  if (percentile <= 75) return 'Normal (P25-P75)';
  if (percentile <= 91) return 'Alto normal (P75-P91)';
  if (percentile <= 98) return 'Alto (P91-P98)';
  return 'Muy alto (> P98)';
};

// Generar datos para la gráfica de percentiles
export const generateChartData = (
  type: 'weight' | 'height',
  gender: 'male' | 'female',
  minAge: number = 0,
  maxAge: number = 216 // 18 años
): Array<{ age: number; [key: string]: number }> => {
  const data = percentilesData[type][gender];
  const filteredData = data.filter((point) => point.age >= minAge && point.age <= maxAge);

  return filteredData.map((point) => ({
    age: point.age,
    P3: (point.p2 + point.p9) / 2, // Aproximación P3
    P10: point.p9,
    P25: point.p25,
    P50: point.p50,
    P75: point.p75,
    P90: point.p91,
    P97: (point.p91 + point.p98) / 2, // Aproximación P97
  }));
};

// Formatear edad para mostrar
export const formatAge = (years: number, months: number): string => {
  if (years === 0) return `${months} ${months === 1 ? 'mes' : 'meses'}`;
  if (months === 0) return `${years} ${years === 1 ? 'año' : 'años'}`;
  return `${years} ${years === 1 ? 'año' : 'años'} y ${months} ${
    months === 1 ? 'mes' : 'meses'
  }`;
};

// Calcular percentiles completos de un registro
export const calculateRecordPercentiles = (
  ageYears: number,
  ageMonths: number,
  weight: number,
  height: number,
  gender: 'male' | 'female'
): {
  weightPercentile: number;
  heightPercentile: number;
  percentileDifference: number;
} => {
  const totalMonths = ageToMonths(ageYears, ageMonths);
  const weightPercentile = calculatePercentile(totalMonths, weight, 'weight', gender);
  const heightPercentile = calculatePercentile(totalMonths, height, 'height', gender);
  const percentileDifference = calculatePercentileDifference(weightPercentile, heightPercentile);

  return {
    weightPercentile: Math.round(weightPercentile * 10) / 10,
    heightPercentile: Math.round(heightPercentile * 10) / 10,
    percentileDifference: Math.round(percentileDifference * 10) / 10,
  };
};
