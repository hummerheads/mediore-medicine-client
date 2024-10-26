const Services = () => {
    return (
      <div className="md:mb-20 my-10 h-[80vh]">
        <h2 className="mb-48 text-center md:text-5xl font-bold text-[#28A745]">
          Our Services
        </h2>
        <div className="mx-4 grid text-left grid-cols-1 md:grid-cols-4 md:gap-10 gap-5 md:mx-20">
          <div className="p-5 flex flex-col items-center bg-[#28A745] bg-opacity-30 rounded-xl md:px-8">
            <div className="flex items-center gap-3 md:gap-5">
              <img src="/Path/Pricetag.svg" alt="Discount Icon" className="w-10 h-10" />
              <h1 className="text-lg md:text-2xl font-bold text-gray-800">Get 25% OFF</h1>
            </div>
            <p className="text-sm md:text-base text-gray-600 mt-2 text-left">
              Enjoy a 25% discount on selected medicines. Visit our promotion section to view all discounted products.
            </p>
            <img src="/Path/arrow.svg" alt="Arrow Icon" className="mt-4" />
          </div>
  
          <div className="p-5 flex flex-col items-center bg-[#F4D279] bg-opacity-40 rounded-xl md:px-8">
            <div className="flex items-center gap-3 md:gap-5">
              <img src="/Path/delivery.svg" alt="Delivery Icon" className="w-10 h-10" />
              <h1 className="text-lg md:text-2xl font-bold text-gray-800">Free Home Delivery</h1>
            </div>
            <p className="text-sm md:text-base text-gray-600 mt-2 ">
              We offer free home delivery services for orders above $50. Get your medicines delivered to your doorstep safely and quickly.
            </p>
            <img src="/Path/arrow.svg" alt="Arrow Icon" className="mt-4" />
          </div>
  
          <div className="p-5 flex flex-col items-center bg-[#6FD600] bg-opacity-40 rounded-xl md:px-8">
            <div className="flex items-center gap-3 md:gap-5">
              <img src="/Path/doctor.svg" alt="Doctor Icon" className="w-10 h-10" />
              <h1 className="text-lg md:text-2xl font-bold text-gray-800">
                Doctor&apos;s Appointment
              </h1>
            </div>
            <p className="text-sm md:text-base text-gray-600 mt-2 ">
              Book a doctor&apos;s appointment easily through our platform. We connect you with certified professionals for your healthcare needs.
            </p>
            <img src="/Path/arrow.svg" alt="Arrow Icon" className="mt-4" />
          </div>
  
          <div className="p-5 flex flex-col items-center bg-[#EDCFFC] bg-opacity-40 rounded-xl md:px-8">
            <div className="flex items-center gap-3 md:gap-5">
              <img src="/Path/stethoscope.svg" alt="Health Advice Icon" className="w-10 h-10" />
              <h1 className="text-lg md:text-2xl font-bold text-gray-800">
                Health Advice
              </h1>
            </div>
            <p className="text-sm md:text-base text-gray-600 mt-2 ">
              Get expert health advice from our in-house medical professionals. Whether it&apos;s general wellness or specific queries, we&apos;re here to help.
            </p>
            <img src="/Path/arrow.svg" alt="Arrow Icon" className="mt-4" />
          </div>
        </div>
      </div>
    );
  };
  
  export default Services;
  