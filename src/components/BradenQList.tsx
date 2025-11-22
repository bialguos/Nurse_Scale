import { BradenRecord } from '../types/bradenQ';
import { getRiskColor, getRiskDescription } from '../data/bradenQData';

interface BradenQListProps {
  records: BradenRecord[];
  onEdit: (record: BradenRecord) => void;
  onDelete: (id: string) => void;
}

const BradenQList = ({ records, onEdit, onDelete }: BradenQListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatAge = (ageInMonths: number) => {
    const years = Math.floor(ageInMonths / 12);
    const months = ageInMonths % 12;
    if (years === 0) return `${months} meses`;
    if (months === 0) return `${years} años`;
    return `${years} años y ${months} meses`;
  };

  const getScaleName = (scaleType: 'bradenQ' | 'bradenBergstrom') => {
    return scaleType === 'bradenQ' ? 'Braden Q' : 'Braden-Bergstrom';
  };

  if (records.length === 0) {
    return (
      <div className="barthel-scale-info" style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ fontSize: '1.1em', color: '#666' }}>
          No hay registros de valoración de riesgo de UPP.
        </p>
        <p style={{ fontSize: '0.9em', color: '#999', marginTop: '10px' }}>
          Utilice el botón "Nueva Valoración" para crear un registro.
        </p>
      </div>
    );
  }

  return (
    <div className="barthel-records">
      <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>
        Historial de Valoraciones ({records.length} registros)
      </h3>
      <div className="records-container">
        {records.map((record) => (
          <div key={record.id} className="barthel-scale-info" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <h4 style={{ margin: 0, color: '#2c3e50' }}>{record.patientName}</h4>
                  <span
                    style={{
                      padding: '4px 10px',
                      backgroundColor: '#e8f4f8',
                      borderRadius: '4px',
                      fontSize: '0.85em',
                      color: '#2980b9',
                      fontWeight: 'bold',
                    }}
                  >
                    {getScaleName(record.scaleType)}
                  </span>
                </div>
                <p style={{ margin: '5px 0', fontSize: '0.9em', color: '#666' }}>
                  <strong>Fecha:</strong> {formatDate(record.date)}
                </p>
                <p style={{ margin: '5px 0', fontSize: '0.9em', color: '#666' }}>
                  <strong>Profesional:</strong> {record.professional}
                </p>
                <p style={{ margin: '5px 0', fontSize: '0.9em', color: '#666' }}>
                  <strong>Edad:</strong> {formatAge(record.patientAge)}
                </p>
              </div>

              <div
                className="score-display"
                style={{
                  borderLeft: `4px solid ${getRiskColor(record.riskLevel)}`,
                  minWidth: '250px',
                  marginLeft: '20px',
                }}
              >
                <div className="score-info">
                  <span className="score-label">Puntuación:</span>
                  <span className="score-value" style={{ color: getRiskColor(record.riskLevel) }}>
                    {record.totalScore} puntos
                  </span>
                </div>
                <div className="score-info">
                  <span className="score-label">Riesgo:</span>
                  <span
                    className="score-value"
                    style={{ color: getRiskColor(record.riskLevel), fontSize: '0.85em' }}
                  >
                    {getRiskDescription(record.riskLevel, record.scaleType)}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
              <h5 style={{ margin: '0 0 10px 0', color: '#2c3e50', fontSize: '0.95em' }}>
                Detalle de Categorías:
              </h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '0.85em' }}>
                <div>
                  <strong>Movilidad:</strong> {record.mobility} pts
                </div>
                <div>
                  <strong>Actividad:</strong> {record.activity} pts
                </div>
                <div>
                  <strong>Percepción Sensorial:</strong> {record.sensoryPerception} pts
                </div>
                <div>
                  <strong>Humedad:</strong> {record.moisture} pts
                </div>
                <div>
                  <strong>Nutrición:</strong> {record.nutrition} pts
                </div>
                {record.scaleType === 'bradenQ' ? (
                  <>
                    <div>
                      <strong>Fricción:</strong> {record.friction} pts
                    </div>
                    <div>
                      <strong>Perfusión Tisular:</strong> {record.tissuePerfusionOxygenation} pts
                    </div>
                  </>
                ) : (
                  <div>
                    <strong>Riesgo de Lesiones:</strong> {record.skinLesionRisk} pts
                  </div>
                )}
              </div>
            </div>

            <div className="record-actions" style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
              <button
                onClick={() => onEdit(record)}
                className="save-button"
                style={{ padding: '8px 20px', fontSize: '0.9em' }}
              >
                Editar
              </button>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      `¿Está seguro de eliminar el registro de ${record.patientName} del ${formatDate(record.date)}?`
                    )
                  ) {
                    onDelete(record.id);
                  }
                }}
                className="cancel-button"
                style={{ padding: '8px 20px', fontSize: '0.9em' }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BradenQList;
