import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

const navLinks = [
  { name: "About", path: "/about" },
  { name: "Work", path: "/work" },
  { name: "Services", path: "/services" },
  { name: "Sectors", path: "/sectors" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-6",
        isScrolled ? "bg-white/80 backdrop-blur-md py-4 border-b border-blue-mist shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img 
            src="/logo_full.webp" 
            alt="KMC | Kassem Mansour Co." 
            className={cn(
              "transition-all duration-500 w-auto object-contain",
              isScrolled ? "h-12 md:h-16" : "h-20 md:h-28 drop-shadow-[0_2px_10px_rgba(31,42,51,0.1)]"
            )} 
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:text-blue",
                location.pathname === link.path ? "text-blue" : "text-ink-soft"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="px-6 py-3 bg-blue text-white text-[10px] font-bold uppercase tracking-[0.25em] rounded-sm hover:bg-blue-deep transition-all transform active:scale-95 ml-4"
          >
            Enquire
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-ink"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[200] bg-paper flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <img src="/logo_full.webp" alt="KMC" className="h-16 w-auto" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-ink">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="font-display text-6xl text-ink hover:text-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-auto border-t border-blue-soft pt-8">
              <p className="text-xs uppercase tracking-widest text-ink-faint mb-4">Official Monograph</p>
              <p className="font-display italic text-blue text-2xl">Since 1971</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
