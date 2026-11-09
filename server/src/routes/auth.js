const express = require('express');
const router = express.Router();
const storage = require('../services/storage');

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email et mot de passe requis.' });
  }

  const user = storage.validateAdmin(email, password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Identifiants incorrects. Veuillez vérifier votre adresse email et votre mot de passe.' });
  }

  return res.json({
    success: true,
    message: 'Connexion réussie',
    user: {
      email: user.email,
      name: user.name,
      role: user.role
    },
    token: user.token
  });
});

// GET /api/auth/verify
router.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Non authentifié' });
  }
  return res.json({ success: true, message: 'Session valide' });
});

module.exports = router;
