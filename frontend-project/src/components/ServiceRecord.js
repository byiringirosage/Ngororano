import { useState, useEffect } from 'react';
import axios from 'axios';

function ServiceRecord() {
  const [records, setRecords] = useState([]);
  const [cars, setCars] = useState([]);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    car_id: '',
    service_id: '',
    service_date: ''
  });

  useEffect(() => {
    fetchRecords();
    fetchCars();
    fetchServices();
  }, []);

  const fetchRecords = async () => {
    const response = await axios.get('http://localhost:5000/api/service-records');
    setRecords(response.data);
  };

  const fetchCars = async () => {
    const response = await axios.get('http://localhost:5000/api/cars');
    setCars(response.data);
  };

  const fetchServices = async () => {
    const response = await axios.get('http://localhost:5000/api/services');
    setServices(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/service-records', formData);
    fetchRecords();
    setFormData({ car_id: '', service_id: '', service_date: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Service Record Management</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <select
          name="car_id"
          value={formData.car_id}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Car</option>
          {cars.map(car => (
            <option key={car.car_id} value={car.car_id}>{car.license_plate}</option>
          ))}
        </select>
        <select
          name="service_id"
          value={formData.service_id}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Service</option>
          {services.map(service => (
            <option key={service.service_id} value={service.service_id}>{service.service_name}</option>
          ))}
        </select>
        <input
          type="date"
          name="service_date"
          value={formData.service_date}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Add Record</button>
      </form>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Car</th>
            <th className="border p-2">Service</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.record_id}>
              <td className="border p-2">{record.car_id}</td>
              <td className="border p-2">{record.service_id}</td>
              <td className="border p-2">{record.service_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceRecord;