import React from "react";
import { History as HistoryIcon, Clock, CheckCircle } from "lucide-react";

const mockRequested = [
  { id: 201, supplier: "Grand Hotel Kitchen", items: "Rice, Mixed Veg Curry", quantity: "30 servings", status: "Pending Approval", time: "10 mins ago" },
  { id: 202, supplier: "University Cafeteria", items: "Sandwiches", quantity: "20 servings", status: "Ready for Pickup", time: "1 hour ago" },
];

const mockPast = [
  { id: 301, supplier: "Downtown Catering", items: "Fresh Apples", quantity: "15 kg", date: "2023-10-25", impact: "Helped 50 people" },
  { id: 302, supplier: "Grand Hotel Kitchen", items: "Pasta, Bread", quantity: "40 servings", date: "2023-10-22", impact: "Helped 40 people" },
];

export function NgoHistory() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-theme-ink uppercase tracking-widest">Surplus History</h1>
          <p className="text-theme-ink/70 font-medium text-sm mt-1">Track your active requests and past claimed surplus.</p>
        </div>
      </div>

      {/* Currently Requested */}
      <section className="space-y-4">
        <h2 className="text-xl font-black text-theme-ink flex items-center gap-2 border-b-4 border-black pb-2">
          <Clock size={24} /> Currently Requested
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockRequested.map((req) => (
            <div key={req.id} className="bg-theme-cream border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-black text-lg text-theme-ink">{req.supplier}</h3>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${req.status === 'Ready for Pickup' ? 'bg-theme-green' : 'bg-theme-yellow'}`}>
                  {req.status}
                </span>
              </div>
              <p className="text-sm font-bold text-theme-ink/80">{req.items} ({req.quantity})</p>
              <p className="text-xs font-bold text-theme-ink/50 mt-2">Requested {req.time}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Past Claimed */}
      <section className="space-y-4">
        <h2 className="text-xl font-black text-theme-ink flex items-center gap-2 border-b-4 border-black pb-2">
          <CheckCircle size={24} /> Past Claimed Surplus
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <thead className="bg-theme-sage border-b-4 border-black">
              <tr>
                <th className="p-4 font-black uppercase tracking-widest text-sm">Date</th>
                <th className="p-4 font-black uppercase tracking-widest text-sm">Supplier</th>
                <th className="p-4 font-black uppercase tracking-widest text-sm">Items</th>
                <th className="p-4 font-black uppercase tracking-widest text-sm">Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y-4 divide-black">
              {mockPast.map((item) => (
                <tr key={item.id} className="hover:bg-theme-cream transition-colors">
                  <td className="p-4 font-bold text-sm whitespace-nowrap">{item.date}</td>
                  <td className="p-4 font-black text-theme-ink">{item.supplier}</td>
                  <td className="p-4 font-bold text-sm">{item.items} <span className="text-theme-ink/60">({item.quantity})</span></td>
                  <td className="p-4 font-bold text-sm text-theme-green-deep">{item.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
