import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import { KitchenLayout } from './layouts/KitchenLayout.jsx'
import { KitchenDashboard } from './pages/KitchenDashboard.jsx'
import { InventoryManagement } from './pages/InventoryManagement.jsx'
import { ExpenditureAnalytics } from './pages/ExpenditureAnalytics.jsx'
import { SurplusManagement } from './pages/SurplusManagement.jsx'
import { WasteStorage } from './pages/WasteStorage.jsx'
import { WasteManagement } from './pages/WasteManagement.jsx'
import { FoodRescueProvider } from './context/FoodRescueContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FoodRescueProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/kitchen" element={<KitchenLayout />}>
            <Route index element={<KitchenDashboard />} />
            <Route path="inventory" element={<InventoryManagement />} />
            <Route path="expenditure" element={<ExpenditureAnalytics />} />
            <Route path="surplus" element={<SurplusManagement />} />
            <Route path="waste-storage" element={<WasteStorage />} />
            <Route path="waste-management" element={<WasteManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FoodRescueProvider>
  </StrictMode>,
)
