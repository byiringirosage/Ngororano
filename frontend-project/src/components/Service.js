import { useState, useEffect } from 'react';
import axios from 'axios';

function Service() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    service_name: '',
    price: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const response = await axios.get('http://localhost:5000/api/services');
    setServices(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/services', formData);
    fetchServices();
    setFormData({ service_name: '', price: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Service Management</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="service_name"
          value={formData.service_name}
          onChange={handleChange}
          placeholder="Service Name"
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price (Rwf)"
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Add Service</button>
      </form>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Service Name</th>
            <th className="border p-2">Price (Rwf)</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.service_id}>
              <td className="border p-2">{service.service_name}</td>
              <td className="border p-2">{service.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Service;