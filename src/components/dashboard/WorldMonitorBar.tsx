import { Globe, Zap, Target, Gauge, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { allWeapons } from "@/data/weapons";

const AnimatedNumber = ({ target, suffix }: { target: number; suffix: string }) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCurrent(Math.min(Math.round(increment * step), target));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <span className="font-mono-tech">{current.toLocaleString()}{suffix}</span>;
};

const countries = new Set(allWeapons.map(w => w.country)).size;
const maxPower = Math.max(...allWeapons.map(w => w.power_level));
const maxSpeed = Math.max(...allWeapons.map(w => w.speed_mach));
const totalVotes = allWeapons.reduce((s, w) => s + w.votes, 0);

const stats = [
  { icon: <Target className="h-4 w-4" />, label: "Weapons Tracked", value: allWeapons.length, suffix: "+" },
  { icon: <Globe className="h-4 w-4" />, label: "Active Nations", value: countries, suffix: "" },
  { icon: <Zap className="h-4 w-4" />, label: "Max Power", value: maxPower, suffix: "/10" },
  { icon: <Gauge className="h-4 w-4" />, label: "Top Speed", value: maxSpeed, suffix: " Mach" },
  { icon: <Shield className="h-4 w-4" />, label: "Total Votes", value: Math.round(totalVotes / 1000), suffix: "K" },
];

const WorldMonitorBar = () => (
  <div className="w-full border-b border-border/30 bg-card/30 backdrop-blur-sm">
    <div className="flex items-center gap-3 px-4 py-2.5 overflow-x-auto scrollbar-thin max-w-[1920px] mx-auto">
      <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-display font-bold mr-2 whitespace-nowrap flex items-center gap-1.5 flex-shrink-0">
        <Globe className="h-3.5 w-3.5" />
        WORLD MONITOR
      </div>
      <div className="flex gap-3">
        {stats.map((s, i) => (
          <div key={i} className="glass-panel px-4 py-2 flex items-center gap-3 min-w-[160px] animate-pulse-glow hover-glow" style={{ animationDuration: `${2 + i * 0.5}s` }}>
            <div className="text-primary">{s.icon}</div>
            <div>
              <div className="text-[9px] uppercase tracking-widest text-muted-foreground font-display">{s.label}</div>
              <div className="text-base font-bold text-foreground leading-tight">
                <AnimatedNumber target={s.value} suffix={s.suffix} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default WorldMonitorBar;
