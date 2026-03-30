import { allWeapons, getFlag } from "@/data/weapons";
import { useVotes } from "@/hooks/use-votes";
import { ArrowRightLeft, ChevronUp, SlidersHorizontal, TrendingUp, TrendingDown } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getWeaponImage } from "@/lib/weapon-images";

const defaultVotes = Object.fromEntries(allWeapons.map(w => [w.name, w.votes]));

const rankGlow = (rank: number) => {
  if (rank === 1) return "glow-gold border-neon-gold/30";
  if (rank === 2) return "glow-silver border-neon-silver/30";
  if (rank === 3) return "glow-bronze border-neon-bronze/30";
  return "border-border/30";
};

const rankColor = (rank: number) => {
  if (rank === 1) return "text-neon-gold";
  if (rank === 2) return "text-neon-silver";
  if (rank === 3) return "text-neon-bronze";
  return "text-muted-foreground";
};

const powerBarColor = (power: number) => {
  if (power >= 9) return "bg-primary";
  if (power >= 7) return "bg-secondary";
  return "bg-muted-foreground";
};

const Leaderboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"community" | "real">("community");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [rangeMin, setRangeMin] = useState(0);
  const [speedMin, setSpeedMin] = useState(0);
  const [powerMin, setPowerMin] = useState(0);
  const { vote, hasVoted, getVotes } = useVotes(defaultVotes);

  const categories = ["All", "Missile", "Aircraft", "Naval", "Tank", "Drone", "Nuclear", "Radar"];

  const topByVotes = useMemo(() => {
    let filtered = allWeapons.filter(w =>
      categoryFilter === "All" || w.category === categoryFilter
    );
    if (rangeMin > 0) filtered = filtered.filter(w => w.range_km >= rangeMin);
    if (speedMin > 0) filtered = filtered.filter(w => w.speed_mach >= speedMin);
    if (powerMin > 0) filtered = filtered.filter(w => w.power_level >= powerMin);

    const sorted = tab === "community"
      ? [...filtered].sort((a, b) => getVotes(b.name) - getVotes(a.name))
      : [...filtered].sort((a, b) => b.power_level - a.power_level);
    return sorted.slice(0, 10);
  }, [categoryFilter, tab, getVotes, rangeMin, speedMin, powerMin]);

  return (
    <div className="glass-panel-accent flex flex-col">
      <div className="px-5 pt-4 pb-3 border-b border-border/30">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-base font-display font-bold tracking-wide text-foreground">TOP WEAPONS WORLDWIDE</h2>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-0.5 font-body">{allWeapons.length} weapons tracked · Real-time intelligence</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex gap-1">
              <button onClick={() => setTab("community")}
                className={`px-3 py-1.5 rounded text-[10px] font-semibold tracking-wider transition-all click-pulse ${tab === "community" ? "bg-primary/15 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground"}`}
              >🗳️ COMMUNITY</button>
              <button onClick={() => setTab("real")}
                className={`px-3 py-1.5 rounded text-[10px] font-semibold tracking-wider transition-all click-pulse ${tab === "real" ? "bg-primary/15 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground"}`}
              >📊 DATA</button>
            </div>
            <button onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`p-1.5 rounded transition-all click-pulse ${showAdvancedFilters ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-1 flex-wrap mt-2">
          {categories.map((t) => (
            <button key={t} onClick={() => setCategoryFilter(t)}
              className={`px-2.5 py-1 rounded text-[10px] font-semibold tracking-wider transition-all click-pulse ${categoryFilter === t ? "bg-secondary/10 text-secondary border border-secondary/20" : "text-muted-foreground hover:text-foreground"}`}
            >{t}</button>
          ))}
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="mt-3 pt-3 border-t border-border/20 grid grid-cols-3 gap-4">
            <div>
              <label className="text-[9px] uppercase tracking-wider text-muted-foreground block mb-1">Min Range (km)</label>
              <input type="range" min={0} max={20000} step={500} value={rangeMin}
                onChange={e => setRangeMin(+e.target.value)}
                className="w-full accent-primary h-1" />
              <span className="text-[10px] font-mono-tech text-primary">{rangeMin.toLocaleString()} km</span>
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-wider text-muted-foreground block mb-1">Min Speed (Mach)</label>
              <input type="range" min={0} max={27} step={1} value={speedMin}
                onChange={e => setSpeedMin(+e.target.value)}
                className="w-full accent-primary h-1" />
              <span className="text-[10px] font-mono-tech text-primary">Mach {speedMin}</span>
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-wider text-muted-foreground block mb-1">Min Power</label>
              <input type="range" min={0} max={10} step={1} value={powerMin}
                onChange={e => setPowerMin(+e.target.value)}
                className="w-full accent-primary h-1" />
              <span className="text-[10px] font-mono-tech text-primary">{powerMin}/10</span>
            </div>
          </div>
        )}

        {/* Table Header */}
        <div className="grid grid-cols-[40px_40px_1fr_80px_70px_70px_60px_36px_36px] gap-2 mt-3 text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-display font-bold">
          <span>#</span><span></span><span>Weapon</span><span>Country</span>
          <span>{tab === "community" ? "Votes" : "Range"}</span>
          <span>Speed</span><span>Power</span><span></span><span></span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-2 py-1">
        {topByVotes.map((w, i) => {
          const rank = i + 1;
          return (
            <div key={w.name}
              onClick={() => navigate(`/weapon/${encodeURIComponent(w.name)}`)}
              className={`animate-row-in grid grid-cols-[40px_40px_1fr_80px_70px_70px_60px_36px_36px] gap-2 items-center px-3 py-2.5 rounded-md mb-1 border transition-all duration-200 hover:bg-muted/30 hover-lift group cursor-pointer ${rankGlow(rank)}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className={`text-lg font-bold font-display ${rankColor(rank)}`}>{String(rank).padStart(2, "0")}</span>
              <img src={getWeaponImage(w.category, w.type)} alt={w.type} className="w-8 h-8 object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="text-sm font-semibold text-foreground leading-tight">{w.name}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                  {w.type}
                  {w.trend > 5 && <TrendingUp className="h-2.5 w-2.5 text-secondary inline" />}
                  {w.trend < 0 && <TrendingDown className="h-2.5 w-2.5 text-destructive inline" />}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm">{getFlag(w.country)}</span>
                <span className="text-[10px] text-muted-foreground hidden xl:inline truncate">{w.country}</span>
              </div>
              {tab === "community" ? (
                <span className="text-xs font-mono-tech text-primary">{getVotes(w.name).toLocaleString()}</span>
              ) : (
                <span className="text-xs font-mono-tech text-foreground/80">{w.range_km.toLocaleString()} km</span>
              )}
              <span className="text-xs font-mono-tech text-foreground/80">M{w.speed_mach}</span>
              <div className="flex items-center gap-1">
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${powerBarColor(w.power_level)} transition-all duration-700`} style={{ width: `${w.power_level * 10}%` }} />
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); vote(w.name); }}
                className={`flex items-center gap-0.5 px-1.5 py-1 rounded text-[10px] font-bold transition-all click-pulse ${hasVoted(w.name) ? "bg-primary/20 text-primary glow-cyan" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`}
              >
                <ChevronUp className="h-3 w-3" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); navigate(`/compare?a=${encodeURIComponent(w.name)}`); }}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted/50 click-pulse">
                <ArrowRightLeft className="h-3.5 w-3.5 text-primary" />
              </button>
            </div>
          );
        })}
        {topByVotes.length === 0 && (
          <div className="text-center py-8 text-sm text-muted-foreground">No weapons match these filters.</div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
