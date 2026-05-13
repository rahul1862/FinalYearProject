const router = require('express').Router();
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, (req, res) => {
  res.json({ items: db.getCart(req.user.id) });
});

router.put('/', requireAuth, (req, res) => {
  const items = req.body.items ?? [];
  db.setCart(req.user.id, items);
  res.json({ items });
});

module.exports = router;
