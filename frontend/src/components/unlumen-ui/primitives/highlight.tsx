import * as React from "react";
import { cn } from "@/lib/utils";

// This is a minimal placeholder for the Unlumen Highlight primitives
// Since the full Highlight code wasn't provided, this ensures the navbar renders correctly.

export function Highlight({ children, className, containerClassName, style, ...props }: any) {
  return (
    <div className={cn(containerClassName)} style={style}>
      <div className={cn(className)} {...props}>
        {children}
      </div>
    </div>
  );
}

export const HighlightItem = React.forwardRef<any, any>(({ asChild, children, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { ref, ...props } as any);
  }
  return <div ref={ref} {...props}>{children}</div>;
});
HighlightItem.displayName = "HighlightItem";
