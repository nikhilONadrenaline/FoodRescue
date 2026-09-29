import React, { useState } from "react";
import { Users, Handshake, MapPin, Phone, Mail, Clock } from "lucide-react";

const mockSuppliers = [
  {
    id: 1,
    name: "Grand Hotel Kitchen",
    distance: "1.2 km",
    address: "123 Main St, City Center",
    phone: "+1 234 567 890",
    email: "kitchen@grandhotel.com",
    activeHours: "08:00 AM - 10:00 PM",
    rating: 4.8
  },
  {
    id: 2,
    name: "Downtown Catering",
    distance: "2.5 km",
    address: "456 Market Ave, Downtown",
    phone: "+1 987 654 321",
    email: "contact@downtowncatering.com",
    activeHours: "06:00 AM - 11:00 PM",
    rating: 4.5
  },
  {
    id: 3,
    name: "University Cafeteria",
    distance: "3.8 km",
    address: "University Campus, North Block",
    phone: "+1 555 123 456",
    email: "food@university.edu",
    activeHours: "07:00 AM - 08:00 PM",
    rating: 4.2
  }
];

export function NearbySuppliers() {
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [requested, setRequested] = useState({});

  const handleTieUpRequest = (e, id) => {
    e.stopPropagation();
    // Mock functionality
    setRequested(prev => ({ ...prev, [id]: true }));
    alert("Tie-up request sent to supplier!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-theme-ink uppercase tracking-widest">Nearby Suppliers</h1>
          <p className="text-theme-ink/70 font-medium text-sm mt-1">Discover and connect with food suppliers in your area.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supplier List */}
        <div className="space-y-4">
          {mockSuppliers.map((supplier) => (
            <div 
              key={supplier.id}
              onClick={() => setSelectedSupplier(supplier)}
              className={`bg-theme-cream border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${selectedSupplier?.id === supplier.id ? 'bg-theme-yellow' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-black text-theme-ink uppercase">{supplier.name}</h3>
                  <div className="flex items-center gap-1 text-sm font-bold text-theme-ink/70 mt-1">
                    <MapPin size={14} /> {supplier.distance}
                  </div>
                </div>
                <button 
                  onClick={(e) => handleTieUpRequest(e, supplier.id)}
                  disabled={requested[supplier.id]}
                  className={`flex items-center gap-2 border-2 border-black px-3 py-1.5 font-black uppercase tracking-widest text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${requested[supplier.id] ? 'bg-gray-300 text-gray-500 shadow-none translate-x-[2px] translate-y-[2px]' : 'bg-theme-green text-theme-ink hover:bg-theme-green-deep hover:text-white'}`}
                >
                  <Handshake size={14} />
                  {requested[supplier.id] ? 'Requested' : 'Tie Up'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Supplier Details */}
        <div className="bg-theme-paper border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-6 self-start">
          {selectedSupplier ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-theme-ink uppercase">{selectedSupplier.name}</h2>
                <div className="inline-block bg-theme-yellow border-2 border-black px-2 py-1 text-xs font-black uppercase mt-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  ★ {selectedSupplier.rating} Rating
                </div>
              </div>
              
              <div className="space-y-3 font-medium text-theme-ink">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 text-theme-green-deep" size={18} />
                  <div>
                    <span className="block font-bold text-xs uppercase text-theme-ink/60">Address</span>
                    {selectedSupplier.address} ({selectedSupplier.distance})
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 text-theme-green-deep" size={18} />
                  <div>
                    <span className="block font-bold text-xs uppercase text-theme-ink/60">Phone</span>
                    {selectedSupplier.phone}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 text-theme-green-deep" size={18} />
                  <div>
                    <span className="block font-bold text-xs uppercase text-theme-ink/60">Email</span>
                    {selectedSupplier.email}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 text-theme-green-deep" size={18} />
                  <div>
                    <span className="block font-bold text-xs uppercase text-theme-ink/60">Active Hours</span>
                    {selectedSupplier.activeHours}
                  </div>
                </div>
              </div>

              {!requested[selectedSupplier.id] && (
                <button 
                  onClick={(e) => handleTieUpRequest(e, selectedSupplier.id)}
                  className="w-full flex items-center justify-center gap-2 bg-theme-green border-2 border-black px-4 py-3 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <Handshake size={18} /> Send Tie Up Request
                </button>
              )}
            </div>
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center text-theme-ink/50 space-y-4">
              <Users size={48} strokeWidth={1} />
              <p className="font-bold uppercase tracking-widest text-sm">Select a supplier to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
