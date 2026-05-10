import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const romanYear = "MMXXVI"; // As requested

  return (
    <footer className="bg-paper border-t border-blue-mist mt-32 py-24 pb-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="mb-8 block">
              <img src="/KMC.webp" alt="KMC" className="h-28 w-auto" />
            </Link>
            <p className="text-ink-soft text-sm leading-relaxed max-w-xs">
              Architect-led waterproofing consultancy and application. Setting the standard in Lebanon since 1971.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-ink-faint">Practice</h4>
            <Link to="/about" className="text-sm text-ink-soft hover:text-blue transition-colors">About & Founder</Link>
            <Link to="/work" className="text-sm text-ink-soft hover:text-blue transition-colors">Work / Portfolio</Link>
            <Link to="/services" className="text-sm text-ink-soft hover:text-blue transition-colors">Services</Link>
            <Link to="/sectors" className="text-sm text-ink-soft hover:text-blue transition-colors">Sectors</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-ink-faint">Location</h4>
            <p className="text-sm text-ink-soft leading-relaxed">
              Beirut, Lebanon
            </p>
            <p className="text-sm text-ink-soft leading-relaxed">
              +961 76 717 161
            </p>
          </div>

          <div className="flex flex-col gap-4 text-right md:items-end">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-ink-faint">Contact</h4>
            <a href="mailto:contact@kmc-lb.com" className="text-sm text-ink-soft hover:text-blue transition-colors">
              contact@kmc-lb.com
            </a>
            <a href="mailto:eng.kassem@kmc-lb.com" className="text-sm text-ink-soft hover:text-blue transition-colors">
              eng.kassem@kmc-lb.com
            </a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-blue-mist gap-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-ink-faint">
            © Kassem Mansour Co. · Beirut · Lebanon · {romanYear}
          </p>
          <div className="flex gap-8">
            <Link to="/legal" className="text-[10px] uppercase tracking-[0.2em] text-ink-faint hover:text-blue transition-colors">Legal</Link>
            <Link to="/privacy" className="text-[10px] uppercase tracking-[0.2em] text-ink-faint hover:text-blue transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
