import React from 'react';

const FollowUpTracker = ({ data, updateData }) => {
  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      discussionNotes: '',
      medicalUpdates: '',
      nextSteps: '',
      employeeInitials: '',
      managerInitials: ''
    };
    
    updateData([...data, newRow]);
  };

  const handleRemoveRow = (id) => {
    const updatedData = data.filter(row => row.id !== id);
    updateData(updatedData);
  };

  const handleInputChange = (id, field, value) => {
    const updatedData = data.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    );
    updateData(updatedData);
  };

  return (
    <section className="follow-up-tracker">
      <h2>WEEKLY FOLLOW-UP TRACKER</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Discussion Notes</th>
            <th>Medical Updates</th>
            <th>Next Steps</th>
            <th>Employee Initials</th>
            <th>Manager Initials</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>
                <input
                  type="date"
                  value={row.date}
                  onChange={(e) => handleInputChange(row.id, 'date', e.target.value)}
                />
              </td>
              <td>
                <textarea
                  rows="3"
                  value={row.discussionNotes}
                  onChange={(e) => handleInputChange(row.id, 'discussionNotes', e.target.value)}
                ></textarea>
              </td>
              <td>
                <textarea
                  rows="3"
                  value={row.medicalUpdates}
                  onChange={(e) => handleInputChange(row.id, 'medicalUpdates', e.target.value)}
                ></textarea>
              </td>
              <td>
                <textarea
                  rows="3"
                  value={row.nextSteps}
                  onChange={(e) => handleInputChange(row.id, 'nextSteps', e.target.value)}
                ></textarea>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="3"
                  value={row.employeeInitials}
                  onChange={(e) => handleInputChange(row.id, 'employeeInitials', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  maxLength="3"
                  value={row.managerInitials}
                  onChange={(e) => handleInputChange(row.id, 'managerInitials', e.target.value)}
                />
              </td>
              <td>
                <button 
                  className="remove-btn"
                  onClick={() => handleRemoveRow(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
        className="add-btn"
        onClick={handleAddRow}
      >
        + Add Follow-up Entry
      </button>
    </section>
  );
};

export default FollowUpTracker;