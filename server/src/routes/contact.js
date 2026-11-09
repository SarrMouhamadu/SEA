const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const storage = require('../services/storage');

router.post('/', async (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Nom, email et message sont obligatoires.' });
  }

  // 1. Sauvegarder dans le stockage persistant local
  const saved = storage.addContact({ name, email, phone, company, subject, message });

  // 2. Essayer également d'insérer dans MySQL si disponible
  try {
    await pool.query(
      'INSERT INTO contact_messages (name, email, phone, company, subject, message) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, phone || '', company || '', subject || 'Demande de contact', message]
    );
    console.log(`[CONTACT MYSQL] Nouveau message reçu de ${name} (${email})`);
  } catch (err) {
    // Si MySQL n'est pas actif, pas grave car sauvé dans storage.js
  }

  console.log(`[CONTACT] Message enregistré avec succès : ${name} (${email})`);
  return res.status(201).json({
    success: true,
    message: 'Votre message a bien été envoyé. Notre équipe vous recontactera rapidement.',
    data: saved
  });
});

module.exports = router;
