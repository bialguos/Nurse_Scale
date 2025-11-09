export interface BarthelItem {
  id: number;
  name: string;
  options: {
    value: number;
    label: string;
  }[];
}

export interface BarthelRecord {
  id: string;
  date: string;
  score: number;
  professional: string;
  items: {
    itemId: number;
    value: number;
  }[];
}