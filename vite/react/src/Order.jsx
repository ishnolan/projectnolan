import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const api = "http://localhost:8800";

function OrderForm() {
    const navigate = useNavigate(); // ✅ required for navigation
  const [pcode, setPcode] = useState("");
  const [cust_id, setCustId] = useState("");
  const [order_date, setOrderDate] = useState("");
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch product codes and customer IDs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await axios.get(`${api}/products`);
        const custRes = await axios.get(`${api}/customers`);
        setProducts(prodRes.data);
        setCustomers(custRes.data);
      } catch (err) {
        console.error("Fetch error", err);
      }
    };
    fetchData();
  }, []);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${api}/order`, {
        pcode,
        cust_id,
        order_date,
      });
      setMessage("Order placed successfully!");
      setPcode("");
      setCustId("");
      setOrderDate("");
    } catch (err) {
      console.error("Order post error", err);
      setMessage("Error placing order.");
    }
  };
  // Function to handle navigation to report page
  const goToReport = () => {
    navigate('/orderReport'); // Adjust the route if different
  };

  return (
    <div className="gi">
      <h2 className="heading">Place Order</h2>
      {message && <p className="text-green-600">{message}</p>}
      <form onSubmit={handleSubmitOrder} className="form-space">
        <select
          value={pcode}
          onChange={(e) => setPcode(e.target.value)}
          required
          className="input-field"
        >
          <option value="">Select Product Code</option>
          {products.map((p) => (
            <option key={p.pcode} value={p.pcode}>
              {p.pcode} - {p.productname}
            </option>
          ))}
        </select>

        <select
          value={cust_id}
          onChange={(e) => setCustId(e.target.value)}
          required
          className="input-field"
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.cust_id} value={c.cust_id}>
              {c.cust_id} - {c.cust_fname} {c.cust_lname}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={order_date}
          onChange={(e) => setOrderDate(e.target.value)}
          required
          className="input-field"
        />

        <button
          type="submit"
          className="btn-submit"
        >
          Place Order
        </button>
      </form>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={goToReport} className="btn-submit">View Reports</button>
        
        <button
    onClick={() => navigate(-1)} // Go back to previous page
    className="btn-back"
  >
    Back
  </button>
      </div>
    </div>
  );
}

export default OrderForm;
