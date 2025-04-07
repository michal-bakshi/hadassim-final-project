import {Router} from "express"
import bodyParser from "body-parser"
import sp from "../controllers/supplierController.js"



const supplier=Router()
supplier.use(bodyParser.json())


supplier.post("/login",sp.login)
supplier.post('/register',sp.register)
supplier.get('/',sp.getSuppliers)


export default supplier