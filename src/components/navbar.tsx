import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";
import { useBusinessAnalytics } from "../hooks/useBusinessAnalytics";

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { trackCallUsClick } = useBusinessAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const links = [
    { name: "Services", href: "/services" },
    { name: "Our Work", href: "/work" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300",
        scrolled ? "pt-4" : "pt-6"
      )}
    >
      <div className={cn(
        "glass rounded-full flex items-center justify-between backdrop-blur-xl bg-black/50 border border-white/10 shadow-2xl transition-all duration-300",
        scrolled ? "px-5 py-2" : "px-6 py-3",
        isMobile ? "gap-4" : "gap-8"
      )}>
        <Link href="/">
          <div className="text-white font-bold tracking-tight text-lg flex items-center gap-2 cursor-pointer">
            <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            BCA
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link key={link.name} href={link.href}>
              <div className={cn(
                "text-sm transition-colors duration-300 cursor-pointer",
                location === link.href ? "text-white font-medium" : "text-white/60 hover:text-white"
              )}>
                {link.name}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile hamburger menu button */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}

          <a href="tel:+1234567890" onClick={trackCallUsClick}>
            <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/90 transition-colors">
              Call Us
            </button>
          </a>
        </div>
      </div>

      {/* Mobile navigation overlay */}
      <AnimatePresence>
        {mobileMenuOpen && isMobile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Mobile menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-black/90 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col"
            >
              {/* Mobile menu header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="text-white font-bold tracking-tight text-lg flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  BCA
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close mobile menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile menu links */}
              <div className="flex flex-col p-6 space-y-6">
                {links.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <Link href={link.href}>
                      <div className={cn(
                        "text-lg transition-colors duration-300 cursor-pointer py-2",
                        location === link.href ? "text-white font-medium" : "text-white/80 hover:text-white"
                      )}>
                        {link.name}
                      </div>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Get Access button */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: links.length * 0.1 + 0.2 }}
                  className="pt-4"
                >
                  <a href="tel:+1234567890">
                    <button className="w-full bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-white/90 transition-colors">
                      Call Us
                    </button>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}