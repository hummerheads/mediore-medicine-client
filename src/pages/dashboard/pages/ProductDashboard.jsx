import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProductDashboard = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [unitCount, setUnitCount] = useState(1);

  useEffect(() => {
    fetch("https://mediore-medicine-server.vercel.app/allmeds")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const generateUniqueId = () => `prod-${Math.floor(Math.random() * 100000)}`;
  const generateUnitId = () => `unit-${Math.floor(Math.random() * 100000)}`;

  const handleDeleteItem = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
    fetch(`https://mediore-medicine-server.vercel.app/allMeds/${itemId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Product deleted successfully") {
          setAllProducts(allProducts.filter((item) => item._id !== itemId));
        } else {
          console.error("Failed to delete product:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const handleEditClick = (product) => {
    setIsEditing(true);
    setEditingProduct(product);
    setFormValues({ ...product, unit_prices: product.unit_prices || [] });
    setUnitCount(product.unit_prices.length);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleUnitChange = (index, field, value) => {
    const updatedUnits = [...formValues.unit_prices];
    updatedUnits[index] = { ...updatedUnits[index], [field]: value };
    setFormValues({ ...formValues, unit_prices: updatedUnits });
  };

  const handleSaveChanges = () => {
    const url = editingProduct
      ? `https://mediore-medicine-server.vercel.app/allMeds/${editingProduct._id}`
      : "https://mediore-medicine-server.vercel.app/allMeds";
    const method = editingProduct ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((data) => {
        if (
          data.message ===
          (editingProduct
            ? "Product updated successfully"
            : "Product added successfully")
        ) {
          if (editingProduct) {
            setAllProducts(
              allProducts.map((item) =>
                item._id === editingProduct._id
                  ? { ...item, ...formValues }
                  : item
              )
            );
          } else {
            setAllProducts([...allProducts, data.product]);
          }
          setIsEditing(false);
          setEditingProduct(null);
          setShowAddProductForm(false);
        } else {
          console.error("Failed to save product:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error saving product:", error);
      });
  };

  let serialno = 1;

  return (
    <div>
      <h1 className="text-3xl text-center font-bold mb-10 text-[#28A745]">
        Dashboard | ALL Products
      </h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setShowAddProductForm(true);
            setFormValues({
              id: generateUniqueId(),
              medicine_name: "",
              category_name: "",
              generic_name: "",
              strength: "",
              manufacturer_name: "",
              slug: "",
              discount_type: "",
              discount_value: 0,
              is_discountable: false,
              is_available: true,
              medicine_image: "",
              popularity_category: "",
              unit_prices: Array.from({ length: unitCount }, () => ({
                id: generateUnitId(),
                unit: "",
                unit_size: 0,
                price: 0,
              })),
            });
          }}
          className="bg-[#28A745] p-2 rounded-xl hover:bg-green-600 text-white"
        >
          Add New Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <Table className="text-center">
          <Table.Head>
            <Table.HeadCell>Serial No.</Table.HeadCell>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Manufacturer</Table.HeadCell>
            <Table.HeadCell>Photo</Table.HeadCell>
            <Table.HeadCell>Unit Prices</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {!loading && allProducts.length > 0 ? (
              allProducts.map((item) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={item._id}
                >
                  <Table.Cell>{serialno++}</Table.Cell>
                  <Table.Cell>{item.id}</Table.Cell>
                  <Table.Cell>{item.medicine_name}</Table.Cell>
                  <Table.Cell>{item.manufacturer_name}</Table.Cell>
                  <Table.Cell>
                    <img
                      className="w-20"
                      src={item.medicine_image}
                      alt={item.medicine_name}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {item.unit_prices.map((unit) => (
                      <div key={unit.id}>
                        {unit.unit_size} {unit.unit} - ${unit.price}
                      </div>
                    ))}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-700 text-white text-xs md:text-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item._id)}
                        className="bg-[#d73b3b] px-4 py-2 rounded-xl hover:bg-red-950 text-white text-xs md:text-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <p>No products available.</p>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
      {(isEditing || showAddProductForm) && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl mb-4">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <input
              type="text"
              name="medicine_name"
              placeholder="Medicine Name"
              value={formValues.medicine_name}
              onChange={handleFormChange}
              className="mb-2 w-full p-2 border rounded"
            />
            <input
              type="text"
              name="category_name"
              placeholder="Category Name"
              value={formValues.category_name}
              onChange={handleFormChange}
              className="mb-2 w-full p-2 border rounded"
            />
            <input
              type="text"
              name="generic_name"
              placeholder="Generic Name"
              value={formValues.generic_name}
              onChange={handleFormChange}
              className="mb-2 w-full p-2 border rounded"
            />
            <input
              type="text"
              name="strength"
              placeholder="Strength"
              value={formValues.strength}
              onChange={handleFormChange}
              className="mb-2 w-full p-2 border rounded"
            />
            <input
              type="text"
              name="manufacturer_name"
              placeholder="Manufacturer Name"
              value={formValues.manufacturer_name}
              onChange={handleFormChange}
              className="mb-2 w-full p-2 border rounded"
            />
            <input
              type="text"
              name="slug"
              placeholder="Slug"
              value={formValues.slug}
              onChange={handleFormChange}
              className="mb-2 w-full p-2 border rounded"
            />
            <input
              type="number"
              name="discount_value"
              placeholder="Discount Value"
              value={formValues.discount_value}
              onChange={handleFormChange}
              className="mb-2 w-full p-2 border rounded"
            />
            <input
              type="checkbox"
              name="is_discountable"
              checked={formValues.is_discountable}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  is_discountable: e.target.checked,
                })
              }
              className="mb-2"
            />
            <label>Is Discountable</label>
            <input
              type="checkbox"
              name="is_available"
              checked={formValues.is_available}
              onChange={(e) =>
                setFormValues({ ...formValues, is_available: e.target.checked })
              }
              className="mb-2"
            />
            <label>Is Available</label>
            <input
              type="text"
              name="medicine_image"
              placeholder="Medicine Image URL"
              value={formValues.medicine_image}
              onChange={handleFormChange}
              className="mb-2 w-full p-2 border rounded"
            />
            <input
              type="text"
              name="popularity_category"
              placeholder="Popularity Category"
              value={formValues.popularity_category}
              onChange={handleFormChange}
              className="mb-2 w-full p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Number of unit prices"
              value={unitCount}
              onChange={(e) => setUnitCount(parseInt(e.target.value) || 1)}
              className="mb-4 w-full p-2 border rounded"
            />

            {Array.from({ length: unitCount }).map((_, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  placeholder="Unit"
                  value={formValues.unit_prices[index]?.unit || ""}
                  onChange={(e) =>
                    handleUnitChange(index, "unit", e.target.value)
                  }
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Unit Size"
                  value={formValues.unit_prices[index]?.unit_size || 0}
                  onChange={(e) =>
                    handleUnitChange(index, "unit_size", e.target.value)
                  }
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={formValues.unit_prices[index]?.price || 0}
                  onChange={(e) =>
                    handleUnitChange(index, "price", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setShowAddProductForm(false);
                }}
                className="bg-gray-500 p-2 rounded-lg text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-[#28A745] p-2 rounded-lg text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDashboard;
