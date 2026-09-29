import { cn } from "@/lib/utils"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"

export function BackgroundGrid({ className = "fixed inset-0 z-[-1]", strokeClass = "stroke-theme-ink/10" }) {
  return (
    <div className={cn("flex size-full items-center justify-center overflow-hidden bg-transparent pointer-events-none", className)}>
      <AnimatedGridPattern
        numSquares={40}
        maxOpacity={0.15}
        duration={3}
        repeatDelay={1}
        width={80}
        height={80}
        x={-1}
        y={-1}
        isStatic={true}
        className={cn(
          "[mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_60%,transparent_100%)]",
          "inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-12",
          strokeClass
        )}
      />
    </div>
  )
}
