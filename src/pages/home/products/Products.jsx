import { Card } from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types"; 

const Products = ({ product }) => {
  if (!product || Object.keys(product).length === 0) {
    return null;
  }

  const {
    id,
    medicine_image = "/default-image.png",
    medicine_name = "Unknown Product",
    discount_value = "N/A",
  } = product;

  return (
    <Link to={`/product/${id}`}> 
      <Card className="w-full shadow-xl my-2">
        <div className="mx-auto w-56 h-36 md:h-64 overflow-hidden">
          <img
            src={medicine_image}
            alt="Product image"
            className="object-cover w-full h-full"
          />
        </div>
        <hr />
        <h5 className="md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {medicine_name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          $ {discount_value}
        </p>
        <NavLink to={`/product/${id}`} className="w-full flex gap-2 justify-center bg-[#28A745] text-white font-bold py-2 md:py-4 rounded-xl hover:bg-green-300 hover:text-gray-600">
          <p>View More</p>
        </NavLink>
      </Card>
    </Link>
  );
};

Products.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Add id validation
    medicine_image: PropTypes.string,
    medicine_name: PropTypes.string,
    discount_value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired, 
};

export default Products;