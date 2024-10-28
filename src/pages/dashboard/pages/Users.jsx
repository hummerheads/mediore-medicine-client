import { Table } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";

const Users = () => {
  const [allUsers, setallUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:5000/allusers/")
      .then((res) => res.json())
      .then((data) => {
        // console.log("Fetched User Data: ", data);
        setallUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching User Data:", error);
        setLoading(false);
      });
  }, []);

  const userInfo = allUsers.filter((item) => item.email === user?.email);

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
    fetch(`https://mediore-medicine-server.vercel.app/allusers/${itemId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Item deleted successfully") {
          setallUsers(userInfo.filter((item) => item._id !== itemId));
        } else {
          console.error("Failed to delete user:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };
  console.log(allUsers);

  return (
    <div>
      <h1 className="uppercase md:my-10 md:text-3xl text-center font-bold md:mb-10 text-[#28A745]">
        Dashboard | USERS
      </h1>
      <div className="overflow-x-auto">
        <Table className="text-center">
          <Table.Head>
            <Table.HeadCell>Serial No.</Table.HeadCell>
            <Table.HeadCell>Photo</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {!loading && allUsers.length > 0 ? (
              allUsers.map((item, index) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={item._id}
                >
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>
                    <img className="w-20" src={item.photoURL} alt={item.name} />
                  </Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{item.role}</Table.Cell>

                  <Table.Cell>
                    <div className="flex gap-2">
                      <button className="bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-700 text-white text-xs md:text-lg">
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
    </div>
  );
};

export default Users;
