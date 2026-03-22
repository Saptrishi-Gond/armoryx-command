import Navbar from "@/components/dashboard/Navbar";
import { topWeapons } from "@/data/weapons";
import { useVotes } from "@/hooks/use-votes";
import { Trophy, ChevronUp, TrendingUp, TrendingDown } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const defaultVotes = Object.fromEntries(topWeapons.map(w => [w.name, w.votes]));

const rankGlow = (rank: number) => {
  if (rank === 1) return "glow-gold border-neon-gold/30";
  if (rank === 2) return "glow-silver border-neon-silver/30";
  if (rank === 3) return "glow-bronze border-neon-bronze/30";
  return "border-border/30";
};

const rankBadge = (rank: number) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
};

const Rankings = () => {
  const navigate = useNavigate();
  const { vote, hasVoted, getVotes } = useVotes(defaultVotes);
  const [category, setCategory] = useState("All");
  const [metric, setMetric] = useState<"power" | "votes" | "range" | "speed">("power");

  const categories = ["All", ...new Set(topWeapons.map(w => w.category))];

  const ranked = useMemo(() => {
    const filtered = category === "All" ? [...topWeapons] : topWeapons.filter(w => w.category === category);
    return filtered.sort((a, b) => {
      if (metric === "votes") return getVotes(b.name) - getVotes(a.name);
      return (b as any)[metric] - (a as any)[metric];
    });
  }, [category, metric, getVotes]);

  const metricValue = (w: typeof topWeapons[0]) => {
    if (metric === "votes") return getVotes(w.name).toLocaleString();
    if (metric === "range") return `${w.range.toLocaleString()} km`;
    if (metric === "speed") return `Mach ${w.speed}`;
    return `${w.power}/100`;
  };

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        <h1 className="text-2xl font-bold tracking-wide text-foreground flex items-center gap-2">
          <Trophy className="h-6 w-6 text-neon-gold" />
          GLOBAL RANKINGS
        </h1>

        {/* Filters */}
        <div className="glass-panel p-4 flex items-center gap-4 flex-wrap">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Category</label>
            <div className="flex gap-1 flex-wrap">
              {categories.map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`px-3 py-1 rounded text-[10px] font-semibold tracking-wider transition-all ${category === c ? "bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/20" : "text-muted-foreground hover:text-foreground"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Rank By</label>
            <div className="flex gap-1">
              {(["power", "votes", "range", "speed"] as const).map(m => (
                <button key={m} onClick={() => setMetric(m)}
                  className={`px-3 py-1 rounded text-[10px] font-semibold tracking-wider transition-all capitalize ${metric === m ? "bg-neon-green/10 text-neon-green border border-neon-green/20" : "text-muted-foreground hover:text-foreground"}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-2">
          {ranked.map((w, i) => (
            <div key={w.name} onClick={() => navigate(`/weapon/${encodeURIComponent(w.name)}`)}
              className={`glass-panel flex items-center gap-4 px-5 py-4 rounded-lg cursor-pointer hover:bg-muted/30 transition-all duration-200 border animate-row-in ${rankGlow(i + 1)}`}
              style={{ animationDelay: `${i * 60}ms` }}>

              {/* Rank */}
              <div className="w-12 text-center">
                {i < 3 ? (
                  <span className="text-2xl">{rankBadge(i + 1)}</span>
                ) : (
                  <span className="text-xl font-bold text-muted-foreground">#{i + 1}</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-base font-bold text-foreground">{w.name}</div>
                <div className="text-xs text-muted-foreground">{w.countryCode} {w.country} · {w.category}</div>
              </div>

              {/* Trend */}
              <div className="hidden md:flex items-center gap-1">
                {w.trend > 0 ? <TrendingUp className="h-3.5 w-3.5 text-neon-green" /> : <TrendingDown className="h-3.5 w-3.5 text-destructive" />}
                <span className={`text-xs font-mono-tech ${w.trend > 0 ? "text-neon-green" : "text-destructive"}`}>
                  {w.trend > 0 ? "+" : ""}{w.trend}%
                </span>
              </div>

              {/* Metric value */}
              <div className="text-right min-w-[80px]">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{metric}</div>
                <div className="text-sm font-mono-tech text-foreground">{metricValue(w)}</div>
              </div>

              {/* Vote */}
              <button onClick={(e) => { e.stopPropagation(); vote(w.name); }}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-bold transition-all ${hasVoted(w.name) ? "bg-neon-cyan/20 text-neon-cyan glow-cyan" : "text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/10 border border-border/30"}`}>
                <ChevronUp className="h-3.5 w-3.5" />
                <span className="font-mono-tech">{getVotes(w.name).toLocaleString()}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rankings;
