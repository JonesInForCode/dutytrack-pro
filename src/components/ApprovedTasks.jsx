import React from 'react';

const ApprovedTasks = ({ data, updateData }) => {
  const handleRestrictionDateChange = (e) => {
    updateData({ restrictionDate: e.target.value });
  };

  const handleTaskCheckChange = (id) => {
    const updatedTasks = data.standardTasks.map(task => 
      task.id === id ? { ...task, checked: !task.checked } : task
    );
    updateData({ standardTasks: updatedTasks });
  };

  const handleRemoveTask = (id) => {
    const updatedTasks = data.standardTasks.filter(task => task.id !== id);
    updateData({ standardTasks: updatedTasks });
  };

  const handleAddCustomTask = () => {
    const newCustomTask = {
      id: `custom-${Date.now()}`,
      text: '',
      checked: true
    };
    updateData({ customTasks: [...data.customTasks, newCustomTask] });
  };

  const handleCustomTaskChange = (id, value) => {
    const updatedCustomTasks = data.customTasks.map(task => 
      task.id === id ? { ...task, text: value } : task
    );
    updateData({ customTasks: updatedCustomTasks });
  };

  const handleCustomTaskCheckChange = (id) => {
    const updatedCustomTasks = data.customTasks.map(task => 
      task.id === id ? { ...task, checked: !task.checked } : task
    );
    updateData({ customTasks: updatedCustomTasks });
  };

  const handleRemoveCustomTask = (id) => {
    const updatedCustomTasks = data.customTasks.filter(task => task.id !== id);
    updateData({ customTasks: updatedCustomTasks });
  };

  return (
    <section className="approved-tasks">
      <h2>Approved Modified Duty Tasks</h2>
      <div className="form-group">
        <label htmlFor="restrictionDate">Based on your provider's restrictions dated:</label>
        <input
          type="date"
          id="restrictionDate"
          name="restrictionDate"
          value={data.restrictionDate}
          onChange={handleRestrictionDateChange}
        />
      </div>
      <p>You are approved to perform the following tasks:</p>
      
      <div className="tasks-list">
        {data.standardTasks.map(task => (
          <div key={task.id} className="task-item">
            <input
              type="checkbox"
              id={`task-${task.id}`}
              checked={task.checked}
              onChange={() => handleTaskCheckChange(task.id)}
            />
            <span className="task-text">{task.text}</span>
            <button 
              className="remove-btn"
              onClick={() => handleRemoveTask(task.id)}
            >
              Remove
            </button>
          </div>
        ))}
        
        {data.customTasks.map(task => (
          <div key={task.id} className="task-item">
            <input
              type="checkbox"
              id={`task-${task.id}`}
              checked={task.checked}
              onChange={() => handleCustomTaskCheckChange(task.id)}
            />
            <input
              type="text"
              value={task.text}
              onChange={(e) => handleCustomTaskChange(task.id, e.target.value)}
              placeholder="Enter custom task"
              className="task-text"
            />
            <button 
              className="remove-btn"
              onClick={() => handleRemoveCustomTask(task.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      
      <button 
        className="add-btn"
        onClick={handleAddCustomTask}
      >
        + Add Custom Task
      </button>
      
      <p className="note">
        <em>Note: If any task causes discomfort or pain, stop immediately and notify your supervisor and safety management.</em>
      </p>
    </section>
  );
};

export default ApprovedTasks;