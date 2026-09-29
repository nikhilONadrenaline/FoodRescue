import { createContext, useContext, useEffect, useMemo, useState } from "react";
// Uncomment and update these imports when your API is ready
// import { api, getStoredUser, logout as clearSession } from "../api";

const FoodRescueContext = createContext(null);

// Mock initial functions since API isn't built yet
const mockGetStoredUser = () => null;
const mockClearSession = () => {};

export function FoodRescueProvider({ children }) {
  const [user, setUser] = useState(mockGetStoredUser());
  const [dashboardStats, setDashboardStats] = useState(null); // replaces snapshot
  const [donations, setDonations] = useState([]); // replaces records
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
      setDashboardStats(null);
      setDonations([]);
    };
    window.addEventListener("foodrescue:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("foodrescue:unauthorized", handleUnauthorized);
  }, []);

  const refreshStats = async (force = false) => {
    if (!user?.userId) return null;
    // TODO: Replace with real API call
    // const data = await api.fetchDashboardStats(user.userId, { force });
    const mockData = { totalMealsSaved: 120, activeListings: 3 }; 
    setDashboardStats(mockData);
    return mockData;
  };

  const refreshDonations = async (force = false) => {
    if (!user?.userId) return [];
    // TODO: Replace with real API call
    // const data = await api.fetchDonations(user.userId, { force });
    const mockDonations = []; 
    setDonations(mockDonations);
    return mockDonations;
  };

  const refreshAll = async () => {
    if (!user?.userId) return;
    setLoading(true);
    try {
      await Promise.all([refreshStats(), refreshDonations()]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.userId) {
      refreshAll().catch(() => {
        console.error("Failed to load FoodRescue data");
      });
    } else {
      setDashboardStats(null);
      setDonations([]);
    }
  }, [user?.userId]);

  const signIn = async (payload) => {
    // TODO: Replace with real API call
    // const nextUser = await api.signin(payload);
    
    // Mock user for now
    const nextUser = { 
      userId: "123", 
      email: payload.email, 
      role: payload.role || "kitchen", 
      name: "Test User" 
    };
    
    setUser(nextUser);
    return nextUser;
  };

  const signOut = () => {
    mockClearSession();
    setUser(null);
    setDashboardStats(null);
    setDonations([]);
  };

  const addDonation = async (payload) => {
    if (!user?.userId) throw new Error("Please sign in first.");
    
    // TODO: Replace with real API call
    // const donationId = await api.addDonation(user.userId, payload);
    const donationId = "don_" + Date.now();
    
    await Promise.all([refreshDonations(true), refreshStats(true)]);
    return donationId;
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      dashboardStats,
      donations,
      loading,
      signIn,
      signOut,
      refreshStats,
      refreshDonations,
      refreshAll,
      addDonation,
    }),
    [user, dashboardStats, donations, loading]
  );

  return <FoodRescueContext.Provider value={value}>{children}</FoodRescueContext.Provider>;
}

export function useFoodRescue() {
  const context = useContext(FoodRescueContext);
  if (!context) throw new Error("useFoodRescue must be used inside FoodRescueProvider");
  return context;
}
