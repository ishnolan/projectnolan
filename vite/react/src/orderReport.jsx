import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const api = "http://localhost:8800";

function OrderReport() {
  const navigate = useNavigate();
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await axios.get(`${api}/report`);
      setReport(res.data);
    } catch (err) {
      console.error("Error fetching order report", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (order_nb) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`${api}/order/${order_nb}`);
        setReport(report.filter(order => order.order_nb !== order_nb));
      } catch (err) {
        console.error("Error deleting order", err);
      }
    }
  };

  

  if (loading) return <p>Loading report...</p>;
  if (!report.length) return <p>No report data available.</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="table-title">🧾 Orders Report</h2>
      <table className="table">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Order Date</th>
            <th className="border px-4 py-2">Customer</th>
            <th className="border px-4 py-2">Product</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {report.map((order, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2">{order.order_nb}</td>
              <td className="border px-4 py-2">{order.order_date}</td>
              <td className="border px-4 py-2">{order.cust_id}</td>
              <td className="border px-4 py-2">{order.pcode}</td>
              <td className="border px-4 py-2 flex gap-2">
                
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(order.order_nb)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate(-1)} className="btn-back mt-4">
        Back
      </button>
    </div>
  );
}

export default OrderReport;
