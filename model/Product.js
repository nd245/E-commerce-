// 1 require mongoose
const mongoose = require("mongoose");

// 2 create schema
const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  id_user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  image: {
    type: String,
    required: false
  }
});


module.exports = Product = model("product", productSchema);
