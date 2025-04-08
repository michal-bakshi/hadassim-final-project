import {Router} from "express"
import productsController from "../controllers/productsController.js"
import bodyParser from "body-parser"

const product=Router()
product.use(bodyParser.json())

product.get("/",productsController.getProducts)
product.get("/:id",productsController.getProductById)
product.post("/add",productsController.addProduct)
product.put("/:id",productsController.reduceProduct)


export default product