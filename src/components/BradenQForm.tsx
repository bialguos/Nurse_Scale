import { useEffect, useState } from 'react';
import { BradenRecord } from '../types/bradenQ';
import {
  bradenQCategories,
  bradenBergstromCategories,
  calculateRiskLevel,
  getRiskDescription,
  getRiskColor,
} from '../data/bradenQData';

interface BradenQFormProps {
  initialRecord?: BradenRecord;
  onSave: (record: BradenRecord) => void;
  onCancel: () => void;
}

const BradenQForm = ({ initialRecord, onSave, onCancel }: BradenQFormProps) => {
  const [record, setRecord] = useState<Partial<BradenRecord>>({
    id: '',
    date: new Date().toISOString(),
    professional: 'Dra. López Hernández',
    patientName: 'Paciente',
    patientAge: 36, // 3 años por defecto (36 meses)
    scaleType: 'bradenQ',
    mobility: undefined,
    activity: undefined,
    sensoryPerception: undefined,
    moisture: undefined,
    friction: undefined,
    nutrition: undefined,
    tissuePerfusionOxygenation: undefined,
    skinLesionRisk: undefined,
    totalScore: 0,
    riskLevel: 'low',
  });

  // Determinar qué escala usar basado en la edad del paciente
  useEffect(() => {
    if (record.patientAge !== undefined) {
      const newScaleType = record.patientAge < 60 ? 'bradenQ' : 'bradenBergstrom';
      if (record.scaleType !== newScaleType) {
        setRecord((prev) => ({
          ...prev,
          scaleType: newScaleType,
          // Limpiar campos específicos de la otra escala
          ...(newScaleType === 'bradenQ'
            ? { skinLesionRisk: undefined }
            : { friction: undefined, tissuePerfusionOxygenation: undefined }),
        }));
      }
    }
  }, [record.patientAge, record.scaleType]);

  // Calcular puntuación total y nivel de riesgo
  useEffect(() => {
    const scaleType = record.scaleType || 'bradenQ';
    let total = 0;
    let allFieldsFilled = true;

    if (scaleType === 'bradenQ') {
      const fields = [
        record.mobility,
        record.activity,
        record.sensoryPerception,
        record.moisture,
        record.friction,
        record.nutrition,
        record.tissuePerfusionOxygenation,
      ];

      fields.forEach((field) => {
        if (field !== undefined && field > 0) {
          total += field;
        } else {
          allFieldsFilled = false;
        }
      });
    } else {
      const fields = [
        record.sensoryPerception,
        record.moisture,
        record.activity,
        record.mobility,
        record.nutrition,
        record.skinLesionRisk,
      ];

      fields.forEach((field) => {
        if (field !== undefined && field > 0) {
          total += field;
        } else {
          allFieldsFilled = false;
        }
      });
    }

    if (allFieldsFilled && total !== record.totalScore) {
      const riskLevel = calculateRiskLevel(total, scaleType);
      setRecord((prev) => ({
        ...prev,
        totalScore: total,
        riskLevel,
      }));
    }
  }, [
    record.mobility,
    record.activity,
    record.sensoryPerception,
    record.moisture,
    record.friction,
    record.nutrition,
    record.tissuePerfusionOxygenation,
    record.skinLesionRisk,
    record.scaleType,
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

    const scaleType = record.scaleType || 'bradenQ';

    // Validar que todos los campos requeridos estén completos
    if (scaleType === 'bradenQ') {
      if (
        !record.mobility ||
        !record.activity ||
        !record.sensoryPerception ||
        !record.moisture ||
        !record.friction ||
        !record.nutrition ||
        !record.tissuePerfusionOxygenation
      ) {
        alert('Por favor complete todas las categorías de la Escala Braden Q');
        return;
      }
    } else {
      if (
        !record.sensoryPerception ||
        !record.moisture ||
        !record.activity ||
        !record.mobility ||
        !record.nutrition ||
        !record.skinLesionRisk
      ) {
        alert('Por favor complete todas las categorías de la Escala Braden-Bergstrom');
        return;
      }
    }

    const completeRecord: BradenRecord = {
      id: record.id || `braden-${Date.now()}`,
      date: record.date || new Date().toISOString(),
      professional: record.professional,
      patientName: record.patientName || 'Paciente',
      patientAge: record.patientAge || 36,
      scaleType: scaleType,
      mobility: record.mobility || 0,
      activity: record.activity || 0,
      sensoryPerception: record.sensoryPerception || 0,
      moisture: record.moisture || 0,
      nutrition: record.nutrition || 0,
      ...(scaleType === 'bradenQ'
        ? {
            friction: record.friction || 0,
            tissuePerfusionOxygenation: record.tissuePerfusionOxygenation || 0,
          }
        : {
            skinLesionRisk: record.skinLesionRisk || 0,
          }),
      totalScore: record.totalScore || 0,
      riskLevel: record.riskLevel || 'low',
    };

    onSave(completeRecord);
  };

  const categories = record.scaleType === 'bradenQ' ? bradenQCategories : bradenBergstromCategories;
  const scaleTitle = record.scaleType === 'bradenQ'
    ? 'Escala de Braden Q (menores de 5 años)'
    : 'Escala de Braden-Bergstrom (mayores de 5 años)';

  const ageYears = Math.floor((record.patientAge || 0) / 12);
  const ageMonths = (record.patientAge || 0) % 12;

  return (
    <form className="barthel-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>
          {initialRecord
            ? `Editar Registro de ${scaleTitle}`
            : `Nuevo Registro de ${scaleTitle}`}
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

        <div className="form-date-section" style={{ marginTop: '10px' }}>
          <label htmlFor="patientAge">Edad del Paciente:</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="number"
              min="0"
              max="18"
              value={ageYears}
              onChange={(e) => {
                const years = parseInt(e.target.value) || 0;
                setRecord((prev) => ({ ...prev, patientAge: years * 12 + ageMonths }));
              }}
              style={{ width: '80px', padding: '5px' }}
            />
            <span>años</span>
            <input
              type="number"
              min="0"
              max="11"
              value={ageMonths}
              onChange={(e) => {
                const months = parseInt(e.target.value) || 0;
                setRecord((prev) => ({ ...prev, patientAge: ageYears * 12 + months }));
              }}
              style={{ width: '80px', padding: '5px' }}
            />
            <span>meses</span>
            <span style={{ marginLeft: '10px', color: '#666', fontSize: '0.9em' }}>
              (Total: {record.patientAge} meses - {record.scaleType === 'bradenQ' ? 'Braden Q' : 'Braden-Bergstrom'})
            </span>
          </div>
        </div>
      </div>

      <div className="barthel-items">
        {categories.map((category) => (
          <div key={category.field} className="barthel-item">
            <h3>{category.name}</h3>
            <div className="options">
              {category.options.map((option) => (
                <label
                  key={option.value}
                  className={`option-label ${
                    record[category.field as keyof BradenRecord] === option.value ? 'selected' : ''
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
                      name={category.field}
                      value={option.value}
                      checked={record[category.field as keyof BradenRecord] === option.value}
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

      {record.totalScore > 0 && (
        <div className="barthel-scale-info" style={{ marginTop: '20px' }}>
          <h3>Resultado de la Evaluación</h3>
          <div
            className="score-display"
            style={{ borderLeft: `4px solid ${getRiskColor(record.riskLevel || 'low')}` }}
          >
            <div className="score-info">
              <span className="score-label">Puntuación Total:</span>
              <span className="score-value" style={{ color: getRiskColor(record.riskLevel || 'low') }}>
                {record.totalScore} puntos
              </span>
            </div>
            <div className="score-info">
              <span className="score-label">Nivel de Riesgo:</span>
              <span className="score-value" style={{ color: getRiskColor(record.riskLevel || 'low') }}>
                {getRiskDescription(record.riskLevel || 'low', record.scaleType || 'bradenQ')}
              </span>
            </div>
          </div>

          <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '10px', color: '#2c3e50' }}>Interpretación de Riesgos</h4>
            <div style={{ fontSize: '0.9em', color: '#555', lineHeight: '1.6' }}>
              {record.scaleType === 'bradenQ' ? (
                <>
                  <p style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#c0392b' }}>Riesgo muy alto (≤ 16):</strong> Reevaluación cada 24 horas
                  </p>
                  <p style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#e74c3c' }}>Riesgo alto (17-20):</strong> Reevaluación cada 24 horas
                  </p>
                  <p style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#f39c12' }}>Riesgo moderado (21-25):</strong> Reevaluación cada 3 días
                  </p>
                  <p>
                    <strong style={{ color: '#27ae60' }}>Riesgo leve (≥ 25):</strong> Reevaluación cada 7 días
                  </p>
                </>
              ) : (
                <>
                  <p style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#c0392b' }}>Alto riesgo (&lt; 13):</strong> Reevaluación diaria
                  </p>
                  <p style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#f39c12' }}>Riesgo moderado (13-14):</strong> Reevaluación cada 3 días
                  </p>
                  <p>
                    <strong style={{ color: '#27ae60' }}>Bajo riesgo (&gt; 14):</strong> Reevaluación cada 7 días
                  </p>
                </>
              )}
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

export default BradenQForm;
