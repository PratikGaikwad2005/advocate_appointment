const express = require('express');
const { body, validationResult } = require('express-validator');
const Appointment = require('../models/Appointment');

const router = express.Router();

// Validation middleware
const appointmentValidation = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2 }).withMessage('Full name must be at least 2 characters'),
  body('email')
    .isEmail().withMessage('Please provide a valid email address'),
  body('phoneNumber')
    .matches(/^\d{10,}$/).withMessage('Phone number must contain at least 10 digits'),
  body('appointmentType')
    .notEmpty().withMessage('Appointment type is required')
    .isIn(['Consultation', 'Case Review', 'Legal Advice', 'Document Review', 'Other']),
  body('appointmentDate')
    .isISO8601().withMessage('Invalid date format')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Appointment date must be in the future');
      }
      return true;
    }),
  body('preferredTime')
    .notEmpty().withMessage('Preferred time is required')
    .isIn(['Morning (9 AM - 12 PM)', 'Afternoon (12 PM - 3 PM)', 'Evening (3 PM - 6 PM)']),
  body('caseDescription')
    .trim()
    .notEmpty().withMessage('Case description is required')
    .isLength({ min: 10, max: 1000 }).withMessage('Case description must be between 10 and 1000 characters'),
  body('caseCategory')
    .notEmpty().withMessage('Case category is required')
    .isIn(['Civil', 'Criminal', 'Corporate', 'Family', 'Labour', 'Property', 'Other']),
  body('advocateName')
    .optional()
    .trim(),
  body('additionalNotes')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Additional notes cannot exceed 500 characters')
];

// Error handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }
  next();
};

/**
 * POST /api/appointments
 * Create a new appointment
 */
router.post('/', appointmentValidation, handleValidationErrors, async (req, res) => {
  try {
    const appointmentData = {
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      appointmentType: req.body.appointmentType,
      appointmentDate: req.body.appointmentDate,
      preferredTime: req.body.preferredTime,
      caseDescription: req.body.caseDescription,
      caseCategory: req.body.caseCategory,
      advocateName: req.body.advocateName || null,
      additionalNotes: req.body.additionalNotes || null,
      status: 'Pending'
    };

    const appointment = new Appointment(appointmentData);
    const savedAppointment = await appointment.save();

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: savedAppointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating appointment',
      error: error.message
    });
  }
});

/**
 * GET /api/appointments
 * Get all appointments (optional: filter by status)
 */
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    const appointments = await Appointment.find(query)
      .sort({ appointmentDate: 1 })
      .lean(); // Use lean() for read-only operations to improve performance

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message
    });
  }
});

/**
 * GET /api/appointments/:id
 * Get a single appointment by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointment',
      error: error.message
    });
  }
});

/**
 * PUT /api/appointments/:id
 * Update an appointment
 */
router.put('/:id', async (req, res) => {
  try {
    const allowedUpdates = [
      'fullName', 'email', 'phoneNumber', 'appointmentType',
      'appointmentDate', 'preferredTime', 'caseDescription',
      'caseCategory', 'advocateName', 'additionalNotes', 'status'
    ];

    const updates = {};
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating appointment',
      error: error.message
    });
  }
});

/**
 * DELETE /api/appointments/:id
 * Delete an appointment
 */
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting appointment',
      error: error.message
    });
  }
});

module.exports = router;
