const router = require('express').Router();
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, (req, res) => {
  const orders = db.getOrdersByUser(req.user.id);
  res.json({ orders });
});

router.post('/', requireAuth, (req, res) => {
  const { items, subtotal, shipping, tax, total, shippingInfo, paymentMethod } = req.body;
  const delivery = new Date();
  delivery.setDate(delivery.getDate() + 5 + Math.floor(Math.random() * 3));
  const order = {
    id: `ORD-${Date.now().toString(36).toUpperCase()}`,
    user_id: req.user.id,
    date: new Date().toISOString(),
    status: 'Processing',
    estimatedDelivery: delivery.toISOString(),
    items,
    subtotal,
    shipping,
    tax,
    total,
    shippingInfo,
    paymentMethod,
  };
  db.createOrder(order);
  res.status(201).json({ order });
});

module.exports = router;
