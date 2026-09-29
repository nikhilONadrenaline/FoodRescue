// Centralized Mock Data for FoodRescue Platform

// Used in KitchenDashboard (Pie Chart & Marquee)
export const dashboardInventoryData = [
  { id: "rice", name: "Rice", amount: "450 kg", percentage: 36, colorHex: "#00d0f0" },
  { id: "wheat", name: "Wheat Flour", amount: "200 kg", percentage: 16, colorHex: "#ffc107" },
  { id: "lentils", name: "Lentils", amount: "150 kg", percentage: 12, colorHex: "#ff3399" },
  { id: "tomatoes", name: "Tomatoes", amount: "120 kg", percentage: 10, colorHex: "#4caf50" },
  { id: "onions", name: "Onions", amount: "100 kg", percentage: 8, colorHex: "#ff9800" },
  { id: "potatoes", name: "Potatoes", amount: "90 kg", percentage: 7, colorHex: "#795548" },
  { id: "milk", name: "Milk", amount: "80 L", percentage: 7, colorHex: "#e0e0e0" },
  { id: "meat", name: "Meat & Poultry", amount: "50 kg", percentage: 4, colorHex: "#9c27b0" },
];

// Used in InventoryManagement (Live Feed)
export const liveInventoryFeed = [
  { id: "1", name: "Premium Basmati Rice", stock: "200 kg", status: "good" },
  { id: "2", name: "Whole Wheat Flour", stock: "150 kg", status: "good" },
  { id: "3", name: "Yellow Lentils (Toor Dal)", stock: "50 kg", status: "low" },
  { id: "4", name: "Fresh Tomatoes", stock: "15 kg", status: "low" },
  { id: "5", name: "Full Cream Milk", stock: "10 L", status: "critical" },
];

// To be used in ExpenditureAnalytics
export const expenditureData = [
  { month: "Jan", expenditure: 12000, wasteCost: 1500, savings: 800 },
  { month: "Feb", expenditure: 11500, wasteCost: 1200, savings: 1100 },
  { month: "Mar", expenditure: 13000, wasteCost: 1800, savings: 600 },
  { month: "Apr", expenditure: 10500, wasteCost: 900, savings: 1500 },
  { month: "May", expenditure: 11800, wasteCost: 1100, savings: 1300 },
  { month: "Jun", expenditure: 12500, wasteCost: 1400, savings: 900 },
];

// To be used in SurplusManagement (NGO Network)
export const ngoNetworkData = [
  { id: "ngo1", name: "Feeding Hope Center", distance: "2.4 km", rating: 4.8, capacity: "High" },
  { id: "ngo2", name: "City Mission Shelter", distance: "3.8 km", rating: 4.5, capacity: "Medium" },
  { id: "ngo3", name: "Grace Community Bank", distance: "5.1 km", rating: 4.2, capacity: "Low" },
  { id: "ngo4", name: "Sunrise Orphanage", distance: "6.5 km", rating: 4.9, capacity: "High" },
];

// To be used in SurplusManagement (Pending NGO Requests)
export const ngoRequestsData = [
  { id: "req1", name: "Care & Share Foundation", distance: "4.2 km", date: "2026-09-30", type: "Orphanage", requestedFood: "Cooked Rice", quantity: "30 kg" },
  { id: "req2", name: "Helping Hands Org", distance: "8.1 km", date: "2026-09-29", type: "Community Kitchen", requestedFood: "Mixed Vegetables", quantity: "15 kg" },
];

// To be used in SurplusManagement (Surplus Alerts)
export const surplusAlertsData = [
  { id: "alert1", item: "Cooked Rice", quantity: "30 kg", expiry: "2 hours", type: "Perishable" },
  { id: "alert2", item: "Mixed Vegetables", quantity: "15 kg", expiry: "4 hours", type: "Perishable" },
];

