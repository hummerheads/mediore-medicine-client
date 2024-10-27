import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { CartContext } from "../../../context/CartContext"; // Import CartContext

const ProductDetails = () => {
  const [allMeds, setAllMeds] = useState([]);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mediore-medicine-server.vercel.app/allmeds/');
        const data = await response.json();
        setAllMeds(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allMeds.length > 0) {
      const foundProduct = allMeds.find(med => med.id === parseInt(id));
      setProduct(foundProduct);
    }
  }, [allMeds, id]);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleSizeSelect = (unit) => {
    setSelectedSize(`${unit.unit_size} ml - ${unit.unit}`);
    setSelectedPrice(unit.price);
    setSelectedId(unit.id);
    setDropdownOpen(false);
  };

  const handleAddtoCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const cartItem = {
      productId: product.id,
      productName: product.medicine_name,
      selectedSize,
      selectedPrice,
      userEmail: user.email,
      selectedId,
      img: product.medicine_image,
      category: product.category_name,
      manufacturer: product.manufacturer_name
    };

    try {
      const response = await fetch("https://mediore-medicine-server.vercel.app/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });

      if (response.ok) {
        console.log("Product added to cart successfully");
        addToCart(cartItem); 
      } else {
        console.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="md:mx-20 my-5 md:my-10 mx-4">
      {product ? (
        <div className="md:flex md:gap-10 justify-center my-10">
          <div className="my-10">
            <img
              className="w-auto mx-auto h-[50vh] shadow-2xl rounded-xl"
              src={product.medicine_image || "/default-image.png"}
              alt={product.medicine_name}
            />
          </div>
          <div className="md:w-1/2 py-5  text-white md:space-y-3 md:p-10 shadow-2xl rounded-xl bg-[#28A745] space-y-4 px-5">
            <h2 className="md:text-5xl font-bold text-2xl">
              {product.medicine_name}
              <span className="font-normal md:text-xl text-xs"> {product.strength}</span>
            </h2>
            <h2 className="md:text-xl text-md"><span className="font-semibold">Category:</span> {product.category_name}</h2>
            <h2 className="md:text-xl text-md"><span className="font-semibold">Generic:</span>{product.generic_name}</h2>
            <h2 className="md:text-xl text-md"><span className="font-semibold">Manufacturer:</span>{product.manufacturer_name}</h2>
            <h2 className="md:text-xl text-md">
              Price:
              <span className="font-bold md:text-2xl "> 
                ${selectedPrice !== null ? selectedPrice : product.discount_value}
              </span>
            </h2>

            <div>
              <button
                onClick={toggleDropdown}
                className="bg-white text-black rounded-md text-xs p-2 md:p-2 hover:bg-gray-500 hover:text-white md:text-xl"
              >
                {selectedSize || "Select Size"}
              </button>
              {dropdownOpen && (
                <div className="absolute ml-16 mx-10 md:mx-16 md:ml-52 bg-white text-black rounded-md shadow-lg mt-1 md:text-xl text-xs">
                  {product.unit_prices && product.unit_prices.length > 0 ? (
                    product.unit_prices.map((unit) => (
                      <div
                        key={unit.id}
                        className="p-2 hover:bg-gray-200 cursor-pointer md:text-xl"
                        onClick={() => handleSizeSelect(unit)}
                      >
                        {unit.unit_size} ml - {unit.unit} - ${unit.price}
                      <hr />
                      </div>
                    ))
                  ) : (
                    <div className="p-2">No sizes available</div>
                  )}
                </div>
              )}
            </div>

            {selectedSize && (
              <button
                onClick={handleAddtoCart}
                className="mt-4 md:text-xl text-xs bg-white text-black rounded-md p-2 hover:bg-gray-500 hover:text-white"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="mt-20 text-center my-5 md:my-10">
        <Link
          className=" p-2 font-bold rounded-xl bg-[#28A745] text-white hover:bg-green-700 text-xs md:text-2xl"
          to={"/product"}
        >
          Go to All Products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
