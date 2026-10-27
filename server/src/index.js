const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'SEnergys Africa Backend API',
    timestamp: new Date().toISOString()
  });
});

// Routes API
app.use('/api/company', require('./routes/company'));
app.use('/api/services', require('./routes/services'));
app.use('/api/sectors', require('./routes/sectors'));
app.use('/api/products', require('./routes/products'));
app.use('/api/partners', require('./routes/partners'));
app.use('/api/contact', require('./routes/contact'));

// Gestion 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route API introuvable' });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur SEnergys Africa démarré sur http://localhost:${PORT}`);
});
