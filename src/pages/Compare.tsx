import Navbar from "@/components/dashboard/Navbar";
import { allWeapons, getFlag } from "@/data/weapons";
import { useVotes } from "@/hooks/use-votes";
import { Swords, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

const defaultVotes = Object.fromEntries(allWeapons.map(w => [w.name, w.votes]));

const StatBar = ({ label, a, b, max }: { label: string; a: number; b: number; max: number }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
      <span className="font-mono-tech text-neon-cyan">{a.toLocaleString()}</span>
      <span>{label}</span>
      <span className="font-mono-tech text-neon-green">{b.toLocaleString()}</span>
    </div>
    <div className="flex gap-1 h-2">
      <div className="flex-1 bg-muted rounded-full overflow-hidden flex justify-end">
        <div className="h-full rounded-full bg-neon-cyan transition-all duration-1000" style={{ width: `${(a / max) * 100}%` }} />
      </div>
      <div className="flex-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full rounded-full bg-neon-green transition-all duration-1000" style={{ width: `${(b / max) * 100}%` }} />
      </div>
    </div>
  </div>
);

const Compare = () => {
  const [params] = useSearchParams();
  const { vote, hasVoted, getVotes } = useVotes(defaultVotes);
  const [weaponA, setWeaponA] = useState(params.get("a") || "");
  const [weaponB, setWeaponB] = useState(params.get("b") || "");

  const a = allWeapons.find(w => w.name === weaponA);
  const b = allWeapons.find(w => w.name === weaponB);

  const radarData = a && b ? [
    { metric: "Range", A: (a.range_km / 22000) * 100, B: (b.range_km / 22000) * 100 },
    { metric: "Speed", A: (a.speed_mach / 27) * 100, B: (b.speed_mach / 27) * 100 },
    { metric: "Power", A: a.power_level * 10, B: b.power_level * 10 },
    { metric: "Votes", A: Math.min((getVotes(a.name) / 15000) * 100, 100), B: Math.min((getVotes(b.name) / 15000) * 100, 100) },
  ] : [];

  const winner = a && b ? (a.power_level > b.power_level ? a : b.power_level > a.power_level ? b : null) : null;

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        <h1 className="text-2xl font-bold tracking-wide text-foreground flex items-center gap-2">
          <Swords className="h-6 w-6 text-neon-cyan" />
          WEAPON COMPARISON
        </h1>

        {/* Selectors */}
        <div className="glass-panel p-4 flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Weapon A</label>
            <select value={weaponA} onChange={e => setWeaponA(e.target.value)}
              className="w-full bg-card border border-neon-cyan/30 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-neon-cyan/50">
              <option value="">Select Weapon A</option>
              {allWeapons.map(w => <option key={w.id} value={w.name}>{getFlag(w.country)} {w.name} ({w.type})</option>)}
            </select>
          </div>
          <span className="text-2xl font-bold text-neon-cyan animate-pulse-glow">VS</span>
          <div className="flex-1 min-w-[200px]">
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Weapon B</label>
            <select value={weaponB} onChange={e => setWeaponB(e.target.value)}
              className="w-full bg-card border border-neon-green/30 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-neon-green/50">
              <option value="">Select Weapon B</option>
              {allWeapons.map(w => <option key={w.id} value={w.name}>{getFlag(w.country)} {w.name} ({w.type})</option>)}
            </select>
          </div>
        </div>

        {a && b && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[a, b].map((w, idx) => (
                <div key={w.name} className={`glass-panel-accent p-5 border ${idx === 0 ? "border-neon-cyan/30" : "border-neon-green/30"}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{w.name}</h3>
                      <p className="text-xs text-muted-foreground">{getFlag(w.country)} {w.country} · {w.type}</p>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded bg-muted/50 text-muted-foreground">{w.category}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="glass-panel p-2 rounded"><div className="text-[10px] text-muted-foreground">Range</div><div className="font-mono-tech text-sm text-foreground">{w.range_km.toLocaleString()} km</div></div>
                    <div className="glass-panel p-2 rounded"><div className="text-[10px] text-muted-foreground">Speed</div><div className="font-mono-tech text-sm text-foreground">Mach {w.speed_mach}</div></div>
                    <div className="glass-panel p-2 rounded"><div className="text-[10px] text-muted-foreground">Power</div><div className="font-mono-tech text-sm text-foreground">{w.power_level}/10</div></div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-[10px] text-muted-foreground">
                    <span>Platforms: {w.platform.join(", ")}</span>
                    <span className="ml-auto font-mono-tech">{w.year}</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <button onClick={() => vote(w.name)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold transition-all ${hasVoted(w.name) ? "bg-neon-cyan/20 text-neon-cyan glow-cyan" : "text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/10 border border-border/30"}`}>
                      <ChevronUp className="h-4 w-4" />
                      <span className="font-mono-tech">{getVotes(w.name).toLocaleString()} votes</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-panel p-5 space-y-4">
              <h3 className="text-sm font-bold tracking-wide text-foreground uppercase mb-2">Head-to-Head</h3>
              <StatBar label="Range (km)" a={a.range_km} b={b.range_km} max={Math.max(a.range_km, b.range_km)} />
              <StatBar label="Speed (Mach)" a={a.speed_mach} b={b.speed_mach} max={Math.max(a.speed_mach, b.speed_mach)} />
              <StatBar label="Power" a={a.power_level} b={b.power_level} max={10} />
              <StatBar label="Votes" a={getVotes(a.name)} b={getVotes(b.name)} max={Math.max(getVotes(a.name), getVotes(b.name))} />
            </div>

            <div className="glass-panel-accent p-5">
              <h3 className="text-sm font-bold tracking-wide text-foreground uppercase mb-2">Performance Overlay</h3>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(210 20% 18%)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(210 15% 55%)", fontSize: 10 }} />
                  <Radar name={a.name} dataKey="A" stroke="hsl(186 100% 50%)" fill="hsl(186 100% 50%)" fillOpacity={0.15} />
                  <Radar name={b.name} dataKey="B" stroke="hsl(156 100% 50%)" fill="hsl(156 100% 50%)" fillOpacity={0.15} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {winner && (
              <div className="glass-panel-accent p-5 text-center glow-cyan">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Analysis Result</div>
                <div className="text-xl font-bold text-neon-cyan">{getFlag(winner.country)} {winner.name}</div>
                <div className="text-sm text-foreground/80 mt-1">has the superior overall power rating</div>
              </div>
            )}
          </>
        )}

        {(!a || !b) && (
          <div className="glass-panel p-12 text-center text-muted-foreground">
            <Swords className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Select two weapons above to begin comparison analysis</p>
            <p className="text-[10px] mt-2">{allWeapons.length} weapons available for comparison</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
