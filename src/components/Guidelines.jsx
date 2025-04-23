import React from 'react';

const Guidelines = ({ data, updateData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  return (
    <section className="guidelines">
      <h2>Guidelines & Expectations</h2>
      
      <div className="guideline-section">
        <h3>1. Attendance Policy:</h3>
        <ul>
          <li>Standard attendance policies apply while on modified duty</li>
          <li>
            For ANY absences (including injury-related):
            <ul>
              <li>
                Call the attendance office: 
                <input
                  type="text"
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  style={{ width: '200px', marginLeft: '10px' }}
                />
              </li>
              <li>
                AND notify Safety Management: 
                <input
                  type="text"
                  name="safetyContact"
                  value={data.safetyContact}
                  onChange={handleChange}
                  placeholder="Contact Info"
                  style={{ width: '200px', marginLeft: '10px' }}
                />
              </li>
            </ul>
          </li>
        </ul>
      </div>
      
      <div className="guideline-section">
        <h3>2. Medical Appointments:</h3>
        <ul>
          <li>Attend all scheduled medical appointments</li>
          <li>Provide documentation after each medical visit to Safety Management within 24 hours</li>
          <li>Schedule appointments outside of work hours when possible</li>
        </ul>
      </div>
      
      <div className="guideline-section">
        <h3>3. Work Restrictions:</h3>
        <ul>
          <li>Do not work beyond scheduled hours</li>
          <li>Additional shifts require advance approval from Safety Management</li>
          <li>Follow all provider restrictions consistently</li>
          <li>Do not perform tasks outside those listed in this agreement</li>
        </ul>
      </div>
      
      <div className="guideline-section">
        <h3>4. Communication Requirements:</h3>
        <ul>
          <li>Immediately report any changes in medical status or restrictions</li>
          <li>Weekly check-ins with Safety Management are required</li>
          <li>Report any difficulties with assigned tasks promptly</li>
        </ul>
      </div>
    </section>
  );
};

export default Guidelines;