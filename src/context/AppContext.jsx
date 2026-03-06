import React, { createContext, useContext, useState, useEffect } from 'react';
import { DUMMY_ITEMS } from '../data/dummyItems';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [location, setLocation] = useState({
    city: localStorage.getItem('userCity') || "Local Area",
    coordinates: null,
    isLoaded: localStorage.getItem('userCity') ? true : false,
    isDetecting: false
  });

  const [user, setUser] = useState({
    isLoggedIn: false,
    name: "Guest",
    trustScore: 85,
    points: 120,
    badges: ["Verified Resident"]
  });

  const [items, setItems] = useState(DUMMY_ITEMS);

  // Modal states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView]               = useState('login');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // ── Auth modal
  const toggleAuthModal = (view = 'login') => {
    setAuthView(view);
    setIsAuthModalOpen(prev => !prev);
  };

  // ── Post Ad — login required
  const togglePostModal = () => {
    if (!user.isLoggedIn) {
      setAuthView('signup');
      setIsAuthModalOpen(true);
      return;
    }
    setIsPostModalOpen(prev => !prev);
  };

  // ── Location modal — login required
  const openLocationModal = () => {
    if (!user.isLoggedIn) {
      setAuthView('login');
      setIsAuthModalOpen(true);
      return;
    }
    setIsLocationModalOpen(true);
  };

  const closeLocationModal = () => setIsLocationModalOpen(false);

  // ── Update location — only if logged in
  const updateLocation = (city) => {
    if (!user.isLoggedIn) return;
    setLocation(prev => ({ ...prev, city }));
    localStorage.setItem('userCity', city);
    setIsLocationModalOpen(false);
  };

  const logout = () => {
    setUser({
      isLoggedIn: false,
      name: "Guest",
      trustScore: 0,
      points: 0,
      badges: []
    });
    // Clear location on logout too
    localStorage.removeItem('userCity');
    setLocation({ city: "Local Area", coordinates: null, isLoaded: false, isDetecting: false });
  };

  // Auto-detect location (only if logged in and no saved city)
  useEffect(() => {
    if (!user.isLoggedIn) return; // ← don't detect if not logged in

    const detectLocation = () => {
      if (!("geolocation" in navigator)) {
        setLocation(prev => ({ ...prev, city: "Bhopal", isLoaded: true }));
        return;
      }
      setLocation(prev => ({ ...prev, isDetecting: true }));
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const detectedCity = data.address.city || data.address.town || data.address.suburb || "Local Area";
            setLocation({ city: detectedCity, coordinates: { lat: latitude, lng: longitude }, isLoaded: true, isDetecting: false });
            localStorage.setItem('userCity', detectedCity);
          } catch {
            setLocation(prev => ({ ...prev, city: "Bhopal", isLoaded: true, isDetecting: false }));
          }
        },
        () => {
          setLocation(prev => ({ ...prev, city: "Bhopal", isLoaded: true, isDetecting: false }));
        }
      );
    };

    if (!localStorage.getItem('userCity')) {
      detectLocation();
    }
  }, [user.isLoggedIn]); // ← re-runs when login status changes

  return (
    // In AppContext.jsx — add setAuthView to the Provider value:
<AppContext.Provider value={{
  location, setLocation,
  user, setUser,
  items, setItems,
  isAuthModalOpen, authView, setAuthView,  // ← add setAuthView here
  toggleAuthModal,
  isPostModalOpen, togglePostModal,
  isLocationModalOpen, openLocationModal, closeLocationModal, updateLocation,
  logout,
}}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);