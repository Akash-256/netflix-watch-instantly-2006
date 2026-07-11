import { useState } from "react";
import HelpAssistant from "../components/HelpAssistant";
import { HelpCircle, Shield, Info, Activity, Monitor, Network } from "lucide-react";

export default function HelpCenter() {
  const [speedTestActive, setSpeedTestActive] = useState(false);
  const [speedTestProgress, setSpeedTestProgress] = useState(0);
  const [speedTestResult, setSpeedTestResult] = useState<string | null>(null);

  const startSpeedTest = () => {
    setSpeedTestActive(true);
    setSpeedTestProgress(0);
    setSpeedTestResult(null);

    const interval = setInterval(() => {
      setSpeedTestProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setSpeedTestActive(false);
          // Determine speed result
          const speeds = [
            "DSL Broadband (768 Kbps) - Stream Ready",
            "Cable Broadband (1.5 Mbps) - High Performance Ready",
            "T1 Corporate Line (4.2 Mbps) - Flawless HD-Ready Streaming",
          ];
          setSpeedTestResult(speeds[Math.floor(Math.random() * speeds.length)]);
          return 100;
        }
        return prev + 10;
      });
    }, 250);
  };

  return (
    <div className="flex flex-col gap-6 font-sans select-none">
      
      {/* Title block */}
      <div className="bg-white border border-slate-350 p-4 rounded shadow-sm">
        <h2 className="text-sm font-bold text-slate-800 uppercase border-b border-slate-200 pb-1.5 mb-2.5 flex items-center gap-1.5">
          <HelpCircle className="w-4.5 h-4.5 text-blue-600" />
          Technical Support & Help Center
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
          Welcome to the subscriber assistance desk. Here you can run a diagnostic line speed test on your dial-up or DSL cable modems, check Windows Media DRM license states, or speak directly with our automated assistant.
        </p>
      </div>

      {/* Speed Test Tool Section */}
      <div className="bg-white border border-slate-300 rounded p-4 shadow-sm">
        <h3 className="text-xs font-bold text-red-800 uppercase tracking-wide border-b border-red-850 pb-1.5 mb-3 flex items-center gap-1.5">
          <Activity className="w-4 h-4" />
          Netflix Bandwidth Line Diagnostics (Speed Test)
        </h3>
        
        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
          The Watch Instantly streaming engine requires a high-speed DSL or cable line. Click below to download our temporary diagnostics packet to verify if your ISP throttles VC-1 encoded digital streams.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 border border-slate-200 p-3 rounded">
          <button
            id="speedtest-run-btn"
            onClick={startSpeedTest}
            disabled={speedTestActive}
            className="bg-gradient-to-b from-slate-200 to-slate-400 hover:from-white hover:to-slate-300 disabled:opacity-50 border border-slate-500 text-slate-800 font-bold text-xs px-4 py-2 rounded shadow cursor-pointer uppercase flex items-center gap-1.5 flex-shrink-0"
          >
            <Network className="w-3.5 h-3.5" />
            <span>{speedTestActive ? "Testing Connection..." : "Begin Diagnostic Test"}</span>
          </button>

          <div className="flex-1 w-full flex flex-col gap-1">
            {speedTestActive ? (
              <div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold mb-1">
                  <span>TRANSFERRING SECURE STREAM BUFFER SEED PACKET (4.2 MB)...</span>
                  <span>{speedTestProgress}%</span>
                </div>
                <div className="w-full bg-slate-200 h-4 rounded overflow-hidden border border-slate-300 relative">
                  {/* XP style green segmented loading bars */}
                  <div
                    className="bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 h-full transition-all duration-200"
                    style={{ width: `${speedTestProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : speedTestResult ? (
              <div className="bg-emerald-50 border border-emerald-200 p-2 rounded text-xs text-emerald-800 font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
                <span>Diagnostics Complete: Line Speed identified as {speedTestResult}.</span>
              </div>
            ) : (
              <span className="text-[11px] text-slate-400 italic">
                Diagnostic system idle. Ready for modem ping packet transmission.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* EMBED INTERACTIVE HELP ASSISTANT (CHATBOT) */}
      <HelpAssistant />

      {/* technical requirements details */}
      <div className="bg-white border border-slate-300 rounded p-4 shadow-sm">
        <h3 className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-2 mb-3 uppercase flex items-center gap-1.5">
          <Monitor className="w-4 h-4 text-slate-500" />
          Technical Requirement Framework & Troubleshooting
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
          <div className="flex flex-col gap-1 border border-slate-200 p-2.5 rounded bg-slate-50">
            <strong className="text-slate-800 uppercase text-[10px] block mb-0.5">Windows XP Setup</strong>
            To enable 100% full-screen playback, please ensure you have installed Windows Media Player 10. Direct3D Hardware Acceleration should be toggled to "Full" inside your Windows Display Troubleshooter panel.
          </div>

          <div className="flex flex-col gap-1 border border-slate-200 p-2.5 rounded bg-slate-50">
            <strong className="text-slate-800 uppercase text-[10px] block mb-0.5">Silverlight Plug-In (OS X Tiger)</strong>
            Apple Macintosh users using Intel Core Duo systems should download the Netflix Silverlight 1.0 plugin for Safari. PowerPC processor architectures are currently unsupported due to DRM hardware acceleration limits.
          </div>

          <div className="flex flex-col gap-1 border border-slate-200 p-2.5 rounded bg-slate-50">
            <strong className="text-slate-800 uppercase text-[10px] block mb-0.5">Internet Explorer 6.0 Warnings</strong>
            If you see security warnings saying "Mixed Content Identified" inside IE6, click "Yes" to permit the streaming secure certificates to initialize correctly from the Netflix CDNs.
          </div>

          <div className="flex flex-col gap-1 border border-slate-200 p-2.5 rounded bg-slate-50">
            <strong className="text-slate-800 uppercase text-[10px] block mb-0.5">SSL secure 128-bit Handshakes</strong>
            All accounts, queue additions, and stream logs are synchronized using VeriSign authorized certificates. Your dial-up or DSL password is secure.
          </div>
        </div>
      </div>

    </div>
  );
}
