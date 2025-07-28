import { useState } from 'react';

const DropdownSelect = ({ options, placeholder, value = [], onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    const newValue = value.includes(option)
      ? value.filter(item => item !== option)
      : [...value, option];
    onChange(newValue);
  };

  const getDisplayText = () => {
    if (value.length === 0) return placeholder;
    if (value.length === 1) return value[0];
    return `${value.length} éléments sélectionnés`;
  };

  return (
    <div className="dropdown-container">
      <button
        className={`dropdown-trigger ${disabled ? 'disabled' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span>{getDisplayText()}</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && !disabled && (
        <>
          <div className="dropdown-overlay" onClick={() => setIsOpen(false)} />
          <div className="dropdown-menu">
            {options.map((option, index) => (
              <div
                key={index}
                className="dropdown-item checkbox-item"
                onClick={() => handleSelect(option)}
              >
                <input
                  type="checkbox"
                  checked={value.includes(option)}
                  onChange={() => {}} // Géré par le onClick parent
                  className="dropdown-checkbox"
                />
                <span>{option}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DropdownSelect;