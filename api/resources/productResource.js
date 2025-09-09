// api/resources/productResource.js
const {
  insertProduct,
  getAllProducts,
  searchProductsLike,
  getProductById,
  getSimilarInCategory,
  getRandomProductsExcept,
} = require('../db/database');

// --- små hjälpare ---
const clean = (s) => (s || '').replace(/^['"]+|['"]+$/g, '');

// Normalisera sökväg från form (stöder både Windows- och webbstigar)
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
  const sku = (req.body.sku || '').trim().toLowerCase();
  const price = parseFloat(req.body.price);
  const categoryId = parseInt(req.body.categoryId, 10);

  // 1) uppladdad fil -> /products/<filnamn>  (multer placerar filen i ui/public/products)
  // 2) annars -> använd pictureURL från formuläret (t.ex. /categories/hpomen.jpg)
  const rawPicture = req.file
    ? `/products/${req.file.filename}`
    : (req.body.pictureURL || null);

  const pictureURL = normalizePublicPath(rawPicture);

  insertProduct.run(name, description, pictureURL, brand, sku, price, categoryId);
  return res.json({ message: 'Product created' });
};

// --- Lista produkter (admin/offentlig listning) ---
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
      SKU: p.sku || null,
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

// --- Mapper för detalj + liknande ---
function mapRow(p) {
  return {
    id: p.id,
    name: clean(p.name),
    description: p.description || '',
    pictureURL: p.picture_URL || null,
    brand: clean(p.brand),
    price: p.price,
    categoryId: p.categoryId ?? null,
    categoryName: p.categoryName || null,
  };
}

// --- GET /api/product/:id (detalj + 3 liknande) ---
const getProductDetail = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(400).json({ error: 'Bad id' });

    const row = getProductById.get(id);
    if (!row) return res.status(404).json({ error: 'Not found' });

    // liknande från samma kategori, fyll upp slumpmässigt om det saknas
    let similar = getSimilarInCategory.all(row.categoryId, row.id);
    if (similar.length < 3) {
      const fill = getRandomProductsExcept.all(row.id, 3 - similar.length);
      similar = [...similar, ...fill].slice(0, 3);
    }

    res.json({ product: mapRow(row), similar: similar.map(mapRow) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  postProduct,
  listProducts,
  searchProducts,
  getProductDetail,
};
