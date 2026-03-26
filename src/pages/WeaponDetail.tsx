import Navbar from "@/components/dashboard/Navbar";
import { allWeapons, getFlag } from "@/data/weapons";
import { useVotes } from "@/hooks/use-votes";
import { getWeaponImage } from "@/lib/weapon-images";
import { useAdvancedMode } from "@/contexts/AdvancedMode";
import { ChevronUp, ArrowLeft, Target, Gauge, Zap, Shield, Calendar, Layers, TrendingUp, Globe, Swords, Award } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, PieChart, Pie } from "recharts";

const defaultVotes = Object.fromEntries(allWeapons.map(w => [w.name, w.votes]));

const WeaponDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { vote, hasVoted, getVotes } = useVotes(defaultVotes);
  const { isAdvanced } = useAdvancedMode();

  const weapon = allWeapons.find(w => w.name === decodeURIComponent(name || ""));
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
    { metric: "Range", value: Math.min((weapon.range_km / 22000) * 100, 100) },
    { metric: "Speed", value: Math.min((weapon.speed_mach / 27) * 100, 100) },
    { metric: "Power", value: weapon.power_level * 10 },
    { metric: "Votes", value: Math.min((getVotes(weapon.name) / 15000) * 100, 100) },
    { metric: "Trend", value: Math.min((weapon.trend / 15) * 100, 100) },
  ];

  const related = allWeapons.filter(w => w.name !== weapon.name && (w.type === weapon.type || (w.category === weapon.category && w.country === weapon.country))).slice(0, 6);
  const sameCategory = allWeapons.filter(w => w.category === weapon.category);
  const globalRank = [...allWeapons].sort((a, b) => b.power_level - a.power_level).findIndex(w => w.id === weapon.id) + 1;
  const categoryRank = [...sameCategory].sort((a, b) => b.power_level - a.power_level).findIndex(w => w.id === weapon.id) + 1;
  const countryWeapons = allWeapons.filter(w => w.country === weapon.country);
  const countryRank = [...countryWeapons].sort((a, b) => b.power_level - a.power_level).findIndex(w => w.id === weapon.id) + 1;

  const categoryBreakdown = sameCategory.reduce((acc, w) => {
    acc[w.type] = (acc[w.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryBreakdown).map(([name, value]) => ({ name, value }));
  const pieColors = ["hsl(186 100% 50%)", "hsl(156 100% 50%)", "hsl(45 100% 55%)", "hsl(0 84% 60%)", "hsl(210 10% 72%)", "hsl(30 70% 45%)", "hsl(270 60% 60%)", "hsl(200 80% 50%)"];

  const statsCards = [
    { icon: Target, label: "Range", value: `${weapon.range_km.toLocaleString()} km`, color: "text-neon-cyan", detail: weapon.range_km > 5000 ? "Strategic" : weapon.range_km > 500 ? "Theater" : "Tactical" },
    { icon: Gauge, label: "Speed", value: `Mach ${weapon.speed_mach}`, color: "text-neon-green", detail: weapon.speed_mach > 5 ? "Hypersonic" : weapon.speed_mach > 1 ? "Supersonic" : "Subsonic" },
    { icon: Zap, label: "Power", value: `${weapon.power_level}/10`, color: "text-neon-gold", detail: weapon.power_level >= 9 ? "Elite" : weapon.power_level >= 7 ? "Advanced" : "Standard" },
    { icon: Shield, label: "Type", value: weapon.type, color: "text-foreground", detail: weapon.category },
    { icon: Calendar, label: "Year", value: String(weapon.year), color: "text-foreground", detail: weapon.year >= 2020 ? "Next-Gen" : weapon.year >= 2000 ? "Modern" : "Legacy" },
    { icon: Layers, label: "Platform", value: weapon.platform.join(", "), color: "text-foreground", detail: `${weapon.platform.length} domain${weapon.platform.length > 1 ? "s" : ""}` },
    { icon: TrendingUp, label: "Trend", value: `${weapon.trend > 0 ? "+" : ""}${weapon.trend}%`, color: weapon.trend > 0 ? "text-neon-green" : "text-destructive", detail: weapon.trend > 5 ? "Surging" : weapon.trend > 0 ? "Rising" : "Declining" },
    { icon: Award, label: "Global Rank", value: `#${globalRank}`, color: "text-neon-gold", detail: `of ${allWeapons.length}` },
  ];

  const accentColor = isAdvanced ? "text-neon-green" : "text-neon-cyan";
  const accentBg = isAdvanced ? "bg-neon-green" : "bg-neon-cyan";

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel-accent p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 opacity-5">
            <img src={getWeaponImage(weapon.category, weapon.type)} alt="" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-start justify-between flex-wrap gap-4 relative z-10">
            <div className="flex items-start gap-5">
              <div className="relative">
                <img src={getWeaponImage(weapon.category, weapon.type)} alt={weapon.type} className="w-24 h-24 object-contain opacity-80" width={96} height={96} />
                <div className={`absolute -bottom-1 -right-1 text-[9px] font-mono-tech ${accentBg}/20 ${accentColor} px-1.5 py-0.5 rounded border border-current/30`}>
                  {weapon.category}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-3xl font-bold text-neon-gold">#{globalRank}</span>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{weapon.name}</h1>
                    <p className="text-sm text-muted-foreground">{getFlag(weapon.country)} {weapon.country} · {weapon.category} · {weapon.type}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className={`text-[10px] px-2 py-0.5 rounded ${accentBg}/10 ${accentColor} border border-current/20`}>
                    #{categoryRank} in {weapon.category}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-neon-gold/10 text-neon-gold border border-neon-gold/20">
                    #{countryRank} in {weapon.country}
                  </span>
                  {weapon.trend > 5 && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-neon-green/10 text-neon-green border border-neon-green/20 animate-pulse">
                      🔥 TRENDING +{weapon.trend}%
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button onClick={() => vote(weapon.name)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold transition-all ${hasVoted(weapon.name)
                ? `${accentBg}/20 ${accentColor} glow-cyan border border-current/30`
                : "text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/10 border border-border/30"
              }`}>
              <ChevronUp className="h-5 w-5" />
              <span className="font-mono-tech text-lg">{getVotes(weapon.name).toLocaleString()}</span>
              <span className="text-[10px] opacity-60">VOTES</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {statsCards.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass-panel p-4 group hover:border-neon-cyan/30 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className={`h-4 w-4 ${s.color}`} />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</span>
              </div>
              <div className="text-lg font-bold font-mono-tech text-foreground">{s.value}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{s.detail}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-panel-accent p-5">
            <h3 className="text-xs font-bold tracking-wide text-foreground uppercase mb-3">Performance Radar</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(210 20% 18%)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(210 15% 55%)", fontSize: 10 }} />
                <Radar dataKey="value" stroke={isAdvanced ? "hsl(120 100% 45%)" : "hsl(186 100% 50%)"} fill={isAdvanced ? "hsl(120 100% 45%)" : "hsl(186 100% 50%)"} fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-panel-accent p-5">
            <h3 className="text-xs font-bold tracking-wide text-foreground uppercase mb-3">Stat Breakdown</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={radarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 15%)" />
                <XAxis dataKey="metric" tick={{ fill: "hsl(210 15% 55%)", fontSize: 9 }} axisLine={false} />
                <YAxis tick={{ fill: "hsl(210 15% 55%)", fontSize: 9 }} axisLine={false} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {radarData.map((_, i) => (
                    <Cell key={i} fill={pieColors[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-panel-accent p-5">
            <h3 className="text-xs font-bold tracking-wide text-foreground uppercase mb-3">{weapon.category} Types</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {pieData.slice(0, 5).map((d, i) => (
                <span key={d.name} className="text-[9px] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: pieColors[i % pieColors.length] }} />
                  {d.name} ({d.value})
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Intelligence Brief + Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="glass-panel p-5">
            <h3 className="text-xs font-bold tracking-wide text-foreground uppercase mb-3 flex items-center gap-2">
              <Globe className="h-3.5 w-3.5 text-neon-cyan" /> Intelligence Brief
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              The <strong>{weapon.name}</strong> is a {weapon.type.toLowerCase()} {weapon.category.toLowerCase()} system operated by {weapon.country}, first deployed in {weapon.year}.
              With a maximum range of {weapon.range_km.toLocaleString()} km and a top speed of Mach {weapon.speed_mach},
              it ranks <strong>#{globalRank}</strong> globally with a power rating of {weapon.power_level}/10.
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed mt-3">
              This system operates on {weapon.platform.join(" and ").toLowerCase()} platform{weapon.platform.length > 1 ? "s" : ""} and
              {weapon.trend > 5 ? " is currently one of the most trending weapons in global defense discussions." :
               weapon.trend > 0 ? " has been gaining moderate interest in global defense circles." :
               " maintains a stable position in global defense assessments."}
              {" "}Within {weapon.country}'s arsenal, it ranks #{countryRank} out of {countryWeapons.length} tracked systems.
            </p>
          </div>

          <div className="glass-panel p-5">
            <h3 className="text-xs font-bold tracking-wide text-foreground uppercase mb-3 flex items-center gap-2">
              <Swords className="h-3.5 w-3.5 text-neon-gold" /> Tactical Specifications
            </h3>
            <div className="space-y-3">
              {[
                { label: "Operational Range", value: `${weapon.range_km.toLocaleString()} km`, bar: Math.min((weapon.range_km / 22000) * 100, 100) },
                { label: "Maximum Speed", value: `Mach ${weapon.speed_mach}`, bar: Math.min((weapon.speed_mach / 27) * 100, 100) },
                { label: "Destructive Power", value: `${weapon.power_level}/10`, bar: weapon.power_level * 10 },
                { label: "Community Score", value: getVotes(weapon.name).toLocaleString(), bar: Math.min((getVotes(weapon.name) / 15000) * 100, 100) },
              ].map(spec => (
                <div key={spec.label}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-mono-tech text-foreground">{spec.value}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${spec.bar}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${isAdvanced ? "bg-neon-green" : "bg-neon-cyan"}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Country context */}
        <div className="glass-panel p-5">
          <h3 className="text-xs font-bold tracking-wide text-foreground uppercase mb-3">
            {getFlag(weapon.country)} {weapon.country} Arsenal Overview
          </h3>
          <div className="flex gap-4 flex-wrap">
            {Object.entries(countryWeapons.reduce((acc, w) => {
              acc[w.category] = (acc[w.category] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)).map(([cat, count]) => (
              <div key={cat} className={`text-center px-4 py-2 rounded-lg ${cat === weapon.category ? `${accentBg}/15 border border-current/20` : "bg-muted/30"}`}>
                <div className="text-lg font-bold font-mono-tech text-foreground">{count}</div>
                <div className="text-[10px] text-muted-foreground">{cat}</div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate(`/country/${encodeURIComponent(weapon.country)}`)}
            className={`mt-3 text-xs ${accentColor} hover:underline`}>
            View full {weapon.country} profile →
          </button>
        </div>

        {/* Related Weapons */}
        {related.length > 0 && (
          <div>
            <h3 className="text-sm font-bold tracking-wide text-foreground uppercase mb-3">Related Systems</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {related.map(w => (
                <motion.div key={w.id} whileHover={{ scale: 1.02 }}
                  onClick={() => navigate(`/weapon/${encodeURIComponent(w.name)}`)}
                  className="glass-panel p-3 rounded-lg cursor-pointer hover:bg-muted/30 transition-all border hover:border-neon-cyan/30">
                  <img src={getWeaponImage(w.category, w.type)} alt={w.type} className="w-10 h-10 object-contain opacity-50 mb-2" loading="lazy" width={40} height={40} />
                  <div className="text-sm font-bold text-foreground truncate">{w.name}</div>
                  <div className="text-[10px] text-muted-foreground">{getFlag(w.country)} {w.country}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-[10px] font-mono-tech ${accentColor}`}>{w.type}</span>
                    <span className="text-[10px] font-mono-tech text-muted-foreground">{w.power_level}/10</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeaponDetail;
