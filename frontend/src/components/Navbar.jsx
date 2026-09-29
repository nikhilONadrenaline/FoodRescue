import { Link } from "react-router-dom";
import { 
  MotionNavigationMenu, 
  MotionNavigationMenuList, 
  MotionNavigationMenuItem, 
  MotionNavigationMenuTrigger, 
  MotionNavigationMenuContent,
  MotionNavigationMenuLink
} from "./ui/motion-navigation-menu";
import { buttonVariants } from "./ui/button";

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full h-16 bg-theme-cream border-b-4 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)] flex items-center justify-between text-theme-ink font-sans">
      
      {/* Left: Logo */}
      <Link to="/" className="flex items-center h-full pl-6 pr-8 border-r-4 border-black transition-colors group hover:bg-black/5">
        <img src="/logo.png" alt="FoodRescue Logo" className="h-14 w-auto mix-blend-multiply object-contain group-hover:scale-105 transition-transform" />
      </Link>

      {/* Center: Navigation */}
      <div className="flex-1 flex justify-end h-full">
        <MotionNavigationMenu className="h-full flex items-center pr-8">
          <MotionNavigationMenuList className="gap-8">
            <MotionNavigationMenuItem value="features">
              <MotionNavigationMenuTrigger className="bg-transparent hover:text-theme-green data-[state=open]:text-theme-green text-[#405047] text-[13px] font-bold px-0 hover:bg-transparent data-[state=open]:bg-transparent transition-colors">
                FEATURES
              </MotionNavigationMenuTrigger>
              <MotionNavigationMenuContent>
                <div className="grid gap-3 p-4 w-[300px] bg-theme-cream border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl">
                  <ListItem href="/ai" title="AI Intelligence">
                    Predict surplus & optimize inventory.
                  </ListItem>
                  <ListItem href="/storage" title="Smart Storage">
                    IoT monitoring for food freshness.
                  </ListItem>
                  <ListItem href="/network" title="Surplus Network">
                    Real-time connections with verified NGOs.
                  </ListItem>
                </div>
              </MotionNavigationMenuContent>
            </MotionNavigationMenuItem>
            
            <MotionNavigationMenuItem value="network">
              <MotionNavigationMenuTrigger className="bg-transparent hover:text-theme-green data-[state=open]:text-theme-green text-[#405047] text-[13px] font-bold px-0 hover:bg-transparent data-[state=open]:bg-transparent transition-colors">
                NETWORK
              </MotionNavigationMenuTrigger>
              <MotionNavigationMenuContent>
                 <div className="grid gap-3 p-4 w-[300px] bg-theme-cream border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl">
                   <ListItem href="/kitchens" title="Kitchens & Hotels">Manage food surplus efficiently.</ListItem>
                   <ListItem href="/ngos" title="NGO Partners">Receive real-time food alerts.</ListItem>
                 </div>
              </MotionNavigationMenuContent>
            </MotionNavigationMenuItem>

            <MotionNavigationMenuItem value="impact">
              <MotionNavigationMenuLink href="/impact" className="text-[#405047] hover:text-theme-green text-[13px] font-bold uppercase transition-colors">
                IMPACT
              </MotionNavigationMenuLink>
            </MotionNavigationMenuItem>
          </MotionNavigationMenuList>
        </MotionNavigationMenu>
      </div>

      {/* Right: Auth & CTA */}
      <div className="flex items-center h-full pl-6 pr-6 gap-6 border-l-4 border-black bg-theme-cream">
        <Link to="/login" className="text-[13px] font-black text-theme-ink hover:text-theme-green transition-colors uppercase tracking-widest">
          SIGN IN
        </Link>
        <Link to="/register" className="h-10 px-6 flex items-center justify-center rounded-md bg-theme-yellow hover:bg-[#e0c748] text-theme-ink font-black uppercase tracking-widest text-xs border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
          GET STARTED
        </Link>
      </div>

    </header>
  );
}

function ListItem({ className, title, children, ...props }) {
  return (
    <li>
      <MotionNavigationMenuLink
        className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-theme-sage/50 focus:bg-theme-sage/50 ${className}`}
        {...props}
      >
        <div className="text-[13px] font-medium leading-none text-theme-ink">{title}</div>
        <p className="line-clamp-2 text-[12px] leading-snug text-theme-muted mt-1">
          {children}
        </p>
      </MotionNavigationMenuLink>
    </li>
  );
}
