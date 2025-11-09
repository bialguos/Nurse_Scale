import {
  ageToMonths,
  calculateRecordPercentiles,
  formatAge,
  generateId,
  getPercentileColor,
  getPercentileDescription,
  getPercentileDifferenceInterpretation,
} from '../utils/percentilesUtils';
import { useEffect, useState } from 'react';

import PercentileChart from './PercentileChart';
import { PercentileRecord } from '../types/percentiles';

interface PercentileFormProps {
  initialRecord?: PercentileRecord;
  historicalRecords?: PercentileRecord[];
  onSave: (record: PercentileRecord) => void;
  onCancel: () => void;
}

const PercentileForm = ({ initialRecord, historicalRecords, onSave, onCancel }: PercentileFormProps) => {
  const [record, setRecord] = useState<Partial<PercentileRecord>>({
    id: '',
    date: new Date().toISOString(),
    professional: 'Dra. López Hernández',
    patientName: 'Paciente',
    patientAgeYears: 0,
    patientAgeMonths: 0,
    patientAge: 0,
    gender: 'male',
    weight: 0,
    height: 0,
    weightPercentile: 0,
    heightPercentile: 0,
    percentileDifference: 0,
  });

  const [showCharts, setShowCharts] = useState(true);

  useEffect(() => {
    if (initialRecord) {
      setRecord(initialRecord);
      setShowCharts(true);
    }
  }, [initialRecord]);

  useEffect(() => {
    if (
      record.patientAgeYears !== undefined &&
      record.patientAgeMonths !== undefined &&
      record.weight &&
      record.height &&
      record.gender
    ) {
      const percentiles = calculateRecordPercentiles(
        record.patientAgeYears,
        record.patientAgeMonths,
        record.weight,
        record.height,
        record.gender
      );

      const newPatientAge = ageToMonths(record.patientAgeYears || 0, record.patientAgeMonths || 0);

      // Solo actualizar si los valores han cambiado
      if (
        record.patientAge !== newPatientAge ||
        record.weightPercentile !== percentiles.weightPercentile ||
        record.heightPercentile !== percentiles.heightPercentile ||
        record.percentileDifference !== percentiles.percentileDifference
      ) {
        setRecord((prev) => ({
          ...prev,
          patientAge: newPatientAge,
          ...percentiles,
        }));
      }
    }
  }, [
    record.patientAgeYears,
    record.patientAgeMonths,
    record.weight,
    record.height,
    record.gender,
    record.patientAge,
    record.weightPercentile,
    record.heightPercentile,
    record.percentileDifference,
  ]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecord((prev) => ({ ...prev, date: new Date(e.target.value).toISOString() }));
  };

  const formattedDate = record.date
    ? new Date(record.date).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!record.professional?.trim() || !record.weight || !record.height) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    const completeRecord: PercentileRecord = {
      id: record.id || generateId(),
      date: record.date || new Date().toISOString(),
      professional: record.professional,
      patientName: record.patientName || 'Paciente',
      patientAgeYears: record.patientAgeYears || 0,
      patientAgeMonths: record.patientAgeMonths || 0,
      patientAge: record.patientAge || 0,
      gender: record.gender || 'male',
      weight: record.weight || 0,
      height: record.height || 0,
      weightPercentile: record.weightPercentile || 0,
      heightPercentile: record.heightPercentile || 0,
      percentileDifference: record.percentileDifference || 0,
    };

    onSave(completeRecord);
  };

  const canShowCharts = record.weight && record.height && record.patientAge;

  return (
    <form className="barthel-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>
          {initialRecord
            ? 'Editar Registro de Percentiles Pediátricos'
            : 'Nuevo Registro de Percentiles Pediátricos'}
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
      </div>

      <div className="barthel-items">
        <div className="barthel-item">
          <h3>Datos del Paciente</h3>
          <div className="options">
            <div className="option-label" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label style={{ marginBottom: '5px' }}>
                <strong>Sexo:</strong>
              </label>
              <div style={{ display: 'flex', gap: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={record.gender === 'male'}
                    onChange={(e) =>
                      setRecord((prev) => ({
                        ...prev,
                        gender: e.target.value as 'male' | 'female',
                      }))
                    }
                  />
                  <span>Masculino</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={record.gender === 'female'}
                    onChange={(e) =>
                      setRecord((prev) => ({
                        ...prev,
                        gender: e.target.value as 'male' | 'female',
                      }))
                    }
                  />
                  <span>Femenino</span>
                </label>
              </div>
            </div>

            <div className="option-label" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label style={{ marginBottom: '5px' }}>
                <strong>Edad:</strong>
              </label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="number"
                  min="0"
                  max="18"
                  value={record.patientAgeYears || 0}
                  onChange={(e) =>
                    setRecord((prev) => ({
                      ...prev,
                      patientAgeYears: parseInt(e.target.value) || 0,
                    }))
                  }
                  style={{ width: '80px', padding: '5px' }}
                />
                <span>años</span>
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={record.patientAgeMonths || 0}
                  onChange={(e) =>
                    setRecord((prev) => ({
                      ...prev,
                      patientAgeMonths: parseInt(e.target.value) || 0,
                    }))
                  }
                  style={{ width: '80px', padding: '5px' }}
                />
                <span>meses</span>
              </div>
              <span style={{ fontSize: '0.9em', color: '#666', marginTop: '5px' }}>
                {formatAge(record.patientAgeYears || 0, record.patientAgeMonths || 0)}
              </span>
            </div>
          </div>
        </div>

        <div className="barthel-item">
          <h3>Mediciones Antropométricas</h3>
          <div className="options">
            <div className="option-label" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label style={{ marginBottom: '5px' }}>
                <strong>Peso (kg):</strong>
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={record.weight || ''}
                onChange={(e) =>
                  setRecord((prev) => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))
                }
                style={{ width: '150px', padding: '5px' }}
                required
              />
            </div>

            <div className="option-label" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label style={{ marginBottom: '5px' }}>
                <strong>Talla (cm):</strong>
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={record.height || ''}
                onChange={(e) =>
                  setRecord((prev) => ({ ...prev, height: parseFloat(e.target.value) || 0 }))
                }
                style={{ width: '150px', padding: '5px' }}
                required
              />
            </div>
          </div>
        </div>

        {record.weight && record.height && record.weight > 0 && record.height > 0 && (
          <div className="barthel-item">
            <h3>Resultados de Percentiles</h3>
            <div className="score-display" style={{ borderLeft: `4px solid #3498db`, marginTop: '10px' }}>
              <div className="score-info">
                <span className="score-label">Percentil de Peso:</span>
                <span
                  className="score-value"
                  style={{ color: getPercentileColor(record.weightPercentile || 0) }}
                >
                  P{Math.round(record.weightPercentile || 0)}
                </span>
                <span style={{ fontSize: '0.85em', color: '#666', marginLeft: '10px' }}>
                  {getPercentileDescription(record.weightPercentile || 0)}
                </span>
              </div>
              <div className="score-info">
                <span className="score-label">Percentil de Talla:</span>
                <span
                  className="score-value"
                  style={{ color: getPercentileColor(record.heightPercentile || 0) }}
                >
                  P{Math.round(record.heightPercentile || 0)}
                </span>
                <span style={{ fontSize: '0.85em', color: '#666', marginLeft: '10px' }}>
                  {getPercentileDescription(record.heightPercentile || 0)}
                </span>
              </div>
              <div className="score-info">
                <span className="score-label">Diferencia de Percentiles:</span>
                <span className="score-value" style={{ color: '#e74c3c' }}>
                  {Math.round((record.percentileDifference || 0) * 10) / 10}
                </span>
                <span style={{ fontSize: '0.85em', color: '#666', marginLeft: '10px' }}>
                  {getPercentileDifferenceInterpretation(record.percentileDifference || 0)}
                </span>
              </div>
            </div>

            {canShowCharts && (
              <div style={{ marginTop: '15px' }}>
                <button
                  type="button"
                  className="save-button"
                  onClick={() => setShowCharts(!showCharts)}
                  style={{ padding: '8px 20px', fontSize: '0.95em' }}
                >
                  {showCharts ? 'Ocultar Gráficas' : 'Mostrar Gráficas de Percentiles'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {showCharts && canShowCharts && (
        <PercentileChart
          gender={record.gender || 'male'}
          ageInMonths={record.patientAge || 0}
          weight={record.weight || 0}
          height={record.height || 0}
          historicalRecords={[
            ...(historicalRecords?.filter(r => r.id !== record.id && r.gender === record.gender) || []),
          ]}
        />
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

export default PercentileForm;
