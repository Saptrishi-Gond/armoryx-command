import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Lock, Mail, ArrowRight, User, Crosshair } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1500);
  };

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabel = ["", "WEAK", "MODERATE", "STRONG"][strength];
  const strengthColor = ["", "bg-destructive", "bg-neon-gold", "bg-secondary"][strength];

  return (
    <div className="min-h-screen bg-background bg-grid-pattern flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px] animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/10 border border-secondary/30 mb-4"
          >
            <Crosshair className="w-8 h-8 text-secondary" />
          </motion.div>
          <h1 className="font-display text-2xl font-bold tracking-wider">
            <span className="text-secondary">VANGUARD</span> <span className="text-foreground/60">ENLIST</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Request Operator Clearance</p>
        </div>

        <div className="glass-panel-accent rounded-2xl p-8 border border-border/30 relative overflow-hidden">
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-display mb-2 block">
                Callsign
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-card/50 border border-border/50 rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                  placeholder="Ghost-7"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-display mb-2 block">
                Secure Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-card/50 border border-border/50 rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                  placeholder="operator@vanguard.mil"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-display mb-2 block">
                Access Key
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-card/50 border border-border/50 rounded-xl pl-10 pr-12 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                  placeholder="••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {/* Password strength */}
              {password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : "bg-border/30"}`} />
                    ))}
                  </div>
                  <span className={`text-[9px] font-display tracking-wider ${strength === 3 ? "text-secondary" : strength === 2 ? "text-neon-gold" : "text-destructive"}`}>
                    {strengthLabel}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" required className="mt-0.5 rounded border-border/50 bg-card/50" />
              <span>I accept the <button type="button" className="text-primary">Terms of Service</button> and <button type="button" className="text-primary">Security Protocol</button></span>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl bg-secondary/20 border border-secondary/40 text-secondary font-display font-bold tracking-wider text-sm hover:bg-secondary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 glow-green"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                  <span>PROCESSING...</span>
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4" />
                  <span>REQUEST CLEARANCE</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have clearance?{" "}
          <Link to="/login" className="text-primary hover:text-primary/80 font-semibold transition-colors">
            Authenticate
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
