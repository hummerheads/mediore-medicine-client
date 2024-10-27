import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import { Sidebar } from "flowbite-react";

const Nav = () => {
  const { user, logOut } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mediore-medicine-server.vercel.app/allmeds/")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredProducts(allProducts);
    } else {
      const lowercasedValue = value.toLowerCase();
      const filtered = allProducts.filter(
        (product) =>
          product.medicine_name.toLowerCase().includes(lowercasedValue) ||
          product.generic_name.toLowerCase().includes(lowercasedValue) ||
          product.manufacturer_name.toLowerCase().includes(lowercasedValue)
      );
      setFilteredProducts(filtered);
    }
  };
  useEffect(() => {
    fetch("https://mediore-medicine-server.vercel.app/cart")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Cart Data: ", data);
        setCartItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log("Updated Cart Items: ", cartItems);
  }, [cartItems]);

  const handleSearchChangeMobile = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredProducts(allProducts);
    } else {
      const lowercasedValue = value.toLowerCase();
      const filtered = allProducts.filter(
        (product) =>
          product.medicine_name.toLowerCase().includes(lowercasedValue) ||
          product.generic_name.toLowerCase().includes(lowercasedValue) ||
          product.manufacturer_name.toLowerCase().includes(lowercasedValue)
      );
      setFilteredProducts(filtered);
    }
  };

  const userCartItems = cartItems.filter(
    (item) => item.userEmail === user?.email
  );

  const handleDeleteItem = (itemId) => {
    fetch(`https://mediore-medicine-server.vercel.app/cart/${itemId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Item deleted successfully") {
          setCartItems(cartItems.filter((item) => item._id !== itemId));
        } else {
          console.error("Failed to delete item:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <div className="">
      <Navbar className="h-auto grid grid-cols-1">
        <Navbar.Brand className="">
          <img
            src="/Logo.png"
            className="mr-3 h-10 sm:h-16 md:h-20 lg:h-24 mb-5"
            alt="Mediore Logo"
          />
          <div className="hidden md:flex rounded-xl border-2 border-[#28A745] overflow-hidden w-80 mx-auto">
            <input
              type="text"
              placeholder="Search Medicine (EX: Paracetamol)..."
              className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              type="button"
              className="flex items-center justify-center bg-[#28A745] hover:bg-green-700 px-5 text-sm text-white"
            >
              Search
            </button>
          </div>
        </Navbar.Brand>

        <div className="">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content"></div>
          <div className="drawer-side z-100">
            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
            <Sidebar aria-label="Sidebar with logo branding example">
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Sidebar.Item className="my-10"></Sidebar.Item>

                  {!loading && userCartItems.length > 0 ? (
                    userCartItems.map((item) => (
                      <Sidebar.Item
                        key={item._id}
                        className="bg-green-300 my-4 p-4 flex flex-col md:flex-row items-center md:items-start shadow-lg rounded-lg transition-transform transform hover:scale-105"
                      >
                        <div className="w-full md:w-1/2 flex justify-center mx-auto">
                          <img
                            className="w-16 md:w-28 lg:w-24 rounded-md mx-auto"
                            src={`${item.img}`}
                            alt={item.productName}
                          />
                        </div>
                        <div className="w-full md:w-2/3 mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                          <h1 className="font-bold text-lg md:text-xl">
                            {item.productName}
                          </h1>
                          <h3 className="text-gray-600 text-sm md:text-lg mt-2">
                            <span className="font-bold">Size:</span>{" "}
                            {item.selectedSize}
                          </h3>
                          <p className="text-gray-800 text-sm md:text-lg mt-1">
                            <span className="font-bold">Price:</span> $
                            {item.selectedPrice}
                          </p>
                          <button
                            onClick={() => handleDeleteItem(item._id)}
                            className="bg-red-500 text-white text-xs md:text-sm lg:text-md px-4 py-2 rounded-md mt-4 hover:bg-red-600 transition-colors"
                          >
                            Delete this Item
                          </button>
                        </div>
                      </Sidebar.Item>
                    ))
                  ) : (
                    <p>No items in the cart for this user.</p>
                  )}

                  <Sidebar.Item>
                    <h3 className="font-bold">
                      Total Price:{" "}
                      <span className="text-xl">
                        $
                        {userCartItems.reduce(
                          (total, item) => total + item.selectedPrice,
                          0
                        )}
                      </span>
                    </h3>
                  </Sidebar.Item>
                  <Sidebar.Item className="text-center">
                    <NavLink
                      to={"/product"}
                      className="bg-[#28A745] px-4 text-white p-2 rounded-xl"
                    >
                      Go Back to All Products
                    </NavLink>
                  </Sidebar.Item>
                  <Sidebar.Item className="text-center">
                    <NavLink to="/dashboard/checkout" className="bg-[#28A745] px-4 text-white p-2 rounded-xl">
                      Checkout
                    </NavLink>
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </div>
        </div>

        <div className="flex md:order-2 relative">
          <div className="flex gap-0 pr-3">
            <div className="relative">
              <label htmlFor="my-drawer-4" className="drawer-button ">
                <img className="w-8 h-8" src="/cart.svg" alt="Cart Icon" />
                <p className="bg-green-400 text-white absolute bottom-6 left-4 p-1 text-xs rounded-lg transform translate-x-1 -translate-y-1">
                  +{userCartItems.length}
                </p>
              </label>
            </div>
          </div>

          {user ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={user.photoURL || ""}
                  rounded
                  className="mr-"
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {user.displayName || user.email}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <NavLink to="/dashboard/user">Dashboard</NavLink>
              </Dropdown.Item>
              <Dropdown.Item onClick={logOut}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <button
              onClick={() => (window.location.href = "/login")}
              className="px-2 md:p-2 md:text-lg text-xs rounded-xl font-semibold bg-[#28A745] text-white hover:bg-green-700"
            >
              Login
            </button>
          )}

          <Navbar.Toggle />
        </div>

        <Navbar.Collapse className="items-center my-auto flex-wrap-nowrap whitespace-nowrap">
          <Navbar.Link
            href="/"
            className="md:text-base text-[#28A745] uppercase"
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            className="md:text-base text-[#28A745] uppercase"
            href="/faqs"
          >
            FAQs
          </Navbar.Link>
          <Navbar.Link
            className="md:text-base text-[#28A745] uppercase"
            href="/services"
          >
            Services
          </Navbar.Link>
          <Navbar.Link
            className="md:text-base text-[#28A745] uppercase"
            href="/product"
          >
            Products
          </Navbar.Link>
          <Navbar.Link
            className="md:text-base text-[#28A745] uppercase"
            href="/contact"
          >
            Contact
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      {searchTerm && (
        <div className="hidden md:block md:absolute w-full max-w-md bg-white shadow-lg z-10 mx-auto ml-56 overflow-y-auto max-h-[300px]">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                onClick={`/products/${product.id}`}
                key={product.id}
                className="p-2 hover:bg-green-100"
              >
                <Link
                  to={`/product/${product.id}`}
                  className="flex gap-4 my-2 items-center"
                >
                  <img className="w-12" src={product.medicine_image} alt="" />
                  {product.medicine_name} - {product.generic_name}
                </Link>
                <hr />
              </div>
            ))
          ) : (
            <div className="p-2">No Results Found</div>
          )}
        </div>
      )}

      <div>
        <div className="flex justify-between md:hidden rounded-xl border-2 border-green-500 my-4 mx-2">
          <input
            type="text"
            onChange={handleSearchChangeMobile}
            placeholder="Search Medicine (EX: Paracetamol)..."
            className="w-full bg-white text-gray-600 text-xs px-1 py-3 rounded-l-xl"
          />
          <button
            type="button"
            className="bg-[#416348] px-2 text-sm text-white rounded-r-xl"
          >
            Search
          </button>
        </div>
        {searchTerm && (
          <div className="absolute mx-auto ml-2 justify-center bg-white shadow-lg z-10 md:hidden overflow-y-auto max-h-[200px]">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-2 text-xs hover:bg-green-100 "
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="flex gap-2 items-center my-1"
                  >
                    <img className="w-12" src={product.medicine_image} alt="" />
                    {product.medicine_name} - {product.generic_name}
                  </Link>
                  <hr />
                </div>
              ))
            ) : (
              <div className="p-2">No Results Found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
