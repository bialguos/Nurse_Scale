export interface PercentileRecord {
  id: string;
  date: string;
  professional: string;
  patientName: string;
  patientAge: number; // en meses para precisión
  patientAgeYears: number;
  patientAgeMonths: number;
  gender: 'male' | 'female';
  weight: number; // kg
  height: number; // cm
  weightPercentile: number;
  heightPercentile: number;
  percentileDifference: number;
}

export interface PercentileDataPoint {
  age: number; // en meses
  p04: number;
  p2: number;
  p9: number;
  p25: number;
  p50: number;
  p75: number;
  p91: number;
  p98: number;
  p996: number;
}

export interface PercentileData {
  weight: {
    male: PercentileDataPoint[];
    female: PercentileDataPoint[];
  };
  height: {
    male: PercentileDataPoint[];
    female: PercentileDataPoint[];
  };
}
