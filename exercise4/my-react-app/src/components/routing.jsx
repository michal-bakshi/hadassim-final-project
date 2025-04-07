import { Route, Routes } from "react-router-dom"
import {Login} from './login'
import {Registration} from './registation'
import { MakeOrder } from "./makeOrder"
import { OrderList } from "./OrdersList"
import { OrderProcessing } from "./orderProcessing"
import { ProductsList } from "./productsList"

export const Routing=()=>{
    return <Routes>
        <Route path="my_login" element={<Login></Login>}></Route>
        <Route path="my_registration" element={<Registration></Registration>}></Route>
        <Route path="/make_order" element={<MakeOrder></MakeOrder>}></Route>
        <Route path="/order_list" element={<OrderList></OrderList>}></Route>
        <Route path="/order_processing" element={<OrderProcessing></OrderProcessing>}></Route>
        <Route path="/products_list" element={<ProductsList></ProductsList>}></Route>
       
    </Routes>
}