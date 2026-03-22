import { categories } from "@/data/weapons";
import { useState } from "react";

const CategorySidebar = () => {
  const [active, setActive] = useState("Missiles");

  return (
    <div className="w-[200px] flex-shrink-0 hidden lg:flex flex-col gap-1 glass-panel p-3 h-fit sticky top-[60px]">
      <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold px-2 mb-2">
        Categories
      </div>
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => setActive(cat.name)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold tracking-wide transition-all duration-200 group ${
            active === cat.name
              ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 glow-cyan"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/30 border border-transparent"
          }`}
        >
          <span className="text-lg">{cat.icon}</span>
          <span className="flex-1 text-left">{cat.name}</span>
          <span className={`text-[10px] font-mono-tech ${
            active === cat.name ? "text-neon-cyan/70" : "text-muted-foreground/50"
          }`}>
            {cat.count}
          </span>
        </button>
      ))}
      
      {/* Mini stats */}
      <div className="mt-4 pt-3 border-t border-border/30 space-y-3 px-2">
        <div>
          <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Total Tracked</div>
          <div className="text-lg font-bold font-mono-tech text-foreground">1,247</div>
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Last Update</div>
          <div className="text-xs font-mono-tech text-neon-green">00:14:32 UTC</div>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