// To be used in KitchenDashboard (AI Prediction Widget)
export const aiPredictionData = {
  actualPrepared: 520, // kg
  aiPredicted: 450, // kg
  predictedSurplus: 70, // kg (Extra Buffer)
  remainingFood: 55, // kg (Redistributed to NGO)
  actualWaste: 15 // kg (To Waste Storage)
};

export const aiPredictionPerItem = [
  { id: "rice", name: "Rice", actualPrepared: 150, aiPredicted: 130, predictedSurplus: 20, remainingFood: 15, actualWaste: 5, colorHex: "#00d0f0" },
  { id: "wheat", name: "Wheat Flour", actualPrepared: 100, aiPredicted: 90, predictedSurplus: 10, remainingFood: 8, actualWaste: 2, colorHex: "#ffc107" },
  { id: "lentils", name: "Lentils", actualPrepared: 80, aiPredicted: 75, predictedSurplus: 5, remainingFood: 5, actualWaste: 0, colorHex: "#ff3399" },
  { id: "tomatoes", name: "Tomatoes", actualPrepared: 50, aiPredicted: 40, predictedSurplus: 10, remainingFood: 8, actualWaste: 2, colorHex: "#4caf50" },
  { id: "onions", name: "Onions", actualPrepared: 60, aiPredicted: 55, predictedSurplus: 5, remainingFood: 4, actualWaste: 1, colorHex: "#ff9800" },
];

// To be used in WasteStorage page
export const wasteStorageData = [
  { id: "w1", category: "Organic Spoiled", amount: "10 kg", destination: "Compost Bin A", date: "Today, 2:00 PM", status: "Processed" },
  { id: "w2", category: "Inedible Peels/Scraps", amount: "5 kg", destination: "Biofuel Generator", date: "Today, 10:30 AM", status: "Pending" },
  { id: "w3", category: "Spoiled Dairy", amount: "2 L", destination: "Liquid Waste Treatment", date: "Yesterday", status: "Processed" },
  { id: "w4", category: "Organic Spoiled", amount: "12 kg", destination: "Compost Bin B", date: "Yesterday", status: "Processed" },
];

