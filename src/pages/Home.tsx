import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { ChevronDown, ArrowRight, Shield, Award, Landmark, HardHat, FileText, CheckCircle2 } from "lucide-react";
import { parseProjectsCSV, computeProjectStats } from "@/src/utils/projectParser";

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
    <div ref={ref} className="text-center w-full">
      <div className="font-display text-3xl sm:text-4xl md:text-5xl text-blue mb-2 font-bold select-none whitespace-nowrap flex items-baseline justify-center gap-1">
        <span>{count.toLocaleString()}</span>
        {suffix && (
          <span className="text-lg sm:text-xl md:text-2xl font-semibold text-blue/85">
            {suffix.trim()}
          </span>
        )}
      </div>
    </div>
  );
};

// Client and Partner definitions
const CLIENTS_PARTNERS = [
  { name: "American University of Beirut (AUB)", subtitle: "Historic Campus Maintenance", role: "Remediation & Roof Preservations" },
  { name: "AUBMC Medical Center", subtitle: "Halim & Aida Daniel Center", role: "Basement Waterproofing Systems" },
  { name: "Ministry of Public Works", subtitle: "National Courts of Justice", role: "Beirut, Tripoli, and Zahleh Palaces of Justice" },
  { name: "Régie Liban (Government)", subtitle: "Industrial Manufacturing Complexes", role: "Large-scale Sika Tiles Membranes" },
  { name: "Arab Bank Group", subtitle: "Central Processing Headquarters", role: "Double Redundant Subterranean Protection" },
  { name: "Bank Med", subtitle: "Administrative & Local Branch Networks", role: "Terrace Gardens & TPO Membranes" },
  { name: "Bank of Beirut", subtitle: "National Branch Facilities", role: "Joint Sealing and Standard Specification Audits" },
  { name: "Banque Libano Française", subtitle: "Kantari Headquarters", role: "Steiger Envelope Weatherproofing" },
  { name: "Dar El Aytam Al Islamiyah", subtitle: "Orphanage Institutional Facilities", role: "Aramoun, Chamlan, and Bir Hassan Roof Repairs" },
  { name: "Ferrari Showroom (Al Sharakeh)", subtitle: "Jisr Al Watih Retail Complex", role: "Sika Tiles System" },
  { name: "Ecole Nazareth", subtitle: "Achrafieh Educational Complex", role: "High-spec Roof Membrane Envelopes" },
  { name: "Ecole Besancon", subtitle: "Baskinta Historic Campus", role: "Sika Tiles & Mastic Joint Sealing" }
];

const pillars = [
  { id: "01", title: "Architect-Led Direction", desc: "Waterproofing consultancy and application is treated strictly as an architectural discipline, not a mere material supply problem." },
  { id: "02", title: "Standard of 1971", desc: "Five decades of Lebanese engineering heritage integrated into every specification blueprint and site inspection." },
  { id: "03", title: "Institutional Quality", desc: "Waterproofing specification and execution of choice for Lebanon's healthcare, judiciary, and banking system." },
  { id: "04", title: "Forensic Diagnosis", desc: "Scientific investigation of complex leak failures. We diagnose why previous third-party attempts crumbled." },
  { id: "05", title: "Brand Neutrality", desc: "Zero commissions from raw manufacturers. Material systems are selected exclusively by life-cycle performance and site conditions." },
];

const methodologySteps = [
  { id: "01", title: "Assessment", desc: "Deep site investigation and forensic sub-surface diagnostic reports of existing leak disasters." },
  { id: "02", title: "Specification", desc: "Drafting strict custom architectural details and material specifications for long-term building viability." },
  { id: "03", title: "Substrate Prep", desc: "High-level physical substrate conditioning, guaranteeing structural adhesion of the applied barriers." },
  { id: "04", title: "Application", desc: "Certified, meticulous execution of Sika Tiles systems, polymeric coatings, and bituminous membranes." },
  { id: "05", title: "Verification", desc: "Rigorous water flooding tests and joint inspections validating full structural envelope closure." },
  { id: "06", title: "Stewardship", desc: "Lifetime monitoring, post-completion audits, and mechanical damage diagnostics to preserve structural life." }
];

