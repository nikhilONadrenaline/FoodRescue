import { motion, useScroll } from "motion/react";

import { cn } from "@/lib/utils"

export function ScrollProgress({
  className,
  containerRef,
  ref,
  ...props
}) {
  const { scrollYProgress } = useScroll(containerRef ? { container: containerRef } : {})

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-[#00d0f0] via-[#ca8a04] to-[#00d0f0]",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  )
}
