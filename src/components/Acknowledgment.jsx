import React, { useRef, useEffect } from 'react';

const Acknowledgment = ({ data, updateData }) => {
  const employeeCanvasRef = useRef(null);
  const managerCanvasRef = useRef(null);
  
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  useEffect(() => {
    setupSignatureCanvas(employeeCanvasRef.current, 'employee');
    setupSignatureCanvas(managerCanvasRef.current, 'manager');
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
        updateData({ [`${type}`]: signatureData });
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
    const canvas = type === 'employee' ? employeeCanvasRef.current : managerCanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateData({ [type]: null });
  };

  return (
    <section className="acknowledgment">
      <h2>Acknowledgment & Agreement</h2>
      <p>I understand that:</p>
      <ul>
        <li>This modified duty assignment is temporary and will be regularly reviewed</li>
        <li>Normal attendance policies apply to my modified duty schedule</li>
        <li>I must follow all restrictions and only perform approved tasks</li>
        <li>I will attend weekly follow-up meetings with Safety Management</li>
        <li>Failure to comply with these requirements may result in disciplinary action and/or affect my workers' compensation benefits</li>
      </ul>

      <div className="signature-row">
        <div className="signature-column">
          <div className="form-group signature-container">
            <label>Employee Signature:</label>
            <canvas 
              ref={employeeCanvasRef} 
              width="400" 
              height="100"
            ></canvas>
            <button 
              className="clear-btn" 
              onClick={() => clearSignature('employee')}
            >
              Clear
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="employeeDate">Date:</label>
            <input
              type="date"
              id="employeeDate"
              name="employeeDate"
              value={data.employeeDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
        
        <div className="signature-column">
          <div className="form-group signature-container">
            <label>Safety Management Rep:</label>
            <canvas 
              ref={managerCanvasRef} 
              width="400" 
              height="100"
            ></canvas>
            <button 
              className="clear-btn" 
              onClick={() => clearSignature('manager')}
            >
              Clear
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="managerDate">Date:</label>
            <input
              type="date"
              id="managerDate"
              name="managerDate"
              value={data.managerDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Acknowledgment;