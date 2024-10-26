import { useEffect, useState } from "react";
import Products from "../products/Products";




const MedicalProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
        fetch("/fake_products_40_with_popularity.json")
          .then((res) => res.json())
          .then((data) => {
            const newProducts = data
              .filter((product) => product.popularity_category === "Medical")
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
            <h1 className="text-gray-800 text-center md:text-4xl font-bold">
              Medical Products
            </h1>
            <div className="flex justify-center">
              <p className="text-green-900">View All</p>
              <img src="/btnArrow.svg" alt="" />
            </div>
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

export default MedicalProducts;