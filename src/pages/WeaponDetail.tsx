import Navbar from "@/components/dashboard/Navbar";
import { topWeapons } from "@/data/weapons";
import { useVotes } from "@/hooks/use-votes";
import { ChevronUp, ArrowLeft, Target, Gauge, Zap, Shield } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";

const defaultVotes = Object.fromEntries(topWeapons.map(w => [w.name, w.votes]));

const WeaponDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { vote, hasVoted, getVotes } = useVotes(defaultVotes);

  const weapon = topWeapons.find(w => w.name === decodeURIComponent(name || ""));
  if (!weapon) {
    return (
      <div className="min-h-screen bg-background bg-grid-pattern">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <p className="text-lg text-muted-foreground">Weapon not found.</p>
          <button onClick={() => navigate("/")} className="mt-4 text-neon-cyan text-sm hover:underline">← Back to Dashboard</button>
        </div>
      </div>
    );
  }

  const radarData = [
    { metric: "Range", value: (weapon.range / 18000) * 100 },
    { metric: "Speed", value: (weapon.speed / 27) * 100 },
    { metric: "Power", value: weapon.power },
    { metric: "Votes", value: Math.min((getVotes(weapon.name) / 15000) * 100, 100) },
  ];

  const related = topWeapons.filter(w => w.name !== weapon.name && (w.category === weapon.category || w.country === weapon.country)).slice(0, 4);

  const statsCards = [
    { icon: Target, label: "Range", value: `${weapon.range.toLocaleString()} km`, color: "text-neon-cyan" },
    { icon: Gauge, label: "Speed", value: `Mach ${weapon.speed}`, color: "text-neon-green" },
    { icon: Zap, label: "Power", value: `${weapon.power}/100`, color: "text-neon-gold" },
    { icon: Shield, label: "Category", value: weapon.category, color: "text-foreground" },
  ];

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {/* Header */}
        <div className="glass-panel-accent p-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-neon-gold">#{weapon.rank}</span>
                <h1 className="text-2xl font-bold text-foreground">{weapon.name}</h1>
              </div>
              <p className="text-sm text-muted-foreground">{weapon.countryCode} {weapon.country} · {weapon.category}</p>
            </div>
            <button onClick={() => vote(weapon.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${hasVoted(weapon.name) ? "bg-neon-cyan/20 text-neon-cyan glow-cyan border border-neon-cyan/30" : "text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/10 border border-border/30"}`}>
              <ChevronUp className="h-5 w-5" />
              <span className="font-mono-tech">{getVotes(weapon.name).toLocaleString()} votes</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {statsCards.map((s) => (
            <div key={s.label} className="glass-panel p-4 text-center">
              <s.icon className={`h-5 w-5 mx-auto mb-2 ${s.color}`} />
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{s.label}</div>
              <div className="text-lg font-bold font-mono-tech text-foreground">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="glass-panel-accent p-5">
            <h3 className="text-xs font-bold tracking-wide text-foreground uppercase mb-3">Performance Profile</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(210 20% 18%)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(210 15% 55%)", fontSize: 10 }} />
                <Radar dataKey="value" stroke="hsl(186 100% 50%)" fill="hsl(186 100% 50%)" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-panel-accent p-5">
            <h3 className="text-xs font-bold tracking-wide text-foreground uppercase mb-3">Stat Breakdown</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={radarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 15%)" />
                <XAxis dataKey="metric" tick={{ fill: "hsl(210 15% 55%)", fontSize: 10 }} axisLine={false} />
                <YAxis tick={{ fill: "hsl(210 15% 55%)", fontSize: 9 }} axisLine={false} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {radarData.map((_, i) => (
                    <Cell key={i} fill={["hsl(186 100% 50%)", "hsl(156 100% 50%)", "hsl(45 100% 55%)", "hsl(186 80% 60%)"][i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Description */}
        <div className="glass-panel p-5">
          <h3 className="text-xs font-bold tracking-wide text-foreground uppercase mb-2">Intelligence Brief</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">
            The {weapon.name} is a {weapon.category.toLowerCase()}-class weapon system operated by {weapon.country}.
            With a maximum range of {weapon.range.toLocaleString()} km and a top speed of Mach {weapon.speed},
            it ranks #{weapon.rank} in the global weapons power index with a power rating of {weapon.power}/100.
            This system represents one of the most significant military assets in the {weapon.country} defense arsenal.
          </p>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h3 className="text-sm font-bold tracking-wide text-foreground uppercase mb-3">Related Weapons</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {related.map(w => (
                <div key={w.name} onClick={() => navigate(`/weapon/${encodeURIComponent(w.name)}`)}
                  className="glass-panel p-3 rounded-lg cursor-pointer hover:bg-muted/30 transition-all border hover:border-neon-cyan/30">
                  <div className="text-sm font-bold text-foreground">{w.name}</div>
                  <div className="text-[10px] text-muted-foreground">{w.countryCode} {w.country}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] font-mono-tech text-neon-cyan">{w.category}</span>
                    <span className="text-[10px] font-mono-tech text-muted-foreground">{w.power}/100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeaponDetail;
