import React from "react";
import { wasteStorageData } from "../data/mockData";
import { Trash2, Leaf, Droplet, ArrowRight, ShieldCheck } from "lucide-react";

export function WasteStorage() {
  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 pb-12">
      <h1 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-3">
        <Trash2 className="text-[#ff3399]" /> Waste Storage & Disposal
      </h1>
      
      {/* Waste Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1f3025] border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-[#ff3399]/50 transition-colors">
           <div className="absolute top-0 right-0 p-6 opacity-5 text-[#ff3399] transition-transform group-hover:scale-110"><Trash2 size={80}/></div>
           <h3 className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2 relative z-10">Total Inedible Waste Logged</h3>
           <p className="text-4xl font-black text-white relative z-10">27 <span className="text-lg text-white/60">kg</span></p>
        </div>
        <div className="bg-[#1f3025] border border-[#4caf50]/30 rounded-3xl p-6 shadow-[0_0_15px_rgba(76,175,80,0.1)] relative overflow-hidden group hover:bg-[#4caf50]/5 transition-colors">
           <div className="absolute top-0 right-0 p-6 opacity-10 text-[#4caf50] transition-transform group-hover:scale-110"><Leaf size={80}/></div>
           <h3 className="text-[#4caf50]/80 text-[10px] font-bold uppercase tracking-widest mb-2 relative z-10">Sent to Compost</h3>
           <p className="text-4xl font-black text-[#4caf50] relative z-10">22 <span className="text-lg text-[#4caf50]/50">kg</span></p>
        </div>
        <div className="bg-[#1f3025] border border-[#ffc107]/30 rounded-3xl p-6 shadow-[0_0_15px_rgba(255,193,7,0.1)] relative overflow-hidden group hover:bg-theme-yellow/5 transition-colors">
           <div className="absolute top-0 right-0 p-6 opacity-10 text-[#f1d85a] transition-transform group-hover:scale-110"><Droplet size={80}/></div>
           <h3 className="text-[#f1d85a]/80 text-[10px] font-bold uppercase tracking-widest mb-2 relative z-10">Sent to Biofuel</h3>
           <p className="text-4xl font-black text-[#f1d85a] relative z-10">5 <span className="text-lg text-[#f1d85a]/50">kg</span></p>
        </div>
      </div>

      {/* Waste Log Table */}
      <div className="bg-[#2a3d31] border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white/60 text-xs font-bold uppercase tracking-widest">Recent Waste Logs</h2>
          <button className="bg-[#ff3399]/10 text-[#ff3399] border border-[#ff3399]/30 px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-[#ff3399] hover:text-[#18181b] transition-colors">
            + Log Waste
          </button>
        </div>
        
        <div className="flex flex-col gap-3">
          {wasteStorageData.map((log) => (
            <div key={log.id} className="bg-[#1f3025] border border-white/10 p-4 rounded-2xl flex items-center justify-between hover:bg-[#2a3d31] transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#333]/50 rounded-xl">
                  {log.destination.includes("Compost") ? <Leaf size={20} className="text-[#4caf50]" /> : <Droplet size={20} className="text-[#f1d85a]" />}
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide">{log.category}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{log.date}</span>
                    <span className="text-[#333]">&bull;</span>
                    <span className="text-[#b9e7aa] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                      <ArrowRight size={10} /> {log.destination}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <span className="text-xl font-black text-white">{log.amount}</span>
                <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 px-3 py-1 rounded-full ${
                  log.status === "Processed" ? "bg-[#4caf50]/10 text-[#4caf50]" : "bg-theme-yellow/10 text-[#f1d85a]"
                }`}>
                  {log.status === "Processed" && <ShieldCheck size={12} />} {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