// To be used in InventoryManagement (Categorized UI)
export const categorizedInventoryData = [
  {
    category: "Grains & Millets",
    items: [
      { id: "rice", name: "Premium Basmati Rice", stock: "200 kg", status: "In Stock", supplierName: "AgriCorp India", updatedDate: "2026-09-08", storageConditions: { temp: "15°C - 20°C", humidity: "40% - 60%" }, price: "₹18,000" },
      { id: "wheat", name: "Whole Wheat Flour", stock: "150 kg", status: "In Stock", supplierName: "Golden Harvest Mills", updatedDate: "2026-09-09", storageConditions: { temp: "Cool & Dry", humidity: "Below 50%" }, price: "₹6,000" },
      { id: "pearl_millet", name: "Pearl Millet (Bajra)", stock: "40 kg", status: "Low Stock", supplierName: "Local Farmers Co-op", updatedDate: "2026-09-05", storageConditions: { temp: "10°C - 25°C", humidity: "Below 60%" }, price: "₹1,200" },
      { id: "finger_millet", name: "Finger Millet (Ragi)", stock: "15 kg", status: "Critical", supplierName: "AgriCorp India", updatedDate: "2026-09-01", storageConditions: { temp: "10°C - 25°C", humidity: "Below 60%" }, price: "₹600" },
    ]
  },
  {
    category: "Vegetables",
    items: [
      { id: "tomatoes", name: "Fresh Tomatoes", stock: "15 kg", status: "Low Stock", supplierName: "Green Valley Farms", updatedDate: "2026-09-10", storageConditions: { temp: "10°C - 15°C", humidity: "85% - 95%" }, price: "₹450" },
      { id: "onions", name: "Red Onions", stock: "100 kg", status: "In Stock", supplierName: "Nashik Traders", updatedDate: "2026-09-07", storageConditions: { temp: "0°C - 5°C", humidity: "65% - 70%" }, price: "₹2,500" },
      { id: "potatoes", name: "Potatoes", stock: "90 kg", status: "In Stock", supplierName: "AgriCorp India", updatedDate: "2026-09-06", storageConditions: { temp: "4°C - 10°C", humidity: "90% - 95%" }, price: "₹1,800" },
      { id: "spinach", name: "Spinach", stock: "5 kg", status: "Critical", supplierName: "Green Valley Farms", updatedDate: "2026-09-10", storageConditions: { temp: "0°C - 2°C", humidity: "95% - 100%" }, price: "₹200" },
    ]
  },
  {
    category: "Seeds & Pulses",
    items: [
      { id: "lentils", name: "Yellow Lentils (Toor Dal)", stock: "50 kg", status: "Low Stock", supplierName: "Dal Millers Assoc.", updatedDate: "2026-09-02", storageConditions: { temp: "15°C - 25°C", humidity: "Below 60%" }, price: "₹4,500" },
      { id: "chickpeas", name: "Chickpeas", stock: "80 kg", status: "In Stock", supplierName: "Golden Harvest Mills", updatedDate: "2026-09-04", storageConditions: { temp: "15°C - 20°C", humidity: "Below 60%" }, price: "₹6,400" },
      { id: "sunflower_seeds", name: "Sunflower Seeds", stock: "10 kg", status: "Critical", supplierName: "NutriSeeds Ltd", updatedDate: "2026-09-01", storageConditions: { temp: "Cool & Dry", humidity: "Below 50%" }, price: "₹1,500" },
      { id: "chia_seeds", name: "Chia Seeds", stock: "25 kg", status: "In Stock", supplierName: "NutriSeeds Ltd", updatedDate: "2026-09-08", storageConditions: { temp: "Cool & Dry", humidity: "Below 50%" }, price: "₹5,000" },
    ]
  },
  {
    category: "Dairy & Meat",
    items: [
      { id: "milk", name: "Full Cream Milk", stock: "10 L", status: "Critical", supplierName: "Amul Distributors", updatedDate: "2026-09-10", storageConditions: { temp: "1°C - 4°C", humidity: "N/A" }, price: "₹600" },
      { id: "cheese", name: "Cheddar Cheese", stock: "5 kg", status: "Low Stock", supplierName: "Amul Distributors", updatedDate: "2026-09-08", storageConditions: { temp: "2°C - 8°C", humidity: "N/A" }, price: "₹2,500" },
      { id: "chicken", name: "Chicken Breast", stock: "30 kg", status: "In Stock", supplierName: "FreshMeat Co.", updatedDate: "2026-09-09", storageConditions: { temp: "-18°C (Frozen)", humidity: "N/A" }, price: "₹7,500" },
    ]
  }
];

// To be used for Notification Sidebar
export const inventoryWarningsData = [
  { id: "warn1", type: "Temperature", item: "Fresh Tomatoes", message: "Storage temperature exceeded 15°C. Current: 18°C.", severity: "high", time: "10 mins ago" },
  { id: "warn2", type: "Humidity", item: "Whole Wheat Flour", message: "Humidity level above 50%. Current: 65%.", severity: "medium", time: "1 hour ago" },
  { id: "warn3", type: "Temperature", item: "Full Cream Milk", message: "Temperature approaching critical limit. Current: 4°C.", severity: "low", time: "3 hours ago" },
  { id: "warn4", type: "Temperature", item: "Chicken Breast", message: "Freezer temperature increased. Current: -15°C.", severity: "high", time: "5 hours ago" },
];

