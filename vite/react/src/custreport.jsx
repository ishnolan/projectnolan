import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const api = "http://localhost:8800";

function CustomerReport() {
    const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${api}/customers`);
      setCustomers(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this customer?")) return;
    try {
      await axios.delete(`${api}/customer/${id}`);
      fetchCustomers();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setEditingCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${api}/customer/${editingCustomer.id}`, editingCustomer);
      setEditingCustomer(null);
      fetchCustomers();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="table-title">👥 Customer Report</h2>
      <table className="table">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Telephone</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cust) => (
            <tr key={cust.id}>
              <td className="border p-2">{cust.cust_fname}</td>
              <td className="border p-2">{cust.cust_lname}</td>
              <td className="border p-2">{cust.location}</td>
              <td className="border p-2">{cust.telephone}</td>
              <td className="border p-2 space-x-2">
                <button
                  className="edit-button"
                  onClick={() => handleEdit(cust)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(cust.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update form */}
      {editingCustomer && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Edit Customer</h3>
          <form onSubmit={handleUpdateSubmit} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="cust_fname"
              value={editingCustomer.cust_fname}
              onChange={handleUpdateChange}
              className="border p-2 rounded"
              placeholder="First Name"
            />
            <input
              type="text"
              name="cust_lname"
              value={editingCustomer.cust_lname}
              onChange={handleUpdateChange}
              className="border p-2 rounded"
              placeholder="Last Name"
            />
            <input
              type="text"
              name="location"
              value={editingCustomer.location}
              onChange={handleUpdateChange}
              className="border p-2 rounded"
              placeholder="Location"
            />
            <input
              type="text"
              name="telephone"
              value={editingCustomer.telephone}
              onChange={handleUpdateChange}
              className="border p-2 rounded"
              placeholder="Telephone"
            />
            <button
              type="submit"
              className="col-span-2 bg-green-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
       <button
    onClick={() => navigate(-1)} 
    className="btn-back"
  >
    Back
  </button>
    </div>
  );
}

export default CustomerReport;
