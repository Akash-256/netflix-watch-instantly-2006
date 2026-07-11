import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Play, Pause, Square, Volume2, VolumeX, RotateCcw, AlertCircle, Monitor, ShieldCheck, ArrowLeft, RefreshCw, Layers } from "lucide-react";
import { Movie, UserSettings } from "../types";

interface WatchInstantlyProps {
  movies: Movie[];
  settings: UserSettings;
  onRecordHistory: (movieId: string) => void;
}

export default function WatchInstantly({ movies, settings, onRecordHistory }: WatchInstantlyProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === id);

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [bufferingProgress, setBufferingProgress] = useState(0);
  const [bufferMessage, setBufferMessage] = useState("Connecting to streaming distribution host...");
  const [currentTime, setCurrentTime] = useState(0); // in seconds
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [streamQuality, setStreamQuality] = useState(settings.preferredQuality);

  // Technical debug data
  const [fps, setFps] = useState(23.976);
  const [renderedFrames, setRenderedFrames] = useState(0);
  const [downloadRate, setDownloadRate] = useState(1240); // Kbps
  const [activeSubtitle, setActiveSubtitle] = useState("");

  // Enhancements for realistic 2006 startup and seek buffering sequences
  const [isStartupBuffering, setIsStartupBuffering] = useState(false);
  const [startupStep, setStartupStep] = useState(0); // 1 to 7
  const [startupBufferProgress, setStartupBufferProgress] = useState(0);
  const [isSeekBuffering, setIsSeekBuffering] = useState(false);
  const [seekProgress, setSeekProgress] = useState(0);
  const seekTimerRef = useRef<NodeJS.Timeout | null>(null);

  const duration = movie ? movie.runtime * 60 : 120 * 60; // movie runtime in seconds
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);
  const bufferTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Subtitle cues (simple mock subtitles corresponding to times)
  const subtitles = [
    { start: 5, end: 12, text: `[Opening Theme Music playing]` },
    { start: 13, end: 18, text: `Distributed under Microsoft Media Rights DRM Licensing` },
    { start: 20, end: 28, text: `PROLOGUE: "The following video stream has been compiled for residential broadband."` },
    { start: 35, end: 42, text: `- Did you hear that sound?\n- It's just the digital packet buffer settling.` },
    { start: 45, end: 52, text: `We must adjust our line speed before the stream drops.` },
    { start: 60, end: 68, text: `- Excellent resolution.\n- Yes, this standard-definition feed represents the future.` }
  ];

  // Helper to determine simulated connection speed
  const getConnectionDetails = () => {
    const connType = settings.preferredConnection || settings.connectionType || "DSL";
    if (connType.toLowerCase().includes("dial")) {
      return { type: "Dial-up Modem", speed: "112 Kbps" };
    } else if (connType.toLowerCase().includes("dsl")) {
      return { type: "DSL Broadband", speed: "1240 Kbps" };
    } else {
      return { type: "Cable Broadband", speed: "3240 Kbps" };
    }
  };
  const connDetails = getConnectionDetails();

  // Set initial position from localStorage
  useEffect(() => {
    if (movie) {
      const savedTime = localStorage.getItem(`resume_time_${movie.id}`);
      if (savedTime) {
        setCurrentTime(parseFloat(savedTime));
      }
      onRecordHistory(movie.id);
      triggerStartupSequence(true);
    }
  }, [id, movie]);

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      if (bufferTimerRef.current) clearInterval(bufferTimerRef.current);
      if (seekTimerRef.current) clearInterval(seekTimerRef.current);
    };
  }, []);

  // 2006 Streaming Server Startup Sequence (approx 2.5 - 3.0 seconds)
  const triggerStartupSequence = (autoPlayAfter = true) => {
    setIsBuffering(true);
    setIsStartupBuffering(true);
    setIsSeekBuffering(false);
    setIsPlaying(false);
    setStartupStep(1);
    setStartupBufferProgress(0);

    if (bufferTimerRef.current) clearInterval(bufferTimerRef.current);

    const startTime = Date.now();
    const duration = 2800; // 2.8 seconds

    bufferTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed >= duration) {
        clearInterval(bufferTimerRef.current!);
        setStartupStep(7);
        setStartupBufferProgress(100);
        setTimeout(() => {
          setIsStartupBuffering(false);
          setIsBuffering(false);
          if (autoPlayAfter) {
            setIsPlaying(true);
          }
        }, 150);
        return;
      }

      // Timeline stages:
      if (elapsed < 400) {
        setStartupStep(1);
      } else if (elapsed < 800) {
        setStartupStep(2);
      } else if (elapsed < 1200) {
        setStartupStep(3);
      } else if (elapsed < 1600) {
        setStartupStep(4);
      } else if (elapsed < 2000) {
        setStartupStep(5);
      } else if (elapsed < 2650) {
        setStartupStep(6);
        const bufferElapsed = elapsed - 2000;
        const progress = Math.min(Math.floor((bufferElapsed / 650) * 100), 100);
        setStartupBufferProgress(progress);
      } else {
        setStartupStep(7);
        setStartupBufferProgress(100);
      }
    }, 30);
  };

  // 2006 Seek Buffering Sequence (approx 0.8 - 1.2 seconds)
  const triggerSeekBuffering = (autoPlayAfter = true) => {
    setIsBuffering(true);
    setIsSeekBuffering(true);
    setIsStartupBuffering(false);
    const wasPlaying = isPlaying;
    setIsPlaying(false);
    setSeekProgress(0);

    if (seekTimerRef.current) clearInterval(seekTimerRef.current);

    const startTime = Date.now();
    const duration = 1000; // 1.0 second

    seekTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed >= duration) {
        clearInterval(seekTimerRef.current!);
        setSeekProgress(100);
        setIsSeekBuffering(false);
        setIsBuffering(false);
        if (autoPlayAfter || wasPlaying) {
          setIsPlaying(true);
        }
        return;
      }

      const progress = Math.min(Math.floor((elapsed / duration) * 100), 99);
      setSeekProgress(progress);
    }, 30);
  };

  // Legacy fallback mapping
  const triggerBufferingSequence = (initialMsg: string, autoPlayAfter = true) => {
    if (initialMsg.toLowerCase().includes("seeking") || initialMsg.toLowerCase().includes("jitter")) {
      triggerSeekBuffering(autoPlayAfter);
    } else {
      triggerStartupSequence(autoPlayAfter);
    }
  };

  // Movie playback loop
  useEffect(() => {
    if (isPlaying && !isBuffering) {
      playTimerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const nextTime = prev + 1;
          
          // Save resume position
          if (movie) {
            localStorage.setItem(`resume_time_${movie.id}`, nextTime.toString());
          }

          // Trigger occasional buffering simulated packet loss (e.g., every 90 seconds, very classic 2006)
          if (nextTime > 0 && nextTime % 95 === 0) {
            triggerSeekBuffering(true);
            return nextTime;
          }

          if (nextTime >= duration) {
            clearInterval(playTimerRef.current!);
            setIsPlaying(false);
            return duration;
          }
          return nextTime;
        });

        // Frame rendering tick
        setRenderedFrames((f) => f + Math.round(fps));
        
        // Minor fluctuation in Kbps
        setDownloadRate((r) => {
          const delta = Math.floor(Math.random() * 41) - 20;
          return Math.max(300, Math.min(1800, r + delta));
        });

      }, 1000);
    } else {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    }

    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, isBuffering]);

  // Sync subtitle cue
  useEffect(() => {
    if (settings.subtitlesEnabled) {
      const activeCue = subtitles.find((c) => currentTime >= c.start && currentTime <= c.end);
      if (activeCue) {
        setActiveSubtitle(activeCue.text);
      } else {
        setActiveSubtitle("");
      }
    } else {
      setActiveSubtitle("");
    }
  }, [currentTime, settings.subtitlesEnabled]);

  if (!movie) {
    return (
      <div className="bg-white border border-slate-300 rounded p-8 text-center font-sans">
        <h3 className="text-sm font-bold text-red-800 uppercase mb-2">Stream Failed</h3>
        <p className="text-xs text-slate-500 mb-4">The media file was not found on our distribution node.</p>
        <Link to="/" className="text-xs text-blue-600 hover:underline">Return Home</Link>
      </div>
    );
  }

  // Formatting helpers
  const formatTime = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (isBuffering) return;
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (movie) {
      localStorage.setItem(`resume_time_${movie.id}`, "0");
    }
  };

  const handleScrub = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (movie) {
      localStorage.setItem(`resume_time_${movie.id}`, newTime.toString());
    }
    triggerSeekBuffering(true);
  };

  const handleRestartStream = () => {
    triggerStartupSequence(true);
  };

  return (
    <div className="flex flex-col gap-6 font-sans select-none">
      
      {/* Return button */}
      <div className="flex justify-between items-center">
        <button
          id="exit-player-btn"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 font-bold bg-white border border-slate-300 px-3 py-1.5 rounded shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Movie Player</span>
        </button>

        <div className="flex gap-2">
          {/* CRT toggle */}
          <button
            id="toggle-crt-btn"
            onClick={() => setCrtEnabled(!crtEnabled)}
            className={`px-2.5 py-1 text-[10px] font-bold border rounded cursor-pointer flex items-center gap-1.5 ${
              crtEnabled
                ? "bg-emerald-800 text-white border-emerald-950"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>CRT Scanlines: {crtEnabled ? "ON" : "OFF"}</span>
          </button>
        </div>
      </div>

      {/* Main player viewport box */}
      <div className="max-w-4xl mx-auto w-full bg-slate-950 border-4 border-slate-500 rounded-lg p-2.5 shadow-2xl relative">
        
        {/* Title overlay header bar */}
        <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-950 px-3 py-1.5 border-b border-slate-800 flex justify-between items-center text-xs text-slate-300 font-bold mb-2">
          <span>Now Playing: <span className="text-white italic">{movie.title}</span> ({movie.year})</span>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <span>VC-1 Stream</span>
          </div>
        </div>

        {/* Video Canvas viewport */}
        <div className="aspect-video bg-black relative rounded overflow-hidden flex flex-col justify-center items-center border border-slate-800">
          
          {/* Optional CRT visual overlay scanlines filter */}
          {crtEnabled && (
            <div className="absolute inset-0 scanlines pointer-events-none z-30"></div>
          )}

          {/* Subtitles Overlay */}
          {activeSubtitle && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/85 text-yellow-300 px-4 py-2 rounded border border-slate-700 max-w-xl text-center text-xs font-medium z-20 whitespace-pre-line leading-relaxed shadow-[0_2px_4px_black]">
              {activeSubtitle}
            </div>
          )}

          {/* Movie Backdrop poster underlay when stopped/paused */}
          {!isPlaying && !isBuffering && (
            <img
              src={movie.poster}
              alt={movie.title}
              className="absolute inset-0 w-full h-full object-contain opacity-30 pointer-events-none filter blur-[1px]"
            />
          )}

          {/* Startup Buffering Block (Realistic 2006 Silverlight/VC-1 Startup Sequence) */}
          {isStartupBuffering && (
            <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center p-6 z-20 font-sans select-none animate-fadeIn">
              
              {/* Silverlight styled startup diagnostics window */}
              <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded shadow-2xl p-5 text-left flex flex-col gap-3 relative overflow-hidden">
                {/* Glossy top decoration */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600"></div>
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider font-mono">Netflix Streaming Client V10.4</span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono">DRM: ACTIVE</span>
                </div>

                <div className="flex flex-col gap-2 font-mono text-[11px] text-slate-300">
                  {/* Step 1: Server connection */}
                  {startupStep >= 1 && (
                    <div className="flex items-center justify-between h-4.5">
                      <span>Connecting to Netflix Streaming Server...</span>
                      {startupStep === 1 ? (
                        <span className="flex items-center gap-1 text-blue-400">
                          <span className="inline-block w-2.5 h-2.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-bold text-[10px]">✔ Connected</span>
                      )}
                    </div>
                  )}

                  {/* Step 2: Authentication */}
                  {startupStep >= 2 && (
                    <div className="flex items-center justify-between h-4.5">
                      <span>Authenticating Subscriber...</span>
                      {startupStep === 2 ? (
                        <span className="flex items-center gap-1 text-blue-400">
                          <span className="inline-block w-2.5 h-2.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-bold text-[10px]">✔ Subscriber Verified</span>
                      )}
                    </div>
                  )}

                  {/* Step 3: DRM verification */}
                  {startupStep >= 3 && (
                    <div className="flex items-center justify-between h-4.5">
                      <span>Verifying DRM License...</span>
                      {startupStep === 3 ? (
                        <span className="flex items-center gap-1 text-blue-400">
                          <span className="inline-block w-2.5 h-2.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-bold text-[10px]">✔ Microsoft DRM Active</span>
                      )}
                    </div>
                  )}

                  {/* Step 4: VC-1 Initialization */}
                  {startupStep >= 4 && (
                    <div className="flex items-center justify-between h-4.5">
                      <span>Initializing VC-1 Decoder...</span>
                      {startupStep === 4 ? (
                        <span className="flex items-center gap-1 text-blue-400">
                          <span className="inline-block w-2.5 h-2.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-bold text-[10px]">✔ Decoder Loaded</span>
                      )}
                    </div>
                  )}

                  {/* Step 5: Speed test */}
                  {startupStep >= 5 && (
                    <div className="border-t border-slate-800/80 pt-1.5 flex flex-col gap-0.5">
                      <div className="flex items-center justify-between h-4.5">
                        <span className="text-slate-400">Testing Broadband Connection...</span>
                        {startupStep === 5 ? (
                          <span className="flex items-center gap-1 text-blue-400">
                            <span className="inline-block w-2.5 h-2.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
                          </span>
                        ) : (
                          <span className="text-emerald-400 font-bold text-[10px]">✔ Completed</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 bg-black/40 p-1.5 border border-slate-800/50 rounded flex flex-col gap-0.5 mt-0.5 leading-relaxed">
                        <div>Detected: <strong className="text-slate-300">{connDetails.type}</strong></div>
                        <div>Download Speed: <strong className="text-blue-400">{connDetails.speed}</strong></div>
                      </div>
                    </div>
                  )}

                  {/* Step 6: Buffering Stream */}
                  {startupStep >= 6 && (
                    <div className="border-t border-slate-800/80 pt-1.5 flex flex-col gap-1">
                      <div className="flex items-center justify-between text-slate-400 text-[10px]">
                        <span>Buffering Stream...</span>
                        <span className="text-blue-400 font-bold font-mono">{startupBufferProgress}%</span>
                      </div>
                      
                      {/* Smooth progress bar container */}
                      <div className="w-full bg-slate-950 border border-slate-800 h-2.5 rounded overflow-hidden relative shadow-inner">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-sky-400 h-full transition-all duration-100 ease-out"
                          style={{ width: `${startupBufferProgress}%` }}
                        ></div>
                      </div>

                      {/* Changing messages */}
                      <div className="text-[9px] text-slate-500 italic text-center min-h-[14px]">
                        {startupBufferProgress < 25 && "Receiving packets..."}
                        {startupBufferProgress >= 25 && startupBufferProgress < 50 && "Downloading keyframes..."}
                        {startupBufferProgress >= 50 && startupBufferProgress < 75 && "Synchronizing audio..."}
                        {startupBufferProgress >= 75 && startupBufferProgress < 100 && "Building playback cache..."}
                        {startupBufferProgress === 100 && "Buffering complete!"}
                      </div>
                    </div>
                  )}

                  {/* Step 7: Ready */}
                  {startupStep >= 7 && (
                    <div className="border-t border-slate-800/80 pt-1.5 flex items-center justify-center gap-1 text-emerald-400 font-bold text-[12px] text-center">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                      <span>Ready.</span>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* Seek Buffering Block (Approx 0.8 - 1.2 seconds, blue buffering animation) */}
          {isSeekBuffering && (
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center z-20 font-sans select-none animate-fadeIn">
              
              {/* Retro spinning loading circle with progress */}
              <div className="relative w-12 h-12 mb-3 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-slate-800"></div>
                <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                <span className="text-[9px] font-mono font-bold text-blue-400">{seekProgress}%</span>
              </div>

              <div className="font-bold text-xs text-slate-200 mb-0.5 font-mono tracking-tight uppercase">
                Re-buffering Stream...
              </div>
              
              <div className="text-slate-400 text-[10px] max-w-md mb-3 font-mono">
                Loading New Keyframes...
              </div>

              {/* Minimalist seek progress bar */}
              <div className="w-44 bg-slate-950 border border-slate-800 h-2 rounded overflow-hidden relative shadow-inner">
                <div
                  className="bg-gradient-to-r from-blue-600 to-sky-400 h-full transition-all duration-100 ease-out"
                  style={{ width: `${seekProgress}%` }}
                ></div>
              </div>
              
              <div className="mt-1.5 text-[9px] text-slate-500 font-mono">
                Buffer {seekProgress}%
              </div>
            </div>
          )}

          {/* Stopped/Paused overlay state */}
          {!isPlaying && !isBuffering && (
            <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center z-10 gap-3">
              <button
                id="viewport-overlay-play-btn"
                onClick={handlePlayPause}
                className="w-16 h-16 rounded-full bg-red-700 hover:bg-red-600 border-2 border-white flex items-center justify-center text-white cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-[0_4px_8px_black]"
              >
                <Play className="w-8 h-8 fill-white ml-1" />
              </button>
              <div className="text-white font-bold text-xs bg-black/60 px-3 py-1 rounded border border-slate-700 select-none">
                {currentTime > 0 ? `Paused at ${formatTime(currentTime)}` : "Click to stream movie"}
              </div>
            </div>
          )}

          {/* Active play simulation visualizer (generates retro feeling) */}
          {isPlaying && !isBuffering && (
            <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none select-none z-10">
              {/* Top watermark */}
              <div className="text-white/20 font-bold text-[10px] tracking-widest uppercase flex justify-between">
                <span>NETFLIX Watch Instantly Beta</span>
                <span>DRM Decrypt Active</span>
              </div>
              
              {/* Subtle spinning CD in bottom right corner */}
              <div className="self-end flex items-center gap-1.5 opacity-25">
                <span className="text-[9px] font-mono text-white tracking-widest">STREAMING LIVE</span>
                <span className="w-4 h-4 rounded-full border border-white border-dashed animate-spin"></span>
              </div>
            </div>
          )}

        </div>

        {/* Media Player Controls Console (classic gray bevel box) */}
        <div className="mt-3 bg-gradient-to-b from-slate-200 to-slate-400 border border-slate-500 rounded p-3 select-none flex flex-col gap-3 shadow-[inset_0_1px_0_white]">
          
          {/* Progress bar scrubber slider */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold text-slate-700 w-12 text-right">
              {formatTime(currentTime)}
            </span>
            <input
              id="player-progress-scrubber"
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={handleScrub}
              disabled={isBuffering}
              className="flex-1 accent-red-700 h-1.5 bg-slate-300 border border-slate-400 rounded cursor-pointer disabled:opacity-50"
            />
            <span className="text-[10px] font-mono font-bold text-slate-700 w-12 text-left">
              {formatTime(duration)}
            </span>
          </div>

          {/* Buttons panel and dials */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-300/60 pt-2.5">
            
            {/* Control buttons group */}
            <div className="flex items-center gap-2">
              <button
                id="player-play-btn"
                onClick={handlePlayPause}
                disabled={isBuffering}
                title={isPlaying ? "Pause Stream" : "Play Stream"}
                className={`w-8 h-8 rounded border flex items-center justify-center cursor-pointer shadow-sm active:translate-y-px ${
                  isPlaying
                    ? "bg-gradient-to-b from-slate-100 to-slate-250 border-slate-400 text-slate-800"
                    : "bg-gradient-to-b from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 border-red-950 text-white"
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <button
                id="player-stop-btn"
                onClick={handleStop}
                disabled={isBuffering}
                title="Stop & Rewind"
                className="w-8 h-8 rounded bg-gradient-to-b from-slate-100 to-slate-250 hover:from-white hover:to-slate-100 border border-slate-400 text-slate-700 flex items-center justify-center cursor-pointer shadow-sm active:translate-y-px"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
              </button>

              <button
                id="player-reload-btn"
                onClick={handleRestartStream}
                title="Reset/Re-buffer Feed"
                className="w-8 h-8 rounded bg-gradient-to-b from-slate-100 to-slate-250 hover:from-white hover:to-slate-100 border border-slate-400 text-slate-700 flex items-center justify-center cursor-pointer shadow-sm active:translate-y-px"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Volume bar dials */}
            <div className="flex items-center gap-2 text-xs text-slate-700 font-bold">
              <button
                id="player-mute-btn"
                onClick={() => setIsMuted(!isMuted)}
                className="p-1 cursor-pointer hover:bg-slate-100/50 rounded"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-700" />
                ) : (
                  <Volume2 className="w-4 h-4 text-slate-700" />
                )}
              </button>
              <span className="text-[10px] font-mono">Vol:</span>
              <input
                id="player-volume-slider"
                type="range"
                min={0}
                max={100}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseInt(e.target.value));
                  setIsMuted(false);
                }}
                className="w-20 accent-slate-700 cursor-pointer h-1 bg-slate-300 rounded"
              />
              <span className="w-6 font-mono text-[10px] text-slate-600">
                {isMuted ? "0" : volume}%
              </span>
            </div>

            {/* Active streaming settings metadata */}
            <div className="flex gap-2 text-[10px] bg-slate-50 border border-slate-300/80 px-2 py-1 rounded">
              <div>
                Quality: <strong className="text-slate-800 uppercase">{streamQuality}</strong>
              </div>
              <div className="w-px h-3.5 bg-slate-300"></div>
              <div>
                Compression: <strong className="text-slate-800">VC-1</strong>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Under player: detailed diagnostics panel */}
      <div className="bg-white border border-slate-300 rounded p-4 shadow-sm select-none">
        <h3 className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-1.5 mb-3 uppercase flex items-center gap-1.5">
          <Monitor className="w-4 h-4 text-blue-600" />
          Silverlight Real-time Streaming stream Diagnostics
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-bold">Line Speed Download:</span>
            <strong className="text-slate-800">{downloadRate} Kbps</strong>
          </div>
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-bold">Renderer Framework:</span>
            <strong className="text-slate-800">DirectShow Overlay</strong>
          </div>
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-bold">Total Frames Decoded:</span>
            <strong className="text-slate-800 font-mono">{renderedFrames.toLocaleString()}</strong>
          </div>
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-bold">Target Frame rate:</span>
            <strong className="text-slate-800">{fps} fps (NTSC)</strong>
          </div>
        </div>

        <div className="mt-4 border-t border-slate-200 pt-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-1.5 text-emerald-800 text-[10px] font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>VeriSign Authorized DRM decryption keys loaded successfully.</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <AlertCircle className="w-4 h-4 text-slate-400" />
            <span>If download speeds fall below 768 Kbps, video rendering will halt automatically.</span>
          </div>
        </div>
      </div>

    </div>
  );
}
