import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Table } from "flowbite-react";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2'

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://mediore-medicine-server.vercel.app/cart")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Cart Data: ", data);
        setCartItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log("Updated Cart Items: ", cartItems);
  }, [cartItems]);

  const userCartItems = cartItems.filter(
    (item) => item.userEmail === user?.email
  );
  console.log("userCartItems: ", userCartItems);

  const handleDeleteItem = (itemId) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
    fetch(`https://mediore-medicine-server.vercel.app/cart/${itemId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Item deleted successfully") {
          setCartItems(cartItems.filter((item) => item._id !== itemId));
        } else {
          console.error("Failed to delete item:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };
  let serialno = 1;
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-[#28A745]"></div>
      </div>
    );
  }
  return (
    <div>
      <h1 className="md:text-3xl text-center font-bold md:mb-10 text-[#28A745]">
        Dashboard | My Cart
      </h1>
      <div className="my-4 md:my-10 text-right">
        <NavLink
          to="/dashboard/checkout"
          className="md:text-md hover:bg-green-800 font-bold text-white bg-[#28A745] p-2 text-xs md:p-3 rounded-md"
        >
          Checkout
        </NavLink>
      </div>

      <div>
        <div className="overflow-x-auto">
          <Table className="text-center">
            <Table.Head>
              <Table.HeadCell>Serial No.</Table.HeadCell>
              <Table.HeadCell>Photo</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Size</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Manufacturer</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>

              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {!loading && userCartItems.length > 0 ? (
                userCartItems.map((item) => (
                  <Table.Row
                    className="bg-white dark:border-gray-800 dark:bg-gray-800 text-gray-800"
                    key={item._id}
                  >
                    <Table.Cell>{serialno++}</Table.Cell>
                    <Table.Cell>
                      <img className="w-10 md:w-20" src={`${item.img}`} />
                    </Table.Cell>
                    <Table.Cell>
                      <h1 className=" md:text-md">
                        {item.productName}
                      </h1>
                    </Table.Cell>
                    <Table.Cell className=" text-xs md:text-sm">
                      {item.selectedSize}
                    </Table.Cell>
                    <Table.Cell className="text-xs md:text-sm">
                      {item.category}
                    </Table.Cell>
                    <Table.Cell className="text-xs md:text-sm">
                      {item.manufacturer}
                    </Table.Cell>
                    <Table.Cell className=" text-xs md:text-sm">
                      ${item.selectedPrice}
                    </Table.Cell>
                    <Table.Cell>
                      <button
                        onClick={() => handleDeleteItem(item._id)}
                        className="bg-[#d73b3b] md:text-md p-2 rounded-md hover:bg-red-950 text-white text-xs  md:text-md md:py-2 md:px-3"
                      >
                        Delete
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <p>No items in the cart for this user.</p>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
