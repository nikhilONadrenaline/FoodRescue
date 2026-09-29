import { useRef } from "react";
import gsap from "gsap";
import { Navbar } from "./components/Navbar"
import FadeThrough from "./components/smoothui/fade-through"
import { DropRight } from "./components/smoothui/drop-right"
import { HoverExpand } from "./components/ui/hover-expand"
import { TiltCard } from "./components/ui/tilt-card"
import { Skiper16 } from "./components/smoothui/skiper16"
import { Button } from "./components/ui/button"
import { KineticText } from "./components/ui/kinetic-text"
import { Footer } from "./components/Footer"
import { BackgroundGrid } from "./components/BackgroundGrid"
import { KitchenDashboard } from "./pages/KitchenDashboard"
import { InventoryManagement } from "./pages/InventoryManagement"
import { MassiveTextBlock } from "./components/ui/massive-text-block"
import ScrollRevealParagraph from "./components/smoothui/scroll-reveal-paragraph"
import { TypingAnimation } from "./components/ui/typing-animation"

const hoverItems = [
  {
    label: "Predict Demand",
    sublabel: "AI FORECASTING",
    description: "Analyze historical trends to prevent over-procurement.",
    component: <KitchenDashboard />,
  },
  {
    label: "Track Inventory",
    sublabel: "IOT SENSORS",
    description: "Track food freshness and detect surplus in real-time.",
    component: <InventoryManagement />,
  },
  {
    label: "Smart Routing",
    sublabel: "ALGORITHMIC MATCHING",
    description: "Connect excess supply with verified NGOs instantly.",
    image: "/images/hq_smart_routing.jpg",
  },
  {
    label: "Seamless Logistics",
    sublabel: "REDISTRIBUTION",
    description: "Coordinate rapid pickups through automated alerts.",
    image: "https://images.unsplash.com/photo-1587293852726-0e37bc0570b2?q=80&w=2000&auto=format&fit=crop", // Colorful boxes
  },
  {
    label: "Track Impact",
    sublabel: "ESG ANALYTICS",
    description: "Measure meals saved for sustainability reporting.",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=2000&auto=format&fit=crop", // Playful colorful earth/nature
  }
];

