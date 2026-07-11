import { Link, useNavigate } from "react-router-dom";
import { Play, Plus, Check, Star, Video, Eye } from "lucide-react";
import { Movie, QueueItem, UserSettings } from "../types";

interface HomeProps {
  movies: Movie[];
  queue: QueueItem[];
  settings: UserSettings;
  onAddToQueue: (movieId: string) => void;
  onPlayMovie: (movieId: string) => void;
  ratings: Record<string, number>;
  watchHistory: { movieId: string; watchedAt: string; resumeTime?: number }[];
}

export default function Home({
  movies,
  queue,
  settings,
  onAddToQueue,
  onPlayMovie,
  ratings,
  watchHistory,
}: HomeProps) {
  const navigate = useNavigate();

  // Featured Movie: Let's pick The Departed (id: "1") or Casino Royale as spotlight
  const spotlightMovie = movies.find((m) => m.id === "1") || movies[0];

  // Recommendations: let's pick 6 movies (e.g. Action/Drama/Animation)
  const recommendedMovies = movies.filter((m) => m.id !== "1").slice(0, 6);

  // Recently added: let's pick 3 items (e.g. from 2006)
  const recentlyAdded = movies.filter((m) => m.year === 2006 && m.id !== "1").slice(0, 3);

  const isInQueue = (movieId: string) => {
    return queue.some((item) => item.movieId === movieId);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Featured Spotlight Section */}
      <div className="bg-black border border-slate-700 text-white p-4 rounded shadow-md select-none font-sans flex flex-col lg:flex-row gap-4 items-stretch">
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-amber-400 font-bold tracking-widest uppercase block mb-1">
              ★ FEATURED SPOTLIGHT ★
            </span>
            <h2 className="text-2xl font-black italic tracking-tight text-slate-100 uppercase" style={{ transform: "scaleY(1.05)" }}>
              {spotlightMovie.title}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
              <span className="bg-slate-800 px-1 rounded font-bold">{spotlightMovie.rating}</span>
              <span>{spotlightMovie.year}</span>
              <span>{spotlightMovie.runtime} min</span>
              <span className="text-yellow-500 font-bold">★ {spotlightMovie.avgRating}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mt-2.5 max-w-xl">
              {spotlightMovie.synopsis}
            </p>
            <div className="text-[11px] text-slate-400 mt-2">
              <strong className="text-slate-300">Cast:</strong> {spotlightMovie.cast.slice(0, 4).join(", ")}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <button
              id="spotlight-watch-btn"
              onClick={() => onPlayMovie(spotlightMovie.id)}
              className="bg-gradient-to-b from-[#e50914] to-[#b80710] hover:from-[#ff1a26] hover:to-[#e50914] text-white font-black uppercase text-xs px-5 py-2 rounded shadow-[2px_2px_4px_rgba(0,0,0,0.6)] cursor-pointer flex items-center gap-2 active:translate-y-px"
              style={{ textShadow: "1px 1px 1px black" }}
            >
              <Play className="w-4 h-4 fill-white text-white" />
              Watch Instantly
            </button>
            <button
              id="spotlight-queue-btn"
              onClick={() => onAddToQueue(spotlightMovie.id)}
              className="bg-gradient-to-b from-slate-100 to-slate-300 hover:from-white hover:to-slate-200 text-slate-800 font-bold text-xs px-4 py-2 rounded border border-slate-500 cursor-pointer flex items-center gap-1.5 active:translate-y-px"
            >
              {isInQueue(spotlightMovie.id) ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3px]" />
                  <span>In Queue</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Queue</span>
                </>
              )}
            </button>
            <Link
              to={`/movie/${spotlightMovie.id}`}
              className="text-xs text-slate-400 hover:text-white hover:underline ml-1"
            >
              More Details & Reviews
            </Link>
          </div>
        </div>

        {/* Spotlight Video/Trailer preview placeholder */}
        <div className="w-full lg:w-72 bg-slate-950 border border-slate-800 flex flex-col justify-between rounded overflow-hidden">
          <div className="relative flex-1 aspect-video lg:aspect-auto flex items-center justify-center p-4 text-center">
            {/* Visual simulation of DVD cover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10"></div>
            <img
              src={spotlightMovie.poster}
              alt={spotlightMovie.title}
              className="absolute inset-0 w-full h-full object-cover opacity-25 filter grayscale"
            />
            <div className="relative z-20 flex flex-col items-center">
              <Video className="w-8 h-8 text-slate-500 mb-2 animate-pulse" />
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                [ Trailer Preview Box ]
              </span>
              <button
                id="preview-play-btn"
                onClick={() => onPlayMovie(spotlightMovie.id)}
                className="mt-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase cursor-pointer"
              >
                Launch Preview Stream
              </button>
            </div>
          </div>
          <div className="bg-slate-900 border-t border-slate-800 p-2 text-center text-[10px] text-slate-400 font-mono">
            Requires Windows Media Player 10
          </div>
        </div>
      </div>

      {/* RECOMMENDED FOR YOU GRID */}
      <div className="bg-white border border-slate-300 rounded p-4 shadow-sm select-none">
        <div className="flex justify-between items-center border-b border-red-800 pb-1.5 mb-3">
          <h3 className="text-xs font-bold text-red-800 uppercase tracking-wide">
            Recommended For You
          </h3>
          <Link to="/recommendations" className="text-[10px] text-blue-600 hover:underline">
            View All &gt;&gt;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {recommendedMovies.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col justify-between border border-slate-300 p-2 rounded bg-slate-50 hover:border-slate-400 transition-colors text-center"
            >
              <Link to={`/movie/${movie.id}`} className="block group">
                <div className="aspect-[3/4] bg-slate-200 border border-slate-300 overflow-hidden relative rounded-sm shadow-sm">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-1 right-1 bg-black/60 text-yellow-500 px-1 py-0.5 rounded text-[9px] font-bold">
                    ★{movie.avgRating}
                  </div>
                </div>
                <h4 className="text-[11px] font-bold text-slate-800 mt-1.5 line-clamp-2 h-8 leading-tight group-hover:text-red-700">
                  {movie.title}
                </h4>
                <div className="text-[9px] text-slate-500 mt-0.5 font-mono">
                  {movie.year} • {movie.rating}
                </div>
              </Link>

              <div className="mt-2.5 pt-2.5 border-t border-slate-200 flex flex-col gap-1.5">
                <button
                  id={`home-play-${movie.id}`}
                  onClick={() => onPlayMovie(movie.id)}
                  className="bg-gradient-to-b from-slate-100 to-slate-200 hover:from-white hover:to-slate-100 border border-slate-400 text-slate-700 font-bold text-[10px] py-1 rounded cursor-pointer shadow-sm active:translate-y-px"
                >
                  Play
                </button>
                <button
                  id={`home-queue-${movie.id}`}
                  onClick={() => onAddToQueue(movie.id)}
                  className="text-[9px] text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  {isInQueue(movie.id) ? "In Queue" : "+ Queue"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECENTLY ADDED TO INSTANT */}
      <div className="bg-white border border-slate-300 rounded p-4 shadow-sm select-none">
        <div className="flex justify-between items-center border-b border-red-800 pb-1.5 mb-3">
          <h3 className="text-xs font-bold text-red-800 uppercase tracking-wide">
            Recently Added to Instant (Beta)
          </h3>
          <Link to="/new-releases" className="text-[10px] text-blue-600 hover:underline">
            View All &gt;&gt;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentlyAdded.map((movie) => (
            <div
              key={movie.id}
              className="flex border border-slate-300 rounded p-2 bg-slate-50 hover:bg-slate-100/50 transition-colors items-center gap-3"
            >
              <Link to={`/movie/${movie.id}`} className="w-14 aspect-[3/4] bg-slate-200 border border-slate-300 rounded-sm overflow-hidden flex-shrink-0 shadow-sm">
                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/movie/${movie.id}`} className="font-bold text-xs text-slate-950 hover:text-red-700 hover:underline block truncate">
                  {movie.title}
                </Link>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {movie.year} • {movie.runtime} min • {movie.rating}
                </div>
                <p className="text-[10px] text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                  {movie.synopsis}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="bg-gradient-to-b from-slate-100 to-slate-200 hover:from-white hover:to-slate-100 border border-slate-400 text-slate-700 font-bold text-[9px] px-2 py-0.5 rounded shadow-sm cursor-pointer"
                  >
                    Details
                  </Link>
                  <button
                    id={`home-recently-watch-${movie.id}`}
                    onClick={() => onPlayMovie(movie.id)}
                    className="bg-gradient-to-b from-[#e50914] to-[#b80710] hover:from-[#ff1a26] hover:to-[#e50914] text-white font-bold text-[9px] px-2.5 py-0.5 rounded shadow-sm cursor-pointer"
                  >
                    Watch
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTINUOUS PLAYBACK RESUME */}
      {watchHistory.length > 0 && (
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-300 rounded p-4 shadow-sm select-none">
          <h3 className="text-xs font-bold text-slate-700 border-b border-slate-200 pb-1.5 mb-2.5 uppercase tracking-wide flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-slate-500" />
            Resume DVD Streaming Playback
          </h3>
          <div className="flex flex-col gap-2">
            {watchHistory.slice(0, 2).map((hist, idx) => {
              const movie = movies.find((m) => m.id === hist.movieId);
              if (!movie) return null;
              const hasResume = localStorage.getItem(`resume_time_${movie.id}`);
              const formatSecs = (secStr: string | null) => {
                if (!secStr) return "00:00";
                const s = parseFloat(secStr);
                const mins = Math.floor(s / 60);
                const secs = Math.floor(s % 60);
                return `${mins}:${secs.toString().padStart(2, "0")}`;
              };
              return (
                <div key={idx} className="flex justify-between items-center bg-white border border-slate-200 p-2.5 rounded text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <strong className="text-slate-800">{movie.title}</strong>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-500 text-[11px]">
                      Last streamed on {new Date(hist.watchedAt).toLocaleDateString()}
                    </span>
                    {hasResume && (
                      <span className="bg-sky-100 border border-sky-200 text-sky-800 text-[9px] font-bold px-1.5 rounded">
                        Resume at {formatSecs(hasResume)}
                      </span>
                    )}
                  </div>
                  <button
                    id={`home-resume-btn-${movie.id}`}
                    onClick={() => onPlayMovie(movie.id)}
                    className="bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 border border-blue-900 text-white font-bold text-[10px] px-3 py-1 rounded shadow-sm cursor-pointer"
                  >
                    Resume Play
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
