import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Table } from "flowbite-react";

const Purchases = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://mediore-medicine-server.vercel.app/order")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Orders Data: ", data);
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  const userOrders = orders.filter((order) => order.email === user?.email);
  console.log("User Orders: ", userOrders);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-[#28A745]"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="uppercase md:my-10 md:text-3xl text-center font-bold md:mb-10 text-[#28A745]">
        Dashboard | Purchases
      </h1>

      <div>
        <div className="overflow-x-auto">
          <Table className="text-center">
            <Table.Head>
              <Table.HeadCell>Order No.</Table.HeadCell>
              <Table.HeadCell>Product</Table.HeadCell>
              <Table.HeadCell>Size</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Manufacturer</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {!loading && userOrders.length > 0 ? (
                userOrders.map((order, orderIndex) => (
                  <React.Fragment key={order._id}>
                    <Table.Row className="bg-gray-100">
                      <Table.Cell colSpan={6} className="font-semibold">
                        Order #{orderIndex + 1} | Total: ${order.amount} | Currency: {order.currency}
                        <br />
                        Transaction ID: {order.transactionId}
                        <br />
                        Purchased On: {formatDate(order.createdAt)}
                      </Table.Cell>
                    </Table.Row>
                    {order.productList.map((product, productIndex) => (
                      <Table.Row
                        key={product._id}
                        className="bg-white dark:border-gray-800 dark:bg-gray-800 text-gray-800"
                      >
                        <Table.Cell>{orderIndex + 1}-{productIndex + 1}</Table.Cell>
                        <Table.Cell>
                          <img className="w-10 md:w-20" src={`${product.img}`} alt={product.productName} />
                          <p>{product.productName}</p>
                        </Table.Cell>
                        <Table.Cell>{product.selectedSize}</Table.Cell>
                        <Table.Cell>${product.selectedPrice}</Table.Cell>
                        <Table.Cell>{product.category}</Table.Cell>
                        <Table.Cell>{product.manufacturer}</Table.Cell>
                      </Table.Row>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={6} className="text-center">
                    No orders found for this user.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Purchases;
