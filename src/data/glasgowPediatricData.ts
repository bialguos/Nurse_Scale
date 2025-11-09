import { GlasgowPediatricItem, GlasgowPediatricRecord } from '../types/glasgowPediatric';

export const glasgowPediatricItems: GlasgowPediatricItem[] = [
  {
    id: 1,
    name: "Apertura ocular",
    category: "ocular",
    options: [
      { value: 4, label: "Espontánea" },
      { value: 3, label: "A la voz" },
      { value: 2, label: "Al dolor" },
      { value: 1, label: "Ninguna" }
    ]
  },
  {
    id: 2,
    name: "Respuesta verbal",
    category: "verbal",
    options: [
      { value: 5, label: "Palabras apropiadas, sonrisa social, fija la mirada y sigue objetos" },
      { value: 4, label: "Llanto consolable, interacción inapropiada" },
      { value: 3, label: "Llanto persistente e inconsolable, quejidos, irritable" },
      { value: 2, label: "Llanto e irritabilidad constante, agitado" },
      { value: 1, label: "Ninguna" }
    ]
  },
  {
    id: 3,
    name: "Respuesta motora",
    category: "motora",
    options: [
      { value: 6, label: "Movimientos espontáneos normales" },
      { value: 5, label: "Localiza el dolor, retirada al tacto" },
      { value: 4, label: "Retira el miembro al dolor" },
      { value: 3, label: "Flexión anormal (decorticación)" },
      { value: 2, label: "Extensión anormal (descerebración)" },
      { value: 1, label: "Ninguna" }
    ]
  }
];

export const mockGlasgowPediatricRecords: GlasgowPediatricRecord[] = [
  {
    id: "1",
    date: "2025-01-08T10:30:00",
    score: 15,
    professional: "Dra. López Hernández",
    items: [
      { itemId: 1, value: 4 },
      { itemId: 2, value: 5 },
      { itemId: 3, value: 6 }
    ],
    categoryScores: {
      ocular: 4,
      verbal: 5,
      motora: 6
    }
  },
  {
    id: "2",
    date: "2025-01-09T14:15:00",
    score: 10,
    professional: "Dr. Ramírez García",
    items: [
      { itemId: 1, value: 3 },
      { itemId: 2, value: 3 },
      { itemId: 3, value: 4 }
    ],
    categoryScores: {
      ocular: 3,
      verbal: 3,
      motora: 4
    }
  }
];
