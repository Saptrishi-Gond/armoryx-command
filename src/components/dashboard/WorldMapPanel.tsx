import { countryMapData } from "@/data/weapons";
import { Globe, Crosshair } from "lucide-react";
import { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const countryCoords: Record<string, [number, number]> = {
  USA: [-95, 40], Russia: [90, 60], China: [105, 35], India: [78, 22],
  UK: [-2, 54], France: [2, 47], Israel: [35, 31], Pakistan: [70, 30],
  Turkey: [35, 39], "South Korea": [127, 36], Japan: [138, 36],
  Germany: [10, 51], Australia: [134, -25], Italy: [12, 42],
  Iran: [53, 32], Sweden: [18, 62], "North Korea": [127, 40],
  Norway: [10, 62], Poland: [20, 52], Brazil: [-51, -14],
  Taiwan: [121, 24], "Saudi Arabia": [45, 24], Egypt: [30, 27],
  Spain: [-4, 40], Singapore: [104, 1],
};

const MapChart = memo(({ onHover, onLeave, onClickCountry }: {
  onHover: (c: typeof countryMapData[0]) => void;
  onLeave: () => void;
  onClickCountry: (country: string) => void;
}) => (
  <ComposableMap
    projectionConfig={{ scale: 140, center: [20, 20] }}
    style={{ width: "100%", height: "100%" }}
  >
    <ZoomableGroup>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rpiKey || geo.properties?.name}
              geography={geo}
              fill="hsl(220 25% 12%)"
              stroke="hsl(186 100% 50% / 0.15)"
              strokeWidth={0.4}
              style={{
                default: { outline: "none" },
                hover: { fill: "hsl(186 100% 50% / 0.2)", outline: "none" },
                pressed: { outline: "none" },
              }}
            />
          ))
        }
      </Geographies>
      {countryMapData.map((c) => {
        const coords = countryCoords[c.country];
        if (!coords) return null;
        return (
          <Marker
            key={c.country}
            coordinates={coords}
            onMouseEnter={() => onHover(c)}
            onMouseLeave={onLeave}
            onClick={() => onClickCountry(c.country)}
          >
            <circle r={4} fill="hsl(186 100% 50%)" opacity={0.9} className="cursor-pointer" />
            <circle r={7} fill="none" stroke="hsl(186 100% 50%)" strokeWidth={0.5} opacity={0.5}>
              <animate attributeName="r" from="4" to="12" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
            </circle>
            <text
              textAnchor="middle"
              y={-10}
              style={{ fontFamily: "Share Tech Mono", fontSize: 7, fill: "hsl(190 100% 95% / 0.7)" }}
            >
              {c.code}
            </text>
          </Marker>
        );
      })}
    </ZoomableGroup>
  </ComposableMap>
));

MapChart.displayName = "MapChart";

const WorldMapPanel = () => {
  const [hoveredCountry, setHoveredCountry] = useState<typeof countryMapData[0] | null>(null);
  const navigate = useNavigate();

  return (
    <div className="glass-panel-accent p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-neon-cyan" />
          <h3 className="text-sm font-bold tracking-wide text-foreground">GLOBAL THREAT MAP</h3>
          <span className="text-[10px] font-mono-tech text-muted-foreground ml-2">{countryMapData.length} COUNTRIES TRACKED</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono-tech text-neon-green">
          <Crosshair className="h-3 w-3" />
          LIVE TRACKING
        </div>
      </div>

      <div className="relative w-full h-[320px] rounded-lg border border-border/30 bg-muted/10 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none z-10" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--neon-cyan) / 0.08) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--neon-cyan) / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />

        <MapChart
          onHover={setHoveredCountry}
          onLeave={() => setHoveredCountry(null)}
          onClickCountry={(country) => navigate(`/country/${encodeURIComponent(country)}`)}
        />

        <AnimatePresence>
          {hoveredCountry && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute bottom-3 right-3 glass-panel p-3 rounded-lg min-w-[180px] z-20 border border-neon-cyan/30"
            >
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
              <div className="text-[9px] text-neon-cyan mt-2 text-center">Click to view country</div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
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
