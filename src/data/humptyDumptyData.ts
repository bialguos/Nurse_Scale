import { HumptyDumptyItem, HumptyDumptyRecord } from '../types/humptyDumpty';

export const humptyDumptyItems: HumptyDumptyItem[] = [
  {
    id: 1,
    name: "Edad",
    options: [
      { value: 4, label: "Menos de 3 años" },
      { value: 3, label: "3 a 7 años" },
      { value: 2, label: "7 a 13 años" },
      { value: 1, label: "Más de 13 años" }
    ]
  },
  {
    id: 2,
    name: "Sexo",
    options: [
      { value: 2, label: "Masculino" },
      { value: 1, label: "Femenino" }
    ]
  },
  {
    id: 3,
    name: "Diagnóstico",
    options: [
      { value: 4, label: "Diagnóstico neurológico" },
      { value: 3, label: "Alteraciones en la oxigenación (respiratorias, anemia, deshidratación, anorexia)" },
      { value: 2, label: "Trastornos psicológicos/conductuales" },
      { value: 1, label: "Otros diagnósticos" }
    ]
  },
  {
    id: 4,
    name: "Deterioro cognitivo",
    options: [
      { value: 3, label: "No conoce sus limitaciones" },
      { value: 2, label: "Se le olvidan las limitaciones" },
      { value: 1, label: "Orientado en sus propias capacidades" }
    ]
  },
  {
    id: 5,
    name: "Factores ambientales",
    options: [
      { value: 4, label: "Historia de caídas (durante la hospitalización actual)" },
      { value: 3, label: "Paciente en cama de hospital" },
      { value: 2, label: "Paciente que utiliza ayudas (bastón, andador, etc.)" },
      { value: 1, label: "Paciente que se moviliza sin ayuda" }
    ]
  },
  {
    id: 6,
    name: "Respuesta a la cirugía/sedación/anestesia",
    options: [
      { value: 3, label: "En las 24 horas" },
      { value: 2, label: "En las 48 horas" },
      { value: 1, label: "Más de 48 horas / ninguna" }
    ]
  },
  {
    id: 7,
    name: "Medicamentos",
    options: [
      { value: 3, label: "Uso de múltiples medicamentos: sedantes, hipnóticos, barbitúricos, fenotiazinas, antidepresivos, laxantes, diuréticos, narcóticos" },
      { value: 2, label: "Uso de uno de los medicamentos mencionados" },
      { value: 1, label: "Otros medicamentos / ninguno" }
    ]
  }
];

export const mockHumptyDumptyRecords: HumptyDumptyRecord[] = [
  {
    id: "1",
    date: "2025-01-10T09:30:00",
    score: 16,
    professional: "Dr. Rodríguez Pérez",
    items: [
      { itemId: 1, value: 3 },
      { itemId: 2, value: 2 },
      { itemId: 3, value: 3 },
      { itemId: 4, value: 2 },
      { itemId: 5, value: 2 },
      { itemId: 6, value: 2 },
      { itemId: 7, value: 2 }
    ]
  },
  {
    id: "2",
    date: "2025-02-15T11:45:00",
    score: 14,
    professional: "Dra. Fernández López",
    items: [
      { itemId: 1, value: 2 },
      { itemId: 2, value: 1 },
      { itemId: 3, value: 3 },
      { itemId: 4, value: 2 },
      { itemId: 5, value: 2 },
      { itemId: 6, value: 2 },
      { itemId: 7, value: 2 }
    ]
  }
];