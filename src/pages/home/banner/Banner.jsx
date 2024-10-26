import { NavLink } from "react-router-dom";

const Banner = () => {
  return (
    <div className="bg-[#304d30] pt-10  md:px-20 md:flex">
      <div className="md:px-12 md:w-1/2 py-4 md:py-28 ">
        <h1 className="text-white text-lg  text-center font-bold md:text-6xl md:py-8 pb-4 ">
          Your Prescription for Affordable Health Solutions!
        </h1>
        <p className="px-4 text-justify md:mb-10 mb-4 md:text-lg text-xs text-white">
          Elevate your health journey with exclusive discounts and unparalleled
          convenience. Your path to well-being starts here, where every purchase
          is a prescription for savings.
        </p>
        <NavLink to="/product" className="mx-auto rounded-xl md:w-1/3 md:gap-4 flex md:text-lg text-xs text-[#304d30] bg-white md:p-4 p-2 items-center gap-2 w-1/2 justify-center hover:text-white hover:bg-[#304d30] ">Start Shopping
            <img src="/cart.svg" alt="" />
        </NavLink>
      </div>
      <div className="md:w-1/2">
        <img className="md:w-full pt-4 px-6" src="/Banner.png" alt="" />
      </div>
    </div>
  );
};

export default Banner;
