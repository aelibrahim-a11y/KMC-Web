import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end group">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="hidden md:flex mb-3 mr-2 px-4 py-2 bg-white rounded-lg shadow-xl border border-blue-mist opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <span className="text-sm font-bold text-blue tracking-tight">Chat on WhatsApp</span>
      </motion.div>
      <motion.a
        href="https://wa.me/96176717161"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-blue rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform active:scale-95"
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <MessageCircle size={28} />
      </motion.a>
    </div>
  );
}
