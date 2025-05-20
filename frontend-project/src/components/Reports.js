import { useState, useEffect } from 'react';
import axios from 'axios';

function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const response = await axios.get('http://localhost:5000/api/reports/payments');
    setReports(response.data);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Payment Reports</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Payment ID</th>
            <th className="border p-2">License Plate</th>
            <th className="border p-2">Service</th>
            <th className="border p-2">Amount Paid (Rwf)</th>
            <th className="border p-2">Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.payment_id}>
              <td className="border p-2">{report.payment_id}</td>
              <td className="border p-2">{report.license_plate}</td>
              <td className="border p-2">{report.service_name}</td>
              <td className="border p-2">{report.amount_paid}</td>
              <td className="border p-2">{report.payment_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;