# Advocate Appointment Form - MERN Stack

A complete **MERN Stack** (MongoDB, Express, React, Node.js) application for managing advocate appointment bookings. Users can fill out a form to book appointments, and all data is automatically saved to a MongoDB Atlas database.

## 📋 Project Structure

```
ass6/
├── backend/
│   ├── config/
│   │   └── database.js           # MongoDB connection configuration
│   ├── models/
│   │   └── Appointment.js        # Mongoose schema for appointments
│   ├── routes/
│   │   └── appointmentRoutes.js  # API endpoints for CRUD operations
│   ├── package.json              # Backend dependencies
│   ├── server.js                 # Express server setup
│   └── .env.example              # Environment variables template
│
├── frontend/
│   ├── public/
│   │   └── index.html            # HTML entry point
│   ├── src/
│   │   ├── components/
│   │   │   ├── AppointmentForm.js       # Form component
│   │   │   └── AppointmentForm.css      # Form styling
│   │   ├── services/
│   │   │   └── appointmentService.js    # API client service
│   │   ├── App.js                # Main App component
│   │   ├── App.css               # App styling
│   │   ├── index.js              # React entry point
│   │   └── index.css             # Global styles
│   ├── package.json              # Frontend dependencies
│   └── .env.example              # Environment variables template
│
└── README.md                      # This file
```

## 🚀 Features

- ✅ **Responsive Form** - Works on desktop, tablet, and mobile devices
- ✅ **Real-time Validation** - Client and server-side form validation
- ✅ **MongoDB Atlas Integration** - Secure connection with optimized pooling
- ✅ **RESTful API** - Complete CRUD operations for appointments
- ✅ **Error Handling** - Comprehensive error messages and feedback
- ✅ **Professional UI** - Modern, user-friendly interface with gradient design
- ✅ **Appointment Management** - View, update, and delete appointments (via API)

## 📋 Form Fields

### Personal Information
- Full Name (required)
- Email Address (required, validated)
- Phone Number (required, 10+ digits)

### Appointment Details
- Appointment Type (Consultation, Case Review, Legal Advice, Document Review, Other)
- Appointment Date (future dates only)
- Preferred Time (Morning, Afternoon, Evening)

### Case Information
- Case Category (Civil, Criminal, Corporate, Family, Labour, Property, Other)
- Case Description (10-1000 characters)

### Additional Information
- Preferred Advocate Name (optional)
- Additional Notes (optional, max 500 characters)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** - [Create Free Account](https://www.mongodb.com/cloud/atlas)

## 📦 Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up MongoDB Atlas Connection

**Create a Free MongoDB Atlas Cluster:**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new **Project**
4. Create a new **Cluster** (M0 free tier)
5. Create a **Database User**:
   - Go to Database Access
   - Add Database User
   - Save username and password
6. Get **Connection String**:
   - Go to Cluster → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<database-name>`

### 4. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/advocate_db?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Connection String Example:**
```
mongodb+srv://admin:password123@advocate-cluster.mongodb.net/advocate_db?retryWrites=true&w=majority
```

### 5. Start the Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

The backend will run on `http://localhost:5000`

You should see:
```
MongoDB Connected: advocate-cluster.mongodb.net
Server is running on port 5000
```

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd ../frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
cp .env.example .env
```

Edit `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start the Frontend

```bash
npm start
```

The React app will automatically open at `http://localhost:3000`

## 📱 How to Use

1. **Open the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

2. **Fill the Form**
   - Enter all required fields (marked with *)
   - Validation messages will appear for invalid entries
   - Real-time character count for text areas

3. **Submit the Appointment**
   - Click "Book Appointment" button
   - Form sends data to backend API
   - Data is automatically saved to MongoDB

4. **Success Feedback**
   - Green success message appears
   - Form resets for new entry
   - You can submit multiple appointments

## 🔌 API Endpoints

The backend provides the following API endpoints at `http://localhost:5000/api/appointments`:

### Create Appointment
```http
POST /api/appointments
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "9876543210",
  "appointmentType": "Consultation",
  "appointmentDate": "2024-04-20T10:00:00",
  "preferredTime": "Morning (9 AM - 12 PM)",
  "caseDescription": "Need legal advice for contract dispute",
  "caseCategory": "Civil",
  "advocateName": "Jane Smith",
  "additionalNotes": "Urgent matter"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Appointment created successfully",
  "data": {
    "_id": "60d5ec49c4a....",
    "fullName": "John Doe",
    "email": "john@example.com",
    ...
    "createdAt": "2024-04-15T10:30:00Z",
    "updatedAt": "2024-04-15T10:30:00Z"
  }
}
```

### Get All Appointments
```http
GET /api/appointments
GET /api/appointments?status=Pending
```

### Get Specific Appointment
```http
GET /api/appointments/:id
```

### Update Appointment
```http
PUT /api/appointments/:id
Content-Type: application/json

{
  "status": "Confirmed"
}
```

### Delete Appointment
```http
DELETE /api/appointments/:id
```

### Health Check
```http
GET /api/health
```

## 🔒 MongoDB Connection Security Features

The MongoDB connection is configured with production-ready security:

- **Connection Pooling**: Optimized for typical web applications
  - `maxPoolSize: 10` - Handles concurrent requests
  - `minPoolSize: 5` - Pre-warmed connections
  - `maxIdleTimeMS: 300000` - Releases unused connections

- **Timeouts**:
  - `connectTimeoutMS: 10000` - Connection timeout
  - `socketTimeoutMS: 45000` - Query timeout
  - `serverSelectionTimeoutMS: 5000` - Failover timeout

- **Data Integrity**:
  - `retryWrites: true` - Automatic retry for transient failures
  - `w: 'majority'` - Write concern for replica sets

## 🛠️ Troubleshooting

### MongoDB Connection Error
**Error:** `MongooseError: Cannot connect to MongoDB`

**Solutions:**
1. Check MongoDB Atlas is running
2. Verify connection string is correct
3. Enable IP Whitelist in MongoDB Atlas
4. Check credentials (username/password)
5. Ensure database name is included in URL

### Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`

**Solutions:**
```bash
# Change PORT in .env file
PORT=5001

# Or kill the process using the port (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS Errors
**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solutions:**
1. Verify `FRONTEND_URL` in backend `.env`
2. Check frontend is running on correct port
3. Restart backend after changing `.env`

### Form Won't Submit
**Check:**
1. Backend server is running (`npm run dev`)
2. MongoDB is connected
3. Check browser console for errors
4. Verify API URL in `.env.example`
5. Check all required fields are filled

## 📊 Database Schema

MongoDB stores appointments with the following structure:

```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String,
  phoneNumber: String,
  appointmentType: String,
  appointmentDate: Date,
  preferredTime: String,
  caseDescription: String,
  caseCategory: String,
  advocateName: String,
  additionalNotes: String,
  status: String, // Pending, Confirmed, Cancelled, Completed
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes for Performance:**
- `email` - Fast lookup for existing appointments
- `appointmentDate` - Schedule queries
- `status` - Filter by appointment status
- `createdAt` - Sorting and analytics

## 🚀 Deployment

### Deploy Backend (Heroku/Railway/Render)
1. Push code to GitHub
2. Connect to deployment platform
3. Add environment variables
4. Deploy

### Deploy Frontend (Vercel/Netlify)
1. Update `REACT_APP_API_URL` to production API
2. Connect GitHub to Netlify/Vercel
3. Deploy automatically

### MongoDB Atlas Production Settings
1. Enable **IP Whitelist** for production IPs
2. Use **VPC Peering** for enhanced security
3. Enable **Encryption at Rest**
4. Set up **Automated Backups**
5. Monitor with **Atlas Charts**

## 📚 Dependencies

### Backend
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **express-validator** - Data validation
- **nodemon** - Development auto-reload

### Frontend
- **react** - UI framework
- **react-dom** - React DOM rendering
- **axios** - HTTP client
- **react-router-dom** - Navigation

## 📝 License

This project is open source and available under the MIT License.

## ✉️ Support

For issues or questions:
1. Check MongoDB Atlas status
2. Review error messages in console
3. Verify all environment variables
4. Check backend/frontend logs

## 🎯 Next Steps

1. **Add Authentication** - Implement user login/signup
2. **Email Notifications** - Send confirmation emails
3. **Admin Dashboard** - View and manage appointments
4. **Calendar Integration** - Visual appointment scheduling
5. **Payment Integration** - Handle payments if needed
6. **SMS Notifications** - Send SMS reminders

---

**Happy Coding!** 🚀
