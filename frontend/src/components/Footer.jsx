import { ArrowUpRight } from "lucide-react";

const TwitterIcon = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const GithubIcon = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const DiscordIcon = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="9" cy="12" r="1" />
    <circle cx="15" cy="12" r="1" />
    <path d="M7.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4v1c0 2.5-2 4-4.5 4s-4.5-1.5-4.5-4v-1z" />
    <path d="M7.5 16c-1.5 1.5-3 1.5-4 1.5 0-2 1.5-3.5 1.5-3.5" />
    <path d="M16.5 16c1.5 1.5 3 1.5 4 1.5 0-2-1.5-3.5-1.5-3.5" />
  </svg>
);

export function Footer() {
  return (
    <footer className="w-full bg-[#102a1c] border-t border-white/10 text-theme-sage">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3">
        
        {/* Column 1: Brand */}
        <div className="p-8 md:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-white" style={{ fontFamily: "Impact, sans-serif", letterSpacing: "1px" }}>
            FOOD<br />RESCUE
          </h2>
          <div className="w-12 h-1 bg-theme-green mb-8"></div>
          <div className="border-l-2 border-theme-sage pl-4 py-1">
            <p className="text-theme-sage font-bold text-sm leading-relaxed max-w-[250px]">
              The all-in-one platform to predict surplus and end food waste for modern communities.
            </p>
          </div>
        </div>

        {/* Column 2: Index */}
        <div className="p-8 md:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center">
          <div className="bg-theme-green-deep text-white font-bold text-xs px-4 py-2 inline-flex w-fit mb-12 tracking-widest uppercase rounded">
            INDEX
          </div>
          <div className="flex flex-col">
            {[
              { name: "Features", href: "#" },
              { name: "Network", href: "#" },
              { name: "Impact", href: "#" },
              { name: "Blog", href: "#" },
            ].map((link, i) => (
              <a 
                key={i}
                href={link.href}
                className="group flex items-center justify-between py-5 border-b border-white/10 hover:text-white transition-colors"
              >
                <span className="font-bold text-xs tracking-widest uppercase text-theme-sage">{link.name}</span>
                <ArrowUpRight size={16} className="opacity-70 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 3: Social */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="bg-theme-green-deep text-white font-bold text-xs px-4 py-2 inline-flex w-fit mb-12 tracking-widest uppercase rounded">
            SOCIAL
          </div>
          <div className="flex flex-col gap-6">
            <a href="#" className="group flex items-center gap-5 text-theme-sage hover:text-white transition-all">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-theme-green group-hover:scale-110 transition-all bg-black/20">
                <TwitterIcon size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(57,117,74,0.5)] transition-all" />
              </div>
              <span className="font-bold text-sm tracking-wide">Twitter</span>
            </a>
            <a href="#" className="group flex items-center gap-5 text-theme-sage hover:text-white transition-all">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-theme-green group-hover:scale-110 transition-all bg-black/20">
                <GithubIcon size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(57,117,74,0.5)] transition-all" />
              </div>
              <span className="font-bold text-sm tracking-wide">GitHub</span>
            </a>
            <a href="#" className="group flex items-center gap-5 text-theme-sage hover:text-white transition-all">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-theme-green group-hover:scale-110 transition-all bg-black/20">
                <DiscordIcon size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(57,117,74,0.5)] transition-all" />
              </div>
              <span className="font-bold text-sm tracking-wide">Discord</span>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Strip */}
      <div className="w-full border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between text-theme-sage/70 text-[10px] font-bold tracking-widest uppercase">
          <span>© {new Date().getFullYear()} FOODRESCUE, INC. ALL RIGHTS RESERVED.</span>
          <span className="mt-4 md:mt-0">MIT LICENSE</span>
        </div>
      </div>
    </footer>
  );
}
