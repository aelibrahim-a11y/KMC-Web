import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, 
  Compass, 
  SquareStack, 
  ArrowRight, 
  Layers, 
  Grid, 
  MapPin, 
  ShieldCheck, 
  Volume2, 
  MapIcon 
} from "lucide-react";
import { Project } from "@/src/utils/projectParser";

interface RegionConfig {
  id: string;
  name: string;
  coords: { x: number; y: number }; // Precise coordinates in the 300x500 Lebanon Cadastre viewport
  matchTokens: string[];
  description: string;
  regionalHighlight: string;
}

const REGIONS: RegionConfig[] = [
  {
    id: "tri-north",
    name: "Tripoli & North District",
    coords: { x: 195, y: 90 },
    matchTokens: ["tripoli", "batroun", "north"],
    description: "Crucial regulatory government and historical education envelopes, subject to high seaside saline atmosphere exposure and heavy dynamic mountain rainfall cycles.",
    regionalHighlight: "Seaside saline protection & heavy rainfall defenses."
  },
  {
    id: "beirut-center",
    name: "Beirut Hub & Coastal Core",
    coords: { x: 140, y: 220 },
    matchTokens: ["beirut", "bliss", "achrafieh", "verdun", "masaref", "foch", "mosaytbeh", "kassar", "manara", "koraytem", "michelin", "toufoulah", "elias", "bristol", "downtown", "mikhael", "watih", "mazraa", "hamra"],
    description: "Waterproofing records in Beirut's banking districts, diplomatic headquarters, high-density residential penthouses, retail properties, and critical medical infrastructures.",
    regionalHighlight: "Deep subgrade tanking & dynamic multi-layered joint locks."
  },
  {
    id: "mount-lebanon",
    name: "Mount Lebanon Governorate",
    coords: { x: 175, y: 260 },
    matchTokens: ["hazmieh", "brazilia", "aramoun", "rabieh", "rihani", "aintoura", "dbayeh", "baskinta", "hadath", "chamlan", "hassan", "zahleh"],
    description: "High-spec custom residential villas, historical stone campuses, and complex subgrade foundations running over volatile limestone water streams and high tectonic slopes.",
    regionalHighlight: "Limestone drainage integration & elastomeric shear-joint seals."
  },
  {
    id: "zahleh-bekaa",
    name: "Zahleh & Bekaa Valley",
    coords: { x: 225, y: 300 },
    matchTokens: ["zahleh", "zahle", "bekaa"],
    description: "Regional Palaces of Justice and agricultural storage envelopes requiring complex thermal-bridging systems designed to withstand harsh alpine winters and dry summer expansions.",
    regionalHighlight: "UV-stable roof membranes & joint systems for thermal stress."
  },
  {
    id: "south-ghazieh",
    name: "South Lebanon District",
    coords: { x: 100, y: 380 },
    matchTokens: ["ghazieh", "sidon", "saida", "tyre", "south"],
    description: "Sub-coastal manufacturing plants and regional commercial nodes demanding durable containment barriers against high moisture infiltration and marine saline soil pressures.",
    regionalHighlight: "Anti-corrosive concrete preservation & sea-level vapor barriers."
  }
];

interface LebanonMapProps {
  projects: Project[];
}

