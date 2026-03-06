import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/common/Footer';


// Page Components
import Home from './pages/Home/Home';
import Marketplace from './pages/Marketplace/Marketplace';
import EmergencyBoard from './pages/Emergency/EmergencyBoard';
import NeedsBoard from './pages/Needs/NeedsBoard';
import Profile from './pages/Profile/Profile';
import BorrowItem from './pages/Marketplace/BorrowItem';
import AuthModal from './components/shared/AuthModal';
import LocationModal from './components/features/LocationModal';
import PostAdModal from './components/features/PostAdModal';
import ResponsiveWrapper from './components/layout/ResponsiveWrapper';

// Global context for modal state
import { useGlobalContext } from './context/AppContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// Inner app wrapper so we can use context hooks
const AppInner = () => {
  const { isPostModalOpen, togglePostModal } = useGlobalContext();

    return (
    <div style={{
      minHeight: '100vh', background: '#EEF2FF',
      display: 'flex', flexDirection: 'column',
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: '#1E1B4B',
    }}>
      <ScrollToTop />
      <ResponsiveWrapper>        {/* ← wrap everything */}
        <Navbar />
        <main style={{ flex: 1, width: '100%' }}>
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/buy-sell"   element={<Marketplace type="commercial" />} />
            <Route path="/borrow"     element={<Marketplace type="sharing" />} />
            <Route path="/item/:id"   element={<BorrowItem />} />
            <Route path="/needs"      element={<NeedsBoard />} />
            <Route path="/emergency"  element={<EmergencyBoard />} />
            <Route path="/profile"    element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </ResponsiveWrapper>        {/* ← end wrap */}

      <AuthModal />
      <PostAdModal isOpen={isPostModalOpen} onClose={togglePostModal} />
      <LocationModal />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

export default App;