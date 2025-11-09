import { useState, useEffect } from 'react';
import { HumptyDumptyItem, HumptyDumptyRecord } from '../types/humptyDumpty';
import { humptyDumptyItems } from '../data/humptyDumptyData';
import { calculateTotalScore, generateId, getHumptyDumptyResultText, getHumptyDumptyResultColor, humptyDumptyScoreDescriptions } from '../utils/humptyDumptyUtils';

interface HumptyDumptyFormProps {
  initialRecord?: HumptyDumptyRecord;
  onSave: (record: HumptyDumptyRecord) => void;
  onCancel: () => void;
}

const HumptyDumptyForm = ({ initialRecord, onSave, onCancel }: HumptyDumptyFormProps) => {
  const [record, setRecord] = useState<Partial<HumptyDumptyRecord>>({
    id: '',
    date: new Date().toISOString(),
    professional: 'Dr García Martínez',
    items: humptyDumptyItems.map(item => ({ itemId: item.id, value: 0 })),
    score: 0
  });
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecord(prev => ({ ...prev, date: new Date(e.target.value).toISOString() }));
  };

  // Formatear la fecha para el input type="date"
  const formattedDate = record.date ? 
    new Date(record.date).toISOString().split('T')[0] : 
    new Date().toISOString().split('T')[0];

  const [errors, setErrors] = useState({
    professional: false
  });

  // Resetear el formulario cuando cambia initialRecord (incluso a undefined)
  useEffect(() => {
    if (initialRecord) {
      setRecord(initialRecord);
    } else {
      // Resetear a valores por defecto cuando se crea un nuevo registro
      setRecord({
        id: '',
        date: new Date().toISOString(),
        professional: 'Dr García Martínez',
        items: humptyDumptyItems.map(item => ({ itemId: item.id, value: 0 })),
        score: 0
      });
    }
  }, [initialRecord]);

  useEffect(() => {
    const totalScore = calculateTotalScore(record);
    setRecord(prev => ({ ...prev, score: totalScore }));
  }, [record.items]);

  const handleProfessionalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecord(prev => ({ ...prev, professional: e.target.value }));
    setErrors(prev => ({ ...prev, professional: e.target.value.trim() === '' }));
  };

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
      setErrors(prev => ({ ...prev, professional: true }));
      return;
    }

    const completeRecord: HumptyDumptyRecord = {
      id: record.id || generateId(),
      date: record.date || new Date().toISOString(),
      professional: record.professional,
      items: record.items || [],
      score: calculateTotalScore(record)
    };

    onSave(completeRecord);
  };

  const renderHumptyDumptyItem = (item: HumptyDumptyItem) => {
    const selectedValue = record.items?.find(i => i.itemId === item.id)?.value || 0;
    
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
                <span className="option-value">{option.value}</span>
                <span className="option-description">{option.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    );
  };

  const currentScoreDescription = humptyDumptyScoreDescriptions.find(
    desc => (record.score ?? 0) >= desc.min && (record.score ?? 0) <= desc.max
  );

  const scoreColor = getHumptyDumptyResultColor(record.score || 0);

  return (
    <form className="barthel-form" onSubmit={handleSubmit}>
      <div className="form-header">
      <h2>{initialRecord ? 'Editar Registro de Humpty-Dumpty' : 'Nuevo Registro de Humpty-Dumpty'}</h2>
          <div className="form-date-section">
            <label htmlFor="record-date">Fecha:</label>
            <input
              type="date"
              id="record-date"
              value={formattedDate}
              onChange={handleDateChange}
              className="date-input"
            />
            <label htmlFor="professional">Profesional:</label>
            <input
              type="text"
              id="professional"
              value={record.professional}
              onChange={handleProfessionalChange}
              className={`professional-input ${errors.professional ? 'error' : ''}`}
            />
          </div>
        <div className="score-display" style={{ borderLeft: `4px solid ${scoreColor}` }}>
          <div className="score-info">
            <span className="score-label">Puntuación total:</span>
            <span className="score-value" style={{ color: scoreColor }}>{record.score}/29</span>
          </div>
          <div className="score-description">
            <span className="score-result">{getHumptyDumptyResultText(record.score || 0)}</span>
          </div>
        </div>
      </div>

      

     

      <div className="barthel-items">
        {humptyDumptyItems.map(renderHumptyDumptyItem)}
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
              <th>Nivel de riesgo</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {humptyDumptyScoreDescriptions.map((desc, index) => (
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

export default HumptyDumptyForm;