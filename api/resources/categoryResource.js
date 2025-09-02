const { insertCategory, getAllCategories } = require('../db/database');

const getCategoryById = (req, res) => {
    return res.json({ id: req.params.id, name: "Sample Category" });
}
const listCategories = (req, res) => {
    const allCategories = getAllCategories.all();
    return res.json(allCategories); 
}
const postCategory = (req, res) => {
    console.log(req.file);
    const  name = req.file.originalname;
    const URL = req.file.path;
    insertCategory.run(name, URL);
    return res.json({ message: "Category created" });
}


module.exports = { getCategoryById, postCategory, listCategories };
