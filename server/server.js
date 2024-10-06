const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// app.use((req, res, next) => {
//   const origin = req.headers.origin;

//   const allowedOrigins = [process.env.ALLOWED_URI, 'http://localhost:3000'];

//   if (allowedOrigins.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Credentials', 'true');
//   }

//   next();
// });
// app.options('*', cors()); // Enable preflight requests for all routes

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [process.env.ALLOWED_URI, 'http://localhost:3000'];

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  // Respond to preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});