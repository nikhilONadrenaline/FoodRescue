import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FeaturesSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".feature-block");

      sections.forEach((section) => {
        const topBar = section.querySelector(".feature-top-bar");
        const heading = section.querySelector(".feature-heading");
        const content = section.querySelector(".feature-content");
        const listItems = section.querySelectorAll(".feature-list-item");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          topBar,
          { opacity: 0, width: "0%" },
          { opacity: 1, width: "100%", duration: 0.8, ease: "power3.out" }
        )
          .fromTo(
            topBar.querySelectorAll("span"),
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
            "-=0.4"
          )
          .fromTo(
            heading,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            "-=0.4"
          )
          .fromTo(
            content,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            "-=0.6"
          );

        if (listItems.length > 0) {
          tl.fromTo(
            listItems,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
            "-=0.4"
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#18181b] text-white py-32 font-quicksand selection:bg-[#ca8a04] selection:text-black">
      
      {/* SECTION 01: Kitchen Portal */}
      <section className="feature-block max-w-7xl mx-auto px-4 sm:px-8 mb-40">
        <div className="feature-top-bar flex items-center gap-6 border-t border-white/20 pt-6 mb-16">
          <span className="text-xl md:text-2xl font-bold tracking-widest text-[#ca8a04]">01</span>
          <span className="text-xl md:text-2xl font-bold tracking-widest uppercase">Kitchen & Institution Portal</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-7">
            <h2 className="feature-heading text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight mb-8">
              Total control from procurement to plate.
            </h2>
          </div>
          <div className="lg:col-span-5 feature-content flex flex-col justify-center">
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-medium mb-10">
              The main command center for food producers. Forecast demand with AI, scan bills automatically via OCR, and track live inventory levels through IoT sensors. Prevent surplus before it happens.
            </p>
            <div className="flex flex-wrap gap-3">
              {["AI Demand Forecasting", "Bill OCR Extraction", "Smart Storage IoT", "Computer Vision Quality Scoring", "Waste Root-Cause Analytics", "Surplus Prediction"].map((item) => (
                <span key={item} className="feature-list-item px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-bold tracking-wider uppercase">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-[#ca8a04]"></div>
              <span className="text-sm uppercase tracking-widest font-bold text-white/40">Built for Scale</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: NGO Network */}
      <section className="feature-block max-w-7xl mx-auto px-4 sm:px-8 mb-40">
        <div className="feature-top-bar flex items-center gap-6 border-t border-white/20 pt-6 mb-16">
          <span className="text-xl md:text-2xl font-bold tracking-widest text-[#00d0f0]">02</span>
          <span className="text-xl md:text-2xl font-bold tracking-widest uppercase">NGO & Recipient Network</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-7">
            <h2 className="feature-heading text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight mb-8">
              Bridging the gap between surplus and scarcity.
            </h2>
          </div>
          <div className="lg:col-span-5 feature-content flex flex-col justify-center">
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-medium mb-10">
              A live marketplace where verified NGOs receive instant alerts when surplus food matches their capacity and distance. We coordinate pickup, optimize routes, and guarantee safe redistribution.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Live Surplus Marketplace", "Algorithmic Matching", "Route Optimization", "Beneficiary Tracking", "Urgent Food Alerts", "Impact Analytics"].map((item) => (
                <span key={item} className="feature-list-item px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-bold tracking-wider uppercase">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-[#00d0f0]"></div>
              <span className="text-sm uppercase tracking-widest font-bold text-white/40">Community Focused</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: The Ecosystem */}
      <section className="feature-block max-w-7xl mx-auto px-4 sm:px-8">
        <div className="feature-top-bar flex items-center gap-6 border-t border-white/20 pt-6 mb-16">
          <span className="text-xl md:text-2xl font-bold tracking-widest text-white">03</span>
          <span className="text-xl md:text-2xl font-bold tracking-widest uppercase">The Intelligent Ecosystem</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-7">
            <h2 className="feature-heading text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight mb-8">
              An end-to-end food management cycle.
            </h2>
          </div>
          <div className="lg:col-span-5 feature-content flex flex-col justify-center">
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-medium mb-10">
              Bill OCR updates inventory, which trains AI demand models to predict surplus. IoT storage alerts trigger algorithmic matching with nearby NGOs, dispatching optimized logistics to recover value and record ESG impact. It all feeds back into itself.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Environmental Intelligence", "ESG & Sustainability Reporting", "Platform-Wide Admin Monitoring", "Role-Aware Authentication", "Weather-Adjusted Risk Scores"].map((item) => (
                <span key={item} className="feature-list-item px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-bold tracking-wider uppercase">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-white"></div>
              <span className="text-sm uppercase tracking-widest font-bold text-white/40">Data Driven</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
