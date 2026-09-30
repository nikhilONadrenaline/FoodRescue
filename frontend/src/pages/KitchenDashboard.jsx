import React, { useState, useEffect } from "react";
import { Package, TrendingUp, AlertTriangle, CheckCircle, Clock, Search, FileText, HandHeart, Thermometer, BrainCircuit, Zap, ArrowRight, Recycle, PackageOpen } from "lucide-react";
import { AnimatedList } from "../../components/animata/animated-list";
import { dashboardInventoryData, aiPredictionData, aiPredictionPerItem } from "../data/mockData";
import { Button } from "../components/ui/button";

function AnimatedCounter({ value, duration = 1500 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = time - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easePercentage = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      setCount(Math.floor(value * easePercentage));

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    if (value > 0) {
      requestAnimationFrame(animate);
    } else {
      setCount(0);
    }
  }, [value, duration]);

  return <span>{count}</span>;
}

function TiltCard({ children, className }) {
  const cardRef = React.useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to the center of the card
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Calculate rotation (-10 to 10 degrees max)
    const rotateY = (mouseX / (width / 2)) * 10;
    const rotateX = -(mouseY / (height / 2)) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{ perspective: "1000px" }}
      className={className}
    >
      <div
        className="w-full h-full transition-transform ease-out will-change-transform"
        style={{
          transitionDuration: isHovered ? "100ms" : "500ms",
          transform: isHovered
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function MultiSegmentDonutChart({ data, size = 240, circleWidth = 24 }) {
  const [active, setActive] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setActive(true), 250);
    return () => clearTimeout(t);
  }, []);

  const radius = size / 2 - circleWidth / 2;
  const circumference = Math.PI * radius * 2;

  let cumulativePercent = 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
        className="drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
      >
        {/* Background track */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          stroke="white"
          strokeWidth={`${circleWidth}px`}
        />

        {data.map((item, index) => {
          const strokeLength = active ? (item.percentage / 100) * circumference : 0;
          const rotationAngle = (cumulativePercent / 100) * 360;
          cumulativePercent += item.percentage;

          return (
            <circle
              key={index}
              r={radius}
              cx={size / 2}
              cy={size / 2}
              fill="transparent"
              stroke={item.colorHex}
              strokeWidth={hoveredItem === item ? `${circleWidth + 4}px` : `${circleWidth}px`}
              strokeDasharray={`${strokeLength} ${circumference}`}
              strokeLinecap="butt"
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                transformOrigin: '50% 50%',
                transform: `rotate(${rotationAngle}deg)`,
                transition: 'stroke-dasharray 1.5s cubic-bezier(0.16, 1, 0.3, 1), stroke-width 0.2s ease, opacity 0.2s ease',
                pointerEvents: 'stroke'
              }}
              className="cursor-pointer hover:opacity-80 outline-none"
            />
          );
        })}
      </svg>

      {/* Inner content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 text-center">
        {hoveredItem ? (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-200">
            <span className="text-4xl font-black" style={{ color: hoveredItem.colorHex }}>{hoveredItem.percentage}%</span>
            <span className="text-[11px] uppercase tracking-widest text-white/80 font-bold mt-1 leading-tight">
              {hoveredItem.name}<br /><span className="text-white/60">{hoveredItem.amount}</span>
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-200">
            <span className="text-5xl font-black text-white">1.2<span className="text-2xl text-white/60">k</span></span>
            <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold mt-2">Total KG</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function KitchenDashboard() {
  const [items, setItems] = useState(dashboardInventoryData);
  const [isDataEntered, setIsDataEntered] = useState(false);
  const initialFormData = aiPredictionPerItem.reduce((acc, item) => {
    acc[item.id] = { preparedFood: '', consumedFood: '', distributedToNGOs: '', waste: '' };
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData);
  const [realtimeData, setRealtimeData] = useState({});
  const [formError, setFormError] = useState("");

  const handleInputChange = (itemId, field, value) => {
    setFormData(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value
      }
    }));
    if (formError) setFormError("");
  };

  const handleSubmitData = () => {
    const newRealtimeData = {};
    let hasError = false;

    aiPredictionPerItem.forEach(item => {
      const data = formData[item.id];
      const prepared = parseInt(data.preparedFood) || 0;
      const consumed = parseInt(data.consumedFood) || 0;
      const ngo = parseInt(data.distributedToNGOs) || 0;
      const waste = parseInt(data.waste) || 0;

      if (consumed > prepared) {
        setFormError(`Consumed food cannot be more than prepared food for ${item.name}.`);
        hasError = true;
      }

      const surplus = prepared - consumed;

      newRealtimeData[item.id] = {
        preparedFood: prepared,
        consumedFood: consumed,
        surplusFood: surplus > 0 ? surplus : 0,
        distributedToNGOs: ngo,
        waste: waste,
      };
    });

    if (hasError) return;

    setRealtimeData(newRealtimeData);
    setIsDataEntered(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const newItems = [...prev];
        const first = newItems.shift(); // Remove the top item
        newItems.push(first); // Add it to the bottom
        return newItems;
      });
    }, 2500); // Rotate every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-12 pb-12 px-6 pt-8">

      {/* Page Header */}
      <div className="w-full text-left">
        <h1 className="text-[#1f3025] text-3xl md:text-4xl font-black uppercase tracking-widest flex items-center">
          TODAYS PLANNING :<span className="animate-pulse ml-1">-</span>
        </h1>
      </div>

      {/* Top Row: Main Dashboard Data */}
      <div className="flex flex-col lg:flex-row justify-center gap-16 lg:gap-32 w-full">

        {/* Left Column: Pie Chart */}
        <div className="w-full lg:w-[450px] shrink-0 flex flex-col gap-6">

          {/* Multi-Segment Pie Chart Card */}
          <TiltCard>
            <div className="bg-[#2a3d31] border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-between relative overflow-hidden shadow-2xl h-[520px] w-full">
              <h2 className="text-white/60 text-xs font-bold uppercase tracking-widest w-full text-left transform-gpu" style={{ transform: "translateZ(30px)" }}>Inventory Composition</h2>

              <div className="transform-gpu" style={{ transform: "translateZ(50px)" }}>
                <MultiSegmentDonutChart data={dashboardInventoryData} />
              </div>

              <div className="grid grid-cols-2 gap-4 w-full text-center transform-gpu" style={{ transform: "translateZ(40px)" }}>
                <div className="bg-[#1f3025] rounded-xl p-4 border border-white/10">
                  <div className="text-white font-black text-xl">1,240 <span className="text-[10px] text-white/60 font-normal">kg</span></div>
                  <div className="text-[9px] uppercase tracking-wider text-white/60 mt-1">Total Food</div>
                </div>
                <div className="bg-[#1f3025] rounded-xl p-4 border border-[#ffc107]/30 shadow-[0_0_10px_rgba(255,193,7,0.1)]">
                  <div className="text-[#f1d85a] font-black text-xl">18 <span className="text-[10px] text-[#f1d85a]/50 font-normal">items</span></div>
                  <div className="text-[9px] uppercase tracking-wider text-[#f1d85a] mt-1">Low Stock</div>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Right Column: Inventory Breakdown List */}
        <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-6">
          {/* Inventory Breakdown Bar Chart */}
          <div className="bg-[#1f3025] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col h-[520px]">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Inventory Breakdown</h2>
              <span className="text-[10px] font-bold text-[#b9e7aa] bg-[#b9e7aa]/10 px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(0,208,240,0.2)]">1,240 kg Total</span>
            </div>

            <div className="flex-1 overflow-hidden">
              <AnimatedList
                className="flex-1 justify-around h-full"
                items={items}
                gap={0}
                maxVisible={6}
                animation="slide"
                renderItem={(item) => (
                  <InventoryBar
                    name={item.name}
                    amount={item.amount}
                    percentage={item.percentage}
                    colorHex={item.colorHex}
                  />
                )}
              />
            </div>
          </div>
        </div>

      </div> {/* End Top Row */}

      {/* Full Width Bottom Row: AI Prediction vs Actual Tracker */}
      <div className="w-full flex flex-col gap-6">
        <h2 className="text-[#1f3025] text-sm font-bold uppercase tracking-widest flex items-center gap-3 mb-2">
          <Zap size={18} className="text-[#b9e7aa]" /> AI Demand Forecast Analysis
        </h2>

        {aiPredictionPerItem.map(item => (
          <div key={item.id} className="bg-[#1f3025] border border-white/10 rounded-2xl p-3 shadow-xl flex flex-col md:flex-row md:items-center relative overflow-hidden gap-4">
            <div className="absolute top-0 right-0 md:right-auto md:left-1/2 p-2 opacity-5 text-[#b9e7aa] transform md:-translate-x-1/2 md:scale-110"><BrainCircuit size={60} /></div>

            {/* Left Side: Stats */}
            <div className="flex-1 relative z-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full shadow-[0_0_5px_rgba(255,255,255,0.2)]" style={{ backgroundColor: item.colorHex }}></div>
                <h3 className="text-white font-black text-sm uppercase tracking-widest">{item.name}</h3>
              </div>

              <div className="flex justify-between items-center mb-1">
                <div>
                  <p className="text-[8px] text-white/60 uppercase tracking-widest font-bold mb-0.5">Prepared Food</p>
                  <p className="text-xl font-black text-white">{item.actualPrepared} <span className="text-[10px] text-white/60">kg</span></p>
                </div>
                <div className="w-px h-6 bg-[#333] mx-2"></div>
                <div className="text-right">
                  <p className="text-[8px] text-[#b9e7aa]/60 uppercase tracking-widest font-bold mb-0.5">AI Predicted Demand</p>
                  <p className="text-xl font-black text-[#b9e7aa]">{item.aiPredicted} <span className="text-[10px] text-[#b9e7aa]/50">kg</span></p>
                </div>
              </div>
            </div>

            {/* Right Side: Funnel/Flow Visualization */}
            <div className="flex-1 relative z-10">
              <div className="bg-[#2a3d31] rounded-xl p-2 border border-white/10 h-full flex flex-col justify-center">
                <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1.5">
                  <span className="text-[8px] text-white/60 uppercase tracking-widest font-bold">Predicted Surplus (Buffer)</span>
                  <span className="text-[#f1d85a] font-black text-sm">{item.predictedSurplus} kg</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* NGO Split */}
                  <div className="flex-1 bg-[#b9e7aa]/10 border border-theme-green/30 rounded-lg p-1.5 flex flex-col justify-center items-center group hover:bg-[#b9e7aa]/20 transition-colors">
                    <PackageOpen size={12} className="text-[#b9e7aa] mb-1" />
                    <span className="text-[7px] uppercase tracking-widest text-[#b9e7aa]/80 font-bold text-center leading-tight">To NGO Network</span>
                    <span className="text-[#b9e7aa] font-black text-sm mt-0.5">{item.remainingFood} <span className="text-[8px]">kg</span></span>
                  </div>

                  <ArrowRight size={12} className="text-[#333] shrink-0" />

                  {/* Waste Split */}
                  <div className="flex-1 bg-[#ff3399]/10 border border-[#ff3399]/30 rounded-lg p-1.5 flex flex-col justify-center items-center group hover:bg-[#ff3399]/20 transition-colors">
                    <Recycle size={12} className="text-[#ff3399] mb-1" />
                    <span className="text-[7px] uppercase tracking-widest text-[#ff3399]/80 font-bold text-center leading-tight">To Waste</span>
                    <span className="text-[#ff3399] font-black text-sm mt-0.5">{item.actualWaste} <span className="text-[8px]">kg</span></span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Realtime Production Data (New Feature) */}
      {/* Realtime Production Data (New Feature) */}
      <div className="w-full relative mt-6 flex justify-center">
        {!isDataEntered ? (
          <div className="bg-[#1f3025] border border-white/10 rounded-3xl p-8 shadow-2xl w-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <FileText size={32} className="text-[#b9e7aa]-deep" />
                <div>
                  <h3 className="text-white font-black text-xl">Enter Production Data</h3>
                  <p className="text-white/60 text-xs tracking-widest uppercase mt-1">End of Day Reporting (Per Item)</p>
                </div>
              </div>
              <Button onClick={handleSubmitData} className="px-8 py-6 font-bold bg-[#b9e7aa] hover:bg-[#a16207] text-[#1f3025] hover:text-white rounded-xl transition-colors">
                Generate Analytics
              </Button>
            </div>

            <div className="flex flex-col gap-6">
              {aiPredictionPerItem.map(item => (
                <div key={item.id} className="bg-[#2a3d31] border border-white/10 rounded-2xl p-6 shadow-md flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex items-center gap-3 lg:w-48 shrink-0">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.colorHex }}></div>
                    <h4 className="text-white font-bold text-lg uppercase tracking-wider">{item.name}</h4>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Prepared (kg)</label>
                      <input
                        type="number"
                        value={formData[item.id].preparedFood}
                        onChange={(e) => handleInputChange(item.id, 'preparedFood', e.target.value)}
                        className="bg-[#1f3025] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#b9e7aa] transition-colors w-full"
                        placeholder="e.g. 150"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Consumed (kg)</label>
                      <input
                        type="number"
                        value={formData[item.id].consumedFood}
                        onChange={(e) => handleInputChange(item.id, 'consumedFood', e.target.value)}
                        className="bg-[#1f3025] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#b9e7aa] transition-colors w-full"
                        placeholder="e.g. 130"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Remaining Surplus (kg)</label>
                      <input
                        type="number"
                        value={formData[item.id].distributedToNGOs}
                        onChange={(e) => handleInputChange(item.id, 'distributedToNGOs', e.target.value)}
                        className="bg-[#1f3025] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#b9e7aa] transition-colors w-full"
                        placeholder="e.g. 15"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Waste (kg)</label>
                      <input
                        type="number"
                        value={formData[item.id].waste}
                        onChange={(e) => handleInputChange(item.id, 'waste', e.target.value)}
                        className="bg-[#1f3025] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#b9e7aa] transition-colors w-full"
                        placeholder="e.g. 5"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {formError && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm font-bold flex items-center gap-2">
                <AlertTriangle size={18} />
                {formError}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full flex flex-col gap-6 animate-in slide-in-from-bottom-8 fade-in duration-1000">
            <h2 className="text-[#1f3025] text-sm font-bold uppercase tracking-widest flex items-center gap-3">
              <Thermometer size={18} className="text-[#b9e7aa]-deep" /> Actual Daily Production Summary
            </h2>

            {aiPredictionPerItem.map(item => {
              const data = realtimeData[item.id];
              if (!data) return null;

              return (
                <div key={item.id} className="w-full bg-[#1f3025] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center relative overflow-hidden gap-8">
                  <div className="absolute top-0 right-0 md:right-auto md:left-1/2 p-4 opacity-5 text-[#b9e7aa]-deep transform md:-translate-x-1/2 md:scale-150">
                    <Thermometer size={120} />
                  </div>

                  {/* Left Side: Realtime Stats */}
                  <div className="flex-1 relative z-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.colorHex }}></div>
                      <h3 className="text-white font-black text-xl uppercase tracking-widest">{item.name}</h3>
                    </div>

                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold mb-2">Prepared Food</p>
                        <p className="text-4xl font-black text-white"><AnimatedCounter value={data.preparedFood} /> <span className="text-sm text-white/60">kg</span></p>
                      </div>
                      <div className="w-px h-12 bg-[#333] mx-4"></div>
                      <div className="text-right">
                        <p className="text-[10px] text-[#b9e7aa]-deep/60 uppercase tracking-widest font-bold mb-2">Consumed Food</p>
                        <p className="text-4xl font-black text-[#b9e7aa]-deep"><AnimatedCounter value={data.consumedFood} /> <span className="text-sm text-[#b9e7aa]-deep/50">kg</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Funnel/Flow Visualization */}
                  <div className="flex-1 relative z-10">
                    <div className="bg-[#2a3d31] rounded-3xl p-5 border border-white/10 h-full flex flex-col justify-center">
                      <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                        <span className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Total Surplus (End of Day)</span>
                        <span className="text-white font-black text-xl"><AnimatedCounter value={data.surplusFood} /> kg</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-[#b9e7aa]-deep/10 border border-theme-green-deep/30 rounded-xl p-4 flex flex-col justify-center items-center group hover:bg-[#b9e7aa]-deep/20 transition-colors">
                          <PackageOpen size={20} className="text-[#b9e7aa]-deep mb-2" />
                          <span className="text-[9px] uppercase tracking-widest text-[#b9e7aa]-deep/80 font-bold text-center leading-tight">Donated</span>
                          <span className="text-[#b9e7aa]-deep font-black text-2xl mt-1"><AnimatedCounter value={data.distributedToNGOs} /> <span className="text-xs">kg</span></span>
                        </div>

                        <ArrowRight size={20} className="text-[#333] shrink-0" />

                        <div className="flex-1 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex flex-col justify-center items-center group hover:bg-red-500/20 transition-colors">
                          <Recycle size={20} className="text-red-500 mb-2" />
                          <span className="text-[9px] uppercase tracking-widest text-red-500/80 font-bold text-center leading-tight">Waste</span>
                          <span className="text-red-500 font-black text-2xl mt-1"><AnimatedCounter value={data.waste} /> <span className="text-xs">kg</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* AI vs Actual Comparison Feature (Appears after data entry) */}
      {isDataEntered && (
        <div className="w-full relative mt-6 animate-in slide-in-from-bottom-8 fade-in duration-1000 flex flex-col gap-6">
          <h2 className="text-[#1f3025] text-sm font-bold uppercase tracking-widest flex items-center gap-3">
            <BrainCircuit size={18} className="text-[#b9e7aa]" /> AI vs Actual Performance Insights (Per Item)
          </h2>

          {aiPredictionPerItem.map(item => {
            const actual = realtimeData[item.id];
            if (!actual) return null;

            const variance = item.aiPredicted - actual.consumedFood;
            const isAccurate = Math.abs(variance) <= (item.aiPredicted * 0.1); // within 10%

            const surplusVar = item.predictedSurplus - actual.surplusFood;
            const isGoodSurplus = surplusVar >= 0 && Math.abs(surplusVar) <= (item.predictedSurplus * 0.2); // within 20%

            let msg = "Model is highly accurate. No immediate action required.";
            if (variance > (item.aiPredicted * 0.1)) msg = `Decrease prep volume by ~${Math.min(10, Math.floor((variance / item.aiPredicted) * 100))}% tomorrow.`;
            if (variance < -(item.aiPredicted * 0.1)) msg = `Increase prep volume by ~${Math.min(10, Math.floor(Math.abs(variance / item.aiPredicted) * 100))}% tomorrow.`;

            return (
              <div key={`insight-${item.id}`} className="bg-[#1f3025] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col relative overflow-hidden gap-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.colorHex }}></div>
                  <h3 className="text-white font-bold text-lg uppercase tracking-widest">{item.name}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Variance Card */}
                  <div className="bg-[#2a3d31] rounded-2xl p-5 border border-white/10">
                    <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-4">Demand Variance</p>
                    <div className="flex items-end gap-4 mb-2">
                      <div className="flex flex-col">
                        <span className="text-xs text-white/60 mb-1">Predicted</span>
                        <span className="text-xl font-black text-white">{item.aiPredicted} <span className="text-xs">kg</span></span>
                      </div>
                      <div className="w-px h-8 bg-[#333]"></div>
                      <div className="flex flex-col">
                        <span className="text-xs text-white/60 mb-1">Consumed</span>
                        <span className="text-xl font-black text-[#b9e7aa]-deep">{actual.consumedFood} <span className="text-xs">kg</span></span>
                      </div>
                    </div>
                    <div className={`mt-3 p-2 rounded-lg border ${isAccurate ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'} flex items-start gap-2`}>
                      {isAccurate ? <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" /> : <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" />}
                      <p className={`text-[10px] font-bold ${isAccurate ? 'text-green-500' : 'text-red-500'}`}>
                        {variance > 0 ? `Over-predicted by ${variance}kg.` : variance < 0 ? `Under-predicted by ${Math.abs(variance)}kg.` : 'Perfect prediction!'}
                      </p>
                    </div>
                  </div>

                  {/* Surplus Accuracy */}
                  <div className="bg-[#2a3d31] rounded-2xl p-5 border border-white/10">
                    <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-4">Surplus Variance</p>
                    <div className="flex items-end gap-4 mb-2">
                      <div className="flex flex-col">
                        <span className="text-xs text-white/60 mb-1">Predicted</span>
                        <span className="text-xl font-black text-white">{item.predictedSurplus} <span className="text-xs">kg</span></span>
                      </div>
                      <div className="w-px h-8 bg-[#333]"></div>
                      <div className="flex flex-col">
                        <span className="text-xs text-white/60 mb-1">Actual</span>
                        <span className="text-xl font-black text-[#b9e7aa]-deep">{actual.surplusFood} <span className="text-xs">kg</span></span>
                      </div>
                    </div>
                    <div className={`mt-3 p-2 rounded-lg border ${isGoodSurplus ? 'bg-green-500/10 border-green-500/30' : 'bg-yellow-500/10 border-yellow-500/30'} flex items-start gap-2`}>
                      {isGoodSurplus ? <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" /> : <AlertTriangle size={14} className="text-yellow-500 mt-0.5 shrink-0" />}
                      <p className={`text-[10px] font-bold ${isGoodSurplus ? 'text-green-500' : 'text-yellow-500'}`}>
                        {surplusVar > 0 ? `${surplusVar}kg less surplus than expected.` : surplusVar < 0 ? `${Math.abs(surplusVar)}kg more surplus than expected.` : 'Matched expected.'}
                      </p>
                    </div>
                  </div>

                  {/* Actionable Insight */}
                  <div className="bg-[#b9e7aa]/10 rounded-2xl p-5 border border-theme-green/30 flex flex-col justify-center relative overflow-hidden group">
                    <BrainCircuit size={80} className="absolute -right-4 -bottom-4 text-[#b9e7aa] opacity-10 transform group-hover:scale-110 transition-transform duration-700" />
                    <p className="text-[10px] uppercase tracking-widest text-[#b9e7aa]/80 font-bold mb-3 relative z-10">Smart Recommendation</p>
                    <p className="text-sm font-bold text-[#b9e7aa] leading-snug relative z-10">
                      {msg}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* AI Decision Center (Actionable Recommendations) */}
      <div className="w-full bg-[#b9e7aa]-dark border border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group mt-6">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)] bg-[length:20px_20px]"></div>
        <div className="absolute top-0 right-0 p-8 opacity-5 text-[#b9e7aa] transform scale-150 translate-x-4 -translate-y-4 transition-transform group-hover:rotate-12 duration-700">
          <BrainCircuit size={160} />
        </div>

        <h2 className="text-[#1f3025] text-sm font-bold uppercase tracking-widest flex items-center gap-3 mb-6 relative z-10">
          <BrainCircuit size={18} className="text-[#b9e7aa]" /> AI Action Center
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {/* Recommendation 1: Production */}
          <div className="bg-[#1f3025]/90 backdrop-blur-md border border-white/10 hover:border-theme-green/50 rounded-2xl p-6 transition-all duration-300 shadow-xl group/card relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00d0f0]/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-[#b9e7aa]/10 flex items-center justify-center text-[#b9e7aa] shrink-0 group-hover/card:scale-110 transition-transform">
                <Zap size={18} />
              </div>
              <h3 className="text-white font-bold text-xs uppercase tracking-widest leading-snug">Production<br />Optimization</h3>
            </div>
            <p className="text-white/60 text-sm mb-6 relative z-10 flex-1 min-h-[60px]">Historical data suggests a 15% drop in demand on Tuesdays. Reduce baseline preparation to avoid excess surplus.</p>
            <Button className="w-full bg-[#b9e7aa]/10 text-[#b9e7aa] hover:bg-[#b9e7aa] hover:text-black border border-theme-green/30 transition-all font-bold text-xs h-10 relative z-10 shrink-0">
              Adjust Today's Prep Plan
            </Button>
          </div>

          {/* Recommendation 2: Inventory */}
          <div className="bg-[#1f3025]/90 backdrop-blur-md border border-white/10 hover:border-[#ff3399]/50 rounded-2xl p-6 transition-all duration-300 shadow-xl group/card relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-b from-[#ff3399]/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-[#ff3399]/10 flex items-center justify-center text-[#ff3399] shrink-0 group-hover/card:scale-110 transition-transform">
                <AlertTriangle size={18} />
              </div>
              <h3 className="text-white font-bold text-xs uppercase tracking-widest leading-snug">Critical Stock<br />Alert</h3>
            </div>
            <p className="text-white/60 text-sm mb-6 relative z-10 flex-1 min-h-[60px]">Finger Millet and Spinach are below critical thresholds. Current inventory will deplete before next scheduled delivery.</p>
            <Button className="w-full bg-[#ff3399]/10 text-[#ff3399] hover:bg-[#ff3399] hover:text-white border border-[#ff3399]/30 transition-all font-bold text-xs h-10 relative z-10 shrink-0">
              Approve Auto-Reorder (₹800)
            </Button>
          </div>

          {/* Recommendation 3: Distribution */}
          <div className="bg-[#1f3025]/90 backdrop-blur-md border border-white/10 hover:border-[#4caf50]/50 rounded-2xl p-6 transition-all duration-300 shadow-xl group/card relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-b from-[#4caf50]/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-[#4caf50]/10 flex items-center justify-center text-[#4caf50] shrink-0 group-hover/card:scale-110 transition-transform">
                <HandHeart size={18} />
              </div>
              <h3 className="text-white font-bold text-xs uppercase tracking-widest leading-snug">Proactive<br />Distribution</h3>
            </div>
            <p className="text-white/60 text-sm mb-6 relative z-10 flex-1 min-h-[60px]">You have an expected surplus of 70kg today. Feeding Hope Center (2.4km) has 'High Capacity' and 'Active Needs'.</p>
            <Button className="w-full bg-[#4caf50]/10 text-[#4caf50] hover:bg-[#4caf50] hover:text-white border border-[#4caf50]/30 transition-all font-bold text-xs h-10 relative z-10 shrink-0">
              Notify Feeding Hope Center
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}

function InventoryBar({ name, amount, percentage, colorHex }) {
  return (
    <div className="flex flex-col gap-2 py-2.5 px-3 bg-[#2a3d31] border border-white/10 hover:border-white/10 rounded-xl hover:bg-[#2a3d31] transition-all cursor-pointer group">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: colorHex, boxShadow: `0 0 8px ${colorHex}` }}
          ></div>
          <div className="flex flex-col justify-center">
            <h3 className="text-white font-bold text-[10px] tracking-wider uppercase leading-none mb-1">{name}</h3>
            <span className="text-white/60 text-[8px] font-bold tracking-widest uppercase leading-none">{amount}</span>
          </div>
        </div>
        <div className="font-black text-xs leading-none" style={{ color: colorHex }}>{percentage}%</div>
      </div>
      <div className="w-full h-1 bg-[#1f3025] rounded-full overflow-hidden border border-white/10">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: colorHex, boxShadow: `0 0 10px ${colorHex}` }}
        />
      </div>
    </div>
  );
}
