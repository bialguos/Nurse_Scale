import { BradenQCategory, BradenRecord } from '../types/bradenQ';

// Definición de las 7 categorías de la Escala Braden Q según el Anexo 5 (menores de 5 años)
export const bradenQCategories: BradenQCategory[] = [
  {
    name: 'MOVILIDAD',
    field: 'mobility',
    options: [
      {
        value: 1,
        label: 'Completamente inmóvil',
        description: 'Completamente inmóvil'
      },
      {
        value: 2,
        label: 'Muy Limitada',
        description: 'Muy Limitada'
      },
      {
        value: 3,
        label: 'Ligeramente limitada',
        description: 'Ligeramente limitada'
      },
      {
        value: 4,
        label: 'Sin limitaciones',
        description: 'Sin limitaciones'
      }
    ]
  },
  {
    name: 'ACTIVIDAD',
    field: 'activity',
    options: [
      {
        value: 1,
        label: 'Encamado',
        description: 'Encamado'
      },
      {
        value: 2,
        label: 'En silla, la mayoría del tiempo',
        description: 'En silla, la mayoría del tiempo'
      },
      {
        value: 3,
        label: 'Deambula ocasionalmente distancias cortas',
        description: 'Deambula ocasionalmente distancias cortas'
      },
      {
        value: 4,
        label: 'Deambula sin problemas',
        description: 'Deambula sin problemas'
      }
    ]
  },
  {
    name: 'PERCEPCIÓN SENSORIAL',
    field: 'sensoryPerception',
    options: [
      {
        value: 1,
        label: 'Completamente limitada',
        description: 'No reacciona ante estímulos dolorosos'
      },
      {
        value: 2,
        label: 'Muy limitada',
        description: 'Reacciona sólo ante estímulos dolorosos'
      },
      {
        value: 3,
        label: 'Ligeramente limitada',
        description: 'Responde a órdenes verbales simples'
      },
      {
        value: 4,
        label: 'Sin limitaciones',
        description: 'Sin limitaciones'
      }
    ]
  },
  {
    name: 'HUMEDAD',
    field: 'moisture',
    options: [
      {
        value: 1,
        label: 'Constantemente húmeda',
        description: 'Constantemente húmeda'
      },
      {
        value: 2,
        label: 'A menudo húmeda',
        description: 'La piel no siempre está húmeda'
      },
      {
        value: 3,
        label: 'Ocasionalmente húmeda',
        description: 'Ocasionalmente húmeda'
      },
      {
        value: 4,
        label: 'Raramente húmeda',
        description: 'Raramente húmeda'
      }
    ]
  },
  {
    name: 'FRICCIÓN',
    field: 'friction',
    options: [
      {
        value: 1,
        label: 'Problema significativo',
        description: 'Requiere máxima asistencia para ser movido'
      },
      {
        value: 2,
        label: 'Problema',
        description: 'Requiere de moderada a máxima asistencia para ser movido'
      },
      {
        value: 3,
        label: 'Problema potencial',
        description: 'Se mueve muy débilmente o requiere de mínima asistencia'
      },
      {
        value: 4,
        label: 'No existe problema aparente',
        description: 'No existe problema aparente'
      }
    ]
  },
  {
    name: 'NUTRICIÓN',
    field: 'nutrition',
    options: [
      {
        value: 1,
        label: 'Muy pobre',
        description: 'Muy pobre'
      },
      {
        value: 2,
        label: 'Probablemente inadecuada',
        description: 'Probablemente inadecuada'
      },
      {
        value: 3,
        label: 'Adecuada',
        description: 'Adecuada'
      },
      {
        value: 4,
        label: 'Excelente',
        description: 'Excelente'
      }
    ]
  },
  {
    name: 'PERFUSIÓN TISULAR Y OXIGENACIÓN',
    field: 'tissuePerfusionOxygenation',
    options: [
      {
        value: 1,
        label: 'Extremadamente comprometida',
        description: 'Hipotensión en el paciente. No tolera fisiológicamente cambios de posición'
      },
      {
        value: 2,
        label: 'Comprometida',
        description: 'Normotenso. Saturación < 95%. Hemoglobina < 10mg/dl, relleno capilar > 2 seg y pH < 7.40'
      },
      {
        value: 3,
        label: 'Adecuada',
        description: 'Normotenso. Saturación < 95%, hemoglobina < 10mg/dl, relleno capilar 2 seg y pH normal'
      },
      {
        value: 4,
        label: 'Excelente',
        description: 'Normotenso. Saturación > 95%, hemoglobina normal, relleno capilar < 2 seg y pH normal'
      }
    ]
  }
];

