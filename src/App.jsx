import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home/Home';
import Marketplace from './pages/Marketplace/Marketplace';
import EmergencyBoard from './pages/Emergency/EmergencyBoard';
import NeedsBoard from './pages/Needs/NeedsBoard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy-sell" element={<Marketplace type="commercial" />} />
            <Route path="/borrow" element={<Marketplace type="sharing" />} />
            <Route path="/needs" element={<NeedsBoard />} />
            <Route path="/emergency" element={<EmergencyBoard />} />
            {/* Add more routes as you build */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;