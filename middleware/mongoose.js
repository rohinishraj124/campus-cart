const mongoose = require('mongoose');

const connectDB = (handler) => async (req, res) => {
    // Check if the database connection is already established
    if (mongoose.connection.readyState >= 1) {
        return handler(req, res); // If connected, proceed to the handler
    }

    // Try to establish a connection to the MongoDB database
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,  // Increased timeout
            socketTimeoutMS: 45000,          // Socket timeout for long operations
        });
        console.log('MongoDB connected');
        return handler(req, res); // Call handler after DB connection
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        return res.status(500).json({ error: 'Database connection failed' });
    }
};

export default connectDB;
