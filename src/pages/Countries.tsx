import Navbar from "@/components/dashboard/Navbar";
import { countryMapData, allWeapons, getFlag } from "@/data/weapons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Search, ChevronRight, Shield, Anchor, Cpu, Atom } from "lucide-react";

const Countries = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"rank" | "weapons" | "air" | "naval" | "drones" | "nuclear">("rank");

  const filtered = useMemo(() => {
    return [...countryMapData]
      .filter(c => !search || c.country.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "rank") return a.rank - b.rank;
        return (b as any)[sortBy] - (a as any)[sortBy];
      });
  }, [search, sortBy]);

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel-accent p-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Global Military Powers</h1>
              <p className="text-xs text-muted-foreground mt-1">{countryMapData.length} nations tracked · Real-time intelligence</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search countries..."
                  className="bg-card border border-border/50 rounded-md pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-cyan/40 w-48" />
              </div>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
                className="bg-card border border-border/50 rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:border-neon-cyan/40">
                <option value="rank">By Rank</option>
                <option value="weapons">By Weapons</option>
                <option value="air">By Air Power</option>
                <option value="naval">By Naval</option>
                <option value="drones">By Drones</option>
                <option value="nuclear">By Nuclear</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Top 3 Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.slice(0, 3).map((c, i) => (
            <motion.div key={c.country} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/country/${encodeURIComponent(c.country)}`)}
              className={`glass-panel-accent p-5 rounded-xl cursor-pointer hover:scale-[1.02] transition-all duration-300 border ${
                i === 0 ? "border-neon-gold/30 glow-gold" : i === 1 ? "border-muted-foreground/30" : "border-neon-cyan/20"
              }`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{c.code}</span>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Rank #{c.rank}</div>
                  <div className="text-xl font-bold text-foreground">{c.country}</div>
                </div>
                <span className={`text-3xl font-bold font-mono-tech ml-auto ${i === 0 ? "text-neon-gold" : i === 1 ? "text-muted-foreground" : "text-neon-cyan"}`}>
                  #{c.rank}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="text-center p-2 rounded-md bg-muted/20">
                  <Shield className="h-3.5 w-3.5 mx-auto mb-1 text-neon-cyan" />
                  <div className="text-sm font-bold font-mono-tech text-foreground">{c.air}</div>
                  <div className="text-[8px] uppercase text-muted-foreground">Air</div>
                </div>
                <div className="text-center p-2 rounded-md bg-muted/20">
                  <Anchor className="h-3.5 w-3.5 mx-auto mb-1 text-neon-cyan" />
                  <div className="text-sm font-bold font-mono-tech text-foreground">{c.naval}</div>
                  <div className="text-[8px] uppercase text-muted-foreground">Naval</div>
                </div>
                <div className="text-center p-2 rounded-md bg-muted/20">
                  <Cpu className="h-3.5 w-3.5 mx-auto mb-1 text-neon-green" />
                  <div className="text-sm font-bold font-mono-tech text-foreground">{c.drones}</div>
                  <div className="text-[8px] uppercase text-muted-foreground">Drones</div>
                </div>
                <div className="text-center p-2 rounded-md bg-muted/20">
                  <Atom className="h-3.5 w-3.5 mx-auto mb-1 text-neon-gold" />
                  <div className="text-sm font-bold font-mono-tech text-foreground">{c.nuclear}</div>
                  <div className="text-[8px] uppercase text-muted-foreground">Nuclear</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full List */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-panel overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30 text-[9px] uppercase tracking-widest text-muted-foreground">
                <th className="px-4 py-3 text-left">Rank</th>
                <th className="px-4 py-3 text-left">Country</th>
                <th className="px-4 py-3 text-right">Weapons</th>
                <th className="px-4 py-3 text-right">Air</th>
                <th className="px-4 py-3 text-right">Naval</th>
                <th className="px-4 py-3 text-right">Drones</th>
                <th className="px-4 py-3 text-right">Nuclear</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => {
                const weaponCount = allWeapons.filter(w => w.country === c.country || w.country.includes(c.country)).length;
                return (
                  <motion.tr key={c.country} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                    onClick={() => navigate(`/country/${encodeURIComponent(c.country)}`)}
                    className="border-b border-border/20 hover:bg-muted/20 cursor-pointer transition-colors group">
                    <td className="px-4 py-3">
                      <span className={`font-bold font-mono-tech ${c.rank <= 3 ? "text-neon-gold" : c.rank <= 10 ? "text-neon-cyan" : "text-muted-foreground"}`}>
                        #{c.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{c.code}</span>
                        <span className="font-semibold text-foreground">{c.country}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-mono-tech text-foreground">{weaponCount}</td>
                    <td className="px-4 py-3 text-right font-mono-tech text-neon-cyan">{c.air}</td>
                    <td className="px-4 py-3 text-right font-mono-tech text-neon-cyan">{c.naval}</td>
                    <td className="px-4 py-3 text-right font-mono-tech text-neon-green">{c.drones}</td>
                    <td className="px-4 py-3 text-right font-mono-tech text-neon-gold">{c.nuclear || "—"}</td>
                    <td className="px-4 py-3">
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-neon-cyan transition-colors" />
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default Countries;
