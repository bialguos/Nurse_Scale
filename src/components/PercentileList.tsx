import { PercentileRecord } from '../types/percentiles';
import { formatAge, getPercentileColor, getPercentileDescription } from '../utils/percentilesUtils';

interface PercentileListProps {
  records: PercentileRecord[];
  onEditRecord: (record: PercentileRecord) => void;
}

const PercentileList = ({ records, onEditRecord }: PercentileListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="records-list">
      {records.length === 0 ? (
        <div className="no-records">
          <p>No hay registros de percentiles. Crea un nuevo registro para comenzar.</p>
        </div>
      ) : (
        records.map((record) => (
          <div key={record.id} className="record-card" onClick={() => onEditRecord(record)}>
            <div className="record-header">
              <span className="record-date">{formatDate(record.date)}</span>
              <span className="record-professional">{record.professional}</span>
            </div>

            <div className="record-content">
              <div className="record-section">
                <h4>Datos del Paciente</h4>
                <div className="record-details">
                  <div className="detail-item">
                    <span className="detail-label">Sexo:</span>
                    <span className="detail-value">
                      {record.gender === 'male' ? 'Masculino' : 'Femenino'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Edad:</span>
                    <span className="detail-value">
                      {formatAge(record.patientAgeYears, record.patientAgeMonths)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="record-section">
                <h4>Mediciones</h4>
                <div className="record-details">
                  <div className="detail-item">
                    <span className="detail-label">Peso:</span>
                    <span className="detail-value">{record.weight} kg</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Talla:</span>
                    <span className="detail-value">{record.height} cm</span>
                  </div>
                </div>
              </div>

              <div className="record-section">
                <h4>Percentiles</h4>
                <div className="record-details">
                  <div className="detail-item">
                    <span className="detail-label">Peso:</span>
                    <span
                      className="detail-value"
                      style={{
                        color: getPercentileColor(record.weightPercentile),
                        fontWeight: 'bold',
                      }}
                    >
                      P{Math.round(record.weightPercentile)}
                    </span>
                    <span
                      style={{
                        fontSize: '0.85em',
                        color: '#666',
                        marginLeft: '8px',
                      }}
                    >
                      {getPercentileDescription(record.weightPercentile)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Talla:</span>
                    <span
                      className="detail-value"
                      style={{
                        color: getPercentileColor(record.heightPercentile),
                        fontWeight: 'bold',
                      }}
                    >
                      P{Math.round(record.heightPercentile)}
                    </span>
                    <span
                      style={{
                        fontSize: '0.85em',
                        color: '#666',
                        marginLeft: '8px',
                      }}
                    >
                      {getPercentileDescription(record.heightPercentile)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Diferencia:</span>
                    <span className="detail-value" style={{ color: '#e74c3c', fontWeight: 'bold' }}>
                      {Math.round(record.percentileDifference * 10) / 10}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PercentileList;
