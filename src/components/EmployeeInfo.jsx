import React from 'react';

const EmployeeInfo = ({ data, updateData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  return (
    <section className="employee-info">
      <h2>Employee Information</h2>
      <div className="input-row">
        <div className="input-column">
          <div className="form-group">
            <label htmlFor="name">Employee Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-column">
          <div className="form-group">
            <label htmlFor="id">Employee ID:</label>
            <input
              type="text"
              id="id"
              name="id"
              value={data.id}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="input-row">
        <div className="input-column">
          <div className="form-group">
            <label htmlFor="injuryDate">Date of Injury:</label>
            <input
              type="date"
              id="injuryDate"
              name="injuryDate"
              value={data.injuryDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-column">
          <div className="form-group">
            <label htmlFor="caseNumber">Case #:</label>
            <input
              type="text"
              id="caseNumber"
              name="caseNumber"
              value={data.caseNumber}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="input-row">
        <div className="input-column">
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={data.department}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-column">
          <div className="form-group">
            <label htmlFor="supervisor">Supervisor:</label>
            <input
              type="text"
              id="supervisor"
              name="supervisor"
              value={data.supervisor}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeInfo;