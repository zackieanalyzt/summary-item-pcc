// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dataRoutes = require('./routes/dataRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/data', dataRoutes);

module.exports = app;