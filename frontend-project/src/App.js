import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Car from './components/Car';
import Service from './components/Service';
import ServiceRecord from './components/ServiceRecord';
import Payment from './components/Payment';
import Reports from './components/Reports';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4">
          <ul className="flex space-x-4 text-white">
            <li><Link to="/car" className="hover:underline">Car</Link></li>
            <li><Link to="/service" className="hover:underline">Services</Link></li>
            <li><Link to="/service-record" className="hover:underline">Service Record</Link></li>
            <li><Link to="/payment" className="hover:underline">Payment</Link></li>
            <li><Link to="/reports" className="hover:underline">Reports</Link></li>
            <li><Link to="/logout" className="hover:underline">Logout</Link></li>
          </ul>
        </nav>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/car" element={<Car />} />
            <Route path="/service" element={<Service />} />
            <Route path="/service-record" element={<ServiceRecord />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/logout" element={<div>Logged out</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;