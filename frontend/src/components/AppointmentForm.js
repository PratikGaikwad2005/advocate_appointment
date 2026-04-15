import React, { useState } from 'react';
import { appointmentAPI } from '../services/appointmentService';
import './AppointmentForm.css';

const AppointmentForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    appointmentType: '',
    appointmentDate: '',
    preferredTime: '',
    caseDescription: '',
    caseCategory: '',
    advocateName: '',
    additionalNotes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const response = await appointmentAPI.createAppointment(formData);
      
      if (response.data.success) {
        setSuccessMessage('Appointment created successfully! We will contact you soon.');
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          appointmentType: '',
          appointmentDate: '',
          preferredTime: '',
          caseDescription: '',
          caseCategory: '',
          advocateName: '',
          additionalNotes: ''
        });
        
        // Call parent callback if provided
        if (onSuccess) {
          onSuccess(response.data.data);
        }

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        // Handle validation errors from backend
        const errorObj = {};
        error.response.data.errors.forEach(err => {
          errorObj[err.path] = err.msg;
        });
        setErrors(errorObj);
      } else {
        setErrors({
          submit: error.response?.data?.message || 'Error submitting form. Please try again.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointment-form-container">
      <h2>Book Your Advocate Appointment</h2>
      
      {successMessage && (
        <div className="alert alert-success">
          {successMessage}
        </div>
      )}

      {errors.submit && (
        <div className="alert alert-error">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="appointment-form">
        {/* Personal Information Section */}
        <fieldset className="form-section">
          <legend>Personal Information</legend>

          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number *</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your 10-digit phone number"
              required
              className={errors.phoneNumber ? 'error' : ''}
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>
        </fieldset>

        {/* Appointment Details Section */}
        <fieldset className="form-section">
          <legend>Appointment Details</legend>

          <div className="form-group">
            <label htmlFor="appointmentType">Appointment Type *</label>
            <select
              id="appointmentType"
              name="appointmentType"
              value={formData.appointmentType}
              onChange={handleInputChange}
              required
              className={errors.appointmentType ? 'error' : ''}
            >
              <option value="">Select appointment type</option>
              <option value="Consultation">Consultation</option>
              <option value="Case Review">Case Review</option>
              <option value="Legal Advice">Legal Advice</option>
              <option value="Document Review">Document Review</option>
              <option value="Other">Other</option>
            </select>
            {errors.appointmentType && <span className="error-message">{errors.appointmentType}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="appointmentDate">Appointment Date *</label>
            <input
              type="datetime-local"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleInputChange}
              required
              className={errors.appointmentDate ? 'error' : ''}
            />
            {errors.appointmentDate && <span className="error-message">{errors.appointmentDate}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="preferredTime">Preferred Time *</label>
            <select
              id="preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleInputChange}
              required
              className={errors.preferredTime ? 'error' : ''}
            >
              <option value="">Select preferred time</option>
              <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
              <option value="Afternoon (12 PM - 3 PM)">Afternoon (12 PM - 3 PM)</option>
              <option value="Evening (3 PM - 6 PM)">Evening (3 PM - 6 PM)</option>
            </select>
            {errors.preferredTime && <span className="error-message">{errors.preferredTime}</span>}
          </div>
        </fieldset>

        {/* Case Information Section */}
        <fieldset className="form-section">
          <legend>Case Information</legend>

          <div className="form-group">
            <label htmlFor="caseCategory">Case Category *</label>
            <select
              id="caseCategory"
              name="caseCategory"
              value={formData.caseCategory}
              onChange={handleInputChange}
              required
              className={errors.caseCategory ? 'error' : ''}
            >
              <option value="">Select case category</option>
              <option value="Civil">Civil</option>
              <option value="Criminal">Criminal</option>
              <option value="Corporate">Corporate</option>
              <option value="Family">Family</option>
              <option value="Labour">Labour</option>
              <option value="Property">Property</option>
              <option value="Other">Other</option>
            </select>
            {errors.caseCategory && <span className="error-message">{errors.caseCategory}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="caseDescription">Case Description *</label>
            <textarea
              id="caseDescription"
              name="caseDescription"
              value={formData.caseDescription}
              onChange={handleInputChange}
              placeholder="Describe your case in detail (10-1000 characters)"
              rows="5"
              required
              className={errors.caseDescription ? 'error' : ''}
            />
            <small>
              {formData.caseDescription.length}/1000 characters
            </small>
            {errors.caseDescription && <span className="error-message">{errors.caseDescription}</span>}
          </div>
        </fieldset>

        {/* Additional Information Section */}
        <fieldset className="form-section">
          <legend>Additional Information</legend>

          <div className="form-group">
            <label htmlFor="advocateName">Preferred Advocate Name</label>
            <input
              type="text"
              id="advocateName"
              name="advocateName"
              value={formData.advocateName}
              onChange={handleInputChange}
              placeholder="Enter advocate name (optional)"
              className={errors.advocateName ? 'error' : ''}
            />
            {errors.advocateName && <span className="error-message">{errors.advocateName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="additionalNotes">Additional Notes</label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              placeholder="Any additional information (optional, max 500 characters)"
              rows="3"
              className={errors.additionalNotes ? 'error' : ''}
            />
            <small>
              {formData.additionalNotes.length}/500 characters
            </small>
            {errors.additionalNotes && <span className="error-message">{errors.additionalNotes}</span>}
          </div>
        </fieldset>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
