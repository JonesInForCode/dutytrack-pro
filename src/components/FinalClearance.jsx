import React, { useRef, useEffect } from 'react';

const FinalClearance = ({ data, signatures, updateClearanceData, updateSignatureData }) => {
  const finalEmployeeCanvasRef = useRef(null);
  const finalManagerCanvasRef = useRef(null);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateClearanceData({ 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    updateSignatureData({ [name]: value });
  };

  useEffect(() => {
    setupSignatureCanvas(finalEmployeeCanvasRef.current, 'finalEmployee');
    setupSignatureCanvas(finalManagerCanvasRef.current, 'finalManager');
  }, []);

  const setupSignatureCanvas = (canvas, type) => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    
    // Set canvas styling
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Mouse event handlers
    const startDrawing = (e) => {
      isDrawing = true;
      const { offsetX, offsetY } = getCoordinates(e);
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
    };
    
    const draw = (e) => {
      if (!isDrawing) return;
      const { offsetX, offsetY } = getCoordinates(e);
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    };
    
    const stopDrawing = () => {
      if (isDrawing) {
        isDrawing = false;
        // Save signature data
        const signatureData = canvas.toDataURL();
        updateSignatureData({ [`${type}`]: signatureData });
      }
    };
    
    const getCoordinates = (e) => {
      let offsetX, offsetY;
      
      if (e.type.includes('touch')) {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
      } else {
        offsetX = e.offsetX;
        offsetY = e.offsetY;
      }
      
      return { offsetX, offsetY };
    };
    
    // Add event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startDrawing(e);
    });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      draw(e);
    });
    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      stopDrawing();
    });
  };

  const clearSignature = (type) => {
    const canvas = type === 'finalEmployee' ? finalEmployeeCanvasRef.current : finalManagerCanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateSignatureData({ [type]: null });
  };

  return (
    <section className="final-clearance">
      <h2>FINAL CLEARANCE</h2>
      
      <div className="clearance-options">
        <div className="form-group">
          <input
            type="checkbox"
            id="releasedFullDuty"
            name="releasedFullDuty"
            checked={data.releasedFullDuty}
            onChange={handleChange}
          />
          <label htmlFor="releasedFullDuty">Released to full duty</label>
          <label htmlFor="releasedDate" style={{ marginLeft: '10px' }}>Effective Date:</label>
          <input
            type="date"
            id="releasedDate"
            name="releasedDate"
            value={data.releasedDate}
            onChange={handleChange}
            style={{ width: '150px', marginLeft: '5px' }}
          />
        </div>
        
        <div className="form-group">
          <input
            type="checkbox"
            id="permanentRestrictions"
            name="permanentRestrictions"
            checked={data.permanentRestrictions}
            onChange={handleChange}
          />
          <label htmlFor="permanentRestrictions">Permanent restrictions</label>
          <label htmlFor="documentationDate" style={{ marginLeft: '10px' }}>Documentation Date:</label>
          <input
            type="date"
            id="documentationDate"
            name="documentationDate"
            value={data.documentationDate}
            onChange={handleChange}
            style={{ width: '150px', marginLeft: '5px' }}
          />
        </div>
        
        <div className="form-group">
          <input
            type="checkbox"
            id="claimClosed"
            name="claimClosed"
            checked={data.claimClosed}
            onChange={handleChange}
          />
          <label htmlFor="claimClosed">Claim closed</label>
          <label htmlFor="closedDate" style={{ marginLeft: '10px' }}>Date:</label>
          <input
            type="date"
            id="closedDate"
            name="closedDate"
            value={data.closedDate}
            onChange={handleChange}
            style={{ width: '150px', marginLeft: '5px' }}
          />
        </div>
      </div>

      <div className="signature-row">
        <div className="signature-column">
          <div className="form-group signature-container">
            <label>Employee Acknowledgment:</label>
            <canvas 
              ref={finalEmployeeCanvasRef} 
              width="400" 
              height="100"
            ></canvas>
            <button 
              className="clear-btn" 
              onClick={() => clearSignature('finalEmployee')}
            >
              Clear
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="finalEmployeeDate">Date:</label>
            <input
              type="date"
              id="finalEmployeeDate"
              name="finalEmployeeDate"
              value={signatures.finalEmployeeDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
        
        <div className="signature-column">
          <div className="form-group signature-container">
            <label>Safety Management Verification:</label>
            <canvas 
              ref={finalManagerCanvasRef} 
              width="400" 
              height="100"
            ></canvas>
            <button 
              className="clear-btn" 
              onClick={() => clearSignature('finalManager')}
            >
              Clear
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="finalManagerDate">Date:</label>
            <input
              type="date"
              id="finalManagerDate"
              name="finalManagerDate"
              value={signatures.finalManagerDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalClearance;