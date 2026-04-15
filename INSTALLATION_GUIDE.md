# 🔧 Installation & Setup Guide

## Prerequisites Check

Before starting, ensure you have:

```bash
# Check Node.js installation
node --version  # Should be v14 or higher

# Check npm installation
npm --version   # Should be v6 or higher
```

If not installed, download from [nodejs.org](https://nodejs.org/)

---

## Step 1: MongoDB Atlas Setup (Free Account)

### 1.1 Create MongoDB Account
- Go to https://www.mongodb.com/cloud/atlas
- Click "Try Free" or "Sign Up"
- Create account with email

### 1.2 Create Organization & Project
- Click "Create an Organization"
- Name it "Advocate Appointments"
- Create a new Project

### 1.3 Create a Free Cluster
- Click "Build a Database"
- Select "M0 Free" (free tier)
- Choose region closest to you
- Click "Create Cluster"
- Wait 5-10 minutes for cluster to initialize

### 1.4 Create Database User
```
Steps:
1. Left sidebar → Security → Database Access
2. Click "Add New Database User"
3. Username: admin
4. Password: (Create strong password, save it!)
5. Database User Privileges: Read and write to any database
6. Click "Add User"
```

### 1.5 Get Connection String
```
Steps:
1. Left sidebar → Deployment → Databases
2. Click "Connect" button
3. Choose "Connect your application"
4. Select Driver: Node.js, Version: 4.0 or later
5. Copy the entire connection string

Example format:
mongodb+srv://admin:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

### 1.6 Whitelist Your IP (Important!)
```
Steps:
1. Left sidebar → Security → Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Confirm
```

---

## Step 2: Backend Installation & Setup

### 2.1 Install Backend Dependencies

```bash
# Navigate to backend folder
cd backend

# Install all dependencies
npm install

# This installs:
# - express (web framework)
# - mongoose (MongoDB driver)
# - cors (cross-origin requests)
# - dotenv (environment variables)
# - express-validator (input validation)
# - nodemon (auto-reload in development)
```

### 2.2 Create Environment File

Create `.env` file in `backend/` folder:

```bash
# Create the file
copy .env.example .env

# Or if on Mac/Linux:
cp .env.example .env
```

Edit `.env` file and add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster-name.mongodb.net/advocate_db?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Important:** Replace:
- `admin` → your database username
- `YOUR_PASSWORD` → your database password
- `cluster-name` → your MongoDB cluster name
- `advocate_db` → database name (can be any name)

### 2.3 Test Backend Connection

```bash
# Start the server in development mode
npm run dev

# Expected output:
# MongoDB Connected: cluster-name.mongodb.net
# Server is running on port 5000
```

✅ If you see this, backend is working!

### 2.4 Test API Health Check

Open browser or use curl:
```
URL: http://localhost:5000/api/health

Expected response:
{
  "success": true,
  "message": "Server is running"
}
```

---

## Step 3: Frontend Installation & Setup

### 3.1 Open New Terminal/Command Prompt

```bash
# Navigate to frontend folder
cd frontend

# If you're still in backend, go back first:
cd ..
cd frontend
```

### 3.2 Install Frontend Dependencies

```bash
npm install

# This installs:
# - react (UI framework)
# - axios (HTTP client)
# - react-router-dom (navigation)
# - react-scripts (build tools)
```

### 3.3 Create Environment File

```bash
# Create the file
copy .env.example .env

# Or on Mac/Linux:
cp .env.example .env
```

Edit `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3.4 Start Frontend Server

```bash
npm start

# Expected output:
# On Your Network: http://192.168.x.x:3000
# Local: http://localhost:3000
# 
# webpack compiled...
# Compiled successfully!
```

✅ Browser will automatically open at http://localhost:3000

---

## Step 4: Test the Application

### 4.1 Verify Everything is Running

**Terminal 1 (Backend):**
```bash
# Should show:
MongoDB Connected: cluster-name.mongodb.net
Server is running on port 5000
```

**Terminal 2 (Frontend):**
```bash
# Should show:
Compiled successfully!
On Your Network: http://...
```

### 4.2 Test Form Submission

1. **Open** http://localhost:3000 (should open automatically)

2. **Fill the Form:**
   - Full Name: John Doe
   - Email: john@example.com
   - Phone: 9876543210
   - Appointment Type: Consultation
   - Appointment Date: Pick a future date
   - Preferred Time: Morning (9 AM - 12 PM)
   - Case Category: Civil
   - Case Description: I need legal advice for a contract dispute

3. **Click** "Book Appointment"

4. **Expected Result:**
   - Green success message appears
   - Form clears
   - No errors in console

### 4.3 Verify Data in MongoDB

1. **Go to** MongoDB Atlas
2. **Click** Your Cluster
3. **Click** "Collections"
4. **Navigate:**
   - Database: `advocate_db`
   - Collection: `appointments`
5. **See** your appointment data saved!

---

## 🎯 Running the Full Application

### Every Time You Want to Use It

**Terminal 1: Start Backend**
```bash
cd backend
npm run dev
```

Wait for:
```
MongoDB Connected: ....
Server is running on port 5000
```

**Terminal 2: Start Frontend**
```bash
cd frontend
npm start
```

Wait for:
```
Compiled successfully!
```

**Open Browser:** http://localhost:3000

---

## ❌ Troubleshooting

### "Cannot find module 'express'"
```bash
# Solution: Install dependencies
cd backend
npm install
```

### "PORT 5000 already in use"
```bash
# Solution 1: Change PORT in .env
PORT=5001

# Solution 2: Kill process using port (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

### "MongoDB connection failed"
```
Check:
1. Connection string is correct in .env
2. Username and password are correct
3. IP address is whitelisted in MongoDB Atlas
4. Database name matches in connection string
5. No typos in .env file
```

### "Form won't submit"
```
Check:
1. Backend is running (npm run dev)
2. Frontend is running (npm start)
3. No errors in browser console (F12)
4. MongoDB is connected
5. All required fields are filled
```

### "CORS Error in browser console"
```
Solution:
1. Check FRONTEND_URL in backend/.env
2. Restart backend: Stop (Ctrl+C) and run npm run dev again
```

### "Module not found" errors
```bash
# Solution: Reinstall dependencies
rm node_modules
npm install

# Or for both directories:
cd backend && npm install
cd ../frontend && npm install
```

---

## 📝 File Checklist

Before running, verify these files exist:

**Backend:**
- ✅ `backend/package.json`
- ✅ `backend/.env` (with your MongoDB URI)
- ✅ `backend/server.js`
- ✅ `backend/config/database.js`
- ✅ `backend/models/Appointment.js`
- ✅ `backend/routes/appointmentRoutes.js`
- ✅ `backend/node_modules/` (after npm install)

**Frontend:**
- ✅ `frontend/package.json`
- ✅ `frontend/.env` (with API URL)
- ✅ `frontend/src/App.js`
- ✅ `frontend/src/components/AppointmentForm.js`
- ✅ `frontend/src/services/appointmentService.js`
- ✅ `frontend/src/index.js`
- ✅ `frontend/public/index.html`
- ✅ `frontend/node_modules/` (after npm install)

---

## 🎉 Success Indicators

You'll know everything is working when:

1. ✅ Backend starts without errors
2. ✅ Frontend compiles and opens in browser
3. ✅ Form appears on http://localhost:3000
4. ✅ Can fill and submit form
5. ✅ Success message appears
6. ✅ Data appears in MongoDB Atlas Collections

---

## 🚀 Next Steps

Once working:

1. Explore the code (it's well-documented!)
2. Try updating existing appointments via API
3. Query appointments from MongoDB
4. Modify form fields to add more options
5. Style the form to match your brand
6. Deploy when ready!

---

## 📞 Quick Command Reference

```bash
# Backend
cd backend
npm install           # First time only
npm run dev          # Development mode
npm start            # Production mode

# Frontend
cd frontend
npm install          # First time only
npm start            # Start dev server
npm run build        # Production build

# MongoDB
# No installation needed - uses MongoDB Atlas cloud
```

---

## 💾 Important Files to Backup

Keep these safe:
- `.env` (contains passwords!)
- MongoDB connection string
- Database backups

---

**You're all set! Happy coding! 🚀**

For detailed API documentation, see [README.md](README.md)
For quick overview, see [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
