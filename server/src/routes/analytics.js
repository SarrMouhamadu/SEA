const express = require('express');
const router = express.Router();
const storage = require('../services/storage');

// POST /api/analytics/visit
router.post('/visit', (req, res) => {
  try {
    const { path, referrer, device } = req.body;
    const visit = storage.recordVisit({ path, referrer, device });
    return res.status(200).json({ success: true, visitId: visit.id });
  } catch (err) {
    return res.status(200).json({ success: true }); // Ne pas bloquer le client
  }
});

module.exports = router;
