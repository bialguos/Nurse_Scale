import type { DowntonRecord } from '../types/downton';
import { formatDate, getDowntonResultText, getDowntonResultColor } from '../utils/downtonUtils';

interface DowntonListProps {
  records: DowntonRecord[];
  onEditRecord: (record: DowntonRecord) => void;
}

const DowntonList = ({ records, onEditRecord }: DowntonListProps) => {
  


  return (
    <div className="barthel-list">
      <h2>Registros de Escala J.H. Downton</h2>
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
              const scoreColor = getDowntonResultColor(record.score);
              
              return (
                <tr key={record.id} className={'expanded'}>
                  <td>{formatDate(record.date)}</td>
                  <td>
                    <span className="score" style={{ color: scoreColor }}>{record.score}</span>
                    <span className="result-text">{getDowntonResultText(record.score)}</span>
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

export default DowntonList;