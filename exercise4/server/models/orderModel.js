import mongoose, { Schema } from "mongoose";


const orderModel = new mongoose.Schema({
    supplierId: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
         name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, 
    }],
    status: { type: String, enum: ["ממתינה", "בתהליך", "הושלמה"], default: "ממתינה" },
    createdAt: { type: Date, default: Date.now },
    additionalInfo: { type: String },
});


const Order = mongoose.model("Order", orderModel);

export default Order;