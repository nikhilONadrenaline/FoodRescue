import React, { useState } from 'react';
import { Calendar, Plus, X, Save, ChefHat, Sparkles, Trash2 } from 'lucide-react';
import { Button } from "../components/ui/button";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

export function MealPlanner() {
  const [plannerData, setPlannerData] = useState(() => {
    const initial = {};
    days.forEach(day => {
      initial[day] = { Breakfast: [], Lunch: [], Dinner: [] };
    });
    // mock data as arrays
    initial['Monday']['Breakfast'] = [
      { 
          name: 'Oatmeal & Fruits', 
          quantity: '50 servings',
          ingredients: [
              { name: 'Oats', quantity: '5kg' },
              { name: 'Mixed Fruits', quantity: '2kg' }
          ]
      }
    ];
    initial['Monday']['Lunch'] = [
      {
          name: 'Grilled Chicken Salad',
          quantity: '100 servings',
          ingredients: [
              { name: 'Chicken Breast', quantity: '10kg' },
              { name: 'Lettuce', quantity: '5kg' },
              { name: 'Tomatoes', quantity: '2kg' }
          ]
      },
      {
          name: 'Tomato Soup',
          quantity: '50 servings',
          ingredients: [
              { name: 'Tomatoes', quantity: '5kg' },
              { name: 'Cream', quantity: '1L' }
          ]
      }
    ];
    initial['Tuesday']['Lunch'] = [
      {
          name: 'Lentil Soup',
          quantity: '80 servings',
          ingredients: [
              { name: 'Yellow Lentils', quantity: '8kg' },
              { name: 'Onions', quantity: '2kg' },
              { name: 'Spices', quantity: '500g' }
          ]
      }
    ];
    return initial;
  });

  const [activeSlot, setActiveSlot] = useState(null); // { day, mealType }
  const [dishesInSlot, setDishesInSlot] = useState([]); // Temporary state for the modal
  
  // State for a new dish being added in the modal
  const [newDishName, setNewDishName] = useState("");
  const [newDishQuantity, setNewDishQuantity] = useState("");
  const [newDishIngredients, setNewDishIngredients] = useState([]);
  const [tempIngName, setTempIngName] = useState("");
  const [tempIngQty, setTempIngQty] = useState("");

  const [generateType, setGenerateType] = useState('preset');
  const [selectedPresetDay, setSelectedPresetDay] = useState('Monday');
  const [selectedPresetMeal, setSelectedPresetMeal] = useState('Breakfast');
  const [customDishName, setCustomDishName] = useState("");
  const [customQuantity, setCustomQuantity] = useState("");
  const [customIngredients, setCustomIngredients] = useState([]);
  const [customIngName, setCustomIngName] = useState("");
  const [customIngQty, setCustomIngQty] = useState("");

  const handleSlotClick = (day, mealType) => {
    setActiveSlot({ day, mealType });
    const existing = plannerData[day][mealType] || [];
    setDishesInSlot(JSON.parse(JSON.stringify(existing))); // Deep copy
    // Reset new dish form
    setNewDishName("");
    setNewDishQuantity("");
    setNewDishIngredients([]);
    setTempIngName("");
    setTempIngQty("");
  };

  const handleSaveSlot = () => {
    if (activeSlot) {
      setPlannerData(prev => ({
        ...prev,
        [activeSlot.day]: {
          ...prev[activeSlot.day],
          [activeSlot.mealType]: dishesInSlot
        }
      }));
      setActiveSlot(null);
    }
  };

  const addIngredientToNewDish = () => {
    if(tempIngName.trim() && tempIngQty.trim()) {
        setNewDishIngredients([...newDishIngredients, { name: tempIngName.trim(), quantity: tempIngQty.trim() }]);
        setTempIngName("");
        setTempIngQty("");
    }
  };

  const removeIngredientFromNewDish = (idx) => {
    setNewDishIngredients(newDishIngredients.filter((_, i) => i !== idx));
  };

  const addNewDishToSlot = () => {
    if(newDishName.trim()) {
      setDishesInSlot([...dishesInSlot, {
        name: newDishName,
        quantity: newDishQuantity,
        ingredients: newDishIngredients
      }]);
      setNewDishName("");
      setNewDishQuantity("");
      setNewDishIngredients([]);
    }
  };

  const removeDishFromSlot = (idx) => {
    setDishesInSlot(dishesInSlot.filter((_, i) => i !== idx));
  };

  const addCustomIngredient = () => {
    if(customIngName.trim() && customIngQty.trim()) {
        setCustomIngredients([...customIngredients, { name: customIngName.trim(), quantity: customIngQty.trim() }]);
        setCustomIngName("");
        setCustomIngQty("");
    }
  };

  const removeCustomIngredient = (idx) => {
    setCustomIngredients(customIngredients.filter((_, i) => i !== idx));
  };

  const generateMeal = () => {
      let mealToSave = [];
      if (generateType === 'preset') {
          mealToSave = plannerData[selectedPresetDay][selectedPresetMeal] || [];
      } else {
          if (customDishName.trim()) {
              mealToSave = [{
                  name: customDishName,
                  quantity: customQuantity,
                  ingredients: customIngredients
              }];
          }
      }
      
      if (mealToSave.length > 0) {
          localStorage.setItem('todaysPlanning', JSON.stringify(mealToSave));
          window.dispatchEvent(new Event('storage'));
          alert("Meal generated and set as today's planning!");
      } else {
          alert("Please select a valid preset meal or fill in the custom dish details.");
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
        <div className="min-w-[1000px] grid grid-cols-8 gap-4">
          
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
              {days.map(day => {
                const meals = plannerData[day][mealType];
                return (
                <div 
                  key={`${day}-${mealType}`}
                  onClick={() => handleSlotClick(day, mealType)}
                  className="p-4 bg-white border-2 border-black rounded-xl cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group relative min-h-[160px] flex flex-col gap-3"
                >
                  {meals && meals.length > 0 ? (
                    meals.map((meal, idx) => (
                      <div key={idx} className="flex flex-col border-b-2 border-black/10 pb-2 last:border-0 last:pb-0">
                          <p className="text-sm font-black text-theme-ink break-words uppercase">{meal.name}</p>
                          <p className="text-[10px] font-bold text-black/50 mb-1.5">{meal.quantity}</p>
                          <div className="flex flex-col gap-1 mt-auto">
                              {meal.ingredients && meal.ingredients.slice(0,2).map((ing, i) => (
                                  <span key={i} className="text-[9px] font-bold bg-theme-green/10 text-theme-green-deep px-1.5 py-0.5 rounded border border-theme-green/30 truncate">
                                      {ing.quantity} {ing.name}
                                  </span>
                              ))}
                              {meal.ingredients && meal.ingredients.length > 2 && (
                                  <span className="text-[9px] font-bold text-black/40 italic">+{meal.ingredients.length - 2} more</span>
                              )}
                          </div>
                      </div>
                    ))
                  ) : (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center h-full text-black/30 font-black text-[10px] uppercase tracking-widest gap-2">
                      <div className="w-8 h-8 rounded-full border-2 border-dashed border-black/30 flex items-center justify-center">
                        <Plus size={16} strokeWidth={3} />
                      </div>
                      Add Meal
                    </div>
                  )}
                </div>
              )})}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Generate Upcoming Meal Section */}
      <div className="w-full bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 md:p-8 mt-4">
          <div className="flex items-center gap-3 mb-6 border-b-4 border-black pb-4">
              <Sparkles className="text-theme-yellow stroke-[3]" size={32} />
              <h2 className="text-2xl font-black uppercase tracking-widest text-theme-ink">Generate Upcoming Meal</h2>
          </div>
          
          <div className="flex gap-4 mb-6">
              <button 
                  className={`px-6 py-3 font-black uppercase tracking-widest text-xs border-2 border-black rounded-xl transition-all ${generateType === 'preset' ? 'bg-theme-green text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1' : 'bg-white text-theme-ink hover:bg-gray-100'}`}
                  onClick={() => setGenerateType('preset')}
              >
                  Choose Preset Meal
              </button>
              <button 
                  className={`px-6 py-3 font-black uppercase tracking-widest text-xs border-2 border-black rounded-xl transition-all ${generateType === 'custom' ? 'bg-theme-yellow text-theme-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1' : 'bg-white text-theme-ink hover:bg-gray-100'}`}
                  onClick={() => setGenerateType('custom')}
              >
                  Custom Make
              </button>
          </div>

          <div className="bg-theme-cream border-2 border-black rounded-xl p-6">
              {generateType === 'preset' ? (
                  <div className="flex flex-col md:flex-row gap-6 items-end">
                      <div className="flex flex-col gap-2 w-full md:w-1/3">
                          <label className="text-xs font-black uppercase tracking-widest">Select Day</label>
                          <select className="p-3 border-2 border-black rounded-xl font-bold bg-white focus:outline-none focus:ring-4 focus:ring-theme-green/30" value={selectedPresetDay} onChange={e => setSelectedPresetDay(e.target.value)}>
                              {days.map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                      </div>
                      <div className="flex flex-col gap-2 w-full md:w-1/3">
                          <label className="text-xs font-black uppercase tracking-widest">Select Meal Slot</label>
                          <select className="p-3 border-2 border-black rounded-xl font-bold bg-white focus:outline-none focus:ring-4 focus:ring-theme-green/30" value={selectedPresetMeal} onChange={e => setSelectedPresetMeal(e.target.value)}>
                              {mealTypes.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                      </div>
                      <div className="w-full md:w-1/3">
                          <Button onClick={generateMeal} className="w-full bg-black text-white hover:bg-gray-800 font-black py-6 rounded-xl flex items-center justify-center gap-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-widest text-xs">
                              <ChefHat size={18} /> Push to Dashboard
                          </Button>
                      </div>
                  </div>
              ) : (
                  <div className="flex flex-col gap-6">
                      <div className="flex flex-col md:flex-row gap-4">
                          <input type="text" placeholder="Dish Name (e.g. Pasta)" value={customDishName} onChange={e => setCustomDishName(e.target.value)} className="flex-1 p-3 border-2 border-black rounded-xl font-bold bg-white focus:outline-none focus:ring-4 focus:ring-theme-yellow/30" />
                          <input type="text" placeholder="Quantity (e.g. 100 servings)" value={customQuantity} onChange={e => setCustomQuantity(e.target.value)} className="w-full md:w-1/3 p-3 border-2 border-black rounded-xl font-bold bg-white focus:outline-none focus:ring-4 focus:ring-theme-yellow/30" />
                      </div>
                      
                      <div className="bg-white border-2 border-dashed border-black/30 rounded-xl p-4">
                          <label className="text-xs font-black uppercase tracking-widest mb-3 block text-black/50">Raw Materials</label>
                          <div className="flex gap-2 mb-4">
                              <input type="text" placeholder="Material Name" value={customIngName} onChange={e => setCustomIngName(e.target.value)} className="flex-1 p-2 text-sm border-2 border-black rounded-lg font-bold bg-gray-50 focus:outline-none" />
                              <input type="text" placeholder="Qty (e.g. 5kg)" value={customIngQty} onChange={e => setCustomIngQty(e.target.value)} className="w-24 md:w-32 p-2 text-sm border-2 border-black rounded-lg font-bold bg-gray-50 focus:outline-none" />
                              <button onClick={addCustomIngredient} className="bg-theme-yellow text-theme-ink font-black px-4 rounded-lg border-2 border-black uppercase text-xs hover:bg-[#e0c441] transition-colors">Add</button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                              {customIngredients.length === 0 && <span className="text-xs text-gray-500 font-bold italic">No materials added.</span>}
                              {customIngredients.map((ing, idx) => (
                                  <span key={idx} className="bg-theme-yellow/20 text-theme-ink border border-theme-yellow px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                                      {ing.quantity} {ing.name}
                                      <button onClick={() => removeCustomIngredient(idx)} className="hover:text-red-500 ml-1"><X size={12} strokeWidth={3} /></button>
                                  </span>
                              ))}
                          </div>
                      </div>
                      <Button onClick={generateMeal} className="w-full bg-black text-white hover:bg-gray-800 font-black py-6 rounded-xl flex items-center justify-center gap-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-widest text-xs">
                          <ChefHat size={18} /> Push to Dashboard
                      </Button>
                  </div>
              )}
          </div>
      </div>

      {/* Edit Slot Modal */}
      {activeSlot && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-theme-cream border-4 border-black rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6 border-b-4 border-black pb-4 sticky top-0 bg-theme-cream z-10 pt-2">
              <div>
                <h3 className="text-2xl font-black text-theme-ink uppercase tracking-widest flex items-center gap-2">
                  Edit {activeSlot.mealType}
                </h3>
                <p className="text-xs text-theme-green-deep uppercase tracking-widest font-black mt-1">{activeSlot.day}</p>
              </div>
              <button 
                onClick={() => setActiveSlot(null)} 
                className="text-theme-ink hover:text-black transition-colors p-2 hover:bg-black/10 rounded-full"
              >
                <X size={24} strokeWidth={3} />
              </button>
            </div>

            {/* List of Existing Dishes in this Slot */}
            <div className="mb-8">
              <h4 className="text-xs font-black uppercase tracking-widest text-black/50 mb-3">Planned Dishes</h4>
              {dishesInSlot.length === 0 ? (
                <p className="text-sm font-bold text-black/40 italic">No dishes planned for this slot.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {dishesInSlot.map((dish, idx) => (
                    <div key={idx} className="bg-white border-2 border-black rounded-xl p-4 relative group">
                      <button 
                        onClick={() => removeDishFromSlot(idx)} 
                        className="absolute top-4 right-4 text-black/30 hover:text-red-500 transition-colors"
                        title="Remove Dish"
                      >
                        <Trash2 size={18} />
                      </button>
                      <h5 className="text-lg font-black uppercase tracking-widest pr-8">{dish.name}</h5>
                      <p className="text-xs font-bold text-black/60 mb-3">{dish.quantity}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {dish.ingredients.map((ing, i) => (
                          <span key={i} className="text-[10px] font-bold bg-theme-green/10 text-theme-green-deep border border-theme-green px-2 py-1 rounded-md">
                            {ing.quantity} {ing.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Form to add a new dish to this slot */}
            <div className="bg-black/5 border-2 border-dashed border-black/30 rounded-xl p-5 mb-8">
                <h4 className="text-xs font-black uppercase tracking-widest text-black/70 mb-4">+ Add New Dish to Slot</h4>
                <div className="flex flex-col gap-4 mb-4">
                    <input
                      className="w-full bg-white border-2 border-black rounded-xl p-3 text-theme-ink font-bold focus:outline-none focus:ring-4 focus:ring-theme-green/30 transition-all text-sm"
                      type="text"
                      value={newDishName}
                      onChange={(e) => setNewDishName(e.target.value)}
                      placeholder="Cooked Dish Name (e.g. Lentil Soup)"
                    />
                    <input
                      className="w-full bg-white border-2 border-black rounded-xl p-3 text-theme-ink font-bold focus:outline-none focus:ring-4 focus:ring-theme-green/30 transition-all text-sm"
                      type="text"
                      value={newDishQuantity}
                      onChange={(e) => setNewDishQuantity(e.target.value)}
                      placeholder="Total Quantity (e.g. 100 servings)"
                    />
                </div>
                
                <div className="bg-white border-2 border-black/20 rounded-xl p-4">
                  <label className="text-[10px] font-black uppercase tracking-widest mb-3 block text-black/50">Required Raw Materials</label>
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={tempIngName}
                      onChange={(e) => setTempIngName(e.target.value)}
                      placeholder="Material"
                      className="flex-1 bg-gray-100 border-2 border-black rounded-lg px-2 py-2 text-sm font-bold focus:outline-none focus:border-theme-green"
                    />
                    <input
                      type="text"
                      value={tempIngQty}
                      onChange={(e) => setTempIngQty(e.target.value)}
                      placeholder="Qty"
                      className="w-20 bg-gray-100 border-2 border-black rounded-lg px-2 py-2 text-sm font-bold focus:outline-none focus:border-theme-green"
                    />
                    <button 
                      onClick={addIngredientToNewDish}
                      className="bg-black text-white px-3 py-2 rounded-lg font-bold uppercase text-xs hover:bg-gray-800 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newDishIngredients.length === 0 && <span className="text-xs text-gray-500 font-medium italic">No raw materials specified.</span>}
                    {newDishIngredients.map((ing, idx) => (
                      <span key={idx} className="bg-theme-green/20 text-theme-green-deep border border-theme-green px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                        {ing.quantity} {ing.name}
                        <button onClick={() => removeIngredientFromNewDish(idx)} className="hover:text-black ml-1">
                          <X size={12} strokeWidth={3} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <Button onClick={addNewDishToSlot} className="w-full mt-4 bg-theme-yellow text-theme-ink hover:bg-[#e0c441] font-black py-4 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-widest text-xs">
                  + Add Dish to {activeSlot.mealType}
                </Button>
            </div>
            
            <Button onClick={handleSaveSlot} className="w-full bg-theme-green hover:bg-theme-green-deep text-white font-black py-6 rounded-xl flex items-center justify-center gap-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-widest text-xs sticky bottom-0">
              <Save size={18} strokeWidth={3} /> Save Slot
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

