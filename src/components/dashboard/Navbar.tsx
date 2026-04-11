import { Search, X, Terminal, Menu } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { allWeapons, getFlag, countryMapData } from "@/data/weapons";
import { getWeaponImage } from "@/lib/weapon-images";
import { useAdvancedMode } from "@/contexts/AdvancedMode";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Explore", path: "/explore" },
  { label: "Compare", path: "/compare" },
  { label: "Rankings", path: "/rankings" },
  { label: "Countries", path: "/countries" },
  { label: "War Domains", path: "/war-domains" },
  { label: "Simulator", path: "/simulator" },
  { label: "Community", path: "/community" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdvanced, toggle } = useAdvancedMode();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      scrolled
        ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-background/50"
        : "bg-transparent"
    } ${isAdvanced ? "border-primary/30" : "border-border/30"}`}>
      <div className="flex h-16 items-center justify-between px-4 max-w-[1920px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate("/")}>
          <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:glow-cyan transition-all">
            <span className="font-display text-primary text-sm font-bold">WA</span>
          </div>
          <span className="font-display text-lg font-bold tracking-wider hidden sm:block">
            {isAdvanced ? (
              <><span className="text-primary">VANGUARD</span><span className="text-primary/60">-OS</span></>
            ) : (
              <>VANGUARD<span className="text-primary">-OS</span></>
            )}
          </span>
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => navigate(item.path)}
              className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wide transition-all duration-200 click-pulse ${
                location.pathname === item.path
                  ? "text-primary bg-primary/10 border border-primary/20 glow-cyan"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}>
              {item.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Advanced Mode Toggle */}
          <button
            onClick={toggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold tracking-wide transition-all duration-300 click-pulse ${
              isAdvanced
                ? "bg-primary/20 text-primary border border-primary/40 glow-green"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
            }`}
            title="Toggle Advanced Mode"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline font-mono-code">{isAdvanced ? "ADV:ON" : "ADV"}</span>
          </button>

          {/* Search */}
          <div className="relative" ref={searchRef}>
            <button onClick={() => { setSearchOpen(!searchOpen); setQuery(""); }}
              className="p-2 rounded-md hover:bg-muted/50 transition-colors click-pulse">
              {searchOpen ? <X className="h-4 w-4 text-primary" /> : <Search className="h-4 w-4 text-muted-foreground" />}
            </button>

            {searchOpen && (
              <div className="absolute right-0 top-12 w-[380px] glass-panel-accent rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="p-3 border-b border-border/30">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
                      placeholder="Search weapons, countries, types..."
                      className="w-full bg-card border border-border/50 rounded-lg pl-10 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40" />
                  </div>
                </div>

                {query.trim() && (
                  <div className="max-h-[400px] overflow-y-auto scrollbar-thin">
                    {results.weapons.length > 0 && (
                      <div className="p-2">
                        <div className="text-[9px] uppercase tracking-widest text-muted-foreground px-2 py-1 font-display">Weapons</div>
                        {results.weapons.map(w => (
                          <button key={w.id} onClick={() => goTo(`/weapon/${encodeURIComponent(w.name)}`)}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors text-left hover-lift">
                            <img src={getWeaponImage(w.category, w.type)} alt={w.type} className="w-8 h-8 object-contain opacity-60" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-foreground truncate">{w.name}</div>
                              <div className="text-[10px] text-muted-foreground">{getFlag(w.country)} {w.country} · {w.type}</div>
                            </div>
                            <div className="text-[10px] font-mono-tech text-primary">{w.power_level}/10</div>
                          </button>
                        ))}
                      </div>
                    )}
                    {results.countries.length > 0 && (
                      <div className="p-2 border-t border-border/20">
                        <div className="text-[9px] uppercase tracking-widest text-muted-foreground px-2 py-1 font-display">Countries</div>
                        {results.countries.map(c => (
                          <button key={c.country} onClick={() => goTo(`/country/${encodeURIComponent(c.country)}`)}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors text-left hover-lift">
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
                    Type to search {allWeapons.length}+ weapons and {countryMapData.length} countries
                  </div>
                )}
              </div>
            )}
          </div>

          {/* LIVE indicator */}
          <div className="flex items-center gap-2 text-xs font-mono-tech text-muted-foreground">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
            </span>
            <span className="hidden sm:inline font-display text-[10px] tracking-wider">LIVE</span>
          </div>

          {/* Mobile menu */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-md hover:bg-muted/50">
            <Menu className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/30 bg-background/95 backdrop-blur-xl">
          <div className="p-3 space-y-1">
            {navItems.map((item) => (
              <button key={item.label} onClick={() => goTo(item.path)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                  location.pathname === item.path
                    ? "text-primary bg-primary/10 border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}>
                {item.label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
