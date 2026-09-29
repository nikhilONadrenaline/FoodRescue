"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef } from "react";

import { KitchenDashboard } from "../../pages/KitchenDashboard";
import { InventoryManagement } from "../../pages/InventoryManagement";
import { ExpenditureAnalytics } from "../../pages/ExpenditureAnalytics";
import { SurplusManagement } from "../../pages/SurplusManagement";
import { WasteStorage } from "../../pages/WasteStorage";
import { KineticText } from "../ui/kinetic-text";

const projects = [
  {
    title: "Kitchen Dashboard",
    component: <KitchenDashboard />,
  },
  {
    title: "Inventory Hub",
    component: <InventoryManagement />,
  },
  {
    title: "Expenditure Analytics",
    component: <ExpenditureAnalytics />,
  },
  {
    title: "Surplus Distribution",
    component: <SurplusManagement />,
  },
  {
    title: "Waste Storage",
    component: <WasteStorage />,
  },
];

const StickyCard_001 = ({
  i,
  title,
  component,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);

  // When progress goes from range[0] to range[1], scale goes from 1 to targetScale
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex h-screen w-full items-center justify-center pr-8 md:pr-12"
    >
      <motion.div
        style={{
          scale,
          top: `calc(${i * 20}px)`,
        }}
        className="relative flex aspect-video w-full max-w-[800px] origin-top flex-col overflow-hidden rounded-[2rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,0.5)] border-4 border-black bg-[#1f3025]"
      >
        <div className="h-full w-full bg-[#1f3025] flex items-center justify-center relative overflow-hidden pointer-events-none">
          {component ? (
            <div className="absolute inset-0 w-full h-full flex items-start justify-center">
              {/* Force the component to think it's on a 1280x720 screen, then scale it down (0.55) to fit the smaller right-side container */}
              <div className="origin-top w-[1280px] h-[720px]" style={{ transform: "scale(0.55)" }}>
                <div className="w-full h-full pointer-events-none bg-[#1a291f] pt-4 px-4 overflow-hidden rounded-t-[2rem]">
                  {component}
                </div>
              </div>
              {/* Gradient overlay so the bottom fades to black nicely */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none opacity-70" />
            </div>
          ) : (
            <span className="text-[#b9e7aa] font-black uppercase tracking-widest">{title}</span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Skiper16 = () => {
  const container = useRef(null);
  
  // Track the scroll progress of the entire main container
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      {/* The main container doesn't need huge padding, because the 5 h-screen children will give it 500vh naturally */}
      <main
        ref={container}
        className="relative flex w-full justify-between gap-10 bg-transparent"
      >
        {/* Left Side Text Content */}
        <div className="w-[45%] relative pointer-events-none z-20 pl-4 md:pl-8 lg:pl-12">
          <div className="sticky top-0 h-screen flex flex-col justify-center">
            <div className="w-full max-w-md text-left">
              <div className="text-4xl md:text-5xl font-black text-theme-ink uppercase tracking-widest mb-6 leading-tight flex flex-col gap-2 font-heading" role="heading" aria-level="2">
                <KineticText text="A COMPLETE" className="text-theme-green-deep" />
                <KineticText text="OVERVIEW" className="text-theme-green" />
              </div>
              <div className="text-lg md:text-xl text-theme-muted font-medium leading-relaxed font-sans">
                <KineticText text="Monitor your kitchen's entire workflow from inventory and expenditure to surplus distribution and waste management. Predict, track, and take action all in one place." />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Card Stack */}
        <div className="w-[55%] relative flex flex-col items-center">
          {projects.map((project, i) => {
            // Target scale decreases for older cards so they shrink as new ones stack on top
            const targetScale = Math.max(
              0.85,
              1 - (projects.length - i - 1) * 0.04
            );
            
            // Each card starts scaling down when it becomes sticky, which happens uniformly over the scroll
            return (
              <StickyCard_001
                key={`p_${i}`}
                i={i}
                {...project}
                progress={scrollYProgress}
                range={[i * (1 / projects.length), 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </main>
    </ReactLenis>
  );
};

export { Skiper16, StickyCard_001 };
