const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'vendr.json');

function load() {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch {
    return { users: [], orders: [], cart: [], wishlist: [] };
  }
}

function save(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// ── Users ────────────────────────────────────────────────────────────────────

function getUserByEmail(email) {
  return load().users.find(u => u.email === email) ?? null;
}

function getUserById(id) {
  return load().users.find(u => u.id === id) ?? null;
}

function createUser({ name, email, password_hash }) {
  const data = load();
  const id = data.users.length ? Math.max(...data.users.map(u => u.id)) + 1 : 1;
  const user = {
    id, name, email, password_hash,
    phone: '', address: '', city: '', zip: '', country: '',
    created_at: new Date().toISOString(),
  };
  data.users.push(user);
  save(data);
  return user;
}

function updateUser(id, updates) {
  const data = load();
  const idx = data.users.findIndex(u => u.id === id);
  if (idx === -1) return null;
  data.users[idx] = { ...data.users[idx], ...updates };
  save(data);
  return data.users[idx];
}

// ── Orders ───────────────────────────────────────────────────────────────────

function getOrdersByUser(userId) {
  return load().orders
    .filter(o => o.user_id === userId)
    .sort((a, b) => b.date.localeCompare(a.date));
}

function createOrder(order) {
  const data = load();
  data.orders.push(order);
  save(data);
  return order;
}

// ── Cart ─────────────────────────────────────────────────────────────────────

function getCart(userId) {
  const row = load().cart.find(c => c.user_id === userId);
  return row ? row.items : [];
}

function setCart(userId, items) {
  const data = load();
  const idx = data.cart.findIndex(c => c.user_id === userId);
  if (idx === -1) data.cart.push({ user_id: userId, items });
  else data.cart[idx].items = items;
  save(data);
}

// ── Wishlist ─────────────────────────────────────────────────────────────────

function getWishlist(userId) {
  const row = load().wishlist.find(w => w.user_id === userId);
  return row ? row.items : [];
}

function setWishlist(userId, items) {
  const data = load();
  const idx = data.wishlist.findIndex(w => w.user_id === userId);
  if (idx === -1) data.wishlist.push({ user_id: userId, items });
  else data.wishlist[idx].items = items;
  save(data);
}

module.exports = {
  getUserByEmail, getUserById, createUser, updateUser,
  getOrdersByUser, createOrder,
  getCart, setCart,
  getWishlist, setWishlist,
};
