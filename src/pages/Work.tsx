import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/src/lib/utils";

const SECTORS = [
  "All", "Healthcare", "Education", "Banking", "Government", "Commercial", "Hospitality", "Industrial", "Residential"
];

const PROJECTS = [
  {
    id: "aubmc",
    name: "AUBMC Halim & Aida Daniel Center",
    sector: "Healthcare",
    year: "2016",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200",
    description: "The Daniel Center is the first clinical center in the region dedicated to multiple medical disciplines in one setting. KMC was commissioned to design and oversee the critical basement waterproofing systems, ensuring that sensitive clinical spaces remained dry amidst high groundwater tables.",
    details: "The project required a combination of high-grade PVC membranes and structural crystalline treatments. Our team provided 24/7 onsite supervision for the duration of the foundation pouring to ensure continuous barrier integrity.",
    span: "md:col-span-2 md:row-span-2"
  },
  {
    id: "aub-campus",
    name: "AUB Historic Campus",
    sector: "Education",
    year: "2012 – Present",
    image: "https://images.unsplash.com/photo-1541339906646-778817293a92?q=80&w=1200",
    description: "Maintenance and remediation of multiple historic structures across the American University of Beirut campus. Preserving heritage requires a delicate balance of non-invasive diagnosis and permanent sealing.",
    details: "Focusing on roof systems and subterranean archives, KMC implemented liquid-applied cold-roof systems that respected the architectural aesthetics while providing modern grade protection.",
    span: ""
  },
  {
    id: "arab-bank",
    name: "Arab Bank Head Office",
    sector: "Banking",
    year: "2008",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
    description: "Full-specification waterproofing for the Arab Bank's central processing hub in Beirut. High-security data archives required a zero-tolerance approach to humidity and seepage.",
    details: "We specified a multi-layer self-adhered bituminous system with double redundancy. The project has maintained 100% dryness for 18 years without a single reported incident.",
    span: "md:col-span-1 md:row-span-2"
  },
  {
    id: "bank-med",
    name: "Bank Med Headquarters",
    sector: "Banking",
    year: "2014",
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1200",
    description: "Institutional sealing for one of Lebanon's primary financial centers. KMC led the consultancy for both original construction and subsequent expansion phases.",
    details: "The project utilized advanced TPO membranes for the roof garden areas, balancing aesthetic landscaping with structural security.",
    span: "md:col-span-2"
  },
  {
    id: "palace-of-justice",
    name: "Palace of Justice",
    sector: "Government",
    year: "1998",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200",
    description: "A landmark government project involving the forensic remediation of the main court building's subterranean vaulted chambers.",
    details: "KMC was brought in after multiple failed third-party attempts. Using epoxy injection and crystalline barriers, we successfully stabilized the structure and stopped persistent leakage.",
    span: ""
  },
  {
    id: "regie-liban",
    name: "Régie Liban Industrial Complex",
    sector: "Industrial",
    year: "2005",
    image: "https://images.unsplash.com/photo-1504307651254-35680f3366d4?q=80&w=1200",
    description: "Scale industrial waterproofing for high-load production facilities. Focus on chemical resistance and mechanical durability.",
    details: "Heavy-duty polyurea coatings were applied to production floors and storage hubs, ensuring protection from both climate and industrial processes.",
    span: "md:col-span-1"
  },
  {
    id: "starco",
    name: "Starco Buildings",
    sector: "Commercial",
    year: "2019",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
    description: "Facade and terrace remediation for the iconic Starco center. A project blending architectural heritage with modern material science.",
    details: "Remediation included intricate joint sealing and transparent silane application to the structure's primary face.",
    span: ""
  },
  {
    id: "bank-of-beirut",
    name: "Bank of Beirut",
    sector: "Banking",
    year: "2010",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=1200",
    description: "Standardized waterproofing specifications for branch networks across Lebanon.",
    details: "KMC developed the 'Standard Specification' manual for the bank's facility management team, ensuring consistent quality across all locations.",
    span: ""
  }
];

export default function Work() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  const filteredProjects = PROJECTS.filter(p => filter === "All" || p.sector === filter);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject]);

  const nextProject = () => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % PROJECTS.length;
    setSelectedProject(PROJECTS[nextIndex]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-paper"
    >
      <section className="pt-24 pb-12">
        <div className="container-custom">
          <span className="eyebrow mb-8">The Ledger</span>
          <h1 className="text-6xl md:text-8xl text-ink mb-12">Selected work,<br /> 1971 — Present</h1>
          
          {/* Filters */}
          <div className="flex overflow-x-auto gap-4 mb-24 pb-4 hide-scrollbar">
            {SECTORS.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={cn(
                  "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                  filter === s 
                    ? "bg-blue text-white shadow-lg" 
                    : "bg-paper-2 text-ink-soft hover:bg-blue-mist"
                )}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setSelectedProject(project)}
                  className={cn(
                    "group relative aspect-square overflow-hidden rounded-sm cursor-pointer",
                    project.span
                  )}
                >
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-8 left-8 right-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold-soft mb-2 block">{project.sector}</span>
                    <h3 className="font-display text-2xl mb-4">{project.name}</h3>
                    <span className="text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                       View case <ArrowRight size={14} />
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-12 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-ink/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl max-h-full bg-paper rounded-sm overflow-y-auto hide-scrollbar z-10"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 text-ink hover:text-blue z-20 transition-colors"
                aria-label="Close"
              >
                <X size={32} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-[400px] lg:h-auto sticky top-0">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="p-10 lg:p-20">
                  <div className="mb-12">
                    <div className="flex gap-4 mb-6">
                      <span className="px-3 py-1 bg-blue-mist text-blue text-[10px] font-bold uppercase tracking-widest rounded-sm">
                        {selectedProject.sector}
                      </span>
                      <span className="px-3 py-1 border border-blue-soft text-blue text-[10px] font-bold uppercase tracking-widest rounded-sm">
                        {selectedProject.year}
                      </span>
                    </div>
                    <h2 className="font-display text-5xl md:text-6xl text-ink leading-[0.9]">{selectedProject.name}</h2>
                  </div>

                  <div className="prose prose-lg text-ink-soft leading-relaxed max-w-none">
                    <p className="font-bold text-ink text-xl mb-6">
                      {selectedProject.description}
                    </p>
                    <p className="mb-12">
                      {selectedProject.details}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-16">
                    <div className="aspect-video bg-paper-2 rounded-sm overflow-hidden">
                       <img src="https://images.unsplash.com/photo-1503387762-592dea58fe21?q=80&w=800" className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="aspect-video bg-paper-2 rounded-sm overflow-hidden">
                       <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800" className="w-full h-full object-cover grayscale" />
                    </div>
                  </div>

                  <div className="border-t border-blue-mist pt-8 flex items-center justify-between">
                    <button 
                      onClick={() => {
                        const idx = PROJECTS.findIndex(p => p.id === selectedProject.id);
                        const prev = (idx - 1 + PROJECTS.length) % PROJECTS.length;
                        setSelectedProject(PROJECTS[prev]);
                      }}
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink-faint hover:text-blue transition-colors"
                    >
                      <ArrowLeft size={16} /> Previous
                    </button>
                    <button 
                      onClick={nextProject}
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink-faint hover:text-blue transition-colors"
                    >
                      Next project <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
