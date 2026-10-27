const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const defaultData = require('../config/defaultData');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM sectors ORDER BY order_index ASC');
    if (rows && rows.length > 0) {
      return res.json({ success: true, data: rows });
    }
  } catch (err) {}
  res.json({ success: true, data: defaultData.sectors });
});

module.exports = router;
