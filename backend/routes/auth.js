const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { SECRET } = require('../middleware/auth');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }
  const normalizedEmail = email.toLowerCase().trim();
  if (db.getUserByEmail(normalizedEmail)) {
    return res.status(409).json({ error: 'An account with that email already exists.' });
  }
  const password_hash = await bcrypt.hash(password, 10);
  const account = db.createUser({ name: name.trim(), email: normalizedEmail, password_hash });
  const user = { id: account.id, name: account.name, email: account.email };
  const token = jwt.sign(user, SECRET, { expiresIn: '7d' });
  res.status(201).json({ token, user });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email?.trim() || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  const account = db.getUserByEmail(email.toLowerCase().trim());
  if (!account) {
    return res.status(401).json({ error: 'No account found with that email.' });
  }
  const valid = await bcrypt.compare(password, account.password_hash);
  if (!valid) {
    return res.status(401).json({ error: 'Incorrect password.' });
  }
  const user = { id: account.id, name: account.name, email: account.email };
  const token = jwt.sign(user, SECRET, { expiresIn: '7d' });
  res.json({ token, user });
});

module.exports = router;
