const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const defaultData = require('../config/defaultData');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM company_info LIMIT 1');
    if (rows && rows.length > 0) {
      return res.json({ success: true, data: rows[0] });
    }
  } catch (err) {
    // Fallback silencieux
  }
  res.json({ success: true, data: defaultData.company });
});

module.exports = router;
