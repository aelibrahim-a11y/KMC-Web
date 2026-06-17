import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, HelpCircle, HardHat, FileText, CheckCircle2, ListFilter, ArrowRight } from "lucide-react";

interface Layer {
  id: string;
  name: string;
  role: string;
  spec: string;
  kmcTip: string;
  colorClass: string;
  hoverColorClass: string;
  height: number; // visual height in the stack relative representation
  offsetY: number; // position in representation
}

interface BlueprintConfig {
  id: string;
  title: string;
  sub: string;
  standard: string;
  description: string;
  layers: Layer[];
}

const BLUEPRINTS: BlueprintConfig[] = [
  {
    id: "type-a",
    title: "Type A (Barrier Protection)",
    sub: "Exterior Multi-Layer Barrier Envelope",
    standard: "BS 8102:2009 Type A Requirements",
    description: "Type A waterproofing relies on a fully continuous, impenetrable membrane applied to the exterior or interior face of the structural concrete, creating an absolute thermal and moisture envelope.",
    layers: [
      {
        id: "soil",
        name: "Coarse Granular Backfill",
        role: "Groundwater Dissipation",
        spec: "Graded drainage gravel (10-20mm) to direct water downwards to perimeter land drainage pipes.",
        kmcTip: "KMC strictly prohibits soil-only backfills as they settle and clog drainage systems over time.",
        colorClass: "bg-stone-300 border-stone-400",
        hoverColorClass: "bg-stone-200 border-stone-500",
        height: 48,
        offsetY: 0
      },
      {
        id: "drain-board",
        name: "Geotextile Protection Board",
        role: "Physical Puncture Buffer",
        spec: "8mm dimpled HDPE core bonded to non-woven needle-punched geotextile filter fabric.",
        kmcTip: "Serves dual action: cushions the Sika Tiles membrane from gravel compaction, and routes hydrostatic pressure.",
        colorClass: "bg-zinc-600 border-zinc-700",
        hoverColorClass: "bg-zinc-500 border-zinc-900",
        height: 24,
        offsetY: 48
      },
      {
        id: "sika-membrane",
        name: "Sika Tiles Polymer Membrane",
        role: "Primary Elastic Dry Envelope",
        spec: "Elastomeric, fiber-reinforced dual-component waterproofing polymer tiles slurry, applied in 2 continuous coats (2.2mm DFT).",
        kmcTip: "KMC signature application: resists up to 5 bars of physical groundwater backpressure and bridges structural micro-cracks.",
        colorClass: "bg-blue/90 border-blue border-l-4 border-l-gold",
        hoverColorClass: "bg-blue border-blue-deep border-l-4 border-l-gold-soft",
        height: 32,
        offsetY: 72
      },
      {
        id: "concrete-wall",
        name: "Reinforced Structural Concrete",
        role: "Load-Bearing Foundation Substrate",
        spec: "C35/45 water-resistant structural mix design. Compaction verified with high-frequency vibrating needles.",
        kmcTip: "The concrete surface must be mechanically ground to remove any laitance or cure release oils prior to membrane application.",
        colorClass: "bg-stone-450 border-stone-550 pattern-grid",
        hoverColorClass: "bg-stone-400 border-stone-600",
        height: 96,
        offsetY: 104
      },
      {
        id: "primer",
        name: "Epoxy Chemical Primer",
        role: "Deep Substrate Pore Consolidation",
        spec: "Low-viscosity, solvent-free epoxy primer. Penetrates concrete up to 3mm to consolidate crystalline gaps.",
        kmcTip: "Crucial for preventing moisture under-migration. Applied only when cement humidity is below 4%.",
        colorClass: "bg-gold/20 border-gold/40",
        hoverColorClass: "bg-gold/30 border-gold",
        height: 18,
        offsetY: 200
      },
    ]
  },
  {
    id: "type-b",
    title: "Type B (Structurally Integral)",
    sub: "Capillary-Penetrating Crystalline Core",
    standard: "BS 8102:2009 Type B Guidelines",
    description: "Type B waterproofing embeds hydrophobic crystalline chemicals within the concrete batch itself and seals all cold joints mechanically, preventing the transit of moisture through the concrete structure itself.",
    layers: [
      {
        id: "waterstop",
        name: "Hydrophilic Waterstop Profile",
        role: "Cold Joint Hydraulic Sealing",
        spec: "Expansive chloroprene rubber waterstop profile. Expands up to 300% upon contact with incoming groundwater.",
        kmcTip: "Mechanically anchored straight to raw steel reinforcement grids at all primary base slab or construction joint margins.",
        colorClass: "bg-teal-700 border-teal-800",
        hoverColorClass: "bg-teal-600 border-teal-900",
        height: 38,
        offsetY: 0
      },
      {
        id: "crystalline-slab",
        name: "Active Crystalline Concrete (BCS)",
        role: "Self-Healing Water Impermeability",
        spec: "Integral crystalline concrete admixture. Catalyst reacts with moisture to form insoluble silicate fiber networks.",
        kmcTip: "This matrix self-heals hairline shrinkage cracks up to 0.4mm under continuous heavy mountain spring pressure.",
        colorClass: "bg-slate-400 border-slate-500",
        hoverColorClass: "bg-slate-350 border-slate-600",
        height: 110,
        offsetY: 38
      },
      {
        id: "crystalline-coat",
        name: "Penetrative Cementitious Slurry",
        role: "Internal Capillary Blocking",
        spec: "Concentrated active crystalline chemical coat brush-applied directly to wet interior basement faces.",
        kmcTip: "Excellent for existing basements where exterior digging is structurally impossible. Driven by osmose action.",
        colorClass: "bg-blue-mist-soft border-blue-soft",
        hoverColorClass: "bg-blue-mist border-blue",
        height: 28,
        offsetY: 148
      },
    ]
  },
  {
    id: "type-c",
    title: "Type C (Drained Protection)",
    sub: "Internal Seepage Flow Management",
    standard: "BS 8102:2009 Type C Class-3 Std",
    description: "Type C waterproofing assumes water will eventually breach outer envelope boundaries. It safely routes incoming moisture under full control, preventing basement humidity and floor flooding.",
    layers: [
      {
        id: "outer-wall",
        name: "External Retaining Diaphragm Wall",
        role: "Primary Hydrostatic Shield",
        spec: "Cast-in-place retaining concrete diaphragm wall designed to bear earth expansion loads.",
        kmcTip: "Though strong, construction cracks and honeycombs almost always weep under spring thaws without Type C back-up.",
        colorClass: "bg-stone-505 border-stone-605",
        hoverColorClass: "bg-stone-405 border-stone-705",
        height: 56,
        offsetY: 0
      },
      {
        id: "dimpled-cavity",
        name: "HDPE Studded Cavity Drain Tile",
        role: "Free-Flowing Gravity Air Gap",
        spec: "8mm dimpled high-density polyethylene membrane anchored mechanically with load-spreading watertight plugs.",
        kmcTip: "Creates a designated continuous route for water to weep down to base channels without exerting backpressure against the wall.",
        colorClass: "bg-zinc-850 border-zinc-950",
        hoverColorClass: "bg-zinc-750 border-zinc-950",
        height: 32,
        offsetY: 56
      },
      {
        id: "perimeter-channel",
        name: "Modular Drainage Conduit",
        role: "Moisture Collection & Runoff Route",
        spec: "Rigid PVC perimeter conduit with multiple water ingress slots and integrated flushing inspection ports.",
        kmcTip: "Must be laid in a dry, pre-cast slab channel with continuous slope leading directly to the dual-sump tank.",
        colorClass: "bg-gold border-gold-deep",
        hoverColorClass: "bg-gold-soft border-gold-deep",
        height: 34,
        offsetY: 88
      },
      {
        id: "sump-pump",
        name: "Dual Sump-Pump Station",
        role: "Controlled Fluid Extraction",
        spec: "Dual high-load cast iron submersible sump-pump system rigged to an automatic alternator and battery back-up module.",
        kmcTip: "Includes high-water alerts connected directly to the building management system (BMS) for extreme security.",
        colorClass: "bg-sky-950 border-sky-850 text-white",
        hoverColorClass: "bg-sky-850 border-sky-750 text-white",
        height: 54,
        offsetY: 122
      },
      {
        id: "drywall-panel",
        name: "Internal Dry Lining Envelope",
        role: "Aesthetic Interior Wall Cavity",
        spec: "Moisture-resistant plasterboard skin, secured to independent galvanized steel stud frames blocks.",
        kmcTip: "Thermally isolated. This surface remains completely dry, and room relative humidity remains fully controlled.",
        colorClass: "bg-stone-100 border-stone-300",
        hoverColorClass: "bg-stone-50 border-stone-400",
        height: 38,
        offsetY: 176
      },
    ]
  }
];

