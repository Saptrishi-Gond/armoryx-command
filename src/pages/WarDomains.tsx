import Navbar from "@/components/dashboard/Navbar";
import { warDomains, weaponCounts, DomainNode } from "@/data/warDomains";
import { allWeapons } from "@/data/weapons";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, Crosshair, Globe, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdvancedMode } from "@/contexts/AdvancedMode";

const domainColorMap: Record<string, string> = {
  "Land Warfare": "text-neon-green",
  "Naval Warfare": "text-neon-cyan",
  "Air Warfare": "text-destructive",
  "Space Warfare": "text-purple-400",
  "Cyber Warfare": "text-foreground",
  "Electronic Warfare": "text-neon-gold",
  "Nuclear Warfare": "text-orange-400",
  "Drone & Autonomous Systems": "text-neon-cyan",
  "Missile Systems": "text-neon-gold",
  "Defense & Radar Systems": "text-neon-green",
};

const TreeNode = ({ node, depth = 0 }: { node: DomainNode; depth?: number }) => {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  const navigate = useNavigate();

  const relatedWeapons = allWeapons.filter(w =>
    w.category.toLowerCase().includes(node.name.toLowerCase().split(" ")[0]) ||
    w.type.toLowerCase().includes(node.name.toLowerCase().replace(/[()]/g, ""))
  ).slice(0, 3);

  return (
    <div className={`${depth > 0 ? "ml-4 border-l border-border/30 pl-3" : ""}`}>
      <button
        onClick={() => hasChildren ? setOpen(!open) : null}
        className={`w-full flex items-center gap-2 py-2 px-2 rounded-md text-left transition-all hover:bg-muted/30 group ${
          depth === 0 ? "text-base font-bold" : "text-sm"
        }`}
      >
        {hasChildren ? (
          open ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
        ) : (
          <span className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan/60" />
          </span>
        )}
        {node.icon && <span className="text-base">{node.icon}</span>}
        <span className={`${depth === 0 ? domainColorMap[node.name] || "text-foreground" : "text-foreground"}`}>
          {node.name}
        </span>
        {depth === 0 && weaponCounts[node.name] && (
          <span className="ml-auto text-[10px] font-mono-tech text-muted-foreground bg-muted/40 px-2 py-0.5 rounded">
            {weaponCounts[node.name]} systems
          </span>
        )}
      </button>

      {node.description && depth <= 1 && (
        <p className="text-[11px] text-muted-foreground ml-9 -mt-1 mb-1">{node.description}</p>
      )}

      {depth === 0 && relatedWeapons.length > 0 && open && (
        <div className="ml-9 mb-2 flex gap-2 flex-wrap">
          {relatedWeapons.map(w => (
            <button key={w.id} onClick={() => navigate(`/weapon/${encodeURIComponent(w.name)}`)}
              className="text-[10px] px-2 py-1 rounded bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 hover:bg-neon-cyan/20 transition-colors">
              {w.name}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {open && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {node.children!.map((child, i) => (
              <TreeNode key={i} node={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WarDomains = () => {
  const { isAdvanced } = useAdvancedMode();
  const totalSystems = Object.values(weaponCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel-accent p-6">
          <div className="flex items-center gap-3 mb-2">
            <Crosshair className="h-6 w-6 text-neon-cyan" />
            <h1 className="text-2xl font-bold text-foreground">
              WAR <span className="text-neon-cyan">DOMAINS</span>
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Complete military taxonomy covering all domains of modern warfare — from land and sea to cyber and space.
          </p>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2 text-xs font-mono-tech">
              <Globe className="h-3.5 w-3.5 text-neon-cyan" />
              <span className="text-muted-foreground">{warDomains.length} DOMAINS</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono-tech">
              <Shield className="h-3.5 w-3.5 text-neon-green" />
              <span className="text-muted-foreground">{totalSystems} SYSTEMS TRACKED</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {warDomains.map((domain, i) => (
            <motion.div
              key={domain.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`glass-panel p-4 ${isAdvanced ? "border-neon-green/30" : ""}`}
            >
              <TreeNode node={domain} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WarDomains;
