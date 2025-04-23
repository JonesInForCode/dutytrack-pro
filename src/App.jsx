import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import EmployeeInfo from './components/EmployeeInfo';
import Schedule from './components/Schedule';
import ApprovedTasks from './components/ApprovedTasks';
import Guidelines from './components/Guidelines';
import Acknowledgment from './components/Acknowledgment';
import FollowUpTracker from './components/FollowUpTracker';
import FinalClearance from './components/FinalClearance';
import ActionButtons from './components/ActionButtons';
import './App.css';

function App() {
  // Current date/time and user
  const currentDate = "2025-04-23 12:09:55";
  const currentUser = "JonesInForCode";

  const [formData, setFormData] = useState({
    employeeInfo: {
      name: '',
      id: '',
      injuryDate: new Date().toISOString().split('T')[0],
      caseNumber: '',
      department: '',
      supervisor: ''
    },
    schedule: {
      workDays: 'Monday-Friday',
      startTime: '11:30 AM',
      endTime: '3:30 PM',
      weeklyHours: 20,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0]
    },
    tasks: {
      restrictionDate: new Date().toISOString().split('T')[0],
      standardTasks: [
        { id: 1, text: 'Sanitize frequently touched surfaces (door handles, railings, time clocks, scanners, vending machine buttons, and breakroom tables) using provided cleaning supplies', checked: true },
        { id: 2, text: 'Sweep designated trailers using a provided broom', checked: true },
        { id: 3, text: 'Retape packages requiring simple retaping with a tape gun (less than 5 lbs)', checked: true },
        { id: 4, text: 'Restock supplies next to trailer doors (trailer seals, hazmat label bags, tape gun tape)', checked: true },
        { id: 5, text: 'Set up trailers for loading (lowering flaps to prepare for loaders)', checked: true },
        { id: 6, text: 'Consolidate QA items onto flatbed carts (no loading/unloading required)', checked: true },
        { id: 7, text: 'Collect loadnets in unload areas and return them to designated areas', checked: true }
      ],
      customTasks: []
    },
    attendance: {
      phoneNumber: '',
      safetyContact: ''
    },
    signatures: {
      employee: null,
      employeeDate: new Date().toISOString().split('T')[0],
      manager: null,
      managerDate: new Date().toISOString().split('T')[0],
      finalEmployee: null,
      finalEmployeeDate: new Date().toISOString().split('T')[0],
      finalManager: null,
      finalManagerDate: new Date().toISOString().split('T')[0]
    },
    followUp: [
      {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        discussionNotes: '',
        medicalUpdates: '',
        nextSteps: '',
        employeeInitials: '',
        managerInitials: ''
      }
    ],
    finalClearance: {
      releasedFullDuty: false,
      releasedDate: new Date().toISOString().split('T')[0],
      permanentRestrictions: false,
      documentationDate: new Date().toISOString().split('T')[0],
      claimClosed: false,
      closedDate: new Date().toISOString().split('T')[0]
    },
    metadata: {
      createdAt: currentDate,
      createdBy: currentUser,
      lastModified: currentDate,
      lastModifiedBy: currentUser
    }
  });

  // Load saved data on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('modifiedDutyAgreement');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(prevData => ({
          ...parsedData,
          metadata: {
            ...parsedData.metadata,
            lastModified: currentDate,
            lastModifiedBy: currentUser
          }
        }));
      } catch (e) {
        console.error('Failed to parse saved data:', e);
      }
    }
  }, [currentDate, currentUser]);

  // Handle form data updates
  const updateFormData = (section, data) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        ...data
      },
      metadata: {
        ...prevData.metadata,
        lastModified: currentDate,
        lastModifiedBy: currentUser
      }
    }));
  };

  // Save form data to localStorage
  const saveFormData = () => {
    localStorage.setItem('modifiedDutyAgreement', JSON.stringify(formData));
    alert('Agreement saved successfully!');
  };

  // Print the document
  const printDocument = () => {
    window.print();
  };

  // Export as PDF (would require a PDF library in a real implementation)
  const exportPDF = () => {
    alert('In a production environment, this would use a library like jsPDF to generate a PDF file.');
  };

  // Component that contains all the form sections
  const MainContent = () => (
    <div className="container">
      <Header metadata={formData.metadata} />
      <EmployeeInfo 
        data={formData.employeeInfo} 
        updateData={(data) => updateFormData('employeeInfo', data)} 
      />
      
      <Schedule 
        data={formData.schedule} 
        updateData={(data) => updateFormData('schedule', data)} 
      />
      
      <ApprovedTasks 
        data={formData.tasks} 
        updateData={(data) => updateFormData('tasks', data)} 
      />
      
      <Guidelines 
        data={formData.attendance} 
        updateData={(data) => updateFormData('attendance', data)} 
      />
      
      <Acknowledgment 
        data={formData.signatures} 
        updateData={(data) => updateFormData('signatures', data)} 
      />
      
      <FollowUpTracker 
        data={formData.followUp} 
        updateData={(data) => updateFormData('followUp', data)} 
      />
      
      <FinalClearance 
        data={formData.finalClearance} 
        signatures={formData.signatures}
        updateClearanceData={(data) => updateFormData('finalClearance', data)}
        updateSignatureData={(data) => updateFormData('signatures', data)}
      />
      
      <ActionButtons 
        onSave={saveFormData} 
        onPrint={printDocument} 
        onExport={exportPDF} 
      />
    </div>
  );

  // Create router configuration
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainContent />
    }
  ]);

  // Return RouterProvider instead of using Router/Routes/Route
  return <RouterProvider router={router} />;
}

export default App;