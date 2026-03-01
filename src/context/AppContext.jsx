import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Location State
  const [location, setLocation] = useState({
    city: "Detecting...",
    coordinates: null,
    isLoaded: false
  });

  // 2. User & Reputation State
  const [user, setUser] = useState({
    isLoggedIn: false, // Set to true to test logged-in UI
    name: "Guest",
    trustScore: 85, 
    points: 120,    
    badges: ["Verified Resident"]
  });

  // 3. UI Modal States (No Redirection Logic)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState('login'); // 'login' or 'signup'
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // 4. Helper Functions to toggle UI
  const toggleAuthModal = (view = 'login') => {
    setAuthView(view);
    setIsAuthModalOpen(!isAuthModalOpen);
  };

  const togglePostModal = () => {
    // Prevent unauthenticated users from posting
    if (!user.isLoggedIn) {
      toggleAuthModal('signup');
    } else {
      setIsPostModalOpen(!isPostModalOpen);
    }
  };

  const logout = () => {
    setUser({ isLoggedIn: false, name: "Guest", trustScore: 0, points: 0, badges: [] });
  };

  // Mock function to simulate detecting location on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation({
        city: "Indore, MP", 
        coordinates: { lat: 22.7196, lng: 75.8577 },
        isLoaded: true
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppContext.Provider value={{ 
      location, 
      setLocation, 
      user, 
      setUser,
      isAuthModalOpen,
      authView,
      toggleAuthModal,
      isPostModalOpen,
      togglePostModal,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easy access across components
export const useGlobalContext = () => useContext(AppContext);