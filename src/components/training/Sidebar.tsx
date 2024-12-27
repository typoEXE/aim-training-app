import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Menu, Settings, Music, Crosshair } from "lucide-react";

interface SidebarProps {
  onModeSelect?: (mode: string) => void;
  onSettingsChange?: (settings: any) => void;
  isOpen?: boolean;
  currentMode?: string;
}

const Sidebar = ({
  onModeSelect = () => {},
  onSettingsChange = () => {},
  isOpen = true,
  currentMode = "precision",
}: SidebarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showMetrics, setShowMetrics] = useState(true);

  const trainingModes = [
    { id: "precision", name: "Precision" },
    { id: "flicking", name: "Flicking" },
  ];

  const handleMetricsToggle = (checked: boolean) => {
    setShowMetrics(checked);
    onSettingsChange({ showMetrics: checked });
  };

  const SidebarContent = () => (
    <div className="h-full w-full bg-[#121212] text-white p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-[#1DB954]">Training Modes</h2>
      <div className="grid gap-2">
        {trainingModes.map((mode) => (
          <Card
            key={mode.id}
            className={`bg-zinc-900 hover:bg-zinc-800 transition-colors ${currentMode === mode.id ? "border-[#1DB954]" : ""}`}
          >
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:text-[#1DB954]"
              onClick={() => onModeSelect(mode.id)}
            >
              {mode.name}
            </Button>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="visual" className="mt-6">
        <TabsList className="grid w-full grid-cols-3 bg-zinc-900">
          <TabsTrigger value="visual">
            <Settings className="h-4 w-4 mr-2" />
            Visual
          </TabsTrigger>
          <TabsTrigger value="crosshair">
            <Crosshair className="h-4 w-4 mr-2" />
            Crosshair
          </TabsTrigger>
          <TabsTrigger value="music">
            <Music className="h-4 w-4 mr-2" />
            Music
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visual" className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Target Size</h3>
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              onValueChange={(value) =>
                onSettingsChange({ targetSize: value[0] })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Show Performance Metrics</span>
            <Switch
              checked={showMetrics}
              onCheckedChange={handleMetricsToggle}
            />
          </div>
        </TabsContent>

        <TabsContent value="crosshair" className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Crosshair Size</h3>
            <Slider
              defaultValue={[20]}
              max={50}
              step={1}
              onValueChange={(value) =>
                onSettingsChange({ crosshairSize: value[0] })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Dynamic Crosshair</span>
            <Switch
              defaultChecked
              onCheckedChange={(checked) =>
                onSettingsChange({ dynamicCrosshair: checked })
              }
            />
          </div>
        </TabsContent>

        <TabsContent value="music" className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Music Volume</h3>
            <Slider
              defaultValue={[75]}
              max={100}
              step={1}
              onValueChange={(value) =>
                onSettingsChange({ musicVolume: value[0] })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Sync Targets to Beat</span>
            <Switch
              defaultChecked
              onCheckedChange={(checked) =>
                onSettingsChange({ syncToMusic: checked })
              }
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  // Desktop sidebar
  const DesktopSidebar = () => (
    <div
      className={`hidden md:block h-full w-[300px] border-r border-zinc-800 transition-all duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <SidebarContent />
    </div>
  );

  // Mobile sidebar using Sheet component
  const MobileSidebar = () => (
    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0 bg-[#121212]">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      <MobileSidebar />
      <DesktopSidebar />
    </>
  );
};

export default Sidebar;
