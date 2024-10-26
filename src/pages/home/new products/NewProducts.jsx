import { useEffect, useState } from "react";
import Products from "../products/Products";
import { NavLink } from "react-router-dom";

const NewProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch("https://mediore-medicine-server.vercel.app/allmeds")
      .then((res) => res.json())
      .then((data) => {
        const newProducts = data
          .filter((product) => product.popularity_category === "Top")
          .slice(0, 4);
        setAllProducts(newProducts);
        console.log(newProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="md:mx-20 md:my-20 my-10 ">
      <div>
        <div className="md:flex justify-between items-center">
          <h1 className="uppercase text-[#28A745] text-center md:text-4xl font-bold">
            New Products
          </h1>
          <NavLink to="/product" className="flex justify-center">
            <p className="text-green-900">View All</p>
            <img src="/btnArrow.svg" alt="" />
          </NavLink>
        </div>
      </div>
      <div className="md:grid grid-cols-4 mt-10 gap-5">
        {allProducts.length > 0 ? (
          allProducts.map((product) => (
            <Products className="md:w-1/4" key={product.id} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default NewProducts;
