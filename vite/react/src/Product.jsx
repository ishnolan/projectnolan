import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './index.css'; // ✅ import your external stylesheet

const api = "http://localhost:8800";

function App() {
  const navigate = useNavigate();
  const [pcode, setPcode] = useState("");
  const [productname, setProductName] = useState("");
  const [product_quantity, setProductQuantity] = useState("");
  const [unit_price, setUnitPrice] = useState("");
  const [total_price, setTotalPrice] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const quantity = parseFloat(product_quantity);
    const price = parseFloat(unit_price);
    if (quantity && price) {
      setTotalPrice((quantity * price).toFixed(2));
    } else {
      setTotalPrice("");
    }
  });

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${api}/product`, {
        pcode,
        productname,
        product_quantity,
        unit_price,
        total_price,
      });
      setMessage("Product added successfully!");
      setPcode("");
      setProductName("");
      setProductQuantity("");
      setUnitPrice("");
      setTotalPrice("");
    } catch (err) {
      console.error("Post error", err);
      setMessage("Error adding product.");
    }
  };

  const goToReport = () => {
    navigate('/productReport');
  };

  return (
    <div className="gi">
      <h2 className="heading">Warehouse Management</h2>
      {message && <p className="success-message">{message}</p>}
      <form onSubmit={handleSubmitProduct} className="form-space">
        <input
          type="number"
          name="pcode"
          placeholder="Product Code"
          value={pcode}
          onChange={(e) => setPcode(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="text"
          name="productname"
          placeholder="Product Name"
          value={productname}
          onChange={(e) => setProductName(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="number"
          name="product_quantity"
          placeholder="Quantity"
          value={product_quantity}
          onChange={(e) => setProductQuantity(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="number"
          name="unit_price"
          placeholder="Unit Price"
          value={unit_price}
          onChange={(e) => setUnitPrice(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="text"
          name="total_price"
          placeholder="Total Price"
          value={total_price}
          readOnly
          className="input-field input-readonly"
        />
        <button type="submit" className="btn-submit">Submit</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={goToReport} className="btn-submit">View Reports</button>
        <button onClick={() => navigate(-1)} className="btn-back">Back</button>
      </div>
    </div>
  );
}

export default App;
