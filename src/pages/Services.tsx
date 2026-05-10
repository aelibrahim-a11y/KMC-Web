import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

const services = [
  {
    roman: "I",
    title: "Consultancy & Specification",
    bullets: [
      "Soil & Groundwater Analysis",
      "System Selection & Performance Design",
      "Technical Specification Authoring",
      "BOQ & Drawing Review",
      "Budgetary Feasibility Studies"
    ]
  },
  {
    roman: "II",
    title: "Application & Supervision",
    bullets: [
      "Certified On-site Execution",
      "24/7 Technical Supervision",
      "Substrate Preparation Verification",
      "Quality Control (QC) Protocols",
      "Daily Site Logging & Reporting"
    ]
  },
  {
    roman: "III",
    title: "Quality & Lifecycle",
    bullets: [
      "Forensic Failure Diagnosis",
      "Structural Integrity Testing",
      "Infrared Leak Detection",
      "Preventative Stewardship Audits",
      "Heritage Remediation Design"
    ]
  }
];

const methodology = [
  { num: "01", title: "Assessment", desc: "Before a single roll is laid, we conduct a forensic deep-dive into the structure's exposure, mechanical loads, and chemical environments." },
  { num: "02", title: "Specification", desc: "We design a redundant system that prioritizes longevity over speed. Our specs are built for the building's specific Lebanese micro-climate." },
  { num: "03", title: "Substrate Preparation", desc: "Adhesion failure is the root of leakage. We enforce architectural-grade preparation—from mechanical grinding to chemical stabilization." },
  { num: "04", title: "Application", desc: "Execution is led by technicians trained in the KMC standard. We treat every joint and transition as a critical failure point." },
  { num: "05", title: "Testing", desc: "Integrity is verified through flood testing, spark testing, and thermal imaging before the system is turned over." },
  { num: "06", title: "Stewardship", desc: "We remain partners in the structure's dryness, offering ongoing audits to catch mechanical damage before it becomes a leak." }
];

const systems = [
  { title: "Bituminous membranes", desc: "High-load torch-applied systems for foundations and roofs." },
  { title: "Self-adhered bituminous", desc: "Cold-applied redundancy for sensitive industrial zones." },
  { title: "Liquid-applied", desc: "Seamless cold-roofing and detail-heavy remediation." },
  { title: "PVC & TPO", desc: "UV-stable large-scale roof gardens and thermal systems." },
  { title: "Bentonite", desc: "Self-healing subterranean protection for high groundwater." },
  { title: "Crystalline", desc: "Internal penetrative moisture barriers for concrete." },
  { title: "Epoxy & PU", desc: "High-performance floor and chemical-safe coatings." },
  { title: "Injection & crack-repair", desc: "Forensic stabilization of existing structural failures." }
];

export default function Services() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-paper"
    >
      {/* Hero */}
      <section className="pt-24 pb-32">
        <div className="container-custom">
          <span className="eyebrow mb-8">Capabilities</span>
          <h1 className="text-6xl md:text-8xl text-ink mb-24 max-w-5xl">A specialist scope,<br /> <span className="italic-accent">end to end.</span></h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-ink text-paper p-10 rounded-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                   <span className="font-display text-9xl leading-none">{s.roman}</span>
                </div>
                <h3 className="text-2xl mb-12 relative z-10">{s.title}</h3>
                <ul className="space-y-4 relative z-10">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-ink-faint flex gap-3">
                      <span className="text-blue-soft">•</span> {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-32 bg-paper-2 border-y border-blue-soft/20 overflow-hidden">
        <div className="container-custom">
          <h2 className="text-5xl md:text-7xl text-ink mb-32">Our Methodology</h2>
          
          <div className="relative">
             <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-blue-soft/30 -translate-x-1/2" />
             
             <div className="space-y-24 md:space-y-48">
               {methodology.map((m, i) => (
                 <div key={i} className={cn(
                   "flex flex-col md:flex-row items-center gap-12 md:gap-24 relative",
                   i % 2 !== 0 && "md:flex-row-reverse"
                 )}>
                   <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white border-2 border-blue rounded-full z-10 hidden md:flex items-center justify-center">
                      <span className="font-display text-blue text-sm">{m.num}</span>
                   </div>
                   
                   <div className="w-full md:w-1/2 text-center md:text-left">
                     <span className="font-display text-6xl text-blue/10 mb-4 block md:hidden">{m.num}</span>
                     <h4 className="text-2xl font-bold uppercase tracking-widest text-ink mb-6">{m.title}</h4>
                     <p className="text-ink-soft text-lg leading-relaxed">{m.desc}</p>
                   </div>
                   <div className="w-full md:w-1/2" />
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Systems & Materials */}
      <section className="py-32 bg-paper">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-5xl md:text-6xl text-ink mb-12">Systems & Materials</h2>
            <div className="grid grid-cols-1 gap-6">
              {systems.map((s, i) => (
                <div key={i} className="group pb-6 border-b border-blue-mist">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-xs font-bold text-gold">{String(i + 1).padStart(2, '0')}</span>
                    <h5 className="text-lg font-bold text-ink group-hover:text-blue transition-colors">{s.title}</h5>
                  </div>
                  <p className="text-ink-soft text-sm pl-8">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="bg-ink p-12 md:p-16 rounded-sm text-paper relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-3xl mb-8">Independent by Design</h3>
                 <p className="text-ink-faint text-lg mb-12 leading-relaxed">
                   KMC is not a manufacturer's agent. We maintain absolute brand neutrality, selecting the chemistry and system purely based on the engineering requirements of the substrate and climate.
                 </p>
                 <div className="flex flex-wrap gap-8 items-center border-t border-paper/10 pt-12">
                   {["Sika", "Mapei", "BASF", "BMI", "Index"].map(brand => (
                     <span key={brand} className="font-display italic text-2xl text-gold-soft opacity-60 hover:opacity-100 transition-opacity cursor-default">
                       {brand}
                     </span>
                   ))}
                 </div>
               </div>
               <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue opacity-10 blur-3xl" />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
