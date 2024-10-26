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

  return (
    <div>
      <h1 className="text-3xl text-center font-bold mb-10 text-[#28A745]">
        Dashboard | My Cart
      </h1>
      <div className=" my-10 text-right">
        <NavLink
          to="/dashboard/checkout"
          className="text-xl hover:bg-green-800 font-bold text-white bg-[#28A745] p-4 rounded-xl"
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
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={item._id}
                  >
                    <Table.Cell>{serialno++}</Table.Cell>
                    <Table.Cell>
                      <img className="w-20" src={`${item.img}`} />
                    </Table.Cell>
                    <Table.Cell>
                      <h1 className="font-bold md:text-xl">
                        {item.productName}
                      </h1>
                    </Table.Cell>
                    <Table.Cell className="font-bold md:text-xl">
                      {item.selectedSize}
                    </Table.Cell>
                    <Table.Cell className="font-bold md:text-xl">
                      {item.category}
                    </Table.Cell>
                    <Table.Cell className="font-bold md:text-xl">
                      {item.manufacturer}
                    </Table.Cell>
                    <Table.Cell className="font-bold md:text-xl">
                      {item.selectedPrice}
                    </Table.Cell>
                    <Table.Cell>
                      <button
                        onClick={() => handleDeleteItem(item._id)}
                        className="bg-[#d73b3b] md:text-xl p-2 rounded-xl hover:bg-red-950 text-white text-xs  md:text-md md:p-4"
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
