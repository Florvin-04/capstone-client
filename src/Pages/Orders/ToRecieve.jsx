import { useEffect, useState } from "react";
import { useGlobalContext } from "../../AppContext/AppContext";
import OrderProduct from "../../Components/OrderProduct/OrderProduct";
import PageLoading from "../../Components/Loaders/PageLoading";
import { useNavigate } from "react-router-dom";

function ToRecieve() {
  const { orders, getOrders, loggedInID,products } = useGlobalContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  function filteredOrders() {
    return products.filter((order) => order.status === "To Receive");
  }

  useEffect(() => {
    getOrders();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [loggedInID]);

  if (isLoading) {
    return (
      <div className="page__loading">
        <PageLoading />
      </div>
    );
  }

  if (filteredOrders().length === 0) {
    return (
      <div className="no-orders">
        <p>No Orders Yet</p>
        <button onClick={() => navigate("/products")}>Shop Now</button>
      </div>
    );
  }

  return (
    <>
      <div className="orders__item--container">
        {filteredOrders().map((order, idx) => {
          return (
            <OrderProduct
              key={order.order_id}
              {...order}
            />
          );
        })}
      </div>
    </>
  );
}

export default ToRecieve;
