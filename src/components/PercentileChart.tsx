import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceDot,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { generateChartData, monthsToAge } from '../utils/percentilesUtils';
import { PercentileRecord } from '../types/percentiles';

interface PercentileChartProps {
  gender: 'male' | 'female';
  ageInMonths: number;
  weight: number;
  height: number;
  historicalRecords?: PercentileRecord[];
  showAllGenders?: boolean; // Nueva prop para mostrar todos los géneros
}

const PercentileChart = ({ gender, ageInMonths, weight, height, historicalRecords, showAllGenders = false }: PercentileChartProps) => {
  // Determinar rango de edad para mostrar en la gráfica
  const getAgeRange = (age: number): { min: number; max: number } => {
    if (age <= 24) return { min: 0, max: 24 }; // 0-2 años
    if (age <= 60) return { min: 24, max: 60 }; // 2-5 años
    if (age <= 120) return { min: 60, max: 120 }; // 5-10 años
    return { min: 120, max: 216 }; // 10-18 años
  };

  // Determinar rango de edad considerando todos los registros históricos
  const allAges = historicalRecords ? [ageInMonths, ...historicalRecords.map(r => r.patientAge)] : [ageInMonths];
  const maxAge = Math.max(...allAges);
  const ageRange = getAgeRange(maxAge);
  const weightData = generateChartData('weight', gender, ageRange.min, ageRange.max);
  const heightData = generateChartData('height', gender, ageRange.min, ageRange.max);

  // Calcular dominio del eje Y para peso
  const weightValues = weightData.flatMap(d => [d.P3, d.P10, d.P25, d.P50, d.P75, d.P90, d.P97]);
  const minWeight = Math.floor(Math.min(...weightValues) * 0.9);
  const maxWeight = Math.ceil(Math.max(...weightValues) * 1.1);

  // Calcular dominio del eje Y para talla
  const heightValues = heightData.flatMap(d => [d.P3, d.P10, d.P25, d.P50, d.P75, d.P90, d.P97]);
  const minHeight = Math.floor(Math.min(...heightValues) * 0.95);
  const maxHeight = Math.ceil(Math.max(...heightValues) * 1.05);

  // Formatear edad en el eje X
  const formatXAxis = (value: number) => {
    const { years, months } = monthsToAge(value);
    if (years === 0) return `${months}m`;
    if (months === 0) return `${years}a`;
    return `${years}a ${months}m`;
  };

  // Puntos históricos (filtrados por género si no showAllGenders)
  const historicalWeightPoints = historicalRecords
    ? historicalRecords
        .filter(record => (showAllGenders || record.gender === gender) && record.patientAge > 0)
        .map(record => ({
          age: record.patientAge,
          weight: record.weight,
          date: record.date,
          patientName: record.patientName,
          id: record.id,
          gender: record.gender
        }))
    : [];

  const historicalHeightPoints = historicalRecords
    ? historicalRecords
        .filter(record => (showAllGenders || record.gender === gender) && record.patientAge > 0)
        .map(record => ({
          age: record.patientAge,
          height: record.height,
          date: record.date,
          patientName: record.patientName,
          id: record.id,
          gender: record.gender
        }))
    : [];


  return (
    <div className="barthel-scale-info" style={{ marginTop: '20px' }}>
      <h3>Gráficas de Percentiles {historicalRecords ? 'con Historial' : ''}</h3>

      {/* Debug info */}
      {historicalRecords && historicalRecords.length > 0 && (
        <div style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '10px', fontSize: '0.9em' }}>
          <strong>Registros históricos ({gender}):</strong> {historicalWeightPoints.length} puntos
          {historicalWeightPoints.map((point, index) => (
            <div key={index}>
              • Edad: {point.age} meses, Peso: {point.value} kg, Talla: {historicalHeightPoints[index]?.value} cm
            </div>
          ))}
        </div>
      )}

      {/* Gráfica de Peso */}
      <div style={{ marginTop: '20px', marginBottom: '40px' }}>
        <h4 style={{ textAlign: 'center', marginBottom: '10px', color: '#2c3e50' }}>
          Percentiles de Peso ({gender === 'male' ? 'Niños' : 'Niñas'})
        </h4>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={weightData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="age"
              type="number"
              domain={[ageRange.min, ageRange.max]}
              label={{ value: 'Edad', position: 'insideBottom', offset: -10 }}
              tickFormatter={formatXAxis}
              stroke="#666"
            />
            <YAxis
              domain={[minWeight, maxWeight]}
              label={{ value: 'Peso (kg)', angle: -90, position: 'insideLeft' }}
              stroke="#666"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
              formatter={(value: number) => [`${value.toFixed(1)} kg`, '']}
              labelFormatter={(label) => `Edad: ${formatXAxis(label as number)}`}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />

            {/* Líneas de percentiles */}
            <Line
              type="monotone"
              dataKey="P3"
              stroke="#ef4444"
              strokeWidth={1.5}
              dot={false}
              name="P3"
            />
            <Line
              type="monotone"
              dataKey="P10"
              stroke="#f97316"
              strokeWidth={1.5}
              dot={false}
              name="P10"
            />
            <Line
              type="monotone"
              dataKey="P25"
              stroke="#eab308"
              strokeWidth={1.5}
              dot={false}
              name="P25"
            />
            <Line
              type="monotone"
              dataKey="P50"
              stroke="#22c55e"
              strokeWidth={2.5}
              dot={false}
              name="P50"
            />
            <Line
              type="monotone"
              dataKey="P75"
              stroke="#eab308"
              strokeWidth={1.5}
              dot={false}
              name="P75"
            />
            <Line
              type="monotone"
              dataKey="P90"
              stroke="#f97316"
              strokeWidth={1.5}
              dot={false}
              name="P90"
            />
            <Line
              type="monotone"
              dataKey="P97"
              stroke="#ef4444"
              strokeWidth={1.5}
              dot={false}
              name="P97"
            />

            {/* Puntos históricos usando Scatter */}
            <Scatter
              name="Registros históricos"
              data={historicalWeightPoints}
              fill="#e74c3c"
              shape="circle"
              dataKey="weight"
            />

            {/* Punto del paciente actual (solo si hay datos válidos) */}
            {ageInMonths > 0 && weight > 0 && height > 0 && (
              <Scatter
                name="Paciente actual"
                data={[{ age: ageInMonths, weight: weight }]}
                fill="#3498db"
                shape="circle"
                dataKey="weight"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfica de Talla */}
      <div style={{ marginTop: '40px' }}>
        <h4 style={{ textAlign: 'center', marginBottom: '10px', color: '#2c3e50' }}>
          Percentiles de Talla ({gender === 'male' ? 'Niños' : 'Niñas'})
        </h4>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={heightData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="age"
              type="number"
              domain={[ageRange.min, ageRange.max]}
              label={{ value: 'Edad', position: 'insideBottom', offset: -10 }}
              tickFormatter={formatXAxis}
              stroke="#666"
            />
            <YAxis
              domain={[minHeight, maxHeight]}
              label={{ value: 'Talla (cm)', angle: -90, position: 'insideLeft' }}
              stroke="#666"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
              formatter={(value: number) => [`${value.toFixed(1)} cm`, '']}
              labelFormatter={(label) => `Edad: ${formatXAxis(label as number)}`}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />

            {/* Líneas de percentiles */}
            <Line
              type="monotone"
              dataKey="P3"
              stroke="#ef4444"
              strokeWidth={1.5}
              dot={false}
              name="P3"
            />
            <Line
              type="monotone"
              dataKey="P10"
              stroke="#f97316"
              strokeWidth={1.5}
              dot={false}
              name="P10"
            />
            <Line
              type="monotone"
              dataKey="P25"
              stroke="#eab308"
              strokeWidth={1.5}
              dot={false}
              name="P25"
            />
            <Line
              type="monotone"
              dataKey="P50"
              stroke="#22c55e"
              strokeWidth={2.5}
              dot={false}
              name="P50"
            />
            <Line
              type="monotone"
              dataKey="P75"
              stroke="#eab308"
              strokeWidth={1.5}
              dot={false}
              name="P75"
            />
            <Line
              type="monotone"
              dataKey="P90"
              stroke="#f97316"
              strokeWidth={1.5}
              dot={false}
              name="P90"
            />
            <Line
              type="monotone"
              dataKey="P97"
              stroke="#ef4444"
              strokeWidth={1.5}
              dot={false}
              name="P97"
            />

            {/* Puntos históricos usando Scatter */}
            <Scatter
              name="Registros históricos"
              data={historicalHeightPoints}
              fill="#e74c3c"
              shape="circle"
              dataKey="height"
            />

            {/* Punto del paciente actual (solo si hay datos válidos) */}
            {ageInMonths > 0 && weight > 0 && height > 0 && (
              <Scatter
                name="Paciente actual"
                data={[{ age: ageInMonths, height: height }]}
                fill="#3498db"
                shape="circle"
                dataKey="height"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '10px', color: '#2c3e50' }}>Interpretación de Percentiles</h4>
        <div style={{ fontSize: '0.9em', color: '#555', lineHeight: '1.6' }}>
          <p style={{ marginBottom: '8px' }}>
            <strong>P3-P10:</strong> <span style={{ color: '#ef4444' }}>Bajo</span> - Puede requerir
            evaluación nutricional
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>P10-P25:</strong> <span style={{ color: '#f97316' }}>Bajo normal</span> -
            Seguimiento recomendado
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>P25-P75:</strong> <span style={{ color: '#22c55e' }}>Normal</span> - Rango
            saludable
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>P75-P90:</strong> <span style={{ color: '#f97316' }}>Alto normal</span> -
            Seguimiento recomendado
          </p>
          <p style={{ marginBottom: '8px' }}>
            <strong>P90-P97:</strong> <span style={{ color: '#ef4444' }}>Alto</span> - Puede requerir
            evaluación nutricional
          </p>
          <hr style={{ margin: '10px 0', borderColor: '#ddd' }} />
          <p style={{ marginTop: '10px' }}>
            <strong>Leyenda de puntos:</strong>
          </p>
          <p style={{ marginBottom: '4px' }}>
            • <span style={{ color: '#3498db', fontWeight: 'bold' }}>Punto azul grande:</span> Paciente actual
          </p>
          <p>
            • <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>Puntos rojos:</span> Registros históricos
          </p>
        </div>
      </div>
    </div>
  );
};

export default PercentileChart;
