const Paths = () => {
  return (
    <div className="my-4 mx-4 grid grid-cols-2 md:grid-cols-4 md:my-10 md:gap-10 gap-2 md:mx-20">
      <div className="p-2 flex md:py-5 items-center w-full justify-center md:gap-10 bg-[#28A745] bg-opacity-30 rounded-xl md:px-5">
        <div className="flex items-center md:gap-5">
          <img src="/Path/Pricetag.svg" alt="" />
          <h1 className="text-xs md:text-2xl md:font-semibold md:pr-5">Get 25% OFF</h1>
        </div>
        <img src="/Path/arrow.svg" alt="" />
      </div>
      <div className="p-2 flex md:py-5 items-center w-full justify-center md:gap-10 bg-[#F4D279] bg-opacity-40 rounded-xl md:px-5">
        <div className="flex items-center md:gap-5">
          <img src="/Path/delivery.svg" alt="" />
          <h1 className="text-xs md:text-2xl md:font-semibold">Free Home Delivery</h1>
        </div>
        <img src="/Path/arrow.svg" alt="" />
      </div>
      <div className="p-2 flex md:py-5 items-center w-full justify-center md:gap-10 bg-[#6FD600] bg-opacity-40 rounded-xl md:px-5">
        <div className="flex items-center md:gap-5">
          <img src="/Path/doctor.svg" alt="" />
          <h1 className="text-xs md:text-2xl md:font-semibold md:pr-5">Doctor&apos;s Appointment</h1>
        </div>
        <img src="/Path/arrow.svg" alt="" />
      </div>
      <div className="p-2 flex md:py-5 items-center w-full justify-center md:gap-10 bg-[#EDCFFC] bg-opacity-40 rounded-xl md:px-5">
        <div className="flex items-center md:gap-5">
          <img src="/Path/stethoscope.svg" alt="" />
          <h1 className="text-xs md:text-2xl md:font-semibold md:pr-5">Health Advice</h1>
        </div>
        <img src="/Path/arrow.svg" alt="" />
      </div>
      
    </div>
  );
};

export default Paths;
