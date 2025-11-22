import './App.css';

import { useEffect, useState } from 'react';

import BarthelForm from './components/BarthelForm';
import BarthelList from './components/BarthelList';
import type { BarthelRecord } from './types/barthel';
import DowntonForm from './components/DowntonForm';
import DowntonList from './components/DowntonList';
import { DowntonRecord } from './types/downton';
import GlasgowPediatricForm from './components/GlasgowPediatricForm';
import GlasgowPediatricList from './components/GlasgowPediatricList';
import { GlasgowPediatricRecord } from './types/glasgowPediatric';
import HumptyDumptyForm from './components/HumptyDumptyForm';
import HumptyDumptyList from './components/HumptyDumptyList';
import type { HumptyDumptyRecord } from './types/humptyDumpty';
import LineChartIcon from './components/icons/LineChartIcon';
import NutritionalRiskForm from './components/NutritionalRiskForm';
import NutritionalRiskList from './components/NutritionalRiskList';
import { NutritionalRiskRecord } from './types/nutritionalRisk';
import PercentileChart from './components/PercentileChart';
import PercentileForm from './components/PercentileForm';
import PercentileList from './components/PercentileList';
import { PercentileRecord } from './types/percentiles';
import BradenQForm from './components/BradenQForm';
import BradenQList from './components/BradenQList';
import { BradenRecord } from './types/bradenQ';
import PediatricFallRiskForm from './components/PediatricFallRiskForm';
import PediatricFallRiskList from './components/PediatricFallRiskList';
import { PediatricFallRiskRecord } from './types/pediatricFallRisk';
import { Tooltip } from 'react-tooltip';
import { mockBarthelRecords } from './data/barthelData';
import { mockDowntonRecords } from './data/downtonData';
import { mockGlasgowPediatricRecords } from './data/glasgowPediatricData';
import { mockHumptyDumptyRecords } from './data/humptyDumptyData';
import { mockNutritionalRiskRecords } from './data/nutritionalRiskData';
import { mockPercentileRecords } from './data/percentilesData';
import { mockBradenRecords } from './data/bradenQData';

