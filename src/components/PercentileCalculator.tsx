import { useState } from 'react';
import { BMICalculatorInput, BMICalculatorResult } from '../types/percentile';
import { calculateBMIPercentile, convertToMonths, validateInput } from '../utils/percentileUtils';
import '../styles/PercentileCalculator.css';

interface PercentileCalculatorProps {
  onResultChange?: (result: BMICalculatorResult | null) => void;
}

const PercentileCalculator = ({ onResultChange }: PercentileCalculatorProps) => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [ageYears, setAgeYears] = useState<string>('');
  const [ageMonths, setAgeMonths] = useState<string>('');
  const [sex, setSex] = useState<'M' | 'F' | ''>('');
  const [result, setResult] = useState<BMICalculatorResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleCalculate = () => {
    const totalMonths = convertToMonths(
      parseFloat(ageYears) || 0,
      parseFloat(ageMonths) || 0
    );

    const input: Partial<BMICalculatorInput> = {
      weight: parseFloat(weight),
      height: parseFloat(height),
      ageMonths: totalMonths,
      sex: sex as 'M' | 'F'
    };

    const validationErrors = validateInput(input);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setResult(null);
      if (onResultChange) onResultChange(null);
      return;
    }

    setErrors([]);
    const calculatedResult = calculateBMIPercentile(input as BMICalculatorInput);
    setResult(calculatedResult);
    if (onResultChange) onResultChange(calculatedResult);
  };

  const handleClear = () => {
    setWeight('');
    setHeight('');
    setAgeYears('');
    setAgeMonths('');
    setSex('');
    setResult(null);
    setErrors([]);
    if (onResultChange) onResultChange(null);
  };

  const getResultColor = (value?: number) => {
    if (!value && value !== 0) return '#6b7280';
    if (value === 3) return '#dc2626'; // Rojo - Alto riesgo
    if (value === 2) return '#f59e0b'; // Naranja - Riesgo moderado
    if (value === 1) return '#fbbf24'; // Amarillo - Riesgo bajo
    return '#10b981'; // Verde - Sin riesgo
  };

  return (
    <div className="percentile-calculator">
      <h3 className="calculator-title">Calculadora de Percentiles de IMC</h3>
      <p className="calculator-subtitle">
        Herramienta para determinar el percentil de IMC en pacientes pediátricos
      </p>

      <div className="calculator-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="weight">Peso (kg)</label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Ej: 25.5"
              step="0.1"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="height">Talla (cm)</label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Ej: 120"
              step="0.1"
              min="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="ageYears">Edad (años)</label>
            <input
              type="number"
              id="ageYears"
              value={ageYears}
              onChange={(e) => setAgeYears(e.target.value)}
              placeholder="Ej: 5"
              min="0"
              max="19"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ageMonths">Meses adicionales</label>
            <input
              type="number"
              id="ageMonths"
              value={ageMonths}
              onChange={(e) => setAgeMonths(e.target.value)}
              placeholder="Ej: 6"
              min="0"
              max="11"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group sex-group">
            <label>Sexo</label>
            <div className="sex-options">
              <label className="sex-option">
                <input
                  type="radio"
                  name="sex"
                  value="M"
                  checked={sex === 'M'}
                  onChange={(e) => setSex(e.target.value as 'M')}
                />
                <span>Masculino</span>
              </label>
              <label className="sex-option">
                <input
                  type="radio"
                  name="sex"
                  value="F"
                  checked={sex === 'F'}
                  onChange={(e) => setSex(e.target.value as 'F')}
                />
                <span>Femenino</span>
              </label>
            </div>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="error-messages">
            {errors.map((error, index) => (
              <div key={index} className="error-message">
                {error}
              </div>
            ))}
          </div>
        )}

        <div className="calculator-actions">
          <button type="button" className="btn-calculate" onClick={handleCalculate}>
            Calcular
          </button>
          <button type="button" className="btn-clear" onClick={handleClear}>
            Limpiar
          </button>
        </div>
      </div>

      {result && (
        <div className="calculator-result">
          <div className="result-header">
            <h4>Resultados</h4>
          </div>
          <div className="result-grid">
            <div className="result-item">
              <span className="result-label">IMC:</span>
              <span className="result-value">{result.bmi} kg/m²</span>
            </div>
            <div className="result-item">
              <span className="result-label">Percentil:</span>
              <span className="result-value">P{result.percentile}</span>
            </div>
            <div className="result-item full-width">
              <span className="result-label">Categoría:</span>
              <span className="result-value">{result.category}</span>
            </div>
            <div
              className="result-item full-width highlight"
              style={{ borderLeft: `4px solid ${getResultColor(result.nutritionalRiskValue)}` }}
            >
              <span className="result-label">Valor para escala STAMP:</span>
              <span
                className="result-value-large"
                style={{ color: getResultColor(result.nutritionalRiskValue) }}
              >
                {result.nutritionalRiskValue} puntos
              </span>
            </div>
          </div>
          <div className="result-note">
            <strong>Nota:</strong> Este valor puede ser usado directamente en el ítem "Peso y talla"
            de la escala de valoración nutricional STAMP.
          </div>
        </div>
      )}
    </div>
  );
};

export default PercentileCalculator;
