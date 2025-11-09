import { useState, useEffect } from 'react';
import { DowntonItem, DowntonRecord } from '../types/downton';
import { downtonItems } from '../data/downtonData';
import { calculateTotalScore, generateId, getDowntonResultText, getDowntonResultColor, downtonScoreDescriptions } from '../utils/downtonUtils';

interface DowntonFormProps {
  initialRecord?: DowntonRecord;
  onSave: (record: DowntonRecord) => void;
  onCancel: () => void;
}

const DowntonForm = ({ initialRecord, onSave, onCancel }: DowntonFormProps) => {
  const [record, setRecord] = useState<Partial<DowntonRecord>>({
    id: '',
    date: new Date().toISOString(),
    professional: 'Dr García Martínez',
    items: downtonItems.map(item => {
      // Para los ítems 2 y 3 con checkbox
      if (item.id === 2 || item.id === 3) {
        return { itemId: item.id, value: 0, selectedOptions: [{ value: 0, label: "Ninguno" }] };
      }
      // Para los demás ítems
      return { itemId: item.id, value: 0, selectedOptions: [] };
    }),
    score: 0
  });
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecord(prev => ({ ...prev, date: new Date(e.target.value).toISOString() }));
  };

  // Formatear la fecha para el input type="date"
  const formattedDate = record.date ? 
    new Date(record.date).toISOString().split('T')[0] : 
    new Date().toISOString().split('T')[0];


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
        items: downtonItems.map(item => {
          // Para los ítems 2 y 3 con checkbox
          if (item.id === 2 || item.id === 3) {
            return { itemId: item.id, value: 0, selectedOptions: [{ value: 0, label: "Ninguno" }] };
          }
          // Para los demás ítems
          return { itemId: item.id, value: 0, selectedOptions: [] };
        }),
        score: 0
      });
    }
  }, [initialRecord]);

  useEffect(() => {
    const totalScore = calculateTotalScore(record);
    setRecord(prev => ({ ...prev, score: totalScore }));
  }, [record]);


  const handleItemChange = (itemId: number, value: number, isChecked: boolean = false, optionLabel: string = '') => {
    // Para los ítems 2 y 3 que pueden tener múltiples selecciones
    if (itemId === 2 || itemId === 3) {
      const currentItems = [...(record.items || [])];
      const itemIndex = currentItems.findIndex(item => item.itemId === itemId);
      
      if (itemIndex !== -1) {
        // Obtenemos el item actual
        const item = currentItems[itemIndex];
        
        // Si no existe selectedOptions, lo inicializamos
        if (!item.selectedOptions) {
          item.selectedOptions = [];
        }
        
        // Si es la opción "Ninguno" (valor 0)
        if (value === 0) {
          // Si estamos marcando "Ninguno"
          if (!isChecked) {
            // Limpiamos todas las opciones seleccionadas
            item.selectedOptions = [{ value: 0, label: "Ninguno" }];
            item.value = 0;
          }
        } else {
          // Para otras opciones
          if (!isChecked) {
            // Añadimos la opción y su valor
            item.selectedOptions = item.selectedOptions.filter(opt => opt.label !== "Ninguno");
            item.selectedOptions.push({ value, label: optionLabel });
            item.value += value;
          } else {
            // Quitamos la opción y su valor
            item.selectedOptions = item.selectedOptions.filter(opt => opt.label !== optionLabel);
            item.value -= value;
            
            // Si no quedan opciones, seleccionamos "Ninguno"
            if (item.selectedOptions.length === 0) {
              item.selectedOptions.push({ value: 0, label: "Ninguno" });
              item.value = 0;
            }
          }
        }
        
        currentItems[itemIndex] = item;
      }
      
      setRecord(prev => ({
        ...prev,
        items: currentItems
      }));
    } else {
      // Para los demás ítems, comportamiento normal de radio button
      setRecord(prev => ({
        ...prev,
        items: prev.items?.map(item => 
          item.itemId === itemId ? { ...item, value } : item
        ) || []
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!record.professional?.trim()) {
      return;
    }

    const completeRecord: DowntonRecord = {
      id: record.id || generateId(),
      date: record.date || new Date().toISOString(),
      professional: record.professional,
      items: record.items || [],
      score: calculateTotalScore(record)
    };

    onSave(completeRecord);
  };

  const renderDowntonItem = (item: DowntonItem) => {
    const selectedItem = record.items?.find(i => i.itemId === item.id);
    const selectedValue = selectedItem?.value || 0;
    const selectedOptions = selectedItem?.selectedOptions || [];
    
    // Para los ítems 2 y 3 que pueden tener múltiples selecciones
    if (item.id === 2 || item.id === 3) {
      return (
        <div key={item.id} className="barthel-item">
          <h3>
            {item.name}
            <span className="item-score">{selectedValue} pts</span>
          </h3>
          <div className="options">
            {item.options.map(option => {
              // Determinar si esta opción está seleccionada
              const isSelected = selectedOptions.some(opt => opt.label === option.label) || 
                                (option.value === 0 && (selectedValue === 0 || selectedOptions.some(opt => opt.label === "Ninguno")));
              
              return (
                <label key={option.value + option.label} className="option-label">
                  <input
                    type="checkbox"
                    name={`item-${item.id}-${option.label}`}
                    value={option.value}
                    checked={isSelected}
                    onChange={() => handleItemChange(item.id, option.value, isSelected, option.label)}
                  />
                  <div className="option-text">
                    <span 
                      className="option-value"
                      style={{ color: isSelected ? '#e74c3c' : '#3498db' }}
                    >
                      {option.value}
                    </span>
                    <span className="option-description">{option.label}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      );
    }
    // Para los demás ítems, comportamiento normal
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
  const currentScoreDescription = downtonScoreDescriptions.find(
    desc => (record.score ?? 0) >= desc.min && (record.score ?? 0) <= desc.max
  );

  const scoreColor = getDowntonResultColor(record.score || 0);

  return (
    <form className="barthel-form" onSubmit={handleSubmit}>
      <div className="form-header">
      <h2>{initialRecord ? 'Editar Registro de J.H. Downton' : 'Nuevo Registro de J.H. Downton'}</h2>
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
          <div className="score-description">
            <span className="score-result">{getDowntonResultText(record.score || 0)}</span>
          </div>
        </div>
      </div>

     

      

      <div className="barthel-items">
        {downtonItems.map(renderDowntonItem)}
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
            {downtonScoreDescriptions.map((desc, index) => (
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

export default DowntonForm;