import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Location State
  const [location, setLocation] = useState({
    city: "Detecting...",
    coordinates: null,
    isLoaded: false
  });

  // 2. User/Trust State
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: "Guest",
    trustScore: 85, // Scale of 0-100
    points: 120,    // Local reward points
    badges: ["Verified Resident"]
  });

  // Mock function to simulate detecting location
  useEffect(() => {
    setTimeout(() => {
      setLocation({
        city: "Indore, MP", 
        coordinates: { lat: 22.7196, lng: 75.8577 },
        isLoaded: true
      });
    }, 2000);
  }, []);

  return (
    <AppContext.Provider value={{ location, setLocation, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easy access
export const useGlobalContext = () => useContext(AppContext);