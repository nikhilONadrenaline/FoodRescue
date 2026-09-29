import React, { useState } from "react";
import { 
  expenditureData, 
  categorizedInventoryData, 
  donationHistoryData,
  detailedExpenditureStats,
  procurementTrendsData,
  supplierExpenditureData,
  aiExpenditureInsights
} from "../data/mockData";
import { TrendingDown, DollarSign, Activity, Target, Calendar, MapPin, Users, CheckCircle, Clock, Truck, Package, Heart, AlertTriangle, Zap, Info, ArrowUpRight, ArrowDownRight, PieChart, BarChart3, LayoutDashboard, Utensils, Scale, BrainCircuit } from "lucide-react";
import { BarChart } from "../components/charts/bar-chart";
import { Bar } from "../components/charts/bar";
import { BarSquares } from "../components/charts/bar-squares";
import { BarXAxis } from "../components/charts/bar-x-axis";
import { Grid } from "../components/charts/grid";
import { ChartTooltip } from "../components/charts/tooltip";
import { LineChart } from "../components/charts/line-chart";
import { Line } from "../components/charts/line";
import { XAxis } from "../components/charts/x-axis";
import OptionWheel from "../components/ui/OptionWheel";

export function ExpenditureAnalytics() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showCategories, setShowCategories] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const itemChartData = React.useMemo(() => {
    if (!selectedItem) return [];
    const priceVal = parseFloat(selectedItem.price.replace(/[^0-9.-]+/g,"")) || 2000;
    // Base daily expense
    const base = priceVal / 30; 
    
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const startOfWeek = new Date(today.setDate(diff));
    startOfWeek.setHours(0,0,0,0);
    
    const multipliers = [
      [1.1, 1.0], [0.9, 1.05], [1.2, 1.1], [1.0, 0.95],
      [1.3, 1.15], [1.5, 1.2], [1.4, 1.1]
    ];
    
    return multipliers.map((m, i) => {
      const d = new Date(startOfWeek);
      d.setDate(d.getDate() + i);
      return {
        period: d,
        actual: base * m[0],
        predicted: base * m[1]
      };
    });
  }, [selectedItem]);
  
  const maxVal = Math.max(...expenditureData.map(d => d.expenditure));
  const maxTrendVal = Math.max(...procurementTrendsData.map(d => Math.max(d.actual, d.predicted)));
  
  // Calculate real expenditure from inventory management fees (prices)
  const calculateTotalInventoryValue = () => {
    let total = 0;
    categorizedInventoryData.forEach(category => {
      category.items.forEach(item => {
        const priceStr = item.price.replace(/[^0-9.-]+/g,"");
        total += parseFloat(priceStr) || 0;
      });
    });
    return total;
  };
  
  const realExpenditure = calculateTotalInventoryValue();
  const expectedExpenditure = detailedExpenditureStats.budgetTarget;
  const variance = expectedExpenditure - realExpenditure;
  const isOverBudget = variance < 0;

  // Render Tabs
  const renderTabs = () => (
    <div className="flex flex-wrap bg-[#1f3025] border border-white/10 rounded-2xl p-1 mb-8 w-max">
      <button 
        onClick={() => setActiveTab("overview")}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "overview" ? "bg-[#27272a] text-[#b9e7aa] shadow-md" : "text-white/60 hover:text-white hover:bg-[#2a3d31]"}`}
      >
        <LayoutDashboard size={14} /> AI Overview
      </button>
      <button 
        onClick={() => setActiveTab("trends")}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "trends" ? "bg-[#27272a] text-[#f1d85a] shadow-md" : "text-white/60 hover:text-white hover:bg-[#2a3d31]"}`}
      >
        <BarChart3 size={14} /> Procurement Trends
      </button>
      <button 
        onClick={() => setActiveTab("breakdown")}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "breakdown" ? "bg-[#27272a] text-[#ff3399] shadow-md" : "text-white/60 hover:text-white hover:bg-[#2a3d31]"}`}
      >
        <PieChart size={14} /> Breakdowns
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 pb-12 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <h1 className="text-2xl font-black text-[#1f3025] uppercase tracking-wider">Expenditure & Analytics</h1>
        {renderTabs()}
      </div>

      {/* --- TAB: OVERVIEW --- */}
      {activeTab === "overview" && (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          

          {/* Granular Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#1f3025] border border-white/10 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-[#ff3399]/30 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-[#ff3399] group-hover:scale-110 transition-transform"><TrendingDown size={40}/></div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1 font-bold relative z-10">Money Wasted</p>
              <p className="text-2xl font-black text-[#ff3399] relative z-10">₹{detailedExpenditureStats.moneyWasted.toLocaleString()}</p>
            </div>
            <div className="bg-[#1f3025] border border-white/10 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-[#b9e7aa]/30 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-[#b9e7aa] group-hover:scale-110 transition-transform"><Package size={40}/></div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1 font-bold relative z-10">Amount Redistributed</p>
              <p className="text-2xl font-black text-[#b9e7aa] relative z-10">{detailedExpenditureStats.amountRedistributed.toLocaleString()} kg</p>
            </div>
            <div className="bg-[#1f3025] border border-white/10 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-[#f1d85a]/50 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-[#f1d85a] group-hover:scale-110 transition-transform"><DollarSign size={40}/></div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1 font-bold relative z-10">Money Recovered (Redistribution)</p>
              <p className="text-2xl font-black text-[#f1d85a] relative z-10">₹{detailedExpenditureStats.moneyRecovered.toLocaleString()}</p>
            </div>
          </div>

          {/* Budget vs Actual (Expected vs Real Data Section) */}
          <div className="bg-[#1f3025] border border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00d0f0]/5 via-transparent to-[#ff3399]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute top-0 right-0 p-8 opacity-5 text-white/60 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-700"><Target size={120}/></div>
            
            <h2 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-8 relative z-10 flex items-center gap-2">
              <Target size={14} className="text-[#b9e7aa]" /> 
              Budget vs Actual (Inventory Value)
            </h2>
            
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative z-10">
              <div className="flex-1 w-full">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#b9e7aa] mb-1 font-bold">Real Expenditure</p>
                    <p className="text-4xl font-black text-white tracking-tight">₹{realExpenditure.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1 font-bold">Expected Budget</p>
                    <p className="text-2xl font-black text-white/70">₹{expectedExpenditure.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="h-5 w-full bg-[#0a0a0a] rounded-full overflow-hidden relative border border-white/10 p-0.5">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${isOverBudget ? 'bg-gradient-to-r from-[#ff3399]/80 to-[#ff0055]' : 'bg-gradient-to-r from-[#00d0f0]/80 to-[#00f0ff]'}`}
                    style={{ width: `${Math.min((realExpenditure / expectedExpenditure) * 100, 100)}%` }}
                  >
                     <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:20px_20px] opacity-30"></div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-xs font-bold text-white/60">
                  <span>0%</span>
                  <span className={isOverBudget ? 'text-[#ff3399]' : 'text-[#b9e7aa]'}>
                    {((realExpenditure / expectedExpenditure) * 100).toFixed(1)}% of Budget Consumed
                  </span>
                  <span>100%</span>
                </div>
              </div>
              
              <div className="flex-shrink-0 w-full lg:w-auto grid grid-cols-2 gap-4">
                <div className="bg-[#27272a]/40 p-5 rounded-2xl border border-white/5 backdrop-blur-sm shadow-inner group-hover:bg-[#27272a]/60 transition-colors">
                   <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Variance</p>
                   <p className={`text-xl font-black ${!isOverBudget ? 'text-[#4caf50]' : 'text-[#ff3399]'}`}>
                     {!isOverBudget ? '+' : '-'}₹{Math.abs(variance).toLocaleString()}
                   </p>
                </div>
                <div className="bg-[#27272a]/40 p-5 rounded-2xl border border-white/5 backdrop-blur-sm shadow-inner group-hover:bg-[#27272a]/60 transition-colors">
                   <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Status</p>
                   <p className={`text-xl font-black ${!isOverBudget ? 'text-[#b9e7aa]' : 'text-[#ff3399]'}`}>
                     {!isOverBudget ? 'On Track' : 'Over Budget'}
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Feature */}
          <div className="mb-10 mt-6 w-full text-left">
            <button 
              onClick={() => setShowCategories(!showCategories)}
              className="bg-[#2a3d31] border-2 border-[#b9e7aa]/20 text-[#b9e7aa] font-black text-sm uppercase tracking-widest px-12 py-5 rounded-2xl hover:bg-[#b9e7aa]/10 hover:border-[#b9e7aa]/50 transition-all shadow-xl"
            >
              {showCategories ? "Close Categories" : "Explore All Categories"}
            </button>
          </div>
          
          {showCategories && (
            <div className="bg-[#1f3025] border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
              {/* Item List */}
              <div className="w-full md:w-1/3 border-r border-white/10 pr-6 flex flex-col min-h-[300px]">
                 <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">Select an Item</h3>
                 <div className="flex-1 w-full relative overflow-hidden bg-black/20 rounded-2xl border border-white/5 shadow-inner">
                    <OptionWheel
                      items={categorizedInventoryData.flatMap(cat => cat.items).map(item => item.name)}
                      defaultSelected={0}
                      textColor="rgba(255, 255, 255, 0.4)"
                      activeColor="#b9e7aa"
                      side="left"
                      fontSize={1.2}
                      spacing={3.0}
                      curve={0.5}
                      tilt={10}
                      blur={1}
                      fade={0.3}
                      inset={20}
                      loop={false}
                      onChange={(index) => setSelectedItem(categorizedInventoryData.flatMap(cat => cat.items)[index])}
                    />
                 </div>
              </div>
              
              {/* Item Details & Graph */}
              <div className="flex-1 flex flex-col">
                {selectedItem ? (
                  <div className="flex flex-col h-full animate-in fade-in">
                    <h3 className="text-white font-black text-xl mb-1">{selectedItem.name}</h3>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-6">Current Monthly Expense: {selectedItem.price}</p>
                    
                    <div className="flex-1 w-full dark text-white pb-6 h-[250px]">
                       <LineChart data={itemChartData} xDataKey="period" yDomainTween={false}>
                         <Grid horizontal />
                         <Line dataKey="actual" stroke="var(--chart-line-primary)" />
                         <Line dataKey="predicted" stroke="var(--chart-line-secondary)" />
                         <XAxis />
                         <ChartTooltip showCrosshair={true} dotVariant="ring" />
                       </LineChart>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-white/40 text-sm font-bold uppercase tracking-widest border-2 border-dashed border-white/5 rounded-2xl min-h-[250px]">
                    Select an item to view expenses
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-[#1f3025] text-sm font-bold uppercase tracking-widest flex items-center gap-3 mb-2">
                <BrainCircuit size={18} className="text-[#b9e7aa]" /> AI Predictive Insights
              </h2>
            </div>
            
            {aiExpenditureInsights.filter(i => i.type === 'warning').map((insight) => {
              const colors = {
                warning: "text-[#d4af37] bg-[#f1d85a]/25 border-[#ffc107]/50",
                critical: "text-[#e6005c] bg-[#ff3399]/20 border-[#ff3399]/50",
                success: "text-[#388e3c] bg-[#4caf50]/20 border-[#4caf50]/50",
                info: "text-[#5da84f] bg-[#b9e7aa]/30 border-[#4caf50]/50"
              };
              const icons = {
                warning: <AlertTriangle size={24} />,
                critical: <TrendingDown size={24} />,
                success: <CheckCircle size={24} />,
                info: <Info size={24} />
              };
              
              return (
                <div key={insight.id} className={`p-6 rounded-3xl border relative overflow-hidden group transition-all hover:scale-[1.01] ${colors[insight.type]}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      {icons[insight.type]}
                      <h3 className="font-bold text-sm uppercase tracking-widest">{insight.title}</h3>
                    </div>
                  </div>
                  <p className="text-theme-ink/80 text-sm leading-relaxed mb-6 font-medium">{insight.message}</p>
                  <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">{insight.action}</span>
                    <span className="text-xs font-black">{insight.actionValue}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Donation History Section */}
          <div className="bg-[#1f3025] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-[#4caf50]/30 transition-colors mt-2">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4caf50]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <h2 className="text-white/80 text-sm font-bold uppercase tracking-widest flex items-center gap-3 mb-8 relative z-10">
              <Heart size={18} className="text-[#4caf50]" /> Donation & Redistribution History
            </h2>
            
            <div className="overflow-x-auto relative z-10">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-4 px-4 text-[10px] uppercase tracking-widest text-white/60 font-bold whitespace-nowrap">Food Donated</th>
                    <th className="pb-4 px-4 text-[10px] uppercase tracking-widest text-white/60 font-bold whitespace-nowrap">Recipient</th>
                    <th className="pb-4 px-4 text-[10px] uppercase tracking-widest text-white/60 font-bold whitespace-nowrap">Date/Time</th>
                    <th className="pb-4 px-4 text-[10px] uppercase tracking-widest text-white/60 font-bold whitespace-nowrap">Method</th>
                    <th className="pb-4 px-4 text-[10px] uppercase tracking-widest text-white/60 font-bold whitespace-nowrap">Status</th>
                    <th className="pb-4 px-4 text-[10px] uppercase tracking-widest text-white/60 font-bold text-right whitespace-nowrap">Value Recovered</th>
                  </tr>
                </thead>
                <tbody>
                  {donationHistoryData.map((donation) => (
                    <tr key={donation.id} className="border-b border-white/10/50 hover:bg-[#2a3d31] transition-colors group/row">
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-white font-bold text-sm">{donation.foodDonated}</span>
                          <span className="text-[#b9e7aa] text-xs font-black">{donation.quantity}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <MapPin size={12} className="text-[#ff3399]" />
                          <span className="text-white/80 text-sm">{donation.recipient}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar size={12} className="text-white/60" />
                          <span className="text-white/60 text-xs">{donation.dateTime}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {donation.method === "Delivery" ? <Truck size={12} className="text-[#b9e7aa]-deep" /> : <Package size={12} className="text-[#b9e7aa]" />}
                          <span className="text-white/80 text-xs uppercase tracking-wider font-bold">{donation.method}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full w-max text-[10px] font-bold uppercase tracking-widest ${donation.status === "Completed" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"}`}>
                          {donation.status === "Completed" ? <CheckCircle size={10} /> : <Clock size={10} />}
                          {donation.status}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <span className="text-lg font-black text-[#4caf50]">₹{donation.valueRecovered.toLocaleString()}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* --- TAB: TRENDS --- */}
      {activeTab === "trends" && (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weekly Procurement Trends (Bar Chart) */}
            <div className="dark lg:col-span-2 bg-[#1f3025] border border-white/5 rounded-3xl p-8 shadow-2xl flex flex-col group transition-colors text-white">
              <h2 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-12">Weekly Procurement Trends (Actual vs Predicted)</h2>
              <div className="flex-1 w-full mt-4 pb-12">
                <BarChart data={procurementTrendsData} xDataKey="period">
                  <Grid horizontal />
                  <Bar dataKey="actual" fill="var(--chart-line-primary)" lineCap="round" />
                  <Bar dataKey="predicted" fill="var(--chart-line-secondary)" lineCap="round" />
                  <BarXAxis />
                  <ChartTooltip />
                </BarChart>
              </div>
            </div>

            {/* Trends Summary Panel */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#1f3025] border border-white/10 rounded-3xl p-6 shadow-xl flex-1 flex flex-col justify-center relative overflow-hidden group hover:border-[#ffc107]/30 transition-colors">
                <div className="absolute top-0 right-0 p-6 opacity-10 text-[#f1d85a]"><TrendingDown size={80}/></div>
                <h3 className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2 relative z-10">Predicted Future Exp. (Next Mo)</h3>
                <p className="text-4xl font-black text-white relative z-10">₹{detailedExpenditureStats.predictedFutureExpenditure.toLocaleString()}</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#f1d85a]">
                  <ArrowUpRight size={14} /> +1.6% vs This Month
                </div>
              </div>
              <div className="bg-[#1f3025] border border-white/10 rounded-3xl p-6 shadow-xl flex-1 flex flex-col justify-center relative overflow-hidden group hover:border-[#4caf50]/30 transition-colors">
                <div className="absolute top-0 right-0 p-6 opacity-10 text-[#4caf50]"><DollarSign size={80}/></div>
                <h3 className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2 relative z-10">AI Identified Potential Savings</h3>
                <p className="text-4xl font-black text-[#4caf50] relative z-10">₹{detailedExpenditureStats.potentialSavings.toLocaleString()}</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#4caf50]">
                  <ArrowDownRight size={14} /> -5.3% Expense Reduction Possible
                </div>
              </div>
            </div>
          </div>
          
          {/* Historical MoM Chart */}
          <div className="dark bg-[#1f3025] border border-white/5 rounded-3xl p-8 shadow-2xl flex flex-col group transition-colors text-white mt-8">
            <h2 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-12">Historical Month-over-Month Expenditure</h2>
            <div className="flex-1 w-full mt-4 pb-12">
                <LineChart
                  data={expenditureData.map((d, i) => ({ ...d, date: new Date(2026, i, 1) }))}
                  xDataKey="date"
                  aspectRatio="3/1"
                  className="mb-6"
                >
                  <Grid horizontal />
                  <Line 
                    dataKey="expenditure" 
                    stroke="var(--chart-1)"
                  />
                  <Line 
                    dataKey="wasteCost" 
                    stroke="var(--chart-5)" 
                  />
                  <Line 
                    dataKey="savings" 
                    stroke="var(--chart-3)" 
                  />
                  <XAxis />
                  <ChartTooltip showCrosshair={true} dotVariant="ring" dotScale={1.05} />
                </LineChart>
            </div>
          </div>

        </div>
      )}

      {/* --- TAB: BREAKDOWN --- */}
      {activeTab === "breakdown" && (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Supplier Breakdown List */}
            <div className="bg-[#1f3025] border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col h-[600px]">
              <h2 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-8">Supplier-Wise Expenditure (YTD)</h2>
              <div className="flex-1 overflow-y-auto pr-4 space-y-4 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
                {supplierExpenditureData.map((s, idx) => (
                  <div key={idx} className="flex flex-col gap-2 p-5 bg-[#2a3d31] rounded-2xl border border-white/10 hover:bg-[#27272a]/60 transition-colors">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.colorHex, boxShadow: `0 0 10px ${s.colorHex}` }}></div>
                        <span className="font-bold text-sm text-white">{s.supplier}</span>
                      </div>
                      <div className="text-right">
                        <span className="block font-black text-lg" style={{ color: s.colorHex }}>₹{s.amount.toLocaleString()}</span>
                        <span className="text-[10px] uppercase tracking-widest text-white/60">{s.percentage}% of total budget</span>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-[#1f3025] rounded-full overflow-hidden mt-3 shadow-inner">
                      <div className="h-full rounded-full transition-all duration-1000 ease-out relative" style={{ width: `${s.percentage}%`, backgroundColor: s.colorHex }}>
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:10px_10px]"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Food Category Expenditure */}
            <div className="bg-[#1f3025] border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col h-[600px]">
              <h2 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-8">Food-Category Expenditure & Items</h2>
              <div className="flex-1 overflow-y-auto pr-4 space-y-5 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
                {categorizedInventoryData.map((cat, idx) => {
                   const catTotal = cat.items.reduce((sum, item) => sum + (parseFloat(item.price.replace(/[^0-9.-]+/g,"")) || 0), 0);
                   const colors = ["#00d0f0", "#ffc107", "#ff3399", "#4caf50"];
                   const color = colors[idx % colors.length];
                   return (
                     <div key={idx} className="flex flex-col gap-3 p-5 bg-[#2a3d31] rounded-2xl border border-white/10 group hover:border-white/10 transition-colors">
                       <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-2">
                         <span className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: color}}></div>
                           {cat.category}
                         </span>
                         <span className="font-black text-xl" style={{ color: color }}>₹{catTotal.toLocaleString()}</span>
                       </div>
                       
                       <div className="space-y-3">
                         {cat.items.map(item => (
                           <div key={item.id} className="flex justify-between items-center px-2 py-1 hover:bg-[#333]/50 rounded-lg transition-colors">
                             <div className="flex flex-col">
                               <span className="text-xs font-bold text-white/80">{item.name}</span>
                               <span className="text-[9px] text-white/60 uppercase tracking-widest">{item.supplierName}</span>
                             </div>
                             <span className="text-xs font-bold text-white/80 bg-[#1f3025] px-2 py-1 rounded-md border border-white/10">{item.price}</span>
                           </div>
                         ))}
                       </div>
                     </div>
                   );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
