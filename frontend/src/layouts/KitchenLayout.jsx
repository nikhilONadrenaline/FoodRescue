import { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { LayoutDashboard, Package, TrendingUp, HandHeart, X, Trash2, Bell, AlertTriangle, Calendar, Recycle } from "lucide-react";
import gsap from "gsap";
import { inventoryWarningsData } from "../data/mockData";
import { SidebarToggleIcon } from "../components/ui/sidebar-toggle-icon";
import { BackgroundGrid } from "../components/BackgroundGrid";

export function KitchenLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef(null);
  const tlRef = useRef(null);
  const overlayRef = useRef(null);

  const navigation = [
    { name: "Dashboard", href: "/kitchen", icon: LayoutDashboard },
    { name: "Meal Planner", href: "/kitchen/meal-planner", icon: Calendar },
    { name: "Inventory Management", href: "/kitchen/inventory", icon: Package },
    { name: "Expenditure & Analytics", href: "/kitchen/expenditure", icon: TrendingUp },
    { name: "Surplus & NGO Network", href: "/kitchen/surplus", icon: HandHeart },
    { name: "Waste Storage", href: "/kitchen/waste-storage", icon: Trash2 },
    { name: "Waste Management", href: "/kitchen/waste-management", icon: Recycle },
  ];

  const currentPageName = navigation.find(item => item.href === location.pathname)?.name || "Kitchen Portal";

  useEffect(() => {
    // Initialize GSAP Timeline inside a context to clean up properly
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      
      // 1. Fade in the backdrop overlay
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.6,
        display: "block",
        ease: "power2.inOut"
      });

      // 2. Slide the sidebar in from the left (x: 0 since it starts at -100%)
      tl.to(sidebarRef.current, {
        x: 0,
        duration: 0.6,
        ease: "power4.out"
      }, "<"); // start at the same time as the overlay

      // 3. Stagger the navigation links in from the left
      tl.from(".nav-link", {
        x: -80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.16,
        ease: "back.out(1.2)"
      }, "-=0.4"); // overlap with sidebar slide-in

      // 4. Fade in the close button
      tl.from(".close-btn", {
        opacity: 0,
        duration: 0.4,
        scale: 0.8,
        ease: "back.out(2)"
      }, "-=0.4");

      tlRef.current = tl;
    });

    return () => ctx.revert();
  }, []);

  // Play or reverse timeline based on React state
  useEffect(() => {
    if (tlRef.current) {
      if (isSidebarOpen) {
        tlRef.current.play();
      } else {
        tlRef.current.reverse();
      }
    }
  }, [isSidebarOpen]);



  return (
    <div className="min-h-screen bg-transparent text-theme-ink font-quicksand selection:bg-theme-green selection:text-[#18181b] flex flex-col overflow-hidden relative">
      <BackgroundGrid className="absolute inset-0 z-0 opacity-40 pointer-events-none" strokeClass="stroke-theme-ink/15" />
      <div className="relative z-10 flex flex-col w-full h-full flex-1">
      {/* Top Bar */}
      <header className="w-full h-16 flex items-center justify-between pl-2 pr-6 border-b-4 border-black bg-theme-cream shadow-[0_4px_0_0_rgba(0,0,0,1)] shrink-0 z-30">
        <div className="flex items-center h-full">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 ml-2 mr-2 hover:bg-black/10 rounded-lg transition-colors text-theme-ink"
          >
            <SidebarToggleIcon isOpen={isSidebarOpen} />
          </button>
          
          <Link to="/" className="flex items-center h-full border-l-4 border-r-4 border-black px-4 sm:px-6 hover:bg-black/5 transition-colors group">
            <img src="/logo.png" alt="FoodRescue Logo" className="h-14 w-auto mix-blend-multiply object-contain group-hover:scale-105 transition-transform" />
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm h-full">
          <span className="text-theme-ink font-black tracking-widest text-[11px] uppercase hidden sm:block bg-theme-green/10 border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {currentPageName}
          </span>
          <div className="hidden sm:block w-px h-6 bg-black opacity-30 mx-2"></div>
          
          <div className="relative h-full flex items-center">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 hover:bg-black/10 rounded-lg transition-colors text-theme-ink"
            >
              <Bell size={20} className="stroke-[3]" />
              {inventoryWarningsData.length > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-black bg-theme-yellow shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[9px] font-black text-theme-ink">
                  {inventoryWarningsData.length}
                </span>
              )}
            </button>

            {/* Small Notification Div */}
            {isNotificationsOpen && (
              <div className="absolute right-0 top-full mt-4 w-80 sm:w-96 bg-theme-cream border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 flex flex-col max-h-[450px]">
                <div className="flex items-center justify-between px-5 py-4 border-b-4 border-black shrink-0 bg-theme-green">
                  <div className="flex items-center gap-2">
                    <Bell className="text-theme-ink" size={18} strokeWidth={3} />
                    <span className="font-black text-sm text-theme-ink uppercase tracking-widest">
                      Notifications
                    </span>
                  </div>
                  <button 
                    onClick={() => setIsNotificationsOpen(false)}
                    className="text-theme-ink hover:text-black transition-colors"
                  >
                    <X size={18} strokeWidth={3} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-theme-cream">
                  {inventoryWarningsData.length === 0 ? (
                    <div className="text-center text-theme-ink text-xs py-8 font-black uppercase tracking-widest">No new notifications</div>
                  ) : (
                    inventoryWarningsData.map((warning) => (
                      <div key={warning.id} className={`p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white`}>
                        <div className="flex items-start gap-3">
                          <AlertTriangle className={`shrink-0 mt-0.5 ${warning.severity === 'high' ? 'text-red-500' : warning.severity === 'medium' ? 'text-yellow-500' : 'text-theme-green'}`} size={16} strokeWidth={3} />
                          <div className="flex-1">
                            <h4 className="text-xs font-black text-theme-ink mb-1 uppercase tracking-wider">{warning.item}</h4>
                            <p className="text-[11px] text-theme-ink mb-2 leading-relaxed font-bold">{warning.message}</p>
                            <div className="flex items-center justify-between w-full">
                              <span className={`text-[9px] uppercase font-black tracking-wider px-2 py-0.5 border border-black ${warning.severity === 'high' ? 'bg-red-500/20 text-red-600' : warning.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-600' : 'bg-theme-green/20 text-theme-green-deep'}`}>{warning.type}</span>
                              <span className="text-[9px] text-theme-ink font-black">{warning.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <Link to="/">
            <Button className="h-9 px-5 bg-theme-yellow text-theme-ink border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#e0c748] transition-all font-black uppercase tracking-widest text-xs">
              Logout
            </Button>
          </Link>
        </div>
      </header>

      {/* Main App Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Dark Background Overlay */}
        <div 
          ref={overlayRef}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 hidden opacity-0"
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* GSAP Animated Off-Canvas Sidebar */}
        <aside 
          ref={sidebarRef}
          className="fixed top-0 left-0 h-full w-80 bg-[#18181b]/95 backdrop-blur-2xl border-r border-theme-line z-50 flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.5)]"
          style={{ transform: "translateX(-100%)" }}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-theme-line">
            <span className="font-black text-xl text-white uppercase tracking-widest">
              Menu
            </span>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="close-btn p-2 hover:bg-[#333] rounded-full transition-colors text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-8 space-y-3 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`nav-link flex items-center gap-4 px-4 py-4 rounded-2xl transition-colors duration-200 text-sm font-bold tracking-widest uppercase ${
                    isActive 
                      ? "bg-theme-green/10 text-theme-green border border-theme-green/30 shadow-[0_0_20px_rgba(0,208,240,0.15)]" 
                      : "text-white/70 hover:bg-[#333] hover:text-white"
                  }`}
                >
                  <Icon size={20} className={isActive ? "text-theme-green" : ""} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-transparent">
          <Outlet />
        </main>
      </div>
      </div>
    </div>
  );
}