function App() {
  // Refs for the new guitar string effect
  const stringRef = useRef(null);
  const pathRef = useRef(null);

  // --- Guitar String Interactive Handlers ---
  const handleMouseMove = (e) => {
    if (!stringRef.current || !pathRef.current) return;

    const rect = stringRef.current.getBoundingClientRect();
    // Map mouse coordinates to match the SVG's 1000x200 viewBox
    const x = ((e.clientX - rect.left) / rect.width) * 1000;
    const y = ((e.clientY - rect.top) / rect.height) * 200;

    const newPath = `M 10 100 Q ${x} ${y} 990 100`;

    gsap.to(pathRef.current, {
      attr: { d: newPath },
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (!pathRef.current) return;

    const finalPath = "M 10 100 Q 500 100 990 100";

    gsap.to(pathRef.current, {
      attr: { d: finalPath },
      duration: 1.5,
      ease: "elastic.out(1, 0.2)",
    });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-theme-green selection:text-white">
      <Navbar />
      <main className="flex-1 flex flex-col w-full">
        
        {/* HERO SECTION */}
        <section className="w-full bg-theme-green text-white pt-32 pb-32 px-4 relative overflow-hidden">
          <BackgroundGrid className="absolute inset-0 z-0 opacity-70" strokeClass="stroke-black/30" />
          <div className="text-center space-y-10 max-w-4xl mx-auto relative z-10 w-full">
            <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-bold font-serif leading-tight tracking-tight text-white flex flex-col items-center gap-0">
              <span className="block">Prevent waste.</span>
              <span className="block">Feed communities.</span>
              <span className="text-theme-yellow block">
                <FadeThrough phrases={["Faster.", "Smarter.", "At Scale.", "Together."]} />
              </span>
            </h1>
            <ScrollRevealParagraph 
              paragraph="Don't just manage surplus. Predict it. The AI platform connecting kitchens with verified NGOs to end food waste."
              className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed"
            />
            
            <div className="mt-24 w-full max-w-6xl mx-auto text-left">
              <HoverExpand items={hoverItems} />
            </div>
          </div>
        </section>

        {/* SECTION 1: Platform Overview */}
        <section className="w-full bg-theme-sage text-theme-ink relative">
          <BackgroundGrid className="absolute inset-0 z-0 opacity-40" strokeClass="stroke-theme-ink/15" />
          <div className="relative z-10">
            <MassiveTextBlock 
              number="01"
              title="Platform Overview"
              heading="The complete AI + IoT redistribution ecosystem."
              paragraph="We are tackling the massive food waste problem by creating a closed-loop system. Our platform connects kitchens with verified NGOs instantly, using intelligent forecasting to predict demand and smart routing to ensure surplus reaches those who need it."
              features={["AI Prediction", "Smart Inventory", "Surplus Redistribution", "IoT Monitoring", "Sustainability Impact"]}
              accentColor="#39754a"
            />

            <div className="pt-10 mx-auto w-full max-w-7xl pb-20">
              <Skiper16 />
            </div>
          </div>
        </section>

        {/* SECTION 2: Kitchen Portal */}
        <section className="w-full bg-theme-paper text-theme-ink relative overflow-hidden">
          <BackgroundGrid className="absolute inset-0 z-0 opacity-40" strokeClass="stroke-theme-ink/15" />
          <div className="relative z-10">
            <MassiveTextBlock 
              number="02"
              title="Kitchen & Institution Portal"
              heading="Total control from procurement to plate."
              paragraph="The main command center for food producers. Forecast demand with AI, scan bills automatically via OCR, and track live inventory levels through IoT sensors. Prevent surplus before it happens."
              features={["AI Demand Forecasting", "Bill OCR Extraction", "Smart Storage IoT", "Computer Vision Quality Scoring", "Waste Root-Cause Analytics", "Surplus Prediction"]}
              accentColor="#285638"
              align="right"
            />
          </div>
        </section>

        {/* SECTION 3: NGO Network */}
        <section className="w-full bg-theme-sage text-theme-ink pb-10 relative overflow-hidden">
          <BackgroundGrid className="absolute inset-0 z-0 opacity-40" strokeClass="stroke-theme-ink/15" />
          <div className="relative z-10">
            <MassiveTextBlock 
              number="03"
              title="NGO & Recipient Network"
              heading="Bridging the gap between surplus and scarcity."
              paragraph="A live marketplace where verified NGOs receive instant alerts when surplus food matches their capacity and distance. We coordinate pickup, optimize routes, and guarantee safe redistribution."
              features={["Live Surplus Marketplace", "Algorithmic Matching", "Route Optimization", "Beneficiary Tracking", "Urgent Food Alerts", "Impact Analytics"]}
              accentColor="#39754a"
            />
          </div>
        </section>

        {/* ---------- Full CTA Section with String Divider ---------- */}
        <section className="w-full bg-theme-green-dark text-white flex flex-col items-center justify-center pt-24 pb-16 text-center relative overflow-hidden">
          <BackgroundGrid className="absolute inset-0 z-0 opacity-40" strokeClass="stroke-white/20" />
          <div className="relative z-10 w-full flex flex-col items-center justify-center">
            <p className="text-theme-sage font-bold tracking-[0.2em] uppercase text-sm mb-8">
              Ready to take control?
            </p>
            
            <div className="w-full max-w-4xl mx-auto mb-10 border border-white/20 grid grid-cols-3 divide-x divide-white/20 bg-black/10">
              <div className="flex flex-col items-center justify-center py-6 md:py-8 px-4 text-center hover:bg-white/5 transition-colors">
                <KineticText text="UNDERSTAND" className="text-2xl md:text-4xl text-white tracking-tighter mb-2 font-sans" />
                <span className="text-[9px] md:text-[11px] text-theme-sage/60 uppercase tracking-[0.2em] font-bold">The Problem</span>
              </div>
              <div className="flex flex-col items-center justify-center py-6 md:py-8 px-4 text-center hover:bg-white/5 transition-colors">
                <KineticText text="TRACK" className="text-2xl md:text-4xl text-white tracking-tighter mb-2 font-sans" />
                <span className="text-[9px] md:text-[11px] text-theme-sage/60 uppercase tracking-[0.2em] font-bold">The Surplus</span>
              </div>
              <div className="flex flex-col items-center justify-center py-6 md:py-8 px-4 text-center hover:bg-white/5 transition-colors">
                <KineticText text="TAKE CARE" className="text-2xl md:text-4xl text-white tracking-tighter mb-2 font-sans" />
                <span className="text-[9px] md:text-[11px] text-theme-sage/60 uppercase tracking-[0.2em] font-bold">Of Communities</span>
              </div>
            </div>

            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#b9c6ba] to-transparent opacity-70 mb-2"></div>

            {/* ---------- Interactive Guitar String Divider ---------- */}
            <div
              className="lp-string-container lp-cta-item w-full max-w-5xl"
              ref={stringRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <svg
                viewBox="0 0 1000 200"
                preserveAspectRatio="none"
                className="lp-string-svg"
              >
                <path
                  ref={pathRef}
                  d="M 10 100 Q 500 100 990 100"
                  stroke="#b9c6ba" /* Matches reference HTML */
                  strokeWidth="2"
                  fill="transparent"
                />
              </svg>
            </div>

            <ScrollRevealParagraph 
              paragraph="One platform to track your kitchen's surplus, analyze waste, and feed communities."
              className="text-theme-sage/80 text-lg md:text-xl mt-4 mb-10 max-w-2xl mx-auto font-medium"
            />

            <Button className="px-10 py-6 text-lg bg-theme-yellow hover:bg-[#e0c748] text-theme-ink border border-transparent font-bold">
              Create your Free Account &rarr;
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
