import { useState } from 'react'
import EnvironmentSelector from './components/EnvironmentSelector'
import ResumeTable from './components/ResumeTable'
import './App.css'

function App() {
  const [currentStep, setCurrentStep] = useState('selector') // 'selector' ou 'resume'
  const [dashboardSelections, setDashboardSelections] = useState({})

  const handleNext = (selections) => {
    setDashboardSelections(selections)
    setCurrentStep('resume')
  }

  const handleExport = () => {
    console.log('Export des données...')
    alert('Export terminé ! (simulation)')
  }

  const handleBack = () => {
    setCurrentStep('selector')
  }

  return (
    <div className="App">
      {currentStep === 'selector' ? (
        <EnvironmentSelector onNext={handleNext} />
      ) : (
        <div>
          <button className="back-button" onClick={handleBack}>
            ← Retour
          </button>
          <ResumeTable 
            dashboardSelections={dashboardSelections}
            onExport={handleExport}
          />
        </div>
      )}
    </div>
  )
}

export default App

export default App