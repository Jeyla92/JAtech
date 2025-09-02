const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const multer = require('multer');
const upload = multer({ dest: "../ui/public/categories/"});
const { getCategoryById, postCategory, listCategories } = require('./resources/categoryResource');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', methods: ['GET','POST'], allowedHeaders: ['Content-Type', 'Authorization'] }));

app.get('/api/category', getCategoryById);
app.get('/api/list-category', listCategories);
app.post('/api/category', upload.single(`categoryImage`), postCategory);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
