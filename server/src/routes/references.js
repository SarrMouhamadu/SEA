const express = require('express');
const router = express.Router();
const defaultData = require('../config/defaultData');

router.get('/', (req, res) => {
  const { sector } = req.query;
  let list = defaultData.references || [];
  if (sector && sector !== 'all') {
    list = list.filter(r => r.sector === sector);
  }
  res.json({ success: true, data: list });
});

router.get('/:slug', (req, res) => {
  const { slug } = req.params;
  const item = (defaultData.references || []).find(r => r.slug === slug);
  if (item) return res.json({ success: true, data: item });
  res.status(404).json({ success: false, message: 'Référence introuvable' });
});

module.exports = router;

