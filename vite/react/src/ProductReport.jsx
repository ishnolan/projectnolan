import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const api = "http://localhost:8800";

function ProductReport() {
    const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await axios.get(`${api}/products`);
      setProductList(res.data);
    } catch (err) {
      console.error("Error fetching report:", err);
    }
  };
  //delete

  const handleDelete = async (pcode) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${api}/product/${pcode}`);
      fetchReport();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleUpdate = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${api}/product/${editingProduct.pcode}`, editingProduct);
      setEditingProduct(null);
      fetchReport();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="table-title">📦 Product Report</h2>
      <table className="table">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Product Code</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Unit Price</th>
            <th className="border p-2">Total Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.pcode}>
              <td className="border p-2">{product.pcode}</td>
              <td className="border p-2">{product.productname}</td>
              <td className="border p-2">{product.product_quantity}</td>
              <td className="border p-2">{product.unit_price}</td>
              <td className="border p-2">{product.total_price}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleUpdate(product)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.pcode)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Form */}
      {editingProduct && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">Update Product</h3>
          <form onSubmit={handleUpdateSubmit} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="productname"
              value={editingProduct.productname}
              onChange={handleChange}
              placeholder="Product Name"
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="product_quantity"
              value={editingProduct.product_quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="unit_price"
              value={editingProduct.unit_price}
              onChange={handleChange}
              placeholder="Unit Price"
              className="border p-2 rounded"
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
    onClick={() => navigate(-1)} // Go back to previous page
    className="btn-back"
  >
    Back
  </button>
    </div>
  );
}

export default ProductReport;
