import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  ShieldAlert, 
  Droplet, 
  AlertTriangle, 
  Compass, 
  Layers, 
  Check, 
  FileText, 
  Calendar,
  Waves,
  MapPin,
  ClipboardCheck,
  Send
} from "lucide-react";
import { Link } from "react-router-dom";

interface Question {
  id: string;
  text: string;
  label: string;
  options: {
    value: string;
    label: string;
    desc: string;
    metadata?: string;
  }[];
}

const DIAGNOSTIC_QUESTIONS: Question[] = [
  {
    id: "location",
    text: "Where is the water intrusion or moisture breach located?",
    label: "Envelope Zone",
    options: [
      {
        value: "subterranean-wall",
        label: "Subterranean Basement / Retaining Wall",
        desc: "Moisture emerging through crawlspaces, retaining walls, or deep cellar floors.",
        metadata: "Usually subject to sustained lateral earth hydrostatic pressure."
      },
      {
        value: "roof-terrace",
        label: "Flat Roof, Terrace, or Garden Bed",
        desc: "Dripping from horizontal upper slabs, exposed garden beds, or penthouse margins.",
        metadata: "Subject to thermal expansions, standing rainwater, or organic root growth."
      },
      {
        value: "joint-only",
        label: "Construction / Expansion Joint Margins",
        desc: "Weeping specifically localized to cold joints or structural concrete block boundaries.",
        metadata: "Typically signals shearing failure in waterstops or sealant compounds."
      },
      {
        value: "water-cistern",
        label: "Water Reservoir, Lift-Pit, or Pool Shell",
        desc: "Cracks on water-retaining concrete bodies (internal-to-external containment).",
        metadata: "Subject to high continuous internal hydraulic load or localized subgrade ingress."
      }
    ]
  },
  {
    id: "timing",
    text: "When is the seepage rate or leaking pathology at its worst?",
    label: "Intrusion Timing Profile",
    options: [
      {
        value: "post-snowmelt",
        label: "Severe Surges During Winter & Mountain Snowmelt",
        desc: "Surges dynamically with high rainstorms or spring meltwater in karst aquifers.",
        metadata: "Indicative of temporary, extremely high hydrostatic heads in limestone gaps."
      },
      {
        value: "constant-weeping",
        label: "Constant, Slow Weeping (Irrespective of Weather)",
        desc: "Perpetual seepage or moisture sheen, even during long, dry summer months.",
        metadata: "Strongly suggests a permanent mountain spring, or deep coastal sea-level aquifer."
      },
      {
        value: "active-rain",
        label: "Dynamic Infiltration Only During Active Precipitation",
        desc: "Starts within 1 to 4 hours of active downpours. Clears up soon after weather dries.",
        metadata: "Points to gravitational downward pathing, poor outer drainage or failed coping."
      }
    ]
  },
  {
    id: "substrate",
    text: "What is the primary structural material of the leaking substrate?",
    label: "Substrate Composition",
    options: [
      {
        value: "reinforced-concrete",
        label: "Cast-in-Place Reinforced Concrete",
        desc: "Cast structural concrete walls, foundation rafts, or columns.",
        metadata: "Supports physical anchoring, crystalline penetrative osmosis, and high-load torched membranes."
      },
      {
        value: "hollow-block",
        label: "Hollow Masonry Blockwork",
        desc: "Standard concrete blocks or bricks, with or without plaster renders.",
        metadata: "High void ratio. Extremely susceptible to water-logging. Requires protective outer-layer barriers."
      },
      {
        value: "historic-ashlar",
        label: "Traditional Mountain Ashlar Stone / Rubble Masonry",
        desc: "Thick lime-mortar and stone construction (historic Lebanese architecture).",
        metadata: "Irregular crevices and shifting joints. Requires highly flexible or breathing liquid membranes."
      }
    ]
  },
  {
    id: "accessibility",
    text: "What is the physical accessibility of the exterior face of the leak?",
    label: "Excavation/Access Scope",
    options: [
      {
        value: "unrestricted-open",
        label: "Unrestricted Exterior Ground Access (Exposed Outer Face)",
        desc: "Outer soil can be excavated or is physically open to workers.",
        metadata: "Ideal for applying exterior-side positive-pressure waterproofing barriers."
      },
      {
        value: "blind-side",
        label: "Fully Enclosed / Zero Exterior Access (Blind-side or Urban Center)",
        desc: "Property is adjacent to a tight neighboring building. Exterior excavation is impossible.",
        metadata: "Demands interior negative-pressure crystallization or internal Type C drained cavity systems."
      },
      {
        value: "active-construction",
        label: "Active Construction Phase (Raw Site Envelope)",
        desc: "Structure is currently being cast. Steel rebar grids are exposed.",
        metadata: "Allows integration of proactive structural measures like swellable hydrophilic joint bars."
      }
    ]
  }
];