export default function BlueprintDiagram() {
  const [selectedTab, setSelectedTab] = useState<string>("type-a");
  const [hoveredLayer, setHoveredLayer] = useState<Layer | null>(null);
  const [clickedLayer, setClickedLayer] = useState<Layer | null>(null);

  const currentBlueprint = BLUEPRINTS.find(b => b.id === selectedTab) || BLUEPRINTS[0];
  const activeDetailLayer = hoveredLayer || clickedLayer || currentBlueprint.layers[0];

  return (
    <div id="interactive-blueprints" className="bg-paper border border-blue-soft/30 rounded-sm p-6 md:p-10 shadow-lg">
      
      {/* Segment Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-blue-mist pb-8 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2.5 py-1 bg-blue/10 border border-blue-soft text-blue text-[9px] font-mono font-bold uppercase tracking-wider rounded-sm">
              Specification Blueprint
            </span>
            <span className="text-[10px] font-mono text-ink-faint uppercase font-bold tracking-widest">
              BS 8102:2009 Standards
            </span>
          </div>
          <h3 className="font-display font-bold text-2xl md:text-3xl text-ink tracking-tight">
            Structural Envelope Assembly
          </h3>
        </div>
        
        {/* Navigation Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {BLUEPRINTS.map(b => (
            <button
              key={b.id}
              onClick={() => {
                setSelectedTab(b.id);
                setHoveredLayer(null);
                setClickedLayer(null);
              }}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all border whitespace-nowrap ${
                selectedTab === b.id
                  ? "bg-blue text-white border-blue shadow-md shadow-blue/15"
                  : "bg-paper text-ink-soft border-blue-soft/20 hover:border-blue-soft hover:bg-blue-mist"
              }`}
            >
              {b.id === "type-a" ? "Type A" : b.id === "type-b" ? "Type B" : "Type C"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Vector Schematic Graphic Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-ink flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gold" />
              {currentBlueprint.title}
            </h4>
            <p className="text-[11px] text-ink-soft mt-1 leading-snug">
              {currentBlueprint.sub} · <span className="font-mono text-blue font-semibold">{currentBlueprint.standard}</span>
            </p>
          </div>

          {/* Interactive Stack Visualization Canvas */}
          <div className="relative bg-paper-2 rounded-sm border border-blue-soft/20 p-6 md:p-8 flex flex-col items-center justify-center overflow-hidden min-h-[360px]">
            
            {/* Grid background representing architectural ledger sheet */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="diag-bprint" width="20" height="20" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="20" x2="20" y2="0" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diag-bprint)" />
              </svg>
            </div>

            {/* Simulated Water direction label */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue animate-ping" />
              <span className="font-mono text-[8px] uppercase text-blue font-bold tracking-widest bg-blue/5 border border-blue/20 px-1.5 py-0.5 rounded-sm">
                Hydrostatic Exposure Face
              </span>
            </div>

            {/* Architectural Stack representation */}
            <div className="w-full max-w-[280px] flex flex-col space-y-[2px] relative z-10 my-4 select-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBlueprint.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-[3px]"
                >
                  {currentBlueprint.layers.map((layer) => {
                    const isActive = activeDetailLayer.id === layer.id;
                    return (
                      <div
                        key={layer.id}
                        onMouseEnter={() => setHoveredLayer(layer)}
                        onMouseLeave={() => setHoveredLayer(null)}
                        onClick={() => setClickedLayer(layer)}
                        style={{ height: `${layer.height}px` }}
                        className={`w-full border-2 rounded-sm transition-all duration-300 cursor-pointer flex flex-col justify-center px-4 relative group ${
                          isActive
                            ? `${layer.hoverColorClass} scale-[1.03] shadow-md z-30 ring-1 ring-gold/40`
                            : `${layer.colorClass} opacity-85 hover:opacity-100 hover:scale-[1.01]`
                        }`}
                      >
                        {/* Interactive Layer Visual Texture Indicators */}
                        {layer.id === "sika-membrane" && (
                          <div className="absolute inset-0 bg-blue/5 opacity-50 border-r-2 border-dashed border-gold/40 pointer-events-none" />
                        )}
                        {layer.id === "concrete-wall" && (
                          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />
                        )}
                        {layer.id === "crystalline-slab" && (
                          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:6px_6px]" />
                        )}

                        <div className="flex items-center justify-between pointer-events-none">
                          <span className={`font-display text-[11px] font-bold ${
                            layer.id === "sika-membrane" || layer.id === "sump-pump" ? "text-white" : "text-ink"
                          }`}>
                            {layer.name}
                          </span>
                          
                          {/* Circle indicators */}
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-transform ${
                            isActive ? "bg-gold border-gold scale-125 text-ink" : "bg-white/20 border-ink/10 text-ink/40 group-hover:bg-white group-hover:scale-110"
                          }`}>
                            <span className="text-[8px] font-mono font-bold">i</span>
                          </div>
                        </div>

                        {/* Layer indicator rule alignment marker */}
                        {isActive && (
                          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-gold rounded-full" />
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Guide Tip under the canvas */}
            <div className="mt-2 text-center pointer-events-none">
              <span className="text-[9px] font-mono text-ink-faint uppercase font-semibold">
                Hover or Tap layers above to audit specific mechanics
              </span>
            </div>

          </div>
        </div>

        {/* Right Side: Architectural Material Data-Sheet Card */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full bg-paper border border-blue-soft/20 rounded-sm p-6 relative">
          
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-blue-mist pb-4">
              <div>
                <span className="text-[10px] font-mono text-gold-soft uppercase tracking-widest font-bold">
                  Material Spec Sheet
                </span>
                <h4 className="font-display font-bold text-xl text-ink leading-tight mt-1">
                  {activeDetailLayer.name}
                </h4>
              </div>
              <span className="px-2.5 py-1 bg-blue-mist-soft border border-blue-soft/20 font-mono text-[9px] font-bold text-blue uppercase tracking-widest rounded-sm">
                Layer {currentBlueprint.layers.findIndex(l => l.id === activeDetailLayer.id) + 1} of {currentBlueprint.layers.length}
              </span>
            </div>

            <div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-ink-faint font-bold mb-2">
                Mechanical Core Action (Role)
              </p>
              <div className="flex items-center gap-2 bg-blue-mist-soft px-3 py-2 rounded-sm border border-blue-soft/10 text-xs font-semibold text-ink">
                <span className="w-1.5 h-1.5 rounded-full bg-blue" />
                {activeDetailLayer.role}
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-ink-faint font-bold mb-2">
                Unified Tender Specification
              </p>
              <p className="text-sm text-ink-soft leading-relaxed font-mono bg-paper p-3 rounded-sm border border-blue-soft/20 whitespace-pre-wrap">
                {activeDetailLayer.spec}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase font-mono tracking-widest text-gold-soft font-bold mb-2 flex items-center gap-1.5">
                <HardHat className="w-3.5 h-3.5 shrink-0" />
                The KMC Professional Standard
              </p>
              <p className="text-xs text-ink bg-amber-50/40 p-4 border-l-2 border-l-gold border border-amber-100 rounded-sm leading-relaxed">
                {activeDetailLayer.kmcTip}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-blue-mist flex items-center justify-between text-[10px] text-ink-faint uppercase font-bold tracking-widest">
            <span className="flex items-center gap-1 text-green-700">
              <CheckCircle2 className="w-3.5 h-3.5" /> Certified Assembly
            </span>
            <span>
              KMC LEDGER SPECIFICATION
            </span>
          </div>

        </div>

      </div>

      {/* BS 8102 Summary note callout block under the diagram */}
      <div className="mt-8 bg-paper-2 border border-blue-soft/30 p-4 rounded-sm flex items-start gap-4">
        <Info className="w-5 h-5 text-blue shrink-0 mt-0.5" />
        <div>
          <h5 className="text-xs font-bold text-ink uppercase tracking-wider">
            About British Standard BS 8102:2009 Regulations Compliance
          </h5>
          <p className="text-[11px] text-ink-soft leading-relaxed mt-1">
            Lebanon's high subterranean moisture profiles present complex geological challenges. By ensuring full alignment with BS 8102 design criteria, Kassem Mansour Co. designates Class 1, 2, or 3 environments according to client-usage. For critical computer datacenters, standard records, and archive spaces in Lebanon, we repeatedly combine multiple redundant forms of protection (e.g. Type A plus active concrete Type B crystalline matrices).
          </p>
        </div>
      </div>

    </div>
  );
}
