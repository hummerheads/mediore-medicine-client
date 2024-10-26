import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Dashboard = () => {



    const { logOut } = useContext(AuthContext);

    

  return (
    <div>
        <div className="md:mb-10">
            <img className="mx-auto w-36 md:w-44" src="/Logo.png" alt="" />
        </div>
      <div className="flex md:justify-center">
        <div className="min-h-screen w-1/3 md:w-1/5 bg-[#28A745] text-white font-bold text-xs md:text-2xl md:px-10 md:pt-20">
          <ul className="p-2 md:py-5 hover:bg-green-700">
            <NavLink to="/dashboard/user" className="">Dashboard</NavLink>
            <hr />
          </ul>
          <ul className="p-2 md:py-5 hover:bg-green-700">
            <NavLink to="/dashboard/cart" className="py-5">Cart</NavLink>
            <hr />
          </ul>
          <ul className="p-2 md:py-5 hover:bg-green-700">
            <NavLink className="py-5">Purchases</NavLink>
            <hr />
          </ul>
          <ul className="p-2 md:py-5 hover:bg-green-700">
            <NavLink to="/dashboard/products" className="py-5">Product</NavLink>
            <hr />
          </ul>
          <ul className="p-2 md:py-5 hover:bg-green-700">
            <NavLink className="py-5">Reports</NavLink>
            <hr />
          </ul>
          <ul className="p-2 md:py-5 hover:bg-green-700">
            <NavLink to="/dashboard/checkout" className="py-5">Checkout</NavLink>
            <hr />
          </ul>
          <ul className="p-2 md:py-5 hover:bg-green-700">
            <NavLink to="/dashboard/users"  className="py-5">Users</NavLink>
            <hr />
          </ul>
          <ul className="p-2 md:py-5 hover:bg-green-700">
            <div className="flex gap-2 flex-row-reverse md:gap-5 items-center">
            <NavLink to="/" className="">Back To Mediore</NavLink>
            <div className="md:w-1/3 ">
            <img className="" src="/Logo.png" alt="" />
            </div>
            </div>
            <hr />
          </ul>
          <ul onClick={() => (window.location.href = "/login")} className="p-2 md:py-5 hover:bg-green-700">
            <NavLink  onClick={logOut} className="py-5">Sign Out</NavLink>
            <hr />
          </ul>
        </div>
        <div className="w-2/3">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
