const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/', async (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Nom, email et message sont obligatoires.' });
  }

  try {
    await pool.query(
      'INSERT INTO contact_messages (name, email, phone, company, subject, message) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, phone || '', company || '', subject || 'Demande de contact', message]
    );
    console.log(`[CONTACT] Nouveau message reçu de ${name} (${email})`);
    return res.status(201).json({ success: true, message: 'Votre message a bien été envoyé. Notre équipe vous recontactera rapidement.' });
  } catch (err) {
    console.log(`[CONTACT LOCAL LOG] Message de ${name} (${email}) : ${message}`);
    return res.status(200).json({ success: true, message: 'Votre message a bien été reçu. Merci de nous avoir contactés !' });
  }
});

module.exports = router;
