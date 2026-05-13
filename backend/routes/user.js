const router = require('express').Router();
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

function safeUser(account) {
  const { password_hash, ...rest } = account;
  return rest;
}

router.get('/profile', requireAuth, (req, res) => {
  const account = db.getUserById(req.user.id);
  if (!account) return res.status(404).json({ error: 'User not found' });
  res.json({ user: safeUser(account) });
});

router.put('/profile', requireAuth, (req, res) => {
  const { name, phone, address, city, zip, country } = req.body;
  const updated = db.updateUser(req.user.id, {
    ...(name ? { name } : {}),
    phone: phone ?? '',
    address: address ?? '',
    city: city ?? '',
    zip: zip ?? '',
    country: country ?? '',
  });
  if (!updated) return res.status(404).json({ error: 'User not found' });
  res.json({ user: safeUser(updated) });
});

module.exports = router;
