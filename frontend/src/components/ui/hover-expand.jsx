"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function HoverExpand({
  items,
  collapsedHeight = 110,
  expandedHeight = 450,
  className,
}) {
  const [hoveredIndex, React_useState] = React.useState(null);
  // Alias to avoid renaming issues
  const setHoveredIndex = React_useState;

  return (
    <div className={cn("flex flex-col w-full gap-6 md:gap-8", className)}>
      {items.map((item, i) => {
        const isHovered = hoveredIndex === i;
        const isOtherHovered = hoveredIndex !== null && !isHovered;

        return (
          <motion.div
            key={i}
            className="relative w-full overflow-hidden cursor-default border-4 border-black bg-theme-cream shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            animate={{
              height: isHovered ? expandedHeight : collapsedHeight,
              opacity: isOtherHovered ? 0.7 : 1,
            }}
            transition={{
              height: {
                type: "spring",
                stiffness: 280,
                damping: 32,
                mass: 0.9,
              },
              opacity: { duration: 0.22, ease: "easeOut" },
            }}
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <motion.div
              className="absolute inset-0 w-full h-full bg-[#18181b]"
              initial={false}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 1.06,
              }}
              transition={{
                opacity: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
                scale: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
              }}
            >
              {item.component ? (
                <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
                  <div className="origin-top flex justify-center w-full h-[200%]" style={{ transform: "scale(0.65)" }}>
                    <div className="w-[1200px] mt-10 pointer-events-auto">
                      {item.component}
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={item.image}
                  alt={item.imageAlt ?? ""}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none" />
            </motion.div>

            <div className="absolute inset-0 flex items-center px-6 sm:px-10 pointer-events-none">
              <div className="flex w-full items-center justify-between gap-4 mt-auto mb-6">
                <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                  <motion.span
                    className="text-lg sm:text-2xl font-black font-heading tracking-widest uppercase shrink-0"
                    animate={{
                      color: isHovered ? "#00d0f0" : "#18181b",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>

                  <motion.span
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black font-heading tracking-widest uppercase whitespace-nowrap"
                    animate={{
                      color: isHovered ? "#ffffff" : "#18181b",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>

                  {item.description && (
                    <motion.span
                      className="text-sm lg:text-base text-white/90 font-bold truncate hidden lg:block ml-4 whitespace-nowrap overflow-hidden"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? 0 : -8,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: isHovered ? 0.12 : 0,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                    >
                      — {item.description}
                    </motion.span>
                  )}
                </div>

                {item.sublabel && (
                  <motion.span
                    className="text-xs sm:text-sm font-black tracking-widest uppercase shrink-0 px-4 py-2 border-2 hidden sm:block"
                    animate={{
                      color: isHovered ? "#ffffff" : "#18181b",
                      borderColor: isHovered ? "rgba(255,255,255,0.3)" : "#18181b",
                      backgroundColor: isHovered ? "rgba(255,255,255,0.1)" : "transparent",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.sublabel}
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
