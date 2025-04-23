import React from 'react';

const ActionButtons = ({ onSave, onPrint, onExport }) => {
  return (
    <div className="action-buttons">
      <button 
        className="action-btn save-btn"
        onClick={onSave}
      >
        Save Agreement
      </button>
      <button 
        className="action-btn print-btn"
        onClick={onPrint}
      >
        Print Agreement
      </button>
      <button 
        className="action-btn export-btn"
        onClick={onExport}
      >
        Export to PDF
      </button>
    </div>
  );
};

export default ActionButtons;