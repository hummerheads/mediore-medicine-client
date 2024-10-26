import { useEffect, useState } from "react";
import Products from "../home/products/Products";

const Product = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    id: [],
    category_name: [],
    generic_name: [],
    manufacturer_name: [],
  });
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
         const token = localStorage.getItem("access Token");
         const response = await fetch("https://mediore-medicine-server.vercel.app/allmeds", {
            method: "GET",
            headers: {
               Authorization: `Bearer ${token}`, 
            },
         });
   
         if (!response.ok) {
            if (response.status === 401) {
               alert("You are not authorized. Please log in.");
               localStorage.removeItem("access Token");
               window.location.href = "/login";
               return; 
            } else if (response.status === 403) {
               alert("Access forbidden. Please contact support.");
               return;
            }
            throw new Error("Failed to fetch products");
         }
   
         const data = await response.json();
         setAllProducts(data);
         setFilteredProducts(data);
   
         const id = [...new Set(data.map((product) => product.id))];
         const categories = [...new Set(data.map((product) => product.category_name))];
         const generics = [...new Set(data.map((product) => product.generic_name))];
         const manufacturers = [...new Set(data.map((product) => product.manufacturer_name))];
   
         setFilters({
            id: id,
            category_name: categories,
            generic_name: generics,
            manufacturer_name: manufacturers,
         });
      } catch (error) {
         console.error("Error fetching products:", error);
      }
   };
   

    fetchProducts();
  }, []);

  const handleFilterChange = (filterType, option) => {
    setSelectedOption(option);

    const filtered = allProducts.filter(
      (product) => product[filterType] === option
    );
    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setActiveFilter(null);
    setSelectedOption("");
    setFilteredProducts(allProducts);
  };

  return (
    <div className="md:mb-10">
      <div className="mb-5">
        <h2 className="text-2xl md:text-5xl uppercase text-[#28A745] pb-4 md:pb-10 font-bold text-center">
        Products
        </h2>

        <div className="flex gap-1 md:space-x-4 mb-4 items-center justify-center ">
          {Object.keys(filters).map((filterType) => (
            <button
              key={filterType}
              onClick={() => {
                if (activeFilter === filterType) {
                  resetFilters();
                } else {
                  setActiveFilter(filterType);
                }
              }}
              className={`md:px-4 p-1 md:py-2 border text-xs rounded uppercase md:text-xl md:font-bold ${
                activeFilter === filterType
                  ? "bg-green-500 text-white"
                  : "bg-white text-black hover:bg-green-500 hover:text-white"
              }`}
            >
              {filterType.replace(/_/g, " ")}
            </button>
          ))}
        </div>

        {activeFilter && (
          <div className="flex flex-wrap mt-2 justify-center">
            {filters[activeFilter].map((option) => (
              <button
                key={option}
                onClick={() => handleFilterChange(activeFilter, option)}
                className={`mr-2 mb-2 md:px-4 p-1 md:py-2 border text-xs md:text-xl rounded md:font-semibold ${
                  selectedOption === option
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 hover:bg-green-500 hover:text-white text-black"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-4 gap-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Products key={product.id} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Product;
