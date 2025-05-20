import { useState, useEffect } from 'react';
import axios from 'axios';

function Car() {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    license_plate: '',
    type_model: '',
    year_of_manufacture: '',
    driver_phone: ''
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const response = await axios.get('http://localhost:5000/api/cars');
    setCars(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/cars', formData);
    fetchCars();
    setFormData({ license_plate: '', type_model: '', year_of_manufacture: '', driver_phone: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Car Management</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="license_plate"
          value={formData.license_plate}
          onChange={handleChange}
          placeholder="License Plate"
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="type_model"
          value={formData.type_model}
          onChange={handleChange}
          placeholder="Type/Model"
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="year_of_manufacture"
          value={formData.year_of_manufacture}
          onChange={handleChange}
          placeholder="Year of Manufacture"
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="driver_phone"
          value={formData.driver_phone}
          onChange={handleChange}
          placeholder="Driver Phone"
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Add Car</button>
      </form>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">License Plate</th>
            <th className="border p-2">Type/Model</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">Driver Phone</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.car_id}>
              <td className="border p-2">{car.license_plate}</td>
              <td className="border p-2">{car.type_model}</td>
              <td className="border p-2">{car.year_of_manufacture}</td>
              <td className="border p-2">{car.driver_phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Car;