import { combineReducers, createStore } from "redux"

import {userReducer} from './reducer/userReducer'
import { ProductsReducer } from "./reducer/productsReducer";
import { ordersReducer } from "./reducer/ordersReducer";




const rootStore=combineReducers({
    user: userReducer,
    product: ProductsReducer,
    order:ordersReducer
   
   
  })
export const store=createStore(rootStore);

window.store=store