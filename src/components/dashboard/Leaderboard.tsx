import { allWeapons, getFlag } from "@/data/weapons";
import { useVotes } from "@/hooks/use-votes";
import { ArrowRightLeft, ChevronUp } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

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
  if (power >= 9) return "bg-neon-cyan";
  if (power >= 7) return "bg-neon-green";
  return "bg-muted-foreground";
};

const Leaderboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"community" | "real">("community");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const { vote, hasVoted, getVotes } = useVotes(defaultVotes);

  const categories = ["All", "Missile", "Aircraft", "Naval", "Tank", "Drone", "Nuclear", "Radar"];

  const topByVotes = useMemo(() => {
    const filtered = allWeapons.filter(w =>
      categoryFilter === "All" || w.category === categoryFilter
    );
    const sorted = tab === "community"
      ? [...filtered].sort((a, b) => getVotes(b.name) - getVotes(a.name))
      : [...filtered].sort((a, b) => b.power_level - a.power_level);
    return sorted.slice(0, 10);
  }, [categoryFilter, tab, getVotes]);

  return (
    <div className="glass-panel-accent flex flex-col">
      <div className="px-5 pt-4 pb-3 border-b border-border/30">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-lg font-bold tracking-wide text-foreground">TOP 10 WEAPONS WORLDWIDE</h2>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-0.5">Global Intelligence Leaderboard · {allWeapons.length} weapons tracked</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <button onClick={() => setTab("community")}
                className={`px-3 py-1 rounded text-[10px] font-semibold tracking-wider transition-all ${tab === "community" ? "bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/20" : "text-muted-foreground hover:text-foreground"}`}
              >🗳️ COMMUNITY</button>
              <button onClick={() => setTab("real")}
                className={`px-3 py-1 rounded text-[10px] font-semibold tracking-wider transition-all ${tab === "real" ? "bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/20" : "text-muted-foreground hover:text-foreground"}`}
              >📊 DATA</button>
            </div>
            <div className="hidden md:flex gap-1 flex-wrap">
              {categories.map((t) => (
                <button key={t} onClick={() => setCategoryFilter(t)}
                  className={`px-2.5 py-1 rounded text-[10px] font-semibold tracking-wider transition-all ${categoryFilter === t ? "bg-neon-green/10 text-neon-green border border-neon-green/20" : "text-muted-foreground hover:text-foreground"}`}
                >{t}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[36px_1fr_70px_70px_70px_60px_60px_36px] gap-2 mt-3 text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">
          <span>#</span><span>Weapon</span><span>Country</span>
          <span>{tab === "community" ? "Votes" : "Range"}</span>
          <span>Speed</span><span>Power</span><span>Vote</span><span></span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-2 py-1">
        {topByVotes.map((w, i) => {
          const rank = i + 1;
          return (
            <div key={w.name}
              onClick={() => navigate(`/weapon/${encodeURIComponent(w.name)}`)}
              className={`animate-row-in grid grid-cols-[36px_1fr_70px_70px_70px_60px_60px_36px] gap-2 items-center px-3 py-2.5 rounded-md mb-1 border transition-all duration-200 hover:bg-muted/30 group cursor-pointer ${rankGlow(rank)}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className={`text-lg font-bold ${rankColor(rank)}`}>{String(rank).padStart(2, "0")}</span>
              <div>
                <div className="text-sm font-semibold text-foreground leading-tight">{w.name}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{w.type}</div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm">{getFlag(w.country)}</span>
                <span className="text-[10px] text-muted-foreground hidden xl:inline">{w.country}</span>
              </div>
              {tab === "community" ? (
                <span className="text-xs font-mono-tech text-neon-cyan">{getVotes(w.name).toLocaleString()}</span>
              ) : (
                <span className="text-xs font-mono-tech text-foreground/80">{w.range_km.toLocaleString()} km</span>
              )}
              <span className="text-xs font-mono-tech text-foreground/80">Mach {w.speed_mach}</span>
              <div className="flex items-center gap-1">
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${powerBarColor(w.power_level)} transition-all duration-700`} style={{ width: `${w.power_level * 10}%` }} />
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); vote(w.name); }}
                className={`flex items-center gap-0.5 px-1.5 py-1 rounded text-[10px] font-bold transition-all ${hasVoted(w.name) ? "bg-neon-cyan/20 text-neon-cyan glow-cyan" : "text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/10"}`}
              >
                <ChevronUp className="h-3 w-3" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); navigate(`/compare?a=${encodeURIComponent(w.name)}`); }}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted/50">
                <ArrowRightLeft className="h-3.5 w-3.5 text-neon-cyan" />
              </button>
            </div>
          );
        })}
        {topByVotes.length === 0 && (
          <div className="text-center py-8 text-sm text-muted-foreground">No weapons match this filter.</div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
