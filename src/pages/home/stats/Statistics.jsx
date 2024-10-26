const Statistics = () => {
  return (
    <div className="grid grid-cols-2 md:flex gap-5 md:mx-20 md:my-10 justify-between my-5 mx-2">
      <div className="md:w-1/4 bg-[#BFE5C7] rounded-xl md:pl-6 md:pr-20 md:py-7 p-2">
        <div className="flex items-center md:pb-4 gap-2">
          <div>
            <img className="bg-white p-1" src="/Statistics/orders.svg" alt="" />
          </div>
          <div>
            <h1 className="md:text-3xl font-extrabold">14K+</h1>
          </div>
        </div>
        <h2 className="md:text-2xl font-bold md:pr-10">Orders Completed</h2>
      </div>
      <div className="md:w-1/4 bg-[#FAEDC9] rounded-xl md:pl-6 md:pr-20 md:py-7 p-2">
        <div className="flex items-center md:pb-4 gap-2">
          <div>
            <img className="bg-white p-1" src="/Statistics/awards.svg" alt="" />
          </div>
          <div>
            <h1 className="md:text-3xl font-extrabold">250+</h1>
          </div>
        </div>
        <h2 className="md:text-2xl font-bold md:pr-36 pr-10">Won Awards</h2>
      </div>
      <div className="md:w-1/4 bg-[#C5EF99] rounded-xl md:pl-6 md:pr-20 md:py-7 p-2">
        <div className="flex items-center md:pb-4 gap-2">
          <div>
            <img className="bg-white p-1" src="/Statistics/users.svg" alt="" />
          </div>
          <div>
            <h1 className="md:text-3xl font-extrabold">8K+</h1>
          </div>
        </div>
        <h2 className="md:text-2xl font-bold md:pr-36 pr-10">Happy Customers</h2>
      </div>
      <div className="bg-[#F8ECFE] md:w-1/4 rounded-xl md:pl-6 md:pr-20 md:py-7 p-2">
        <div className="flex md:pb-4 gap-2 items-center">
          <div>
            <img className="bg-white p-1" src="/Statistics/reviews.svg" alt="" />
          </div>
          <div>
            <h1 className="md:text-3xl font-extrabold">12K+</h1>
          </div>
        </div>
        <h2 className="md:text-2xl font-bold md:pr-36 pr-10">Positive Reviews </h2>
      </div>
    </div>
  );
};

export default Statistics;
