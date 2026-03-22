import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/worldarmory-logo.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Explore", path: "/explore" },
  { label: "Compare", path: "/compare" },
  { label: "Rankings", path: "/rankings" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

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
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`px-4 py-1.5 rounded text-sm font-semibold tracking-wide transition-all duration-200 ${
                location.pathname === item.path
                  ? "text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-md hover:bg-muted/50 transition-colors">
              <Search className="h-4 w-4 text-muted-foreground" />
            </button>
            {searchOpen && (
              <input autoFocus placeholder="Search weapons..."
                className="absolute right-10 top-1/2 -translate-y-1/2 w-48 bg-card border border-border/50 rounded-md px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-cyan/40 transition-all" />
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
