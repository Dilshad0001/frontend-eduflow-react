
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axiosInstance from "../../AxioInstance";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (query = "") => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`adminuser/users/`, {
        params: query ? { user: query } : {},
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(searchTerm);
  };


  // Block/Unblock a user
  const toggleBlock = async (userId,is_blocked) => {
    try {
        if (is_blocked==true){
        alert(" unblock the user")
        }else{
            alert(" block the user")
        }
      await axiosInstance.patch(`adminuser/users/`, { id: userId });
      fetchUsers(searchTerm); // Refresh the list
    } catch (error) {
      console.error("Error toggling block status", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel: User List</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          type="submit"
          className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Search size={18} />
          Search
        </button>
      </form>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 border-b">Email</th>
                <th className="text-left px-4 py-2 border-b">Blocked</th>
                <th className="text-left px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center px-4 py-4">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id || user.email} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{user.email}</td>
                    <td className="px-4 py-2 border-b">
                      {user.is_blocked ? (
                        <span className="text-red-600 font-medium">Yes</span>
                      ) : (
                        <span className="text-green-600 font-medium">No</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => toggleBlock(user.id,user.is_blocked)}
                        className={`px-3 py-1 rounded ${
                          user.is_blocked
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                        } text-white`}
                      >
                        {user.is_blocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUserList;







