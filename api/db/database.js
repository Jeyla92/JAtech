const Database = require('better-sqlite3');
const db = new Database('db/database.db');

db.exec(`CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  URL TEXT UNIQUE NOT NULL
)`);

db.exec(`CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  picture_URL TEXT,
  brand TEXT,
  price REAL NOT NULL,
  categoryId INTEGER,
  FOREIGN KEY (categoryId) REFERENCES categories(id)
  )`); 

const insertCategory = db.prepare('INSERT INTO categories (name, URL) VALUES (?, ?)');
const getCategoryById = db.prepare('SELECT * FROM categories WHERE id = ?');
const getAllCategories = db.prepare('SELECT * FROM categories');
const insertProduct = db.prepare('INSERT INTO products (name, description, picture_URL, brand, price, categoryId) VALUES (?, ?, ?, ?, ?, ?)');


  




module.exports = { insertCategory, getCategoryById, getAllCategories, insertProduct };

