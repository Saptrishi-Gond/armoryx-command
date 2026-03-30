import { ArrowRightLeft } from "lucide-react";

const QuickCompare = () => (
  <div className="glass-panel p-4">
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div className="flex items-center gap-2">
        <ArrowRightLeft className="h-4 w-4 text-neon-cyan" />
        <h3 className="text-sm font-display font-bold tracking-wide text-foreground">QUICK COMPARE</h3>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {/* Weapon A */}
        <button className="glass-panel px-4 py-2 rounded-md text-xs text-muted-foreground hover:text-foreground hover:border-neon-cyan/30 transition-all min-w-[160px] text-left">
          Select Weapon A ▾
        </button>

        <span className="text-neon-cyan font-bold text-lg">VS</span>

        {/* Weapon B */}
        <button className="glass-panel px-4 py-2 rounded-md text-xs text-muted-foreground hover:text-foreground hover:border-neon-cyan/30 transition-all min-w-[160px] text-left">
          Select Weapon B ▾
        </button>

        <button className="px-4 py-2 rounded-md text-xs font-bold tracking-wider bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan/25 transition-all active:scale-95">
          COMPARE NOW
        </button>
      </div>
    </div>
  </div>
);

export default QuickCompare;
