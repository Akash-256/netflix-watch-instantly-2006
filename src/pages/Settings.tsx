import { UserSettings } from "../types";
import { Sliders, Check, HelpCircle, Laptop } from "lucide-react";

interface SettingsProps {
  settings: UserSettings;
  onUpdateSettings: (updates: Partial<UserSettings>) => void;
}

export default function Settings({ settings, onUpdateSettings }: SettingsProps) {
  const qualities = ["240p (Dial-up/Basic DSL)", "360p (Standard Broadband)", "480p (Cable/High-Speed Broadband)"];
  const connectionTypes = ["56k Dial-up Modem", "768k DSL Broadband", "1.5Mb+ Cable Modem", "Corporate T1/Fiber"];

  const handleQualityChange = (q: string) => {
    onUpdateSettings({ preferredQuality: q });
  };

  const handleConnectionChange = (c: string) => {
    onUpdateSettings({ preferredConnection: c });
  };

  const handleToggleSubtitle = () => {
    onUpdateSettings({ subtitlesEnabled: !settings.subtitlesEnabled });
  };

  const handleToggleAutoplay = () => {
    onUpdateSettings({ autoplayNext: !settings.autoplayNext });
  };

  return (
    <div className="bg-white border border-slate-300 rounded p-4 shadow-sm font-sans select-none">
      <div className="border-b-2 border-red-800 pb-2 mb-4">
        <h2 className="text-sm font-bold text-red-800 uppercase flex items-center gap-1.5">
          <Sliders className="w-4 h-4 text-slate-700" />
          Watch Instantly Player & Buffering Controls
        </h2>
        <p className="text-[10px] text-slate-500 mt-0.5">
          Fine-tune Silverlight & Windows Media Player codecs for your residential ISP speed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Left column: Video Stream settings */}
        <div className="md:col-span-2 flex flex-col gap-5">
          
          {/* Quality selections */}
          <div className="border border-slate-300 p-3.5 rounded bg-slate-50">
            <h3 className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-1.5 mb-3 uppercase">
              1. Video Buffering Presets
            </h3>
            <p className="text-[10px] text-slate-500 mb-3 leading-relaxed">
              Lowering the bit-rate decreases the duration of the "Please wait while your stream buffers..." screen. Standard definition (480p) streams require a fast cable modem connection.
            </p>
            <div className="flex flex-col gap-2">
              {qualities.map((q) => {
                const active = settings.preferredQuality === q;
                return (
                  <button
                    id={`settings-quality-${q.replace(/\s+/g, "-")}`}
                    key={q}
                    onClick={() => handleQualityChange(q)}
                    className={`text-left p-2 border rounded cursor-pointer text-xs flex justify-between items-center transition-all ${
                      active
                        ? "bg-red-50 border-red-500 text-red-950 font-bold"
                        : "bg-white border-slate-300 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <span>{q}</span>
                    {active && <Check className="w-4 h-4 text-red-700 stroke-[3px]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Connection types */}
          <div className="border border-slate-300 p-3.5 rounded bg-slate-50">
            <h3 className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-1.5 mb-3 uppercase">
              2. ISP Connection Profile
            </h3>
            <p className="text-[10px] text-slate-500 mb-3 leading-relaxed">
              Specify your home line bandwidth. Our dynamic server-side router adapts VC-1 keyframe compression based on this flag.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {connectionTypes.map((c) => {
                const active = settings.preferredConnection === c;
                return (
                  <button
                    id={`settings-connection-${c.replace(/\s+/g, "-")}`}
                    key={c}
                    onClick={() => handleConnectionChange(c)}
                    className={`text-left p-2 border rounded cursor-pointer text-xs flex justify-between items-center transition-all ${
                      active
                        ? "bg-blue-50 border-blue-500 text-blue-950 font-bold"
                        : "bg-white border-slate-300 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <span>{c}</span>
                    {active && <Check className="w-4 h-4 text-blue-600 stroke-[3px]" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right column: Toggles and Diagnostics */}
        <div className="flex flex-col gap-4">
          
          {/* Stream toggles */}
          <div className="border border-slate-300 p-3.5 rounded bg-white text-xs">
            <h3 className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-1 mb-3 uppercase">
              3. Player Toggles
            </h3>
            
            <div className="flex flex-col gap-3">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  id="settings-subtitle-chk"
                  type="checkbox"
                  checked={settings.subtitlesEnabled}
                  onChange={handleToggleSubtitle}
                  className="mt-0.5"
                />
                <div>
                  <span className="font-bold text-slate-800 block">Enable Closed Captioning</span>
                  <span className="text-[10px] text-slate-500">Show subtitles on English audio streams when available.</span>
                </div>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  id="settings-autoplay-chk"
                  type="checkbox"
                  checked={settings.autoplayNext}
                  onChange={handleToggleAutoplay}
                  className="mt-0.5"
                />
                <div>
                  <span className="font-bold text-slate-800 block">Autoplay Trailers</span>
                  <span className="text-[10px] text-slate-500">Automatically stream movie trailer clip on spotlight select.</span>
                </div>
              </label>
            </div>
          </div>

          {/* Silverlight diagnostic */}
          <div className="border border-slate-300 p-3.5 rounded bg-slate-100 text-[10px] text-slate-600 leading-relaxed flex flex-col gap-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 border-b border-slate-200 pb-1">
              <Laptop className="w-3.5 h-3.5 text-blue-600" />
              PLAYER PLUG-IN DIAGNOSTIC
            </div>
            <div>
              <strong>Current Runtime:</strong> Netflix Silverlight Core v1.0.25 (Active)
            </div>
            <div>
              <strong>DRM Registry Keys:</strong> Valid (VeriSign Encrypted)
            </div>
            <div className="text-[9px] text-slate-400 mt-1">
              If streams stall, click "Reset DRM Keys" in the Help Desk or clear browser offline storage.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
