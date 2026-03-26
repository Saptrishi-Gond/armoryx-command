import { Search, X, Terminal } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { allWeapons, getFlag, countryMapData } from "@/data/weapons";
import { getWeaponImage } from "@/lib/weapon-images";
import { useAdvancedMode } from "@/contexts/AdvancedMode";
import logo from "@/assets/worldarmory-logo.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Explore", path: "/explore" },
  { label: "Compare", path: "/compare" },
  { label: "Rankings", path: "/rankings" },
  { label: "Countries", path: "/countries" },
  { label: "War Domains", path: "/war-domains" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdvanced, toggle } = useAdvancedMode();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return { weapons: [], countries: [] };
    const q = query.toLowerCase();
    return {
      weapons: allWeapons.filter(w => w.name.toLowerCase().includes(q) || w.type.toLowerCase().includes(q) || w.country.toLowerCase().includes(q)).slice(0, 6),
      countries: countryMapData.filter(c => c.country.toLowerCase().includes(q)).slice(0, 4),
    };
  }, [query]);

  const hasResults = results.weapons.length > 0 || results.countries.length > 0;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const goTo = (path: string) => {
    navigate(path);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <nav className={`sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur-xl ${
      isAdvanced ? "border-neon-green/30 shadow-[0_0_20px_hsl(var(--neon-green)/0.1)]" : "border-border/30"
    }`}>
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="WorldArmory" className="h-8 w-8" />
          <span className={`text-xl font-bold tracking-wider ${isAdvanced ? "font-mono-tech" : ""}`}>
            {isAdvanced ? (
              <><span className="text-neon-green">WORLD</span><span className="text-neon-green/60">ARMORY</span></>
            ) : (
              <>WORLD<span className="text-neon-cyan">ARMORY</span></>
            )}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => navigate(item.path)}
              className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wide transition-all duration-200 ${
                location.pathname === item.path
                  ? isAdvanced
                    ? "text-neon-green bg-neon-green/10 border border-neon-green/30"
                    : "text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}>
              {item.label.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Advanced Mode Toggle */}
          <button
            onClick={toggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold tracking-wide transition-all duration-300 ${
              isAdvanced
                ? "bg-neon-green/20 text-neon-green border border-neon-green/40 shadow-[0_0_12px_hsl(var(--neon-green)/0.3)]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
            }`}
            title="Toggle Advanced Mode"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline font-mono-tech">{isAdvanced ? "ADV:ON" : "ADV"}</span>
          </button>

          <div className="relative" ref={searchRef}>
            <button onClick={() => { setSearchOpen(!searchOpen); setQuery(""); }}
              className="p-2 rounded-md hover:bg-muted/50 transition-colors">
              {searchOpen ? <X className="h-4 w-4 text-neon-cyan" /> : <Search className="h-4 w-4 text-muted-foreground" />}
            </button>

            {searchOpen && (
              <div className={`absolute right-0 top-12 w-[380px] glass-panel-accent rounded-xl shadow-2xl overflow-hidden z-50 ${
                isAdvanced ? "border-neon-green/30" : "border-border/40"
              }`}>
                <div className="p-3 border-b border-border/30">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
                      placeholder="Search weapons, countries, types..."
                      className={`w-full bg-card border rounded-lg pl-10 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none ${
                        isAdvanced ? "border-neon-green/30 focus:border-neon-green/60 font-mono-tech" : "border-border/50 focus:border-neon-cyan/40"
                      }`} />
                  </div>
                </div>

                {query.trim() && (
                  <div className="max-h-[400px] overflow-y-auto scrollbar-thin">
                    {results.weapons.length > 0 && (
                      <div className="p-2">
                        <div className="text-[9px] uppercase tracking-widest text-muted-foreground px-2 py-1">Weapons</div>
                        {results.weapons.map(w => (
                          <button key={w.id} onClick={() => goTo(`/weapon/${encodeURIComponent(w.name)}`)}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors text-left">
                            <img src={getWeaponImage(w.category)} alt={w.category} className="w-8 h-8 object-contain opacity-60" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-foreground truncate">{w.name}</div>
                              <div className="text-[10px] text-muted-foreground">{getFlag(w.country)} {w.country} · {w.type}</div>
                            </div>
                            <div className={`text-[10px] font-mono-tech ${isAdvanced ? "text-neon-green" : "text-neon-cyan"}`}>{w.power_level}/10</div>
                          </button>
                        ))}
                      </div>
                    )}
                    {results.countries.length > 0 && (
                      <div className="p-2 border-t border-border/20">
                        <div className="text-[9px] uppercase tracking-widest text-muted-foreground px-2 py-1">Countries</div>
                        {results.countries.map(c => (
                          <button key={c.country} onClick={() => goTo(`/country/${encodeURIComponent(c.country)}`)}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors text-left">
                            <span className="text-2xl">{c.code}</span>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-foreground">{c.country}</div>
                              <div className="text-[10px] text-muted-foreground">Rank #{c.rank} · {c.weapons} weapons</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                    {!hasResults && (
                      <div className="p-6 text-center text-sm text-muted-foreground">No results for "{query}"</div>
                    )}
                  </div>
                )}

                {!query.trim() && (
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    Type to search 230+ weapons and 25 countries
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs font-mono-tech text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAdvanced ? "bg-neon-green" : "bg-neon-green"}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isAdvanced ? "bg-neon-green" : "bg-neon-green"}`}></span>
            </span>
            LIVE
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
