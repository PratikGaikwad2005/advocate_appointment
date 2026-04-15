import React from 'react';
import AppointmentForm from './components/AppointmentForm';
import './App.css';

function App() {
  const handleAppointmentSuccess = (appointmentData) => {
    console.log('Appointment saved:', appointmentData);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>Advocate Appointment System</h1>
          <p>Book your legal consultation with our experienced advocates</p>
        </div>
      </header>

      <main className="app-main">
        <AppointmentForm onSuccess={handleAppointmentSuccess} />
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Advocate Appointment System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