interface DiagnosticResult {
  interventionType: "Type A (Barrier Protection)" | "Type B (Structurally Integral)" | "Type C (Drained Protection)" | "Combined Redundancy System";
  systemTitle: string;
  pathologyDesc: string;
  mechanicsList: string[];
  kmsSpecification: string;
  recommendedSikaTiles: string;
  estimatedUrgency: "HIGH FORENSIC ACTION REQUIRED" | "MONITORED ENGINEERING REQUIRED" | "PREVENTATIVE RECTIFICATION";
}

export default function ForensicDiagnostic() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState<boolean>(false);
  const [userData, setUserData] = useState({ name: "", email: "", phone: "", locationNotes: "" });
  const [showContactForm, setShowContactForm] = useState<boolean>(false);
  const [emailed, setEmailed] = useState<boolean>(false);

  const totalSteps = DIAGNOSTIC_QUESTIONS.length;

  const handleSelectOption = (value: string) => {
    const currentQuestion = DIAGNOSTIC_QUESTIONS[currentStep];
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    
    if (currentStep < totalSteps - 1) {
      setCurrentStep(s => s + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
    }
  };

  const restartQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResult(false);
    setShowContactForm(false);
    setEmailed(false);
  };

  const evaluateDiagnostic = (): DiagnosticResult => {
    const loc = answers["location"] || "";
    const tim = answers["timing"] || "";
    const sub = answers["substrate"] || "";
    const acc = answers["accessibility"] || "";

    // 1) Severe scenarios: Subterranean basement with severe winter thaws or constant weeping in blind-side accessibility
    if (loc === "subterranean-wall" && acc === "blind-side" && (tim === "post-snowmelt" || tim === "constant-weeping")) {
      return {
        interventionType: "Combined Redundancy System",
        systemTitle: "Dual-Action Crystalline Core + Type C Managed Air Drainage",
        pathologyDesc: "Severe pressure head water seepage. High mountain snowmelt or deep Lebanon aquifers are forcing water through microscopic concrete pores and honeycombs. Because excavation is restricted by neighboring structural cells, positive exterior barriers cannot be installed.",
        mechanicsList: [
          "Apply chemical pore consolidation using deep epoxy/silicate crystal injections inside structural fissures.",
          "Erect an internal heavy-duty studded HDPE air core drainage panel on the floor and walls.",
          "Direct gravity-weeping water into structural perimeter collection channels leading to a dual sump-pump.",
          "Prevent relative vapor buildup by sealing raw margins with fiber mastic and building a moisture-resistant plaster dry wall."
        ],
        kmsSpecification: "BS 8102:2009 Type C Air-Gap Drainage alongside internal hydrostatic crystalline plaster matrix. Recommended where structural loads or boundary wall configurations physically mandate zero-exterior excavation.",
        recommendedSikaTiles: "Sika® Crystalline Active Compound, coupled with high-strength non-shrink repair mortars for mechanical structural anchorage.",
        estimatedUrgency: "HIGH FORENSIC ACTION REQUIRED"
      };
    }

    // 2) Subterranean basement with unrestricted exterior ground access
    if (loc === "subterranean-wall" && acc === "unrestricted-open") {
      return {
        interventionType: "Type A (Barrier Protection)",
        systemTitle: "Multi-Coat Exterior Positive Pressure Sika Membrane Envelope",
        pathologyDesc: "Static horizontal groundwater and capillary soil suction. Hydrostatic load forces water into concrete pores, leading to damp floor rafts, paint peeling, and continuous mineral salt efflorescence.",
        mechanicsList: [
          "Excavate outer clay backfill and sandblast concrete surface until structural coarse aggregate is exposed.",
          "Apply two solid coats of fiber-reinforced Sika Tiles polymer-modified waterproofing slurry.",
          "Overlay thick dimpled HDPE drainage/protection sheets to deflect coarse stone gravel puncture.",
          "Integrate perforated land drain pipe at the footing line embedded in geo-textile clean gravel wrap."
        ],
        kmsSpecification: "BS 8102:2009 Type A External Waterproofing Envelope. This blocks moisture at the structural exterior before it can physically enter the concrete mass, protecting steel reinforcement rods from oxidation.",
        recommendedSikaTiles: "Sika Tiles applied polymer-modified compounds, reinforced with anti-alkaline technical fiberglass mesh sheets at corners and concrete cold joints.",
        estimatedUrgency: "MONITORED ENGINEERING REQUIRED"
      };
    }

    // 3) Flat roof / Terrace
    if (loc === "roof-terrace") {
      return {
        interventionType: "Type A (Barrier Protection)",
        systemTitle: "Elastic UV-Resistant Exposed Roof Membrane Envelope",
        pathologyDesc: "Gravitational rain filtering through horizontal thermal expansion cracks. High high-altitude Lebanese summer sun followed by freezing winter snow ranges induce high structural expansion stress on Lebanon's roof and balcony structures.",
        mechanicsList: [
          "Mechanically prepare slab, routing out visual expansion joints to a sound cementitious depth.",
          "Seal internal joints with high-elasticity polyurethane joint sealant mastic.",
          "Apply absolute seamless UV-stable Sika liquid-applied system or high-integrity bitumen torch sheets.",
          "Check multi-directional drainage slopes (min 1.5% pitch) to ensure zero ponding water spots."
        ],
        kmsSpecification: "BS 8102 / BS 6229 roof weathering design. Highly resilient technical envelope capable of dynamic structural crack bridging capabilities up to -10°C environment operations.",
        recommendedSikaTiles: "Sika Tiles high-specification flexible waterproof tiles adhesive matrices paired with highly hydrophobic technical grout joint sealants.",
        estimatedUrgency: "MONITORED ENGINEERING REQUIRED"
      };
    }

    // 4) Joints weeping
    if (loc === "joint-only" || tim === "post-snowmelt") {
      return {
        interventionType: "Type B (Structurally Integral)",
        systemTitle: "Hydrophobic Crystalline Core and Mechanical Joint Sealing",
        pathologyDesc: "Structural joint weeping. Shear expansion forces during seasonal freezing and thaws in Mount Lebanon crack traditional sealants, allowing subterranean mountain water to travel directly into cold joint seams.",
        mechanicsList: [
          "Rout out dynamic structural cracks with a high-speed diamond cutter in a distinct deep 'U-shape' groove.",
          "Inject hydrophobic closed-cell polyurethane resins that expand instantly upon contacting moist leaks.",
          "Incorporate swellable sodium bentonite hydrophilic waterstops if currently within construction phases.",
          "Cap-seal raw joint openings with hyper-elastic elastomeric Sika structural adhesive tapes."
        ],
        kmsSpecification: "BS 8102:2009 Type B Integral Joint Closure. Recommended where groundwater levels are volatile and dynamic structural deflection occurs regularly over mountain geological faults.",
        recommendedSikaTiles: "Sika® expander injection compounds and structural elastomeric Joint Cover Tape systems.",
        estimatedUrgency: "HIGH FORENSIC ACTION REQUIRED"
      };
    }

    // Default Fallback
    return {
      interventionType: "Type A (Barrier Protection)",
      systemTitle: "Professional Subgrade Hydrostatic Barrier Installation",
      pathologyDesc: "Capillary moisture ascent and localized substrate weakness. Liquid groundwater tracks damp concrete paths, slowly deteriorating standard cement plaster renders and generating unhealthy indoor mold.",
      mechanicsList: [
        "Chisel off deteriorated mortar, plaster, and any organic surface dust layer.",
        "Repair structural hollows using highly adhesive, non-shrink polymer repair cement mortar.",
        "Apply two systematic layer coatings of Sika technical water barrier compound.",
        "Verify complete envelope tightness with standard hydrostatic water flooding tests."
      ],
      kmsSpecification: "BS 8102 Class-2 Dry Air environment criteria, creating safe habitable domestic or dry commercial storage levels in standard buildings.",
      recommendedSikaTiles: "Sika Tiles system applied as an impervious, high-friction backing to lock dynamic moisture movement permanently.",
      estimatedUrgency: "PREVENTATIVE RECTIFICATION"
    };
  };

  const result = evaluateDiagnostic();

  const handleExportToGmail = () => {
    const subject = `KMC Forensic Enquiry — ${result.interventionType} — ${userData.name || "Request"}`;
    const answersText = Object.entries(answers).map(([qKey, val]) => `• ${qKey.toUpperCase()}: ${val}`).join("\n");
    const body = `KMC Forensic Waterproofing Enquiry
    
CLIENT METADATA:
Name: ${userData.name}
Email: ${userData.email}
Phone: ${userData.phone || "N/A"}
Local Location Notes: ${userData.locationNotes || "N/A"}

DIAGNOSTIC SUMMARY:
Intervention Needed: ${result.interventionType}
Recommended Assembly: ${result.systemTitle}
Urgency Metric: ${result.estimatedUrgency}

QUESTIONNAIRE AUDIT PATHOLOGY:
${answersText}

KMC SPECIFICATION ANALYSIS:
${result.kmsSpecification}

RECOMMENDED CORE RAW MATERIALS:
${result.recommendedSikaTiles}

— Generated via Kassem Mansour Co. Forensic Diagnostic Engine`;

    const mailtoLink = `mailto:contact@kmc-lb.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    setEmailed(true);
  };

  return (
    <div id="forensic-diagnostic-tool" className="bg-paper border border-blue-soft/30 rounded-sm p-6 md:p-10 shadow-lg relative overflow-hidden">
      
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-deep/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-blue-mist pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-blue animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-blue uppercase tracking-widest">
              Forensic Seepage Pathology Engine
            </span>
          </div>
          <h3 className="font-display font-bold text-2xl md:text-3xl text-ink tracking-tight">
            Interactive Leak Diagnostics
          </h3>
          <p className="text-xs text-ink-soft mt-1 leading-relaxed max-w-xl">
            Answer 4 rapid structural questions to pinpoint active leaks. Receive an instant high-fidelity diagnostic assessment referencing BS 8102 structures and localized Lebanese geological dynamics.
          </p>
        </div>
        
        {/* Status indicator */}
        {!showResult ? (
          <div className="bg-blue/5 border border-blue-soft/30 px-3 py-1.5 rounded-sm flex items-center gap-2 self-start md:self-center font-mono text-[9px] font-bold text-blue uppercase tracking-wider">
            <span>Step {currentStep + 1} of {totalSteps}</span>
          </div>
        ) : (
          <button 
            onClick={restartQuiz} 
            className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue hover:text-blue-deep transition-all border border-blue-soft/30 px-3 py-1.5 rounded-sm hover:bg-blue/5"
          >
            Restart Audit
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Progress Bar */}
            <div className="w-full bg-blue-mist h-1 rounded-full overflow-hidden">
              <div 
                className="bg-blue h-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>

            {/* Current Question Block */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono text-gold-soft uppercase tracking-widest font-bold">
                Question {currentStep + 1} · {DIAGNOSTIC_QUESTIONS[currentStep].label}
              </span>
              <h4 className="font-display font-medium text-lg md:text-xl text-ink tracking-tight">
                {DIAGNOSTIC_QUESTIONS[currentStep].text}
              </h4>
            </div>

            {/* Answer Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DIAGNOSTIC_QUESTIONS[currentStep].options.map((opt) => {
                const isSelected = answers[DIAGNOSTIC_QUESTIONS[currentStep].id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectOption(opt.value)}
                    className={`text-left p-5 rounded-sm border transition-all duration-200 group relative ${
                      isSelected
                        ? "bg-blue/5 border-blue shadow-md"
                        : "bg-paper border-blue-soft/20 hover:border-blue hover:bg-blue-mist/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-display text-sm font-semibold text-ink group-hover:text-blue-deep block transition-colors">
                          {opt.label}
                        </span>
                        <p className="text-xs text-ink-soft mt-1.5 leading-relaxed font-mono">
                          {opt.desc}
                        </p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center mt-0.5 ${
                        isSelected ? "bg-blue border-blue text-white" : "border-ink/10 group-hover:border-blue"
                      }`}>
                        {isSelected && <Check size={10} />}
                      </div>
                    </div>
                    {opt.metadata && (
                      <div className="mt-3 pt-3 border-t border-blue-soft/10 text-[9px] font-mono text-ink-faint uppercase font-bold tracking-widest">
                        {opt.metadata}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Nav indicators */}
            <div className="flex items-center justify-between pt-4 border-t border-blue-mist">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className="text-[10px] font-mono uppercase tracking-widest font-bold text-ink-faint hover:text-ink disabled:opacity-20 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              
              <span className="text-[10px] font-mono text-ink-faint font-semibold uppercase tracking-wider">
                Select an option to advance
              </span>
            </div>

          </motion.div>
        ) : (
          <motion.div
            key="diagnostic-result"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Urgency Badge and Concept */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-900 border border-stone-800 p-6 rounded-sm text-white">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <AlertTriangle className="w-4 h-4 text-gold animate-pulse" />
                  <span className="text-[9px] font-mono font-bold text-gold uppercase tracking-widest">
                    AI Diagnostic assessment Model Output
                  </span>
                </div>
                <h4 className="font-display font-medium text-lg tracking-tight">
                  Envelope Pathology Determined
                </h4>
              </div>

              <div className="flex flex-col items-start md:items-end">
                <span className="font-mono text-[9px] font-bold text-stone-400 uppercase tracking-widest">
                  Urgency Index
                </span>
                <span className="font-mono text-xs font-bold text-gold tracking-wider mt-0.5">
                  {result.estimatedUrgency}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column Assessment Card */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue" />
                    <span className="text-[10px] font-mono text-ink-faint font-bold uppercase tracking-widest">
                      Intervention Classification
                    </span>
                  </div>
                  <h5 className="font-display font-bold text-2xl text-blue tracking-tight mt-1">
                    {result.interventionType}
                  </h5>
                  <p className="font-sans text-xs font-bold text-ink mt-1">
                    System Suite: {result.systemTitle}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-mono text-ink-faint font-bold uppercase tracking-widest">
                    Diagnostic Pathology Analysis
                  </p>
                  <p className="text-sm text-ink-soft leading-relaxed bg-paper-2 p-4 rounded-sm border border-blue-soft/10">
                    {result.pathologyDesc}
                  </p>
                </div>

                {/* Tactical Action Plan */}
                <div className="space-y-4">
                  <p className="text-[10px] font-mono text-ink-faint font-bold uppercase tracking-widest">
                    Tactical Sequence Actions recommended by KMC
                  </p>
                  <div className="space-y-3">
                    {result.mechanicsList.map((mech, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-ink">
                        <span className="w-5 h-5 rounded-full bg-blue/15 text-blue text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{mech}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column Specifications Sheet */}
              <div className="lg:col-span-5 bg-paper-2 border border-blue-soft/30 rounded-sm p-6 space-y-6 flex flex-col justify-between">
                
                <div className="space-y-6">
                  <div className="border-b border-blue-mist pb-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <ClipboardCheck className="w-3.5 h-3.5 text-gold-soft" />
                      <span className="text-[10px] font-mono text-gold-soft uppercase tracking-widest font-bold">
                        Structural Directive
                      </span>
                    </div>
                    <span className="font-mono text-[11px] font-semibold text-ink uppercase block">
                      BS 8102 Compliance Guide
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono text-ink-faint uppercase font-bold tracking-widest block mb-1">
                      Regulation Clause
                    </span>
                    <p className="text-xs text-ink leading-relaxed bg-paper p-3 rounded-sm border border-blue-soft/10">
                      {result.kmsSpecification}
                    </p>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono text-ink-faint uppercase font-bold tracking-widest block mb-1">
                      Target Material Suite
                    </span>
                    <p className="text-xs text-ink font-mono font-bold leading-relaxed">
                      {result.recommendedSikaTiles}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-blue-mist">
                  {!showContactForm ? (
                    <button
                      onClick={() => setShowContactForm(true)}
                      className="w-full py-3 bg-blue text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-blue-deep transition-all flex items-center justify-center gap-2 shadow-md shadow-blue/10"
                    >
                      Export Diagnostic to KMC <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 text-left"
                    >
                      <div>
                        <label className="block text-[9px] font-mono text-ink-faint font-bold uppercase tracking-widest mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={userData.name}
                          onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Eng. Joe El-Husseini"
                          className="w-full bg-paper border border-blue-soft/30 p-2.5 text-xs outline-none focus:border-blue rounded-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-mono text-ink-faint font-bold uppercase tracking-widest mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={userData.email}
                            onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="joe@architects-lb.com"
                            className="w-full bg-paper border border-blue-soft/30 p-2.5 text-xs outline-none focus:border-blue rounded-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-ink-faint font-bold uppercase tracking-widest mb-1">
                            Phone
                          </label>
                          <input
                            type="text"
                            value={userData.phone}
                            onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="+961 70 123 456"
                            className="w-full bg-paper border border-blue-soft/30 p-2.5 text-xs outline-none focus:border-blue rounded-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-ink-faint font-bold uppercase tracking-widest mb-1">
                          Local site / Town Name (Optional)
                        </label>
                        <input
                          type="text"
                          value={userData.locationNotes}
                          onChange={e => setUserData(prev => ({ ...prev, locationNotes: e.target.value }))}
                          placeholder="e.g. Achrafieh Subgrade, Beirut"
                          className="w-full bg-paper border border-blue-soft/30 p-2.5 text-xs outline-none focus:border-blue rounded-sm"
                        />
                      </div>

                      <button
                        onClick={handleExportToGmail}
                        disabled={!userData.name || !userData.email}
                        className="w-full py-3 bg-gold text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-gold/90 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Send className="w-3.5 h-3.5" /> 
                        {emailed ? "Email Opened" : "Transmit Assembly Spec"}
                      </button>
                    </motion.div>
                  )}
                </div>

              </div>

            </div>

            {/* Bottom Notice Info Board */}
            <div className="bg-paper-2 border border-blue-soft/20 p-4 rounded-sm flex items-start gap-4">
              <Compass className="w-5 h-5 text-blue shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-ink uppercase tracking-wider">
                  Important Pathology Limitation Notice
                </h5>
                <p className="text-[11px] text-ink-soft leading-relaxed mt-1">
                  Waterproofing forensics requires structural expertise. While this interactive pathology wizard advises on BS 8102 systems, concrete honeycombbing, shear forces, and localized micro-fractures in high karst environments call for manual site inspection. Please transit results to Kassem Mansour Co. to schedule an onsite mechanical scan.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center pt-4">
              <button
                onClick={restartQuiz}
                className="px-6 py-2 bg-blue-mist-soft border border-blue-soft/20 rounded-sm text-xs font-semibold text-ink hover:text-blue hover:bg-blue-mist"
              >
                Restart Diagnostic
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
