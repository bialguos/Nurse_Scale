export interface NutritionalRiskItem {
  id: number;
  name: string;
  options: {
    value: number;
    label: string;
  }[];
}

export interface NutritionalRiskRecord {
  id: string;
  date: string;
  score: number;
  professional: string;
  items: {
    itemId: number;
    value: number;
  }[];
}
