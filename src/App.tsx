import { useState, useEffect } from 'react';
import './App.css';
import BarthelList from './components/BarthelList';
import BarthelForm from './components/BarthelForm';
import HumptyDumptyList from './components/HumptyDumptyList';
import HumptyDumptyForm from './components/HumptyDumptyForm';
import DowntonList from './components/DowntonList';
import DowntonForm from './components/DowntonForm';
import type { BarthelRecord } from './types/barthel';
import type { HumptyDumptyRecord } from './types/humptyDumpty';
import { DowntonRecord } from './types/downton';
import { mockBarthelRecords } from './data/barthelData';
import { mockHumptyDumptyRecords } from './data/humptyDumptyData';
import { mockDowntonRecords } from './data/downtonData';
import { Tooltip } from 'react-tooltip';
import LineChartIcon from './components/icons/LineChartIcon';

type TabType = 'barthel' | 'humptyDumpty' | 'downton';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('barthel');
  const [barthelRecords, setBarthelRecords] = useState<BarthelRecord[]>([]);
  const [humptyDumptyRecords, setHumptyDumptyRecords] = useState<HumptyDumptyRecord[]>([]);
  const [downtonRecords, setDowntonRecords] = useState<DowntonRecord[]>([]);
  const [editingBarthelRecord, setEditingBarthelRecord] = useState<BarthelRecord | undefined>(undefined);
  const [editingHumptyDumptyRecord, setEditingHumptyDumptyRecord] = useState<HumptyDumptyRecord | undefined>(undefined);
  const [editingDowntonRecord, setEditingDowntonRecord] = useState<DowntonRecord | undefined>(undefined);
  const [isBarthelFormVisible, setIsBarthelFormVisible] = useState(false);
  const [isHumptyDumptyFormVisible, setIsHumptyDumptyFormVisible] = useState(false);
  const [isDowntonFormVisible, setIsDowntonFormVisible] = useState(false);

  // Cargar registros del localStorage al iniciar
  useEffect(() => {
    // Cargar registros de Barthel
    const savedBarthelRecords = localStorage.getItem('barthelRecords');
    if (savedBarthelRecords) {
      setBarthelRecords(JSON.parse(savedBarthelRecords));
    } else {
      // Si no hay registros guardados, usar los de ejemplo
      setBarthelRecords(mockBarthelRecords);
      localStorage.setItem('barthelRecords', JSON.stringify(mockBarthelRecords));
    }

    // Cargar registros de Humpty-Dumpty
    const savedHumptyDumptyRecords = localStorage.getItem('humptyDumptyRecords');
    if (savedHumptyDumptyRecords) {
      setHumptyDumptyRecords(JSON.parse(savedHumptyDumptyRecords));
    } else {
      // Si no hay registros guardados, usar los de ejemplo
      setHumptyDumptyRecords(mockHumptyDumptyRecords);
      localStorage.setItem('humptyDumptyRecords', JSON.stringify(mockHumptyDumptyRecords));
    }

    // Cargar registros de Downton
    const savedDowntonRecords = localStorage.getItem('downtonRecords');
    if (savedDowntonRecords) {
      setDowntonRecords(JSON.parse(savedDowntonRecords));
    } else {
      // Si no hay registros guardados, usar los de ejemplo
      setDowntonRecords(mockDowntonRecords);
      localStorage.setItem('downtonRecords', JSON.stringify(mockDowntonRecords));
    }
  }, []);

  // Guardar registros en localStorage cuando cambien
  useEffect(() => {
    if (barthelRecords.length > 0) {
      localStorage.setItem('barthelRecords', JSON.stringify(barthelRecords));
    }
  }, [barthelRecords]);

  useEffect(() => {
    if (humptyDumptyRecords.length > 0) {
      localStorage.setItem('humptyDumptyRecords', JSON.stringify(humptyDumptyRecords));
    }
  }, [humptyDumptyRecords]);

  useEffect(() => {
    if (downtonRecords.length > 0) {
      localStorage.setItem('downtonRecords', JSON.stringify(downtonRecords));
    }
  }, [downtonRecords]);

  // Manejadores para Barthel
  const handleEditBarthelRecord = (record: BarthelRecord) => {
    setEditingBarthelRecord(record);
    setIsBarthelFormVisible(true);
  };

  const handleNewBarthelRecord = () => {
    setEditingBarthelRecord(undefined);
    setIsBarthelFormVisible(true);
  };

  const handleSaveBarthelRecord = (record: BarthelRecord) => {
    if (editingBarthelRecord) {
      // Actualizar registro existente
      setBarthelRecords(records => records.map(r => r.id === record.id ? record : r));
    } else {
      // Añadir nuevo registro
      setBarthelRecords(records => [record, ...records]);
    }
    setIsBarthelFormVisible(false);
    setEditingBarthelRecord(undefined);
  };

  const handleCancelBarthelForm = () => {
    setIsBarthelFormVisible(false);
    setEditingBarthelRecord(undefined);
  };

  // Manejadores para Humpty-Dumpty
  const handleEditHumptyDumptyRecord = (record: HumptyDumptyRecord) => {
    setEditingHumptyDumptyRecord(record);
    setIsHumptyDumptyFormVisible(true);
  };

  const handleNewHumptyDumptyRecord = () => {
    setEditingHumptyDumptyRecord(undefined);
    setIsHumptyDumptyFormVisible(true);
  };

  const handleSaveHumptyDumptyRecord = (record: HumptyDumptyRecord) => {
    if (editingHumptyDumptyRecord) {
      // Actualizar registro existente
      setHumptyDumptyRecords(records => records.map(r => r.id === record.id ? record : r));
    } else {
      // Añadir nuevo registro
      setHumptyDumptyRecords(records => [record, ...records]);
    }
    setIsHumptyDumptyFormVisible(false);
    setEditingHumptyDumptyRecord(undefined);
  };

  const handleCancelHumptyDumptyForm = () => {
    setIsHumptyDumptyFormVisible(false);
    setEditingHumptyDumptyRecord(undefined);
  };

  // Manejadores para Downton
  const handleEditDowntonRecord = (record: DowntonRecord) => {
    setEditingDowntonRecord(record);
    setIsDowntonFormVisible(true);
  };

  const handleNewDowntonRecord = () => {
    setEditingDowntonRecord(undefined);
    setIsDowntonFormVisible(true);
  };

  const handleSaveDowntonRecord = (record: DowntonRecord) => {
    if (editingDowntonRecord) {
      // Actualizar registro existente
      setDowntonRecords(records => records.map(r => r.id === record.id ? record : r));
    } else {
      // Añadir nuevo registro
      setDowntonRecords(records => [record, ...records]);
    }
    setIsDowntonFormVisible(false);
    setEditingDowntonRecord(undefined);
  };

  const handleCancelDowntonForm = () => {
    setIsDowntonFormVisible(false);
    setEditingDowntonRecord(undefined);
  };

  return (
    <div className="app-container">
       <div className="bg-white p-4 border-b flex items-center">
          <div className="flex items-center space-x-2">
            <LineChartIcon className="w-6 h-6 text-gray-600" />
            <h1 className="text-xl text-gray-700">Registro de Escalas de Valoración</h1>
          </div>
          <div className="flex-1 text-center">
            <h2 className="text-lg font-bold">Juan Pérez</h2>
            <p className="text-sm text-gray-600">
              Masculino 45 años | His: 123456 | 01/01/2025
            </p>
            <p className="text-sm text-gray-600">
              Día Ingreso: Lunes | Punto Atención: Sala 3
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <button
              className="relative px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              data-tooltip-id="alergiasTooltip"
            >
              Alergias
              <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-600 text-white text-xs rounded-full text-center">
                3
              </span>
            </button>
            <Tooltip id="alergiasTooltip" place="left">
              <ul className="list-none pl-0">
                <li>Penicilina</li>
                <li>Polen</li>
                <li>Mariscos</li>
              </ul>
            </Tooltip>
            <button className="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
              Alertas
            </button>
            <button className="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
              Antecedentes
            </button>
          </div>
        </div>
     
      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'barthel' ? 'active' : ''}`}
          onClick={() => setActiveTab('barthel')}
        >
          Índice de Barthel
        </div>
        <div 
          className={`tab ${activeTab === 'humptyDumpty' ? 'active' : ''}`}
          onClick={() => setActiveTab('humptyDumpty')}
        >
          Escala Humpty-Dumpty
        </div>
        <div 
          className={`tab ${activeTab === 'downton' ? 'active' : ''}`}
          onClick={() => setActiveTab('downton')}
        >
          Escala J.H. Downton
        </div>
      </div>
      
      <main>
        {/* Contenido de la pestaña Barthel */}
        <div className={`tab-content ${activeTab === 'barthel' ? 'active' : ''}`}>
          <div className="records-section">
            <div className="section-header">
              <h2>Historial de Registros de Barthel (Escala de discapacidad)</h2>
              <button className="new-record-button" onClick={handleNewBarthelRecord}>
                Nuevo Registro
              </button>
            </div>
            <BarthelList 
              records={barthelRecords} 
              onEditRecord={handleEditBarthelRecord} 
            />
          </div>
          
          {isBarthelFormVisible && (
            <div className="form-section">
              <BarthelForm 
                initialRecord={editingBarthelRecord} 
                onSave={handleSaveBarthelRecord} 
                onCancel={handleCancelBarthelForm} 
              />
            </div>
          )}
        </div>

        {/* Contenido de la pestaña Humpty-Dumpty */}
        <div className={`tab-content ${activeTab === 'humptyDumpty' ? 'active' : ''}`}>
          <div className="records-section">
            <div className="section-header">
              <h2>Historial de Registros de Humpty-Dumpty (Escala de riesgos de caídas en paciente pediátrico)</h2>
              <button className="new-record-button" onClick={handleNewHumptyDumptyRecord}>
                Nuevo Registro
              </button>
            </div>
            <HumptyDumptyList 
              records={humptyDumptyRecords} 
              onEditRecord={handleEditHumptyDumptyRecord} 
            />
          </div>
          
          {isHumptyDumptyFormVisible && (
            <div className="form-section">
              <HumptyDumptyForm 
                initialRecord={editingHumptyDumptyRecord} 
                onSave={handleSaveHumptyDumptyRecord} 
                onCancel={handleCancelHumptyDumptyForm} 
              />
            </div>
          )}
        </div>

        {/* Contenido de la pestaña Downton */}
        <div className={`tab-content ${activeTab === 'downton' ? 'active' : ''}`}>
          <div className="records-section">
            <div className="section-header">
              <h2>Historial de Registros de J.H. Downton (Escala de riesgo de caídas)</h2>
              <button className="new-record-button" onClick={handleNewDowntonRecord}>
                Nuevo Registro
              </button>
            </div>
            <DowntonList 
              records={downtonRecords} 
              onEditRecord={handleEditDowntonRecord} 
            />
          </div>
          
          {isDowntonFormVisible && (
            <div className="form-section">
              <DowntonForm 
                initialRecord={editingDowntonRecord} 
                onSave={handleSaveDowntonRecord} 
                onCancel={handleCancelDowntonForm} 
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;