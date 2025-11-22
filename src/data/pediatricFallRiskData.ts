import { PediatricFallRiskCategory } from '../types/pediatricFallRisk';

export const pediatricFallRiskCategories: PediatricFallRiskCategory[] = [
  {
    name: 'Edad',
    field: 'age',
    options: [
      { value: 4, label: 'Menos de 3 años', description: 'Paciente menor de 3 años de edad' },
      { value: 3, label: 'De 3 a 7 años', description: 'Paciente entre 3 y 7 años de edad' },
      { value: 2, label: 'De 7 a 13 años', description: 'Paciente entre 7 y 13 años de edad' },
      { value: 1, label: 'Más de 13 años', description: 'Paciente mayor de 13 años de edad' },
    ],
  },
  {
    name: 'Género',
    field: 'gender',
    options: [
      { value: 2, label: 'Hombre', description: 'Paciente de género masculino' },
      { value: 1, label: 'Mujer', description: 'Paciente de género femenino' },
    ],
  },
  {
    name: 'Diagnóstico',
    field: 'diagnosis',
    options: [
      { value: 4, label: 'Problemas neurológicos', description: 'Diagnóstico de problemas neurológicos' },
      { value: 3, label: 'Alteraciones de oxigenación', description: 'Problemas respiratorios, anemia, deshidratación, anorexia, vértigo' },
      { value: 2, label: 'Trastornos psíquicos o de conducta', description: 'Diagnóstico de trastornos psíquicos o de conducta' },
      { value: 1, label: 'Otro diagnóstico', description: 'Cualquier otro diagnóstico no mencionado' },
    ],
  },
  {
    name: 'Deterioro Cognitivo',
    field: 'cognitiveImpairment',
    options: [
      { value: 3, label: 'No conoce sus limitaciones', description: 'El paciente no conoce sus limitaciones' },
      { value: 2, label: 'Se le olvida sus limitaciones', description: 'El paciente olvida sus limitaciones' },
      { value: 1, label: 'Orientado en sus propias capacidades', description: 'El paciente está orientado en sus propias capacidades' },
    ],
  },
  {
    name: 'Factores Ambientales',
    field: 'environmentalFactors',
    options: [
      { value: 4, label: 'Historia de caída desde la cama', description: 'Historia de caída de bebés o niños pequeños desde la cama' },
      { value: 3, label: 'Utiliza dispositivos de ayuda', description: 'Utiliza dispositivos de ayuda en la cuna, iluminación, muebles' },
      { value: 2, label: 'Paciente en la cama', description: 'Paciente que permanece en la cama' },
      { value: 1, label: 'Paciente que deambula', description: 'Paciente que puede caminar' },
    ],
  },
  {
    name: 'Cirugía o Sedación Anestésica',
    field: 'surgeryOrSedation',
    options: [
      { value: 3, label: 'Dentro de las 24 horas', description: 'Cirugía o sedación dentro de las últimas 24 horas' },
      { value: 2, label: 'Dentro de 48 horas', description: 'Cirugía o sedación dentro de las últimas 48 horas' },
      { value: 1, label: 'Más de 48 horas / ninguna', description: 'Cirugía o sedación hace más de 48 horas o ninguna' },
    ],
  },
  {
    name: 'Medicación',
    field: 'medication',
    options: [
      { value: 3, label: 'Múltiples medicamentos sedantes', description: 'Uso de múltiples medicamentos sedantes: Hipnóticos, Barbitúricos, Fenotiazinas, Antidepresivos, Laxantes/diuréticos, narcóticos (Excluyen pacientes de UCIP con sedantes o relajantes)' },
      { value: 2, label: 'Uno de los medicamentos', description: 'Uso de uno de los medicamentos antes mencionados' },
      { value: 1, label: 'Ninguno', description: 'No usa medicamentos sedantes' },
    ],
  },
];

export const calculateRiskLevel = (totalScore: number): 'none' | 'low' | 'high' => {
  if (totalScore < 7) return 'none';
  if (totalScore >= 7 && totalScore <= 11) return 'low';
  return 'high'; // >= 12
};

export const getRiskDescription = (riskLevel: 'none' | 'low' | 'high'): string => {
  switch (riskLevel) {
    case 'none':
      return 'Sin riesgo';
    case 'low':
      return 'Riesgo bajo';
    case 'high':
      return 'Riesgo alto';
    default:
      return '';
  }
};

export const getRiskColor = (riskLevel: 'none' | 'low' | 'high'): string => {
  switch (riskLevel) {
    case 'none':
      return '#27ae60'; // Verde
    case 'low':
      return '#f39c12'; // Amarillo/Naranja
    case 'high':
      return '#e74c3c'; // Rojo
    default:
      return '#95a5a6';
  }
};
