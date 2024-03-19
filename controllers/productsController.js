const Products = require("../models/products");

// products

exports.show_products = async (req, res) => {
    const active = true;
    try {
        const productsList = await Products.find({ active });
        console.log("products = ", productsList);
        res.render("products", { productsList });
    } catch (error) {
        console.log("product find error = ", error);
    }
};
exports.createProducts = async (req, res) => {
    const { name, description, price } = req.body;
    const image = req.file.filename;
    console.log(image);

    try {
        const newProduct = await Products.create({ name, description, price, image });
        console.log("new product  = ", newProduct);
        res.redirect("products_list");
    } catch (error) {
        console.log("Error creating product  ", error);
    }
};

exports.show_products_list = async (req, res) => {
    try {
        const productsList = await Products.find();
        res.render("products_list", { productsList });
    } catch (error) {
        console.log("error find products list ", error);
    }
};

exports.get_edit_product = async (req, res) => {
    const { id } = req.params;
    const edit_product = await Products.findOne({ _id: id });
    console.log("edit product", edit_product);
    res.render("edit_product", { edit_product });
};
exports.post_edit_product = async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
        let image;
        const product = await Products.findOne({ _id:id });
        console.log('product image',product.image);
        if (req.file) {
            console.log('if');
            image = req.file.filename;
        } else {
            console.log('else');
            image = product.image;
        }
        const edit_product = await Products.findByIdAndUpdate(id, { name, description, price, image });
        console.log("edited product =", edit_product);
        res.redirect("/products_list");
    } catch (error) {
        console.log("edit product error = ", error);
    }
};

exports.toggle_product_status = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Products.findById(id);
        console.log("product = ", product);
        if (product.active == true) {
            const active = false;
            const updatedProduct = await Products.findByIdAndUpdate(id, { active });
            console.log("updated product = ", updatedProduct);
        } else {
            const active = true;
            const updatedProduct = await Products.findByIdAndUpdate(id, { active });
            console.log("updated product = ", updatedProduct);
        }
        res.redirect("/products_list");
    } catch (error) {
        console.log("toggle error", error);
    }
};



exports.get_product_details = async (req,res) => {
    const {id} = req.params

    try {
        const product = await Products.findOne({_id:id})
        console.log('product =',product);
        res.render('product_details',{product})
    } catch (error) {
        console.log(' product find error ',error);
    }
}