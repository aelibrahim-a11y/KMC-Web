import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ChevronDown, ChevronUp, FileSpreadsheet, ShieldCheck, MapPin, HardHat, Calendar, SquareStack, Layers } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { parseProjectsCSV, Project, computeProjectStats } from "@/src/utils/projectParser";

export default function Work() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  // Statistics derived dynamically
  const [stats, setStats] = useState({
    totalCount: 0,
    totalArea: 0,
    startYear: 1971,
    endYear: 2026
  });

  useEffect(() => {
    fetch("/kmc_projects.csv")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load project log");
        return res.text();
      })
      .then((text) => {
        const parsed = parseProjectsCSV(text);
        setProjects(parsed);
        const computedStats = computeProjectStats(parsed);
        setStats(computedStats);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to retrieve historic ledger file.");
        setLoading(false);
      });
  }, []);

  // Derive unique sectors from actual CSV records
  const sectorsList = ["All", ...Array.from(new Set(projects.map((p) => p.sector))).filter(Boolean).sort()];

  // Filter list by selected sector and search query
  const filteredProjects = projects.filter((project) => {
    const matchesSector = selectedSector === "All" || project.sector === selectedSector;
    
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      project.name.toLowerCase().includes(query) ||
      project.location.toLowerCase().includes(query) ||
      project.system.toLowerCase().includes(query) ||
      project.scope_raw.toLowerCase().includes(query) ||
      project.client_ref.toLowerCase().includes(query);

    return matchesSector && matchesSearch;
  });

  const toggleExpandProject = (id: string) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-paper min-h-screen"
    >
      {/* Page Header */}
      <section className="pt-24 pb-12 border-b border-blue-mist bg-paper">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FileSpreadsheet className="text-blue w-5 h-5" />
                <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-blue">The Archive Registry</span>
              </div>
              <h1 className="text-5xl md:text-8xl text-ink leading-[0.9] font-bold">
                Waterproofing<br />
                <span className="italic-accent font-medium text-blue">Ledger.</span>
              </h1>
            </div>
            
            <div className="grid grid-cols-2 gap-12 border-l border-blue-soft/30 pl-8 max-w-sm">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-ink-faint font-bold block mb-1">Total Monitored Projects</span>
                <span className="font-mono text-3xl font-bold text-ink">{loading ? "..." : projects.length} Active Records</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-ink-faint font-bold block mb-1">Total Insulated Area</span>
                <span className="font-mono text-3xl font-bold text-blue">
                  {loading ? "..." : `${stats.totalArea.toLocaleString()} m²`}
                </span>
              </div>
            </div>
          </div>

          <p className="text-ink-soft text-lg max-w-3xl leading-relaxed">
            Every entry recorded in this ledger represents a real, historically certified waterproofing application. 
            We maintain structured design files and inspection records for our entire portfolio, operating without the distraction of 
            generic photography to present pure waterproofing credentials.
          </p>
        </div>
      </section>

      {/* Control Panel (Search and Horizontal Filters) */}
      <section className="py-8 bg-paper-2 border-b border-blue-mist sticky top-[80px] z-50 shadow-sm backdrop-blur-md bg-paper-2/95">
        <div className="container-custom flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
          
          {/* Action: Search input */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, district, specific waterproofing system, or lead rep..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-paper pl-12 pr-4 py-3.5 rounded-sm border border-blue-soft/40 outline-none text-sm text-ink placeholder:text-ink-faint focus:border-blue focus:ring-1 focus:ring-blue transition-all"
            />
          </div>

          {/* Filters list */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar scroll-smooth">
            {sectorsList.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSector(s)}
                className={cn(
                  "px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                  selectedSector === s 
                    ? "bg-blue text-white shadow-md shadow-blue/10" 
                    : "bg-paper text-ink-soft border border-blue-soft/20 hover:border-blue-soft hover:bg-blue-mist"
                )}
              >
                {s}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Ledger Records Table/Grid */}
      <section className="py-16">
        <div className="container-custom">
          {loading ? (
            <div className="py-24 text-center">
              <div className="w-12 h-12 border-2 border-blue border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <p className="font-mono text-sm text-ink-soft">Decoupled registry syncing...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center border border-red-200 bg-red-50 rounded-sm max-w-md mx-auto my-12">
              <span className="text-red-700 font-bold block mb-2 font-display">Log Fetch Interrupted</span>
              <p className="text-xs text-red-600 font-mono">{error}</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="py-24 text-center border border-dashed border-blue-soft/30 rounded-sm">
              <p className="text-lg text-ink-soft mb-2">No archive entries match your parameters.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedSector("All"); }}
                className="text-xs font-bold uppercase tracking-widest text-blue underline"
              >
                Reset Filter Indexes
              </button>
            </div>
          ) : (
            <div>
              {/* Header Titles visible on desktop */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 border-b border-ink/10 text-[10px] uppercase font-bold tracking-widest text-ink-faint bg-paper-2">
                <div className="col-span-1">Year</div>
                <div className="col-span-4">Structure / Reference Site</div>
                <div className="col-span-2">Sector</div>
                <div className="col-span-2 text-right">Protected Area</div>
                <div className="col-span-3">System Specification</div>
              </div>

              {/* Log items */}
              <div className="divide-y divide-blue-soft/40 border-b border-blue-soft/40">
                {filteredProjects.map((project, index) => {
                  const isExpanded = expandedProjectId === project.id;
                  return (
                    <motion.div 
                      key={project.id}
                      layout="position"
                      className={cn(
                        "group transition-all duration-300",
                        isExpanded ? "bg-blue-mist-soft shadow-inner" : "hover:bg-paper-2"
                      )}
                    >
                      {/* Main row heading */}
                      <div 
                        onClick={() => toggleExpandProject(project.id)}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 px-6 md:px-8 items-center cursor-pointer select-none"
                      >
                        {/* Year */}
                        <div className="col-span-1 flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-blue/60 md:hidden" />
                          <span className="font-mono text-sm font-bold text-ink leading-none">{project.year}</span>
                        </div>

                        {/* Name and Location */}
                        <div className="col-span-1 md:col-span-4 pr-4">
                          <h4 className="font-display text-md text-ink group-hover:text-blue font-bold transition-colors leading-tight mb-1">
                            {project.name}
                          </h4>
                          <span className="text-xs text-ink-soft flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 shrink-0 text-gold-soft" />
                            {project.location}
                          </span>
                        </div>

                        {/* Sector badge */}
                        <div className="col-span-2 flex items-center">
                          <span className="px-2.5 py-1 bg-paper border border-blue-soft/30 text-ink-soft text-[9px] font-bold uppercase tracking-wider rounded-sm shrink-0">
                            {project.sector}
                          </span>
                        </div>

                        {/* Area */}
                        <div className="col-span-2 text-left md:text-right">
                          <span className="font-mono text-xs font-medium text-ink flex md:block items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-ink-faint md:hidden">Area: </span>
                            {project.area_m2 ? `${project.area_m2.toLocaleString()} m²` : "—"}
                          </span>
                        </div>

                        {/* System Summary */}
                        <div className="col-span-3 flex items-center justify-between gap-4">
                          <span className="text-xs text-ink-soft truncate pr-4 max-w-[200px]" title={project.system}>
                            {project.system}
                          </span>
                          
                          {/* Chevron icon indicating expansion */}
                          <button className="p-1 rounded-full text-ink-faint group-hover:text-blue transition-colors shrink-0">
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Expandable detailed technical sheet (Imageless) */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 md:px-12 pb-8 pt-2 grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-blue-soft/20 bg-paper/50">
                              
                              {/* Left Technical details block */}
                              <div className="col-span-12 md:col-span-8 space-y-4">
                                <div>
                                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-ink-faint mb-2 flex items-center gap-2">
                                    <Layers className="w-3.5 h-3.5 text-blue" />
                                    Specific Waterproofing system & Application System
                                  </h4>
                                  <p className="text-sm font-display text-ink font-bold leading-relaxed bg-paper p-4 rounded-sm border border-blue-soft/10">
                                    {project.system}
                                  </p>
                                </div>

                                <div>
                                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-ink-faint mb-2 flex items-center gap-2">
                                    <SquareStack className="w-3.5 h-3.5 text-blue" />
                                    Scope of Works Documented
                                  </h4>
                                  <p className="text-sm font-mono text-ink-soft bg-paper p-4 rounded-sm border border-blue-soft/10 whitespace-pre-wrap">
                                    {project.scope_raw || "Standard application guidelines in accordance with manufacturer technical bulletins."}
                                  </p>
                                </div>
                              </div>

                              {/* Right Technical block (Representative details) */}
                              <div className="col-span-12 md:col-span-4 bg-paper/80 p-6 rounded-sm border border-blue-soft/30 flex flex-col justify-between">
                                <div>
                                  <h5 className="text-[9px] uppercase font-bold tracking-widest text-ink-faint mb-4 block">Certified Representative Reference</h5>
                                  <div className="flex items-start gap-3">
                                    <HardHat className="w-5 h-5 text-gold-soft shrink-0 mt-0.5" />
                                    <div>
                                      <p className="font-display font-bold text-sm text-ink mb-1">
                                        {project.client_ref || "Direct Institutional Registry Check"}
                                      </p>
                                      <p className="text-[11px] text-ink-soft">
                                        Project Contact / Supervising Architect
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-8 border-t border-blue-soft/20 pt-4 flex items-center justify-between">
                                  <span className="flex items-center gap-1 text-[9px] uppercase font-bold tracking-widest text-green-700">
                                    <ShieldCheck className="w-4 h-4" /> Integrity Active
                                  </span>
                                  <span className="font-mono text-[9px] text-ink-faint uppercase">
                                    Record ID #{project.id.toUpperCase()}
                                  </span>
                                </div>
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Trust & Guarantee Callout: Typographic, clean, imageless */}
      <section className="py-24 bg-ink text-paper border-t border-blue-soft/20">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-4 block">Waterproofing Philosophy</span>
            <h2 className="text-4xl md:text-5xl tracking-tight text-white mb-6">
              A ledger written in years, concrete, and dry envelopes.
            </h2>
            <p className="text-ink-faint text-md leading-relaxed max-w-xxl">
              We operate strictly via high-tier materials (Sika, BASF, polymeric and SBS bituminous systems) and architect-led supervision. 
              Each project in this index represents decades of verified resilience, resisting high ground water pressure, thermal range extremes, 
              and seasonal precipitation in Lebanon since 1971.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="border border-paper/15 p-8 rounded-sm text-left max-w-sm bg-ink-2">
              <span className="font-display text-2xl font-bold text-white mb-2 block">Zero Failures</span>
              <p className="text-xs text-ink-faint leading-relaxed">
                By maintaining absolute brand neutrality and refusing third-party commissions from raw chemical manufacturers, we deliver designs governed solely by building survival.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
