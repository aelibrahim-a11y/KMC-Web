import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

const timelineEntries = [
  { year: "2010 – Present", title: "Kassem Mansour Co.", desc: "Principal Consultant & Founder. Lead specification architect for AUBMC Halim and Aida Daniel Academic and Clinical Center." },
  { year: "1981 – 2010", title: "Stieger Waterproofing", desc: "Senior Project Architect. Oversight of national-scale industrial and infrastructure sealing projects across Lebanon." },
  { year: "1971 – 1981", title: "Stieger & Kaldani", desc: "Junior Architect. Initial technical training in bituminous systems and substrate engineering during early Beirut expansion." }
];

export default function About() {
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
          <div className="max-w-4xl mx-auto text-center mb-24">
            <span className="eyebrow justify-center mb-8">The Founder</span>
            <h1 className="text-5xl md:text-8xl text-ink mb-6">Eng. Kassem Mansour</h1>
            <p className="font-display italic text-blue text-xl md:text-2xl">Founder & Senior Architect · Since 1971</p>
          </div>
          
          <div className="aspect-video relative overflow-hidden rounded-sm mb-32 shadow-2xl">
            <img 
              src="/founder.webp" 
              alt="Eng. Kassem Mansour" 
              className="w-full h-full object-cover grayscale brightness-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
               <div className="text-center text-white max-w-2xl">
                <p className="font-display italic text-lg md:text-4xl mb-4 leading-tight md:leading-normal">"Waterproofing is the silent half of architecture. It is invisible when done perfectly, and catastrophic when ignored."</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Letter */}
      <section className="pb-48">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 lg:col-start-3">
            <div className="prose prose-lg max-w-none text-ink-soft leading-[1.8]">
              <p className="text-2xl font-display text-ink-2 mb-12 first-letter:text-8xl first-letter:font-display first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:text-blue">
                When I established my practice in 1971, Beirut was undergoing a transformation. The buildings being raised were meant to define the skyline for a century. Yet, as an architect, I observed a recurring failure: the integration of waterproofing was treated as a supply problem, not a design problem.
              </p>
              
              <div className="my-24 pl-12 border-l-2 border-gold py-4">
                <p className="font-display italic text-3xl text-ink leading-tight">
                  "Our goal is not merely to seal a surface; it is to engineer a barrier that outlasts the building's mechanical systems."
                </p>
              </div>

              <p className="mb-8">
                Over the past fifty-four years, Kassem Mansour Co. has evolved from a specialist's consultation into a Lebanese standard. We have seen systems change from simple bituminous pours to high-performance TPO membranes and crystalline injections. Throughout this evolution, our methodology has remained constant: rigorous investigation, architect-led specification, and certified supervision.
              </p>
              
              <p className="mb-8">
                In a region where seasonal climate extremes and seismic considerations demand specific material behaviors, 'one-size-fits-all' specifications are dangerous. We work with the most prominent institutions in Lebanon to ensure that their investment remains dry, safe, and structural.
              </p>

              <div className="mt-16">
                <p className="font-display italic text-blue text-4xl">Kassem Mansour</p>
                <p className="text-xs uppercase tracking-widest text-ink-faint mt-2">Eng. Kassem Mansour, Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 bg-paper-2 border-y border-blue-soft/20">
        <div className="container-custom">
          <h2 className="text-5xl md:text-7xl text-ink mb-24">The Ledger</h2>
          
          <div className="max-w-4xl space-y-24">
            {timelineEntries.map((entry, i) => (
              <div key={i} className="relative pl-12 md:pl-24 border-l border-blue-soft">
                <div className="absolute top-0 left-0 -translate-x-1/2 w-4 h-4 rounded-full bg-blue border-4 border-paper-2" />
                <span className="text-xs font-bold text-gold uppercase tracking-[0.3em] mb-4 block">
                  {entry.year}
                </span>
                <h3 className="text-3xl md:text-4xl text-ink mb-6">{entry.title}</h3>
                <p className="text-ink-soft text-lg leading-relaxed">{entry.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-32 bg-paper">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-24">
          <div>
            <span className="eyebrow mb-12">Credentials</span>
            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-ink-faint mb-4">Academic</h4>
                <p className="font-display text-xl text-ink">B.Arch · Beirut Arab University (BAU)</p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-ink-faint mb-4">Professional</h4>
                <p className="font-display text-xl text-ink">Member of the Order of Engineers and Architects · Beirut</p>
                <p className="text-ink-soft text-sm mt-2">Registration No. 4271 · Since 1974</p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-ink-faint mb-4">Languages</h4>
                <p className="font-display text-xl text-ink">Arabic, French, English</p>
              </div>
            </div>
          </div>
          <div>
            <span className="eyebrow mb-12">Core Philosophy</span>
            <p className="text-ink-soft text-lg leading-relaxed">
              We operate exclusively as an independent consultancy. While we work with global leaders like Sika, BASF, and Index, our loyalty is strictly to the architectural intent of the building. We do not accept commissions from manufacturers. We accept responsibility for the dryness of the structure.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
