const Database = require('better-sqlite3');
const db = new Database('db/database.db');

db.exec(`CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  URL TEXT UNIQUE NOT NULL
)`);

const insertCategory = db.prepare('INSERT INTO categories (name, URL) VALUES (?, ?)');
const getCategoryById = db.prepare('SELECT * FROM categories WHERE id = ?');
const getAllCategories = db.prepare('SELECT * FROM categories');

module.exports = { insertCategory, getCategoryById, getAllCategories };