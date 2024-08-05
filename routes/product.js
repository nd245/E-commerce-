// 1 require express
const express = require("express");
const { addProduct, getProducts,getOneProduct,deleteProduct,editProduct, } 
= require("../controlles/product");
const isAuth = require("../middleware/isAuth");
const Product = require("../model/Product");



// create router
const router = express.Router();

// test
router.get("/test", (req, res) => {
	res.send("hello product");
});
// add product

// router.post("/add-product",
// 	isAuth,
// 	upload.single("image"),
// 	async (req, res) => {
// 		try {
// 			const result = await cloudinary.uploader.upload(req.file.path);

// 			let newProduct = new Product({
// 				name: req.body.name,
// 				phone: req.body.phone,
// 				email: req.body.email,
// 				profile_img: result.secure_url,
// 				cloudinary_id: result.public_id,
// 			});
// 			await newProduct.save();
// 			res.status(200).send({ msg: "contact added successfully", newProduct });
// 		} catch (error) {
// 			res.status(400).send({ msg: "can not add this contact", error });
// 		}
// 	}
// );
// routes/product.js


const multer = require('multer');


// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route to add a product
router.post('/add', upload.single('image'), (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file.path;

  // Your logic to save the product to the database
  // Example:
  // Product.create({ name, description, price, image });

  res.send({
    message: 'Product added successfully!',
    product: {
      name,
      description,
      price,
      image
    }
  });
});



// gel all product
router.get("/getall", getProducts);

// get one product
router.get("/:id", getOneProduct); 



// delete product
router.delete("/:_id", deleteProduct);


// edit product
router.put("/:_id", editProduct);

// export
module.exports = router;