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
    sku         TEXT,                -- sku finns nu i schemat
    price       REAL NOT NULL,
    categoryId  INTEGER,
    FOREIGN KEY (categoryId) REFERENCES categories(id)
  )
`);

// ---  (categories) ---
const insertCategory    = db.prepare('INSERT INTO categories (name, URL) VALUES (?, ?)');
const getCategoryById   = db.prepare('SELECT * FROM categories WHERE id = ?');
const getCategoryByName = db.prepare('SELECT * FROM categories WHERE LOWER(name) = LOWER(?)');
const getAllCategories  = db.prepare('SELECT * FROM categories');

// --- (products) ---
const insertProduct = db.prepare(`
  INSERT INTO products (name, description, picture_URL, brand, sku, price, categoryId)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const getAllProducts = db.prepare(`
  SELECT
    p.id, p.name, p.description, p.picture_URL, p.brand, p.price, p.categoryId,
    c.name AS categoryName
  FROM products p
  LEFT JOIN categories c ON c.id = p.categoryId
  ORDER BY p.id DESC
`);

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

// --- Detalj + liknande ---
const getProductById = db.prepare(`
  SELECT p.id, p.name, p.description, p.picture_URL, p.brand, p.price,
         p.categoryId, c.name AS categoryName
  FROM products p
  LEFT JOIN categories c ON c.id = p.categoryId
  WHERE p.id = ?
  LIMIT 1
`);

const getSimilarInCategory = db.prepare(`
  SELECT id, name, picture_URL, brand, price, categoryId
  FROM products
  WHERE categoryId = ? AND id != ?
  ORDER BY RANDOM()
  LIMIT 3
`);

const getRandomProductsExcept = db.prepare(`
  SELECT id, name, picture_URL, brand, price, categoryId
  FROM products
  WHERE id != ?
  ORDER BY RANDOM()
  LIMIT ?
`);

module.exports = {
  // categories
  insertCategory,
  getCategoryById,
  getCategoryByName,
  getAllCategories,

  // products
  insertProduct,
  getAllProducts,
  searchProductsLike,

  // detail + similar
  getProductById,
  getSimilarInCategory,
  getRandomProductsExcept,
};
