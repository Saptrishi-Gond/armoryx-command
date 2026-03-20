import Navbar from "@/components/dashboard/Navbar";
import WorldMonitorBar from "@/components/dashboard/WorldMonitorBar";
import Leaderboard from "@/components/dashboard/Leaderboard";
import GlobalMonitor from "@/components/dashboard/GlobalMonitor";
import AnalyticsPanels from "@/components/dashboard/AnalyticsPanels";
import QuickCompare from "@/components/dashboard/QuickCompare";
import TrendingPanel from "@/components/dashboard/TrendingPanel";

const Index = () => (
  <div className="min-h-screen bg-background bg-grid-pattern">
    <Navbar />
    <WorldMonitorBar />

    <div className="container py-4 space-y-3">
      {/* Main dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-3" style={{ minHeight: "520px" }}>
        <Leaderboard />
        <GlobalMonitor />
      </div>

      {/* Analytics */}
      <AnalyticsPanels />

      {/* Quick Compare */}
      <QuickCompare />

      {/* Trending */}
      <TrendingPanel />

      {/* Footer strip */}
      <div className="text-center py-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-t border-border/20">
        ArmoryX Intelligence System · Classified · Real-Time Global Defense Monitor
      </div>
    </div>
  </div>
);

export default Index;
