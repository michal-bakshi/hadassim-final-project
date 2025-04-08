import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, reduceProduct } from "../axios/productAxios";
import { getTheAllpruducts, reduce_pruduct } from "../redux/productActions";





export const ProductsList = () => {
const pList=useSelector((state) => state.product.listProducts) || [];
const [products, setProducts] = useState(pList);
const [hasLoaded, setHasLoaded] = useState(false);
const dispatch = useDispatch();


useEffect(() => {
    if(products.length === 0 ||!hasLoaded){ 
        getAllProducts()
        .then((res) => {
            setProducts(res.data);
            dispatch(getTheAllpruducts(res.data));
            setHasLoaded(true);
        })
        .catch((err) => console.error(err));  
    }

},[products,dispatch,hasLoaded]);

const decreaseQuantity = (productId) => {
  setProducts((prevProducts) => 
    prevProducts.map((product) =>
      product._id === productId && product.quantity > 0
        ? { ...product, quantity: product.quantity - 1 }
        : product
    )
  );
  reduceProduct(productId)
  .then((res) => {
    const { product, notification } = res.data;

    if (notification) {
      const existingNotifications = JSON.parse(localStorage.getItem("Notifications") || "[]");

      
      existingNotifications.push({
        message: notification,
        date: new Date().toISOString(),
        productId: productId
      });

     
      localStorage.setItem("Notifications", JSON.stringify(existingNotifications));

    }

    dispatch(reduce_pruduct(productId))
    console.log(res.data);
  })
  .catch((err) => {
    console.error(err);
  })
};

  return (
    <div className="container mt-5">
    <h1 className="mb-4 text-center text-primary">📦 Products</h1>
  
    <div className="table-responsive">
      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>📌 Name</th>
            <th>💰 Price</th>
            <th>🔢 Quantity</th>
            <th>🏭 Supplier</th>
            <th>⏬ Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price} ₪</td>
              <td>{product.quantity}</td>
              <td>{product.supplierId?.companyName || "לא זמין"}</td>
              <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => decreaseQuantity(product._id)}
                    disabled={product.quantity <= 0} 
                  >
                    ➖
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
}