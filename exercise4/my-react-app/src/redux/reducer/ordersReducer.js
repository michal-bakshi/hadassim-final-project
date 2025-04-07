import {produce} from 'immer'
export const myOrder = {
  ordersList:[
  ]
}

 export const ordersReducer = produce((state ,action) => {
    switch (action.type) {
      case "ADD_ORDER":state.ordersList.push(action.payload);
        break;
        case "GET_ORDERS":state.ordersList=(action.payload)
        break;
        case "ORDER_COMPLETE":
          const index = state.ordersList.findIndex(order => order._id === action.payload);
          if (index !== -1) {
            state.ordersList[index].status = "הושלמה";
          }
          break;
        case "ORDER_CONFIRM":
          const i = state.ordersList.findIndex(order => order._id === action.payload);
          if (i !== -1) {
            state.ordersList[i].status = "בתהליך";
          }
          break;
          
     
    }
  },myOrder)