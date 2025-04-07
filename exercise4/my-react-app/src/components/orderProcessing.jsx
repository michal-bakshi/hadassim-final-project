import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { completeOrder, confirmOrder, getOrderByupplier } from "../axios/ordersAxios"; 
import { getTheOrders, orderConfirm } from "../redux/ordersAction";

export const OrderProcessing = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const supplierId =  JSON.parse(localStorage.getItem("user"))?._id || null; 
  const dispatch = useDispatch();

  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchOrders =  () => {
      
        getOrderByupplier(supplierId)
        .then((response) => {
        setOrders(response.data);
        setLoading(false);
        dispatch(getTheOrders(response.data));
        })
        .catch((error) => {
        console.error("Error fetching orders", error);
        setLoading(false);
        
      });
    } ;

    if (supplierId) {
      fetchOrders();
    }
  }, [supplierId, dispatch]);


  const handleStatusChange = (orderId) => {
    
       confirmOrder(orderId)
     .then(() => {
      setOrders((orders) =>
        orders.map((order) =>
          order._id === orderId ? { ...order, status: "בתהליך" } : order
        )
      );
      dispatch(orderConfirm(orderId));
    }).catch(error =>  {
      console.error("Error changing order status", error);
    })
  };
 

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container m-3">
      <h1>הזמנות שלך</h1>
      {orders.length === 0 ? (
        <p>אין הזמנות זמינות.</p>
      ) : (
        <div className="d-flex flex-wrap justify-content-between ">
       { orders.map((order) => (
          <div key={order._id} className="card border m-2" style={{width: "35rem" }}>
            <h5>ספק: {order.supplierId?.companyName || "לא זמין"}</h5>
            <p>תאריך: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>סטטוס: {order.status}</p>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  מוצר: {item.name || "לא נמצא"} | כמות: {item.quantity} | מחיר: {item.price} ש"ח
                </li>
              ))}
            </ul>
            <p>הערות: {order.additionalInfo}</p>
            {order.status === "ממתינה" && (
              <button
                className="btn btn-primary"
                onClick={() => handleStatusChange(order._id, "בתהליך")}
              >
                העבר את ההזמנה ל"בתהליך"
              </button>
            )}
            
            {order.status === "הושלמה" && (
              <p className="text-success fw-bold">✔ ההזמנה הושלמה</p>
            )}
          </div>
         
        ))}
        </div>
      ) }
      
    </div>

  );
};
