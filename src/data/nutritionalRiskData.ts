import { NutritionalRiskItem, NutritionalRiskRecord } from '../types/nutritionalRisk';

export const nutritionalRiskItems: NutritionalRiskItem[] = [
  {
    id: 1,
    name: "Diagnóstico",
    options: [
      { value: 3, label: "Implica deterioro nutricional (ejemplo: anorexia nerviosa, enfermedad de Crohn, fibrosis quística, quemaduras)" },
      { value: 2, label: "Puede implicar deterioro nutricional (ejemplo: enfermedad celíaca, enfermedad inflamatoria intestinal, síndrome de malabsorción)" },
      { value: 1, label: "Ninguna implicación nutricional (ejemplo: condiciones quirúrgicas menores, infecciones leves)" },
      { value: 0, label: "Sin diagnóstico que afecte nutrición" }
    ]
  },
  {
    id: 2,
    name: "Ingesta nutricional",
    options: [
      { value: 3, label: "Sin ingesta nutricional (más de 5 días sin comer) o muy poca ingesta" },
      { value: 2, label: "Ingesta reciente pobre e inadecuada (2-5 días)" },
      { value: 1, label: "Ingesta disminuida o inestable (1-2 días)" },
      { value: 0, label: "Ningún problema nutricional / Ingesta normal" }
    ]
  },
  {
    id: 3,
    name: "Peso y talla",
    options: [
      { value: 3, label: "IMC por debajo del percentil 2 o pérdida de peso reciente >10%" },
      { value: 2, label: "IMC por debajo del percentil 9 o pérdida de peso reciente 5-10%" },
      { value: 1, label: "IMC por debajo del percentil 25 o pérdida de peso reciente 2-5%" },
      { value: 0, label: "IMC por encima del percentil 25 o sin pérdida de peso reciente" }
    ]
  }
];

export const mockNutritionalRiskRecords: NutritionalRiskRecord[] = [
  {
    id: "1",
    date: "2025-01-15T10:00:00",
    score: 4,
    professional: "Dra. Martínez López",
    items: [
      { itemId: 1, value: 1 },
      { itemId: 2, value: 2 },
      { itemId: 3, value: 1 }
    ]
  },
  {
    id: "2",
    date: "2025-02-20T14:30:00",
    score: 6,
    professional: "Dr. Sánchez Ruiz",
    items: [
      { itemId: 1, value: 2 },
      { itemId: 2, value: 2 },
      { itemId: 3, value: 2 }
    ]
  }
];