export default function Home() {
  const heroRef = useRef(null);
  const [projectCount, setProjectCount] = useState(85);
  const [totalArea, setTotalArea] = useState(103000);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  useEffect(() => {
    // Sync CSV statistics dynamically for home page too
    fetch("/kmc_projects.csv")
      .then((res) => {
        if (res.ok) return res.text();
        throw new Error();
      })
      .then((text) => {
        const parsed = parseProjectsCSV(text);
        if (parsed.length) {
          setProjectCount(parsed.length);
          const stats = computeProjectStats(parsed);
          setTotalArea(stats.totalArea);
        }
      })
      .catch(() => {
        // Fallback to static values if fetch fails
      });
  }, []);

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION (Redesigned to be custom typographic blueprint spec panel, completely imageless) */}
      <section 
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center pt-12 pb-24 overflow-hidden bg-paper"
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
              className="text-[clamp(54px,8vw,96px)] leading-[0.9] font-bold mb-10 text-ink"
            >
              Five Decades.<br />
              <span className="italic-accent font-medium text-blue">Still dry.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-ink-soft text-lg max-w-lg mb-12 leading-relaxed"
            >
              Professional waterproofing consultancy and application for Lebanon's most complex structures. We engineer and seal structural envelopes against ground-water and climate.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-start space-x-12"
            >
              <div className="flex flex-col">
                <span className="font-display text-4xl font-bold text-ink">1971</span>
                <span className="text-[10px] uppercase tracking-widest text-ink-faint font-bold mt-1">Foundation Year</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-4xl font-bold text-ink">{projectCount}+</span>
                <span className="text-[10px] uppercase tracking-widest text-ink-faint font-bold mt-1">Certified Works</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-4xl font-bold text-blue">100%</span>
                <span className="text-[10px] uppercase tracking-widest text-ink-faint font-bold mt-1">Dry Record</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Architectural Blueprint Specification Panel (No Images) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-2 relative py-12 flex items-center justify-center lg:justify-end"
          >
            {/* Spec Panel box */}
            <div className="w-full bg-paper border-2 border-blue p-8 md:p-10 rounded-sm shadow-xl relative z-10 font-mono text-xs text-ink-soft bg-paper-2">
              <div className="flex justify-between items-start border-b border-blue/20 pb-6 mb-6">
                <div>
                  <h3 className="font-display font-bold text-md text-ink tracking-tight mb-1 uppercase">Kassem Mansour Co.</h3>
                  <p className="text-[9px] uppercase text-ink-faint tracking-widest">Office of Waterproofing Design</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 border border-gold text-gold font-bold text-[8px] tracking-widest uppercase rounded-sm">SPEC-4271</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-1.5 border-b border-blue-soft/20">
                  <span className="text-ink-faint">SYSTEM STANDARDS</span>
                  <span className="text-ink font-bold">BS 8102:2009 / ASTM</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-blue-soft/20">
                  <span className="text-ink-faint">MATERIAL SCHEMATIC</span>
                  <span className="text-ink font-bold">Polymeric Cold-Fluid, Bituminous SBS</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-blue-soft/20">
                  <span className="text-ink-faint">DOCUMENTATION LOG</span>
                  <span className="text-ink font-bold font-sans">kmc_projects.csv</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-blue-soft/20">
                  <span className="text-ink-faint">INDEX RANGE</span>
                  <span className="text-ink font-bold">1971 — Present</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-blue-soft/20">
                  <span className="text-ink-faint">MAPPED WATER ENVELOPE</span>
                  <span className="text-blue font-bold">{totalArea.toLocaleString()} m²</span>
                </div>
              </div>

              <div className="bg-paper p-4 border border-blue-soft rounded-sm mb-6">
                <p className="text-[10px] uppercase font-bold text-gold-soft mb-1 tracking-widest">LANDMARK SPECIFICATIONS</p>
                <p className="font-sans text-xs text-ink leading-relaxed font-semibold">
                  AUBMC Clinical Center Basement Sealing · Palace of Justice Subterranean Remediations · Starco Towers Joint System Sealing
                </p>
              </div>

              <div className="flex items-center gap-3 text-[10px] text-ink-faint uppercase font-bold tracking-widest pt-2">
                <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
                <span>Certified Engineering Registry Online</span>
              </div>
            </div>

            {/* Circular Since Accent */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-6 -left-12 w-40 h-40 border border-blue-soft rounded-full flex items-center justify-center z-20 bg-paper/90 backdrop-blur-sm shadow-md"
            >
              <div className="text-center">
                <div className="font-display text-[10px] italic text-gold">Since</div>
                <div className="font-display text-xl font-bold text-ink">1971</div>
              </div>
            </motion.div>
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
      <section className="py-32 bg-paper border-t border-blue-mist">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="eyebrow mb-8">The Philosophy</span>
            <h2 className="text-5xl md:text-6xl text-ink mb-12 font-bold max-w-xl leading-tight">
              A Lebanese waterproofing consultancy, run as a <span className="italic-accent text-blue font-medium">discipline.</span>
            </h2>
            <div className="space-y-6 text-ink-soft text-lg leading-relaxed max-w-xl">
              <p>
                Waterproofing is the single most common failure in high-load structural projects. At KMC, we treat structural moisture envelopes not as simple material supplies, but as complex architectural problems.
              </p>
              <p>
                Founded by Eng. Kassem Mansour, our practice bridges the disconnect between speculative waterproofing drawings and highly technical site application. We engineer building longevity.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div className="flex flex-col items-center">
              <AnimatedCounter target={55} value={0} suffix="+" />
              <p className="text-[10px] uppercase tracking-widest text-ink-faint font-bold">Years of Practice</p>
            </div>
            <div className="flex flex-col items-center">
              <AnimatedCounter target={projectCount} value={0} suffix="" />
              <p className="text-[10px] uppercase tracking-widest text-ink-faint font-bold">Sealed Landmarks</p>
            </div>
            <div className="flex flex-col items-center">
              <AnimatedCounter target={totalArea} value={0} suffix=" m²" />
              <p className="text-[10px] uppercase tracking-widest text-ink-faint font-bold">Waterproofed Footprints</p>
            </div>
            <div className="flex flex-col items-center">
              <AnimatedCounter target={100} value={0} suffix="%" />
              <p className="text-[10px] uppercase tracking-widest text-ink-faint font-bold">Design Success</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY KMC (Dark Section, Fully typographic and beautifully minimalist) */}
      <section className="py-32 bg-ink text-paper overflow-hidden">
        <div className="container-custom mb-20">
          <span className="text-[11px] uppercase tracking-[0.4em] text-gold font-bold mb-6 block">Directives</span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white"
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
                whileHover={{ y: -6 }}
                className="w-[300px] md:w-[400px] flex-shrink-0 bg-ink-2 p-10 rounded-sm border border-paper/10 snap-center group"
              >
                <span className="font-display italic text-6xl text-gold-soft mb-8 block opacity-40 group-hover:opacity-100 transition-opacity">
                  {pillar.id}
                </span>
                <h3 className="text-2xl mb-4 text-paper font-semibold">{pillar.title}</h3>
                <p className="text-ink-faint text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. IMPORTANT CLIENTS AND PARTNERS (Added as a prominent, elegant, imageless grid section) */}
      <section className="py-32 bg-paper border-b border-blue-mist">
        <div className="container-custom">
          <div className="max-w-3xl mb-20">
            <div className="flex items-center gap-3 mb-6">
              <Landmark className="text-blue w-5 h-5" />
              <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-blue">Institutional Trust</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight text-ink mb-6">
              Clients & Partners
            </h2>
            <p className="text-ink-soft text-lg leading-relaxed">
              We operate as trusted independent advisors. Our client roster spans government institutions, healthcare networks, primary financial institutions, and architectural development offices across Lebanon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLIENTS_PARTNERS.map((client, i) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-8 bg-paper-2 border border-blue-soft/30 rounded-sm hover:border-blue hover:bg-white transition-all duration-300"
              >
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-gold-soft mb-3 block">PRINCIPAL REFERENCE</span>
                    <h4 className="font-display font-bold text-lg text-ink line-clamp-2 leading-tight mb-2">
                      {client.name}
                    </h4>
                    <p className="text-xs text-ink-soft italic font-display mb-6">
                      {client.subtitle}
                    </p>
                  </div>
                  <div className="border-t border-blue-soft/20 pt-4">
                    <p className="text-[10px] uppercase tracking-widest text-ink-faint font-bold font-mono">
                      {client.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. METHODOLOGY */}
      <section className="py-32 bg-paper relative">
        <div className="container-custom">
          <div className="max-w-3xl mb-24">
            <span className="eyebrow mb-8">Systematic Execution</span>
            <h2 className="text-5xl md:text-7xl font-bold text-ink">Methodology</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-24 gap-x-12 relative">
            {/* Connecting lines on desktop */}
            <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-[1px] bg-blue-soft/30 -z-10" />
            
            {methodologySteps.map((step, i) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-paper"
              >
                <div className="w-12 h-12 bg-paper border border-blue-soft rounded-full flex items-center justify-center mb-8 bg-white relative z-10 shadow-sm">
                  <span className="font-display text-blue text-lg font-bold">{step.id}</span>
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

      {/* 6. FOUNDER SPOTLIGHT (Refined completely, using actual founder photo beautifully framed) */}
      <section className="py-32 bg-paper-2 border-y border-blue-mist">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-5 relative aspect-[3/4] overflow-hidden rounded-sm group shadow-xl">
            <img 
              src="/founder.webp" 
              alt="Eng. Kassem Mansour"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-8 left-8 text-white z-10">
              <p className="text-xs uppercase tracking-widest mb-1">Founder & Principal</p>
              <p className="font-display text-2xl font-bold">Eng. Kassem Mansour</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
          </div>
          
          <div className="lg:col-span-7">
            <span className="eyebrow mb-8">The Director</span>
            <div className="font-display text-2xl md:text-3xl italic text-ink-2 mb-8 leading-relaxed font-medium">
              "When I started mapping the concrete foundations of Beirut in 1971, waterproofing was treated as simple laborers' work. Today, it is a key forensic science."
            </div>
            <p className="text-ink-soft leading-relaxed mb-8 text-lg">
              A graduate of the Beirut Arab University and a senior member of the Order of Engineers and Architects for half a century, Eng. Kassem Mansour built this practice with one technical standard: a building can only survive as long as its concrete acts as an impermeable envelope.
            </p>
            <div className="font-display italic text-blue text-4xl mb-12">
              Kassem Mansour
            </div>
            <Link to="/about" className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-blue hover:text-blue-deep transition-colors">
              Read the legacy letter <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CONTACT CTA */}
      <section className="py-48 bg-paper relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <h2 className="text-5xl md:text-8xl text-ink mb-12 max-w-5xl mx-auto font-bold tracking-tight">
            If your building has to last, <span className="italic-accent text-blue font-medium">we should talk.</span>
          </h2>
          <p className="text-ink-soft text-xl max-w-xl mx-auto mb-16">
            For technical specification, audit of current leakages, or independent consultancy design, contact our Beirut headquarters.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
            <Link 
              to="/contact" 
              className="px-12 py-6 bg-blue text-white text-[12px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-blue-deep transition-all transform hover:-translate-y-1 shadow-lg shadow-blue/20"
            >
              Start the conversation
            </Link>
            <a 
              href="tel:+96176717161"
              className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-ink hover:text-blue transition-colors font-mono"
            >
              +961 76 717 161
            </a>
          </div>
        </div>

        {/* Global KMC Monogram Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-0 pointer-events-none select-none opacity-[0.02]">
          <img src="/favicon.webp" alt="" className="w-[60vw] h-auto object-contain grayscale" />
        </div>
      </section>
    </div>
  );
}
