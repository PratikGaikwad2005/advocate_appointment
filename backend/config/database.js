const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Connection pool configuration optimized for traditional OLTP workload
      maxPoolSize: 10,           // Suitable for typical web applications
      minPoolSize: 5,            // Pre-warmed connections for quick response
      maxIdleTimeMS: 300000,     // 5 minutes - Release idle connections
      connectTimeoutMS: 10000,   // 10 seconds - Fail fast on connection issues
      socketTimeoutMS: 45000,    // 45 seconds - Prevent hanging queries
      serverSelectionTimeoutMS: 5000, // 5 seconds - Quick failover for replica sets
      retryWrites: true,
      w: 'majority'
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
