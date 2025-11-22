// Tipos para las Escalas de Valoración del Dolor Pediátrico
// - Menores de 3 años: Escala FLACC
// - De 3 a 7 años: Escala de Caras
// - De 7 a 14 años: Escala Visual Analógica (EVA)

export type PainScaleType = 'flacc' | 'faces' | 'vas';

export interface PediatricPainRecord {
  id: string;
  date: string;
  professional: string;
  patientName: string;
  patientAgeMonths: number; // Edad en meses para determinar la escala

  scaleType: PainScaleType;

  // Campos para escala FLACC (menores de 3 años)
  crying?: number; // Llanto: 0-2
  attitude?: number; // Actitud: 0-2
  breathing?: number; // Respiración: 0-2
  posturalTone?: number; // Tono postural: 0-2
  facialObservation?: number; // Observación facial: 0-2

  // Campo para escala de Caras (3-7 años) y EVA (7-14 años)
  painLevel?: number; // 0-10

  // Puntuación total y nivel de dolor
  totalScore: number;
  painIntensity: 'none' | 'mild' | 'moderate' | 'severe';
}

export interface FLACCOption {
  value: number;
  label: string;
  description: string;
}

export interface FLACCCategory {
  name: string;
  field: 'crying' | 'attitude' | 'breathing' | 'posturalTone' | 'facialObservation';
  options: FLACCOption[];
}
