import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Appointment API calls
export const appointmentAPI = {
  // Create new appointment
  createAppointment: (appointmentData) => {
    return api.post('/appointments', appointmentData);
  },

  // Get all appointments
  getAllAppointments: (status = null) => {
    const params = status ? { status } : {};
    return api.get('/appointments', { params });
  },

  // Get single appointment by ID
  getAppointmentById: (id) => {
    return api.get(`/appointments/${id}`);
  },

  // Update appointment
  updateAppointment: (id, appointmentData) => {
    return api.put(`/appointments/${id}`, appointmentData);
  },

  // Delete appointment
  deleteAppointment: (id) => {
    return api.delete(`/appointments/${id}`);
  }
};

export default api;
