import React, { useState, useRef, useEffect, FormEvent } from "react";
import { MessageSquare, Send, HelpCircle, AlertTriangle, Monitor, ShieldCheck, RefreshCw } from "lucide-react";
import { HelpMessage } from "../types";

export default function HelpAssistant() {
  const [messages, setMessages] = useState<HelpMessage[]>([
    {
      id: "m0",
      sender: "gemini",
      text: "Hello! Welcome to the Netflix Watch Instantly (Beta) Technical Support line. I am your automated broadband assistant from Los Gatos, California. How can I assist you with your dial-up, DSL speed adjustments, or Windows Media Player 10 configuration today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: HelpMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini/help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.ok) {
        throw new Error("Server communication failure");
      }

      const data = await response.json();
      
      const repMsg: HelpMessage = {
        id: `g-${Date.now()}`,
        sender: "gemini",
        text: data.text,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, repMsg]);
    } catch (err) {
      // Local fallback in case of errors
      const fallbackMsg: HelpMessage = {
        id: `g-err-${Date.now()}`,
        sender: "gemini",
        text: "Support Line Alert: I am currently experiencing connection lag. For best results, please ensure your DSL line is active. Let's try power cycling your modem, or lowering your Watch Instantly buffering quality to 240p in Settings.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = input;
    setInput("");
    handleSendMessage(msg);
  };

  const PRESETS = [
    "Why does my stream keep buffering?",
    "Does this work on 56k dial-up?",
    "Windows Media Player 10 DRM errors",
    "How do I install Silverlight on macOS Tiger?",
  ];

  return (
    <div id="help-assistant-container" className="w-full max-w-4xl mx-auto border-2 border-slate-400 bg-[#ece9d8] rounded p-1 shadow-[4px_4px_10px_rgba(0,0,0,0.25)] select-none">
      
      {/* Support Window Header (XP style blue) */}
      <div className="bg-gradient-to-r from-[#0055e5] via-[#0b80ff] to-[#0055e5] p-2 flex justify-between items-center text-white text-xs font-bold rounded-t-sm border-b border-blue-900">
        <span className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 fill-white text-[#0055e5]" />
          Netflix Interactive Support Line (Ver. 1.0.4)
        </span>
        <div className="flex gap-1">
          <span className="w-4 h-4 bg-slate-200 text-slate-800 flex items-center justify-center rounded-sm text-[10px] cursor-pointer">_</span>
          <span className="w-4 h-4 bg-slate-200 text-slate-800 flex items-center justify-center rounded-sm text-[10px] cursor-pointer">□</span>
          <span className="w-4 h-4 bg-red-600 text-white flex items-center justify-center rounded-sm text-[10px] cursor-pointer font-bold">X</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 p-2">
        
        {/* Left column: FAQ Quick Topics */}
        <div className="md:col-span-1 bg-white border border-slate-400 p-2 rounded flex flex-col gap-3 font-sans text-[11px]">
          <div className="font-bold text-slate-800 border-b border-slate-200 pb-1 flex items-center gap-1.5 uppercase text-[10px]">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            Quick FAQ Guides
          </div>
          
          <div className="flex flex-col gap-2.5 text-slate-600">
            <div className="border border-slate-200 p-1.5 rounded bg-slate-50">
              <strong className="text-slate-800 block mb-0.5">DRM Requirements</strong>
              All streaming streams require Windows Media DRM. Ensure your system clock is set to local time.
            </div>
            <div className="border border-slate-200 p-1.5 rounded bg-slate-50">
              <strong className="text-slate-800 block mb-0.5">Broadband Guide</strong>
              768kbps DSL minimum. DSL/Cable speed test tool is available on Windows Updates.
            </div>
            <div className="border border-slate-200 p-1.5 rounded bg-slate-50">
              <strong className="text-slate-800 block mb-0.5">Mac OS X Tiger</strong>
              Mac Intel systems require the Silverlight 1.0 plug-in for Safari. PowerPC G4/G5 systems are currently unsupported.
            </div>
          </div>
        </div>

        {/* Right column: Interactive Chat Pane */}
        <div className="md:col-span-3 flex flex-col bg-white border border-slate-400 rounded p-2">
          
          {/* Chat scrolling display log */}
          <div className="flex-1 min-h-[300px] max-h-[400px] overflow-y-auto border border-slate-300 bg-[#fbfaf0] rounded p-3 mb-3 flex flex-col gap-2.5">
            {messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <div
                  key={m.id}
                  className={`max-w-[85%] rounded p-2 text-xs border leading-relaxed font-sans ${
                    isUser
                      ? "self-end bg-[#e2ecf5] border-blue-200 text-slate-800"
                      : "self-start bg-[#f0ede0] border-slate-300 text-slate-800"
                  }`}
                >
                  <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold mb-1 border-b border-slate-200/50 pb-0.5 uppercase">
                    <span>{isUser ? "You (Subscriber)" : "Netflix Technical Assistant"}</span>
                    <span>{m.timestamp}</span>
                  </div>
                  <p className="whitespace-pre-line text-xs font-sans select-text">{m.text}</p>
                </div>
              );
            })}

            {isLoading && (
              <div className="self-start bg-slate-100 border border-slate-200 rounded p-2.5 text-xs text-slate-500 font-sans flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-slate-400 animate-spin" />
                <span>Representative is writing response... (Connecting to Gemini Cloud Servers)</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick-Prompt preset options */}
          <div className="mb-2 flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Troubleshoot:</span>
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                id={`help-preset-${idx}`}
                type="button"
                onClick={() => handleSendMessage(p)}
                disabled={isLoading}
                className="bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-800 text-[10px] border border-slate-300 px-2 py-0.5 rounded cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Compose input bar */}
          <form onSubmit={handleFormSubmit} className="flex gap-1.5">
            <input
              id="help-chat-input"
              type="text"
              placeholder="Type your technical question (e.g. error code, bandwidth speeds)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-white border-2 border-slate-400 rounded px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-600 font-sans"
            />
            <button
              id="help-send-btn"
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-b from-[#0055e5] to-[#003da8] hover:from-[#0b80ff] hover:to-[#0055e5] text-white font-bold text-xs px-4 py-1.5 rounded border border-blue-900 cursor-pointer shadow-[1px_1px_2px_rgba(0,0,0,0.3)] active:translate-y-px flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5 fill-white" />
              <span>Send</span>
            </button>
          </form>

          {/* Verification footer */}
          <div className="flex justify-between items-center text-[9px] text-slate-400 mt-3 border-t border-slate-200 pt-1.5 font-sans select-none">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              SSL connection verified via VeriSign, Inc.
            </span>
            <span className="flex items-center gap-1">
              <Monitor className="w-3.5 h-3.5 text-blue-600" />
              Optimal Resolution: 1024x768 (32-bit Color)
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
