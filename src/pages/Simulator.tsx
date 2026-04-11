import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/dashboard/Navbar";
import { allWeapons } from "@/data/weapons";
import { getWeaponImage } from "@/lib/weapon-images";
import { Plus, Minus, DollarSign, Shield, Zap, Target, Radar, BarChart3, Trash2, ChevronDown, Sparkles } from "lucide-react";

const BUDGET_MAX = 500; // billions

const weaponCosts: Record<string, number> = {
  "Aircraft Carrier": 13, "Destroyer": 2, "Frigate": 1.2, "Submarine": 3.5, "Corvette": 0.5,
  "Fighter Jet": 0.1, "Stealth Fighter": 0.15, "Bomber": 0.55, "Attack Helicopter": 0.04,
  "Transport Helicopter": 0.025, "UCAV / Drone": 0.03, "Main Battle Tank": 0.01, "APC / IFV": 0.005,
  "ICBM": 0.05, "Cruise Missile": 0.002, "Ballistic Missile": 0.04, "Anti-Ship Missile": 0.003,
  "SAM System": 0.02, "MLRS / Rocket Artillery": 0.008, "Howitzer / Artillery": 0.004,
  "Nuclear Warhead": 0.03, "Patrol Boat": 0.15, "Amphibious Ship": 1.5,
};

const getCost = (type: string) => weaponCosts[type] || 0.5;

interface FleetItem {
  weaponId: string;
  quantity: number;
}

