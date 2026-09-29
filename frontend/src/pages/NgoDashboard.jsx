import React from "react";
import { Link } from "react-router-dom";
import { Users, Handshake, ArrowRight } from "lucide-react";

export function NgoDashboard() {
  const tieUps = 12;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-theme-ink uppercase tracking-widest">NGO Dashboard</h1>
          <p className="text-theme-ink/70 font-medium text-sm mt-1">Overview of your connections and surplus food.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-theme-cream border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-sm font-black text-theme-ink/70 uppercase tracking-widest mb-1">Active Tie-Ups</p>
              <h3 className="text-5xl font-black text-theme-ink mb-2">{tieUps}</h3>
              <p className="text-xs font-bold text-theme-green flex items-center gap-1">
                Food Suppliers Connected
              </p>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center bg-theme-yellow shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Handshake className="text-theme-ink" size={24} strokeWidth={2.5} />
            </div>
          </div>
        </div>
        
        <div className="bg-theme-green border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-black text-theme-ink mb-4">Find More Suppliers</h3>
            <Link to="/ngo/suppliers">
                <button className="flex items-center gap-2 bg-theme-yellow border-2 border-black px-6 py-3 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                    Fetch Nearby <ArrowRight size={18} />
                </button>
            </Link>
        </div>
      </div>
    </div>
  );
}
