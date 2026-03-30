import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, LineChart, Line, Legend } from "recharts";
import { allWeapons } from "@/data/weapons";

const top5 = [...allWeapons].sort((a, b) => b.power_level - a.power_level).slice(0, 5);

const radarData = top5.map((w) => ({
  name: w.name.length > 12 ? w.name.split(" ")[0] : w.name,
  range: Math.round((w.range_km / 22000) * 100),
  speed: Math.round((w.speed_mach / 27) * 100),
  power: w.power_level * 10,
}));

const top6 = [...allWeapons].sort((a, b) => b.range_km - a.range_km).slice(0, 6);
const barData = top6.map((w) => ({
  name: w.name.length > 10 ? w.name.split(" ").slice(-1)[0] : w.name,
  range: w.range_km,
  speed: w.speed_mach * 100,
}));

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const voteGrowthData = months.map((m, i) => ({
  month: m,
  missiles: Math.round(15000 + i * 2200 + (i * 1337) % 3000),
  aircraft: Math.round(12000 + i * 1800 + (i * 997) % 2500),
  drones: Math.round(8000 + i * 3000 + (i * 1543) % 4000),
  naval: Math.round(10000 + i * 1500 + (i * 1123) % 2000),
}));

const tooltipStyle = {
  background: "hsl(220 25% 10%)",
  border: "1px solid hsl(210 20% 18%)",
  borderRadius: 6,
  fontSize: 11,
  color: "hsl(190 100% 95%)",
};

const AnalyticsPanels = () => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 px-1">
      <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-display font-bold">Analytics & Intelligence</span>
      <div className="flex-1 h-px bg-border/30" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Radar */}
      <div className="glass-panel-accent p-4 hover-glow">
        <h3 className="text-xs font-display font-bold tracking-wide text-foreground uppercase mb-1">Performance Radar</h3>
        <p className="text-[10px] text-muted-foreground mb-3 uppercase tracking-wider">Top 5 · Range · Speed · Power</p>
        <ResponsiveContainer width="100%" height={220}>
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="hsl(210 20% 18%)" />
            <PolarAngleAxis dataKey="name" tick={{ fill: "hsl(210 15% 55%)", fontSize: 9 }} />
            <Radar name="Range" dataKey="range" stroke="hsl(186 100% 50%)" fill="hsl(186 100% 50%)" fillOpacity={0.15} />
            <Radar name="Speed" dataKey="speed" stroke="hsl(156 100% 50%)" fill="hsl(156 100% 50%)" fillOpacity={0.1} />
            <Radar name="Power" dataKey="power" stroke="hsl(45 100% 55%)" fill="hsl(45 100% 55%)" fillOpacity={0.1} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Bar */}
      <div className="glass-panel-accent p-4 hover-glow">
        <h3 className="text-xs font-display font-bold tracking-wide text-foreground uppercase mb-1">Range vs Speed</h3>
        <p className="text-[10px] text-muted-foreground mb-3 uppercase tracking-wider">Top 6 by range</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={barData} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 15%)" />
            <XAxis dataKey="name" tick={{ fill: "hsl(210 15% 55%)", fontSize: 9 }} axisLine={false} />
            <YAxis tick={{ fill: "hsl(210 15% 55%)", fontSize: 9 }} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="range" name="Range (km)" radius={[3, 3, 0, 0]}>
              {barData.map((_, i) => (
                <Cell key={i} fill={`hsl(186 100% ${50 - i * 5}%)`} />
              ))}
            </Bar>
            <Bar dataKey="speed" name="Speed (×100)" radius={[3, 3, 0, 0]}>
              {barData.map((_, i) => (
                <Cell key={i} fill={`hsl(156 100% ${50 - i * 5}%)`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="glass-panel-accent p-4 hover-glow">
        <h3 className="text-xs font-display font-bold tracking-wide text-foreground uppercase mb-1">Vote Growth</h3>
        <p className="text-[10px] text-muted-foreground mb-3 uppercase tracking-wider">Category trends over time</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={voteGrowthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 15%)" />
            <XAxis dataKey="month" tick={{ fill: "hsl(210 15% 55%)", fontSize: 9 }} axisLine={false} />
            <YAxis tick={{ fill: "hsl(210 15% 55%)", fontSize: 9 }} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            <Line type="monotone" dataKey="missiles" stroke="hsl(186 100% 50%)" strokeWidth={2} dot={false} name="Missiles" />
            <Line type="monotone" dataKey="aircraft" stroke="hsl(156 100% 50%)" strokeWidth={2} dot={false} name="Aircraft" />
            <Line type="monotone" dataKey="drones" stroke="hsl(45 100% 55%)" strokeWidth={2} dot={false} name="Drones" />
            <Line type="monotone" dataKey="naval" stroke="hsl(210 10% 72%)" strokeWidth={2} dot={false} name="Naval" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default AnalyticsPanels;
