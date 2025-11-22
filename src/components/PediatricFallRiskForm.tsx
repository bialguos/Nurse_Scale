import { useEffect, useState } from 'react';
import { PediatricFallRiskRecord } from '../types/pediatricFallRisk';
import {
  pediatricFallRiskCategories,
  calculateRiskLevel,
  getRiskDescription,
  getRiskColor,
} from '../data/pediatricFallRiskData';

interface PediatricFallRiskFormProps {
  initialRecord?: PediatricFallRiskRecord;
  onSave: (record: PediatricFallRiskRecord) => void;
  onCancel: () => void;
}

const PediatricFallRiskForm = ({ initialRecord, onSave, onCancel }: PediatricFallRiskFormProps) => {
  const [record, setRecord] = useState<Partial<PediatricFallRiskRecord>>({
    id: '',
    date: new Date().toISOString(),
    professional: 'Dra. López Hernández',
    patientName: 'Paciente',
    age: undefined,
    gender: undefined,
    diagnosis: undefined,
    cognitiveImpairment: undefined,
    environmentalFactors: undefined,
    surgeryOrSedation: undefined,
    medication: undefined,
    totalScore: 0,
    riskLevel: 'none',
  });

  // Calcular puntuación total y nivel de riesgo
  useEffect(() => {
    const fields = [
      record.age,
      record.gender,
      record.diagnosis,
      record.cognitiveImpairment,
      record.environmentalFactors,
      record.surgeryOrSedation,
      record.medication,
    ];

    let total = 0;
    let allFieldsFilled = true;

    fields.forEach((field) => {
      if (field !== undefined && field > 0) {
        total += field;
      } else {
        allFieldsFilled = false;
      }
    });

    if (allFieldsFilled && total !== record.totalScore) {
      const riskLevel = calculateRiskLevel(total);
      setRecord((prev) => ({
        ...prev,
        totalScore: total,
        riskLevel,
      }));
    }
  }, [
    record.age,
    record.gender,
    record.diagnosis,
    record.cognitiveImpairment,
    record.environmentalFactors,
    record.surgeryOrSedation,
    record.medication,
    record.totalScore,
  ]);

  useEffect(() => {
    if (initialRecord) {
      setRecord(initialRecord);
    }
  }, [initialRecord]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecord((prev) => ({ ...prev, date: new Date(e.target.value).toISOString() }));
  };

  const formattedDate = record.date
    ? new Date(record.date).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!record.professional?.trim()) {
      alert('Por favor ingrese el nombre del profesional');
      return;
    }

    // Validar que todos los campos requeridos estén completos
    if (
      !record.age ||
      !record.gender ||
      !record.diagnosis ||
      !record.cognitiveImpairment ||
      !record.environmentalFactors ||
      !record.surgeryOrSedation ||
      !record.medication
    ) {
      alert('Por favor complete todas las categorías de la Escala de Riesgo de Caídas');
      return;
    }

    const completeRecord: PediatricFallRiskRecord = {
      id: record.id || `fall-risk-${Date.now()}`,
      date: record.date || new Date().toISOString(),
      professional: record.professional,
      patientName: record.patientName || 'Paciente',
      age: record.age,
      gender: record.gender,
      diagnosis: record.diagnosis,
      cognitiveImpairment: record.cognitiveImpairment,
      environmentalFactors: record.environmentalFactors,
      surgeryOrSedation: record.surgeryOrSedation,
      medication: record.medication,
      totalScore: record.totalScore || 0,
      riskLevel: record.riskLevel || 'none',
    };

    onSave(completeRecord);
  };

  return (
    <form className="barthel-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>
          {initialRecord
            ? 'Editar Registro de Riesgo de Caídas Pediátrico'
            : 'Nuevo Registro de Riesgo de Caídas Pediátrico'}
        </h2>

        <div className="form-date-section">
          <label htmlFor="record-date">Fecha:</label>
          <input
            type="date"
            id="record-date"
            value={formattedDate}
            onChange={handleDateChange}
            className="date-input"
          />
        </div>

        <div className="form-date-section" style={{ marginTop: '10px' }}>
          <label htmlFor="professional">Profesional:</label>
          <input
            type="text"
            id="professional"
            value={record.professional || ''}
            onChange={(e) => setRecord((prev) => ({ ...prev, professional: e.target.value }))}
            className="date-input"
            style={{ width: '300px' }}
          />
        </div>

        <div className="form-date-section" style={{ marginTop: '10px' }}>
          <label htmlFor="patientName">Nombre del Paciente:</label>
          <input
            type="text"
            id="patientName"
            value={record.patientName || ''}
            onChange={(e) => setRecord((prev) => ({ ...prev, patientName: e.target.value }))}
            className="date-input"
            style={{ width: '300px' }}
          />
        </div>
      </div>

      <div className="barthel-items">
        {pediatricFallRiskCategories.map((category) => (
          <div key={String(category.field)} className="barthel-item">
            <h3>{category.name}</h3>
            <div className="options">
              {category.options.map((option) => (
                <label
                  key={option.value}
                  className={`option-label ${
                    record[category.field as keyof PediatricFallRiskRecord] === option.value ? 'selected' : ''
                  }`}
                  onClick={() =>
                    setRecord((prev) => ({
                      ...prev,
                      [category.field]: option.value,
                    }))
                  }
                >
                  <div className="option-header">
                    <input
                      type="radio"
                      name={String(category.field)}
                      value={option.value}
                      checked={record[category.field as keyof PediatricFallRiskRecord] === option.value}
                      onChange={() => {}}
                    />
                    <span className="option-title">{option.label}</span>
                    <span className="option-score">{option.value} pts</span>
                  </div>
                  <p className="option-description">{option.description}</p>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {(record.totalScore ?? 0) > 0 && (
        <div className="barthel-scale-info" style={{ marginTop: '20px' }}>
          <h3>Resultado de la Evaluación</h3>
          <div
            className="score-display"
            style={{ borderLeft: `4px solid ${getRiskColor(record.riskLevel || 'none')}` }}
          >
            <div className="score-info">
              <span className="score-label">Puntuación Total:</span>
              <span className="score-value" style={{ color: getRiskColor(record.riskLevel || 'none') }}>
                {record.totalScore} puntos
              </span>
            </div>
            <div className="score-info">
              <span className="score-label">Nivel de Riesgo:</span>
              <span className="score-value" style={{ color: getRiskColor(record.riskLevel || 'none') }}>
                {getRiskDescription(record.riskLevel || 'none')}
              </span>
            </div>
          </div>

          <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '10px', color: '#2c3e50' }}>Interpretación de Riesgos</h4>
            <div style={{ fontSize: '0.9em', color: '#555', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#27ae60' }}>Sin riesgo (&lt; 7 puntos):</strong> No requiere intervención especial
              </p>
              <p style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#f39c12' }}>Riesgo bajo (7-11 puntos):</strong> Aplicar medidas preventivas básicas
              </p>
              <p>
                <strong style={{ color: '#e74c3c' }}>Riesgo alto (≥ 12 puntos):</strong> Aplicar protocolo de prevención de caídas
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="form-actions">
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="save-button">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default PediatricFallRiskForm;
