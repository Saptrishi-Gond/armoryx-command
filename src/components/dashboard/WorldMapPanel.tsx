import { countryMapData } from "@/data/weapons";
import { Globe, Crosshair } from "lucide-react";
import { useState } from "react";

const WorldMapPanel = () => {
  const [hoveredCountry, setHoveredCountry] = useState<typeof countryMapData[0] | null>(null);

  // Approximate positions for countries on the map panel
  const countryPositions: Record<string, { top: string; left: string }> = {
    USA: { top: "35%", left: "20%" },
    Russia: { top: "25%", left: "65%" },
    China: { top: "40%", left: "72%" },
    India: { top: "50%", left: "65%" },
    UK: { top: "28%", left: "42%" },
    France: { top: "33%", left: "44%" },
    Israel: { top: "42%", left: "53%" },
    Pakistan: { top: "45%", left: "62%" },
  };

  return (
    <div className="glass-panel-accent p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-neon-cyan" />
          <h3 className="text-sm font-bold tracking-wide text-foreground">GLOBAL THREAT MAP</h3>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono-tech text-neon-green">
          <Crosshair className="h-3 w-3" />
          LIVE TRACKING
        </div>
      </div>

      {/* Map area */}
      <div className="relative w-full h-[280px] rounded-lg border border-border/30 bg-muted/10 overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--neon-cyan) / 0.15) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--neon-cyan) / 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }} />

        {/* Latitude lines */}
        <div className="absolute top-[25%] w-full h-px bg-neon-cyan/10" />
        <div className="absolute top-[50%] w-full h-px bg-neon-cyan/15" />
        <div className="absolute top-[75%] w-full h-px bg-neon-cyan/10" />

        {/* Country blips */}
        {countryMapData.map((c) => {
          const pos = countryPositions[c.country];
          if (!pos) return null;
          return (
            <div
              key={c.country}
              className="absolute cursor-pointer group"
              style={{ top: pos.top, left: pos.left }}
              onMouseEnter={() => setHoveredCountry(c)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              <div className="relative">
                <div className="h-3 w-3 rounded-full bg-neon-cyan animate-ping opacity-40" />
                <div className="absolute inset-0 h-3 w-3 rounded-full bg-neon-cyan" />
              </div>
              <span className="absolute -top-1 left-5 text-[10px] font-mono-tech text-foreground/70 whitespace-nowrap">
                {c.code} {c.country}
              </span>
            </div>
          );
        })}

        {/* Hover tooltip */}
        {hoveredCountry && (
          <div className="absolute bottom-3 right-3 glass-panel p-3 rounded-lg min-w-[180px] z-10 border border-neon-cyan/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{hoveredCountry.code}</span>
              <span className="text-sm font-bold text-foreground">{hoveredCountry.country}</span>
              <span className="text-[10px] font-mono-tech text-neon-gold ml-auto">#{hoveredCountry.rank}</span>
            </div>
            <div className="text-xs font-mono-tech text-muted-foreground mb-1">
              Total: <span className="text-foreground">{hoveredCountry.weapons.toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <span className="text-muted-foreground">✈️ Air: <span className="text-foreground">{hoveredCountry.air}</span></span>
              <span className="text-muted-foreground">🚢 Naval: <span className="text-foreground">{hoveredCountry.naval}</span></span>
              <span className="text-muted-foreground">🤖 Drones: <span className="text-foreground">{hoveredCountry.drones}</span></span>
              <span className="text-muted-foreground">☢️ Nuclear: <span className="text-foreground">{hoveredCountry.nuclear}</span></span>
            </div>
          </div>
        )}

        {/* Scan line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent"
            style={{ animation: "scanline 4s linear infinite" }}
          />
        </div>
      </div>
    </div>
  );
};

export default WorldMapPanel;
