import type { GlasgowPediatricRecord } from '../types/glasgowPediatric';
import { formatDate, getGlasgowResultText, getGlasgowResultColor } from '../utils/glasgowPediatricUtils';

interface GlasgowPediatricListProps {
  records: GlasgowPediatricRecord[];
  onEditRecord: (record: GlasgowPediatricRecord) => void;
}

const GlasgowPediatricList = ({ records, onEditRecord }: GlasgowPediatricListProps) => {
  return (
    <div className="barthel-list">
      <h2>Registros de Escala de Glasgow Pediátrica</h2>
      {records.length === 0 ? (
        <p>No hay registros disponibles.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Resultado</th>
              <th>O / V / M</th>
              <th>Profesional</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => {
              const scoreColor = getGlasgowResultColor(record.score);

              return (
                <tr key={record.id} className={'expanded'}>
                  <td>{formatDate(record.date)}</td>
                  <td>
                    <span className="score" style={{ color: scoreColor }}>{record.score}</span>
                    <span className="result-text">{getGlasgowResultText(record.score)}</span>
                  </td>
                  <td>
                    <span className="category-scores">
                      {record.categoryScores.ocular} / {record.categoryScores.verbal} / {record.categoryScores.motora}
                    </span>
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

export default GlasgowPediatricList;
