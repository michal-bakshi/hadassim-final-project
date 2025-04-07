import {Router} from "express"
import productsController from "../controllers/productsController.js"

const product=Router()


product.get("/",productsController.getProducts)
product.get("/:id",productsController.getProductById)


export default product