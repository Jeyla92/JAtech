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

// ✅ Importera resources en gång
const { getCategoryById, postCategory, listCategories, getProductsByCategory } = require('./resources/categoryResource');
const { postProduct, listProducts, searchProducts, getProductDetail } = require('./resources/productResource');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'], // lägg till PUT senare om du gör uppdaterings-API
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ---- API ----
// Kategorier
app.get('/api/category', getCategoryById);
app.get('/api/list-category', listCategories);
app.post('/api/category', uploadCategory.single('categoryImage'), postCategory);
app.get('/api/products-by-category/:category', getProductsByCategory)

// Produkter
app.get('/api/list-product', listProducts);
app.get('/api/search', searchProducts);
app.post('/api/product', uploadProduct.single('productImage'), postProduct);

// Detaljsida
app.get('/api/product/:id', getProductDetail);

app.listen(port, () => {
  console.log(`API kör på http://localhost:${port}`);
});
