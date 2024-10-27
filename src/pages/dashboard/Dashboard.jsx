import { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { FaBars, FaTimes } from "react-icons/fa";

const Dashboard = () => {
  
  const { logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex md:flex-row flex-col md:justify-center">
        <div className="md:hidden flex justify-end px-5 py-2">
          <button onClick={toggleMenu} className="text-2xl text-[#28A745]">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div
          className={`uppercase md:min-h-screen md:block ${
            isOpen ? "block" : "hidden"
          } text-center md:w-1/5 bg-[#28A745] text-white font-semibold text-xs md:text-xl md:px-10 md:pt-10`}
        >
          <ul>
            <NavLink to="/" className="md:mb-10">
              <img className="mx-auto w-36 md:w-44" src="/Logo.png" alt="" />
            </NavLink>
          </ul>
          <ul className="p-2 md:py-5 hover:bg-green-700">
            <NavLink to="/" className="">
              Home
            </NavLink>
          </ul>
          <ul className="p-2 md:py-5 hover:bg-green-700">
            <NavLink to="/dashboard/user" className="">
              Dashboard
            </NavLink>
          </ul>
          <ul className="p-2 md:py-5 hover:bg-green-700">
            <NavLink to="/dashboard/cart" className="py-5">
              Cart
            </NavLink>
          </ul>
          <ul className="p-2 md:py-5 hover:bg-green-700">
            <NavLink to="/dashboard/purchases" className="py-5">
              Purchases
            </NavLink>
          </ul>
          <ul className="p-2 md:py-5 hover:bg-green-700">
            <NavLink to="/dashboard/products" className="py-5">
              Product
            </NavLink>
          </ul>
          <ul className="p-2 md:py-5 hover:bg-green-700">
            <NavLink to="/dashboard/reports" className="py-5">
              Reports
            </NavLink>
          </ul>
          <ul className="p-2 md:py-5 hover:bg-green-700">
            <NavLink to="/dashboard/checkout" className="py-5">
              Checkout
            </NavLink>
          </ul>
          <ul className="p-2 md:py-5 hover:bg-green-700">
            <NavLink to="/dashboard/users" className="py-5">
              Users
            </NavLink>
          </ul>
          <ul
            onClick={() => (window.location.href = "/login")}
            className="p-2 md:py-5 hover:bg-green-700"
          >
            <NavLink onClick={logOut} className="py-5">
              Sign Out
            </NavLink>
          </ul>
        </div>

        <div className="md:w-2/3">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
