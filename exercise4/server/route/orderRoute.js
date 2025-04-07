import {Router} from "express"
import bodyParser from "body-parser"
import oc from "../controllers/orderController.js"


const order=Router()
order.use(bodyParser.json())


order.post("/",oc.craeteOrder)
order.get('/',oc.getOrdersByStoreOwner)
order.get('/:supplierId',oc.getOrdersBySupplier)
order.put('/:orderId/confirm',oc.confirmOrder)
order.put('/:orderId/complete',oc.compliteOrder)

export default order