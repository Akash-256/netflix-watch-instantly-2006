import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { Film, PlayCircle, Key, RefreshCw, Cpu, Database, Award, Info, Trash2 } from "lucide-react";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import MovieDetails from "./pages/MovieDetails";
import Genres from "./pages/Genres";
import NewReleases from "./pages/NewReleases";
import MyQueue from "./pages/MyQueue";
import Recommendations from "./pages/Recommendations";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import HelpCenter from "./pages/HelpCenter";
import About from "./pages/About";
import Search from "./pages/Search";
import WatchInstantly from "./pages/WatchInstantly";

// Data & Types
import { MOVIES } from "./movies";
import { Movie, QueueItem, UserAccount, UserSettings } from "./types";

// Default Initial States
const defaultAccount: UserAccount = {
  username: "rushikeshw910",
  email: "rushikesh.hackathon@gmail.com",
  preferredConnection: "DSL",
  preferredQuality: "360p",
  preferredPlayer: "Windows Media Player 10",
  rememberLogin: true,
  membershipLevel: "Gold",
};

const defaultSettings: UserSettings = {
  preferredConnection: "768k DSL Broadband",
  preferredQuality: "360p (Standard Broadband)",
  subtitlesEnabled: true,
  autoplayNext: true,
};

const initialQueue: QueueItem[] = [
  { id: "q1", movieId: "1", addedAt: new Date().toISOString(), watched: false, order: 1 },
  { id: "q2", movieId: "4", addedAt: new Date().toISOString(), watched: false, order: 2 },
  { id: "q3", movieId: "7", addedAt: new Date().toISOString(), watched: false, order: 3 },
  { id: "q4", movieId: "13", addedAt: new Date().toISOString(), watched: false, order: 4 },
];

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  // App State with LocalStorage Persistence
  const [movies, setMovies] = useState<Movie[]>(() => {
    const saved = localStorage.getItem("netflix_movies");
    return saved ? JSON.parse(saved) : MOVIES;
  });

  const [queue, setQueue] = useState<QueueItem[]>(() => {
    const saved = localStorage.getItem("netflix_queue");
    return saved ? JSON.parse(saved) : initialQueue;
  });

  const [account, setAccount] = useState<UserAccount>(() => {
    const saved = localStorage.getItem("netflix_account");
    return saved ? JSON.parse(saved) : defaultAccount;
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem("netflix_settings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [ratings, setRatings] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem("netflix_ratings");
    return saved ? JSON.parse(saved) : {};
  });

  const [watchHistory, setWatchHistory] = useState<{ movieId: string; watchedAt: string; resumeTime?: number }[]>(() => {
    const saved = localStorage.getItem("netflix_watch_history");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem("netflix_movies", JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem("netflix_queue", JSON.stringify(queue));
  }, [queue]);

  useEffect(() => {
    localStorage.setItem("netflix_account", JSON.stringify(account));
  }, [account]);

  useEffect(() => {
    localStorage.setItem("netflix_settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem("netflix_ratings", JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    localStorage.setItem("netflix_watch_history", JSON.stringify(watchHistory));
  }, [watchHistory]);

  // Handler functions
  const handleAddToQueue = (movieId: string) => {
    if (queue.some((item) => item.movieId === movieId)) {
      alert("This title is already present in your Watch Instantly Queue.");
      return;
    }
    const newItem: QueueItem = {
      id: `q-${Date.now()}`,
      movieId,
      addedAt: new Date().toISOString(),
      watched: false,
      order: queue.length + 1,
    };
    setQueue((prev) => [...prev, newItem]);
    alert("Title added successfully to your red envelope queue!");
  };

  const handleRemoveFromQueue = (itemId: string) => {
    setQueue((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleMoveUp = (itemId: string) => {
    setQueue((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex((item) => item.id === itemId);
      if (index <= 0) return prev;
      const target = sorted[index];
      const competitor = sorted[index - 1];
      const tempOrder = target.order;
      target.order = competitor.order;
      competitor.order = tempOrder;
      return [...sorted];
    });
  };

  const handleMoveDown = (itemId: string) => {
    setQueue((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex((item) => item.id === itemId);
      if (index < 0 || index >= sorted.length - 1) return prev;
      const target = sorted[index];
      const competitor = sorted[index + 1];
      const tempOrder = target.order;
      target.order = competitor.order;
      competitor.order = tempOrder;
      return [...sorted];
    });
  };

  const handleToggleWatched = (itemId: string) => {
    setQueue((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, watched: !item.watched } : item))
    );
  };

  const handlePlayMovie = (movieId: string) => {
    navigate(`/watch/${movieId}`);
  };

  const handleRecordHistory = (movieId: string) => {
    setWatchHistory((prev) => {
      const filtered = prev.filter((item) => item.movieId !== movieId);
      return [{ movieId, watchedAt: new Date().toISOString() }, ...filtered];
    });
  };

  const handleClearHistory = () => {
    setWatchHistory([]);
    // also clear saved times
    movies.forEach((m) => {
      localStorage.removeItem(`resume_time_${m.id}`);
    });
    alert("Streaming playback registry reset completed!");
  };

  const handleUpdateAccount = (updates: Partial<UserAccount>) => {
    setAccount((prev) => ({ ...prev, ...updates }));
  };

  const handleUpdateSettings = (updates: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const handleUpdateRating = (movieId: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [movieId]: rating }));
  };

  const handleAddReview = (movieId: string, reviewData: any) => {
    setMovies((prev) =>
      prev.map((m) => {
        if (m.id === movieId) {
          const newReview = {
            ...reviewData,
            id: `rev-${Date.now()}`,
            date: new Date().toISOString().split("T")[0],
          };
          return {
            ...m,
            reviews: [newReview, ...m.reviews],
          };
        }
        return m;
      })
    );
  };

  const handleQuickSearch = (query: string) => {
    // handled via navigate to /search?q=query
  };

  const handleSignOut = () => {
    if (confirm("Sign out of Netflix 2006 Session?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  // Determine if we are in the video player route (WatchInstantly page should be full width with no portal borders)
  const isPlayerRoute = location.pathname.startsWith("/watch/");

  const countRated = Object.keys(ratings).length;

  return (
    <div className="min-h-screen bg-[#3b3b3b] py-6 px-3 flex items-center justify-center">
      
      {/* Dynamic Browser Container Wrapper */}
      <div className="w-full max-w-[1024px] bg-[#fdfcf6] border-2 border-[#1e1e1e] rounded-lg shadow-[0_10px_35px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between">
        
        {/* Header (with logo and navigation menu) */}
        {!isPlayerRoute && (
          <Header
            account={account}
            queue={queue}
            onQuickSearch={handleQuickSearch}
            onSignOut={handleSignOut}
          />
        )}

        {/* Main Content Layout Body */}
        <main className={`p-4 flex-grow ${isPlayerRoute ? "bg-black p-0" : ""}`}>
          {isPlayerRoute ? (
            /* Immersive Player Experience */
            <Routes>
              <Route
                path="/watch/:id"
                element={
                  <WatchInstantly
                    movies={movies}
                    settings={settings}
                    onRecordHistory={handleRecordHistory}
                  />
                }
              />
            </Routes>
          ) : (
            /* Two-column 2006 Retro Portal Grid Layout */
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
              
              {/* Left Sidebar Menu */}
              <aside className="lg:col-span-1 flex flex-col gap-4 font-sans select-none">
                
                {/* 1. BROWSE GENRES SIDEBAR PANEL */}
                <div className="bg-white border border-slate-350 rounded p-3 shadow-sm">
                  <h3 className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-1.5 mb-2.5 uppercase flex items-center gap-1.5">
                    <Film className="w-4 h-4 text-red-700" />
                    Browse Genres
                  </h3>
                  <div className="flex flex-col gap-1 text-[11px] text-slate-600 font-medium">
                    {[
                      "Action",
                      "Adventure",
                      "Animation",
                      "Biography",
                      "Comedy",
                      "Crime",
                      "Drama",
                      "Family",
                      "Fantasy",
                      "Mystery",
                      "Romance",
                      "Sci-Fi",
                      "Thriller",
                    ].map((genre) => (
                      <Link
                        key={genre}
                        to={`/browse?genre=${genre}`}
                        className="hover:text-red-700 hover:underline px-1 py-0.5 rounded hover:bg-slate-55 flex justify-between"
                      >
                        <span>{genre}</span>
                        <span className="text-slate-400 text-[10px]">
                          ({movies.filter((m) => m.genres.includes(genre)).length})
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 2. MEMBER BENEFITS ADVANTAGES BOX */}
                <div className="bg-gradient-to-br from-[#fffdf0] to-[#fffde8] border border-amber-300 p-3 rounded shadow-sm">
                  <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5 border-b border-amber-200 pb-1 mb-2 uppercase">
                    <Key className="w-4 h-4 text-amber-600 fill-amber-100" />
                    Member Benefits
                  </h4>
                  <p className="text-[10px] text-slate-600 leading-relaxed mb-2.5">
                    Get **UNLIMITED** digital Watch Instantly stream minutes with our Standard 3-DVD mailing plan. Zero delay buffer on DSL connections.
                  </p>
                  <button
                    onClick={() => {
                      alert(
                        "Speed Test: Your connection has been measured at 1.45 Mbps (High-Speed Cable). Enjoy full 480p VC-1 standard streams!"
                      );
                    }}
                    className="w-full text-center bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-white font-bold text-[10px] py-1 rounded border border-amber-800 cursor-pointer shadow-sm active:translate-y-px"
                  >
                    Check Line Speed (DSL)
                  </button>
                </div>

                {/* 3. RECENT HISTORY TRACKER */}
                <div className="bg-white border border-slate-350 p-3 rounded shadow-sm">
                  <h4 className="text-xs font-bold text-slate-800 border-b border-slate-200 pb-1 mb-2 uppercase flex justify-between items-center">
                    <span>Recent History</span>
                    {watchHistory.length > 0 && (
                      <button
                        onClick={handleClearHistory}
                        className="text-[9px] text-red-700 hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    )}
                  </h4>
                  {watchHistory.length === 0 ? (
                    <p className="text-[10px] text-slate-400 italic">No recent streaming playback registry active.</p>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {watchHistory.slice(0, 3).map((hist) => {
                        const movie = movies.find((m) => m.id === hist.movieId);
                        if (!movie) return null;
                        return (
                          <div
                            key={movie.id}
                            className="flex items-center gap-1.5 border-b border-slate-100 pb-1.5 last:border-0 last:pb-0"
                          >
                            <img
                              src={movie.poster}
                              alt={movie.title}
                              className="w-7 aspect-[3/4] object-cover bg-slate-100 border border-slate-200 rounded-sm"
                            />
                            <div className="min-w-0 flex-1">
                              <Link
                                to={`/movie/${movie.id}`}
                                className="font-bold text-[10px] text-slate-800 hover:text-red-700 hover:underline truncate block"
                              >
                                {movie.title}
                              </Link>
                              <span className="text-[8px] text-slate-400 block font-mono">
                                {new Date(hist.watchedAt).toLocaleDateString()}
                              </span>
                            </div>
                            <button
                              id={`sidebar-play-${movie.id}`}
                              onClick={() => handlePlayMovie(movie.id)}
                              className="p-0.5 hover:bg-slate-100 rounded text-red-700 cursor-pointer"
                              title="Resume Stream"
                            >
                              <PlayCircle className="w-4 h-4 fill-white" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 4. CINEMATCH SCOREBOARD */}
                <div className="bg-[#f0f4ff] border border-blue-200 p-3 rounded shadow-sm text-xs text-blue-900 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold text-blue-950 uppercase text-[10px] border-b border-blue-200 pb-1 mb-2">
                    <Award className="w-4 h-4 text-blue-600" />
                    CineMatch Score
                  </div>
                  <p className="text-[10px] text-blue-800">
                    You have rated <strong className="text-blue-950 font-mono">{countRated}</strong> movie titles. 
                    {countRated < 5 ? " Rate 5 movies to calibrate our personalized CineMatch algorithm!" : " CineMatch algorithm calibrated successfully!"}
                  </p>
                </div>

              </aside>

              {/* Central Pages View Area */}
              <section className="lg:col-span-3 min-h-[500px]">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Home
                        movies={movies}
                        queue={queue}
                        settings={settings}
                        onAddToQueue={handleAddToQueue}
                        onPlayMovie={handlePlayMovie}
                        ratings={ratings}
                        watchHistory={watchHistory}
                      />
                    }
                  />
                  <Route
                    path="/browse"
                    element={
                      <Browse
                        movies={movies}
                        queue={queue}
                        onAddToQueue={handleAddToQueue}
                        onPlayMovie={handlePlayMovie}
                      />
                    }
                  />
                  <Route
                    path="/genres"
                    element={
                      <Genres
                        movies={movies}
                        queue={queue}
                        onAddToQueue={handleAddToQueue}
                        onPlayMovie={handlePlayMovie}
                      />
                    }
                  />
                  <Route
                    path="/new-releases"
                    element={
                      <NewReleases
                        movies={movies}
                        queue={queue}
                        onAddToQueue={handleAddToQueue}
                        onPlayMovie={handlePlayMovie}
                      />
                    }
                  />
                  <Route
                    path="/queue"
                    element={
                      <MyQueue
                        queue={queue}
                        movies={movies}
                        account={account}
                        onRemove={handleRemoveFromQueue}
                        onMoveUp={handleMoveUp}
                        onMoveDown={handleMoveDown}
                        onToggleWatched={handleToggleWatched}
                        onPlayMovie={handlePlayMovie}
                      />
                    }
                  />
                  <Route
                    path="/recommendations"
                    element={
                      <Recommendations
                        movies={movies}
                        queue={queue}
                        onAddToQueue={handleAddToQueue}
                        onPlayMovie={handlePlayMovie}
                      />
                    }
                  />
                  <Route
                    path="/account"
                    element={
                      <Account
                        account={account}
                        onUpdateAccount={handleUpdateAccount}
                      />
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <Settings
                        settings={settings}
                        onUpdateSettings={handleUpdateSettings}
                      />
                    }
                  />
                  <Route path="/help" element={<HelpCenter />} />
                  <Route path="/about" element={<About />} />
                  <Route
                    path="/search"
                    element={
                      <Search
                        movies={movies}
                        queue={queue}
                        onAddToQueue={handleAddToQueue}
                        onPlayMovie={handlePlayMovie}
                      />
                    }
                  />
                  <Route
                    path="/movie/:id"
                    element={
                      <MovieDetails
                        movies={movies}
                        queue={queue}
                        onAddToQueue={handleAddToQueue}
                        onPlayMovie={handlePlayMovie}
                        userRatings={ratings}
                        onRateMovie={handleUpdateRating}
                        onAddReview={handleAddReview}
                      />
                    }
                  />
                </Routes>
              </section>

            </div>
          )}
        </main>

        {/* Footer boilerplate and specs */}
        {!isPlayerRoute && <Footer />}

      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
