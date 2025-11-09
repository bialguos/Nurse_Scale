import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { generateChartData, monthsToAge } from '../utils/percentilesUtils';

interface PercentileChartProps {
  gender: 'male' | 'female';
  ageInMonths: number;
  weight: number;
  height: number;
}

const PercentileChart = ({ gender, ageInMonths, weight, height }: PercentileChartProps) => {
  // Determinar rango de edad para mostrar en la gráfica
  const getAgeRange = (age: number): { min: number; max: number } => {
    if (age <= 24) return { min: 0, max: 24 }; // 0-2 años
    if (age <= 60) return { min: 24, max: 60 }; // 2-5 años
    if (age <= 120) return { min: 60, max: 120 }; // 5-10 años
    return { min: 120, max: 216 }; // 10-18 años
  };

  const ageRange = getAgeRange(ageInMonths);
  const weightData = generateChartData('weight', gender, ageRange.min, ageRange.max);
  const heightData = generateChartData('height', gender, ageRange.min, ageRange.max);

  // Formatear edad en el eje X
  const formatXAxis = (value: number) => {
    const { years, months } = monthsToAge(value);
    if (years === 0) return `${months}m`;
    if (months === 0) return `${years}a`;
    return `${years}a ${months}m`;
  };

  // Punto actual del paciente
  const patientWeightPoint = { age: ageInMonths, value: weight };
  const patientHeightPoint = { age: ageInMonths, value: height };

  return (
    <div className="barthel-scale-info" style={{ marginTop: '20px' }}>
      <h3>Gráficas de Percentiles</h3>

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
              label={{ value: 'Edad', position: 'insideBottom', offset: -10 }}
              tickFormatter={formatXAxis}
              stroke="#666"
            />
            <YAxis
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

            {/* Punto del paciente */}
            <ReferenceDot
              x={patientWeightPoint.age}
              y={patientWeightPoint.value}
              r={8}
              fill="#3498db"
              stroke="#2c3e50"
              strokeWidth={2}
              label={{
                value: `Paciente: ${weight} kg`,
                position: 'top',
                fill: '#2c3e50',
                fontSize: 12,
                fontWeight: 'bold',
              }}
            />
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
              label={{ value: 'Edad', position: 'insideBottom', offset: -10 }}
              tickFormatter={formatXAxis}
              stroke="#666"
            />
            <YAxis
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

            {/* Punto del paciente */}
            <ReferenceDot
              x={patientHeightPoint.age}
              y={patientHeightPoint.value}
              r={8}
              fill="#3498db"
              stroke="#2c3e50"
              strokeWidth={2}
              label={{
                value: `Paciente: ${height} cm`,
                position: 'top',
                fill: '#2c3e50',
                fontSize: 12,
                fontWeight: 'bold',
              }}
            />
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
          <p>
            <strong>P90-P97:</strong> <span style={{ color: '#ef4444' }}>Alto</span> - Puede requerir
            evaluación nutricional
          </p>
        </div>
      </div>
    </div>
  );
};

export default PercentileChart;
