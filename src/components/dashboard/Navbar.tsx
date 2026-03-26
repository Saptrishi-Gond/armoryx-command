import { Search, X } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { allWeapons, getFlag, countryMapData } from "@/data/weapons";
import { getWeaponImage } from "@/lib/weapon-images";
import logo from "@/assets/worldarmory-logo.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Explore", path: "/explore" },
  { label: "Compare", path: "/compare" },
  { label: "Rankings", path: "/rankings" },
  { label: "Countries", path: "/countries" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    <nav className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/70 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="WorldArmory" className="h-8 w-8" />
          <span className="text-xl font-bold tracking-wider text-foreground">
            WORLD<span className="text-neon-cyan">ARMORY</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => navigate(item.path)}
              className={`px-4 py-1.5 rounded text-sm font-semibold tracking-wide transition-all duration-200 ${
                location.pathname === item.path
                  ? "text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}>
              {item.label.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative" ref={searchRef}>
            <button onClick={() => { setSearchOpen(!searchOpen); setQuery(""); }}
              className="p-2 rounded-md hover:bg-muted/50 transition-colors">
              {searchOpen ? <X className="h-4 w-4 text-neon-cyan" /> : <Search className="h-4 w-4 text-muted-foreground" />}
            </button>

            {searchOpen && (
              <div className="absolute right-0 top-12 w-[380px] glass-panel-accent rounded-xl shadow-2xl border border-border/40 overflow-hidden z-50">
                <div className="p-3 border-b border-border/30">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
                      placeholder="Search weapons, countries, types..."
                      className="w-full bg-card border border-border/50 rounded-lg pl-10 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-cyan/40" />
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
                            <div className="text-[10px] font-mono-tech text-neon-cyan">{w.power_level}/10</div>
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
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
            </span>
            LIVE
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
