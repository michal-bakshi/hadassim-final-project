import {produce} from 'immer'
export const mystore = {
  listProducts:[
  ],
  productBySuppllier:[],
}

 export const ProductsReducer = produce((state ,action) => {
    switch (action.type) {
      case "ADD_PRODUCT":state.listProducts.push(action.payload);
        break;
        case "GET_PPRODUCT":state.listGame=(action.payload)
        break;
        case "GET_PRODUCT_BY_SUPPLIER":state.productBySuppllier=(action.payload)
        break;
        case "REDUCE_PRODUCT":state.listProducts=state.listProducts.map((product) => {
          if (product._id === action.payload) {
            return { ...product, quantity: product.quantity - 1 };
          }
          return product;
        });
     
    }
  },mystore)