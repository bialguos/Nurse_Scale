import { useEffect, useState } from 'react';
import { PediatricPainRecord } from '../types/pediatricPain';
import {
  flaccCategories,
  facesScaleOptions,
  getScaleTypeByAge,
  getScaleName,
  calculatePainIntensity,
  getPainIntensityDescription,
  getPainIntensityColor,
} from '../data/pediatricPainData';

interface PediatricPainFormProps {
  initialRecord?: PediatricPainRecord;
  onSave: (record: PediatricPainRecord) => void;
  onCancel: () => void;
}

const PediatricPainForm = ({ initialRecord, onSave, onCancel }: PediatricPainFormProps) => {
  const [record, setRecord] = useState<Partial<PediatricPainRecord>>({
    id: '',
    date: new Date().toISOString(),
    professional: 'Dra. López Hernández',
    patientName: 'Paciente',
    patientAgeMonths: 24, // 2 años por defecto
    scaleType: 'flacc',
    crying: undefined,
    attitude: undefined,
    breathing: undefined,
    posturalTone: undefined,
    facialObservation: undefined,
    painLevel: undefined,
    totalScore: 0,
    painIntensity: 'none',
  });

  // Actualizar tipo de escala cuando cambia la edad
  useEffect(() => {
    if (record.patientAgeMonths !== undefined) {
      const newScaleType = getScaleTypeByAge(record.patientAgeMonths);
      if (record.scaleType !== newScaleType) {
        setRecord((prev) => ({
          ...prev,
          scaleType: newScaleType,
          // Limpiar campos cuando cambia la escala
          crying: undefined,
          attitude: undefined,
          breathing: undefined,
          posturalTone: undefined,
          facialObservation: undefined,
          painLevel: undefined,
          totalScore: 0,
          painIntensity: 'none',
        }));
      }
    }
  }, [record.patientAgeMonths, record.scaleType]);

  // Calcular puntuación total
  useEffect(() => {
    let total = 0;

    if (record.scaleType === 'flacc') {
      const fields = [
        record.crying,
        record.attitude,
        record.breathing,
        record.posturalTone,
        record.facialObservation,
      ];

      let allFieldsFilled = true;
      fields.forEach((field) => {
        if (field !== undefined) {
          total += field;
        } else {
          allFieldsFilled = false;
        }
      });

      if (allFieldsFilled) {
        const painIntensity = calculatePainIntensity(total);
        setRecord((prev) => ({
          ...prev,
          totalScore: total,
          painIntensity,
        }));
      }
    } else if (record.painLevel !== undefined) {
      total = record.painLevel;
      const painIntensity = calculatePainIntensity(total);
      setRecord((prev) => ({
        ...prev,
        totalScore: total,
        painIntensity,
      }));
    }
  }, [
    record.crying,
    record.attitude,
    record.breathing,
    record.posturalTone,
    record.facialObservation,
    record.painLevel,
    record.scaleType,
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

  const ageYears = Math.floor((record.patientAgeMonths || 0) / 12);
  const ageMonths = (record.patientAgeMonths || 0) % 12;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!record.professional?.trim()) {
      alert('Por favor ingrese el nombre del profesional');
      return;
    }

    // Validar según el tipo de escala
    if (record.scaleType === 'flacc') {
      if (
        record.crying === undefined ||
        record.attitude === undefined ||
        record.breathing === undefined ||
        record.posturalTone === undefined ||
        record.facialObservation === undefined
      ) {
        alert('Por favor complete todos los parámetros de la Escala FLACC');
        return;
      }
    } else {
      if (record.painLevel === undefined) {
        alert('Por favor seleccione el nivel de dolor');
        return;
      }
    }

    const completeRecord: PediatricPainRecord = {
      id: record.id || `pain-${Date.now()}`,
      date: record.date || new Date().toISOString(),
      professional: record.professional,
      patientName: record.patientName || 'Paciente',
      patientAgeMonths: record.patientAgeMonths || 24,
      scaleType: record.scaleType || 'flacc',
      ...(record.scaleType === 'flacc'
        ? {
            crying: record.crying,
            attitude: record.attitude,
            breathing: record.breathing,
            posturalTone: record.posturalTone,
            facialObservation: record.facialObservation,
          }
        : {
            painLevel: record.painLevel,
          }),
      totalScore: record.totalScore || 0,
      painIntensity: record.painIntensity || 'none',
    };

    onSave(completeRecord);
  };

  return (
    <form className="barthel-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>
          {initialRecord
            ? 'Editar Valoración del Dolor'
            : 'Nueva Valoración del Dolor'}
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
              max="14"
              value={ageYears}
              onChange={(e) => {
                const years = parseInt(e.target.value) || 0;
                setRecord((prev) => ({ ...prev, patientAgeMonths: years * 12 + ageMonths }));
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
                setRecord((prev) => ({ ...prev, patientAgeMonths: ageYears * 12 + months }));
              }}
              style={{ width: '80px', padding: '5px' }}
            />
            <span>meses</span>
          </div>
        </div>

        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e8f4fc', borderRadius: '8px' }}>
          <strong>Escala a utilizar:</strong> {getScaleName(record.scaleType || 'flacc')}
        </div>
      </div>

      {/* Escala FLACC para menores de 3 años */}
      {record.scaleType === 'flacc' && (
        <div className="barthel-items">
          {flaccCategories.map((category) => (
            <div key={category.field} className="barthel-item">
              <h3>{category.name}</h3>
              <div className="options">
                {category.options.map((option) => (
                  <label
                    key={option.value}
                    className={`option-label ${
                      record[category.field] === option.value ? 'selected' : ''
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
                        checked={record[category.field] === option.value}
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
      )}

      {/* Escala de Caras para niños de 3 a 7 años */}
      {record.scaleType === 'faces' && (
        <div style={{ padding: '20px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>
            Escala de Caras - Seleccione el nivel de dolor
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            {facesScaleOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => setRecord((prev) => ({ ...prev, painLevel: option.value }))}
                style={{
                  cursor: 'pointer',
                  padding: '15px',
                  borderRadius: '12px',
                  border: record.painLevel === option.value ? '3px solid #3498db' : '2px solid #ddd',
                  backgroundColor: record.painLevel === option.value ? '#e8f4fc' : 'white',
                  textAlign: 'center',
                  minWidth: '100px',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontSize: '3em' }}>{option.emoji}</div>
                <div style={{ fontWeight: 'bold', fontSize: '1.5em', color: '#2c3e50' }}>{option.value}</div>
                <div style={{ fontSize: '0.85em', color: '#666' }}>{option.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Escala Visual Analógica (EVA) para niños de 7 a 14 años */}
      {record.scaleType === 'vas' && (
        <div style={{ padding: '20px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>
            Escala Visual Analógica (EVA) - Seleccione el nivel de dolor
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '600px' }}>
              <span style={{ fontWeight: 'bold', color: '#27ae60' }}>Nada</span>
              <span style={{ fontWeight: 'bold', color: '#e74c3c' }}>Insoportable</span>
            </div>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <div
                  key={value}
                  onClick={() => setRecord((prev) => ({ ...prev, painLevel: value }))}
                  style={{
                    cursor: 'pointer',
                    width: '50px',
                    height: '50px',
                    borderRadius: '8px',
                    border: record.painLevel === value ? '3px solid #3498db' : '2px solid #ddd',
                    backgroundColor: record.painLevel === value
                      ? '#3498db'
                      : `hsl(${120 - (value * 12)}, 70%, 50%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.2em',
                    color: 'white',
                    transition: 'all 0.2s',
                  }}
                >
                  {value}
                </div>
              ))}
            </div>
            {record.painLevel !== undefined && (
              <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: getPainIntensityColor(record.painIntensity || 'none') }}>
                Nivel seleccionado: {record.painLevel}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Resultado */}
      {((record.scaleType === 'flacc' && record.crying !== undefined && record.attitude !== undefined &&
         record.breathing !== undefined && record.posturalTone !== undefined && record.facialObservation !== undefined) ||
        (record.scaleType !== 'flacc' && record.painLevel !== undefined)) && (
        <div className="barthel-scale-info" style={{ marginTop: '20px' }}>
          <h3>Resultado de la Evaluación</h3>
          <div
            className="score-display"
            style={{ borderLeft: `4px solid ${getPainIntensityColor(record.painIntensity || 'none')}` }}
          >
            <div className="score-info">
              <span className="score-label">Puntuación Total:</span>
              <span className="score-value" style={{ color: getPainIntensityColor(record.painIntensity || 'none') }}>
                {record.totalScore} / 10 puntos
              </span>
            </div>
            <div className="score-info">
              <span className="score-label">Intensidad del Dolor:</span>
              <span className="score-value" style={{ color: getPainIntensityColor(record.painIntensity || 'none') }}>
                {getPainIntensityDescription(record.painIntensity || 'none')}
              </span>
            </div>
          </div>

          <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '10px', color: '#2c3e50' }}>Interpretación</h4>
            <div style={{ fontSize: '0.9em', color: '#555', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#27ae60' }}>Sin dolor (0):</strong> No requiere intervención
              </p>
              <p style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#f1c40f' }}>Dolor leve (1-3):</strong> Considerar medidas no farmacológicas
              </p>
              <p style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#f39c12' }}>Dolor moderado (4-6):</strong> Requiere tratamiento analgésico
              </p>
              <p>
                <strong style={{ color: '#e74c3c' }}>Dolor intenso (7-10):</strong> Requiere tratamiento analgésico urgente
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

export default PediatricPainForm;
