export interface GlasgowPediatricItem {
  id: number;
  name: string;
  category: 'ocular' | 'verbal' | 'motora';
  options: {
    value: number;
    label: string;
  }[];
}

export interface GlasgowPediatricRecord {
  id: string;
  date: string;
  score: number;
  professional: string;
  items: {
    itemId: number;
    value: number;
  }[];
  categoryScores: {
    ocular: number;
    verbal: number;
    motora: number;
  };
}
