import React, { useState } from "react";
import { Recycle, Leaf, Droplet, ArrowRight, CheckCircle2 } from "lucide-react";

export function WasteManagement() {
  const [activeTab, setActiveTab] = useState("compost");

  const compostPhases = [
    {
      phaseTitle: "Phase 1: Segregation & Infrastructure",
      image: "/images/compost/kitchen-collection.jpg",
      imageAlt: "Kitchen waste collection: starting the journey",
      steps: [
        {
          title: "1. Infrastructure & System Selection",
          desc: "Install a high-capacity composting system suited for large daily volumes, such as a multi-bay concrete bin system, aerobic windrows (long outdoor piles), or an automated in-vessel composter. Designate a processing area with a hard, impermeable surface, proper liquid drainage routing, and easy access for heavy maintenance equipment like skid-steers or large wheelbarrows."
        },
        {
          title: "2. Source Segregation & Staff Training",
          desc: "Deploy clearly labeled, color-coded collection bins with tight-fitting lids at all chopping stations, prep tables, and dish return areas. Train kitchen staff to strictly isolate vegetable peelings, fruit cores, coffee grounds, and grain scraps. Enforce a strict ban on fats, cooking oils, liquid dairy, raw meat, and synthetic materials in the collection bins to prevent severe pest infestations and anaerobic rot."
        }
      ]
    },
    {
      phaseTitle: "Phase 2: Construction & Layering",
      image: "/images/compost/subterranean-tank.jpg",
      imageAlt: "Detailed cross-section of subterranean tank",
      steps: [
        {
          title: "3. Securing Bulk Carbon Sources (Browns)",
          desc: "Establish a reliable, bulk supply chain for carbon-rich \"brown\" materials, such as sawdust, untreated wood chips, dry leaves, agricultural straw, or shredded unbleached cardboard. Maintain a strict 3:1 to 4:1 ratio by volume of browns to nitrogen-rich \"greens\" (the kitchen food waste). Mega kitchens produce massive amounts of wet greens, making a heavy stockpile of dry browns critical for balancing moisture and carbon."
        },
        {
          title: "4. Pile Construction & Layering",
          desc: "Construct a 6-inch to 8-inch base layer using coarse wood chips or large twigs to facilitate bottom-up airflow and prevent leachate pooling. Deposit kitchen waste in distinct batches, ensuring every layer of fresh food scraps is immediately capped with a thick layer of browns to suppress odors, trap heat, and deter flies."
        }
      ]
    },
    {
      phaseTitle: "Phase 3: Active Management",
      image: "/images/compost/aeration.jpg",
      imageAlt: "Composting journey: aeration & moisture",
      steps: [
        {
          title: "5. Active Aeration & Turning",
          desc: "Turn the active pile systematically every 3 to 7 days using heavy-duty pitchforks, tractor attachments, or mechanical turners. Ensure the cooler, outer material is folded into the hot core. Install perforated PVC pipes vertically or horizontally within static piles to provide passive airflow if mechanical turning is limited by space or labor."
        },
        {
          title: "6. Temperature & Moisture Management",
          desc: "Insert a 36-inch compost thermometer into the pile's core daily to verify temperatures reach and maintain the thermophilic range of 130°F to 160°F (54°C to 71°C) for at least three consecutive days. This is legally and biologically required to destroy human pathogens and weed seeds. Perform a physical \"squeeze test\" during turning; the material should yield only a few drops of water, akin to a wrung-out sponge. Hydrate with a hose if too dry, or till in dry sawdust if it becomes soggy and smells of ammonia."
        }
      ]
    },
    {
      phaseTitle: "Phase 4: Decomposition & Maturation",
      image: "/images/compost/decomposition-stage.jpg",
      imageAlt: "Focus: decomposition & maturation stage",
      steps: [
        {
          title: "7. Curing & Maturation",
          desc: "Transfer the material to a dedicated, shaded curing bay once the core temperature permanently drops below 105°F (40°C) and the original food items are entirely unrecognizable. Allow the compost to sit undisturbed for 4 to 8 weeks. This curing phase stabilizes the pH, cools the mixture, and allows beneficial fungi and earthworms to establish."
        }
      ]
    },
    {
      phaseTitle: "Phase 5: Harvesting",
      image: "/images/compost/harvesting.jpg",
      imageAlt: "Harvesting & using finished compost",
      steps: [
        {
          title: "8. Screening & Distribution",
          desc: "Pass the cured compost through a motorized trommel screen or a heavy-duty mesh sifter (1/2-inch size) to separate the fine, usable humus from undecomposed twigs, pits, or accidental plastic contaminants. Return the oversized organic chunks to the newest active pile to act as a microbial inoculant. Distribute the finished, dark, earthy-smelling compost to campus grounds, local agricultural partners, or on-site kitchen gardens."
        }
      ]
    }
  ];

  const biofuelPhases = [
    {
      phaseTitle: "Phase 1: Setup & Collection",
      image: "/images/biofuel/journey.jpg",
      imageAlt: "From Kitchen Scraps to Biogas: A Sustainable Journey",
      aspectRatio: "aspect-[16/9]",
      steps: [
        {
          title: "1. System Sizing and Digester Selection",
          desc: "Calculate the daily organic waste output (including vegetable peels, leftover cooked food, and starchy water) to determine the required daily feeding rate and total volumetric capacity of the digester. Install a continuous-feed anaerobic digester system, such as a Continuous Stirred-Tank Reactor (CSTR) or a commercial-scale floating-drum plant, capable of handling the high-volume, fluctuating inputs typical of institutional kitchens."
        },
        {
          title: "2. Source Segregation and Collection",
          desc: "Deploy dedicated, clearly labeled organic waste bins at all bulk prep stations, cooking lines, and dish return areas. Train kitchen staff on rigorous sorting protocols to ensure zero contamination from inorganic materials (plastics, glass, metals), large animal bones, or harsh sanitation chemicals, which will clog the system or kill the methanogenic bacteria."
        }
      ]
    },
    {
      phaseTitle: "Phase 2: Feedstock Preparation",
      image: "/images/biofuel/feedstock.jpg",
      imageAlt: "Detailed Feedstock Preparation in a Dug Well",
      aspectRatio: "aspect-[16/9]",
      steps: [
        {
          title: "3. Feedstock Preparation (Slurry Creation)",
          desc: "Process the collected food scraps through an industrial-grade food waste shredder or macerator to reduce particle size, maximizing the surface area available for microbial breakdown. Transfer the pulverized waste to a pre-mixing tank and combine it with water to create a uniform, pumpable slurry. Use a standard 1:1 ratio by volume, substituting clean water with starch-rich wastewater (from washing rice or lentils) when available to boost gas yield."
        }
      ]
    },
    {
      phaseTitle: "Phase 3: Digestion & Resource Recovery",
      image: "/images/biofuel/digester.jpg",
      imageAlt: "Detailed Inground Anaerobic Digestion Tank",
      aspectRatio: "aspect-[16/9]",
      steps: [
        {
          title: "4. Anaerobic Digestion Phase",
          desc: "Pump the homogeneous slurry into the main, oxygen-deprived digester tank. Maintain the internal environment within the mesophilic temperature range (68°F–113°F / 20°C–45°C) to ensure steady microbial reproduction and waste breakdown. Utilize automated mechanical agitators or recirculation pumps to continuously stir the slurry, preventing the formation of a dense scum layer on top or heavy sludge settling at the bottom."
        },
        {
          title: "5. Biogas Collection and Purification",
          desc: "Collect the rising raw biogas (primarily methane and carbon dioxide) in an expandable gas storage balloon, floating dome, or pressurized secondary tank. Route the raw gas through a specialized scrubbing unit containing iron oxide sponges or water traps to strip out corrosive hydrogen sulfide (H2S) and condense excess moisture, which protects downstream pipes and burners from rusting."
        },
        {
          title: "7. Digestate Management and Resource Recovery",
          desc: "Capture the liquid effluent (digestate) that is automatically displaced from the digester's outlet chamber as fresh slurry is pumped in. Process the digestate through a mechanical screw press or run it into drying beds to separate the solid organic matter from the liquid. Distribute the nitrogen-rich solid output as a premium bio-fertilizer for local agriculture or campus landscaping, and recycle the liquid portion back into the initial mixing tank to reduce fresh water consumption."
        },
        {
          title: "8. Routine Maintenance and Safety Protocols",
          desc: "Monitor the pH of the active slurry daily to ensure it remains neutral (between 6.8 and 7.2). If the tank becomes too acidic (souring), halt the feeding of high-sugar or high-starch waste and buffer the system to prevent a total bacterial die-off. Perform weekly inspections of all gas valves, main lines, and storage vessels using soapy water to detect invisible leaks. Ensure all automatic flare systems and mechanical pressure relief valves are operational to safely vent excess gas during system overloads."
        }
      ]
    },
    {
      phaseTitle: "Phase 4: Gas Utilization",
      image: "/images/biofuel/cooking.jpg",
      imageAlt: "Clean Cooking with Biogas",
      aspectRatio: "aspect-square",
      steps: [
        {
          title: "6. Gas Utilization",
          desc: "Pipe the purified, pressurized biogas directly back into the mega kitchen to fuel specially modified, high-efficiency commercial biogas burners for continuous cooking operations. Alternatively, direct the gas output into a combined heat and power (CHP) unit or a biogas generator to offset the mess hall's electrical load for lighting and refrigeration."
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 pb-12">
      <h1 className="text-2xl font-black text-theme-ink uppercase tracking-wider flex items-center gap-3">
        <Recycle className="text-theme-green" /> Waste Management Strategies
      </h1>
      <p className="text-theme-ink/70 text-sm max-w-3xl leading-relaxed font-bold">
        Transform kitchen waste into valuable resources. Learn about the various techniques and processes 
        to manage biological waste effectively, contributing to a sustainable zero-waste ecosystem.
      </p>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b-2 border-white/10 pb-4">
        <button 
          onClick={() => setActiveTab("compost")}
          className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
            activeTab === "compost" 
              ? "bg-[#4caf50]/20 text-[#4caf50] border border-[#4caf50]/30 shadow-[0_0_15px_rgba(76,175,80,0.2)]" 
              : "bg-[#1f3025] text-white/60 border border-white/5 hover:bg-[#2a3d31]"
          }`}
        >
          <div className="flex items-center gap-2">
            <Leaf size={16} /> Compost Generation
          </div>
        </button>
        <button 
          onClick={() => setActiveTab("biofuel")}
          className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
            activeTab === "biofuel" 
              ? "bg-[#f1d85a]/20 text-[#f1d85a] border border-[#f1d85a]/30 shadow-[0_0_15px_rgba(241,216,90,0.2)]" 
              : "bg-[#1f3025] text-white/60 border border-white/5 hover:bg-[#2a3d31]"
          }`}
        >
          <div className="flex items-center gap-2">
            <Droplet size={16} /> Bio Fuel Generation
          </div>
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-[#1f3025] border border-white/10 rounded-3xl p-8 shadow-2xl mt-4">
        
        {activeTab === "compost" && (
          <div className="flex flex-col gap-10">
            <div className="mb-2">
              <h2 className="text-[#4caf50] text-xl font-black uppercase tracking-widest mb-4">Compost Generation Process</h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-4xl">
                Composting is the natural process of recycling organic matter, such as leaves and food scraps, into a valuable fertilizer that can enrich soil and plants. Follow these standard operating procedures to maintain a highly efficient kitchen composting system.
              </p>
            </div>

            <div className="flex flex-col gap-16">
              {compostPhases.map((phase, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}>
                  
                  <div className="flex-1 flex flex-col gap-6">
                    <h3 className="text-[#4caf50] text-sm font-black uppercase tracking-widest border-b-2 border-[#4caf50]/20 pb-2 mb-2 inline-block self-start">
                      {phase.phaseTitle}
                    </h3>
                    
                    <div className="flex flex-col gap-6">
                      {phase.steps.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-4">
                          <div className="mt-1 bg-[#4caf50]/20 p-2 rounded-full text-[#4caf50] shrink-0">
                            <CheckCircle2 size={24} />
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-lg tracking-wide mb-2">{step.title}</h4>
                            <p className="text-white/70 text-sm leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full lg:w-5/12 shrink-0">
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] bg-black/40 p-2 group">
                      <div className="bg-black rounded-xl overflow-hidden relative aspect-[3/4]">
                        <img 
                          src={phase.image} 
                          alt={phase.imageAlt}
                          className="absolute inset-0 w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-500"
                          onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://placehold.co/600x800/2a3d31/4caf50?text=Compost+Phase";
                          }}
                        />
                      </div>
                      <p className="text-center text-[9px] uppercase font-bold tracking-widest text-white/40 mt-3 mb-1">
                        {phase.imageAlt}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "biofuel" && (
          <div className="flex flex-col gap-6">
             <div className="mb-2">
              <h2 className="text-[#f1d85a] text-xl font-black uppercase tracking-widest mb-4">Bio Fuel Generation Process</h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-4xl">
                Anaerobic digestion and bio-fuel generation turn wet organic waste and cooking oils into renewable energy. This tab outlines the process of capturing biogas and converting oils into biodiesel.
              </p>
            </div>

            {/* Dynamic Bio Fuel Content */}
            <div className="flex flex-col gap-16 mt-6">
              {biofuelPhases.map((phase, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}>
                  
                  <div className="flex-1 flex flex-col gap-6">
                    <h3 className="text-[#f1d85a] text-sm font-black uppercase tracking-widest border-b-2 border-[#f1d85a]/20 pb-2 mb-2 inline-block self-start">
                      {phase.phaseTitle}
                    </h3>
                    
                    <div className="flex flex-col gap-6">
                      {phase.steps.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-4">
                          <div className="mt-1 bg-[#f1d85a]/20 p-2 rounded-full text-[#f1d85a] shrink-0">
                            <CheckCircle2 size={24} />
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-lg tracking-wide mb-2">{step.title}</h4>
                            <p className="text-white/70 text-sm leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full lg:w-5/12 shrink-0">
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] bg-black/40 p-2 group">
                      <div className={`bg-black rounded-xl overflow-hidden relative ${phase.aspectRatio}`}>
                        <img 
                          src={phase.image} 
                          alt={phase.imageAlt}
                          className="absolute inset-0 w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-500"
                          onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://placehold.co/1600x900/2a3d31/f1d85a?text=Biofuel+Phase";
                          }}
                        />
                      </div>
                      <p className="text-center text-[9px] uppercase font-bold tracking-widest text-white/40 mt-3 mb-1">
                        {phase.imageAlt}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
