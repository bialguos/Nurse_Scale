// Tipos para la Escala de Valoración de Riesgo de Caídas Pediátrico

export interface PediatricFallRiskRecord {
  id: string;
  date: string;
  professional: string;
  patientName: string;

  // Categorías de evaluación
  age: number; // 1-4 puntos
  gender: number; // 1-2 puntos
  diagnosis: number; // 1-4 puntos
  cognitiveImpairment: number; // 1-3 puntos
  environmentalFactors: number; // 1-4 puntos
  surgeryOrSedation: number; // 1-3 puntos
  medication: number; // 1-3 puntos

  // Puntuación total y nivel de riesgo
  totalScore: number; // 7-23 puntos
  riskLevel: 'none' | 'low' | 'high';
}

export interface PediatricFallRiskOption {
  value: number;
  label: string;
  description: string;
}

export interface PediatricFallRiskCategory {
  name: string;
  field: keyof Omit<PediatricFallRiskRecord, 'id' | 'date' | 'professional' | 'patientName' | 'totalScore' | 'riskLevel'>;
  options: PediatricFallRiskOption[];
}
