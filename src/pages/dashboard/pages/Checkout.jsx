import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Table } from "flowbite-react";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    fetch("https://mediore-medicine-server.vercel.app/cart")
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      });
  }, []);

  const userCartItems = cartItems.filter(
    (item) => item.userEmail === user?.email
  );

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const totalPrice = userCartItems.reduce(
    (total, item) => total + item.selectedPrice,
    0
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === "stripe") {
      console.log("Redirecting to Stripe...");
    } else if (paymentMethod === "sslcommerz") {
      console.log("Redirecting to SSLCommerz...");

      const name = e.target.name.value;
      const email = e.target.email.value;
      const address = e.target.address.value;
      const contactNumber = e.target.contactNumber.value;
      const comments = e.target.comments.value;
      const currency = e.target.currency.value;

      const orderInfo = {
        name,
        email,
        address,
        contactNumber,
        comments,
        currency,
        totalPrice
      };
      console.log("Order Info:", orderInfo);
      fetch("https://mediore-medicine-server.vercel.app/checkout", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(orderInfo),
      })
      .then(res => res.json())
      .then(result => {
        window.location.replace(result.url);
        console.log("Order placed successfully:", result);
      })
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-[#28A745]"></div>
      </div>
    );
  }



  return (
    <div className="max-w-4xl mx-auto p-5 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl text-center font-bold mb-10 text-[#28A745]">
        Dashboard | Checkout
      </h1>
      <h2 className="text-2xl mb-3">Your Cart Items</h2>
      <Table>
        <Table.Head>
          <Table.HeadCell>SL No.</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Photo</Table.HeadCell>
          <Table.HeadCell>Size</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {userCartItems.length > 0 ? (
            userCartItems.map((item, index) => (
              <Table.Row key={item._id}>
                <Table.Cell className="">{index + 1}</Table.Cell>
                <Table.Cell className="font-bold ">
                  {item.productName}
                </Table.Cell>
                <Table.Cell>
                  <img
                    src={item.img}
                    alt={item.productName}
                    className="w-16 h-auto"
                  />
                </Table.Cell>
                <Table.Cell className="font-bold">
                  {item.selectedSize}
                </Table.Cell>
                <Table.Cell className="font-bold">
                  ${item.selectedPrice}.00
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No items in your cart.
              </td>
            </tr>
          )}
          {userCartItems.length > 0 && (
            <Table.Row className="mt-10">
              <Table.Cell colSpan="4" className="text-xl font-bold text-center">
                Total Amount to be Paid:
              </Table.Cell>
              <Table.Cell className="font-bold ">${totalPrice}.00</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <h2 className="text-2xl mt-10 mb-3">Shipping Information</h2>
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label className="block mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Your Name"
            required
            className="border rounded w-full p-2"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            required
            className="border rounded w-full p-2"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1" htmlFor="address">
            Shipping Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter Your Shipping Address"
            required
            className="border rounded w-full p-2"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1" htmlFor="contactNumber">
            Contact Number
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            placeholder="Enter Your Contact Number  "
            required
            className="border rounded w-full p-2"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1" htmlFor="comments">
            Additional Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            placeholder="Additional Comments (if you have any)"
            className="border rounded w-full p-2"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1" htmlFor="currency">
            Currency
          </label>
          <select
            id="currency"
            value={currency}
            onChange={handleCurrencyChange}
            className="border rounded w-full p-2"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="BDT">BDT</option>
          </select>
        </div>

        <h2 className="text-2xl mb-3">Payment Method</h2>
        <div className="mb-3 flex items-center">
          <label className="flex items-center mr-5">
            <input
              type="radio"
              value="stripe"
              checked={paymentMethod === "stripe"}
              onChange={handlePaymentMethodChange}
              required
              className="mr-2"
            />
            Stripe
          </label>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/512px-Stripe_Logo%2C_revised_2016.svg.png"
            alt="Stripe"
            className="w-16 h-auto"
          />
        </div>
        <div className="mb-3 flex items-center">
          <label className="flex items-center mr-5">
            <input
              type="radio"
              value="sslcommerz"
              checked={paymentMethod === "sslcommerz"}
              onChange={handlePaymentMethodChange}
              required
              className="mr-2"
            />
            SSLCommerz
          </label>
          <img
            src="https://sslcommerz.com/wp-content/uploads/2021/11/logo.png"
            alt="SSLCommerz"
            className="w-16 h-auto"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default Checkout;
