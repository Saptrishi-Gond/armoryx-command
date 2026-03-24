import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
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

const AnalyticsPanels = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    <div className="glass-panel-accent p-4">
      <h3 className="text-xs font-bold tracking-wide text-foreground uppercase mb-1">Performance Radar — Top 5</h3>
      <p className="text-[10px] text-muted-foreground mb-3 uppercase tracking-wider">Range · Speed · Power</p>
      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="hsl(210 20% 18%)" />
          <PolarAngleAxis dataKey="name" tick={{ fill: "hsl(210 15% 55%)", fontSize: 10 }} />
          <Radar name="Range" dataKey="range" stroke="hsl(186 100% 50%)" fill="hsl(186 100% 50%)" fillOpacity={0.15} />
          <Radar name="Speed" dataKey="speed" stroke="hsl(156 100% 50%)" fill="hsl(156 100% 50%)" fillOpacity={0.1} />
          <Radar name="Power" dataKey="power" stroke="hsl(45 100% 55%)" fill="hsl(45 100% 55%)" fillOpacity={0.1} />
        </RadarChart>
      </ResponsiveContainer>
    </div>

    <div className="glass-panel-accent p-4">
      <h3 className="text-xs font-bold tracking-wide text-foreground uppercase mb-1">Range & Speed Comparison</h3>
      <p className="text-[10px] text-muted-foreground mb-3 uppercase tracking-wider">Top 6 by range</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={barData} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 15%)" />
          <XAxis dataKey="name" tick={{ fill: "hsl(210 15% 55%)", fontSize: 9 }} axisLine={false} />
          <YAxis tick={{ fill: "hsl(210 15% 55%)", fontSize: 9 }} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: "hsl(220 25% 10%)",
              border: "1px solid hsl(210 20% 18%)",
              borderRadius: 6,
              fontSize: 11,
              color: "hsl(190 100% 95%)",
            }}
          />
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
  </div>
);

export default AnalyticsPanels;
