import { useState } from 'react';

const ResumeTable = ({ dashboardSelections, onExport }) => {
  // Données de test pour les dashboards - remplacez par vos vraies données
  const [dashboardsData, setDashboardsData] = useState([
    {
      name: 'Dashboard Analytics',
      environment: 'dev',
      fields: ['User Analytics', 'Traffic Data', 'Conversion Rates'],
      dataview: ['Daily Reports', 'Weekly Summary']
    },
    {
      name: 'Dashboard Monitoring',
      environment: 'prod',
      fields: ['Server Status', 'CPU Usage', 'Memory Usage', 'Network Traffic'],
      dataview: ['Real-time Monitoring', 'Historical Data']
    }
  ]);

  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (dashboardIndex, column, currentValue) => {
    setEditingCell({ dashboardIndex, column });
    setEditValue(Array.isArray(currentValue) ? currentValue.join(', ') : currentValue);
  };

  const handleSave = () => {
    const { dashboardIndex, column } = editingCell;
    const newValue = column === 'fields' || column === 'dataview' 
      ? editValue.split(',').map(item => item.trim()) 
      : editValue;

    setDashboardsData(prev => prev.map((dashboard, index) => 
      index === dashboardIndex 
        ? { ...dashboard, [column]: newValue }
        : dashboard
    ));

    setEditingCell(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const renderCell = (dashboard, column, dashboardIndex) => {
    const isEditing = editingCell?.dashboardIndex === dashboardIndex && editingCell?.column === column;
    const value = dashboard[column];
    const displayValue = Array.isArray(value) ? value.join(', ') : value;

    if (isEditing) {
      return (
        <div className="edit-cell">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="edit-input"
            autoFocus
          />
          <div className="edit-buttons">
            <button onClick={handleSave} className="save-btn">✓</button>
            <button onClick={handleCancel} className="cancel-btn">✕</button>
          </div>
        </div>
      );
    }

    return (
      <div className="cell-content">
        <span>{displayValue}</span>
        <button 
          className="edit-icon"
          onClick={() => handleEdit(dashboardIndex, column, value)}
        >
          ✏️
        </button>
      </div>
    );
  };

  return (
    <div className="resume-container">
      <h1 className="resume-title">RESUMER</h1>
      
      <div className="table-container">
        {dashboardsData.map((dashboard, dashboardIndex) => (
          <div key={dashboardIndex} className="dashboard-section">
            <table className="resume-table">
              <thead>
                <tr>
                  <th className="dashboard-name-header">NOM DU DASHBOARD</th>
                  <th className="old-header">Old</th>
                  <th className="new-header">New</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="row-label">Fields</td>
                  <td className="old-cell">
                    {renderCell(dashboard, 'fields', dashboardIndex)}
                  </td>
                  <td className="new-cell">
                    {renderCell(dashboard, 'fields', dashboardIndex)}
                  </td>
                </tr>
                <tr>
                  <td className="row-label">Dataview</td>
                  <td className="old-cell">
                    {renderCell(dashboard, 'dataview', dashboardIndex)}
                  </td>
                  <td className="new-cell">
                    {renderCell(dashboard, 'dataview', dashboardIndex)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <button className="export-button" onClick={onExport}>
        Export
      </button>
    </div>
  );
};

export default ResumeTable;