import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const api = "http://localhost:8800";

function CustomerForm() {
    const navigate = useNavigate();
  const [cust_fname, setCustFname] = useState("");
  const [cust_lname, setCustLname] = useState("");
  const [location, setLocation] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmitCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${api}/customer`, {
        cust_fname,
        cust_lname,
        location,
        telephone,
      });
      setMessage("Customer added successfully!");
      setCustFname("");
      setCustLname("");
      setLocation("");
      setTelephone("");
    } catch (err) {
      console.error("Customer Post Error", err);
      setMessage("Error adding customer.");
    }
  };
  // Function to handle navigation to report page
  const goToReport = () => {
    navigate('/custreport'); // Adjust the route if different
  };

  return (
    <div className="gi">
      {message && <p className="success-message">{message}</p>}
      <h2 className="text-xl font-bold mb-2">Add Customer</h2>
      {message && <p className="text-green-600">{message}</p>}
      <form onSubmit={handleSubmitCustomer} className="form-space">
        <input
          type="text"
          placeholder="First Name"
          value={cust_fname}
          onChange={(e) => setCustFname(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={cust_lname}
          onChange={(e) => setCustLname(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder="Telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          required
          className="input-field"
        />
        <button
          type="submit"
          className="btn-submit"
        >
          Add Customer
        </button>
      </form>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={goToReport} className="btn-submit">View Reports</button>
        <button onClick={() => navigate(-1)} className="btn-back">Back</button>
      </div>
    </div>
    
  );
}

export default CustomerForm;
