import { activityFeed, countryPower } from "@/data/weapons";
import { Radio, Globe } from "lucide-react";

const GlobalMonitor = () => (
  <div className="flex flex-col gap-3 h-full">
    {/* Globe placeholder */}
    <div className="glass-panel-accent p-4 flex-shrink-0">
      <div className="flex items-center gap-2 mb-3">
        <Globe className="h-4 w-4 text-neon-cyan" />
        <h3 className="text-sm font-bold tracking-wide text-foreground">GLOBAL ACTIVITY MONITOR</h3>
      </div>
      <div className="relative w-full aspect-square max-h-[200px] mx-auto rounded-full border border-neon-cyan/20 bg-muted/20 flex items-center justify-center overflow-hidden">
        {/* Radar sweep */}
        <div className="absolute inset-0 rounded-full" style={{
          background: `conic-gradient(from 0deg, transparent 0deg, hsl(var(--neon-cyan) / 0.1) 30deg, transparent 60deg)`,
          animation: "spin 4s linear infinite",
        }} />
        {/* Grid lines */}
        <div className="absolute inset-[15%] rounded-full border border-neon-cyan/10" />
        <div className="absolute inset-[30%] rounded-full border border-neon-cyan/10" />
        <div className="absolute inset-[45%] rounded-full border border-neon-cyan/10" />
        <div className="absolute w-px h-full bg-neon-cyan/10 left-1/2" />
        <div className="absolute h-px w-full bg-neon-cyan/10 top-1/2" />
        {/* Center dot */}
        <div className="relative z-10 h-2 w-2 rounded-full bg-neon-cyan animate-pulse-glow" />
        {/* Blips */}
        <div className="absolute top-[25%] left-[60%] h-1.5 w-1.5 rounded-full bg-neon-green animate-ping" />
        <div className="absolute top-[55%] left-[30%] h-1.5 w-1.5 rounded-full bg-neon-gold animate-ping" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-[40%] left-[70%] h-1.5 w-1.5 rounded-full bg-destructive animate-ping" style={{ animationDelay: "1s" }} />
      </div>
    </div>

    {/* Activity Feed */}
    <div className="glass-panel p-4 flex-1 min-h-0">
      <div className="flex items-center gap-2 mb-3">
        <Radio className="h-3.5 w-3.5 text-neon-green" />
        <h3 className="text-xs font-bold tracking-wide text-foreground uppercase">Live Activity Feed</h3>
      </div>
      <div className="space-y-2 overflow-y-auto max-h-[200px] scrollbar-thin">
        {activityFeed.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-2 py-1.5 border-b border-border/20 last:border-0 animate-row-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <span className="text-[10px] font-mono-tech text-muted-foreground mt-0.5 whitespace-nowrap">{item.time}</span>
            <span className="text-sm">{item.countryCode}</span>
            <span className="text-xs text-foreground/80 leading-snug">{item.event}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Country Power */}
    <div className="glass-panel p-4">
      <h3 className="text-xs font-bold tracking-wide text-foreground uppercase mb-3">Top Countries by Power</h3>
      <div className="space-y-2.5">
        {countryPower.map((c, i) => (
          <div key={c.country} className="animate-row-in" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-foreground/80 font-semibold">{c.country}</span>
              <span className="font-mono-tech text-muted-foreground">{c.power}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-green transition-all duration-1000"
                style={{ width: `${c.power}%`, transitionDelay: `${i * 100}ms` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default GlobalMonitor;
