# ⚡ Quick Start Guide

## 🎯 Get Running in 5 Minutes

### Step 1: Clone/Setup MongoDB Atlas (2 min)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account → Create Cluster (M0 free)
3. Create database user (note username & password)
4. Click "Connect" → "Connect your application"
5. Copy your connection string and note it

### Step 2: Backend Setup (1.5 min)
```bash
cd backend
npm install
```

Create `.env` file:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/advocate_db?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

Start server:
```bash
npm run dev
```

✅ You should see: `Server is running on port 5000`

### Step 3: Frontend Setup (1.5 min)
Open **new terminal**:
```bash
cd frontend
npm install
npm start
```

✅ Opens automatically at http://localhost:3000

## 🎉 Done! Start booking appointments!

---

## 📱 Test the Form

1. Open http://localhost:3000
2. Fill out the form with test data
3. Click "Book Appointment"
4. Check MongoDB Atlas to see your data saved!

## 🔍 Check Your Data in MongoDB

1. Go to MongoDB Atlas → Collections
2. Select database: `advocate_db`
3. Select collection: `appointments`
4. See all submitted forms here!

## ❌ Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| MongoDB Connection Error | Check connection string, update `.env` |
| Port 5000 in use | Change `PORT=5001` in `.env` |
| CORS Error | Restart backend after changing `.env` |
| Form won't submit | Check backend is running, see browser console |

## 📚 Detailed Setup?
See [README.md](README.md) for complete documentation.

---

**Pro Tip:** Use MongoDB Atlas "Data Explorer" to view all appointments in real-time! 🎯
