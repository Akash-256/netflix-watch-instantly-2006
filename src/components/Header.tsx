import React, { useState, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Wifi } from "lucide-react";
import { UserAccount, QueueItem } from "../types";

interface HeaderProps {
  account: UserAccount;
  queue: QueueItem[];
  onQuickSearch: (query: string) => void;
  onSignOut?: () => void;
}

export default function Header({ account, queue, onQuickSearch, onSignOut }: HeaderProps) {
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onQuickSearch(searchVal);
      navigate(`/search?q=${encodeURIComponent(searchVal)}`);
    }
  };

  const isActive = (paths: string[]) => {
    return paths.includes(location.pathname);
  };

  const activeQueueCount = queue.filter((item) => !item.watched).length;

  const tabClass = (paths: string[]) => {
    const active = isActive(paths);
    return `px-3.5 py-2 font-sans text-[11px] font-extrabold uppercase transition-all tracking-tight cursor-pointer select-none flex items-center gap-1.5 ${
      active
        ? "bg-[#e5e5e5] text-slate-900 border-t-2 border-l border-r border-[#ccc] rounded-t-sm shadow-[0_1px_0_#f5f5f5]"
        : "text-white hover:text-red-200"
    }`;
  };

  return (
    <header className="w-full bg-gradient-to-b from-[#b80710] to-[#800000] border-b-2 border-slate-950 select-none shadow-md">
      
      {/* Top Glossy Arch Panel */}
      <div className="max-w-[1000px] mx-auto px-4 py-3.5 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Netflix Watch Instantly Vintage Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-1.5 group">
            <h1
              className="text-3xl font-extrabold tracking-tighter text-white"
              style={{
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                textShadow: "1px 1px 2px #000, 2px 2px 0px #4a0000",
                transform: "scaleY(1.2)",
              }}
            >
              NETFLIX
            </h1>
            <span className="text-white font-sans text-xs font-bold tracking-tight uppercase pt-1 text-slate-100">
              Watch Instantly
            </span>
          </Link>
          <div className="bg-gradient-to-r from-red-600 to-red-800 border border-white text-white text-[8px] font-black px-1.5 py-0.5 rounded tracking-wide uppercase shadow">
            BETA
          </div>
        </div>

        {/* Hello Profile capsule and Search Input */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* User Capsule */}
          <div className="bg-black/45 border border-red-950/40 rounded px-3 py-1.5 text-[10px] text-white flex items-center gap-1.5 shadow-inner">
            <span>Hello, <strong className="text-red-200">{account.username || "User1004"}</strong></span>
            <span className="text-red-500 font-bold">|</span>
            <button
              id="header-signout-btn"
              onClick={onSignOut}
              className="text-slate-300 hover:text-white hover:underline cursor-pointer"
            >
              Sign Out
            </button>
          </div>

          {/* Red Header Search box */}
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
              id="header-nav-search-input"
              type="text"
              placeholder="Search titles, cast..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-40 sm:w-48 bg-white text-slate-800 text-[11px] px-2 py-1 border border-slate-500 rounded-l outline-none focus:border-red-900"
            />
            <button
              id="header-nav-search-btn"
              type="submit"
              className="bg-gradient-to-b from-slate-100 to-slate-300 hover:from-white hover:to-slate-200 text-slate-800 border border-l-0 border-slate-500 font-bold text-[11px] px-3.5 py-1 rounded-r cursor-pointer active:translate-y-px flex items-center gap-1"
            >
              <Search className="w-3 h-3" />
              <span>Search</span>
            </button>
          </form>

        </div>
      </div>

      {/* Solid Black Navigation Tab Bar */}
      <div className="bg-slate-950 border-t border-red-950 px-4">
        <div className="max-w-[1000px] mx-auto flex flex-col sm:flex-row justify-between items-center">
          
          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-1.5 pt-1.5">
            <Link to="/" className={tabClass(["/"])}>
              Home
            </Link>
            <Link to="/browse" className={tabClass(["/browse", "/genres"])}>
              Browse Movies
            </Link>
            <Link to="/new-releases" className={tabClass(["/new-releases"])}>
              New Releases
            </Link>
            <Link to="/queue" className={tabClass(["/queue"])}>
              My Queue {activeQueueCount > 0 ? `(${activeQueueCount})` : ""}
            </Link>
            <Link to="/recommendations" className={tabClass(["/recommendations"])}>
              Recommendations
            </Link>
            <Link to="/account" className={tabClass(["/account"])}>
              Account
            </Link>
            <Link to="/settings" className={tabClass(["/settings"])}>
              Settings
            </Link>
            <Link to="/help" className={tabClass(["/help"])}>
              Help
            </Link>
            <Link to="/about" className={tabClass(["/about"])}>
              About
            </Link>
          </nav>

          {/* Line Connection status indicator */}
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-sans py-2 sm:py-0 select-none">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>Connection: <strong className="text-white">{account.preferredConnection}</strong> (Ready)</span>
          </div>

        </div>
      </div>

    </header>
  );
}
