import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Check, Send } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Link } from "react-router-dom";

type Step = 1 | 2 | 3 | 4 | 5 | 6; // 6 is success state

interface FormData {
  projectType: string;
  sector: string;
  timeline: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  details: string;
}

export default function Contact() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    projectType: "",
    sector: "",
    timeline: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    details: "",
  });

  const nextStep = () => setStep((s) => (s + 1) as Step);
  const prevStep = () => setStep((s) => (s - 1) as Step);

  const handleSelect = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (step < 4) nextStep();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const subject = `KMC Enquiry — ${formData.projectType} — ${formData.name}`;
    const body = `Project type: ${formData.projectType}
Sector: ${formData.sector}
Timeline: ${formData.timeline}

Name: ${formData.name}
Company: ${formData.company || "N/A"}
Email: ${formData.email}
Phone: ${formData.phone || "N/A"}

Project details:
${formData.details || "None provided"}

— Sent via kmc-lb.com`;

    const mailtoLink = `mailto:contact@kmc-lb.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    setStep(6);
  };

  const isStep4Valid = formData.name.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const encouragements = [
    "What brings you to KMC?",
    "Tell us about the environment.",
    "When do we begin?",
    "How can Eng. Kassem reach you?",
    "Any final details?"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-paper flex items-center justify-center py-20 px-6 min-h-[80vh]"
    >
      <div className="w-full max-w-2xl bg-white p-8 md:p-16 rounded-sm shadow-2xl border border-blue-mist relative overflow-hidden">
        {/* Progress */}
        {step < 6 && (
          <div className="absolute top-0 left-0 w-full h-1 flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <div 
                key={s} 
                className={cn(
                  "flex-grow transition-colors duration-500",
                  s <= step ? (s === 5 && step === 5 ? "bg-gold" : "bg-blue") : "bg-blue-mist"
                )} 
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold">{encouragements[0]}</span>
                <h2 className="text-4xl text-ink">What kind of project?</h2>
              </div>
              <div className="flex flex-wrap gap-4">
                {["New construction", "Remediation / leak repair", "Forensic investigation", "Long-term consultation", "Other"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect("projectType", opt)}
                    className={cn(
                      "px-8 py-4 rounded-full border text-sm font-bold tracking-tight transition-all",
                      formData.projectType === opt ? "bg-blue border-blue text-white" : "border-blue-mist text-ink-soft hover:border-blue"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold">{encouragements[1]}</span>
                <h2 className="text-4xl text-ink">What sector?</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["Healthcare", "Education", "Banking", "Government", "Commercial", "Hospitality", "Industrial", "Residential", "Other"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect("sector", opt)}
                    className={cn(
                      "px-6 py-4 rounded-full border text-sm font-bold tracking-tight transition-all",
                      formData.sector === opt ? "bg-blue border-blue text-white" : "border-blue-mist text-ink-soft hover:border-blue"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <button onClick={prevStep} className="text-xs uppercase tracking-widest text-ink-faint flex items-center gap-2 pt-4">
                <ArrowLeft size={14} /> Back
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold">{encouragements[2]}</span>
                <h2 className="text-4xl text-ink">When does the work need to happen?</h2>
              </div>
              <div className="flex flex-col gap-4">
                {["Immediate (within 30 days)", "This quarter", "Within 6 months", "Planning ahead", "Just exploring"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect("timeline", opt)}
                    className={cn(
                      "px-8 py-5 rounded-sm border text-left text-sm font-bold tracking-tight transition-all",
                      formData.timeline === opt ? "bg-blue border-blue text-white" : "border-blue-mist text-ink-soft hover:border-blue"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <button onClick={prevStep} className="text-xs uppercase tracking-widest text-ink-faint flex items-center gap-2 pt-4">
                <ArrowLeft size={14} /> Back
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold">{encouragements[3]}</span>
                <h2 className="text-4xl text-ink">How can we reach you?</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-ink-faint mb-2">Full name (Required)</label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-paper border-b border-blue-soft py-4 px-2 focus:border-blue outline-none transition-colors" 
                    placeholder="Eng. Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-ink-faint mb-2">Email (Required)</label>
                  <input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-paper border-b border-blue-soft py-4 px-2 focus:border-blue outline-none transition-colors" 
                    placeholder="jane@architects.com"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-ink-faint mb-2">Company / Firm</label>
                    <input 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-paper border-b border-blue-soft py-4 px-2 focus:border-blue outline-none transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-ink-faint mb-2">Phone</label>
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-paper border-b border-blue-soft py-4 px-2 focus:border-blue outline-none transition-colors" 
                    />
                  </div>
                </div>
                <p className="text-[10px] text-ink-faint italic leading-relaxed">
                   We'll only use this to reply to your enquiry.
                </p>
              </div>
              <div className="flex justify-between items-center pt-8">
                <button onClick={prevStep} className="text-xs uppercase tracking-widest text-ink-faint flex items-center gap-2">
                  <ArrowLeft size={14} /> Back
                </button>
                <button 
                  disabled={!isStep4Valid}
                  onClick={nextStep}
                  className="px-10 py-4 bg-blue text-white text-xs font-bold uppercase tracking-widest rounded-sm disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-3 transition-all"
                >
                  Next <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold">{encouragements[4]}</span>
                <h2 className="text-4xl text-ink">Anything else we should know?</h2>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-ink-faint mb-4">Project details (Optional)</label>
                <textarea 
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-paper border border-blue-soft p-6 focus:border-blue outline-none transition-colors rounded-sm" 
                  placeholder="Location, estimated scale, or specific leak symptoms..."
                />
              </div>
              <div className="flex justify-between items-center pt-8">
                <button onClick={prevStep} className="text-xs uppercase tracking-widest text-ink-faint flex items-center gap-2">
                  <ArrowLeft size={14} /> Back
                </button>
                <button 
                  onClick={handleSubmit}
                  className="px-12 py-5 bg-gold text-white text-xs font-bold uppercase tracking-[0.2em] rounded-sm flex items-center gap-3 hover:bg-gold/90 transition-all shadow-xl"
                >
                  Send to Eng. Kassem <Send size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 py-12"
            >
              <div className="w-20 h-20 bg-blue/10 text-blue rounded-full flex items-center justify-center mx-auto mb-12">
                <Check size={40} />
              </div>
              <h2 className="text-4xl text-ink leading-tight">Thank you.</h2>
              <p className="text-ink-soft leading-relaxed max-w-sm mx-auto">
                Your email client should now be open with your enquiry prepared. Eng. Kassem reads every message personally — typically within two working days.
              </p>
              <Link 
                to="/" 
                className="inline-block mt-8 text-xs font-bold uppercase tracking-widest text-blue hover:text-blue-deep"
              >
                Return Home
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