// To be used in ExpenditureAnalytics (Donation History)
export const donationHistoryData = [
  { 
    id: "don1", 
    foodDonated: "Mixed Meals & Rice", 
    quantity: "45 kg", 
    recipient: "Feeding Hope Center", 
    dateTime: "2026-09-11, 18:30", 
    method: "Pickup", 
    status: "Completed", 
    valueRecovered: 2250, 
    beneficiaries: 150 
  },
  { 
    id: "don2", 
    foodDonated: "Fresh Vegetables", 
    quantity: "20 kg", 
    recipient: "City Mission Shelter", 
    dateTime: "2026-09-10, 14:15", 
    method: "Delivery", 
    status: "Completed", 
    valueRecovered: 800, 
    beneficiaries: 65 
  },
  { 
    id: "don3", 
    foodDonated: "Whole Wheat Bread", 
    quantity: "15 kg", 
    recipient: "Grace Community Bank", 
    dateTime: "2026-09-12, 09:00", 
    method: "Pickup", 
    status: "In Transit", 
    valueRecovered: 600, 
    beneficiaries: 50 
  },
  { 
    id: "don4", 
    foodDonated: "Cooked Lentils", 
    quantity: "30 kg", 
    recipient: "Sunrise Orphanage", 
    dateTime: "2026-09-09, 19:45", 
    method: "Delivery", 
    status: "Completed", 
    valueRecovered: 1500, 
    beneficiaries: 100 
  },
];

// --- New Data for Expanded Expenditure & Procurement Analytics ---

export const detailedExpenditureStats = {
  totalExpenditure: 71300,
  dailyAvg: 2376,
  weeklyAvg: 16636,
  monthlyAvg: 71300,
  yearlyProjected: 855600,
  averageCostPerMeal: 14.50, // ₹ per meal
  costPerKg: 28.00, // ₹ per kg
  budgetActual: 71300,
  budgetTarget: 75000,
  predictedFutureExpenditure: 72500,
  potentialSavings: 3800,
  moneyWasted: 6900,
  amountRedistributed: 2450, // kg
  moneyRecovered: 18500
};

export const procurementTrendsData = [
  { period: "Week 1", actual: 16000, predicted: 15500 },
  { period: "Week 2", actual: 18500, predicted: 17000 },
  { period: "Week 3", actual: 17200, predicted: 17500 },
  { period: "Week 4", actual: 19600, predicted: 18000 },
];

export const supplierExpenditureData = [
  { supplier: "AgriCorp India", amount: 35000, percentage: 49, colorHex: "#00d0f0" },
  { supplier: "Golden Harvest", amount: 15000, percentage: 21, colorHex: "#ffc107" },
  { supplier: "FreshMeat Co.", amount: 12000, percentage: 17, colorHex: "#ff3399" },
  { supplier: "Amul Dist.", amount: 5000, percentage: 7, colorHex: "#4caf50" },
  { supplier: "Others", amount: 4300, percentage: 6, colorHex: "#795548" },
];

export const aiExpenditureInsights = [
  {
    id: "insight1",
    type: "warning", // Maps to color/icon
    title: "Over-Purchasing Detection",
    message: "Tomato procurement is 18% higher than predicted consumption over the last 30 days.",
    action: "Review Tomato Inventory",
    actionValue: "-18% Next Order"
  },
  {
    id: "insight2",
    type: "critical",
    title: "Increasing-Cost Item",
    message: "Premium Basmati Rice prices have surged by 12% from AgriCorp India compared to last quarter.",
    action: "Compare Suppliers",
    actionValue: "Save ₹4,500/mo"
  },
  {
    id: "insight3",
    type: "success",
    title: "Potential Savings Identified",
    message: "Bulk ordering Whole Wheat Flour bi-weekly instead of weekly will reduce transport overhead.",
    action: "Update Order Schedule",
    actionValue: "Save ₹1,200/mo"
  },
  {
    id: "insight4",
    type: "info",
    title: "Unusual Expenditure",
    message: "A sudden spike of ₹8,500 in 'Dairy' category detected on 2026-09-08. Not aligned with historical trends.",
    action: "Investigate Invoice #402",
    actionValue: "Verify Purchase"
  }
];
