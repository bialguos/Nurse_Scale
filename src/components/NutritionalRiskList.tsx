import type { NutritionalRiskRecord } from '../types/nutritionalRisk';
import { formatDate, getNutritionalRiskResultText, getNutritionalRiskResultColor } from '../utils/nutritionalRiskUtils';

interface NutritionalRiskListProps {
  records: NutritionalRiskRecord[];
  onEditRecord: (record: NutritionalRiskRecord) => void;
}

const NutritionalRiskList = ({ records, onEditRecord }: NutritionalRiskListProps) => {
  return (
    <div className="barthel-list">
      <h2>Registros de Escala de Valoración Nutricional</h2>
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
              const scoreColor = getNutritionalRiskResultColor(record.score);

              return (
                <tr key={record.id} className={'expanded'}>
                  <td>{formatDate(record.date)}</td>
                  <td>
                    <span className="score" style={{ color: scoreColor }}>{record.score}/9</span>
                    <span className="result-text">{getNutritionalRiskResultText(record.score)}</span>
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

export default NutritionalRiskList;