type TabType = 'barthel' | 'humptyDumpty' | 'downton' | 'glasgowPediatric' | 'nutritionalRisk' | 'percentiles' | 'bradenQ' | 'pediatricFallRisk';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('barthel');
  const [barthelRecords, setBarthelRecords] = useState<BarthelRecord[]>([]);
  const [humptyDumptyRecords, setHumptyDumptyRecords] = useState<HumptyDumptyRecord[]>([]);
  const [downtonRecords, setDowntonRecords] = useState<DowntonRecord[]>([]);
  const [glasgowPediatricRecords, setGlasgowPediatricRecords] = useState<GlasgowPediatricRecord[]>([]);
  const [nutritionalRiskRecords, setNutritionalRiskRecords] = useState<NutritionalRiskRecord[]>([]);
  const [percentileRecords, setPercentileRecords] = useState<PercentileRecord[]>([]);
  const [bradenRecords, setBradenRecords] = useState<BradenRecord[]>([]);
  const [pediatricFallRiskRecords, setPediatricFallRiskRecords] = useState<PediatricFallRiskRecord[]>([]);
  const [editingBarthelRecord, setEditingBarthelRecord] = useState<BarthelRecord | undefined>(undefined);
  const [editingHumptyDumptyRecord, setEditingHumptyDumptyRecord] = useState<HumptyDumptyRecord | undefined>(undefined);
  const [editingDowntonRecord, setEditingDowntonRecord] = useState<DowntonRecord | undefined>(undefined);
  const [editingGlasgowPediatricRecord, setEditingGlasgowPediatricRecord] = useState<GlasgowPediatricRecord | undefined>(undefined);
  const [editingNutritionalRiskRecord, setEditingNutritionalRiskRecord] = useState<NutritionalRiskRecord | undefined>(undefined);
  const [editingPercentileRecord, setEditingPercentileRecord] = useState<PercentileRecord | undefined>(undefined);
  const [editingBradenRecord, setEditingBradenRecord] = useState<BradenRecord | undefined>(undefined);
  const [editingPediatricFallRiskRecord, setEditingPediatricFallRiskRecord] = useState<PediatricFallRiskRecord | undefined>(undefined);
  const [isBarthelFormVisible, setIsBarthelFormVisible] = useState(false);
  const [isHumptyDumptyFormVisible, setIsHumptyDumptyFormVisible] = useState(false);
  const [isDowntonFormVisible, setIsDowntonFormVisible] = useState(false);
  const [isGlasgowPediatricFormVisible, setIsGlasgowPediatricFormVisible] = useState(false);
  const [isNutritionalRiskFormVisible, setIsNutritionalRiskFormVisible] = useState(false);
  const [isPercentileFormVisible, setIsPercentileFormVisible] = useState(false);
  const [isBradenFormVisible, setIsBradenFormVisible] = useState(false);
  const [isPediatricFallRiskFormVisible, setIsPediatricFallRiskFormVisible] = useState(false);

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

    // Cargar registros de Glasgow Pediátrica
    const savedGlasgowPediatricRecords = localStorage.getItem('glasgowPediatricRecords');
    if (savedGlasgowPediatricRecords) {
      setGlasgowPediatricRecords(JSON.parse(savedGlasgowPediatricRecords));
    } else {
      // Si no hay registros guardados, usar los de ejemplo
      setGlasgowPediatricRecords(mockGlasgowPediatricRecords);
      localStorage.setItem('glasgowPediatricRecords', JSON.stringify(mockGlasgowPediatricRecords));
    }

    // Cargar registros de Valoración Nutricional
    const savedNutritionalRiskRecords = localStorage.getItem('nutritionalRiskRecords');
    if (savedNutritionalRiskRecords) {
      setNutritionalRiskRecords(JSON.parse(savedNutritionalRiskRecords));
    } else {
      // Si no hay registros guardados, usar los de ejemplo
      setNutritionalRiskRecords(mockNutritionalRiskRecords);
      localStorage.setItem('nutritionalRiskRecords', JSON.stringify(mockNutritionalRiskRecords));
    }

    // Cargar registros de Percentiles Pediátricos
    const savedPercentileRecords = localStorage.getItem('percentileRecords');
    if (savedPercentileRecords) {
      setPercentileRecords(JSON.parse(savedPercentileRecords));
    } else {
      // Si no hay registros guardados, usar los de ejemplo
      setPercentileRecords(mockPercentileRecords);
      localStorage.setItem('percentileRecords', JSON.stringify(mockPercentileRecords));
    }

    // Cargar registros de Braden Q
    const savedBradenRecords = localStorage.getItem('bradenRecords');
    if (savedBradenRecords) {
      setBradenRecords(JSON.parse(savedBradenRecords));
    } else {
      // Si no hay registros guardados, usar los de ejemplo
      setBradenRecords(mockBradenRecords);
      localStorage.setItem('bradenRecords', JSON.stringify(mockBradenRecords));
    }

    // Cargar registros de Riesgo de Caídas Pediátrico
    const savedPediatricFallRiskRecords = localStorage.getItem('pediatricFallRiskRecords');
    if (savedPediatricFallRiskRecords) {
      setPediatricFallRiskRecords(JSON.parse(savedPediatricFallRiskRecords));
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

  useEffect(() => {
    if (glasgowPediatricRecords.length > 0) {
      localStorage.setItem('glasgowPediatricRecords', JSON.stringify(glasgowPediatricRecords));
    }
  }, [glasgowPediatricRecords]);

  useEffect(() => {
    if (nutritionalRiskRecords.length > 0) {
      localStorage.setItem('nutritionalRiskRecords', JSON.stringify(nutritionalRiskRecords));
    }
  }, [nutritionalRiskRecords]);

  useEffect(() => {
    if (percentileRecords.length > 0) {
      localStorage.setItem('percentileRecords', JSON.stringify(percentileRecords));
    }
  }, [percentileRecords]);

  useEffect(() => {
    if (bradenRecords.length > 0) {
      localStorage.setItem('bradenRecords', JSON.stringify(bradenRecords));
    }
  }, [bradenRecords]);

  useEffect(() => {
    if (pediatricFallRiskRecords.length > 0) {
      localStorage.setItem('pediatricFallRiskRecords', JSON.stringify(pediatricFallRiskRecords));
    }
  }, [pediatricFallRiskRecords]);

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

  // Manejadores para Glasgow Pediátrica
  const handleEditGlasgowPediatricRecord = (record: GlasgowPediatricRecord) => {
    setEditingGlasgowPediatricRecord(record);
    setIsGlasgowPediatricFormVisible(true);
  };

  const handleNewGlasgowPediatricRecord = () => {
    setEditingGlasgowPediatricRecord(undefined);
    setIsGlasgowPediatricFormVisible(true);
  };

  const handleSaveGlasgowPediatricRecord = (record: GlasgowPediatricRecord) => {
    if (editingGlasgowPediatricRecord) {
      // Actualizar registro existente
      setGlasgowPediatricRecords(records => records.map(r => r.id === record.id ? record : r));
    } else {
      // Añadir nuevo registro
      setGlasgowPediatricRecords(records => [record, ...records]);
    }
    setIsGlasgowPediatricFormVisible(false);
    setEditingGlasgowPediatricRecord(undefined);
  };

  const handleCancelGlasgowPediatricForm = () => {
    setIsGlasgowPediatricFormVisible(false);
    setEditingGlasgowPediatricRecord(undefined);
  };

  // Manejadores para Valoración Nutricional
  const handleEditNutritionalRiskRecord = (record: NutritionalRiskRecord) => {
    setEditingNutritionalRiskRecord(record);
    setIsNutritionalRiskFormVisible(true);
  };

  const handleNewNutritionalRiskRecord = () => {
    setEditingNutritionalRiskRecord(undefined);
    setIsNutritionalRiskFormVisible(true);
  };

  const handleSaveNutritionalRiskRecord = (record: NutritionalRiskRecord) => {
    if (editingNutritionalRiskRecord) {
      // Actualizar registro existente
      setNutritionalRiskRecords(records => records.map(r => r.id === record.id ? record : r));
    } else {
      // Añadir nuevo registro
      setNutritionalRiskRecords(records => [record, ...records]);
    }
    setIsNutritionalRiskFormVisible(false);
    setEditingNutritionalRiskRecord(undefined);
  };

  const handleCancelNutritionalRiskForm = () => {
    setIsNutritionalRiskFormVisible(false);
    setEditingNutritionalRiskRecord(undefined);
  };

  // Manejadores para Percentiles Pediátricos
  const handleEditPercentileRecord = (record: PercentileRecord) => {
    setEditingPercentileRecord(record);
    setIsPercentileFormVisible(true);
  };

  const handleNewPercentileRecord = () => {
    setEditingPercentileRecord(undefined);
    setIsPercentileFormVisible(true);
  };

  const handleSavePercentileRecord = (record: PercentileRecord) => {
    if (editingPercentileRecord) {
      // Actualizar registro existente
      setPercentileRecords(records => records.map(r => r.id === record.id ? record : r));
    } else {
      // Añadir nuevo registro
      setPercentileRecords(records => [record, ...records]);
    }
    setIsPercentileFormVisible(false);
    setEditingPercentileRecord(undefined);
  };

  const handleCancelPercentileForm = () => {
    setIsPercentileFormVisible(false);
    setEditingPercentileRecord(undefined);
  };

  // Manejadores para Braden Q
  const handleEditBradenRecord = (record: BradenRecord) => {
    setEditingBradenRecord(record);
    setIsBradenFormVisible(true);
  };

  const handleNewBradenRecord = () => {
    setEditingBradenRecord(undefined);
    setIsBradenFormVisible(true);
  };

  const handleSaveBradenRecord = (record: BradenRecord) => {
    if (editingBradenRecord) {
      // Actualizar registro existente
      setBradenRecords(records => records.map(r => r.id === record.id ? record : r));
    } else {
      // Añadir nuevo registro
      setBradenRecords(records => [record, ...records]);
    }
    setIsBradenFormVisible(false);
    setEditingBradenRecord(undefined);
  };

  const handleCancelBradenForm = () => {
    setIsBradenFormVisible(false);
    setEditingBradenRecord(undefined);
  };

  const handleDeleteBradenRecord = (id: string) => {
    setBradenRecords(records => records.filter(r => r.id !== id));
  };

  // Manejadores para Riesgo de Caídas Pediátrico
  const handleEditPediatricFallRiskRecord = (record: PediatricFallRiskRecord) => {
    setEditingPediatricFallRiskRecord(record);
    setIsPediatricFallRiskFormVisible(true);
  };

  const handleNewPediatricFallRiskRecord = () => {
    setEditingPediatricFallRiskRecord(undefined);
    setIsPediatricFallRiskFormVisible(true);
  };

  const handleSavePediatricFallRiskRecord = (record: PediatricFallRiskRecord) => {
    if (editingPediatricFallRiskRecord) {
      // Actualizar registro existente
      setPediatricFallRiskRecords(records => records.map(r => r.id === record.id ? record : r));
    } else {
      // Añadir nuevo registro
      setPediatricFallRiskRecords(records => [record, ...records]);
    }
    setIsPediatricFallRiskFormVisible(false);
    setEditingPediatricFallRiskRecord(undefined);
  };

  const handleCancelPediatricFallRiskForm = () => {
    setIsPediatricFallRiskFormVisible(false);
    setEditingPediatricFallRiskRecord(undefined);
  };

  const handleDeletePediatricFallRiskRecord = (id: string) => {
    setPediatricFallRiskRecords(records => records.filter(r => r.id !== id));
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
        <div
          className={`tab ${activeTab === 'glasgowPediatric' ? 'active' : ''}`}
          onClick={() => setActiveTab('glasgowPediatric')}
        >
          Escala de Glasgow Pediátrica
        </div>
        <div
          className={`tab ${activeTab === 'nutritionalRisk' ? 'active' : ''}`}
          onClick={() => setActiveTab('nutritionalRisk')}
        >
          Valoración Nutricional Pediátrica
        </div>
        <div
          className={`tab ${activeTab === 'percentiles' ? 'active' : ''}`}
          onClick={() => setActiveTab('percentiles')}
        >
          Percentiles Pediátricos
        </div>
        <div
          className={`tab ${activeTab === 'bradenQ' ? 'active' : ''}`}
          onClick={() => setActiveTab('bradenQ')}
        >
          Valoración Riesgo UPP (Braden)
        </div>
        <div
          className={`tab ${activeTab === 'pediatricFallRisk' ? 'active' : ''}`}
          onClick={() => setActiveTab('pediatricFallRisk')}
        >
          Riesgo Caídas Pediátrico
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

        {/* Contenido de la pestaña Glasgow Pediátrica */}
        <div className={`tab-content ${activeTab === 'glasgowPediatric' ? 'active' : ''}`}>
          <div className="records-section">
            <div className="section-header">
              <h2>Historial de Registros de Glasgow Pediátrica (Escala de Coma)</h2>
              <button className="new-record-button" onClick={handleNewGlasgowPediatricRecord}>
                Nuevo Registro
              </button>
            </div>
            <GlasgowPediatricList
              records={glasgowPediatricRecords}
              onEditRecord={handleEditGlasgowPediatricRecord}
            />
          </div>

          {isGlasgowPediatricFormVisible && (
            <div className="form-section">
              <GlasgowPediatricForm
                initialRecord={editingGlasgowPediatricRecord}
                onSave={handleSaveGlasgowPediatricRecord}
                onCancel={handleCancelGlasgowPediatricForm}
              />
            </div>
          )}
        </div>

        {/* Contenido de la pestaña Valoración Nutricional */}
        <div className={`tab-content ${activeTab === 'nutritionalRisk' ? 'active' : ''}`}>
          <div className="records-section">
            <div className="section-header">
              <h2>Historial de Registros de Valoración Nutricional Pediátrica (STAMP)</h2>
              <button className="new-record-button" onClick={handleNewNutritionalRiskRecord}>
                Nuevo Registro
              </button>
            </div>
            <NutritionalRiskList
              records={nutritionalRiskRecords}
              onEditRecord={handleEditNutritionalRiskRecord}
            />
          </div>

          {isNutritionalRiskFormVisible && (
            <div className="form-section">
              <NutritionalRiskForm
                initialRecord={editingNutritionalRiskRecord}
                onSave={handleSaveNutritionalRiskRecord}
                onCancel={handleCancelNutritionalRiskForm}
              />
            </div>
          )}
        </div>

        {/* Contenido de la pestaña Percentiles Pediátricos */}
        <div className={`tab-content ${activeTab === 'percentiles' ? 'active' : ''}`}>
          <div className="records-section">
            <div className="section-header">
              <h2>Historial de Registros de Percentiles Pediátricos (Peso y Talla)</h2>
              <button className="new-record-button" onClick={handleNewPercentileRecord}>
                Nuevo Registro
              </button>
            </div>
            <PercentileList
              records={percentileRecords}
              onEditRecord={handleEditPercentileRecord}
            />
          </div>

          {/* Gráficas generales separadas por género */}
          {percentileRecords.length > 0 && !isPercentileFormVisible && (
            <>
              {/* Gráfica para niños */}
              {percentileRecords.some(r => r.gender === 'male') && (
                <div className="form-section">
                  <PercentileChart
                    gender="male"
                    ageInMonths={0}
                    weight={0}
                    height={0}
                    historicalRecords={percentileRecords.filter(r => r.gender === 'male')}
                  />
                </div>
              )}

              {/* Gráfica para niñas */}
              {percentileRecords.some(r => r.gender === 'female') && (
                <div className="form-section">
                  <PercentileChart
                    gender="female"
                    ageInMonths={0}
                    weight={0}
                    height={0}
                    historicalRecords={percentileRecords.filter(r => r.gender === 'female')}
                  />
                </div>
              )}
            </>
          )}

          {isPercentileFormVisible && (
            <div className="form-section">
              <PercentileForm
                initialRecord={editingPercentileRecord}
                historicalRecords={percentileRecords}
                onSave={handleSavePercentileRecord}
                onCancel={handleCancelPercentileForm}
              />
            </div>
          )}
        </div>

        {/* Contenido de la pestaña Braden Q */}
        <div className={`tab-content ${activeTab === 'bradenQ' ? 'active' : ''}`}>
          <div className="records-section">
            <div className="section-header">
              <h2>Historial de Valoraciones de Riesgo de UPP (Escalas Braden Q y Braden-Bergstrom)</h2>
              <button className="new-record-button" onClick={handleNewBradenRecord}>
                Nueva Valoración
              </button>
            </div>
            <BradenQList
              records={bradenRecords}
              onEdit={handleEditBradenRecord}
              onDelete={handleDeleteBradenRecord}
            />
          </div>

          {isBradenFormVisible && (
            <div className="form-section">
              <BradenQForm
                initialRecord={editingBradenRecord}
                onSave={handleSaveBradenRecord}
                onCancel={handleCancelBradenForm}
              />
            </div>
          )}
        </div>

        {/* Contenido de la pestaña Riesgo de Caídas Pediátrico */}
        <div className={`tab-content ${activeTab === 'pediatricFallRisk' ? 'active' : ''}`}>
          <div className="records-section">
            <div className="section-header">
              <h2>Historial de Valoraciones de Riesgo de Caídas Pediátrico</h2>
              <button className="new-record-button" onClick={handleNewPediatricFallRiskRecord}>
                Nueva Valoración
              </button>
            </div>
            <PediatricFallRiskList
              records={pediatricFallRiskRecords}
              onEdit={handleEditPediatricFallRiskRecord}
              onDelete={handleDeletePediatricFallRiskRecord}
            />
          </div>

          {isPediatricFallRiskFormVisible && (
            <div className="form-section">
              <PediatricFallRiskForm
                initialRecord={editingPediatricFallRiskRecord}
                onSave={handleSavePediatricFallRiskRecord}
                onCancel={handleCancelPediatricFallRiskForm}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;