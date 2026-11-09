const express = require('express');
const router = express.Router();
const storage = require('../services/storage');

// POST /api/diagnostics
router.post('/', (req, res) => {
  try {
    const { contact, generalInfo, scores } = req.body;
    if (!contact || !contact.nom || !contact.email) {
      return res.status(400).json({ success: false, message: 'Les coordonnées du contact (nom et email) sont obligatoires.' });
    }

    const saved = storage.addDiagnostic({ contact, generalInfo, scores });
    console.log(`[AUTODIAGNOSTIC] Nouveau lead enregistré : ${contact.nom} (${contact.email}) - Entreprise: ${generalInfo?.nomEntreprise || 'N/A'}`);

    return res.status(201).json({
      success: true,
      message: 'Votre autodiagnostic a été enregistré avec succès.',
      data: saved
    });
  } catch (err) {
    console.error('[AUTODIAGNOSTIC ERROR]', err);
    return res.status(500).json({ success: false, message: 'Erreur lors de l\'enregistrement de l\'autodiagnostic.' });
  }
});

module.exports = router;
