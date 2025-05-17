import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const api = "http://localhost:8800";

function GeneralReport() {
  const navigate = useNavigate();
  const [report, setReport] = useState([]);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(`${api}/general-report`);
        setReport(res.data);
      } catch (err) {
        console.error("Failed to load general report", err);
      }
    };
    fetchReport();
  }, []);

  return (
    <div className="general-report-container">
      <h2 className="general-report-title">📋 General Report</h2>
      <table className="report-table">
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Product</th>
          </tr>
        </thead>
        <tbody>
          {report.map((row, idx) => (
            <tr key={idx}>
              <td>{row.order_date}</td>
              <td>{row.cust_fname}</td>
              <td>{row.telephone}</td>
              <td>{row.productname}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate(-1)} className="back-button">
        ⬅ Back
      </button>
    </div>
  );
}

export default GeneralReport;
