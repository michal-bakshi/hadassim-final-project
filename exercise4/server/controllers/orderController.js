import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";


export default{
 getOrdersBySupplier :async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.supplierId)) {
            return res.status(400).json({ message: "Invalid supplier ID" });
        }
        const orders = await Order.find({ supplierId: new mongoose.Types.ObjectId(req.params.supplierId)  })
        .populate("supplierId") 
        res.status(200).json(orders); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
},

 getOrdersByStoreOwner :async (req, res) => {
    try {
        console.log("Getting orders for store owner...");
        const orders = await Order.find()
        .populate("supplierId")  
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},
craeteOrder: async (req, res) => {
    try {
        const { supplierId, items } = req.body; 
        console.log(req.body);
        
        
        if (!supplierId || !items || items.length === 0) {
            return res.status(400).json({ message: "Supplier ID and items are required." });
        }

        const fullOrder = new Order({ supplierId, items ,status: "ממתינה" ,additionalInfo: req.body.additionalInfo});
        await fullOrder.save(); 
        res.status(201).json(fullOrder); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
 },
 confirmOrder: async (req, res) => {
    try {
        const { orderId } = req.params; 
        
        const order = await Order.findById(orderId); 

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        order.status = "בתהליך"; 
        await order.save(); 
        res.status(200).json(order); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
  },
  
  compliteOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: "Order not found." });
      }
  
      order.status = "הושלמה";
      await order.save();
  
      for (const item of order.items) {
        const existingProduct = await Product.findOne({
          name: item.name,
          supplierId: order.supplierId,
        });
  
        if (existingProduct) {
        
          existingProduct.quantity += item.quantity;
          await existingProduct.save();
        } else {
        
          const newProduct = new Product({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            supplierId: order.supplierId,
            minQuantity: 0,
          });
          await newProduct.save();
        }
      }
  
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
}
 
