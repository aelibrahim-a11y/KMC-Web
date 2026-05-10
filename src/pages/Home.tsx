import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { ChevronDown, ArrowRight } from "lucide-react";

// --- Components ---

const AnimatedCounter = ({ value, target, suffix = "" }: { value: number; target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentCount = Math.floor(progress * target);
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl md:text-6xl text-blue mb-2">
        {count}{suffix}
      </div>
    </div>
  );
};

const marqueeItems = [
  "AUB", "AUBMC", "Arab Bank", "Bank Med", "Bank of Beirut", "Palace of Justice", "Régie Liban", "Starco"
];

const pillars = [
  { id: "01", title: "Architect-Led Direction", desc: "Consultancy grounded in architectural discipline, not product sales." },
  { id: "02", title: "Standard of 1971", desc: "Five decades of Lebanese engineering heritage in every specification." },
  { id: "03", title: "Institutional Reliability", desc: "The trusted choice for healthcare, government, and banking infrastructure." },
  { id: "04", title: "Forensic Precision", desc: "Scientific diagnosis of complex leak failures where others guess." },
  { id: "05", title: "Brand Neutrality", desc: "Independent selection of systems based on performance, not partnerships." }
];

const methodologySteps = [
  { id: "01", title: "Assessment", desc: "Deep site investigation and failure diagnosis." },
  { id: "02", title: "Specification", desc: "Technical system design for the building's lifecycle." },
  { id: "03", title: "Substrate Prep", desc: "Foundation-level preparation for uncompromising adhesion." },
  { id: "04", title: "Application", desc: "Certified execution by masters of the discipline." },
  { id: "05", title: "Testing", desc: "Rigorous verification of the waterproofing integrity." },
  { id: "06", title: "Stewardship", desc: "Ongoing monitoring and lifecycle management." }
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION (Updated to Bold Typography Split Layout) */}
      <section 
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center pt-12 pb-24 overflow-hidden"
      >
        <div className="container-custom grid grid-cols-1 lg:grid-cols-5 gap-16 items-center relative z-10">
          {/* Left: Content */}
          <motion.div 
            style={{ opacity: heroOpacity, y: heroY }}
            className="lg:col-span-3 pr-0 lg:pr-12"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4 mb-8"
            >
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-gold">A Monograph · Since 1971</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-[clamp(64px,9vw,110px)] leading-[0.9] font-bold mb-10 text-ink"
            >
              Half a Century.<br />
              <span className="italic-accent font-medium">Still dry.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-ink-soft text-lg max-w-lg mb-12 leading-relaxed"
            >
              Fifty-four years of waterproofing on Lebanon's most demanding buildings — from the foundations of <span className="text-ink font-bold">AUBMC</span> to the roofs of the <span className="text-ink font-bold">Palace of Justice</span>.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-start space-x-12"
            >
              <div className="flex flex-col">
                <span className="font-display text-4xl font-bold text-ink">54+</span>
                <span className="text-[10px] uppercase tracking-widest text-ink-faint font-bold mt-1">Years Active</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-4xl font-bold text-ink">8+</span>
                <span className="text-[10px] uppercase tracking-widest text-ink-faint font-bold mt-1">Landmarks</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-4xl font-bold text-ink">3</span>
                <span className="text-[10px] uppercase tracking-widest text-ink-faint font-bold mt-1">Governorates</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Visual Accent */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-2 relative py-12 flex items-center justify-center lg:justify-end"
          >
            <div className="w-full h-[520px] rounded-[32px] overflow-hidden shadow-2xl relative z-10 group">
              <div className="absolute inset-0 bg-ink opacity-10 mix-blend-multiply z-10" />
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
                alt="Modern Architectural Landmark"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Circular Since Accent */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -left-12 w-48 h-48 border border-blue-mist rounded-full flex items-center justify-center z-20 bg-paper/20 backdrop-blur-sm"
            >
              <div className="text-center">
                <div className="font-display text-xs italic text-gold">Since</div>
                <div className="font-display text-2xl font-bold text-ink">1971</div>
              </div>
            </motion.div>

            {/* Vertical Sub-marquee */}
            <div className="absolute top-1/2 -right-12 transform rotate-90 text-[10px] uppercase tracking-[0.5em] text-ink-faint origin-right whitespace-nowrap hidden xl:block">
              Beirut · Architecture · Quality
            </div>
          </motion.div>
        </div>

        {/* Scroll Cue */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-blue" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink">Scroll to explore</span>
          </div>
        </motion.div>

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </section>

      {/* 2. PRACTICE INTRO */}
      <section className="py-32 bg-paper">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl text-ink mb-12">
              A Lebanese waterproofing consultancy, run as a <span className="italic-accent">discipline.</span>
            </h2>
            <div className="space-y-6 text-ink-soft text-lg leading-relaxed max-w-xl">
              <p>
                Waterproofing is the most critical failed system in Lebanese construction. At KMC, we treat it not as an afterthought, but as an architectural discipline.
              </p>
              <p>
                Founded by Eng. Kassem Mansour, our practice bridges the gap between theoretical specification and rigorous site application. We don't just sell products; we engineer lifecycle solutions for the country's institutional bedrock.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div className="flex flex-col items-center">
              <AnimatedCounter target={54} value={0} suffix="+" />
              <p className="text-[10px] uppercase tracking-widest text-ink-faint">Years of Heritage</p>
            </div>
            <div className="flex flex-col items-center">
              <AnimatedCounter target={8} value={0} suffix="+" />
              <p className="text-[10px] uppercase tracking-widest text-ink-faint">Landmark Sectors</p>
            </div>
            <div className="flex flex-col items-center">
              <AnimatedCounter target={3} value={0} suffix="" />
              <p className="text-[10px] uppercase tracking-widest text-ink-faint">Governorates</p>
            </div>
            <div className="flex flex-col items-center">
              <AnimatedCounter target={1} value={0} suffix="" />
              <p className="text-[10px] uppercase tracking-widest text-ink-faint">Standard of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY KMC (Dark Section) */}
      <section className="py-32 bg-ink text-paper overflow-hidden">
        <div className="container-custom mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl mb-4"
          >
            Why Kassem Mansour Co.
          </motion.h2>
        </div>
        
        <div className="flex overflow-x-auto pb-12 px-6 md:px-12 hide-scrollbar snap-x snap-mandatory">
          <div className="flex gap-8">
            {pillars.map((pillar, i) => (
              <motion.div 
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="w-[300px] md:w-[400px] flex-shrink-0 bg-ink-2 p-10 rounded-sm border border-paper/10 snap-center group pointer-events-auto"
              >
                <span className="font-display italic text-6xl text-gold-soft mb-8 block opacity-50 group-hover:opacity-100 transition-opacity">
                  {pillar.id}
                </span>
                <h3 className="text-2xl mb-4 text-paper">{pillar.title}</h3>
                <p className="text-ink-faint text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED WORK MARQUEE */}
      <section className="py-32 bg-paper overflow-hidden">
        <div className="flex flex-col gap-12">
          <div className="relative w-full overflow-hidden flex whitespace-nowrap py-12">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-16 min-w-full"
            >
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span key={i} className="font-display italic text-[12vw] leading-none text-ink/10 hover:text-blue/80 transition-colors pointer-events-auto cursor-default">
                  {item} ·
                </span>
              ))}
            </motion.div>
          </div>
          
          <div className="container-custom text-center">
            <h3 className="text-3xl md:text-4xl text-ink mb-8">
              We don't list testimonials. <span className="italic-accent">We list Lebanon.</span>
            </h3>
            <Link to="/work" className="group flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-blue hover:text-blue-deep transition-colors">
              View the full portfolio <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. METHODOLOGY PREVIEW */}
      <section className="py-32 bg-paper relative">
        <div className="container-custom">
          <h2 className="text-5xl md:text-7xl text-ink mb-24">Methodology</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-24 gap-x-12 relative">
            {/* Connecting lines on desktop (simplified) */}
            <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-[1px] bg-blue-soft/30 -z-10" />
            
            {methodologySteps.map((step, i) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-paper border border-blue-soft rounded-full flex items-center justify-center mb-8 bg-white relative z-10">
                  <span className="font-display text-blue text-lg">{step.id}</span>
                </div>
                <h4 className="text-xl font-bold uppercase tracking-widest text-ink mb-4">{step.title}</h4>
                <p className="text-ink-soft text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOUNDER SPOTLIGHT */}
      <section className="py-32 bg-paper-2">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm group">
            <img 
              src="/founder.webp" 
              alt="Eng. Kassem Mansour"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-8 left-8 text-white z-10">
              <p className="text-xs uppercase tracking-widest mb-1">Founder & Principal</p>
              <p className="font-display text-2xl">Eng. Kassem Mansour</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </div>
          <div>
            <span className="eyebrow mb-12">The Founder</span>
            <div className="font-display text-2xl md:text-3xl italic text-ink-2 mb-8 leading-relaxed">
              "When I started mapping the foundations of Beirut in the early seventies, waterproofing was a craft. Today it is a forensic science — one we have led for over five decades."
            </div>
            <p className="text-ink-soft leading-relaxed mb-8">
              A graduate of the Beirut Arab University and a member of the Order of Engineers and Architects for over 40 years, Eng. Kassem Mansour built his practice on a singular premise: institutional buildings are only as permanent as their protection from the elements.
            </p>
            <div className="font-display italic text-blue text-4xl mb-12">
              Kassem Mansour
            </div>
            <Link to="/about" className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-blue hover:text-blue-deep transition-colors">
              Read the full letter <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CONTACT CTA */}
      <section className="py-48 bg-paper relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <h2 className="text-5xl md:text-8xl text-ink mb-12 max-w-5xl mx-auto">
            If your building has to last, <span className="italic-accent">we should talk.</span>
          </h2>
          <p className="text-ink-soft text-xl max-w-xl mx-auto mb-16">
            For consultancy, forensic investigation, or specification design, reach out to our Beirut office.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
            <Link 
              to="/contact" 
              className="px-12 py-6 bg-blue text-white text-[12px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-blue-deep transition-all transform hover:-translate-y-1 shadow-xl"
            >
              Start the conversation
            </Link>
            <a 
              href="tel:+96176717161"
              className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-ink hover:text-blue transition-colors"
            >
              +961 76 717 161
            </a>
          </div>
        </div>

        {/* Global KMC Monogram Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-0 pointer-events-none select-none opacity-[0.03]">
          <img src="/favicon.webp" alt="" className="w-[60vw] h-auto object-contain grayscale" />
        </div>
      </section>
    </div>
  );
}
