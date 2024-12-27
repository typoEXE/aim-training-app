import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TargetProps {
  position?: { x: number; y: number };
  size?: number;
  isActive?: boolean;
  onHit?: () => void;
  pulseWithMusic?: boolean;
  tempo?: number;
}

const Target = ({
  position = { x: 50, y: 50 },
  size = 48,
  isActive = true,
  onHit = () => {},
  pulseWithMusic = true,
  tempo = 120,
}: TargetProps) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (pulseWithMusic && isActive) {
      const interval = (60 / tempo) * 1000; // Convert BPM to milliseconds
      const pulseAnimation = setInterval(() => {
        setScale(1);
        setTimeout(() => setScale(1.2), interval / 4);
      }, interval);

      return () => clearInterval(pulseAnimation);
    }
  }, [pulseWithMusic, tempo, isActive]);

  return (
    <div
      className={cn(
        "absolute rounded-full transition-all target cursor-pointer z-10",
        "bg-[#121212]",
      )}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        border: "2px solid #1DB954",
        boxShadow: "0 0 10px rgba(29, 185, 84, 0.5)",
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? "auto" : "none",
        transition: "all 0.15s ease-out",
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (isActive) {
          onHit();
        }
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(29,185,84,0.2) 0%, rgba(29,185,84,0) 70%)",
        }}
      />
    </div>
  );
};

export default Target;
