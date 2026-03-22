import Navbar from "@/components/dashboard/Navbar";
import WorldMonitorBar from "@/components/dashboard/WorldMonitorBar";
import CategorySidebar from "@/components/dashboard/CategorySidebar";
import WorldMapPanel from "@/components/dashboard/WorldMapPanel";
import Leaderboard from "@/components/dashboard/Leaderboard";
import RightPanel from "@/components/dashboard/RightPanel";
import AnalyticsPanels from "@/components/dashboard/AnalyticsPanels";
import QuickCompare from "@/components/dashboard/QuickCompare";
import TrendingPanel from "@/components/dashboard/TrendingPanel";

const Index = () => (
  <div className="min-h-screen bg-background bg-grid-pattern">
    <Navbar />
    <WorldMonitorBar />

    <div className="flex gap-3 px-4 py-4">
      {/* Left Sidebar */}
      <CategorySidebar />

      {/* Center Main */}
      <div className="flex-1 min-w-0 space-y-3">
        <WorldMapPanel />
        <Leaderboard />
        <AnalyticsPanels />
        <QuickCompare />
        <TrendingPanel />

        {/* Footer strip */}
        <div className="text-center py-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-t border-border/20">
          WorldArmory Intelligence System · Classified · Real-Time Global Defense Monitor
        </div>
      </div>

      {/* Right Panel */}
      <RightPanel />
    </div>
  </div>
);

export default Index;
