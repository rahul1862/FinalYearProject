import type { Product } from '../context/CartContext';

const KEY = 'vendr-recently-viewed';
const MAX = 8;

export function recordView(product: Product): void {
  try {
    const existing: Product[] = JSON.parse(localStorage.getItem(KEY) || '[]');
    const updated = [product, ...existing.filter(p => p.id !== product.id)].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(updated));
  } catch { /* ignore */ }
}

export function getRecentlyViewed(): Product[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}
