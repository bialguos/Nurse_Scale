import type { HumptyDumptyRecord } from '../types/humptyDumpty';
import { formatDate, getHumptyDumptyResultText, getHumptyDumptyResultColor } from '../utils/humptyDumptyUtils';

interface HumptyDumptyListProps {
  records: HumptyDumptyRecord[];
  onEditRecord: (record: HumptyDumptyRecord) => void;
}

const HumptyDumptyList = ({ records, onEditRecord }: HumptyDumptyListProps) => {
  

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  

  return (
    <div className="barthel-list">
      <h2>Registros de Escala Humpty-Dumpty</h2>
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
              const scoreColor = getHumptyDumptyResultColor(record.score);
              
              return (
                <tr key={record.id} className={'expanded' }>
                  <td>{formatDate(record.date)}</td>
                  <td>
                    <span className="score" style={{ color: scoreColor }}>{record.score}/29</span>
                    <span className="result-text">{getHumptyDumptyResultText(record.score)}</span>
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

export default HumptyDumptyList;