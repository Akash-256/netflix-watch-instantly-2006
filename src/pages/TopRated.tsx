import { Link } from "react-router-dom";
import { Star, Trophy, Clock, Play } from "lucide-react";
import { Movie, QueueItem } from "../types";

interface TopRatedProps {
  movies: Movie[];
  queue: QueueItem[];
  onAddToQueue: (movieId: string) => void;
  onPlayMovie: (movieId: string) => void;
}

export default function TopRated({ movies, queue, onAddToQueue, onPlayMovie }: TopRatedProps) {
  // Sort movies by rating desc, then vote counts (or just rating)
  const sortedMovies = [...movies].sort((a, b) => b.avgRating - a.avgRating);

  const isInQueue = (movieId: string) => {
    return queue.some((item) => item.movieId === movieId);
  };

  return (
    <div className="bg-white border border-slate-300 rounded p-4 shadow-sm font-sans select-none">
      <div className="border-b-2 border-red-800 pb-2 mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-bold text-red-800 uppercase flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            Top Rated Watch Instantly Titles
          </h2>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Ranked based on member-submitted ratings and reviewer reviews (out of 5 stars).
          </p>
        </div>
        <div className="text-[10px] bg-red-50 text-red-800 px-2.5 py-1 rounded font-bold border border-red-200">
          Updated Daily at Midnight EST
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {sortedMovies.map((movie, index) => {
          const gold = index < 3;
          return (
            <div
              key={movie.id}
              className={`flex border rounded p-3 items-center gap-4 transition-all ${
                gold
                  ? "bg-amber-50/50 border-amber-300 shadow-sm"
                  : "bg-slate-50 border-slate-300"
              }`}
            >
              {/* Leaderboard Badge */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border flex-shrink-0 ${
                  index === 0
                    ? "bg-gradient-to-b from-yellow-300 to-amber-500 text-amber-950 border-yellow-600"
                    : index === 1
                    ? "bg-gradient-to-b from-slate-200 to-slate-400 text-slate-900 border-slate-500"
                    : index === 2
                    ? "bg-gradient-to-b from-amber-600 to-amber-800 text-white border-amber-900"
                    : "bg-slate-200 text-slate-700 border-slate-400"
                }`}
              >
                #{index + 1}
              </div>

              {/* Poster mini */}
              <Link
                to={`/movie/${movie.id}`}
                className="w-12 aspect-[3/4] bg-slate-200 border border-slate-300 rounded-sm overflow-hidden flex-shrink-0 shadow-sm"
              >
                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
              </Link>

              {/* Title & Stats */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="font-bold text-xs text-slate-900 hover:text-red-700 hover:underline"
                  >
                    {movie.title}
                  </Link>
                  <span className="text-[10px] text-slate-400">({movie.year})</span>
                  <span className="px-1 py-0.2 bg-slate-200 text-slate-700 font-bold rounded text-[9px]">
                    {movie.rating}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Genres: {movie.genres.join(", ")} • Starring {movie.cast.slice(0, 3).join(", ")}
                </div>
                <p className="text-[10px] text-slate-600 line-clamp-1 mt-1 leading-relaxed">
                  {movie.synopsis}
                </p>
              </div>

              {/* Average Rating indicator */}
              <div className="flex flex-col items-center justify-center text-center px-4 border-l border-r border-slate-200">
                <div className="flex items-center text-amber-500 font-bold text-sm gap-0.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span className="font-mono text-slate-800">{movie.avgRating}</span>
                </div>
                <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">
                  Avg Rating
                </span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-1.5 w-28 flex-shrink-0">
                <button
                  id={`top-play-${movie.id}`}
                  onClick={() => onPlayMovie(movie.id)}
                  className="bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white font-bold text-[10px] py-1 px-2.5 rounded border border-blue-900 cursor-pointer shadow-sm active:translate-y-px flex items-center justify-center gap-1"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Play Instant</span>
                </button>
                <button
                  id={`top-queue-${movie.id}`}
                  onClick={() => onAddToQueue(movie.id)}
                  className="bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-medium text-[10px] py-1 px-2.5 rounded cursor-pointer"
                >
                  {isInQueue(movie.id) ? "✓ Queue Added" : "+ Add to Queue"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
