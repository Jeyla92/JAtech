// api/index.js
const path = require('path');
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = 3000;

// Spara uppladdade filer i UI:s public-mappar (absoluta sökvägar)
const uploadCategory = multer({ dest: path.join(__dirname, '../ui/public/categories') });
const uploadProduct  = multer({ dest: path.join(__dirname, '../ui/public/products') });

const { getCategoryById, postCategory, listCategories } = require('./resources/categoryResource');
const { postProduct, listProducts, searchProducts } = require('./resources/productResource');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ---- API ----
// Kategorier
app.get('/api/category', getCategoryById);
app.get('/api/list-category', listCategories);
app.post('/api/category', uploadCategory.single('categoryImage'), postCategory);

// Produkter
app.get('/api/list-product', listProducts);
app.get('/api/search', searchProducts);
app.post('/api/product', uploadProduct.single('productImage'), postProduct);

app.listen(port, () => {
  console.log(`API kör på http://localhost:${port}`);
});
