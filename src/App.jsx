import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Page Components
import Home from './pages/Home/Home';
import Marketplace from './pages/Marketplace/Marketplace';
import EmergencyBoard from './pages/Emergency/EmergencyBoard';
import NeedsBoard from './pages/Needs/NeedsBoard';
import Profile from './pages/Profile/Profile';
import BorrowItem from './pages/Marketplace/BorrowItem'; // The calendar page we built

// Global Overlay Components (Modals)
import AuthModal from './components/shared/AuthModal';
import PostAdModal from './components/features/PostAdModal';

// Helper to reset scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans antialiased text-gray-900">
        
        {/* Navigation is sticky, stays at top */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Marketplace Routes */}
            <Route path="/buy-sell" element={<Marketplace type="commercial" />} />
            <Route path="/borrow" element={<Marketplace type="sharing" />} />
            <Route path="/item/:id" element={<BorrowItem />} />
            
            {/* Community Features */}
            <Route path="/needs" element={<NeedsBoard />} />
            <Route path="/emergency" element={<EmergencyBoard />} />
            
            {/* User Dashboard */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        <Footer />

        {/* GLOBAL OVERLAYS 
          These sit outside the <main> to avoid z-index conflicts
        */}
        <AuthModal />
        <PostAdModal />
        
      </div>
    </Router>
  );
}

export default App;