// Definición de las 6 categorías de la Escala Braden-Bergstrom según el Anexo 6 (mayores de 5 años)
export const bradenBergstromCategories: BradenQCategory[] = [
  {
    name: 'PERCEPCIÓN SENSORIAL',
    field: 'sensoryPerception',
    options: [
      {
        value: 1,
        label: 'Completamente limitada',
        description: 'Completamente limitada'
      },
      {
        value: 2,
        label: 'Muy limitada',
        description: 'Muy limitada'
      },
      {
        value: 3,
        label: 'Ligeramente limitada',
        description: 'Ligeramente limitada'
      },
      {
        value: 4,
        label: 'Sin limitaciones',
        description: 'Sin limitaciones'
      }
    ]
  },
  {
    name: 'EXPOSICIÓN A LA HUMEDAD',
    field: 'moisture',
    options: [
      {
        value: 1,
        label: 'Constantemente húmeda',
        description: 'Constantemente húmeda'
      },
      {
        value: 2,
        label: 'Húmeda con frecuencia',
        description: 'Húmeda con frecuencia'
      },
      {
        value: 3,
        label: 'Ocasionalmente húmeda',
        description: 'Ocasionalmente húmeda'
      },
      {
        value: 4,
        label: 'Raramente húmeda',
        description: 'Raramente húmeda'
      }
    ]
  },
  {
    name: 'ACTIVIDAD',
    field: 'activity',
    options: [
      {
        value: 1,
        label: 'Encamado',
        description: 'Encamado'
      },
      {
        value: 2,
        label: 'En silla',
        description: 'En silla'
      },
      {
        value: 3,
        label: 'Deambula ocasionalmente',
        description: 'Deambula ocasionalmente'
      },
      {
        value: 4,
        label: 'Deambula frecuentemente',
        description: 'Deambula frecuentemente'
      }
    ]
  },
  {
    name: 'MOVILIDAD',
    field: 'mobility',
    options: [
      {
        value: 1,
        label: 'Completamente inmóvil',
        description: 'Completamente inmóvil'
      },
      {
        value: 2,
        label: 'Muy limitada',
        description: 'Muy limitada'
      },
      {
        value: 3,
        label: 'Ligeramente limitada',
        description: 'Ligeramente limitada'
      },
      {
        value: 4,
        label: 'Sin limitaciones',
        description: 'Sin limitaciones'
      }
    ]
  },
  {
    name: 'NUTRICIÓN',
    field: 'nutrition',
    options: [
      {
        value: 1,
        label: 'Muy pobre',
        description: 'Muy pobre'
      },
      {
        value: 2,
        label: 'Probablemente inadecuada',
        description: 'Probablemente inadecuada'
      },
      {
        value: 3,
        label: 'Adecuada',
        description: 'Adecuada'
      },
      {
        value: 4,
        label: 'Excelente',
        description: 'Excelente'
      }
    ]
  },
  {
    name: 'RIESGO DE LESIONES CUTÁNEAS',
    field: 'skinLesionRisk',
    options: [
      {
        value: 1,
        label: 'Problema',
        description: 'Problema'
      },
      {
        value: 2,
        label: 'Problema potencial',
        description: 'Problema potencial'
      },
      {
        value: 3,
        label: 'No existe problema aparente',
        description: 'No existe problema aparente'
      },
      {
        value: 4,
        label: 'TOTAL',
        description: 'TOTAL'
      }
    ]
  }
];

