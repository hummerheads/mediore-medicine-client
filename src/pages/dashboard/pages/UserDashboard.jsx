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
        return <div className="text-center">Loading...</div>;
    }

    const userInfo = users.find(item => item.email === user?.email);

    return (
        <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-5 text-[#28A745]">Welcome to Mediore!</h1>
            <h2 className="text-2xl mb-10 text-gray-700">Your Personal Dashboard</h2>
            
            {userInfo ? (
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
                    <img 
                        src={userInfo.photoURL || "/default-avatar.png"} 
                        alt="User Avatar" 
                        className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <p className="text-3xl font-semibold">{userInfo.name}</p>
                    <p className="text-gray-600">{userInfo.email}</p>
                    <p className="text-gray-500 uppercase">{userInfo.role}</p>
                    <p className="font-bold text-xl">Products Added in Cart: {userCartItems.length}</p>
                    <p>Orders: </p>
                </div>
            ) : (
                <p className="text-red-500 mt-4">No user information found.</p>
            )}
        </div>
    );
};

export default UserDashboard;