import React, { useState } from "react";
import { ngoNetworkData, surplusAlertsData, ngoRequestsData } from "../data/mockData";
import { HeartHandshake, AlertCircle, MapPin, Truck, CheckCircle2, Clock, Star, UserPlus, Check, X } from "lucide-react";

export function SurplusManagement() {
  const [isViewingRequests, setIsViewingRequests] = useState(false);
  const [selectedSurplus, setSelectedSurplus] = useState(null);
  const [postedSurplus, setPostedSurplus] = useState({});
  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 pb-12">
      <h1 className="text-2xl font-black text-[#1f3025] uppercase tracking-wider">Surplus & NGO Network</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Col: Surplus Alerts */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#2a3d31] border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-white/60 text-xs font-bold uppercase tracking-widest">Active Surplus Alerts</h2>
              <span className="bg-[#ff3399]/10 text-[#ff3399] px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-2">
                <AlertCircle size={14} /> Action Needed
              </span>
            </div>
            
            <div className="flex flex-col gap-4">
              {surplusAlertsData.map((alert, idx) => (
                <div key={idx} className="bg-[#1f3025] border border-white/10 p-5 rounded-2xl flex flex-col gap-4 hover:border-white/10 transition-colors group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-black text-white uppercase">{alert.item}</h3>
                      <p className="text-white/60 text-xs font-bold tracking-widest uppercase mt-1">{alert.type}</p>
                    </div>
                    <span className="text-[#b9e7aa] font-black text-xl">{alert.quantity}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-[#f1d85a] text-xs font-bold">
                      <Clock size={14} /> Expires in: {alert.expiry}
                    </div>
                    <button 
                      onClick={() => {
                        if (postedSurplus[idx]) {
                          setSelectedSurplus(alert);
                        } else {
                          setPostedSurplus(prev => ({ ...prev, [idx]: true }));
                        }
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors ${
                        postedSurplus[idx] 
                          ? "bg-[#b9e7aa] text-[#1f3025] hover:bg-[#b9e7aa]/90 shadow-[0_0_15px_rgba(185,231,170,0.3)]" 
                          : "bg-[#ff3399] text-[#18181b] hover:bg-[#ff3399]/90 shadow-[0_0_15px_rgba(255,51,153,0.3)]"
                      }`}
                    >
                      {postedSurplus[idx] ? "View" : "Post Surplus"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: NGO Network */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#2a3d31] border border-white/10 rounded-3xl p-8 shadow-2xl h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-white/60 text-xs font-bold uppercase tracking-widest">
                {isViewingRequests ? "Pending NGO Requests" : "NGO Network Matches"}
              </h2>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsViewingRequests(!isViewingRequests)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5 ${isViewingRequests ? "bg-[#ff3399]/10 text-[#ff3399] hover:bg-[#ff3399] hover:text-[#18181b]" : "bg-[#b9e7aa]/10 text-[#b9e7aa] hover:bg-[#b9e7aa] hover:text-[#18181b]"}`}
                >
                  {isViewingRequests ? <><X size={14} /> Close Requests</> : <><UserPlus size={14} /> NGO Requests</>}
                </button>
                <HeartHandshake className="text-[#b9e7aa]" size={24} />
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              {!isViewingRequests ? (
                ngoNetworkData.map((ngo, idx) => (
                  <div key={idx} className="bg-[#1f3025] border border-white/10 p-5 rounded-2xl flex items-center justify-between hover:bg-[#2a3d31] transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#333]/50 rounded-xl">
                        <HeartHandshake size={20} className="text-[#b9e7aa]" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-sm tracking-wide">{ngo.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                            <MapPin size={10} /> {ngo.distance}
                          </span>
                          <span className="text-[#f1d85a] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                            <Star size={10} fill="#f1d85a" /> {ngo.rating}/5
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="p-2 bg-[#b9e7aa]/10 text-[#b9e7aa] rounded-lg hover:bg-[#b9e7aa] hover:text-[#18181b] transition-colors">
                      <Truck size={18} />
                    </button>
                  </div>
                ))
              ) : (
                ngoRequestsData.map((req, idx) => (
                  <div key={idx} className="bg-[#1f3025] border border-[#ff3399]/30 p-5 rounded-2xl flex flex-col gap-4 hover:border-[#ff3399] transition-colors shadow-[0_0_10px_rgba(255,51,153,0.1)]">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#ff3399]/10 rounded-xl">
                          <UserPlus size={20} className="text-[#ff3399]" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-sm tracking-wide">{req.name}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                              <MapPin size={10} /> {req.distance}
                            </span>
                            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                              {req.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold mb-0.5">Partnership</p>
                        <p className="text-[#b9e7aa] font-black text-sm uppercase">Tie-up Request</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 border-t border-white/10 pt-3">
                      <button className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors flex items-center gap-1">
                        <X size={14} /> Reject
                      </button>
                      <button className="px-4 py-2 bg-[#b9e7aa]/10 text-[#b9e7aa] rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#b9e7aa] hover:text-[#18181b] transition-colors flex items-center gap-1">
                        <Check size={14} /> Accept
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
      </div>

      {/* Post Surplus Modal */}
      {selectedSurplus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#1f3025] border border-white/10 rounded-3xl p-8 max-w-2xl w-full shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-wider">Select NGO for Distribution</h2>
                <p className="text-white/60 text-xs font-bold tracking-widest uppercase mt-1">
                  Surplus: <span className="text-[#ff3399]">{selectedSurplus.item}</span> ({selectedSurplus.quantity})
                </p>
              </div>
              <button 
                onClick={() => setSelectedSurplus(null)}
                className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              {ngoNetworkData.map((ngo, idx) => (
                <div key={idx} className="bg-[#2a3d31] border border-white/5 p-4 rounded-2xl flex items-center justify-between hover:border-[#b9e7aa]/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#b9e7aa]/10 rounded-xl">
                      <HeartHandshake size={20} className="text-[#b9e7aa]" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm tracking-wide">{ngo.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                          <MapPin size={10} /> {ngo.distance}
                        </span>
                        <span className="text-[#f1d85a] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                          <Star size={10} fill="#f1d85a" /> {ngo.rating}/5
                        </span>
                        <span className="text-[#b9e7aa]/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 border-l border-white/20 pl-3">
                          Demands: {selectedSurplus.item}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedSurplus(null);
                    }}
                    className="bg-[#b9e7aa] text-[#18181b] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#b9e7aa]/90 transition-colors shadow-[0_0_10px_rgba(185,231,170,0.2)] flex items-center gap-2"
                  >
                    <Truck size={14} /> Send Food
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
