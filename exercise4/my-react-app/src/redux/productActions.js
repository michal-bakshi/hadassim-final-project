export const add_pruduct=(pruduct)=>{
    return {type:"ADD_PRODUCT",payload:pruduct}
  }
  export const getTheAllpruducts=(myData)=>{
    return {type:"GET_PRODUCTS",payload:myData}
  }
  export const getProductBySupplier=(myData)=>{
    return {type:"GET_PRODUCT_BY_SUPPLIER",payload:myData}
  }
  // export const updatePruduct=(updateCat)=>{
  //   return {type:"UPDATE_PRODUCT",payload:updateCat}
  // }
  // export const deletePruduct=(id)=>{
  //   return {type:"DELETE_PRODUCT",payload:id}
  // }