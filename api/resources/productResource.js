// api/resources/productResource.js
const {
  insertProduct,
  getAllProducts,
  searchProductsLike,
  insertCategory,
  getCategoryByName,
} = require('../db/database');

// --- små hjälpare ---
const clean = (s) => (s || '').replace(/^['"]+|['"]+$/g, '');
const slugify = (s) =>
  clean(s)
    .toLowerCase()
    .replace(/å/g, 'a')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// Normalisera sökväg från form (stöder både Windows- och webbstigar)
// Tar fram /categories/... eller /products/... och ser till att den börjar med /
function normalizePublicPath(raw) {
  if (!raw) return null;
  let s = String(raw).replace(/\\\\/g, '/').replace(/\\/g, '/');
  const i = s.indexOf('/categories/');
  const j = s.indexOf('/products/');
  if (i !== -1) s = s.slice(i);
  else if (j !== -1) s = s.slice(j);
  if (!s.startsWith('/')) s = '/' + s;
  return s;
}

// --- Skapa produkt (admin) ---
const postProduct = (req, res) => {
  const name = (req.body.name || '').trim();
  const description = req.body.description || '';
  const brand = (req.body.brand || '').trim();
  const sku = (req.body.sku || '').trim().toLowerCase(); // normalisera
  const price = parseFloat(req.body.price);
  const categoryId = parseInt(req.body.categoryId, 10);

  // 1) om fil laddas upp → /products/<filnamn>
  // 2) annars använd pictureURL från formuläret (t.ex. /categories/hpomen.jpg)
  const rawPicture = req.file
    ? `/products/${req.file.filename}`
    : (req.body.pictureURL || null);

  const pictureURL = normalizePublicPath(rawPicture);
  
  insertProduct.run(name, description, pictureURL, brand, sku, price, categoryId);
  return res.json({ message: 'Product created' });
};

// --- Lista produkter (admin) ---
const listProducts = (req, res) => {
  try {
    const rows = getAllProducts.all();
    const mapped = rows.map((p) => ({
      id: p.id,
      name: clean(p.name),
      description: p.description || '',
      pictureURL: p.picture_URL || null,
      brand: clean(p.brand),
      price: p.price,
      categoryId: p.categoryId ?? null,
      categoryName: p.categoryName || null,
    }));
    res.json(mapped);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// --- Sök (namn + brand + beskrivning + kategori) ---
const searchProducts = (req, res) => {
  try {
    const q = (req.query.q || '').toString().trim().toLowerCase();
    if (!q) return res.json([]);

    const like = `%${q}%`;
    const rows = searchProductsLike.all(like, like, like, like);

    const mapped = rows.map((p) => ({
      id: p.id,
      name: clean(p.name),
      description: p.description || '',
      pictureURL: p.picture_URL || null,
      brand: clean(p.brand),
      price: p.price,
      categoryId: p.categoryId ?? null,
      categoryName: p.categoryName || null,
    }));

    res.json(mapped);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { postProduct, listProducts, searchProducts };