export default function LebanonMap({ projects }: LebanonMapProps) {
  const [selectedRegionId, setSelectedRegionId] = useState<string>("beirut-center");
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);

  // Group projects into regions dynamically by matching text tokens
  const regionalData = useMemo(() => {
    return REGIONS.map(region => {
      const filtered = projects.filter(p => {
        const text = `${p.location} ${p.name}`.toLowerCase();
        return region.matchTokens.some(token => text.includes(token));
      });

      const totalArea = filtered.reduce((acc, p) => acc + (p.area_m2 || 0), 0);

      // Extract a few premier projects illustrative of standard systems in that cluster
      const exemplary = filtered.slice(0, 4);

      return {
        ...region,
        projectCount: filtered.length,
        totalArea,
        exemplaryProjects: exemplary
      };
    });
  }, [projects]);

  // Active region is strictly updated via click (selectedRegionId) to prevent hover height flutters
  const activeRegion = useMemo(() => {
    return regionalData.find(r => r.id === selectedRegionId) || regionalData[1];
  }, [regionalData, selectedRegionId]);

  // Hovered region is used strictly for map visual scaling and map-local SVG tooltip
  const hoveredRegion = useMemo(() => {
    return regionalData.find(r => r.id === hoveredRegionId);
  }, [regionalData, hoveredRegionId]);

  return (
    <div id="district-cluster-map" className="bg-paper border border-blue-soft/30 rounded-sm p-4 sm:p-6 lg:p-10 shadow-lg relative overflow-hidden">
      
      {/* Background Graphic Accent Grids */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header section with Dynamic Counters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-blue-mist pb-8 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-widest">
              Macro and Micro Geological Blueprint
            </span>
          </div>
          <h3 className="font-display font-medium text-3xl md:text-4xl text-ink tracking-tight">
            Mediterranean & Levant Distribution
          </h3>
          <p className="text-xs text-ink-soft mt-1 leading-relaxed max-w-2xl">
            Tracing Kassem Mansour Co.'s architectural waterproofing footprint across the Levant. Observe the structural interaction of subterranean mountain aquifer loads and coastal marine saline waterheads mapped across regional hubs.
          </p>
        </div>
        
        {/* Total Ledger statistics */}
        <div className="flex items-center gap-6 self-start lg:self-center">
          <div className="bg-blue/5 border border-blue-soft/30 px-4 py-2 rounded-sm text-right">
            <span className="text-[9px] font-mono text-ink-faint uppercase font-bold tracking-widest block">Inhabitants Protected</span>
            <span className="font-mono text-sm font-bold text-blue tracking-wider mt-0.5">380,000+ Lebanese</span>
          </div>
          <div className="bg-gold/5 border border-gold-soft/30 px-4 py-2 rounded-sm text-right">
            <span className="text-[9px] font-mono text-ink-faint uppercase font-bold tracking-widest block">Sealed Ledger Area</span>
            <span className="font-mono text-sm font-bold text-gold tracking-wider mt-0.5">285,000+ m²</span>
          </div>
        </div>
      </div>

      {/* integrated Global Levant Map & Zoom Blueprint Framework */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-stretch relative z-10 mb-10">
        
        {/* World / Mediterranean Basin Vector Outline Map Context */}
        <div className="lg:col-span-12 bg-stone-900 text-white rounded-sm border border-stone-800 p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-3 right-4 font-mono text-[8px] text-stone-500 font-bold uppercase tracking-wider">
            Projection: Levant Basin WGS84
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* World / Mediterranean map SVG */}
            <div className="md:col-span-5 h-[180px] bg-stone-950 border border-stone-800 rounded-sm relative overflow-hidden flex items-center justify-center">
              
              {/* Technical lat/long dashed grid overlay */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="world-blueprint-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#world-blueprint-grid)" />
                </svg>
              </div>

              <svg viewBox="0 0 400 180" className="w-full h-full text-stone-600 pointer-events-none relative z-10">
                {/* Visual coordinate labels */}
                <text x="12" y="18" className="font-mono text-[7px] text-stone-500">35°N</text>
                <text x="12" y="162" className="font-mono text-[7px] text-stone-500">30°N</text>
                <text x="80" y="172" className="font-mono text-[7px] text-stone-500">30°E</text>
                <text x="310" y="172" className="font-mono text-[7px] text-stone-500">36°E</text>
                
                {/* Greece / Aegean shorelines */}
                <path 
                  d="M 10,25 L 30,30 L 50,22 L 70,35 L 80,48 L 95,30 L 115,22 L 140,28 L 175,25 L 210,18 L 245,28 Q 260,35 290,30 L 320,18" 
                  className="fill-none stroke-stone-700" 
                  strokeWidth="1" 
                  strokeDasharray="2,2"
                />

                {/* Europe & Turkey Coastline (Warm Filled Polygon) */}
                <path 
                  d="M 5,5 L 85,8 L 130,5 L 180,10 L 220,12 L 260,25 L 290,15 L 340,20 L 380,28 L 395,38 L 395,65 L 350,70 L 320,62 L 300,68 L 295,85 L 320,95 L 350,110 L 395,120 L 395,175 L 330,175 L 310,135 L 285,110 L 268,90 L 255,87 L 235,95 L 212,100 L 182,105 L 142,108 L 112,112 L 72,115 L 5,110 Z" 
                  className="fill-stone-800/40 stroke-stone-700/60" 
                  strokeWidth="0.75" 
                />

                {/* Cyprus Island */}
                <path 
                  d="M 230,73 L 252,68 L 268,69 L 260,78 L 242,80 L 234,77 Z" 
                  className="fill-stone-850 stroke-stone-600" 
                  strokeWidth="0.75" 
                />

                {/* Mediterranean ocean typographic ledger */}
                <text x="100" y="115" className="font-display italic text-[8px] tracking-[0.25em] fill-stone-500 uppercase">Mediterranean Basin</text>

                {/* Interactive coordinate lines locking in Lebanon */}
                <line x1="297" y1="10" x2="297" y2="165" className="stroke-gold/30 stroke-[0.5]" strokeDasharray="2,2" />
                <line x1="10" y1="85" x2="390" y2="85" className="stroke-gold/30 stroke-[0.5]" strokeDasharray="2,2" />

                {/* HIGH-INTENSITY BEACON TARGET ON LEBANON */}
                <g transform="translate(297, 85)">
                  {/* Multiple concentric pulsing glowing rings */}
                  <circle r="14" className="fill-none stroke-blue/40 animate-ping" strokeWidth="0.5" />
                  <circle r="9" className="fill-gold/15 stroke-gold/40 animate-pulse" strokeWidth="0.75" />
                  <circle r="5" className="fill-blue/40 stroke-white/80" strokeWidth="0.5" />
                  <circle r="2.5" className="fill-gold animate-bounce" />
                </g>

                {/* Highlight Tag */}
                <text x="312" y="81" className="font-mono text-[9px] font-bold fill-gold tracking-widest bg-stone-950/80">KMC TARGET LEBANON</text>
                
                {/* Direction indicators */}
                <text x="295" y="160" className="font-mono text-[6px] fill-stone-500 text-center">35.86° E</text>
                <text x="355" y="83" className="font-mono text-[6px] fill-stone-500">33.85° N</text>

                {/* MAGNIFICATION LENS INLAY CENTERED ON LEBANON */}
                <g transform="translate(345, 126)" className="pointer-events-none">
                  {/* Magnified view circle mask background */}
                  <circle r="26" fill="#0c0a09" className="stroke-gold stroke-[1.25]" />
                  {/* Subtle target grid lines inside zoom lens */}
                  <line x1="-26" y1="0" x2="26" y2="0" className="stroke-stone-800 stroke-[0.5]" />
                  <line x1="0" y1="-26" x2="0" y2="26" className="stroke-stone-800 stroke-[0.5]" />
                  <circle r="16" className="fill-none stroke-stone-800 stroke-[0.5]" strokeDasharray="2,2" />
                  
                  {/* Magnified hyper-clean vector shape of Lebanon */}
                  <path
                    d="M -6,-15 
                       L 3,-11
                       L 9,-3
                       L 11,5
                       L 7,10
                       L 9,16
                       L -3,12
                       L -11,-3
                       L -3,-11
                       Z"
                    fill="rgba(56, 128, 168, 0.25)"
                    className="stroke-gold fill-blue/20"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Lens border decor */}
                  <circle r="26" className="fill-none stroke-gold" strokeWidth="1.25" />
                  <circle r="29" className="fill-none stroke-blue/45" strokeWidth="0.5" strokeDasharray="3,1" />
                  
                  {/* Micro typographic label inside the lens */}
                  <text x="0" y="22" className="font-mono text-[5px] font-bold fill-white/90 text-center" textAnchor="middle">
                    ZOOM INLAY
                  </text>
                </g>

                {/* Dashed lead line from Lebanon true position (297,85) to the lens center (345,126) */}
                <path 
                  d="M 297,85 C 315,85 320,126 345,126" 
                  fill="none" 
                  className="stroke-gold/50 stroke-[0.75]" 
                  strokeDasharray="2,2"
                />
              </svg>

              {/* Focus Coordinate Compass Widget */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-stone-900/80 border border-stone-800 px-2 py-0.5 rounded-sm font-mono text-[7px] text-stone-400">
                <Compass className="w-3 h-3 text-gold animate-spin-slow" />
                <span>HELLENIC-LEVANT AXIS</span>
              </div>
            </div>

            {/* Geographical explanation context */}
            <div className="md:col-span-7 space-y-3">
              <h4 className="font-display font-medium text-lg text-gold flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue shrink-0" />
                Geologic Hydrodynamic Convergence
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Waterproofing in Lebanon requires managing complex karst limestone geological structures. Moving west to east, severe marine saline atmospheres saturate the coast, while the Mount Lebanon range acts as an alpine sponge. Heavy winter snow melts rapidly, creating temporary underground hydrostatic pressure heads that bypass traditional barriers. Our assemblies are uniquely designed to counter these twin stresses.
              </p>
              
              {/* Highlight statistics */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="border border-stone-800 p-3 rounded-sm bg-stone-950/50">
                  <span className="font-mono text-[9px] text-stone-400 uppercase tracking-widest block">Marine Saline Exposure</span>
                  <span className="font-sans text-xs font-semibold text-white mt-1 block">Continuous 100% saturation zone</span>
                </div>
                <div className="border border-stone-800 p-3 rounded-sm bg-stone-950/50">
                  <span className="font-mono text-[9px] text-stone-400 uppercase tracking-widest block">Subterranean Hydraulic Head</span>
                  <span className="font-sans text-xs font-semibold text-white mt-1 block">Up to 2.5 bar hydrostatic load</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Main interactive sector: Left detailed cadastre map, right analytical log drawer */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left pane: High-Fidelity Lebanon Cadastre Blueprint Canvas */}
        <div className="lg:col-span-5 bg-paper-2 border border-blue-soft/10 rounded-sm p-4 sm:p-6 flex flex-col items-center justify-center relative min-h-[380px] sm:min-h-[460px] overflow-hidden">
          
          {/* Subtle architectural blueprints grid overlay */}
          <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="detail-blueprint-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#detail-blueprint-grid)" />
            </svg>
          </div>

          <div className="absolute bottom-4 left-4 z-10 font-mono text-[9px] text-ink-faint uppercase tracking-widest">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 bg-blue rounded-full animate-ping" />
              Hover or click target circles safely
            </div>
            <span>Projection: Cadastre Vector Detail</span>
          </div>

          <div className="absolute top-4 right-4 z-10 text-right pointer-events-none">
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">Focus Sector</span>
            <span className="font-mono text-[8px] text-zinc-400">Scale 1:250,000 WGS84</span>
          </div>

          {/* Master Vector map outline of Lebanon - custom scaled on mobile/tablet to avoid overflow */}
          <div className="relative w-full max-w-[220px] sm:max-w-[280px] h-[360px] sm:h-[480px] z-10 flex items-center justify-center">
            
            <svg 
              viewBox="0 0 300 500" 
              className="w-full h-full text-zinc-350 pointer-events-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer boundary of Lebanon - Stylized Segmented path with solid beige fallback to prevent solid black loading glitch */}
              <g id="lebanon-border-outline">
                <path 
                  d="M 180,30 
                     L 220,50 
                     L 240,90 
                     L 255,140 
                     L 245,185 
                     L 260,240 
                     L 230,310 
                     L 215,360 
                     L 165,420 
                     L 145,470 
                     L 115,465 
                     L 95,440 
                     L 90,400 
                     L 115,360 
                     L 130,290 
                     L 135,240 
                     L 130,190 
                     L 145,150 
                     L 160,110 
                     L 165,70 
                     Z" 
                  fill="#ebf3f7"
                  stroke="#90b2c7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-blue-soft/30 fill-blue-mist/20 transition-all duration-300"
                />
                
                {/* Secondary inner contour echo for technical architectural ledger blueprint effect */}
                <path 
                  d="M 177,35 
                     L 215,53 
                     L 234,91 
                     L 249,139 
                     L 240,183 
                     L 254,237 
                     L 225,306 
                     L 210,355 
                     L 161,415 
                     L 141,463 
                     L 118,459 
                     L 100,436 
                     L 95,397 
                     L 119,358 
                     L 133,288 
                     L 138,239 
                     L 133,191 
                     L 148,152 
                     L 163,112 
                     L 167,73 
                     Z" 
                  strokeWidth="0.75"
                  strokeDasharray="3,3"
                  className="stroke-zinc-350"
                  fill="none"
                />
              </g>

              {/* Connecting schematics/latitude lines layout */}
              <g className="stroke-zinc-200/50 stroke-[0.5] pointer-events-none">
                <line x1="10" y1="100" x2="290" y2="100" />
                <line x1="10" y1="220" x2="290" y2="220" />
                <line x1="10" y1="360" x2="290" y2="360" />
                <line x1="140" y1="10" x2="140" y2="490" />
              </g>

              {/* Regional interactive cluster nodes */}
              {regionalData.map((region) => {
                const isActive = activeRegion.id === region.id;
                const isRegionHovered = hoveredRegionId === region.id;
                const hasProjects = region.projectCount > 0;

                return (
                  <g 
                    key={region.id}
                    className="group"
                  >
                    {/* Pulsing glow ring around active/hovered nodes - marked pointer-events-none */}
                    {hasProjects && (
                      <circle
                        cx={region.coords.x}
                        cy={region.coords.y}
                        r={isActive || isRegionHovered ? 22 : 12}
                        className={`fill-none pointer-events-none transition-all duration-300 ${
                          isActive || isRegionHovered 
                            ? "stroke-gold/50 stroke-2 animate-pulse" 
                            : "stroke-blue/20 stroke-[1.5]"
                        }`}
                      />
                    )}

                    {/* Concentric node boundaries - marked pointer-events-none */}
                    <circle
                      cx={region.coords.x}
                      cy={region.coords.y}
                      r={isActive || isRegionHovered ? 14 : 7}
                      className={`transition-all duration-300 pointer-events-none ${
                        isActive || isRegionHovered
                          ? "fill-blue stroke-gold stroke-[2]"
                          : "fill-paper-2 stroke-blue-soft stroke-[1.5]"
                      }`}
                    />

                    {/* Highly interactive small core indicator dot - marked pointer-events-none */}
                    <circle
                      cx={region.coords.x}
                      cy={region.coords.y}
                      r={isActive || isRegionHovered ? 5 : 3}
                      className={`transition-all duration-300 pointer-events-none ${
                        isActive || isRegionHovered ? "fill-gold" : "fill-blue"
                      }`}
                    />

                    {/* Text Label on the Map Vector Canvas - marked pointer-events-none */}
                    <text
                      x={region.coords.x + 16}
                      y={region.coords.y + 4}
                      className={`font-display text-[9px] tracking-tight select-none pointer-events-none transition-all ${
                        isActive || isRegionHovered 
                          ? "fill-blue-deep font-bold font-semibold" 
                          : "fill-ink-soft font-medium"
                      }`}
                    >
                      {region.name.split(" ")[0]} 
                      <tspan className="font-mono font-bold text-blue ml-1">
                        ({region.projectCount})
                      </tspan>
                    </text>

                    {/* FIXED: Smaller, completely isolated target hitbox. */}
                    {/* Radius is 18px to prevent ANY physical coordinate overlaps (eliminates hover glitching completely). */}
                    <circle
                      cx={region.coords.x}
                      cy={region.coords.y}
                      r={18}
                      className="fill-transparent stroke-none cursor-pointer pointer-events-auto"
                      onMouseEnter={() => setHoveredRegionId(region.id)}
                      onMouseLeave={() => setHoveredRegionId(null)}
                      onClick={() => setSelectedRegionId(region.id)}
                    />
                  </g>
                );
              })}

              {/* Local SVG Tooltip on Hover (prevents layout-shift and eliminates flickering completely!) */}
              {hoveredRegion && (
                <g 
                  transform={`translate(${
                    hoveredRegion.coords.x > 150 
                      ? hoveredRegion.coords.x - 122 
                      : hoveredRegion.coords.x + 12
                  }, ${hoveredRegion.coords.y - 42})`}
                  className="pointer-events-none z-50 transition-all duration-200"
                >
                  <rect
                    width="112"
                    height="38"
                    rx="3"
                    fill="#1c1917"
                    className="fill-stone-900/98 stroke-gold/60"
                    strokeWidth="0.75"
                  />
                  <text x="8" y="13" fill="#ffffff" className="font-sans text-[7.5px] font-bold">
                    {hoveredRegion.name.split(" ")[0]} Hub
                  </text>
                  <text x="8" y="22" fill="#e5c893" className="font-mono text-[6.5px] font-semibold">
                    {hoveredRegion.projectCount} Projects Cataloged
                  </text>
                  <text x="8" y="30" fill="#a8a29e" className="font-mono text-[5.5px]">
                    Click node to view spec details
                  </text>
                </g>
              )}
            </svg>

          </div>
        </div>

        {/* Right Grid: Detailed analytics of current hovered/selected district */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-paper border border-blue-soft/20 p-6 md:p-8 rounded-sm relative">
          
          <div className="space-y-6">
            
            {/* Header statistics block */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-blue-mist pb-5">
              <div>
                <span className="text-[10px] font-mono text-gold-soft uppercase tracking-widest font-bold">
                  Active Region Project Ledger
                </span>
                <h4 className="font-display font-medium text-2xl text-ink tracking-tight mt-1">
                  {activeRegion.name}
                </h4>
              </div>
              
              <div className="flex items-center gap-1.5 self-start shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
                <span className="font-mono text-[10px] font-bold text-blue uppercase tracking-widest bg-blue/5 border border-blue-soft/20 px-2 py-1 rounded-sm">
                  Active Hub Query
                </span>
              </div>
            </div>

            {/* Geological/Structural context */}
            <div className="bg-paper-2 p-4 rounded-sm border border-blue-soft/15 space-y-2">
              <p className="text-xs text-ink-soft leading-relaxed">
                {activeRegion.description}
              </p>
              <div className="pt-2 border-t border-blue-mist flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span className="font-mono text-[9px] text-gold font-bold uppercase tracking-wider">
                  System Detail: {activeRegion.regionalHighlight}
                </span>
              </div>
            </div>

            {/* Key Performance Indicators for the region */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-blue-soft/20 p-3 sm:p-4 rounded-sm bg-paper hover:bg-blue-mist/10 transition-colors">
                <span className="text-[9px] font-mono text-ink-faint uppercase font-bold tracking-widest block mb-1">
                  Sealed Portfolio Projects
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-ink">
                  {activeRegion.projectCount} Records
                </span>
              </div>

              <div className="border border-blue-soft/20 p-3 sm:p-4 rounded-sm bg-paper hover:bg-blue-mist/10 transition-colors">
                <span className="text-[9px] font-mono text-ink-faint uppercase font-bold tracking-widest block mb-1">
                  Total Insulated Area
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-blue">
                  {activeRegion.totalArea > 0 ? `${activeRegion.totalArea.toLocaleString()} m²` : "1,500+ m²"}
                </span>
              </div>
            </div>

            {/* Dynamic exemplar projects logged list */}
            <div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-ink-faint font-bold mb-3 flex items-center gap-1.5">
                <SquareStack className="w-3.5 h-3.5 text-blue" />
                Exemplar Technical Specs mapped For {activeRegion.name.split(" ")[0]}
              </p>

              {activeRegion.projectCount === 0 ? (
                <div className="text-center py-8 border border-dashed border-blue-soft/20 rounded-sm">
                  <span className="text-xs text-ink-faint font-mono">No matching records correspond to your active query filter.</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {activeRegion.exemplaryProjects.map((p, idx) => (
                    <div 
                      key={p.name + idx}
                      className="group/item flex items-start gap-4 p-3 bg-paper hover:bg-blue-mist/20 border border-blue-soft/10 hover:border-blue-soft/30 rounded-sm transition-all duration-200"
                    >
                      <span className="font-mono text-[10px] font-bold text-ink-faint w-4 pt-0.5">
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <h5 className="font-sans text-xs font-semibold text-ink group-hover/item:text-blue-deep leading-tight">
                            {p.name}
                          </h5>
                          <span className="font-mono text-[9px] text-blue font-semibold shrink-0">
                            {p.year}
                          </span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-x-3 gap-y-1 text-[10px] text-ink-soft leading-tight">
                          <span>{p.location}</span>
                          <span className="hidden sm:inline text-zinc-400">·</span>
                          <span className="italic font-sans text-ink-faint">{p.system}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Bottom Call Action */}
          <div className="mt-8 pt-6 border-t border-blue-mist flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-[9px] font-mono text-ink-faint uppercase font-bold tracking-widest leading-relaxed">
              * Kassem Mansour Co. manages full project specifications from {projects[projects.length - 1]?.year || 1972} to {projects[0]?.year || 2026}
            </span>
            
            <a 
              href="#project-ledger-list" 
              className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue hover:text-blue-deep flex items-center gap-1.5 transition-all self-end"
            >
              Examine Complete Ledger list <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
