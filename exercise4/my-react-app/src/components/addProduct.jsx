import { useState } from "react";
import { addProduct } from "../axios/productAxios";
import { useDispatch } from "react-redux";
import { add_pruduct } from "../redux/productActions";
import { useNavigate } from "react-router-dom";

export const AddProduct= () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [correntQuantity, setCorrentQuantity] = useState("");
  const dispatch= useDispatch();
  const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || !price || !minQuantity) {
      alert("נא למלא את כל השדות");
      return;
    }

    const newProduct = {
      name: productName,
      price: parseFloat(price),
      minQuantity: parseInt(minQuantity),
        quantity: parseInt(correntQuantity),
    };
    
   
    addProduct(newProduct)
    .then((res) => {
        dispatch(add_pruduct(res.data))
        console.log(res.data);
        navigate("/products_list")
        setProductName("");
        setPrice("");
        setMinQuantity("");
        setCorrentQuantity("");
        
    })
    .catch((err) => {
        console.error(err);
    });


  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">הוספת מוצר חדש</h3>
      <form className="border p-4 rounded shadow bg-light" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">שם המוצר</label>
          <input
            type="text"
            className="form-control"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">מחיר לפריט (₪)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">כמות מינימלית שתהייה בחנות</label>
          <input
            type="number"
            className="form-control"
            value={minQuantity}
            onChange={(e) => setMinQuantity(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">כמות נוחכית  בחנות</label>
          <input
            type="number"
            className="form-control"
            value={correntQuantity}
            onChange={(e) => setCorrentQuantity(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          הוסף מוצר
        </button>
      </form>
    </div>
  );
};
