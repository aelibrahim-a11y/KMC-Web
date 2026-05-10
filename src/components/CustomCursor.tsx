import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") ||
        target.classList.contains("hover-trigger");
        
      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <motion.div
        className="w-2 h-2 bg-blue rounded-full absolute"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 200, mass: 0.5 }}
      />
      <motion.div
        className="w-8 h-8 border border-blue/40 rounded-full absolute"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovering ? 2 : 1,
          borderColor: isHovering ? "rgba(56, 128, 168, 0.8)" : "rgba(56, 128, 168, 0.4)",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 150, mass: 0.8 }}
      />
    </div>
  );
}
