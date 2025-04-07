import mongoose, { get } from "mongoose";
import Product from "../models/productModel.js";
import Supplier from "../models/supplierModel.js";


export default{
     getProducts : async (req, res) => {
    try {
        const products = await Product.find()
        .populate("supplierId") 
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},
getProductById : async (req, res) => {
    try {
        const supplierId = mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null;
        if (!supplierId) {
            return res.status(400).json({ message: "Invalid supplier ID format" });
        }

        const supplier = await Supplier.findById(supplierId);
        if (!supplier) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(supplier.products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
}