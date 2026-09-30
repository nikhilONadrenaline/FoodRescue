import React, { useState } from "react";
import { Package, Clock, Utensils, CheckCircle } from "lucide-react";

const mockSurplus = [
  {
    id: 101,
    supplier: "Grand Hotel Kitchen",
    items: "Rice, Mixed Veg Curry, Bread",
    quantity: "50 servings",
    expiry: "4 hours",
    type: "Cooked Food"
  },
  {
    id: 102,
    supplier: "Downtown Catering",
    items: "Fresh Apples, Bananas",
    quantity: "20 kg",
    expiry: "2 days",
    type: "Raw Ingredients"
  },
  {
    id: 103,
    supplier: "University Cafeteria",
    items: "Sandwiches, Salads",
    quantity: "30 servings",
    expiry: "2 hours",
    type: "Packaged Food"
  }
];

export function NgoSurplus() {
  const [claimed, setClaimed] = useState({});

  const handleClaim = (id) => {
    // Mock functionality
    setClaimed(prev => ({ ...prev, [id]: true }));
    alert("Claim request sent to the supplier!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-theme-ink uppercase tracking-widest">Available Surplus Food</h1>
          <p className="text-theme-ink/70 font-medium text-sm mt-1">Browse and claim listed surplus food from your network.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockSurplus.map((item) => (
          <div key={item.id} className="bg-theme-cream border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="inline-block bg-theme-yellow border-2 border-black px-2 py-1 text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {item.type}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-100 px-2 py-1 border-2 border-black">
                <Clock size={12} strokeWidth={3} /> {item.expiry} left
              </span>
            </div>
            
            <h3 className="text-xl font-black text-theme-ink mb-1">{item.supplier}</h3>
            
            <div className="flex items-start gap-2 mb-2">
              <Utensils className="mt-0.5 text-theme-green-deep shrink-0" size={16} />
              <p className="text-sm font-bold text-theme-ink">{item.items}</p>
            </div>
            
            <div className="flex items-start gap-2 mb-6">
              <Package className="mt-0.5 text-theme-green-deep shrink-0" size={16} />
              <p className="text-sm font-bold text-theme-ink">{item.quantity}</p>
            </div>
            
            <div className="mt-auto">
              <button 
                onClick={() => handleClaim(item.id)}
                disabled={claimed[item.id]}
                className={`w-full flex items-center justify-center gap-2 border-2 border-black px-4 py-3 font-black uppercase tracking-widest text-sm transition-all ${
                  claimed[item.id] 
                    ? 'bg-gray-300 text-gray-500 shadow-none' 
                    : 'bg-theme-green text-theme-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                {claimed[item.id] ? (
                  <><CheckCircle size={18} /> Request Sent</>
                ) : (
                  'Claim Surplus'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
