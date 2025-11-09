import { BarthelRecord } from '../types/barthel';
import { formatDate, getBarthelResultText, getBarthelResultColor } from '../utils/barthelUtils';

interface BarthelListProps {
  records: BarthelRecord[];
  onEditRecord: (record: BarthelRecord) => void;
}

const BarthelList = ({ records, onEditRecord }: BarthelListProps) => {
  



  return (
    <div className="barthel-list">
      <h2>Registros de Índice de Barthel</h2>
      {records.length === 0 ? (
        <p>No hay registros disponibles.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Resultado</th>
              <th>Profesional</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => {
              const scoreColor = getBarthelResultColor(record.score);
              
              return (
                <tr key={record.id} className={'expanded'}>
                  <td>{formatDate(record.date)}</td>
                  <td>
                    <span className="score" style={{ color: scoreColor }}>{record.score}/100</span>
                    <span className="result-text">{getBarthelResultText(record.score)}</span>
                  </td>
                  <td>{record.professional}</td>
                  <td>
                    <button 
                      className="edit-button" 
                      onClick={() => onEditRecord(record)}
                    >
                      Editar
                    </button>
                  
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BarthelList;