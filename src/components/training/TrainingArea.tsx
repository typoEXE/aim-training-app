import React, { useState, useCallback } from "react";
import Target from "./Target";
import { cn } from "@/lib/utils";

interface TrainingAreaProps {
  crosshairColor?: string;
  crosshairSize?: number;
  targets?: Array<{ id: string; x: number; y: number; isActive: boolean }>;
  onTargetHit?: (targetId: string) => void;
  onAreaClick?: () => void;
  musicTempo?: number;
}

const TrainingArea = ({
  crosshairColor = "#1DB954",
  crosshairSize = 16,
  targets = [{ id: "1", x: 25, y: 25, isActive: true }],
  onTargetHit = () => {},
  onAreaClick = () => {},
  musicTempo = 120,
}: TrainingAreaProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  const handleAreaClick = useCallback(
    (e: React.MouseEvent) => {
      const targetElement = e.target as HTMLElement;
      if (targetElement.classList.contains("target")) return;
      onAreaClick();
    },
    [onAreaClick],
  );

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden",
        "bg-[#121212] cursor-none",
      )}
      onMouseMove={handleMouseMove}
      onClick={handleAreaClick}
    >
      {/* Crosshair */}
      <div
        className="absolute pointer-events-none z-50"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="absolute"
          style={{
            width: crosshairSize,
            height: 2,
            backgroundColor: crosshairColor,
            left: -crosshairSize / 2,
            top: -1,
          }}
        />
        <div
          className="absolute"
          style={{
            width: 2,
            height: crosshairSize,
            backgroundColor: crosshairColor,
            left: -1,
            top: -crosshairSize / 2,
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${crosshairColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${crosshairColor} 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Targets */}
      {targets.map((target) => (
        <Target
          key={target.id}
          position={{ x: target.x, y: target.y }}
          isActive={target.isActive}
          onHit={() => onTargetHit(target.id)}
          pulseWithMusic={true}
          tempo={musicTempo}
        />
      ))}

      {/* Vignette Effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)",
        }}
      />
    </div>
  );
};

export default TrainingArea;
