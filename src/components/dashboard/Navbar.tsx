import { Search, Shield } from "lucide-react";
import { useState } from "react";

const navItems = ["Home", "Explore", "Compare", "Rankings"];

const Navbar = () => {
  const [active, setActive] = useState("Home");

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-neon-cyan" />
          <span className="text-xl font-bold tracking-wider text-foreground">
            ARMORY<span className="text-neon-cyan">X</span>
          </span>
        </div>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`px-4 py-1.5 rounded text-sm font-semibold tracking-wide transition-all duration-200 ${
                active === item
                  ? "text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md hover:bg-muted/50 transition-colors">
            <Search className="h-4 w-4 text-muted-foreground" />
          </button>
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
