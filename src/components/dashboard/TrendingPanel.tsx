import { trendingWeapons } from "@/data/weapons";
import { TrendingUp, Flame } from "lucide-react";

const tagColor = (tag: string) => {
  if (tag === "Fastest") return "bg-neon-cyan/15 text-neon-cyan border-neon-cyan/20";
  if (tag === "Most Powerful") return "bg-destructive/15 text-destructive border-destructive/20";
  if (tag === "Longest Range") return "bg-neon-green/15 text-neon-green border-neon-green/20";
  return "bg-neon-gold/15 text-neon-gold border-neon-gold/20";
};

const TrendingPanel = () => (
  <div className="glass-panel-accent p-4">
    <div className="flex items-center gap-2 mb-3">
      <Flame className="h-4 w-4 text-neon-gold" />
      <h3 className="text-sm font-bold tracking-wide text-foreground">TRENDING WEAPONS</h3>
    </div>
    <div className="flex gap-3 overflow-x-auto scrollbar-thin pb-1">
      {trendingWeapons.map((w, i) => (
        <div
          key={w.name}
          className="flex-shrink-0 w-[200px] glass-panel p-3 rounded-lg hover:bg-muted/30 transition-all duration-200 cursor-pointer group animate-row-in"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border mb-2 ${tagColor(w.tag)}`}>
            {w.tag}
          </div>
          <div className="text-sm font-bold text-foreground">{w.name}</div>
          <div className="text-xs text-muted-foreground mb-2">{w.country}</div>
          <div className="flex gap-3 text-[10px] font-mono-tech text-muted-foreground">
            <span>{w.speed}</span>
            <span>{w.range}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TrendingPanel;
