import mongoose, { get } from "mongoose";
import Product from "../models/productModel.js";
import Supplier from "../models/supplierModel.js";
import orderController from "./orderController.js"; 


const productController = {
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
},
addProduct: async (req, res) => {
    try {
        const { name, price, minQuantity, quantity } = req.body;
        
        const existingProduct = await Product.findOne({ name });
        
        if (existingProduct) {
          
            existingProduct.quantity += quantity; 
            await existingProduct.save();
            return res.status(200).json(existingProduct);
        }

        const newProduct = new Product({
            name,
            price,
            minQuantity,
            quantity
        });

        await newProduct.save();
        res.status(201).json(newProduct); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},

 reduceProduct : async (req, res) => {
    try {
        const productId = mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null;
        if (!productId) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.quantity > 0) {
            product.quantity -= 1;
            await product.save();

            if(product.quantity < product.minQuantity) {
                    
                const orderResponse = await productController.orderTheBestDeal(product);
                if (orderResponse.error) {
                    return res.status(200).json({
                        product,
                        notification: orderResponse.error  
                    })
                }
                return res.status(200).json({ product, order: orderResponse });
            }
          
            res.status(200).json(product);
        } else {
            res.status(400).json({ message: "Product quantity cannot be reduced below zero" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
 }
  },
  orderTheBestDeal: async function (product) {
    try {
        
        const suppliers = await Supplier.find({ "products.name": product.name });

        if (!suppliers.length) {
            return { error: " לא נמצא ספק שמספק את המוצר " +product.name };
        }

        let bestDeal = null;

        suppliers.forEach(supplier => {
            supplier.products.forEach(supplierProduct => {
                if (supplierProduct.name === product.name) {
                    if (!bestDeal || supplierProduct.price < bestDeal.price) {
                        bestDeal = {
                            supplier: supplier,
                            price: supplierProduct.price,
                            minQuantity: supplierProduct.minQuantity
                        };
                    }
                }
            });
        });

        if (!bestDeal) {
            return { error: " לא נמצא ספק שמספק את המוצר " +product.name };
        }

        const newQuantity = bestDeal.minQuantity;
        const orderDetails = {
            supplierId: bestDeal.supplier._id,  
            items: [{
                productId: product._id,
                name: product.name, 
                quantity: newQuantity,
                price: bestDeal.price
            }],
          
        };
       

        const createdOrder = await orderController.createOrderLogic( orderDetails );

        product.quantity = newQuantity;
        await product.save();

        return {
            message: "ההזמנה בוצעה בהצלחה",
            supplier: bestDeal.supplier.companyName,
            price: bestDeal.price,
            quantityOrdered: newQuantity
        };
        
    } catch (error) {
        console.error("שגיאה בהזמנה:", error.message);
    }
}

}


export default productController;