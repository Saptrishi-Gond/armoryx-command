import { categories, allWeapons } from "@/data/weapons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, TrendingUp, ChevronDown } from "lucide-react";

const CategorySidebar = () => {
  const [active, setActive] = useState("All");
  const [powerFilter, setPowerFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const totalVotes = allWeapons.reduce((s, w) => s + w.votes, 0);
  const trendingCat = categories.reduce((a, b) => {
    const aTrend = allWeapons.filter(w => w.category === a.name.slice(0, -1) || w.category === a.name).reduce((s, w) => s + w.trend, 0);
    const bTrend = allWeapons.filter(w => w.category === b.name.slice(0, -1) || w.category === b.name).reduce((s, w) => s + w.trend, 0);
    return aTrend > bTrend ? a : b;
  });

  return (
    <div className="w-[240px] flex-shrink-0 hidden lg:flex flex-col gap-3 h-fit sticky top-[72px]">
      {/* Categories */}
      <div className="glass-panel p-3">
        <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-display font-bold px-2 mb-2">
          Categories
        </div>
        <button
          onClick={() => setActive("All")}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold tracking-wide transition-all duration-200 mb-0.5 click-pulse ${
            active === "All"
              ? "bg-primary/10 text-primary border border-primary/20 glow-cyan"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/30 border border-transparent"
          }`}
        >
          <span className="text-lg">🌐</span>
          <span className="flex-1 text-left">All</span>
          <span className="text-[10px] font-mono-tech opacity-60">{allWeapons.length}</span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActive(cat.name)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold tracking-wide transition-all duration-200 hover-glow click-pulse ${
              active === cat.name
                ? "bg-primary/10 text-primary border border-primary/20 glow-cyan"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/30 border border-transparent"
            }`}
          >
            <span className="text-lg">{cat.icon}</span>
            <span className="flex-1 text-left">{cat.name}</span>
            <span className={`text-[10px] font-mono-tech ${
              active === cat.name ? "text-primary/70" : "text-muted-foreground/50"
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Quick Filters */}
      <div className="glass-panel p-3">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-between px-2 mb-2"
        >
          <div className="flex items-center gap-1.5">
            <Filter className="h-3 w-3 text-primary" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-display font-bold">Quick Filters</span>
          </div>
          <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </button>
        {showFilters && (
          <div className="space-y-2 px-2">
            <div>
              <div className="text-[9px] text-muted-foreground mb-1 uppercase tracking-wider">Power Level</div>
              <div className="flex gap-1">
                {[
                  { label: "All", value: "all" },
                  { label: "High", value: "high" },
                  { label: "Med", value: "med" },
                  { label: "Low", value: "low" },
                ].map((f) => (
                  <button key={f.value} onClick={() => setPowerFilter(f.value)}
                    className={`px-2 py-1 rounded text-[10px] font-semibold transition-all click-pulse ${
                      powerFilter === f.value
                        ? "bg-primary/15 text-primary border border-primary/20"
                        : "text-muted-foreground hover:text-foreground border border-transparent"
                    }`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <button className="w-full px-2 py-1.5 rounded text-[10px] font-semibold text-secondary border border-secondary/20 bg-secondary/5 hover:bg-secondary/10 transition-all click-pulse">
              ⭐ TOP RATED ONLY
            </button>
          </div>
        )}
      </div>

      {/* Mini Stats */}
      <div className="glass-panel-accent p-3">
        <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-display font-bold px-2 mb-3">
          Quick Stats
        </div>
        <div className="space-y-3 px-2">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Weapons</div>
            <div className="text-base font-bold font-mono-tech text-foreground">{allWeapons.length}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Votes</div>
            <div className="text-base font-bold font-mono-tech text-primary">{(totalVotes / 1000).toFixed(0)}K</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Trending</div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-secondary" />
              <span className="text-xs font-mono-tech text-secondary">{trendingCat.icon} {trendingCat.name}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Countries</div>
            <div className="text-base font-bold font-mono-tech text-foreground">{new Set(allWeapons.map(w => w.country)).size}</div>
          </div>
          <div className="pt-2 border-t border-border/30">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Last Update</div>
            <div className="text-xs font-mono-code text-secondary mt-0.5">00:14:32 UTC</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
