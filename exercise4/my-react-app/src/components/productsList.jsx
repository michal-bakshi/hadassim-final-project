import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../axios/productAxios";
import { getTheAllpruducts } from "../redux/productActions";




export const ProductsList = () => {
const pList=useSelector((state) => state.product.listProducts) || [];
const [products, setProducts] = useState(pList);
const dispatch = useDispatch();


useEffect(() => {
    if(products.length === 0) {
        getAllProducts()
        .then((res) => {
            setProducts(res.data);
            dispatch(getTheAllpruducts(res.data));
        })
        .catch((err) => console.error(err));  
    }

},[products,dispatch]);


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
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price} ₪</td>
              <td>{product.quantity}</td>
              <td>{product.supplierId?.companyName || "לא זמין"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
}