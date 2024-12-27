import React, { useState, useCallback } from "react";
import Sidebar from "./training/Sidebar";
import TrainingArea from "./training/TrainingArea";
import PerformanceMetrics from "./training/PerformanceMetrics";

interface HomeProps {
  initialMode?: string;
  initialSettings?: any;
}

const Home = ({
  initialMode = "precision",
  initialSettings = {
    targetSize: 50,
    showMetrics: true,
    crosshairSize: 20,
    dynamicCrosshair: true,
    musicVolume: 75,
    syncToMusic: true,
  },
}: HomeProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentMode, setCurrentMode] = useState(initialMode);
  const [settings, setSettings] = useState(initialSettings);
  const [gameStats, setGameStats] = useState({
    hits: 0,
    misses: 0,
    totalShots: 0,
    accuracy: 0,
    speed: 0,
    precision: 0,
  });

  const [targets, setTargets] = useState([
    { id: "1", x: 25, y: 25, isActive: true, spawnTime: Date.now() },
  ]);

  const spawnTarget = useCallback(() => {
    const newTarget = {
      id: Math.random().toString(),
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      isActive: true,
      spawnTime: Date.now(),
    };
    setTargets([newTarget]);
  }, []);

  const handleTargetHit = useCallback(
    (targetId: string) => {
      const target = targets.find((t) => t.id === targetId);
      if (!target) return;

      const reactionTime = Date.now() - target.spawnTime;
      setGameStats((prev) => {
        const hits = prev.hits + 1;
        const totalShots = prev.totalShots + 1;
        return {
          hits,
          misses: prev.misses,
          totalShots,
          accuracy: (hits / totalShots) * 100,
          speed: Math.min(
            prev.speed ? (prev.speed + reactionTime) / 2 : reactionTime,
            1000,
          ),
          precision: prev.precision,
        };
      });

      spawnTarget();
    },
    [targets, spawnTarget],
  );

  const handleAreaClick = useCallback(() => {
    setGameStats((prev) => {
      const misses = prev.misses + 1;
      const totalShots = prev.totalShots + 1;
      return {
        ...prev,
        misses,
        totalShots,
        accuracy: (prev.hits / totalShots) * 100,
      };
    });
  }, []);

  const handleModeSelect = (mode: string) => {
    setCurrentMode(mode);
    setGameStats({
      hits: 0,
      misses: 0,
      totalShots: 0,
      accuracy: 0,
      speed: 0,
      precision: 0,
    });
    spawnTarget();
  };

  const handleSettingsChange = (newSettings: any) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#121212]">
      <Sidebar
        isOpen={isSidebarOpen}
        onModeSelect={handleModeSelect}
        onSettingsChange={handleSettingsChange}
        currentMode={currentMode}
      />

      <div className="flex-1 relative">
        <TrainingArea
          crosshairColor="#1DB954"
          crosshairSize={settings.crosshairSize}
          targets={targets}
          onTargetHit={handleTargetHit}
          onAreaClick={handleAreaClick}
          musicTempo={120}
        />

        {settings.showMetrics && (
          <div className="z-50 relative">
            <PerformanceMetrics
              accuracy={Math.round(gameStats.accuracy)}
              speed={Math.round(gameStats.speed)}
              precision={Math.round(gameStats.precision)}
              totalShots={gameStats.totalShots}
              hits={gameStats.hits}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
