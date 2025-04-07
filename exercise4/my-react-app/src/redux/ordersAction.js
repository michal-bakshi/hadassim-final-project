export const add_order=(order)=>{
    return {type:"ADD_ORDER",payload:order}
  }
  export const getTheOrders=(myData)=>{
    return {type:"GET_ORDERS",payload:myData}
  }
  export const orderComplete=(id)=>{
    return {type:"ORDER_COMPLETE",payload:id}
  }
  export const orderConfirm=(id)=>{
    return {type:"ORDER_CONFIRM",payload:id}
  }