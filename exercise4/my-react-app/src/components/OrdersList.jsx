import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { completeOrder, getAllOrders } from "../axios/ordersAxios";
import { getTheOrders, orderComplete } from "../redux/ordersAction";

export const OrderList = () => {
  const urlServer = process.env.URL_SERVER;
  const orderList = useSelector((state) => state.order.ordersList) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (orderList.length === 0 || orderList === null) {
      getAllOrders()
        .then((res) => {
          dispatch(getTheOrders(res.data));
          setList(res.data);
          
        })
        .catch((err) => console.error(err));
    } else {
      setList(orderList);
    }
  }, [orderList, dispatch]);

  const calculateItemCost = (item) => {
    return item.price * item.quantity;
  };

  const calculateOrderTotal = (order) => {
    return order.items.reduce((total, item) => total + calculateItemCost(item), 0);
  };
  const handleCompleteOrder = (orderId) => {
    completeOrder(orderId)
      .then((response) => {
        setList((list) =>
          list.map((order) =>
            order._id === orderId ? { ...order, status: "הושלמה" } : order
          )
        );
        dispatch(orderComplete(orderId));
      })
      .catch((error) => {
        console.error("Error completing order", error);
      });
  }

  return (
    <div className="container m-3">
    <h1>הזמנות</h1>
    {list.length === 0 ? (
      <p>אין הזמנות עדיין...</p>
    ) : (
      <div className="d-flex flex-wrap justify-content-between ">
        {list.map((order, index) => (
          <div key={index} className="card border m-2 " style={{width: "35rem" }}>
            <h5>ספק: {order.supplierId?.companyName || "לא זמין"}</h5>
            <p>תאריך: {new Date(order.createdAt).toLocaleDateString()}</p>
            <ul>
              {order.items.map((item, i) => (
                <li key={i}>
                  מוצר: {item.name || "לא נמצא"} — כמות: {item.quantity} — מחיר:{" "}
                  {item.price ? `${item.price} ₪` : "לא זמין"} — עלות:{" "}
                  {item.price ? `${calculateItemCost(item)} ₪` : "לא זמין"}
                </li>
              ))}
            </ul>
            <p>סטטוס: {order.status}</p>
            {order.status === "בתהליך" && (
              <button
                className="btn btn-success"
                onClick={() => handleCompleteOrder(order._id, "הושלמה")}
              >
                סמן כהושלמה
              </button>
            )}
            {order.status === "הושלמה" && (
              <p className="text-success fw-bold">✔ ההזמנה הושלמה</p>
            )}
            {order.additionalInfo && <p>הערות: {order.additionalInfo}</p>}
            <br/>
            <h5>סה"כ עלות להזמנה: {calculateOrderTotal(order)} ₪</h5>
          </div>
        ))}
      </div>
    )}
  </div>
  
  );
};
