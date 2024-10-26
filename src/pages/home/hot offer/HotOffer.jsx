import { NavLink } from "react-router-dom";

const HotOffer = () => {
    return (
        <div className="flex flex-col-reverse md:flex-row gap-4 md:flex md:gap-48 mx-2 my-4 bg-[#F6FAFF] md:p-20 md:my-10">
            <div className="md:w-1/2 md:p-20">
                <h3 className="text-xs md:text-xl font-normal pb-2">Todays Hot Offer</h3>
                <h1 className="text-2xl pb-2 md:text-5xl font-extrabold md:pb-6">Unlock 50% Off on Essential Medicines!</h1>
                <p className="text-xs pb-2 md:text-base md:pb-10 text-justify">Embrace wellness without breaking the bank! Enjoy a generous 25% discount on a wide range of vital medicines at our online pharmacy. Your health matters, and so does your budget.</p>
                <div>
                <NavLink to="/product" className="flex items-center gap-2 justify-center text-xs md:w-1/2 md:text-base font-medium text-white bg-[#28A745] rounded-xl w-1/2 md:px-2 py-2 md:py-4 hover:bg-[#425a47] ">
                    <p>Place An Order Now</p>
                    <img src="/whitearrow.svg" alt="" />
                </NavLink>
                </div>
            </div>
            <div>
                <img src="/capsule.svg" alt="" />
            </div>
        </div>
    );
};

export default HotOffer;