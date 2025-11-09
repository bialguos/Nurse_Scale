import { GlasgowPediatricRecord } from '../types/glasgowPediatric';

export const calculateTotalScore = (record: Partial<GlasgowPediatricRecord>): number => {
  if (!record.items || record.items.length === 0) {
    return 0;
  }

  return record.items.reduce((sum, item) => sum + (item.value || 0), 0);
};

export const calculateCategoryScores = (record: Partial<GlasgowPediatricRecord>) => {
  if (!record.items || record.items.length === 0) {
    return { ocular: 0, verbal: 0, motora: 0 };
  }

  const ocularItem = record.items.find(item => item.itemId === 1);
  const verbalItem = record.items.find(item => item.itemId === 2);
  const motoraItem = record.items.find(item => item.itemId === 3);

  return {
    ocular: ocularItem?.value || 0,
    verbal: verbalItem?.value || 0,
    motora: motoraItem?.value || 0
  };
};

export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const getGlasgowResultText = (score: number): string => {
  if (score >= 13 && score <= 15) {
    return 'Lesión cerebral leve';
  } else if (score >= 9 && score <= 12) {
    return 'Lesión cerebral moderada';
  } else if (score >= 3 && score <= 8) {
    return 'Lesión cerebral severa';
  }
  return 'Sin evaluar';
};

export const getGlasgowResultColor = (score: number): string => {
  if (score >= 13 && score <= 15) {
    return '#27ae60'; // Verde - Leve
  } else if (score >= 9 && score <= 12) {
    return '#f39c12'; // Naranja - Moderada
  } else if (score >= 3 && score <= 8) {
    return '#e74c3c'; // Rojo - Severa
  }
  return '#95a5a6'; // Gris - Sin evaluar
};

export const glasgowScoreDescriptions = [
  {
    min: 13,
    max: 15,
    text: 'Lesión cerebral leve',
    description: 'Paciente consciente, orientado y con respuestas apropiadas',
    color: '#27ae60'
  },
  {
    min: 9,
    max: 12,
    text: 'Lesión cerebral moderada',
    description: 'Paciente con nivel de consciencia disminuido, requiere vigilancia estrecha',
    color: '#f39c12'
  },
  {
    min: 3,
    max: 8,
    text: 'Lesión cerebral severa',
    description: 'Paciente en estado crítico, requiere atención inmediata y monitoreo continuo',
    color: '#e74c3c'
  }
];

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};
