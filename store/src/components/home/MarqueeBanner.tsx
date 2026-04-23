"use client";

interface MarqueeBannerProps {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}

export function MarqueeBanner({ children, speed = 30, reverse = false, className = "", pauseOnHover = true }: MarqueeBannerProps) {
  const animClass = reverse ? "animate-marquee-reverse" : "animate-marquee";
  const hoverClass = pauseOnHover ? "" : "[&]:hover:![animation-play-state:running]";

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`${animClass} ${hoverClass} flex whitespace-nowrap`}
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        {/* Duplicate content for seamless loop */}
        {children}
        {children}
      </div>
    </div>
  );
}
