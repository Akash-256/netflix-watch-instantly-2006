import { Link } from "react-router-dom";
import { Sparkles, Calendar, Play } from "lucide-react";
import { Movie, QueueItem } from "../types";

interface NewReleasesProps {
  movies: Movie[];
  queue: QueueItem[];
  onAddToQueue: (movieId: string) => void;
  onPlayMovie: (movieId: string) => void;
}

export default function NewReleases({ movies, queue, onAddToQueue, onPlayMovie }: NewReleasesProps) {
  // Sort movies by year descending (newest release first), then average rating
  const sortedMovies = [...movies].sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year;
    }
    return b.avgRating - a.avgRating;
  });

  const isInQueue = (movieId: string) => {
    return queue.some((item) => item.movieId === movieId);
  };

  return (
    <div className="bg-white border border-slate-300 rounded p-4 shadow-sm font-sans select-none">
      <div className="border-b-2 border-red-800 pb-2 mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-bold text-red-800 uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            New Additions to Watch Instantly Catalogue
          </h2>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Featuring fresh 2005-2006 home cinema content encoded with VC-1 media streams.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
          <Calendar className="w-4 h-4 text-red-700" />
          <span>July 2006 Releases</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3.5">
        {sortedMovies.map((movie) => (
          <div
            key={movie.id}
            className="flex flex-col justify-between border border-slate-300 p-2 rounded bg-slate-50 hover:border-slate-400 transition-colors text-center group"
          >
            <Link to={`/movie/${movie.id}`} className="block">
              <div className="aspect-[3/4] bg-slate-200 border border-slate-300 overflow-hidden relative rounded-sm shadow-sm">
                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                <div className="absolute top-1 right-1 bg-red-700 text-white font-bold text-[8px] px-1.5 py-0.5 rounded border border-red-900 tracking-wide uppercase">
                  {movie.year} DVD
                </div>
              </div>
              <h4 className="text-[11px] font-bold text-slate-800 mt-2 line-clamp-1 group-hover:text-red-700">
                {movie.title}
              </h4>
              <p className="text-[9px] text-slate-500 mt-0.5">
                Rating: {movie.rating} • {movie.runtime} min
              </p>
            </Link>

            <div className="mt-2.5 pt-2 border-t border-slate-200 flex flex-col gap-1.5">
              <button
                id={`new-play-${movie.id}`}
                onClick={() => onPlayMovie(movie.id)}
                className="bg-gradient-to-b from-[#e50914] to-[#b80710] text-white font-bold text-[10px] py-1 rounded cursor-pointer shadow-sm flex items-center justify-center gap-1"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Play Now</span>
              </button>
              <button
                id={`new-queue-${movie.id}`}
                onClick={() => onAddToQueue(movie.id)}
                className="text-[9px] text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                {isInQueue(movie.id) ? "In Your Queue" : "Add to Queue"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
