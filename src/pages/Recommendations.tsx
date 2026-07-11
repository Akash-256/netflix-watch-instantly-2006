import { Link } from "react-router-dom";
import { Sparkles, Play, ThumbsUp, HelpCircle } from "lucide-react";
import { Movie, QueueItem } from "../types";

interface RecommendationsProps {
  movies: Movie[];
  queue: QueueItem[];
  onAddToQueue: (movieId: string) => void;
  onPlayMovie: (movieId: string) => void;
}

export default function Recommendations({ movies, queue, onAddToQueue, onPlayMovie }: RecommendationsProps) {
  // Recommend movies with average rating > 4
  const recommended = movies.filter((m) => m.avgRating >= 4.2).slice(0, 8);

  const isInQueue = (movieId: string) => {
    return queue.some((item) => item.movieId === movieId);
  };

  return (
    <div className="bg-white border border-slate-300 rounded p-4 shadow-sm font-sans select-none">
      <div className="border-b-2 border-red-800 pb-2 mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-bold text-red-800 uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-red-700" />
            Personalized DVD & Stream Recommendations
          </h2>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Our proprietary CineMatch™ algorithm matches your rental history with similar subscribers.
          </p>
        </div>
        <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
          <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
          CineMatch™ Active
        </div>
      </div>

      <div className="bg-[#fcfaf2] border border-slate-300 p-3 rounded mb-5 text-xs text-slate-600 flex gap-2">
        <HelpCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
        <div>
          <strong>CineMatch™ Tip:</strong> You can help adjust these suggestions by rating titles 1 to 5 Stars on individual movie pages! More ratings result in higher match precision for your DSL bandwidth.
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {recommended.map((movie) => (
          <div
            key={movie.id}
            className="flex border border-slate-300 p-2.5 rounded bg-slate-50 hover:bg-slate-100 transition-all gap-3"
          >
            <Link
              to={`/movie/${movie.id}`}
              className="w-16 aspect-[3/4] bg-slate-200 border border-slate-300 rounded-sm overflow-hidden flex-shrink-0 shadow-sm"
            >
              <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
            </Link>
            <div className="flex-grow flex flex-col justify-between min-w-0">
              <div>
                <Link
                  to={`/movie/${movie.id}`}
                  className="font-bold text-xs text-slate-900 hover:text-red-700 hover:underline block truncate"
                >
                  {movie.title}
                </Link>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {movie.year} • ★ {movie.avgRating}
                </div>
                <div className="text-[9px] text-slate-400 mt-0.5 uppercase font-bold tracking-wider">
                  {movie.rating} rating
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <button
                  id={`rec-play-${movie.id}`}
                  onClick={() => onPlayMovie(movie.id)}
                  className="bg-[#e50914] text-white text-[9px] font-bold py-0.5 rounded text-center cursor-pointer hover:bg-red-800"
                >
                  Play
                </button>
                <button
                  id={`rec-queue-${movie.id}`}
                  onClick={() => onAddToQueue(movie.id)}
                  className="text-[9px] text-slate-500 hover:text-slate-800 hover:underline cursor-pointer"
                >
                  {isInQueue(movie.id) ? "In Queue" : "+ Add Queue"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