// Función para calcular el nivel de riesgo según la puntuación total y el tipo de escala
export const calculateRiskLevel = (
  totalScore: number,
  scaleType: 'bradenQ' | 'bradenBergstrom'
): 'very_high' | 'high' | 'moderate' | 'low' => {
  if (scaleType === 'bradenQ') {
    // Braden Q (menores de 5 años) - puntuación de 7 a 28
    if (totalScore <= 16) return 'very_high'; // Riesgo muy alto
    if (totalScore <= 20) return 'high'; // Riesgo alto
    if (totalScore <= 25) return 'moderate'; // Riesgo moderado
    return 'low'; // Riesgo leve (>= 25)
  } else {
    // Braden-Bergstrom (mayores de 5 años) - puntuación de 6 a 24
    // Según el Anexo 6:
    if (totalScore < 13) return 'very_high'; // Alto riesgo (< 13)
    if (totalScore <= 14) return 'high'; // Riesgo moderado (13-14)
    return 'low'; // Bajo riesgo (> 14)
  }
};

// Función para obtener la descripción del riesgo
export const getRiskDescription = (riskLevel: string, scaleType: 'bradenQ' | 'bradenBergstrom'): string => {
  if (scaleType === 'bradenQ') {
    switch (riskLevel) {
      case 'very_high':
        return 'Riesgo muy alto (≤ 16) - Reevaluación cada 24 horas';
      case 'high':
        return 'Riesgo alto (17-20) - Reevaluación cada 24 horas';
      case 'moderate':
        return 'Riesgo moderado (21-25) - Reevaluación cada 3 días';
      case 'low':
        return 'Riesgo leve (≥ 25) - Reevaluación cada 7 días';
      default:
        return '';
    }
  } else {
    switch (riskLevel) {
      case 'very_high':
      case 'high':
        return 'Alto riesgo (< 13) - Reevaluación diaria';
      case 'moderate':
        return 'Riesgo moderado (13-14) - Reevaluación cada 3 días';
      case 'low':
        return 'Bajo riesgo (> 14) - Reevaluación cada 7 días';
      default:
        return '';
    }
  }
};

// Función para obtener el color del riesgo
export const getRiskColor = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'very_high':
      return '#c0392b'; // Rojo oscuro
    case 'high':
      return '#e74c3c'; // Rojo
    case 'moderate':
      return '#f39c12'; // Naranja
    case 'low':
      return '#27ae60'; // Verde
    default:
      return '#95a5a6'; // Gris
  }
};

// Registros de ejemplo
export const mockBradenRecords: BradenRecord[] = [
  {
    id: '1',
    date: new Date(2025, 10, 9).toISOString(),
    professional: 'Dra. López Hernández',
    patientName: 'Ana García',
    patientAge: 36, // 3 años
    scaleType: 'bradenQ',
    mobility: 3,
    activity: 4,
    sensoryPerception: 4,
    moisture: 3,
    friction: 4,
    nutrition: 3,
    tissuePerfusionOxygenation: 4,
    totalScore: 25,
    riskLevel: 'low'
  },
  {
    id: '2',
    date: new Date(2025, 10, 5).toISOString(),
    professional: 'Dra. López Hernández',
    patientName: 'Carlos Martínez',
    patientAge: 24, // 2 años
    scaleType: 'bradenQ',
    mobility: 2,
    activity: 2,
    sensoryPerception: 3,
    moisture: 2,
    friction: 2,
    nutrition: 2,
    tissuePerfusionOxygenation: 3,
    totalScore: 16,
    riskLevel: 'very_high'
  },
  {
    id: '3',
    date: new Date(2025, 10, 8).toISOString(),
    professional: 'Dra. López Hernández',
    patientName: 'María López',
    patientAge: 84, // 7 años
    scaleType: 'bradenBergstrom',
    mobility: 3,
    activity: 3,
    sensoryPerception: 4,
    moisture: 4,
    nutrition: 3,
    skinLesionRisk: 3,
    totalScore: 20,
    riskLevel: 'low'
  }
];
