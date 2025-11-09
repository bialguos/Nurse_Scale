import { BMICalculatorInput, BMICalculatorResult, PercentileData } from '../types/percentile';
import { malePercentiles, femalePercentiles } from '../data/percentileData';

/**
 * Calcula el IMC (Índice de Masa Corporal)
 * @param weight Peso en kilogramos
 * @param height Altura en centímetros
 * @returns IMC calculado
 */
export const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

/**
 * Interpolación lineal entre dos puntos
 */
const linearInterpolate = (x: number, x0: number, x1: number, y0: number, y1: number): number => {
  return y0 + (x - x0) * (y1 - y0) / (x1 - x0);
};

/**
 * Obtiene los datos de percentiles para una edad específica, interpolando si es necesario
 */
const getPercentilesForAge = (ageMonths: number, sex: 'M' | 'F'): Omit<PercentileData, 'age'> => {
  const data = sex === 'M' ? malePercentiles : femalePercentiles;

  // Buscar el rango de edad
  let lowerIndex = 0;
  let upperIndex = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].age <= ageMonths) {
      lowerIndex = i;
    }
    if (data[i].age >= ageMonths) {
      upperIndex = i;
      break;
    }
  }

  // Si la edad está fuera del rango, usar el valor más cercano
  if (ageMonths < data[0].age) {
    return { ...data[0] };
  }
  if (ageMonths > data[data.length - 1].age) {
    return { ...data[data.length - 1] };
  }

  // Si encontramos la edad exacta
  if (data[lowerIndex].age === ageMonths) {
    return { ...data[lowerIndex] };
  }

  // Interpolar entre los dos puntos
  const lower = data[lowerIndex];
  const upper = data[upperIndex];

  return {
    p2: linearInterpolate(ageMonths, lower.age, upper.age, lower.p2, upper.p2),
    p9: linearInterpolate(ageMonths, lower.age, upper.age, lower.p9, upper.p9),
    p25: linearInterpolate(ageMonths, lower.age, upper.age, lower.p25, upper.p25),
    p50: linearInterpolate(ageMonths, lower.age, upper.age, lower.p50, upper.p50),
    p75: linearInterpolate(ageMonths, lower.age, upper.age, lower.p75, upper.p75),
    p91: linearInterpolate(ageMonths, lower.age, upper.age, lower.p91, upper.p91),
    p98: linearInterpolate(ageMonths, lower.age, upper.age, lower.p98, upper.p98),
  };
};

/**
 * Calcula el percentil aproximado para un IMC dado
 */
const calculatePercentileFromBMI = (bmi: number, percentiles: Omit<PercentileData, 'age'>): number => {
  if (bmi <= percentiles.p2) return Math.max(0, (bmi / percentiles.p2) * 2);
  if (bmi <= percentiles.p9) return 2 + ((bmi - percentiles.p2) / (percentiles.p9 - percentiles.p2)) * 7;
  if (bmi <= percentiles.p25) return 9 + ((bmi - percentiles.p9) / (percentiles.p25 - percentiles.p9)) * 16;
  if (bmi <= percentiles.p50) return 25 + ((bmi - percentiles.p25) / (percentiles.p50 - percentiles.p25)) * 25;
  if (bmi <= percentiles.p75) return 50 + ((bmi - percentiles.p50) / (percentiles.p75 - percentiles.p50)) * 25;
  if (bmi <= percentiles.p91) return 75 + ((bmi - percentiles.p75) / (percentiles.p91 - percentiles.p75)) * 16;
  if (bmi <= percentiles.p98) return 91 + ((bmi - percentiles.p91) / (percentiles.p98 - percentiles.p91)) * 7;
  return Math.min(100, 98 + ((bmi - percentiles.p98) / percentiles.p98) * 2);
};

/**
 * Obtiene la categoría del percentil según la escala STAMP
 */
const getPercentileCategory = (percentile: number): string => {
  if (percentile < 2) return 'Por debajo del percentil 2';
  if (percentile < 9) return 'Entre percentil 2 y 9';
  if (percentile < 25) return 'Entre percentil 9 y 25';
  return 'Por encima del percentil 25';
};

/**
 * Obtiene el valor de riesgo nutricional según la escala STAMP
 * basado en el percentil de IMC
 */
const getNutritionalRiskValue = (percentile: number): number => {
  if (percentile < 2) return 3;  // IMC por debajo del percentil 2
  if (percentile < 9) return 2;  // IMC por debajo del percentil 9
  if (percentile < 25) return 1; // IMC por debajo del percentil 25
  return 0; // IMC por encima del percentil 25
};

/**
 * Calcula el IMC y determina el percentil para un niño
 */
export const calculateBMIPercentile = (input: BMICalculatorInput): BMICalculatorResult => {
  const { weight, height, ageMonths, sex } = input;

  // Calcular IMC
  const bmi = calculateBMI(weight, height);

  // Obtener percentiles para la edad y sexo
  const percentiles = getPercentilesForAge(ageMonths, sex);

  // Calcular percentil
  const percentile = calculatePercentileFromBMI(bmi, percentiles);

  // Obtener categoría y valor de riesgo
  const category = getPercentileCategory(percentile);
  const nutritionalRiskValue = getNutritionalRiskValue(percentile);

  return {
    bmi: parseFloat(bmi.toFixed(1)),
    percentile: parseFloat(percentile.toFixed(1)),
    category,
    nutritionalRiskValue
  };
};

/**
 * Convierte años y meses a meses totales
 */
export const convertToMonths = (years: number, months: number): number => {
  return years * 12 + months;
};

/**
 * Valida los datos de entrada
 */
export const validateInput = (input: Partial<BMICalculatorInput>): string[] => {
  const errors: string[] = [];

  if (!input.weight || input.weight <= 0) {
    errors.push('El peso debe ser mayor a 0 kg');
  }
  if (!input.height || input.height <= 0) {
    errors.push('La talla debe ser mayor a 0 cm');
  }
  if (!input.ageMonths || input.ageMonths < 0) {
    errors.push('La edad debe ser mayor o igual a 0 meses');
  }
  if (input.ageMonths && input.ageMonths > 228) {
    errors.push('La edad no debe superar los 19 años (228 meses)');
  }
  if (!input.sex) {
    errors.push('Debe seleccionar el sexo del paciente');
  }

  return errors;
};
