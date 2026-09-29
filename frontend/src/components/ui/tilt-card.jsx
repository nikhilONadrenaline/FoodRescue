"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ClippedCircle } from "@/components/unlumen-ui/clipped-circle";
import { Tilt } from "@/components/unlumen-ui/tilt";

const BADGE_LABEL_CLASSES = {
  success: "bg-emerald-500/15 text-emerald-400 dark:text-emerald-300",
  warning: "bg-amber-500/20 text-amber-400 dark:text-amber-300",
};

export function TiltCard({
  title,
  description,
  price,
  badgeLabel,
  badgeVariant = "success",
  imageSrc,
  imageAlt = "",
  href,
  children,
  tiltProps,
  className,
  ...props
}) {
  const inner = (
    <Tilt
      rotationFactor={11}
      {...tiltProps}
      className={cn(
        "relative group overflow-hidden",
        "bg-[#1c1c1f] border border-white/10 rounded-lg",
        "flex flex-col gap-4",
        "h-48 sm:h-52 md:h-56 w-full",
        "hover:shadow-[0_0_40px_rgba(0,208,240,0.15)] hover:border-white/30 hover:scale-105 transition-all duration-400 ease-out",
        className,
      )}
    >
      <div className="flex flex-row transition-all duration-200 justify-between px-4 sm:px-6 py-4 sm:py-5 z-20">
        <div className="flex flex-col gap-1 flex-1 mr-2 text-white">
          <h2 className="text-xl tracking-tight leading-tight font-bold">
            {title}
          </h2>
          {description && (
            <p className="text-white/60 text-sm mt-1">{description}</p>
          )}
          {children && <div className="mt-2">{children}</div>}
        </div>

        {price && badgeLabel ? (
          <div className="inline-flex h-fit items-center text-sm whitespace-nowrap shrink-0">
            <span className="rounded-l-full bg-white/10 h-fit py-1 px-3 font-medium text-white border border-r-0 border-white/10">
              {price}
            </span>
            <span
              className={cn(
                "rounded-r-full text-sm h-fit py-1 px-3 font-medium border border-l-0 border-white/10",
                BADGE_LABEL_CLASSES[badgeVariant],
              )}
            >
              {badgeLabel}
            </span>
          </div>
        ) : price ? (
          <span className="h-fit rounded-full bg-white/10 px-4 py-1 text-sm font-medium whitespace-nowrap shrink-0 text-white border border-white/10">
            {price}
          </span>
        ) : null}
      </div>

      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt}
          width={288}
          height={224}
          loading="lazy"
          decoding="async"
          className={cn(
            "absolute z-10 top-27 w-72 -right-10",
            "rotate-[-5deg] border-white/10 border rounded-md",
            "transition-transform duration-300 ease-out",
            "group-hover:-rotate-3 group-hover:-translate-y-1 group-hover:-translate-x-0.5",
          )}
        />
      )}

      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-50 transition-opacity duration-300 group-hover:opacity-100">
        <ClippedCircle circleClassName="bg-[#00d0f0]" circleSize={800} />
      </div>
    </Tilt>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block cursor-pointer"
        {...props}
      >
        {inner}
      </a>
    );
  }

  return <div {...props}>{inner}</div>;
}
