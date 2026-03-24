import { Globe, Zap, Target, Gauge } from "lucide-react";
import { useEffect, useState } from "react";
import { allWeapons } from "@/data/weapons";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
}

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

const StatCard = ({ icon, label, value, suffix }: StatCardProps) => (
  <div className="glass-panel px-4 py-2.5 flex items-center gap-3 min-w-[180px] animate-pulse-glow" style={{ animationDuration: `${2 + Math.random() * 2}s` }}>
    <div className="text-neon-cyan">{icon}</div>
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="text-lg font-bold text-foreground leading-tight">
        <AnimatedNumber target={value} suffix={suffix} />
      </div>
    </div>
  </div>
);

const countries = new Set(allWeapons.map(w => w.country)).size;
const maxPower = Math.max(...allWeapons.map(w => w.power_level));
const maxSpeed = Math.max(...allWeapons.map(w => w.speed_mach));

const WorldMonitorBar = () => (
  <div className="w-full border-b border-border/30 bg-card/30 backdrop-blur-sm">
    <div className="container py-3 flex items-center gap-3 overflow-x-auto scrollbar-thin">
      <div className="text-[10px] uppercase tracking-[0.2em] text-neon-cyan font-semibold mr-2 whitespace-nowrap flex items-center gap-1.5">
        <Globe className="h-3.5 w-3.5" />
        WORLD MONITOR
      </div>
      <div className="flex gap-3">
        <StatCard icon={<Target className="h-4 w-4" />} label="Total Weapons" value={allWeapons.length} suffix="+" />
        <StatCard icon={<Globe className="h-4 w-4" />} label="Active Countries" value={countries} suffix="" />
        <StatCard icon={<Zap className="h-4 w-4" />} label="Most Powerful" value={maxPower} suffix="/10" />
        <StatCard icon={<Gauge className="h-4 w-4" />} label="Max Speed" value={maxSpeed} suffix=" Mach" />
      </div>
    </div>
  </div>
);

export default WorldMonitorBar;
