import { FLACCCategory, PainScaleType } from '../types/pediatricPain';

// Escala FLACC para menores de 3 años
export const flaccCategories: FLACCCategory[] = [
  {
    name: 'Llanto',
    field: 'crying',
    options: [
      { value: 0, label: 'No llora', description: 'El paciente no llora' },
      { value: 1, label: 'Consolable/intermitente', description: 'Llanto intermitente que se puede consolar' },
      { value: 2, label: 'Inconsolable/continuo', description: 'Llanto continuo que no se puede consolar' },
    ],
  },
  {
    name: 'Actitud',
    field: 'attitude',
    options: [
      { value: 0, label: 'Tranquilo o dormido', description: 'El paciente está tranquilo o dormido' },
      { value: 1, label: 'Expectante/intranquilo', description: 'El paciente está expectante o intranquilo' },
      { value: 2, label: 'Agitado o histérico', description: 'El paciente está agitado o histérico' },
    ],
  },
  {
    name: 'Respiración',
    field: 'breathing',
    options: [
      { value: 0, label: 'Regular o pausada', description: 'Respiración regular o pausada' },
      { value: 1, label: 'Taquipneico', description: 'Respiración rápida (taquipnea)' },
      { value: 2, label: 'Irregular', description: 'Respiración irregular' },
    ],
  },
  {
    name: 'Tono Postural',
    field: 'posturalTone',
    options: [
      { value: 0, label: 'Relajada', description: 'Postura relajada' },
      { value: 1, label: 'Indiferente', description: 'Postura indiferente' },
      { value: 2, label: 'Contraído', description: 'Postura contraída, tensa' },
    ],
  },
  {
    name: 'Observación Facial',
    field: 'facialObservation',
    options: [
      { value: 0, label: 'Contento o dormido', description: 'Expresión contenta o dormido' },
      { value: 1, label: 'Serio', description: 'Expresión seria' },
      { value: 2, label: 'Triste', description: 'Expresión triste o de dolor' },
    ],
  },
];

// Escala de Caras para niños de 3 a 7 años
export const facesScaleOptions = [
  { value: 0, label: 'Sin dolor', emoji: '😊' },
  { value: 2, label: 'Duele un poco', emoji: '🙂' },
  { value: 4, label: 'Duele un poco más', emoji: '😐' },
  { value: 6, label: 'Duele mucho', emoji: '🙁' },
  { value: 8, label: 'Duele mucho más', emoji: '😢' },
  { value: 10, label: 'Dolor insoportable', emoji: '😭' },
];

// Determinar el tipo de escala según la edad en meses
export const getScaleTypeByAge = (ageMonths: number): PainScaleType => {
  if (ageMonths < 36) return 'flacc'; // Menores de 3 años
  if (ageMonths < 84) return 'faces'; // De 3 a 7 años
  return 'vas'; // De 7 a 14 años
};

// Obtener el nombre de la escala
export const getScaleName = (scaleType: PainScaleType): string => {
  switch (scaleType) {
    case 'flacc':
      return 'Escala FLACC (menores de 3 años)';
    case 'faces':
      return 'Escala de Caras (3 a 7 años)';
    case 'vas':
      return 'Escala Visual Analógica - EVA (7 a 14 años)';
    default:
      return '';
  }
};

// Calcular intensidad del dolor
export const calculatePainIntensity = (totalScore: number): 'none' | 'mild' | 'moderate' | 'severe' => {
  if (totalScore === 0) return 'none';
  if (totalScore >= 1 && totalScore <= 3) return 'mild';
  if (totalScore >= 4 && totalScore <= 6) return 'moderate';
  return 'severe'; // 7-10
};

// Obtener descripción de la intensidad del dolor
export const getPainIntensityDescription = (intensity: 'none' | 'mild' | 'moderate' | 'severe'): string => {
  switch (intensity) {
    case 'none':
      return 'Sin dolor';
    case 'mild':
      return 'Dolor leve';
    case 'moderate':
      return 'Dolor moderado';
    case 'severe':
      return 'Dolor intenso';
    default:
      return '';
  }
};

// Obtener color según la intensidad del dolor
export const getPainIntensityColor = (intensity: 'none' | 'mild' | 'moderate' | 'severe'): string => {
  switch (intensity) {
    case 'none':
      return '#27ae60'; // Verde
    case 'mild':
      return '#f1c40f'; // Amarillo
    case 'moderate':
      return '#f39c12'; // Naranja
    case 'severe':
      return '#e74c3c'; // Rojo
    default:
      return '#95a5a6';
  }
};