const Simulator = () => {
  const [fleet, setFleet] = useState<FleetItem[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");

  const categories = useMemo(() => ["All", ...new Set(allWeapons.map(w => w.category))], []);

  const filtered = useMemo(() => {
    let list = allWeapons;
    if (categoryFilter !== "All") list = list.filter(w => w.category === categoryFilter);
    if (search.trim()) list = list.filter(w => w.name.toLowerCase().includes(search.toLowerCase()));
    return list.slice(0, 50);
  }, [categoryFilter, search]);

  const addToFleet = (weaponId: string) => {
    setFleet(prev => {
      const existing = prev.find(f => f.weaponId === weaponId);
      if (existing) return prev.map(f => f.weaponId === weaponId ? { ...f, quantity: f.quantity + 1 } : f);
      return [...prev, { weaponId, quantity: 1 }];
    });
  };

  const removeFromFleet = (weaponId: string) => {
    setFleet(prev => {
      const existing = prev.find(f => f.weaponId === weaponId);
      if (!existing) return prev;
      if (existing.quantity <= 1) return prev.filter(f => f.weaponId !== weaponId);
      return prev.map(f => f.weaponId === weaponId ? { ...f, quantity: f.quantity - 1 } : f);
    });
  };

  const clearFleet = () => setFleet([]);

  const fleetStats = useMemo(() => {
    let totalCost = 0, totalPower = 0, totalUnits = 0;
    const categoryBreakdown: Record<string, number> = {};

    fleet.forEach(item => {
      const weapon = allWeapons.find(w => w.id === item.weaponId);
      if (!weapon) return;
      const cost = getCost(weapon.type) * item.quantity;
      totalCost += cost;
      totalPower += weapon.power_level * item.quantity;
      totalUnits += item.quantity;
      categoryBreakdown[weapon.category] = (categoryBreakdown[weapon.category] || 0) + item.quantity;
    });

    return { totalCost, totalPower, totalUnits, categoryBreakdown, budgetUsed: (totalCost / BUDGET_MAX) * 100 };
  }, [fleet]);

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      <Navbar />
      <div className="max-w-[1920px] mx-auto px-4 py-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="font-display text-2xl font-bold tracking-wider">
            <span className="text-primary">DEFENSE</span> SIMULATOR
          </h1>
          <p className="text-muted-foreground text-sm">Build your ultimate military fleet within a ${BUDGET_MAX}B budget</p>
        </motion.div>

        <div className="flex gap-4">
          {/* Arsenal browser */}
          <div className="flex-1 min-w-0">
            {/* Budget HUD */}
            <div className="glass-panel rounded-xl p-4 mb-4 border border-border/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-[9px] uppercase tracking-widest text-muted-foreground font-display">Budget Used</div>
                    <div className="text-xl font-bold font-mono-tech">
                      <span className={fleetStats.budgetUsed > 90 ? "text-destructive" : fleetStats.budgetUsed > 70 ? "text-neon-gold" : "text-primary"}>
                        ${fleetStats.totalCost.toFixed(1)}B
                      </span>
                      <span className="text-muted-foreground text-sm"> / ${BUDGET_MAX}B</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9px] uppercase tracking-widest text-muted-foreground font-display">Units</div>
                    <div className="text-xl font-bold font-mono-tech text-secondary">{fleetStats.totalUnits}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9px] uppercase tracking-widest text-muted-foreground font-display">Power</div>
                    <div className="text-xl font-bold font-mono-tech text-neon-gold">{fleetStats.totalPower.toFixed(0)}</div>
                  </div>
                </div>
                {fleet.length > 0 && (
                  <button onClick={clearFleet} className="text-xs text-destructive/70 hover:text-destructive flex items-center gap-1 transition-colors">
                    <Trash2 className="h-3 w-3" /> Clear Fleet
                  </button>
                )}
              </div>
              {/* Budget bar */}
              <div className="h-2 bg-card rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full transition-colors ${
                    fleetStats.budgetUsed > 100 ? "bg-destructive" : fleetStats.budgetUsed > 90 ? "bg-neon-gold" : "bg-primary"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(fleetStats.budgetUsed, 100)}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
              </div>
              {fleetStats.budgetUsed > 100 && (
                <p className="text-[10px] text-destructive mt-1 font-display tracking-wider animate-pulse">⚠ BUDGET EXCEEDED</p>
              )}
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search weapons..."
                className="bg-card/50 border border-border/30 rounded-lg px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/30 w-48"
              />
              {categories.map(cat => (
                <button key={cat} onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    categoryFilter === cat ? "bg-primary/10 text-primary border border-primary/20" : "bg-card/50 text-muted-foreground hover:text-foreground border border-border/20"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Weapons grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map(weapon => {
                const inFleet = fleet.find(f => f.weaponId === weapon.id);
                const cost = getCost(weapon.type);
                return (
                  <motion.div
                    key={weapon.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`glass-panel rounded-xl p-3 border transition-all cursor-pointer hover-lift ${
                      inFleet ? "border-primary/30 bg-primary/5" : "border-border/20"
                    }`}
                    onClick={() => addToFleet(weapon.id)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <img src={getWeaponImage(weapon.category, weapon.type)} alt={weapon.type} className="w-8 h-8 object-contain opacity-60" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold truncate">{weapon.name}</div>
                        <div className="text-[10px] text-muted-foreground">{weapon.country}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono-code text-neon-gold">${cost.toFixed(2)}B</span>
                      <span className="text-[10px] font-mono-tech text-primary">PWR {weapon.power_level}</span>
                    </div>
                    {inFleet && (
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/20">
                        <button onClick={(e) => { e.stopPropagation(); removeFromFleet(weapon.id); }}
                          className="p-1 rounded bg-card hover:bg-muted/30 transition-colors">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-bold text-primary">{inFleet.quantity}</span>
                        <button onClick={(e) => { e.stopPropagation(); addToFleet(weapon.id); }}
                          className="p-1 rounded bg-card hover:bg-muted/30 transition-colors">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Fleet summary sidebar */}
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <div className="glass-panel-accent rounded-xl p-4 border border-border/20 sticky top-20">
              <h3 className="font-display text-sm font-bold tracking-wider text-primary flex items-center gap-2 mb-4">
                <Shield className="h-4 w-4" /> YOUR FLEET
              </h3>

              {fleet.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Target className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-xs">Click weapons to add them to your fleet</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[60vh] overflow-y-auto scrollbar-thin">
                  {fleet.map(item => {
                    const weapon = allWeapons.find(w => w.id === item.weaponId);
                    if (!weapon) return null;
                    return (
                      <motion.div
                        key={item.weaponId}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center gap-2 p-2 rounded-lg bg-card/50 border border-border/20"
                      >
                        <img src={getWeaponImage(weapon.category, weapon.type)} alt={weapon.type} className="w-6 h-6 object-contain opacity-50" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-semibold truncate">{weapon.name}</div>
                          <div className="text-[9px] text-muted-foreground">×{item.quantity} · ${(getCost(weapon.type) * item.quantity).toFixed(2)}B</div>
                        </div>
                        <button onClick={() => removeFromFleet(weapon.id)}
                          className="p-1 rounded hover:bg-destructive/10 transition-colors">
                          <Minus className="h-3 w-3 text-destructive" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Category breakdown */}
              {fleet.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border/20 space-y-2">
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground font-display">Force Composition</div>
                  {Object.entries(fleetStats.categoryBreakdown).map(([cat, count]) => (
                    <div key={cat} className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">{cat}</span>
                      <span className="font-mono-tech text-foreground">{count}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Fleet score */}
              {fleet.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border/20 text-center">
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground font-display mb-1">Fleet Rating</div>
                  <div className="text-3xl font-bold font-display">
                    <span className={
                      fleetStats.totalPower > 100 ? "text-neon-gold" : fleetStats.totalPower > 50 ? "text-primary" : "text-muted-foreground"
                    }>
                      {fleetStats.totalPower > 200 ? "S+" : fleetStats.totalPower > 100 ? "A" : fleetStats.totalPower > 50 ? "B" : "C"}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {[...Array(Math.min(5, Math.ceil(fleetStats.totalPower / 40)))].map((_, i) => (
                      <Sparkles key={i} className="h-3 w-3 text-neon-gold" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
