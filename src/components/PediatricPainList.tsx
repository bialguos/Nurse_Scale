import { PediatricPainRecord } from '../types/pediatricPain';
import { getPainIntensityDescription, getPainIntensityColor } from '../data/pediatricPainData';

interface PediatricPainListProps {
  records: PediatricPainRecord[];
  onEdit: (record: PediatricPainRecord) => void;
  onDelete: (id: string) => void;
}

const PediatricPainList = ({ records, onEdit, onDelete }: PediatricPainListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatAge = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${remainingMonths} meses`;
    if (remainingMonths === 0) return `${years} años`;
    return `${years} años ${remainingMonths} meses`;
  };

  if (records.length === 0) {
    return (
      <div className="no-records">
        <p>No hay registros de valoración del dolor pediátrico.</p>
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
            <th>Edad</th>
            <th>Escala</th>
            <th>Puntuación</th>
            <th>Intensidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{formatDate(record.date)}</td>
              <td>{record.patientName}</td>
              <td>{formatAge(record.patientAgeMonths)}</td>
              <td style={{ fontSize: '0.85em' }}>
                {record.scaleType === 'flacc' && 'FLACC'}
                {record.scaleType === 'faces' && 'Caras'}
                {record.scaleType === 'vas' && 'EVA'}
              </td>
              <td>
                <span className="score">{record.totalScore}</span>
                <span className="result-text">/ 10</span>
              </td>
              <td>
                <span
                  style={{
                    color: getPainIntensityColor(record.painIntensity),
                    fontWeight: 600,
                  }}
                >
                  {getPainIntensityDescription(record.painIntensity)}
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

export default PediatricPainList;
