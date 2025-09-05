// api/resources/productResource.js
const { insertProduct, getAllProducts } = require('../db/database');

const postProduct = (req, res) => {
  const name = (req.body.name || '').trim();
  const description = req.body.description || '';
  const sku = (req.body.sku || '').trim();      // <— från formuläret
  const price = parseFloat(req.body.price);
  const categoryId = parseInt(req.body.categoryId, 10);

  // Gör fil-URL publik så frontend kan visa bilden (Express servar ui/public/*)
  const pictureURL = req.file ? `/products/${req.file.filename}` : null;

  // Spara SKU i "brand"-kolumnen tills du lägger till en egen sku-kolumn
  const brand = sku;

  insertProduct.run(name, description, pictureURL, brand, price, categoryId);
  return res.json({ message: "Product created" });
};

const listProducts = (req, res) => {
  try {
    const rows = getAllProducts.all();
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { postProduct, listProducts };

