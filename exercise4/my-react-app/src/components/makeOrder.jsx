import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductById } from "../axios/productAxios";
import { getAllUsers } from "../axios/usersAxios";
import { getUsers } from "../redux/usersActions";
import { addOrder } from "../axios/ordersAxios";
import { add_order } from "../redux/ordersAction";

export const MakeOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const supplierListTest = useSelector((x) => x.user.supplierList) || [];
  const [supplierList, setSupplierList] = useState(supplierListTest);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [id, setId] = useState("");
  const [order, setOrder] = useState({
    supplierId: "",
    items: [{ name: "", productId: "", quantity: "", price: 0 }],
    additionalInfo: "",
  });
  const myD = useDispatch();

  useEffect(() => {
    if (supplierList.length === 0) {
      getAllUsers()
        .then((response) => {
          dispatch(getUsers(response.data));
          setSupplierList(response.data);
        })
        .catch((err) => console.error("Error fetching suppliers:", err));
    }
  }, [supplierList.length, dispatch]);

  const handleSupplierChange = (e) => {
    const { id, name } = JSON.parse(e.target.value);
    setId(id);
    setSelectedSupplier({ id, name });
    setOrder({ supplierId: id, items: [], additionalInfo: order.additionalInfo });
    getProductById(id)
      .then((x) => {
        setProducts(x.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleProductChange = (e) => {
    const productId = e.target.value;
    const product = products.find((p) => p._id === productId);
    setSelectedProduct(product);
  };

  const handleQuantityChange = (e) => {
    const quantity = Math.max(e.target.value, selectedProduct?.minQuantity || 1);
    setSelectedProduct((prev) => ({ ...prev, quantity }));
  };

  const handleAddProduct = () => {
    if (!selectedProduct || !selectedProduct.quantity) return;

    setOrder((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          productId: selectedProduct._id,
          name: selectedProduct.name,
          quantity: selectedProduct.quantity,
          price: selectedProduct.price, // Add price to the order items
        },
      ],
    }));

    setSelectedProduct(null);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    console.log(order);
    if (!order.supplierId || order.items.length === 0) {
      alert("חובה לבחור ספק ולהוסיף לפחות מוצר אחד!");
      return;
    }
    addOrder(order)
      .then((x) => {
        myD(add_order(x.data));
        navigate("/order_list");
      })
      .catch((err) => console.log(err));
  };


  const calculateItemCost = (item) => {
    return item.price * item.quantity;
  };


  const calculateOrderTotal = () => {
    return order.items.reduce((total, item) => total + calculateItemCost(item), 0);
  };

  return (
    <form className="container" onSubmit={(e) => handleOrder(e)}>
      <h1> הזמנה חדשה</h1>
      <div className="col">
        <select className="form-control row m-2" onChange={handleSupplierChange}>
          <option value="">בחר ספק</option>
          {supplierList.map((supplier) => (
            <option key={supplier._id} value={JSON.stringify({ id: supplier._id, name: supplier.companyName })}>
              {supplier.companyName}
            </option>
          ))}
        </select>
      </div>
      {products.length > 0 && (
        <div className="col">
          <select className="form-control row m-2" onChange={handleProductChange}>
            <option value="">בחר מוצר</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} - {product.price} ש"ח
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedProduct && (
        <div className="col">
          <label>בחר כמות (מינימום: {selectedProduct.minQuantity})</label>
          <input
            className="form-control row m-2"
            type="number"
            min={selectedProduct.minQuantity}
            value={selectedProduct.quantity || selectedProduct.minQuantity}
            onChange={handleQuantityChange}
          />
          <button type="button" className="btn btn-secondary" onClick={handleAddProduct}>
            הוסף מוצר להזמנה
          </button>
        </div>
      )}
      <div className="col">
        <label>פרטים נוספים להזמנה</label>
        <textarea
          className="form-control row m-2"
          value={order.additionalInfo}
          onChange={(e) => setOrder({ ...order, additionalInfo: e.target.value })}
        />
      </div>
      {order.items.length > 0 && (
        <div className="col">
          <h4>מוצרים שנבחרו:</h4>
          {order.items.map((item, index) => (
            <div key={index}>
              מוצר: {item.name} | כמות: {item.quantity} | מחיר ליחידה: {item.price} ש"ח | סה"כ: {calculateItemCost(item)} ש"ח
            </div>
          ))}
          <hr />
          <h5>סה"כ להזמנה: {calculateOrderTotal()} ש"ח</h5>
        </div>
      )}

      <input type="submit" className="btn btn-primary" value="שלח הזמנה" />
    </form>
  );
};
