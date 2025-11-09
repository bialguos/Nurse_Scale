export interface HumptyDumptyItem {
  id: number;
  name: string;
  options: {
    value: number;
    label: string;
  }[];
}

export interface HumptyDumptyRecord {
  id: string;
  date: string;
  score: number;
  professional: string;
  items: {
    itemId: number;
    value: number;
  }[];
}