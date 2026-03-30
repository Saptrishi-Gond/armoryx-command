import { activityFeed } from "@/data/weapons";
import { AlertTriangle } from "lucide-react";

const tickerItems = [
  ...activityFeed,
  { time: "23:58", country: "Turkey", countryCode: "🇹🇷", event: "Bayraktar Kizilelma drone completes supersonic flight test" },
  { time: "23:55", country: "Israel", countryCode: "🇮🇱", event: "Iron Dome intercepts 14 projectiles — Northern sector" },
  { time: "23:50", country: "Japan", countryCode: "🇯🇵", event: "Mogami-class frigate commissioned at Yokosuka" },
  { time: "23:45", country: "Germany", countryCode: "🇩🇪", event: "Leopard 2A7+ battalion exercises — Grafenwöhr" },
];

const LiveActivityTicker = () => (
  <div className="w-full border-b border-border/20 bg-card/30 overflow-hidden relative">
    <div className="flex items-center">
      <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-destructive/10 border-r border-border/30 z-10">
        <AlertTriangle className="h-3 w-3 text-destructive" />
        <span className="text-[10px] font-display tracking-wider text-destructive font-bold">LIVE INTEL</span>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="animate-ticker flex whitespace-nowrap gap-8 py-1.5 px-4">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-[11px]">
              <span className="text-muted-foreground font-mono-code">{item.time}</span>
              <span>{item.countryCode}</span>
              <span className="text-foreground/80">{item.event}</span>
              <span className="text-primary/30">●</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default LiveActivityTicker;
