import { useState } from "react";
import { Button } from "../components/ui/button";
import AnimatedInput from "../components/smoothui/animated-input";
import GlowHover from "../components/smoothui/glow-hover-card";
import { Link, useNavigate } from "react-router-dom";
import { HeartPulse, Eye, Mail, Lock, User, AlertCircle } from "lucide-react";
import { BackgroundGrid } from "../components/BackgroundGrid";

export function Register() {
  const [role, setRole] = useState("kitchen");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    // Auto-append @gmail.com if user only typed the username
    const fullEmail = email.includes("@") ? email : `${email}@gmail.com`;
    
    try {
      // Assuming registration leads to dashboard via sign-in for now
      // This is a placeholder since we don't have a full signup API mapped yet
      console.log("Registering:", { firstName, lastName, email: fullEmail, role, password });
      navigate(role === "kitchen" ? "/kitchen" : "/ngo", { replace: true, state: { message: "Account created successfully!" } });
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white font-quicksand selection:bg-[#00d0f0] selection:text-[#18181b] flex flex-col w-full relative overflow-hidden">
      <BackgroundGrid className="absolute inset-0 z-0 opacity-40 pointer-events-none" strokeClass="stroke-theme-ink/15" />
      <div className="relative z-10 flex flex-col w-full h-full flex-1">
        {/* Top Bar */}
        <header className="w-full h-16 flex items-center justify-between pl-0 pr-8 border-b-4 border-black bg-theme-cream shadow-[0_4px_0_0_rgba(0,0,0,1)] z-20">
          <Link to="/" className="flex items-center h-full border-r-4 border-black px-6 md:px-8 hover:bg-black/5 transition-colors group">
            <img src="/logo.png" alt="FoodRescue Logo" className="h-14 w-auto mix-blend-multiply object-contain group-hover:scale-105 transition-transform" />
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-theme-ink font-bold text-xs tracking-wider uppercase hidden sm:block">Already have an account?</span>
            <Link to="/login">
              <Button className="h-10 px-6 bg-theme-green text-theme-ink border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-theme-green-deep transition-all font-black uppercase tracking-widest text-xs">
                Login
              </Button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-4 md:p-8 w-full max-w-5xl mx-auto">
          <div className="w-full bg-[#27272a]/30 rounded-3xl overflow-hidden border border-[#333] shadow-2xl flex flex-col md:flex-row min-h-[650px]">

            {/* Left Pane (Register Form) */}
            <GlowHover
              className="w-full md:w-1/2"
              glowIntensity={0.25}
              items={[
                {
                  id: "register-form-bg",
                  theme: { hue: 330, saturation: 100, lightness: 60 },
                  element: <div className="w-full h-full rounded-none bg-[#1f3025]" />
                }
              ]}
            >
              <div className="w-full h-full p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-transparent relative z-10">
                <div className="flex items-center gap-2 mb-8">
                  <div className="bg-[#00d0f0]/10 p-2 rounded-full text-[#00d0f0]">
                    <HeartPulse size={24} />
                  </div>
                  <span className="bg-[#00d0f0]/10 text-[#00d0f0] px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    Join FoodRescue
                  </span>
                </div>

                <h1 className="text-3xl font-black mb-2 text-white">Create an Account</h1>
                <p className="text-white/60 text-sm mb-6">Sign up to access your {role === 'kitchen' ? 'kitchen' : 'NGO'} dashboard.</p>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm mb-6 flex items-center gap-2">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleRegister}>
                  {/* Role Selection Toggle */}
                  <div className="flex bg-[#333]/30 p-1 rounded-xl border border-[#333]">
                    <button
                      type="button"
                      onClick={() => setRole("kitchen")}
                      className={`flex-1 py-3 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${role === "kitchen" ? "bg-[#00d0f0] text-[#18181b] shadow-[0_0_15px_rgba(0,208,240,0.3)] scale-[1.02]" : "text-white/50 hover:text-white"}`}
                    >
                      🏨 Kitchen / Hotel
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("ngo")}
                      className={`flex-1 py-3 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${role === "ngo" ? "bg-[#00d0f0] text-[#18181b] shadow-[0_0_15px_rgba(0,208,240,0.3)] scale-[1.02]" : "text-white/50 hover:text-white"}`}
                    >
                      🤝 NGO / Consumer
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <AnimatedInput
                      type="text"
                      label="First Name"
                      placeholder="John"
                      icon={<User className="text-white/40" size={16} />}
                      className="w-full"
                      inputClassName="w-full !bg-transparent !border-[#333] !rounded-xl py-3 text-sm focus-visible:!ring-[#00d0f0] !text-white"
                      labelClassName="!bg-[#18181b] !text-white/80 font-bold uppercase tracking-wider text-[10px]"
                      value={firstName}
                      onChange={(val) => setFirstName(val)}
                      required
                    />
                    <AnimatedInput
                      type="text"
                      label="Last Name"
                      placeholder="Doe"
                      icon={<User className="text-white/40" size={16} />}
                      className="w-full"
                      inputClassName="w-full !bg-transparent !border-[#333] !rounded-xl py-3 text-sm focus-visible:!ring-[#00d0f0] !text-white"
                      labelClassName="!bg-[#18181b] !text-white/80 font-bold uppercase tracking-wider text-[10px]"
                      value={lastName}
                      onChange={(val) => setLastName(val)}
                      required
                    />
                  </div>

                  <AnimatedInput
                    type="text"
                    label="Email Address"
                    placeholder="username"
                    icon={<Mail className="text-white/40" size={16} />}
                    rightIcon={!email.includes("@") ? <span className="text-white/40 font-bold text-xs tracking-wider pr-2">@gmail.com</span> : null}
                    className="w-full"
                    inputClassName={`w-full !bg-transparent !border-[#333] !rounded-xl py-3 text-sm focus-visible:!ring-[#00d0f0] !text-white ${!email.includes("@") ? "pr-[90px]" : ""}`}
                    labelClassName="!bg-[#18181b] !text-white/80 font-bold uppercase tracking-wider text-[10px]"
                    value={email}
                    onChange={(val) => setEmail(val)}
                    required
                  />

                  <AnimatedInput
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    placeholder="••••••••"
                    icon={<Lock className="text-white/40" size={16} />}
                    rightIcon={
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/40 hover:text-white transition-colors">
                        <Eye size={16} />
                      </button>
                    }
                    className="w-full"
                    inputClassName="w-full !bg-transparent !border-[#333] !rounded-xl py-3 pr-10 text-sm focus-visible:!ring-[#00d0f0] !text-white"
                    labelClassName="!bg-[#18181b] !text-white/80 font-bold uppercase tracking-wider text-[10px]"
                    value={password}
                    onChange={(val) => setPassword(val)}
                    required
                  />

                  <Button type="submit" className="w-full py-6 mt-4" disabled={loading}>
                    {loading ? "Creating Account..." : <>Create Account &rarr;</>}
                  </Button>
                </form>

                <div className="flex items-center my-8">
                  <div className="flex-1 h-px bg-[#333]"></div>
                  <span className="px-4 text-xs text-white/40 uppercase tracking-widest">or</span>
                  <div className="flex-1 h-px bg-[#333]"></div>
                </div>

                <Button variant="outline" className="w-full py-6 border-[#333] bg-transparent hover:bg-white/5 rounded-full flex items-center justify-center gap-2 text-white">
                  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </Button>

                <p className="text-center text-xs text-white/60 mt-8">
                  Already have an account? <Link to="/login" className="text-[#00d0f0] font-bold hover:underline">Log in</Link>
                </p>
              </div>
            </GlowHover>

            {/* Right Pane (Empty) */}
            <GlowHover
              className="hidden md:block w-1/2"
              glowIntensity={0.25}
              items={[
                {
                  id: "register-empty-pane",
                  theme: { hue: 330, saturation: 100, lightness: 60 },
                  element: (
                    <div className="w-full h-full bg-[#00d0f0]/5 relative border-l border-[#333]">
                      {/* Kept truly empty per instructions */}
                    </div>
                  )
                }
              ]}
            />

          </div>
        </main>

      {/* Simple Footer */}
      <footer className="w-full h-16 flex items-center justify-between px-6 md:px-12 border-t-4 border-black bg-theme-cream z-20 mt-auto shadow-[0_-4px_0_0_rgba(0,0,0,1)]">
        <span className="text-theme-ink font-black text-[10px] sm:text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} FOODRESCUE
        </span>
        <div className="flex gap-6">
          <Link to="/" className="text-theme-ink hover:text-theme-green font-black text-[10px] sm:text-xs tracking-widest uppercase transition-colors">Home</Link>
          <Link to="/" className="text-theme-ink hover:text-theme-green font-black text-[10px] sm:text-xs tracking-widest uppercase transition-colors">Help</Link>
        </div>
      </footer>
      </div>
    </div>
  );
}
