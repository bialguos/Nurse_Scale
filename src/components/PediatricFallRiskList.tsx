import { PediatricFallRiskRecord } from '../types/pediatricFallRisk';
import { getRiskDescription, getRiskColor } from '../data/pediatricFallRiskData';

interface PediatricFallRiskListProps {
  records: PediatricFallRiskRecord[];
  onEdit: (record: PediatricFallRiskRecord) => void;
  onDelete: (id: string) => void;
}

const PediatricFallRiskList = ({ records, onEdit, onDelete }: PediatricFallRiskListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (records.length === 0) {
    return (
      <div className="no-records">
        <p>No hay registros de valoración de riesgo de caídas pediátrico.</p>
        <p>Haga clic en "Nuevo Registro" para crear uno.</p>
      </div>
    );
  }

  return (
    <div className="barthel-list">
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Paciente</th>
            <th>Profesional</th>
            <th>Puntuación</th>
            <th>Nivel de Riesgo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{formatDate(record.date)}</td>
              <td>{record.patientName}</td>
              <td>{record.professional}</td>
              <td>
                <span className="score">{record.totalScore}</span>
                <span className="result-text">/ 23</span>
              </td>
              <td>
                <span
                  style={{
                    color: getRiskColor(record.riskLevel),
                    fontWeight: 600,
                  }}
                >
                  {getRiskDescription(record.riskLevel)}
                </span>
              </td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => onEdit(record)}
                >
                  Editar
                </button>
                <button
                  className="details-button"
                  onClick={() => {
                    if (window.confirm('¿Está seguro de eliminar este registro?')) {
                      onDelete(record.id);
                    }
                  }}
                  style={{ backgroundColor: '#e74c3c', borderColor: '#e74c3c' }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PediatricFallRiskList;
