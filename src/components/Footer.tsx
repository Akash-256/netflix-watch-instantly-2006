import { ShieldCheck, Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f4f3ec] border-t border-slate-300 py-4 px-4 mt-8 select-none font-sans text-[10px] text-slate-500">
      <div className="max-w-[1000px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Left Boilerplate */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1">
          <span>Copyright © 1997-2006 Netflix, Inc.</span>
          <a href="#/help" className="hover:underline hover:text-red-700">Terms of Use</a>
          <a href="#/help" className="hover:underline hover:text-red-700">Privacy Policy</a>
          <a href="#/help" className="hover:underline hover:text-red-700">Broadband Guide</a>
        </div>

        {/* Right Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-emerald-700 font-bold uppercase">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>Beta Service Status: Operational</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-slate-400 font-mono">
            <Cpu className="w-3.5 h-3.5 text-blue-500" />
            <span>System Check: WMP 10 Detected</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
