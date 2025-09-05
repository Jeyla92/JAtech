const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const multer = require('multer');

// Separata uploaders
const uploadCategory = multer({ dest: "../ui/public/categories/" });
const uploadProduct  = multer({ dest: "../ui/public/products/" });

const { getCategoryById, postCategory, listCategories } = require('./resources/categoryResource');
const { postProduct, listProducts } = require('./resources/productResource');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET','POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ---- API ----
// Kategorier
app.get('/api/category', getCategoryById);
app.get('/api/list-category', listCategories);
app.post('/api/category', uploadCategory.single('categoryImage'), postCategory);

// Produkter
app.get('/api/list-product', listProducts); // GET för listan
app.post('/api/product', uploadProduct.single('productImage'), postProduct);

// ---- Statisk frontend (byggd med `ui: npm run build`) ----
const distPath = path.join(__dirname, '../ui/dist');
app.use(express.static(distPath));

// SPA-fallback för ALLT som inte börjar med /api
// (undviker den problemdrabbade '/admin/*' varianten)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
