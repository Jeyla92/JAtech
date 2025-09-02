const { insertProduct } = require('../db/database');

const postProduct = (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const description = req.body.description;
    const pictureURL = req.file.path;
    const brand = req.body.brand;
    const price = parseFloat(req.body.price);
    const categoryId = parseInt(req.body.categoryId);

    insertProduct.run(name, description, pictureURL, brand, price, categoryId);
    return res.json({ message: "Product created" });
}

module.exports = { postProduct };