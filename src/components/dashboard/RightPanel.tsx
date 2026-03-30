import { countryPower, newsFeed, techUpdates, trendingWeapons } from "@/data/weapons";
import { TrendingUp, TrendingDown, Newspaper, Cpu, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RightPanel = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[320px] flex-shrink-0 hidden xl:flex flex-col gap-3 h-fit sticky top-[72px]">
      {/* Global Power Index */}
      <div className="glass-panel-accent p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-display font-bold tracking-wide text-foreground uppercase">Global Power Index</h3>
        </div>
        <div className="space-y-1.5">
          {countryPower.slice(0, 12).map((c, i) => (
            <div key={c.country}
              className="flex items-center gap-2 py-1.5 border-b border-border/20 last:border-0 animate-row-in cursor-pointer hover:bg-muted/20 rounded px-1 transition-colors hover-lift"
              style={{ animationDelay: `${i * 50}ms` }}
              onClick={() => navigate(`/country/${encodeURIComponent(c.country)}`)}>
              <span className={`text-[10px] font-display font-bold w-5 ${i < 3 ? "text-neon-gold" : "text-muted-foreground"}`}>{i + 1}</span>
              <span className="text-sm">{c.code}</span>
              <span className="text-xs font-semibold text-foreground flex-1 truncate">{c.country}</span>
              <span className="text-xs font-mono-tech text-foreground w-8 text-right">{c.power}</span>
              <div className="flex items-center gap-0.5 w-14 justify-end">
                {c.change > 0 ? (
                  <TrendingUp className="h-3 w-3 text-secondary" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
                <span className={`text-[10px] font-mono-tech ${c.change > 0 ? "text-secondary" : "text-destructive"}`}>
                  {c.change > 0 ? "+" : ""}{c.change}%
                </span>
              </div>
              <div className="w-12 h-3 flex items-end gap-px">
                {[40, 55, 45, 60, 50, 65, 58, 70].map((h, j) => (
                  <div key={j}
                    className={`flex-1 rounded-sm ${c.change > 0 ? "bg-secondary/40" : "bg-destructive/40"}`}
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
          <h3 className="text-xs font-display font-bold tracking-wide text-foreground uppercase">Live Intel Feed</h3>
        </div>
        <div className="space-y-2 max-h-[220px] overflow-y-auto scrollbar-thin">
          {newsFeed.map((item, i) => (
            <div key={i} className="py-2 border-b border-border/20 last:border-0 animate-row-in cursor-pointer hover:bg-muted/20 rounded px-1 transition-colors hover-lift" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="text-xs text-foreground/90 leading-snug mb-1">{item.title}</div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">{item.category}</span>
                <span className="text-sm">{item.countryCode}</span>
                <span className="text-[10px] font-mono-code text-muted-foreground ml-auto">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Updates */}
      <div className="glass-panel p-4">
        <div className="flex items-center gap-2 mb-3">
          <Cpu className="h-3.5 w-3.5 text-secondary" />
          <h3 className="text-xs font-display font-bold tracking-wide text-foreground uppercase">Tech Updates</h3>
        </div>
        <div className="space-y-2">
          {techUpdates.map((item, i) => (
            <div key={i} className="glass-panel p-2.5 rounded-md hover:bg-muted/20 transition-colors cursor-pointer animate-row-in hover-glow" style={{ animationDelay: `${i * 100}ms` }}>
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

      {/* Trending Weapons */}
      <div className="glass-panel p-4">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="h-3.5 w-3.5 text-neon-gold" />
          <h3 className="text-xs font-display font-bold tracking-wide text-foreground uppercase">Trending</h3>
        </div>
        <div className="space-y-2">
          {trendingWeapons.slice(0, 4).map((w, i) => (
            <div key={w.name}
              onClick={() => navigate(`/weapon/${encodeURIComponent(w.name)}`)}
              className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-muted/20 rounded px-1 transition-colors animate-row-in hover-lift"
              style={{ animationDelay: `${i * 80}ms` }}>
              <span className="text-[10px] font-display text-neon-gold font-bold">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-foreground truncate">{w.name}</div>
                <div className="text-[10px] text-muted-foreground">{w.country}</div>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-neon-gold/10 text-neon-gold border border-neon-gold/20">{w.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
