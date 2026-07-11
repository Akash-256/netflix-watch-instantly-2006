import { Info, Award, Calendar, Landmark } from "lucide-react";

export default function About() {
  return (
    <div className="bg-white border border-slate-300 rounded p-5 shadow-sm font-sans select-none text-xs text-slate-700 leading-relaxed">
      
      {/* Upper header block */}
      <div className="border-b-2 border-red-800 pb-2 mb-4">
        <h2 className="text-sm font-bold text-red-800 uppercase flex items-center gap-1.5">
          <Info className="w-4 h-4 text-slate-700" />
          Netflix, Inc. - Corporate Overview (2006 Portfolio)
        </h2>
        <p className="text-[10px] text-slate-500 mt-0.5">
          Registered Headquarters: 100 Winchester Circle, Los Gatos, California.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Left column: narrative */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <strong className="text-sm text-slate-800 font-bold block">About Our Company:</strong>
            <p>
              Netflix is the world's largest online movie rental service, providing more than 5 million subscribers access to over 60,000 DVD titles. Our members can choose from a massive collection of classics, new releases, documentaries, and foreign languages without worrying about late fees, due dates, or shipping costs.
            </p>
            <p>
              In 2006, Netflix introduced the revolutionary <strong className="text-red-700">Watch Instantly (Beta)</strong> stream service. For the first time, subscribers can bypass the United States Postal Service entirely and render full-length feature films immediately in their browser over residential broadband cables.
            </p>
          </div>

          <div className="border-t border-slate-200 pt-3 flex flex-col gap-2">
            <strong className="text-slate-800 font-bold flex items-center gap-1">
              <Award className="w-4 h-4 text-amber-500 fill-amber-500" />
              Corporate Accomplishments (2005-2006)
            </strong>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Exceeded 5.2 million total active mailing subscribers across North America.</li>
              <li>Dispatched over 1.4 million red paper envelopes daily through regional shipping depots.</li>
              <li>Successfully initiated partnerships with major Hollywood studios for VC-1 digital compression licenses.</li>
              <li>Established CineMatch™, our pioneering matching engine that has generated over 2 billion user ratings.</li>
            </ul>
          </div>
        </div>

        {/* Right column: investor quick stats */}
        <div className="flex flex-col gap-4">
          
          {/* SEC financial summary card */}
          <div className="border border-slate-300 p-3.5 rounded bg-slate-50 flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5 text-slate-800 font-bold uppercase tracking-wide border-b border-slate-200 pb-1">
              <Landmark className="w-4 h-4 text-slate-600" />
              NASDAQ: NFLX
            </div>
            
            <div className="space-y-2 text-[11px]">
              <div>
                <span className="text-slate-500 block">Stock Exchange Symbol:</span>
                <strong className="text-slate-800">NASDAQ : NFLX</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Chief Executive Officer:</span>
                <strong className="text-slate-800">Reed Hastings</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Annual Revenue (2005):</span>
                <strong className="text-slate-800">$682 Million USD</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Employee Roster:</span>
                <strong className="text-slate-800">Approx. 950 Full-time Staff</strong>
              </div>
            </div>
          </div>

          {/* Patent Block */}
          <div className="border border-slate-300 p-3.5 rounded bg-white text-[11px] text-slate-500 flex flex-col gap-1.5">
            <div className="flex items-center gap-1 font-bold text-slate-700">
              <Calendar className="w-4 h-4 text-red-700" />
              Patent Registry Info
            </div>
            <p>
              Netflix, Inc. holds multiple utility patents regarding the re-ordering of web priority tables, linear rental queues, and matching systems. Patents #6,584,450 and #7,024,381. All rights reserved.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
