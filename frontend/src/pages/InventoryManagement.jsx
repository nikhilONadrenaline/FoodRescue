import React, { useState } from "react";
import { categorizedInventoryData } from "../data/mockData";
import GlowHover from "../components/smoothui/glow-hover-card";
import ScrollableCardStack from "../components/smoothui/scrollable-card-stack";
import { Package, AlertCircle, CheckCircle2, Leaf, Wheat, Droplets, EggFried, X, Sparkles } from "lucide-react";

export function InventoryManagement() {
  const [inventoryData, setInventoryData] = useState(categorizedInventoryData);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeStackIndex, setActiveStackIndex] = useState(0);
  const [isAddingItem, setIsAddingItem] = useState(false);

  const totalInventoryValue = inventoryData.reduce((total, category) => {
    return total + category.items.reduce((catTotal, item) => {
      if (!item.price) return catTotal;
      const num = parseInt(item.price.replace(/[^\d]/g, ''), 10) || 0;
      return catTotal + num;
    }, 0);
  }, 0);

  const expectedConsumption = Math.round(totalInventoryValue * 0.85);
  const expectedWastage = Math.round(totalInventoryValue * 0.03); 
  const expectedMoneyDistribution = Math.round(totalInventoryValue * 0.12);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Grains & Millets": return <Wheat size={20} />;
      case "Vegetables": return <Leaf size={20} />;
      case "Seeds & Pulses": return <Droplets size={20} />;
      case "Dairy & Meat": return <EggFried size={20} />;
      default: return <Package size={20} />;
    }
  };

  const activeCategoryData = inventoryData.find(c => c.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-[#1f3025] uppercase tracking-wider">Inventory Hub</h1>
        <div className="bg-[#1f3025] border border-white/10 px-4 py-2 rounded-xl text-[10px] font-bold text-white/60 uppercase tracking-widest shadow-inner hidden md:block">
          Total Categories: {inventoryData.length}
        </div>
      </div>
      
      {/* Category Cards (Buttons) with GlowHover only */}
      <GlowHover
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 w-full"
        glowIntensity={0.25}
        items={inventoryData.map((categoryData, idx) => {
          // Dynamic colors: Cyan, Green, Yellow, Pink
          const hues = [190, 130, 45, 330];
          const hue = hues[idx % hues.length];
          
          return {
            id: `category-card-${idx}`,
            theme: { hue, saturation: 100, lightness: 60 },
            element: (
              <button
                key={idx}
                onClick={() => {
                  setActiveCategory(categoryData.category);
                  setActiveStackIndex(0);
                }}
                className="bg-[#1f3025] border border-white/10 rounded-3xl p-8 hover:border-theme-green/50 hover:bg-[#2a3d31] transition-colors group shadow-xl flex flex-col items-center justify-center text-center w-full h-full min-h-[220px]"
              >
                <div className="p-5 bg-[#2a3d31] rounded-2xl shadow-inner border border-white/10 text-[#b9e7aa] transition-transform duration-300 group-hover:scale-110 mb-6">
                  {getCategoryIcon(categoryData.category)}
                </div>
                <div className="flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <h2 className="text-white font-black text-lg uppercase tracking-wider mb-2">{categoryData.category}</h2>
                  <p className="text-white/60 text-[10px] font-bold tracking-widest uppercase">{categoryData.items.length} Items</p>
                </div>
              </button>
            )
          };
        })}
      />

      {/* Active Category Modal */}
      {activeCategory && activeCategoryData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pt-24">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setActiveCategory(null); setIsAddingItem(false); }}></div>
          
          {/* Modal Content */}
          <div className="relative bg-[#1f3025] border border-white/10 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10 shrink-0 bg-[#1f3025] z-10">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-[#2a3d31] rounded-xl shadow-inner border border-white/10 text-[#b9e7aa]">
                   {getCategoryIcon(activeCategoryData.category)}
                 </div>
                 <div>
                   <h2 className="text-white font-black text-xl md:text-2xl uppercase tracking-wider">{activeCategoryData.category}</h2>
                   <p className="text-[#b9e7aa] text-[10px] font-bold tracking-widest uppercase mt-1">{activeCategoryData.items.length} Items Indexed</p>
                 </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4">
                <button 
                  onClick={() => setIsAddingItem(!isAddingItem)} 
                  className={`px-3 md:px-4 py-2 md:py-3 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all ${isAddingItem ? 'bg-[#ff3399] text-white shadow-[0_0_15px_rgba(255,51,153,0.3)] border border-[#ff3399]/50' : 'bg-[#2a3d31] text-white border border-white/10 hover:border-theme-green/50 hover:text-[#b9e7aa]'}`}
                >
                  {isAddingItem ? "Cancel" : "+ Add Item"}
                </button>
                <button onClick={() => { setActiveCategory(null); setIsAddingItem(false); }} className="p-2 md:p-3 bg-[#2a3d31] text-white hover:bg-[#ff3399]/10 hover:text-[#ff3399] hover:border-[#ff3399]/30 rounded-xl transition-all border border-white/10">
                   <X size={20} className="md:w-6 md:h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 min-h-[400px]">
              {/* Left Pane: Scrollable Card Stack */}
              <div className="flex-1 flex items-center justify-center">
                <ScrollableCardStack
                  key={activeCategoryData.category}
                  cardHeight={280}
                  onIndexChange={setActiveStackIndex}
                  items={activeCategoryData.items.map((item) => ({
                    id: item.id,
                    element: (
                      <div className="bg-[#1f3025]/90 backdrop-blur-xl border-4 border-black rounded-3xl flex flex-col items-center justify-center h-full w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden relative group hover:border-[#b9e7aa] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[12px_12px_0px_0px_rgba(185,231,170,0.5)] transition-all duration-300">
                         {/* Glowing accent at top */}
                         <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#b9e7aa] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                         
                         {/* Placeholder Image */}
                         <div className="absolute inset-0 bg-[#1a291f]">
                            <img 
                              src={`https://placehold.co/600x400/18181b/b9e7aa?text=${item.name.replace(/ /g, '+')}`} 
                              alt={item.name} 
                              className="w-full h-full object-cover opacity-10 mix-blend-overlay group-hover:scale-110 transition-transform duration-700" 
                            />
                         </div>
                         <div className="relative z-10 flex flex-col items-center gap-6">
                           <div className="p-5 bg-[#2a3d31]/80 backdrop-blur-md rounded-2xl border border-white/10 text-[#b9e7aa] shadow-xl group-hover:shadow-[0_0_20px_rgba(185,231,170,0.2)] transition-shadow duration-300">
                             {getCategoryIcon(activeCategoryData.category)}
                           </div>
                           <h3 className="text-white font-black text-2xl tracking-wider text-center px-6 leading-tight group-hover:text-[#b9e7aa] transition-colors duration-300">{item.name}</h3>
                         </div>
                      </div>
                    )
                  }))}
                />
              </div>

              {/* Right Pane: Item Information OR Add Item Form */}
              {isAddingItem ? (
                <div className="flex-1 h-[280px] bg-[#2a3d31] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#ff3399]"></div>
                    <h3 className="text-[#ff3399] font-bold text-[10px] tracking-widest uppercase">Add New Item</h3>
                  </div>
                  
                  <form 
                    className="flex-1 flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      const newItem = {
                        id: formData.get('name').toLowerCase().replace(/ /g, '_') + '_' + Date.now(),
                        name: formData.get('name'),
                        stock: formData.get('stock') + ' ' + formData.get('unit'),
                        status: formData.get('status'),
                        supplierName: formData.get('supplierName'),
                        updatedDate: new Date().toISOString().split('T')[0],
                        price: "₹" + formData.get('price'),
                        storageConditions: {
                          temp: "N/A",
                          humidity: "N/A"
                        }
                      };
                      setInventoryData(prev => prev.map(c => {
                        if (c.category === activeCategoryData.category) {
                          return { ...c, items: [...c.items, newItem] };
                        }
                        return c;
                      }));
                      setIsAddingItem(false);
                      setActiveStackIndex(activeCategoryData.items.length); // point to new item
                    }}
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" name="name" required placeholder="Item Name" className="col-span-2 bg-[#1f3025] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-theme-green" />
                      <div className="flex gap-2">
                        <input type="number" name="stock" required placeholder="Qty" className="bg-[#1f3025] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-theme-green flex-1 w-full" />
                        <select name="unit" className="bg-[#1f3025] border border-white/10 rounded-lg px-2 py-2 text-white text-xs focus:outline-none focus:border-theme-green w-16 shrink-0">
                          <option value="kg">kg</option><option value="L">L</option><option value="pcs">pcs</option>
                        </select>
                      </div>
                      <input type="number" name="price" required placeholder="Price (₹)" className="bg-[#1f3025] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-theme-green" />
                      <input type="text" name="supplierName" placeholder="Supplier" className="col-span-2 bg-[#1f3025] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-theme-green" />
                      <select name="status" className="col-span-2 bg-[#1f3025] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-theme-green">
                        <option value="In Stock">In Stock</option><option value="Low Stock">Low Stock</option><option value="Critical">Critical</option>
                      </select>
                    </div>
                    <button type="submit" className="mt-2 bg-[#b9e7aa] text-[#18181b] font-black text-[10px] uppercase tracking-widest py-2 rounded-lg hover:bg-white transition-all shrink-0">
                      Save Item
                    </button>
                  </form>
                </div>
              ) : activeCategoryData.items[activeStackIndex] && (
                <div className="flex-1 h-[280px] bg-[#2a3d31] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col shadow-xl">
                  {(() => {
                    const item = activeCategoryData.items[activeStackIndex];
                    return (
                      <>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#b9e7aa]"></div>
                          <h3 className="text-[#b9e7aa] font-bold text-[9px] tracking-widest uppercase">Item Details</h3>
                        </div>
                        
                        <div className="flex justify-between items-start mb-4">
                          <h2 className="text-white font-black text-2xl tracking-wide leading-tight line-clamp-1 truncate">{item.name}</h2>
                          <div className="text-right shrink-0 ml-4">
                            <span className="text-[#b9e7aa] font-black text-xl">{item.price || "N/A"}</span>
                          </div>
                        </div>
                        
                        <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-4">
                          <div>
                            <span className="text-white/60 text-[9px] font-bold uppercase tracking-widest block mb-1">Stock Quantity</span>
                            <span className="text-3xl font-black text-white">{item.stock}</span>
                          </div>
                          
                          <div>
                            <span className="text-white/60 text-[9px] font-bold uppercase tracking-widest block mb-1">Status</span>
                            {item.status === "Critical" ? (
                              <span className="text-[#ff3399] flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase mt-1.5">
                                <AlertCircle size={14}/> CRITICAL
                              </span>
                            ) : item.status === "Low Stock" ? (
                              <span className="text-[#f1d85a] flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase mt-1.5">
                                <AlertCircle size={14}/> LOW STOCK
                              </span>
                            ) : (
                              <span className="text-[#4caf50] flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase mt-1.5">
                                <CheckCircle2 size={14}/> IN STOCK
                              </span>
                            )}
                          </div>

                          <div>
                            <span className="text-white/60 text-[9px] font-bold uppercase tracking-widest block mb-1">Supplier</span>
                            <span className="text-white text-xs font-semibold truncate block">{item.supplierName || "Unknown"}</span>
                            <span className="text-white/30 text-[8px] uppercase mt-0.5 block">Updated: {item.updatedDate || "N/A"}</span>
                          </div>

                          <div>
                            <span className="text-white/60 text-[9px] font-bold uppercase tracking-widest block mb-1">Storage Conditions</span>
                            <div className="text-white text-xs font-semibold flex flex-col gap-0.5">
                              <span>Temp: {item.storageConditions?.temp || "N/A"}</span>
                              <span>Humidity: {item.storageConditions?.humidity || "N/A"}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Financial & Logistics Overview */}
      <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#1f3025] border border-white/10 p-8 rounded-3xl flex flex-col justify-center shadow-lg group hover:border-theme-green/50 transition-colors">
          <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-2">Total Inventory Value</span>
          <span className="text-3xl md:text-4xl font-black text-[#b9e7aa] tracking-tighter">₹{totalInventoryValue.toLocaleString()}</span>
        </div>
        <div className="bg-[#1f3025] border border-white/10 p-8 rounded-3xl flex flex-col justify-center shadow-lg group hover:border-[#ffc107]/50 transition-colors">
          <span className="text-white/60 flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase mb-2">
            <Sparkles size={12} className="text-[#f1d85a]" /> AI Expected Consumption
          </span>
          <span className="text-3xl md:text-4xl font-black text-[#f1d85a] tracking-tighter">₹{expectedConsumption.toLocaleString()}</span>
        </div>
        <div className="bg-[#1f3025] border border-white/10 p-8 rounded-3xl flex flex-col justify-center shadow-lg group hover:border-[#ff3399]/50 transition-colors">
          <span className="text-white/60 flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase mb-2">
            <Sparkles size={12} className="text-[#ff3399]" /> AI Expected Wastage
          </span>
          <span className="text-3xl md:text-4xl font-black text-[#ff3399] tracking-tighter">₹{expectedWastage.toLocaleString()}</span>
        </div>
        <div className="bg-[#1f3025] border border-white/10 p-8 rounded-3xl flex flex-col justify-center shadow-lg group hover:border-[#4caf50]/50 transition-colors">
          <span className="text-white/60 flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase mb-2">
            <Sparkles size={12} className="text-[#4caf50]" /> AI Expected Money Dist.
          </span>
          <span className="text-3xl md:text-4xl font-black text-[#4caf50] tracking-tighter">₹{expectedMoneyDistribution.toLocaleString()}</span>
        </div>
      </div>

      {/* Supplier Network */}
      <div className="w-full md:w-1/2 mx-auto mt-6 grid grid-cols-1 gap-6 pb-8">
        {/* Supplier Network */}
        <div className="bg-[#1f3025] border border-white/10 p-8 rounded-3xl flex flex-col justify-between shadow-lg group hover:border-theme-green/50 transition-colors">
          <div>
            <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-4 block">Top Supplier Network</span>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center bg-[#2a3d31] p-4 rounded-xl border border-white/10">
                <div className="flex flex-col">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">AgriCorp India</span>
                  <span className="text-white/60 text-[9px] uppercase tracking-widest mt-1">Grains & Produce</span>
                </div>
                <span className="text-[#4caf50] text-[9px] font-black uppercase tracking-widest bg-[#4caf50]/10 px-2 py-1 rounded-md border border-[#4caf50]/20">Verified</span>
              </div>
              <div className="flex justify-between items-center bg-[#2a3d31] p-4 rounded-xl border border-white/10">
                <div className="flex flex-col">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Green Valley Farms</span>
                  <span className="text-white/60 text-[9px] uppercase tracking-widest mt-1">Organic Vegetables</span>
                </div>
                <span className="text-[#4caf50] text-[9px] font-black uppercase tracking-widest bg-[#4caf50]/10 px-2 py-1 rounded-md border border-[#4caf50]/20">Verified</span>
              </div>
            </div>
          </div>
          <button className="mt-6 text-[#b9e7aa] text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors text-left flex items-center gap-2">
            Manage All Suppliers &rarr;
          </button>
        </div>
        </div>
    </div>
  );
}
