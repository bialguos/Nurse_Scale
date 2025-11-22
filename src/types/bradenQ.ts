// Tipos para las Escalas de Braden
// Anexo 5: Braden Q (menores de 5 años) - 7 categorías
// Anexo 6: Braden-Bergstrom (mayores de 5 años) - 6 categorías

export interface BradenRecord {
  id: string;
  date: string;
  professional: string;
  patientName: string;
  patientAge: number; // en meses
  scaleType: 'bradenQ' | 'bradenBergstrom'; // Determina qué escala usar según la edad

  // Campos comunes a ambas escalas
  mobility: number; // 1-4
  activity: number; // 1-4
  sensoryPerception: number; // 1-4
  moisture: number; // 1-4 (exposureToMoisture en Braden-Bergstrom)
  nutrition: number; // 1-4

  // Campos específicos de Braden Q (< 5 años)
  friction?: number; // 1-4 (solo Braden Q)
  tissuePerfusionOxygenation?: number; // 1-4 (solo Braden Q)

  // Campo específico de Braden-Bergstrom (> 5 años)
  skinLesionRisk?: number; // 1-4 (riesgo de lesiones cutáneas, solo Braden-Bergstrom)

  // Puntuación total y riesgo
  totalScore: number; // 7-28 (Braden Q) o 6-24 (Braden-Bergstrom)
  riskLevel: 'very_high' | 'high' | 'moderate' | 'low';
}

export interface BradenQOption {
  value: number;
  label: string;
  description: string;
}

export interface BradenQCategory {
  name: string;
  field: keyof Omit<BradenQRecord, 'id' | 'date' | 'professional' | 'patientName' | 'patientAge' | 'totalScore' | 'riskLevel'>;
  options: BradenQOption[];
}
