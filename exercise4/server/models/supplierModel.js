import mongoose from "mongoose";


const supplierModel = new mongoose.Schema({
    companyName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    representativeName: { type: String, required: true },
    products: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        minQuantity: { type: Number, required: true }
    }]
});


const Supplier = mongoose.model("Supplier", supplierModel);

export default Supplier;