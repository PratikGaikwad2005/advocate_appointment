const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    // Personal Information
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/.+\@.+\..+/, 'Please provide a valid email'],
      lowercase: true
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\d{10,}$/, 'Phone number must contain at least 10 digits']
    },
    
    // Appointment Details
    appointmentType: {
      type: String,
      enum: ['Consultation', 'Case Review', 'Legal Advice', 'Document Review', 'Other'],
      required: [true, 'Appointment type is required']
    },
    appointmentDate: {
      type: Date,
      required: [true, 'Appointment date is required'],
      validate: {
        validator: function (value) {
          return value > new Date();
        },
        message: 'Appointment date must be in the future'
      }
    },
    preferredTime: {
      type: String,
      enum: ['Morning (9 AM - 12 PM)', 'Afternoon (12 PM - 3 PM)', 'Evening (3 PM - 6 PM)'],
      required: [true, 'Preferred time is required']
    },
    
    // Case Information
    caseDescription: {
      type: String,
      required: [true, 'Case description is required'],
      minlength: [10, 'Case description must be at least 10 characters'],
      maxlength: [1000, 'Case description cannot exceed 1000 characters']
    },
    caseCategory: {
      type: String,
      enum: ['Civil', 'Criminal', 'Corporate', 'Family', 'Labour', 'Property', 'Other'],
      required: [true, 'Case category is required']
    },
    
    // Additional Information
    advocateName: {
      type: String,
      trim: true
    },
    additionalNotes: {
      type: String,
      maxlength: [500, 'Additional notes cannot exceed 500 characters']
    },
    
    // Status
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
      default: 'Pending'
    },
    
    // Metadata
    createdAt: {
      type: Date,
      default: Date.now,
      index: true  // Index for faster queries on creation date
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true  // Automatically manage createdAt and updatedAt
  }
);

// Index for common queries
appointmentSchema.index({ email: 1 });
appointmentSchema.index({ appointmentDate: 1 });
appointmentSchema.index({ status: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
