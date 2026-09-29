import React, { useEffect, useRef } from "react";
import ScrollRevealParagraph from "../smoothui/scroll-reveal-paragraph";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MassiveTextBlock({ 
  number, 
  title, 
  heading, 
  paragraph, 
  features, 
  accentColor = "#ca8a04",
  align = "left"
}) {
  const isRight = align === "right";
  const headingRef = useRef(null);

  // ==========================================
  // GSAP SCROLL TRIGGER ANIMATION CODE
  // ==========================================
  useEffect(() => {
    const el = headingRef.current;
    
    let ctx = gsap.context(() => {
      // Using fromTo is much more reliable with ScrollTrigger to prevent invisible elements
      gsap.fromTo(el, 
        {
          x: isRight ? -150 : 150, 
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: el,
            start: "top 85%", // Triggers right as the element enters the bottom of the screen
          },
          x: 0,
          opacity: 1,
          duration: 1.2, 
          ease: "power3.out",
        }
      );
    }, el);

    return () => ctx.revert(); 
  }, [isRight]);
  // ==========================================

  return (
    <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-8 py-20 md:py-32 border-t border-white/5 mt-16 font-quicksand overflow-hidden">
      {/* Top Divider & Title */}
      <div className={`flex items-center gap-6 mb-16 md:mb-24 ${isRight ? "justify-end" : "justify-start"}`}>
        {isRight && <span className="text-sm md:text-base font-bold tracking-widest uppercase text-theme-ink">{title}</span>}
        {isRight && <div className="w-12 h-px bg-white/20"></div>}
        <span className="text-sm md:text-base font-black tracking-widest" style={{ color: accentColor }}>{number}</span>
        {!isRight && <div className="w-12 h-px bg-white/20"></div>}
        {!isRight && <span className="text-sm md:text-base font-bold tracking-widest uppercase text-theme-ink">{title}</span>}
      </div>
      
      {/* Main Content - Distributed Asymmetrically */}
      <div className={`flex flex-col md:flex-row gap-16 md:gap-24 w-full ${isRight ? "md:flex-row-reverse" : ""}`}>
        
        {/* Massive Heading */}
        <div className="w-full md:w-1/2 flex flex-col justify-start py-4">
          <div 
            ref={headingRef}
            className={`font-serif text-3xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-theme-ink mb-8 ${isRight ? "text-right" : "text-left"}`}
          >
            {heading}
          </div>
        </div>

        {/* Paragraph & Tags pushed down */}
        <div className={`w-full md:w-1/2 flex flex-col pt-12 md:pt-32 ${isRight ? "items-start text-left" : "items-end text-right"}`}>
          <ScrollRevealParagraph 
            paragraph={paragraph}
            className="text-base md:text-lg text-theme-muted leading-relaxed font-medium mb-12 max-w-xl"
          />
          
          <div className={`flex flex-wrap gap-3 mb-12 max-w-xl ${isRight ? "justify-start" : "justify-end"}`}>
            {features.map((item, idx) => (
              <span 
                key={idx} 
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] md:text-xs font-bold tracking-wider uppercase text-theme-ink/80"
              >
                {item}
              </span>
            ))}
          </div>
          
          <div className={`flex items-center gap-4 ${isRight ? "mr-auto" : "ml-auto"}`}>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-theme-muted">FoodRescue Platform</span>
          </div>
        </div>
      </div>
    </div>
  );
}
