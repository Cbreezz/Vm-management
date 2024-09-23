require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { setupAuth } = require('./config/auth');
const userRoutes = require('./routes/userRoutes');
const vmRoutes = require('./routes/vmRoutes');
const backupRoutes = require('./routes/backupRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Setup authentication
setupAuth(app);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/vms', vmRoutes);
app.use('/api/backups', backupRoutes);
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;