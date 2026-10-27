const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const defaultData = require('../config/defaultData');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services ORDER BY order_index ASC');
    if (rows && rows.length > 0) {
      return res.json({ success: true, data: rows });
    }
  } catch (err) {}
  res.json({ success: true, data: defaultData.services });
});

router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM services WHERE slug = ?', [slug]);
    if (rows && rows.length > 0) {
      return res.json({ success: true, data: rows[0] });
    }
  } catch (err) {}
  const fallback = defaultData.services.find(s => s.slug === slug);
  if (fallback) return res.json({ success: true, data: fallback });
  res.status(404).json({ success: false, message: 'Service introuvable' });
});

module.exports = router;
