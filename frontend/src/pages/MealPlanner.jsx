import React, { useState } from 'react';
import { Calendar, Plus, X, Save } from 'lucide-react';
import { Button } from "../components/ui/button";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

export function MealPlanner() {
  const [plannerData, setPlannerData] = useState(() => {
    const initial = {};
    days.forEach(day => {
      initial[day] = { Breakfast: '', Lunch: '', Dinner: '' };
    });
    // mock data
    initial['Monday']['Breakfast'] = 'Oatmeal & Fruits';
    initial['Monday']['Lunch'] = 'Grilled Chicken Salad';
    initial['Monday']['Dinner'] = 'Vegetable Stir Fry';
    initial['Tuesday']['Lunch'] = 'Lentil Soup';
    return initial;
  });

  const [activeSlot, setActiveSlot] = useState(null); // { day, mealType }
  const [editValue, setEditValue] = useState("");

  const handleSlotClick = (day, mealType) => {
    setActiveSlot({ day, mealType });
    setEditValue(plannerData[day][mealType]);
  };

  const handleSave = () => {
    if (activeSlot) {
      setPlannerData(prev => ({
        ...prev,
        [activeSlot.day]: {
          ...prev[activeSlot.day],
          [activeSlot.mealType]: editValue
        }
      }));
      setActiveSlot(null);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-8 pb-12 px-2 sm:px-6 pt-8 text-theme-ink">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-4 border-black pb-6 gap-4">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-widest flex items-center gap-3">
          <Calendar className="text-theme-green-deep stroke-[3]" size={36} /> Weekly Meal Planner
        </h1>
        <div className="text-sm font-bold uppercase tracking-widest px-4 py-2 bg-theme-yellow border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Plan Your Week
        </div>
      </div>

      {/* Grid */}
      <div className="w-full overflow-x-auto bg-theme-cream border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-4 sm:p-6">
        <div className="min-w-[900px] grid grid-cols-8 gap-4">
          
          {/* Header Row */}
          <div className="p-4 flex items-end justify-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Meals / Days</span>
          </div>
          {days.map(day => (
            <div key={day} className="p-4 text-center bg-theme-green/20 border-b-4 border-theme-green-deep rounded-t-xl">
              <span className="font-black text-theme-green-deep uppercase tracking-widest text-xs">{day}</span>
            </div>
          ))}

          {/* Meal Rows */}
          {mealTypes.map(mealType => (
            <React.Fragment key={mealType}>
              {/* Row Label */}
              <div className="p-4 bg-black/5 rounded-xl flex items-center justify-center border-2 border-black/10">
                <span className="font-black text-theme-ink uppercase tracking-widest text-xs">{mealType}</span>
              </div>
              
              {/* Day Slots for this meal */}
              {days.map(day => (
                <div 
                  key={`${day}-${mealType}`}
                  onClick={() => handleSlotClick(day, mealType)}
                  className="p-4 bg-white border-2 border-black rounded-xl cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group relative min-h-[120px] flex flex-col"
                >
                  {plannerData[day][mealType] ? (
                    <p className="text-sm font-bold text-theme-ink break-words">{plannerData[day][mealType]}</p>
                  ) : (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center h-full text-black/30 font-black text-[10px] uppercase tracking-widest gap-2">
                      <div className="w-8 h-8 rounded-full border-2 border-dashed border-black/30 flex items-center justify-center">
                        <Plus size={16} strokeWidth={3} />
                      </div>
                      Add Meal
                    </div>
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {activeSlot && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-theme-cream border-4 border-black rounded-3xl p-6 md:p-8 max-w-md w-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6 border-b-4 border-black pb-4">
              <div>
                <h3 className="text-2xl font-black text-theme-ink uppercase tracking-widest flex items-center gap-2">
                  Edit {activeSlot.mealType}
                </h3>
                <p className="text-xs text-theme-green-deep uppercase tracking-widest font-black mt-1">{activeSlot.day}</p>
              </div>
              <button onClick={() => setActiveSlot(null)} className="text-theme-ink hover:text-black transition-colors p-2 hover:bg-black/10 rounded-full">
                <X size={24} strokeWidth={3} />
              </button>
            </div>
            
            <textarea
              className="w-full bg-white border-2 border-black rounded-xl p-4 text-theme-ink font-bold focus:outline-none focus:ring-4 focus:ring-theme-green/30 transition-all resize-none mb-6 text-sm"
              rows={4}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder={`What's on the menu for ${activeSlot.mealType.toLowerCase()}?`}
            />
            
            <Button onClick={handleSave} className="w-full bg-theme-green hover:bg-theme-green-deep text-white font-black py-6 rounded-xl flex items-center justify-center gap-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-widest text-xs">
              <Save size={18} strokeWidth={3} /> Save Meal
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
