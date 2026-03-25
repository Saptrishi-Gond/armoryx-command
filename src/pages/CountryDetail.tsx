import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { allWeapons, getFlag, countryMapData, newsFeed } from "@/data/weapons";
import { getWeaponImage } from "@/lib/weapon-images";
import Navbar from "@/components/dashboard/Navbar";
import { ChevronUp, ArrowLeft, Shield, Crosshair, Anchor, Cpu, Atom, Radio } from "lucide-react";
import { useVotes } from "@/hooks/use-votes";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";

const defaultVotes = Object.fromEntries(allWeapons.map(w => [w.name, w.votes]));

const categoryIcons: Record<string, React.ReactNode> = {
  Missile: <Crosshair className="h-4 w-4" />,
  Aircraft: <Shield className="h-4 w-4" />,
  Naval: <Anchor className="h-4 w-4" />,
  Tank: <Shield className="h-4 w-4" />,
  Drone: <Cpu className="h-4 w-4" />,
  Nuclear: <Atom className="h-4 w-4" />,
  Radar: <Radio className="h-4 w-4" />,
};

const CountryDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { vote, hasVoted, getVotes } = useVotes(defaultVotes);

  const countryName = decodeURIComponent(name || "");
  const countryData = countryMapData.find(c => c.country === countryName);
  const weapons = useMemo(() => allWeapons.filter(w => {
    const c = w.country;
    return c === countryName || c.includes(countryName);
  }), [countryName]);

  const categoryBreakdown = useMemo(() => {
    const cats = ["Missile", "Aircraft", "Naval", "Tank", "Drone", "Nuclear", "Radar"];
    return cats.map(cat => ({
      category: cat,
      count: weapons.filter(w => w.category === cat).length,
      avgPower: weapons.filter(w => w.category === cat).length > 0
        ? +(weapons.filter(w => w.category === cat).reduce((s, w) => s + w.power_level, 0) / weapons.filter(w => w.category === cat).length).toFixed(1)
        : 0,
    })).filter(c => c.count > 0);
  }, [weapons]);

  const radarData = useMemo(() => {
    const cats = ["Missile", "Aircraft", "Naval", "Tank", "Drone", "Nuclear", "Radar"];
    return cats.map(cat => ({
      subject: cat,
      value: weapons.filter(w => w.category === cat).length,
    }));
  }, [weapons]);

  const countryNews = useMemo(() =>
    newsFeed.filter(n => n.country === countryName), [countryName]);

  const topWeapons = useMemo(() =>
    [...weapons].sort((a, b) => b.power_level - a.power_level).slice(0, 10), [weapons]);

  if (!countryData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Country Not Found</h1>
            <button onClick={() => navigate("/")} className="text-neon-cyan hover:underline">← Back to Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      <Navbar />
      <div className="px-4 py-4 max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel-accent p-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-neon-cyan mb-4 transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back
          </button>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{countryData.code}</span>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{countryData.country}</h1>
              <p className="text-sm text-muted-foreground">Global Rank #{countryData.rank} · {weapons.length} weapons tracked</p>
            </div>
            <div className="ml-auto flex gap-4 text-center">
              <div className="glass-panel p-3 rounded-lg">
                <div className="text-2xl font-bold font-mono-tech text-neon-cyan">{countryData.air}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Air</div>
              </div>
              <div className="glass-panel p-3 rounded-lg">
                <div className="text-2xl font-bold font-mono-tech text-neon-cyan">{countryData.naval}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Naval</div>
              </div>
              <div className="glass-panel p-3 rounded-lg">
                <div className="text-2xl font-bold font-mono-tech text-neon-green">{countryData.drones}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Drones</div>
              </div>
              <div className="glass-panel p-3 rounded-lg">
                <div className="text-2xl font-bold font-mono-tech text-neon-gold">{countryData.nuclear}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Nuclear</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Military Strength Breakdown */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-5 lg:col-span-2">
            <h2 className="text-sm font-bold tracking-wide text-foreground uppercase mb-4">Military Strength Breakdown</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(210 20% 18%)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(210 15% 55%)", fontSize: 10 }} />
                    <Radar dataKey="value" stroke="hsl(186 100% 50%)" fill="hsl(186 100% 50%)" fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryBreakdown} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 18%)" />
                    <XAxis type="number" tick={{ fill: "hsl(210 15% 55%)", fontSize: 10 }} />
                    <YAxis type="category" dataKey="category" tick={{ fill: "hsl(210 15% 55%)", fontSize: 10 }} width={60} />
                    <Tooltip contentStyle={{ background: "hsl(220 25% 10%)", border: "1px solid hsl(210 20% 18%)", borderRadius: 8, fontSize: 11 }} />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                      {categoryBreakdown.map((_, i) => (
                        <Cell key={i} fill={i % 2 === 0 ? "hsl(186 100% 50%)" : "hsl(156 100% 50%)"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Category cards */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 mt-4">
              {categoryBreakdown.map(cat => (
                <div key={cat.category} className="glass-panel p-2 text-center rounded-md">
                  <div className="flex justify-center text-neon-cyan mb-1">{categoryIcons[cat.category]}</div>
                  <div className="text-lg font-bold font-mono-tech text-foreground">{cat.count}</div>
                  <div className="text-[9px] text-muted-foreground uppercase">{cat.category}</div>
                  <div className="text-[9px] text-neon-green">Avg: {cat.avgPower}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* News & Comparison */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
            {/* Compare */}
            <div className="glass-panel-accent p-4">
              <h3 className="text-xs font-bold tracking-wide text-foreground uppercase mb-3">Compare With</h3>
              <div className="space-y-1.5">
                {countryMapData.filter(c => c.country !== countryName).slice(0, 5).map(c => (
                  <button key={c.country} onClick={() => navigate(`/country/${encodeURIComponent(c.country)}`)}
                    className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-muted/30 transition-colors text-left">
                    <span className="text-lg">{c.code}</span>
                    <span className="text-xs text-foreground flex-1">{c.country}</span>
                    <span className="text-[10px] font-mono-tech text-muted-foreground">#{c.rank}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Country News */}
            <div className="glass-panel p-4">
              <h3 className="text-xs font-bold tracking-wide text-foreground uppercase mb-3">Intel Feed</h3>
              {countryNews.length > 0 ? countryNews.map((n, i) => (
                <div key={i} className="py-2 border-b border-border/20 last:border-0">
                  <div className="text-xs text-foreground/90">{n.title}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{n.time}</div>
                </div>
              )) : (
                <p className="text-xs text-muted-foreground">No recent intel for this country.</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* All Weapons List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel-accent p-5">
          <h2 className="text-sm font-bold tracking-wide text-foreground uppercase mb-4">
            Top Weapons — {countryData.country} ({topWeapons.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {topWeapons.map((w, i) => (
              <motion.div key={w.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
                onClick={() => navigate(`/weapon/${encodeURIComponent(w.name)}`)}
                className="glass-panel p-3 rounded-lg cursor-pointer hover:bg-muted/20 transition-all group">
                <div className="flex items-start gap-3">
                  <img src={getWeaponImage(w.category)} alt={w.category} className="w-12 h-12 object-contain opacity-60 group-hover:opacity-100 transition-opacity" loading="lazy" width={48} height={48} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">{w.name}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">{w.type}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono-tech text-foreground/70">{w.range_km.toLocaleString()} km</span>
                      <span className="text-[10px] font-mono-tech text-foreground/70">M{w.speed_mach}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="w-8 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${w.power_level >= 9 ? "bg-neon-cyan" : w.power_level >= 7 ? "bg-neon-green" : "bg-muted-foreground"}`}
                        style={{ width: `${w.power_level * 10}%` }} />
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); vote(w.name); }}
                      className={`flex items-center gap-0.5 px-1 py-0.5 rounded text-[9px] font-bold transition-all ${hasVoted(w.name) ? "text-neon-cyan" : "text-muted-foreground hover:text-neon-cyan"}`}>
                      <ChevronUp className="h-3 w-3" />
                      <span className="font-mono-tech">{getVotes(w.name).toLocaleString()}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CountryDetail;
