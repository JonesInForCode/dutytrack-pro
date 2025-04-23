import React from 'react';

const Schedule = ({ data, updateData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  return (
    <section className="schedule">
      <h2>Modified Duty Schedule</h2>
      
      <div className="form-group">
        <label htmlFor="workDays">Work Days:</label>
        <input
          type="text"
          id="workDays"
          name="workDays"
          value={data.workDays}
          onChange={handleChange}
          placeholder="e.g., Monday-Friday"
        />
      </div>
      
      <div className="input-row">
        <div className="input-column">
          <div className="form-group">
            <label htmlFor="startTime">Start Time:</label>
            <input
              type="text"
              id="startTime"
              name="startTime"
              value={data.startTime}
              onChange={handleChange}
              placeholder="e.g., 11:30 AM"
            />
          </div>
        </div>
        <div className="input-column">
          <div className="form-group">
            <label htmlFor="endTime">End Time:</label>
            <input
              type="text"
              id="endTime"
              name="endTime"
              value={data.endTime}
              onChange={handleChange}
              placeholder="e.g., 3:30 PM"
            />
          </div>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="weeklyHours">Weekly Hours:</label>
        <input
          type="number"
          id="weeklyHours"
          name="weeklyHours"
          value={data.weeklyHours}
          onChange={handleChange}
          min="1"
          max="40"
        />
      </div>
      
      <div className="input-row">
        <div className="input-column">
          <div className="form-group">
            <label htmlFor="startDate">Effective Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={data.startDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-column">
          <div className="form-group">
            <label htmlFor="endDate">Effective End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={data.endDate}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;