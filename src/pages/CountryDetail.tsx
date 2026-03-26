import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { allWeapons, getFlag, countryMapData, countryPower, newsFeed } from "@/data/weapons";
import { getWeaponImage } from "@/lib/weapon-images";
import Navbar from "@/components/dashboard/Navbar";
import { ChevronUp, ArrowLeft, Shield, Crosshair, Anchor, Cpu, Atom, Radio, TrendingUp, TrendingDown, Search } from "lucide-react";
import { useVotes } from "@/hooks/use-votes";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, PieChart, Pie } from "recharts";

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

const COLORS = ["hsl(186 100% 50%)", "hsl(156 100% 50%)", "hsl(45 100% 55%)", "hsl(280 80% 60%)", "hsl(0 80% 55%)", "hsl(210 80% 60%)", "hsl(30 90% 55%)"];

const CountryDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { vote, hasVoted, getVotes } = useVotes(defaultVotes);
  const [weaponFilter, setWeaponFilter] = useState("All");
  const [weaponSearch, setWeaponSearch] = useState("");

  const countryName = decodeURIComponent(name || "");
  const countryData = countryMapData.find(c => c.country === countryName);
  const powerData = countryPower.find(c => c.country === countryName);

  const weapons = useMemo(() => allWeapons.filter(w => {
    const c = w.country;
    return c === countryName || c.includes(countryName);
  }), [countryName]);

  const filteredWeapons = useMemo(() => {
    return weapons
      .filter(w => weaponFilter === "All" || w.category === weaponFilter)
      .filter(w => !weaponSearch || w.name.toLowerCase().includes(weaponSearch.toLowerCase()))
      .sort((a, b) => b.power_level - a.power_level);
  }, [weapons, weaponFilter, weaponSearch]);

  const categories = useMemo(() => [...new Set(weapons.map(w => w.category))], [weapons]);

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

  const pieData = useMemo(() => categoryBreakdown.map(c => ({ name: c.category, value: c.count })), [categoryBreakdown]);

  const radarData = useMemo(() => {
    const cats = ["Missile", "Aircraft", "Naval", "Tank", "Drone", "Nuclear", "Radar"];
    return cats.map(cat => ({
      subject: cat,
      value: weapons.filter(w => w.category === cat).length,
    }));
  }, [weapons]);

  const countryNews = useMemo(() => newsFeed.filter(n => n.country === countryName), [countryName]);

  const rivals = useMemo(() => {
    if (!countryData) return [];
    return countryMapData.filter(c => c.country !== countryName && Math.abs(c.rank - countryData.rank) <= 3).slice(0, 4);
  }, [countryData, countryName]);

  if (!countryData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Country Not Found</h1>
            <button onClick={() => navigate("/countries")} className="text-neon-cyan hover:underline">← Back to Countries</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      <Navbar />
      <div className="px-4 py-4 max-w-7xl mx-auto space-y-4">
        {/* Hero Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass-panel-accent p-6 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 80% 50%, hsl(186 100% 50%), transparent 60%)` }} />
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-neon-cyan mb-4 transition-colors relative z-10">
            <ArrowLeft className="h-3 w-3" /> Back
          </button>
          <div className="flex items-center gap-5 relative z-10 flex-wrap">
            <span className="text-6xl">{countryData.code}</span>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">{countryData.country}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-muted-foreground">Global Rank</span>
                <span className="text-2xl font-bold font-mono-tech text-neon-gold">#{countryData.rank}</span>
                <span className="text-sm text-muted-foreground">· {weapons.length} weapons tracked</span>
                {powerData && (
                  <span className={`flex items-center gap-1 text-sm font-mono-tech ${powerData.change > 0 ? "text-neon-green" : "text-destructive"}`}>
                    {powerData.change > 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                    {powerData.change > 0 ? "+" : ""}{powerData.change}%
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              {[
                { label: "Air", value: countryData.air, color: "text-neon-cyan", icon: <Shield className="h-4 w-4" /> },
                { label: "Naval", value: countryData.naval, color: "text-neon-cyan", icon: <Anchor className="h-4 w-4" /> },
                { label: "Drones", value: countryData.drones, color: "text-neon-green", icon: <Cpu className="h-4 w-4" /> },
                { label: "Nuclear", value: countryData.nuclear, color: "text-neon-gold", icon: <Atom className="h-4 w-4" /> },
              ].map(s => (
                <motion.div key={s.label} whileHover={{ scale: 1.05 }} className="glass-panel p-3 rounded-lg text-center min-w-[70px]">
                  <div className={`${s.color} flex justify-center mb-1`}>{s.icon}</div>
                  <div className={`text-xl font-bold font-mono-tech ${s.color}`}>{s.value}</div>
                  <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Charts */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-5 lg:col-span-2">
            <h2 className="text-sm font-bold tracking-wide text-foreground uppercase mb-4">Military Strength Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 text-center">Capability Radar</h3>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(210 20% 18%)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(210 15% 55%)", fontSize: 10 }} />
                      <Radar dataKey="value" stroke="hsl(186 100% 50%)" fill="hsl(186 100% 50%)" fillOpacity={0.2} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 text-center">Category Distribution</h3>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name} (${value})`}>
                        {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: "hsl(220 25% 10%)", border: "1px solid hsl(210 20% 18%)", borderRadius: 8, fontSize: 11 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            {/* Category Cards */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 mt-4">
              {categoryBreakdown.map(cat => (
                <motion.div key={cat.category} whileHover={{ scale: 1.05 }}
                  onClick={() => setWeaponFilter(weaponFilter === cat.category ? "All" : cat.category)}
                  className={`glass-panel p-2 text-center rounded-lg cursor-pointer transition-all ${weaponFilter === cat.category ? "border border-neon-cyan/30 bg-neon-cyan/5" : "hover:bg-muted/20"}`}>
                  <div className="flex justify-center text-neon-cyan mb-1">{categoryIcons[cat.category]}</div>
                  <div className="text-lg font-bold font-mono-tech text-foreground">{cat.count}</div>
                  <div className="text-[9px] text-muted-foreground uppercase">{cat.category}</div>
                  <div className="text-[9px] text-neon-green">Avg: {cat.avgPower}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
            {/* Rivals Comparison */}
            <div className="glass-panel-accent p-4 rounded-xl">
              <h3 className="text-xs font-bold tracking-wide text-foreground uppercase mb-3">Nearby Rivals</h3>
              <div className="space-y-1.5">
                {rivals.map(c => (
                  <motion.button key={c.country} whileHover={{ x: 4 }}
                    onClick={() => navigate(`/country/${encodeURIComponent(c.country)}`)}
                    className="w-full flex items-center gap-2 p-2.5 rounded-lg hover:bg-muted/30 transition-colors text-left">
                    <span className="text-lg">{c.code}</span>
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-foreground">{c.country}</span>
                      <div className="text-[10px] text-muted-foreground">Air: {c.air} · Naval: {c.naval}</div>
                    </div>
                    <span className="text-xs font-mono-tech text-neon-gold">#{c.rank}</span>
                  </motion.button>
                ))}
                <button onClick={() => navigate("/compare")} className="w-full text-center text-[10px] text-neon-cyan hover:underline mt-2">
                  Open Full Compare →
                </button>
              </div>
            </div>
            {/* Intel Feed */}
            <div className="glass-panel p-4 rounded-xl">
              <h3 className="text-xs font-bold tracking-wide text-foreground uppercase mb-3">Intel Feed</h3>
              {countryNews.length > 0 ? countryNews.map((n, i) => (
                <div key={i} className="py-2.5 border-b border-border/20 last:border-0">
                  <div className="text-xs text-foreground/90 leading-snug">{n.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">{n.category}</span>
                    <span className="text-[10px] text-muted-foreground ml-auto font-mono-tech">{n.time}</span>
                  </div>
                </div>
              )) : (
                <p className="text-xs text-muted-foreground">No recent intel for this nation.</p>
              )}
            </div>
            {/* Power Index */}
            {powerData && (
              <div className="glass-panel p-4 rounded-xl">
                <h3 className="text-xs font-bold tracking-wide text-foreground uppercase mb-3">Power Index</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold font-mono-tech text-neon-cyan">{powerData.power}</div>
                  <div className="text-[10px] text-muted-foreground uppercase mt-1">Global Power Score</div>
                  <div className="w-full h-2 rounded-full bg-muted mt-3 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${powerData.power}%` }} transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-green" />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Arsenal */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel-accent p-5 rounded-xl">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <h2 className="text-sm font-bold tracking-wide text-foreground uppercase">
              Full Arsenal — {countryData.country}
            </h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input value={weaponSearch} onChange={e => setWeaponSearch(e.target.value)} placeholder="Search..."
                  className="bg-card border border-border/50 rounded-md pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-cyan/40 w-40" />
              </div>
              <div className="flex gap-1">
                <button onClick={() => setWeaponFilter("All")}
                  className={`text-[10px] px-2 py-1 rounded ${weaponFilter === "All" ? "bg-neon-cyan/15 text-neon-cyan" : "text-muted-foreground hover:text-foreground"}`}>All</button>
                {categories.map(c => (
                  <button key={c} onClick={() => setWeaponFilter(c)}
                    className={`text-[10px] px-2 py-1 rounded ${weaponFilter === c ? "bg-neon-cyan/15 text-neon-cyan" : "text-muted-foreground hover:text-foreground"}`}>{c}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="text-[10px] text-muted-foreground font-mono-tech mb-3">{filteredWeapons.length} weapons</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredWeapons.map((w, i) => (
              <motion.div key={w.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i, 12) * 0.04 }}
                onClick={() => navigate(`/weapon/${encodeURIComponent(w.name)}`)}
                className="glass-panel p-3 rounded-lg cursor-pointer hover:bg-muted/20 transition-all group border hover:border-neon-cyan/30">
                <div className="flex items-start gap-3">
                  <img src={getWeaponImage(w.category)} alt={w.category} className="w-12 h-12 object-contain opacity-50 group-hover:opacity-90 transition-opacity" loading="lazy" width={48} height={48} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">{w.name}</div>
                    <div className="text-[10px] text-muted-foreground">{w.type}</div>
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
          {filteredWeapons.length === 0 && (
            <div className="text-center py-8 text-sm text-muted-foreground">No weapons match this filter.</div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CountryDetail;
