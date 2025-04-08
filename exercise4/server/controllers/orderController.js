import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";


const orderController={
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
  createOrderLogic : async ({ supplierId, items, additionalInfo }) => {
  if (!supplierId || !items || items.length === 0) {
    throw new Error("Supplier ID and items are required.");
  }

  const order = new Order({
    supplierId,
    items,
    status: "ממתינה",
    additionalInfo
  });

  await order.save();
  return order;
},
craeteOrder: async (req, res) => {
  try {
    const order = await orderController.createOrderLogic(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
        });
  
        if (existingProduct) {
        
          existingProduct.quantity += item.quantity;
          existingProduct.supplierId = order.supplierId;
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
 export default orderController;
