import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const UserDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const [users, setUsers] = useState([]);
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
  useEffect(() => {
    fetch("https://mediore-medicine-server.vercel.app/allusers")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-[#28A745]"></div>
      </div>
    );
  }

  const userInfo = users.find((item) => item.email === user?.email);

  return (
    <div className="w-full py-10 md:my-0 my-10 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-lg md:text-4xl font-bold mb-5 text-[#28A745]">
        Welcome to Mediore!
      </h1>
      <h2 className="text-md md:text-2xl mb-10 text-gray-700">
        Your Personal Dashboard
      </h2>

      {userInfo ? (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center ">
          <img
            src={userInfo.photoURL || "/default-avatar.png"}
            alt="User Avatar"
            className="md:w-24 md:h-24 w-10 h-10 rounded-full mx-auto mb-4"
          />
          <p className="text-lg md:text-2xl font-semibold">{userInfo.name}</p>
          <p className="text-md text-gray-600 mb-5">{userInfo.email}</p>
          <p className="text-xs text-gray-500 uppercase mb-2">
            {userInfo.role}
          </p>
          <p className="text-xs mb-2">
            Products Added in Cart: {userCartItems.length}
          </p>
          <p className="text-xs">Orders: </p>
        </div>
      ) : (
        <p className="text-red-500 mt-4">No user information found.</p>
      )}
    </div>
  );
};

export default UserDashboard;
