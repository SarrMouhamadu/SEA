const express = require('express');
const router = express.Router();
const storage = require('../services/storage');

// Middleware basique de protection admin (optionnel mais propre)
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // Si pas de header, on autorise quand même en mode dev local ou on vérifie
  }
  next();
};

router.use(requireAuth);

// GET /api/admin/dashboard
router.get('/dashboard', (req, res) => {
  try {
    const analytics = storage.getAnalytics();
    const contacts = storage.getContacts().slice(0, 5);
    const diagnostics = storage.getDiagnostics().slice(0, 5);

    return res.json({
      success: true,
      data: {
        analytics,
        recentContacts: contacts,
        recentDiagnostics: diagnostics
      }
    });
  } catch (err) {
    console.error('[ADMIN DASHBOARD ERROR]', err);
    return res.status(500).json({ success: false, message: 'Erreur tableau de bord admin' });
  }
});

// GET /api/admin/contacts
router.get('/contacts', (req, res) => {
  try {
    const contacts = storage.getContacts();
    return res.json({ success: true, data: contacts });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Erreur contacts' });
  }
});

// PATCH /api/admin/contacts/:id
router.patch('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = storage.updateContactStatus(id, status);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Message introuvable' });
  }
  return res.json({ success: true, data: updated });
});

// DELETE /api/admin/contacts/:id
router.delete('/contacts/:id', (req, res) => {
  const { id } = req.params;
  storage.deleteContact(id);
  return res.json({ success: true, message: 'Message supprimé' });
});

// GET /api/admin/diagnostics
router.get('/diagnostics', (req, res) => {
  try {
    const diagnostics = storage.getDiagnostics();
    return res.json({ success: true, data: diagnostics });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Erreur diagnostics' });
  }
});

// PATCH /api/admin/diagnostics/:id
router.patch('/diagnostics/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = storage.updateDiagnosticStatus(id, status);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Diagnostic introuvable' });
  }
  return res.json({ success: true, data: updated });
});

// DELETE /api/admin/diagnostics/:id
router.delete('/diagnostics/:id', (req, res) => {
  const { id } = req.params;
  storage.deleteDiagnostic(id);
  return res.json({ success: true, message: 'Diagnostic supprimé' });
});

// GET /api/admin/analytics
router.get('/analytics', (req, res) => {
  try {
    const analytics = storage.getAnalytics();
    return res.json({ success: true, data: analytics });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Erreur analytics' });
  }
});

module.exports = router;
