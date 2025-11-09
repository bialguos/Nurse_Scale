import { useState, useEffect } from 'react';
import { GlasgowPediatricItem, GlasgowPediatricRecord } from '../types/glasgowPediatric';
import { glasgowPediatricItems } from '../data/glasgowPediatricData';
import {
  calculateTotalScore,
  calculateCategoryScores,
  generateId,
  getGlasgowResultText,
  getGlasgowResultColor,
  glasgowScoreDescriptions
} from '../utils/glasgowPediatricUtils';

interface GlasgowPediatricFormProps {
  initialRecord?: GlasgowPediatricRecord;
  onSave: (record: GlasgowPediatricRecord) => void;
  onCancel: () => void;
}

const GlasgowPediatricForm = ({ initialRecord, onSave, onCancel }: GlasgowPediatricFormProps) => {
  const [record, setRecord] = useState<Partial<GlasgowPediatricRecord>>({
    id: '',
    date: new Date().toISOString(),
    professional: 'Dra. López Hernández',
    items: glasgowPediatricItems.map(item => ({
      itemId: item.id,
      value: 0
    })),
    score: 0,
    categoryScores: {
      ocular: 0,
      verbal: 0,
      motora: 0
    }
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecord(prev => ({ ...prev, date: new Date(e.target.value).toISOString() }));
  };

  const formattedDate = record.date ?
    new Date(record.date).toISOString().split('T')[0] :
    new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (initialRecord) {
      setRecord(initialRecord);
    } else {
      setRecord({
        id: '',
        date: new Date().toISOString(),
        professional: 'Dra. López Hernández',
        items: glasgowPediatricItems.map(item => ({
          itemId: item.id,
          value: 0
        })),
        score: 0,
        categoryScores: {
          ocular: 0,
          verbal: 0,
          motora: 0
        }
      });
    }
  }, [initialRecord]);

  useEffect(() => {
    const totalScore = calculateTotalScore(record);
    const categoryScores = calculateCategoryScores(record);
    setRecord(prev => ({ ...prev, score: totalScore, categoryScores }));
  }, [record.items]);

  const handleItemChange = (itemId: number, value: number) => {
    setRecord(prev => ({
      ...prev,
      items: prev.items?.map(item =>
        item.itemId === itemId ? { ...item, value } : item
      ) || []
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!record.professional?.trim()) {
      return;
    }

    const completeRecord: GlasgowPediatricRecord = {
      id: record.id || generateId(),
      date: record.date || new Date().toISOString(),
      professional: record.professional,
      items: record.items || [],
      score: calculateTotalScore(record),
      categoryScores: calculateCategoryScores(record)
    };

    onSave(completeRecord);
  };

  const renderGlasgowItem = (item: GlasgowPediatricItem) => {
    const selectedItem = record.items?.find(i => i.itemId === item.id);
    const selectedValue = selectedItem?.value || 0;

    return (
      <div key={item.id} className="barthel-item">
        <h3>
          {item.name}
          <span className="item-score">{selectedValue} pts</span>
        </h3>
        <div className="options">
          {item.options.map(option => (
            <label key={option.value} className="option-label">
              <input
                type="radio"
                name={`item-${item.id}`}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => handleItemChange(item.id, option.value)}
              />
              <div className="option-text">
                <span
                  className="option-value"
                  style={{ color: selectedValue === option.value ? '#e74c3c' : '#3498db' }}
                >
                  {option.value}
                </span>
                <span className="option-description">{option.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    );
  };

  const currentScoreDescription = glasgowScoreDescriptions.find(
    desc => (record.score ?? 0) >= desc.min && (record.score ?? 0) <= desc.max
  );

  const scoreColor = getGlasgowResultColor(record.score || 0);

  return (
    <form className="barthel-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>{initialRecord ? 'Editar Registro de Glasgow Pediátrica' : 'Nuevo Registro de Glasgow Pediátrica'}</h2>
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
        <div className="score-display" style={{ borderLeft: `4px solid ${scoreColor}` }}>
          <div className="score-info">
            <span className="score-label">Puntuación total:</span>
            <span className="score-value" style={{ color: scoreColor }}>{record.score}</span>
          </div>
          <div className="score-info">
            <span className="score-label">O / V / M:</span>
            <span className="score-value" style={{ color: scoreColor }}>
              {record.categoryScores?.ocular || 0} / {record.categoryScores?.verbal || 0} / {record.categoryScores?.motora || 0}
            </span>
          </div>
          <div className="score-description">
            <span className="score-result">{getGlasgowResultText(record.score || 0)}</span>
          </div>
        </div>
      </div>

      <div className="barthel-items">
        {glasgowPediatricItems.map(renderGlasgowItem)}
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="save-button">
          Guardar
        </button>
      </div>

      <div className="barthel-scale-info">
        <h3>Escala de Valoración</h3>
        <table className="barthel-scale-table">
          <thead>
            <tr>
              <th>Puntuación</th>
              <th>Nivel de gravedad</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {glasgowScoreDescriptions.map((desc, index) => (
              <tr
                key={index}
                className={currentScoreDescription?.text === desc.text ? 'active-score-row' : ''}
              >
                <td>{desc.min === desc.max ? desc.min : `${desc.min}-${desc.max}`}</td>
                <td>{desc.text}</td>
                <td>{desc.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  );
};

export default GlasgowPediatricForm;
