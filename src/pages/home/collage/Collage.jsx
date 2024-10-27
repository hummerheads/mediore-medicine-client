const Collage = () => {
  return (
    <div className="md:flex md:gap-12 my-10">
      <div className="md:flex bg-[#F1FAFE] md:py-24 my items-center justify-center md:w-1/2 shadow-md px-4 py-16 md:mb-0 mb-10 md:px-0">
        <div className=" md:mx-16">
          <button className="md:text-2xl font-medium text-white  bg-[#28A745] rounded-xl p-2">25% OFF</button>
          <h1 className="text-xl md:text-3xl font-bold py-3">BLACK GARLIC OIL</h1>
          <h3 className="text-lg md:text-2xl font-semibold pb-2 md:pb-6">Stronger and Thicker Hair With Black Garlic Oil.</h3>
          <p className="text-xs md:text-base line-through pb-2 pt-5 md:pt-10">$37.00</p>
          <h1 className="text-lg md:text-2xl font-bold">
            $27.00 <span className="text-xs md:text-base font-normal">Including Tax</span>
          </h1>
        </div>
        <div>
          <img className="pr-6" src="/garlic oil.png" alt="" />
        </div>
      </div>
      <div className="md:flex md:flex-col md:gap-12">
        <div className="md:flex  bg-[#FDF7E8] items-center md:px-10 md:py-20 shadow-md px-4 py-16 md:mb-0 mb-10 ">
          <div>
            <button className="text-xs mb-2 md:text-2xl font-medium text-white  bg-[#28A745] rounded-xl p-2">25% OFF</button>
            <h1 className="text-lg pb-2 md:text-2xl font-semibold">Dental Care Set for Vivid and Bright Smiles</h1>
            <p className="text-xs pb-2 md:text-base font-medium line-through pt-5 md:pt-10">$37.00</p>
            <h1 className="text-lg md:text-2xl font-bold">
              $31.00 <span className="text-xs md:text-base font-normal">Including Tax</span>
            </h1>
          </div>
          <div>
            <img src="/toothpast.png" alt="" />
          </div>
        </div>
        <div className="md:flex bg-[#E8FFE7] bg-opacity-60 shadow-md md:px-10 py-16 md:py-20  px-4 ">
          <div>
            <button className="text-xs mb-2 md:text-2xl font-medium text-white  bg-[#28A745] rounded-xl p-2">25% OFF</button>
            <h1 className="text-lg pb-2 md:text-2xl font-semibold">Dental Care Set for Vivid and Bright Smiles</h1>
            <p className="text-xs pb-2 md:text-base font-medium line-through pt-5 md:pt-10">$21.00</p>
            <h1 className="text-lg md:text-2xl font-bold">
              $17.00 <span className="text-xs md:text-base font-normal">Including Tax</span>
            </h1>
          </div>
          <div>
            <img src="/banana toothpaste.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collage;
