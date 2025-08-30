const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const upload = multer({ dest: "../ui/public/categories/"});
const { getCategoryById, postCategory } = require('./resources/categoryResource');

app.use(express.json());


app.get('/category', getCategoryById);
app.post('/category', upload.single(`categoryImage`), postCategory);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
