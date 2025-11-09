export interface PercentileData {
  age: number; // en meses
  p2: number;  // percentil 2
  p9: number;  // percentil 9
  p25: number; // percentil 25
  p50: number; // percentil 50 (mediana)
  p75: number; // percentil 75
  p91: number; // percentil 91
  p98: number; // percentil 98
}

export interface BMICalculatorInput {
  weight: number;  // en kilogramos
  height: number;  // en centímetros
  ageMonths: number; // edad en meses
  sex: 'M' | 'F';    // M = masculino, F = femenino
}

export interface BMICalculatorResult {
  bmi: number;
  percentile: number;
  category: string; // por ejemplo: "Por debajo del percentil 2", "Entre percentil 2 y 9", etc.
  nutritionalRiskValue?: number; // valor correspondiente para la escala STAMP
}
