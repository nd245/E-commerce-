const Product = require("../model/Product");


exports.addProduct = async (req, res) => {
    
    try {const { title, description, price } = req.body;
    const newProduct = new Product({
        title,
        description,
        price,
		id_user: req.user._id,
        
    });
    await newProduct.save();
		res.status(200).send({ msg: "Product add succ ..", newProduct });
	} catch (error) {
		res.status(400).send({ msg: "Can not add Product ", error });
	}
};

exports.getProducts = async (req, res) => {
	try {
		const listProducts = await Product.find();
		res
			.status(200)
			.send({ msg: "This is the list of all product ..", listProducts });
	} catch (error) {
		res.status(400).send({ msg: "Can not get products !!", error });
	}
};
exports.editProduct = async (req, res) => {
	try {
		const { _id } = req.params;
		const result = await Product.updateOne({ _id }, { $set: { ...req.body } });
		res.status(200).send({ msg: "Product updated .." });
	} catch (error) {
		res
			.status(400)
			.send({ msg: "Can not edit product with this id !!", error });
	}
};
exports.getOneProduct = async (req, res) => {
	try {
		const productToGet = await Product.findOne({ _id: req.params.id });
		res.status(200).send({ msg: "I get get the product ", productToGet });
	} catch (error) {
		res.status(400).send({ msg: "Can not get product with this id !!", error });
	}
};
exports.deleteProduct = async (req, res) => {
	try {
		const { _id } = req.params;
		await Product.findOneAndDelete({ _id });
		res.status(200).send({ msg: "Product deleted succ .." });
	} catch (error) {
		res
			.status(400)
			.send({ msg: "Can not delete product with this id !!", error });
	}
};