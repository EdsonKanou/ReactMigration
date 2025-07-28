import { useState, useEffect } from 'react';
import DropdownSelect from './DropdownSelect';

const EnvironmentSelector = ({ onNext }) => {
  const [selections, setSelections] = useState({
    dev: [],
    prod: [],
    qual: []
  });

  // Données de test - à remplacer par un appel API vers votre BD
  const [dashboardOptions, setDashboardOptions] = useState({});

  useEffect(() => {
    // Simulation d'un appel API
    const fetchDashboards = async () => {
      // Remplacez ceci par votre vrai appel API
      const mockData = {
        dev: [
          'Dashboard Analytics Dev',
          'Dashboard Monitoring Dev',
          'Dashboard Performance Dev',
          'Dashboard Security Dev'
        ],
        prod: [
          'Dashboard Analytics Prod',
          'Dashboard Monitoring Prod',
          'Dashboard Performance Prod',
          'Dashboard Security Prod',
          'Dashboard Business Prod'
        ],
        qual: [
          'Dashboard Analytics Qual',
          'Dashboard Monitoring Qual',
          'Dashboard Performance Qual'
        ]
      };
      
      setDashboardOptions(mockData);
    };

    fetchDashboards();
  }, []);

  const handleSelectionChange = (environment, value) => {
    setSelections(prev => ({
      ...prev,
      [environment]: value
    }));
  };

  const handleNext = () => {
    console.log('Sélections:', selections);
    if (onNext) {
      onNext(selections);
    }
  };

  const isNextDisabled = selections.dev.length === 0 && selections.prod.length === 0 && selections.qual.length === 0;

  return (
    <div className="selector-container">
      <h1 className="title">Sélectionner les Dashboard</h1>
      
      <div className="environments">
        <div className="environment-row">
          <label className="environment-label">Dev</label>
          <DropdownSelect
            options={dashboardOptions.dev || []}
            placeholder="liste déroulante avec une tchek liste"
            value={selections.dev}
            onChange={(value) => handleSelectionChange('dev', value)}
            disabled={!dashboardOptions.dev?.length}
          />
        </div>

        <div className="environment-row">
          <label className="environment-label">Prod</label>
          <DropdownSelect
            options={dashboardOptions.prod || []}
            placeholder="liste déroulante avec une tchek liste"
            value={selections.prod}
            onChange={(value) => handleSelectionChange('prod', value)}
            disabled={!dashboardOptions.prod?.length}
          />
        </div>

        <div className="environment-row">
          <label className="environment-label">Qual</label>
          <DropdownSelect
            options={dashboardOptions.qual || []}
            placeholder="liste déroulante avec une tchek liste"
            value={selections.qual}
            onChange={(value) => handleSelectionChange('qual', value)}
            disabled={!dashboardOptions.qual?.length}
          />
        </div>
      </div>

      <button 
        className={`next-button ${isNextDisabled ? 'disabled' : ''}`}
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default EnvironmentSelector;