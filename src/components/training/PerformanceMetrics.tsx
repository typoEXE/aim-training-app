import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MetricCardProps {
  label: string;
  value: number;
  unit: string;
}

const MetricCard = ({
  label = "Metric",
  value = 0,
  unit = "%",
}: MetricCardProps) => (
  <Card className="p-4 bg-[#282828] hover:bg-[#383838] transition-colors duration-200">
    <h3 className="text-sm text-gray-400">{label}</h3>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="text-sm text-gray-400">{unit}</span>
    </div>
  </Card>
);

interface PerformanceMetricsProps {
  accuracy?: number;
  speed?: number;
  precision?: number;
  totalShots?: number;
  hits?: number;
}

const PerformanceMetrics = ({
  accuracy = 85,
  speed = 250,
  precision = 92,
  totalShots = 100,
  hits = 85,
}: PerformanceMetricsProps) => {
  return (
    <div className="fixed top-4 right-4 w-[300px] space-y-4 bg-[#121212] p-4 rounded-lg shadow-lg">
      <div className="grid grid-cols-2 gap-4">
        <MetricCard label="Accuracy" value={accuracy} unit="%" />
        <MetricCard label="Speed" value={speed} unit="ms" />
      </div>

      <Card className="p-4 bg-[#282828]">
        <h3 className="text-sm text-gray-400 mb-2">Precision</h3>
        <Progress
          value={precision}
          className="h-2 bg-[#383838]"
          indicatorClassName="bg-[#1DB954]"
        />
        <div className="mt-2 text-xs text-gray-400 flex justify-between">
          <span>0%</span>
          <span>{precision}%</span>
          <span>100%</span>
        </div>
      </Card>

      <Card className="p-4 bg-[#282828]">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm text-gray-400">Session Stats</h3>
          <span className="text-xs text-[#1DB954]">
            {hits}/{totalShots}
          </span>
        </div>
        <Progress
          value={(hits / totalShots) * 100}
          className="h-2 bg-[#383838]"
          indicatorClassName="bg-[#1DB954]"
        />
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
