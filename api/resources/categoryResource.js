const { insertCategory, getAllCategories, selectProductsByCategory } = require('../db/database');

const getCategoryById = (req, res) => {
    //Hämta faktiskt kategori
    return res.json({ id: req.params.id, name: "Sample Category" });
}

const getProductsByCategory = (req, res) => {
    const param = '%' + req.params.category + '%'
    console.log(param, ' param');
    
    const products = selectProductsByCategory.all(param)
    console.log(products, ' products');
    
    return res.json(products)
}

const listCategories = (req, res) => {
    const allCategories = getAllCategories.all();
    return res.json(allCategories); 
}
const postCategory = (req, res) => {
    const  name = req.body.name;
    const URL = req.file.path;
    insertCategory.run(name, URL);
    return res.json({ message: "Category created" });
}


module.exports = { getCategoryById, postCategory, listCategories, getProductsByCategory };
