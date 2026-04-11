import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/dashboard/Navbar";
import { MessageSquare, Users, TrendingUp, Star, ThumbsUp, Clock, Send, Hash, Bell, Pin, ChevronRight, Flame, Award, Shield } from "lucide-react";

const channels = [
  { id: "general", name: "general", icon: Hash, unread: 12 },
  { id: "missiles", name: "missile-intel", icon: Hash, unread: 5 },
  { id: "naval", name: "naval-ops", icon: Hash, unread: 0 },
  { id: "air", name: "air-warfare", icon: Hash, unread: 3 },
  { id: "drones", name: "drone-tech", icon: Hash, unread: 8 },
  { id: "nuclear", name: "nuclear-deterrence", icon: Hash, unread: 1 },
  { id: "cyber", name: "cyber-warfare", icon: Hash, unread: 0 },
];

const mockMessages = [
  { id: 1, user: "GhostOp-7", avatar: "🎖️", role: "Admin", time: "14:32", content: "The S-500 Prometheus test was confirmed by satellite imagery. Russia's air defense just went up a tier.", likes: 24, replies: 8 },
  { id: 2, user: "NavalHawk", avatar: "⚓", role: "Analyst", time: "14:35", content: "Anyone tracking the Gerald R. Ford's deployment to the Mediterranean? Third carrier group this quarter.", likes: 18, replies: 12 },
  { id: 3, user: "DroneKing", avatar: "🛸", role: "Member", time: "14:38", content: "Bayraktar Kizilelma just completed its first supersonic test flight. Turkey is seriously leveling up their drone game. 🔥", likes: 31, replies: 15 },
  { id: 4, user: "SilentStrike", avatar: "🎯", role: "Moderator", time: "14:42", content: "Hot take: hypersonic missiles make aircraft carriers obsolete. The DF-21D 'carrier killer' changes everything. Thoughts?", likes: 45, replies: 28 },
  { id: 5, user: "ArcticWolf", avatar: "🐺", role: "Analyst", time: "14:45", content: "India's BrahMos-II development is ahead of schedule. Mach 7 cruise missile incoming. This changes the Indo-Pacific calculus entirely.", likes: 22, replies: 9 },
  { id: 6, user: "VanguardAI", avatar: "🤖", role: "Bot", time: "14:50", content: "📊 Daily Intel Summary: 3 new weapons detected, 2 military exercises ongoing, 1 satellite launch confirmed. Full report → /rankings", likes: 15, replies: 3 },
];

const trendingTopics = [
  { tag: "HypersonicRace", posts: 342, trend: "+28%" },
  { tag: "DroneSwarms", posts: 256, trend: "+15%" },
  { tag: "NuclearDeterrence", posts: 198, trend: "+8%" },
  { tag: "NavalSupremacy", posts: 167, trend: "+12%" },
];

const topContributors = [
  { name: "SilentStrike", avatar: "🎯", points: 4820, rank: 1 },
  { name: "GhostOp-7", avatar: "🎖️", points: 3950, rank: 2 },
  { name: "DroneKing", avatar: "🛸", points: 3210, rank: 3 },
  { name: "NavalHawk", avatar: "⚓", points: 2890, rank: 4 },
];

const roleColor: Record<string, string> = {
  Admin: "text-destructive",
  Moderator: "text-neon-gold",
  Analyst: "text-primary",
  Bot: "text-secondary",
  Member: "text-muted-foreground",
};

const Community = () => {
  const [activeChannel, setActiveChannel] = useState("general");
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      <Navbar />
      <div className="flex max-w-[1920px] mx-auto" style={{ height: "calc(100vh - 64px)" }}>
        {/* Channel sidebar */}
        <div className="w-60 border-r border-border/20 bg-card/30 flex-shrink-0 flex flex-col">
          <div className="p-4 border-b border-border/20">
            <h2 className="font-display text-sm font-bold tracking-wider text-primary flex items-center gap-2">
              <Shield className="h-4 w-4" />
              NEURAL HUB
            </h2>
            <p className="text-[10px] text-muted-foreground mt-1">Secure Intelligence Network</p>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-0.5">
            <div className="text-[9px] uppercase tracking-widest text-muted-foreground px-3 py-2 font-display">Channels</div>
            {channels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(ch.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                  activeChannel === ch.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                }`}
              >
                <ch.icon className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1 text-left truncate">{ch.name}</span>
                {ch.unread > 0 && (
                  <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-bold">
                    {ch.unread}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="p-3 border-t border-border/20">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-card/50">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">🎖️</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold truncate">Operator</div>
                <div className="text-[10px] text-secondary">● Online</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Channel header */}
          <div className="h-12 border-b border-border/20 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold text-sm">{channels.find(c => c.id === activeChannel)?.name}</span>
              <span className="text-[10px] text-muted-foreground">· 1,247 operators</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded hover:bg-muted/30 transition-colors"><Pin className="h-4 w-4 text-muted-foreground" /></button>
              <button className="p-1.5 rounded hover:bg-muted/30 transition-colors"><Bell className="h-4 w-4 text-muted-foreground" /></button>
              <button className="p-1.5 rounded hover:bg-muted/30 transition-colors"><Users className="h-4 w-4 text-muted-foreground" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
            <AnimatePresence>
              {mockMessages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-3 group hover:bg-muted/10 rounded-lg p-2 -mx-2 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-card border border-border/30 flex items-center justify-center text-lg flex-shrink-0">
                    {msg.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-sm">{msg.user}</span>
                      <span className={`text-[9px] uppercase tracking-wider font-display ${roleColor[msg.role] || "text-muted-foreground"}`}>
                        {msg.role}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono-code">{msg.time}</span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">{msg.content}</p>
                    <div className="flex items-center gap-3 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary transition-colors">
                        <ThumbsUp className="h-3 w-3" /> {msg.likes}
                      </button>
                      <button className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary transition-colors">
                        <MessageSquare className="h-3 w-3" /> {msg.replies}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Message input */}
          <div className="p-4 border-t border-border/20">
            <div className="relative">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message #${channels.find(c => c.id === activeChannel)?.name}...`}
                className="w-full bg-card/50 border border-border/30 rounded-xl pl-4 pr-12 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/30 transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right sidebar - trending & contributors */}
        <div className="w-64 border-l border-border/20 bg-card/20 flex-shrink-0 overflow-y-auto scrollbar-thin p-4 space-y-6 hidden lg:block">
          {/* Trending */}
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground font-display flex items-center gap-1.5 mb-3">
              <Flame className="h-3.5 w-3.5 text-destructive" /> Trending Intel
            </h3>
            <div className="space-y-2">
              {trendingTopics.map((t) => (
                <button key={t.tag} className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/20 transition-colors">
                  <div>
                    <div className="text-sm font-semibold text-foreground">#{t.tag}</div>
                    <div className="text-[10px] text-muted-foreground">{t.posts} posts</div>
                  </div>
                  <span className="text-[10px] text-secondary font-mono-code">{t.trend}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Top contributors */}
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground font-display flex items-center gap-1.5 mb-3">
              <Award className="h-3.5 w-3.5 text-neon-gold" /> Top Operators
            </h3>
            <div className="space-y-2">
              {topContributors.map((c) => (
                <div key={c.name} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/20 transition-colors">
                  <span className="text-lg">{c.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">{c.name}</div>
                    <div className="text-[10px] text-muted-foreground">{c.points.toLocaleString()} pts</div>
                  </div>
                  <span className="text-[10px] font-display text-neon-gold">#{c.rank}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
