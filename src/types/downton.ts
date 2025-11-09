export interface DowntonItem {
  id: number;
  name: string;
  options: {
    value: number;
    label: string;
  }[];
}

export interface DowntonRecord {
  id: string;
  date: string;
  score: number;
  professional: string;
  items: {
    
    selectedOptions: { value: number; label: string }[];
    itemId: number;
    value: number;
  }[];
}