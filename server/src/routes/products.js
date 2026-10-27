const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const defaultData = require('../config/defaultData');

router.get('/', async (req, res) => {
  const { category } = req.query;
  try {
    let sql = 'SELECT * FROM products';
    const params = [];
    if (category) {
      sql += ' WHERE category = ?';
      params.push(category);
    }
    const [rows] = await pool.query(sql, params);
    if (rows && rows.length > 0) {
      const parsed = rows.map(r => ({
        ...r,
        features: typeof r.features === 'string' ? JSON.parse(r.features) : r.features
      }));
      return res.json({ success: true, data: parsed });
    }
  } catch (err) {}
  let products = defaultData.products;
  if (category) {
    products = products.filter(p => p.category === category);
  }
  res.json({ success: true, data: products });
});

router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE slug = ?', [slug]);
    if (rows && rows.length > 0) {
      const product = rows[0];
      product.features = typeof product.features === 'string' ? JSON.parse(product.features) : product.features;
      return res.json({ success: true, data: product });
    }
  } catch (err) {}
  const fallback = defaultData.products.find(p => p.slug === slug);
  if (fallback) return res.json({ success: true, data: fallback });
  res.status(404).json({ success: false, message: 'Produit introuvable' });
});

module.exports = router;
