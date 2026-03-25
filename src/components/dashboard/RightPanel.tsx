import { countryPower, newsFeed, techUpdates, activityFeed } from "@/data/weapons";
import { TrendingUp, TrendingDown, Newspaper, Cpu, Radio } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RightPanel = () => {
  const navigate = useNavigate();
  return (
  <div className="w-[320px] flex-shrink-0 hidden xl:flex flex-col gap-3 h-fit sticky top-[60px]">
    {/* Global Power Index */}
    <div className="glass-panel-accent p-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-neon-cyan" />
        <h3 className="text-xs font-bold tracking-wide text-foreground uppercase">Global Power Index</h3>
      </div>
      <div className="space-y-2">
        {countryPower.slice(0, 10).map((c, i) => (
          <div key={c.country} className="flex items-center gap-2 py-1.5 border-b border-border/20 last:border-0 animate-row-in cursor-pointer hover:bg-muted/20 rounded px-1 transition-colors"
            style={{ animationDelay: `${i * 60}ms` }}
            onClick={() => navigate(`/country/${encodeURIComponent(c.country)}`)}>
            <span className="text-[10px] font-mono-tech text-muted-foreground w-4">{i + 1}</span>
            <span className="text-sm">{c.code}</span>
            <span className="text-xs font-semibold text-foreground flex-1">{c.country}</span>
            <span className="text-xs font-mono-tech text-foreground w-8 text-right">{c.power}</span>
            <div className="flex items-center gap-0.5 w-14 justify-end">
              {c.change > 0 ? (
                <TrendingUp className="h-3 w-3 text-neon-green" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={`text-[10px] font-mono-tech ${c.change > 0 ? "text-neon-green" : "text-destructive"}`}>
                {c.change > 0 ? "+" : ""}{c.change}%
              </span>
            </div>
            {/* Mini sparkline placeholder */}
            <div className="w-12 h-3 flex items-end gap-px">
              {[40, 55, 45, 60, 50, 65, 58, 70].map((h, j) => (
                <div
                  key={j}
                  className={`flex-1 rounded-sm ${c.change > 0 ? "bg-neon-green/40" : "bg-destructive/40"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Live News Feed */}
    <div className="glass-panel p-4">
      <div className="flex items-center gap-2 mb-3">
        <Newspaper className="h-3.5 w-3.5 text-neon-gold" />
        <h3 className="text-xs font-bold tracking-wide text-foreground uppercase">Live Intel Feed</h3>
      </div>
      <div className="space-y-2 max-h-[220px] overflow-y-auto scrollbar-thin">
        {newsFeed.map((item, i) => (
          <div key={i} className="py-2 border-b border-border/20 last:border-0 animate-row-in cursor-pointer hover:bg-muted/20 rounded px-1 transition-colors" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="text-xs text-foreground/90 leading-snug mb-1">{item.title}</div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">{item.category}</span>
              <span className="text-sm">{item.countryCode}</span>
              <span className="text-[10px] font-mono-tech text-muted-foreground ml-auto">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Tech Updates */}
    <div className="glass-panel p-4">
      <div className="flex items-center gap-2 mb-3">
        <Cpu className="h-3.5 w-3.5 text-neon-green" />
        <h3 className="text-xs font-bold tracking-wide text-foreground uppercase">Tech Updates</h3>
      </div>
      <div className="space-y-2">
        {techUpdates.map((item, i) => (
          <div key={i} className="glass-panel p-2.5 rounded-md hover:bg-muted/20 transition-colors cursor-pointer animate-row-in" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex items-start gap-2">
              <span className="text-lg">{item.icon}</span>
              <div>
                <div className="text-xs font-semibold text-foreground">{item.title}</div>
                <div className="text-[10px] text-muted-foreground leading-snug mt-0.5">{item.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Live Activity */}
    <div className="glass-panel p-4">
      <div className="flex items-center gap-2 mb-3">
        <Radio className="h-3.5 w-3.5 text-neon-green" />
        <h3 className="text-xs font-bold tracking-wide text-foreground uppercase">Activity Feed</h3>
      </div>
      <div className="space-y-1.5 max-h-[150px] overflow-y-auto scrollbar-thin">
        {activityFeed.map((item, i) => (
          <div key={i} className="flex items-start gap-2 py-1 text-[11px] animate-row-in" style={{ animationDelay: `${i * 80}ms` }}>
            <span className="font-mono-tech text-muted-foreground text-[10px] mt-0.5">{item.time}</span>
            <span>{item.countryCode}</span>
            <span className="text-foreground/70 leading-snug">{item.event}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default RightPanel;
