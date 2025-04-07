import Supplier from "../models/supplierModel.js";


export default{
    login: async (req, res) => {
        const { phoneNumber } = req.body;
        try {
            const supplier = await Supplier.findOne({ phoneNumber });
            if (!supplier) {
                return res.status(401).json({ message: "Invalid credentials." });
            }
            res.status(200).json(supplier);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    register: async (req, res) => {
        const { companyName, phoneNumber, representativeName, products } = req.body;
        console.log( req.body);
        try{
        const supplier = new Supplier({
            companyName,
            phoneNumber,
            representativeName,
            products 
        });
        await supplier.save();
            res.status(201).json(supplier);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getSuppliers: async (req, res) => {
        try {
            const suppliers = await Supplier.find();
            res.status(200).json(suppliers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}