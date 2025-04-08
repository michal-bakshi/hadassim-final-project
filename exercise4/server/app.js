import express from "express"
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import order from "./route/orderRoute.js";
import product from "./route/pruductRoute.js";
import supplier from "./route/suppierRoute.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { 
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.use(cors());

app.use('/order', order);
app.use('/product', product);
app.use('/supplier', supplier);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port} `);
   
  });