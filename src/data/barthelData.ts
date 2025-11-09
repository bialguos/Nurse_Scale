import { BarthelItem, BarthelRecord } from '../types/barthel';

export const barthelItems: BarthelItem[] = [
  {
    id: 1,
    name: "Comer",
    options: [
      { value: 0, label: "Dependiente. Necesita ser alimentado" },
      { value: 5, label: "Necesita ayuda para cortar, extender mantequilla, usar condimentos, etc." },
      { value: 10, label: "Independiente. Capaz de comer por sí solo en un tiempo razonable" }
    ]
  },
  {
    id: 2,
    name: "Trasladarse entre la silla y la cama",
    options: [
      { value: 0, label: "Incapaz, no se mantiene sentado" },
      { value: 5, label: "Necesita ayuda importante, puede estar sentado" },
      { value: 10, label: "Necesita algo de ayuda" },
      { value: 15, label: "Independiente" }
    ]
  },
  {
    id: 3,
    name: "Aseo personal",
    options: [
      { value: 0, label: "Necesita ayuda con el aseo personal" },
      { value: 5, label: "Independiente para lavarse la cara, las manos y los dientes, peinarse y afeitarse" }
    ]
  },
  {
    id: 4,
    name: "Uso del retrete",
    options: [
      { value: 0, label: "Dependiente" },
      { value: 5, label: "Necesita alguna ayuda, pero puede hacer algo solo" },
      { value: 10, label: "Independiente (entrar y salir, limpiarse y vestirse)" }
    ]
  },
  {
    id: 5,
    name: "Bañarse/Ducharse",
    options: [
      { value: 0, label: "Dependiente" },
      { value: 5, label: "Independiente para bañarse o ducharse" }
    ]
  },
  {
    id: 6,
    name: "Desplazarse",
    options: [
      { value: 0, label: "Inmóvil" },
      { value: 5, label: "Independiente en silla de ruedas en 50 m" },
      { value: 10, label: "Anda con pequeña ayuda de una persona" },
      { value: 15, label: "Independiente al menos 50 m, con cualquier tipo de muleta, excepto andador" }
    ]
  },
  {
    id: 7,
    name: "Subir y bajar escaleras",
    options: [
      { value: 0, label: "Incapaz" },
      { value: 5, label: "Necesita ayuda física o verbal, puede llevar cualquier tipo de muleta" },
      { value: 10, label: "Independiente para subir y bajar" }
    ]
  },
  {
    id: 8,
    name: "Vestirse y desvestirse",
    options: [
      { value: 0, label: "Dependiente" },
      { value: 5, label: "Necesita ayuda, pero puede hacer la mitad aproximadamente, sin ayuda" },
      { value: 10, label: "Independiente, incluyendo botones, cremalleras, cordones, etc." }
    ]
  },
  {
    id: 9,
    name: "Control de heces",
    options: [
      { value: 0, label: "Incontinente (o necesita que le suministren enema)" },
      { value: 5, label: "Accidente excepcional (uno/semana)" },
      { value: 10, label: "Continente" }
    ]
  },
  {
    id: 10,
    name: "Control de orina",
    options: [
      { value: 0, label: "Incontinente, o sondado incapaz de cambiarse la bolsa" },
      { value: 5, label: "Accidente excepcional (máximo uno/24 horas)" },
      { value: 10, label: "Continente" }
    ]
  }
];

export const mockBarthelRecords: BarthelRecord[] = [
  {
    id: "1",
    date: "2025-01-15T10:30:00",
    score: 85,
    professional: "Dr. García Martínez",
    items: [
      { itemId: 1, value: 10 },
      { itemId: 2, value: 15 },
      { itemId: 3, value: 5 },
      { itemId: 4, value: 10 },
      { itemId: 5, value: 5 },
      { itemId: 6, value: 10 },
      { itemId: 7, value: 5 },
      { itemId: 8, value: 10 },
      { itemId: 9, value: 5 },
      { itemId: 10, value: 10 }
    ]
  },
  {
    id: "2",
    date: "2025-02-20T14:15:00",
    score: 90,
    professional: "Dra. López Sánchez",
    items: [
      { itemId: 1, value: 10 },
      { itemId: 2, value: 15 },
      { itemId: 3, value: 5 },
      { itemId: 4, value: 10 },
      { itemId: 5, value: 5 },
      { itemId: 6, value: 15 },
      { itemId: 7, value: 5 },
      { itemId: 8, value: 10 },
      { itemId: 9, value: 5 },
      { itemId: 10, value: 10 }
    ]
  }
];