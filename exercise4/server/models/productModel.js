import mongoose, { Schema } from "mongoose";


const productModel = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    supplierId: { type: Schema.Types.ObjectId, ref: "Supplier", },
    minQuantity: { type: Number}
});


const Product = mongoose.model("Product", productModel);

export default Product;