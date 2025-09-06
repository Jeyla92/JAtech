// api/db/database.js
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, 'database.db');
const db = new Database(dbPath);

// --- Tabeller ---
db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    URL  TEXT UNIQUE NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    description TEXT,
    picture_URL TEXT,
    brand       TEXT,
    price       REAL NOT NULL,
    categoryId  INTEGER,
    FOREIGN KEY (categoryId) REFERENCES categories(id)
  )
`);

// --- Prepared statements ---
const insertCategory    = db.prepare('INSERT INTO categories (name, URL) VALUES (?, ?)');
const getCategoryById   = db.prepare('SELECT * FROM categories WHERE id = ?');
const getCategoryByName = db.prepare('SELECT * FROM categories WHERE LOWER(name) = LOWER(?)');
const getAllCategories  = db.prepare('SELECT * FROM categories');

const insertProduct     = db.prepare('INSERT INTO products (name, description, picture_URL, brand, sku, price, categoryId) VALUES (?, ?, ?, ?, ?, ?, ?)');

// Ta med kategoriinfo (bra för sök och seed)
const getAllProducts    = db.prepare(`
  SELECT
    p.id, p.name, p.description, p.picture_URL, p.brand, p.price, p.categoryId,
    c.name AS categoryName
  FROM products p
  LEFT JOIN categories c ON c.id = p.categoryId
  ORDER BY p.id DESC
`);

// SQL-sök: namn + brand + beskrivning + kategorinamn (case-insensitive)
const searchProductsLike = db.prepare(`
  SELECT
    p.id, p.name, p.description, p.picture_URL, p.brand, p.price, p.categoryId,
    c.name AS categoryName
  FROM products p
  LEFT JOIN categories c ON c.id = p.categoryId
  WHERE LOWER(p.name)        LIKE ?
     OR LOWER(p.brand)       LIKE ?
     OR LOWER(p.description) LIKE ?
     OR LOWER(c.name)        LIKE ?
  ORDER BY p.id DESC
`);

module.exports = {
  insertCategory,
  getCategoryById,
  getCategoryByName,
  getAllCategories,
  insertProduct,
  getAllProducts,
  searchProductsLike,
};
