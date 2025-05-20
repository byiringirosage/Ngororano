import { useState, useEffect } from 'react';
import axios from 'axios';

function Payment() {
  const [payments, setPayments] = useState([]);
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    record_id: '',
    amount_paid: '',
    payment_date: ''
  });

  useEffect(() => {
    fetchPayments();
    fetchRecords();
  }, []);

  const fetchPayments = async () => {
    const response = await axios.get('http://localhost:5000/api/payments');
    setPayments(response.data);
  };

  const fetchRecords = async () => {
    const response = await axios.get('http://localhost:5000/api/service-records');
    setRecords(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/payments', formData);
    fetchPayments();
    setFormData({ record_id: '', amount_paid: '', payment_date: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Payment Management</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <select
          name="record_id"
          value={formData.record_id}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Service Record</option>
          {records.map(record => (
            <option key={record.record_id} value={record.record_id}>{record.record_id}</option>
          ))}
        </select>
        <input
          type="number"
          name="amount_paid"
          value={formData.amount_paid}
          onChange={handleChange}
          placeholder="Amount Paid (Rwf)"
          className="border p-2 w-full"
          required
        />
        <input
          type="date"
          name="payment_date"
          value={formData.payment_date}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Add Payment</button>
      </form>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Record ID</th>
            <th className="border p-2">Amount Paid (Rwf)</th>
            <th className="border p-2">Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.payment_id}>
              <td className="border p-2">{payment.record_id}</td>
              <td className="border p-2">{payment.amount_paid}</td>
              <td className="border p-2">{payment.payment_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payment;