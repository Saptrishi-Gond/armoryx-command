import Navbar from "@/components/dashboard/Navbar";
import { allWeapons, getFlag } from "@/data/weapons";
import { useVotes } from "@/hooks/use-votes";
import { getWeaponImage } from "@/lib/weapon-images";
import { Search, ChevronUp, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const defaultVotes = Object.fromEntries(allWeapons.map(w => [w.name, w.votes]));
const allCategories = [...new Set(allWeapons.map(w => w.category))];
const allCountries = [...new Set(allWeapons.map(w => w.country))].sort();
const allTypes = [...new Set(allWeapons.map(w => w.type))].sort();

const powerBarColor = (power: number) => {
  if (power >= 9) return "bg-neon-cyan";
  if (power >= 7) return "bg-neon-green";
  return "bg-muted-foreground";
};

const Explore = () => {
  const navigate = useNavigate();
  const { vote, hasVoted, getVotes } = useVotes(defaultVotes);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [country, setCountry] = useState("All");
  const [rangeMin, setRangeMin] = useState(0);
  const [speedMin, setSpeedMin] = useState(0);
  const [sortBy, setSortBy] = useState<"power_level" | "votes" | "range_km" | "speed_mach" | "year">("power_level");
  const [view, setView] = useState<"grid" | "table">("grid");
  const [showFilters, setShowFilters] = useState(true);

  const availableTypes = useMemo(() => {
    if (category === "All") return allTypes;
    return [...new Set(allWeapons.filter(w => w.category === category).map(w => w.type))].sort();
  }, [category]);

  const filtered = useMemo(() => {
    return allWeapons
      .filter(w => {
        if (search && !w.name.toLowerCase().includes(search.toLowerCase()) && !w.type.toLowerCase().includes(search.toLowerCase())) return false;
        if (category !== "All" && w.category !== category) return false;
        if (type !== "All" && w.type !== type) return false;
        if (country !== "All" && w.country !== country) return false;
        if (w.range_km < rangeMin) return false;
        if (w.speed_mach < speedMin) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "votes") return getVotes(b.name) - getVotes(a.name);
        return (b as any)[sortBy] - (a as any)[sortBy];
      });
  }, [search, category, type, country, rangeMin, speedMin, sortBy, getVotes]);

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      <Navbar />
      <div className="flex gap-3 px-4 py-4">
        {/* Filter sidebar */}
        {showFilters && (
          <div className="w-[220px] flex-shrink-0 hidden lg:flex flex-col gap-4 glass-panel p-4 h-fit sticky top-[60px]">
            <h3 className="text-xs font-bold tracking-wide text-foreground uppercase">Filters</h3>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Category</label>
              <select value={category} onChange={e => { setCategory(e.target.value); setType("All"); }}
                className="w-full bg-card border border-border/50 rounded-md px-2 py-1.5 text-xs text-foreground focus:outline-none focus:border-neon-cyan/40">
                <option value="All">All Categories</option>
                {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Type</label>
              <select value={type} onChange={e => setType(e.target.value)}
                className="w-full bg-card border border-border/50 rounded-md px-2 py-1.5 text-xs text-foreground focus:outline-none focus:border-neon-cyan/40">
                <option value="All">All Types</option>
                {availableTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Country</label>
              <select value={country} onChange={e => setCountry(e.target.value)}
                className="w-full bg-card border border-border/50 rounded-md px-2 py-1.5 text-xs text-foreground focus:outline-none focus:border-neon-cyan/40">
                <option value="All">All Countries</option>
                {allCountries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Min Range (km): {rangeMin.toLocaleString()}</label>
              <input type="range" min={0} max={22000} step={500} value={rangeMin}
                onChange={e => setRangeMin(Number(e.target.value))}
                className="w-full accent-neon-cyan" />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Min Speed (Mach): {speedMin}</label>
              <input type="range" min={0} max={27} step={0.5} value={speedMin}
                onChange={e => setSpeedMin(Number(e.target.value))}
                className="w-full accent-neon-cyan" />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Sort By</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
                className="w-full bg-card border border-border/50 rounded-md px-2 py-1.5 text-xs text-foreground focus:outline-none focus:border-neon-cyan/40">
                <option value="power_level">Power</option>
                <option value="votes">Votes</option>
                <option value="range_km">Range</option>
                <option value="speed_mach">Speed</option>
                <option value="year">Year</option>
              </select>
            </div>

            <div className="text-[10px] text-muted-foreground font-mono-tech pt-2 border-t border-border/30">
              {filtered.length} of {allWeapons.length} weapons
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Top bar */}
          <div className="glass-panel p-3 flex items-center gap-3 flex-wrap">
            <button onClick={() => setShowFilters(!showFilters)} className="p-2 rounded-md hover:bg-muted/50 transition-colors">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            </button>
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search weapons or types..."
                className="w-full bg-card border border-border/50 rounded-md pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-cyan/40" />
            </div>
            <div className="flex gap-1">
              <button onClick={() => setView("grid")}
                className={`p-2 rounded ${view === "grid" ? "bg-neon-cyan/15 text-neon-cyan" : "text-muted-foreground hover:text-foreground"}`}>
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button onClick={() => setView("table")}
                className={`p-2 rounded ${view === "table" ? "bg-neon-cyan/15 text-neon-cyan" : "text-muted-foreground hover:text-foreground"}`}>
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Grid view */}
          {view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {filtered.map((w, i) => (
                <div key={w.id} onClick={() => navigate(`/weapon/${encodeURIComponent(w.name)}`)}
                  className="glass-panel p-4 rounded-lg cursor-pointer hover:bg-muted/30 transition-all duration-200 group animate-row-in border hover:border-neon-cyan/30"
                  style={{ animationDelay: `${Math.min(i, 12) * 60}ms` }}>
                  <div className="flex items-start justify-between mb-2">
                    <img src={getWeaponImage(w.category)} alt={w.category} className="w-10 h-10 object-contain opacity-50 group-hover:opacity-80 transition-opacity" loading="lazy" width={40} height={40} />
                    <div className="flex gap-1">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-muted/50 text-muted-foreground border border-border/30">{w.category}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">{w.type}</span>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-foreground">{w.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
                    <span>{getFlag(w.country)}</span> {w.country}
                    <span className="ml-auto text-[10px] font-mono-tech">{w.year}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3 text-[10px]">
                    <div><span className="text-muted-foreground block">Range</span><span className="font-mono-tech text-foreground">{w.range_km.toLocaleString()} km</span></div>
                    <div><span className="text-muted-foreground block">Speed</span><span className="font-mono-tech text-foreground">Mach {w.speed_mach}</span></div>
                    <div><span className="text-muted-foreground block">Power</span><span className="font-mono-tech text-foreground">{w.power_level}/10</span></div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {w.platform.map(p => (
                      <span key={p} className="text-[9px] px-1.5 py-0.5 rounded bg-muted/30 text-muted-foreground">{p}</span>
                    ))}
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden mt-3">
                    <div className={`h-full rounded-full ${powerBarColor(w.power_level)} transition-all duration-700`} style={{ width: `${w.power_level * 10}%` }} />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <button onClick={(e) => { e.stopPropagation(); vote(w.name); }}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold transition-all ${hasVoted(w.name) ? "bg-neon-cyan/20 text-neon-cyan" : "text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/10"}`}>
                      <ChevronUp className="h-3.5 w-3.5" />
                      <span className="font-mono-tech">{getVotes(w.name).toLocaleString()}</span>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); navigate(`/compare?a=${encodeURIComponent(w.name)}`); }}
                      className="text-[10px] text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                      COMPARE →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Table view */
            <div className="glass-panel overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30 text-[9px] uppercase tracking-widest text-muted-foreground">
                    <th className="px-3 py-3 text-left">Weapon</th>
                    <th className="px-3 py-3 text-left">Type</th>
                    <th className="px-3 py-3 text-left">Country</th>
                    <th className="px-3 py-3 text-right">Range</th>
                    <th className="px-3 py-3 text-right">Speed</th>
                    <th className="px-3 py-3 text-right">Power</th>
                    <th className="px-3 py-3 text-right">Year</th>
                    <th className="px-3 py-3 text-right">Votes</th>
                    <th className="px-3 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((w, i) => (
                    <tr key={w.id} onClick={() => navigate(`/weapon/${encodeURIComponent(w.name)}`)}
                      className="border-b border-border/20 hover:bg-muted/20 cursor-pointer transition-colors animate-row-in"
                      style={{ animationDelay: `${Math.min(i, 20) * 40}ms` }}>
                      <td className="px-3 py-2.5 font-semibold text-foreground">{w.name}</td>
                      <td className="px-3 py-2.5 text-muted-foreground text-xs">{w.type}</td>
                      <td className="px-3 py-2.5"><span className="mr-1">{getFlag(w.country)}</span>{w.country}</td>
                      <td className="px-3 py-2.5 text-right font-mono-tech">{w.range_km.toLocaleString()} km</td>
                      <td className="px-3 py-2.5 text-right font-mono-tech">Mach {w.speed_mach}</td>
                      <td className="px-3 py-2.5 text-right font-mono-tech">{w.power_level}/10</td>
                      <td className="px-3 py-2.5 text-right font-mono-tech text-muted-foreground">{w.year}</td>
                      <td className="px-3 py-2.5 text-right font-mono-tech text-neon-cyan">{getVotes(w.name).toLocaleString()}</td>
                      <td className="px-3 py-2.5">
                        <button onClick={(e) => { e.stopPropagation(); vote(w.name); }}
                          className={`p-1 rounded transition-all ${hasVoted(w.name) ? "text-neon-cyan" : "text-muted-foreground hover:text-neon-cyan"}`}>
                          <ChevronUp className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-sm text-muted-foreground glass-panel">No weapons match your filters.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
