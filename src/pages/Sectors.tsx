import { motion } from "motion/react";

const sectors = [
  { id: "01", name: "Healthcare", desc: "Zero-tolerance waterproofing for operating theaters, labs, and subterranean radiotherapy suites where moisture impacts life-saving precision." },
  { id: "02", name: "Education", desc: "Protecting the architectural legacy of Lebanon's universities and schools, from heritage archives to modern research labs." },
  { id: "03", name: "Banking", desc: "Sealing the financial bedrock. Deep-basement vault protection and data-center humidity control for the country's primary lenders." },
  { id: "04", name: "Government", desc: "Institutional-grade waterproofing for judiciary buildings, complexes, and administrative hq, prioritizing multi-generational durability." },
  { id: "05", name: "Commercial", desc: "High-traffic retail and office hubs. Integrated facade and roof garden systems that balance operational continuity with aesthetics." },
  { id: "06", name: "Hospitality", desc: "Luxury seaside and mountain resorts. Managing complex hydrostatic pressure and high-spec terrace finishes." },
  { id: "07", name: "Industrial", desc: "Chemical-resistant coatings and heavy-load bituminous membranes for Lebanon's production facilities and logistical hubs." },
  { id: "08", name: "Residential", desc: "High-rise and boutique residential developments, focusing on acoustic separation and roof-to-foundation dry envelopes." },
  { id: "09", name: "Forensic", desc: "Specialist investigation and remediation services for failed structures. Scientific diagnosis of existing leakage disasters." }
];

export default function Sectors() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-paper min-h-screen"
    >
      <section className="pt-24 pb-32">
        <div className="container-custom">
          <span className="eyebrow mb-8">Sectors</span>
          <h1 className="text-6xl md:text-8xl text-ink mb-24 max-w-4xl">Where Kassem Mansour Co. <span className="italic-accent">works.</span></h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, i) => (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group p-10 bg-paper-2 border border-blue-soft/20 rounded-sm hover:border-blue transition-all"
              >
                <span className="font-display text-xs text-gold mb-6 block tracking-widest">{sector.id}</span>
                <h3 className="text-2xl text-ink mb-6 group-hover:text-blue transition-colors">{sector.name}</h3>
                <p className="text-ink-soft text-sm leading-relaxed mb-8">
                  {sector.desc}
                </p>
                <div className="w-8 h-[1px] bg-blue-soft group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed texture section */}
      <section className="h-[50vh] relative overflow-hidden flex items-center justify-center">
         <img 
            src="https://images.unsplash.com/photo-1590374182967-33a9dbba0688?q=80&w=2400" 
            alt="Close up of concrete"
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-20"
            referrerPolicy="no-referrer"
         />
         <div className="container-custom relative z-10 text-center">
            <h2 className="font-display italic text-4xl md:text-6xl text-ink-2">Standardization across industries.</h2>
         </div>
      </section>
    </motion.div>
  );
}
