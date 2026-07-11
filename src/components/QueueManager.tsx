import { ArrowUp, ArrowDown, Trash2, PlayCircle, CheckCircle, Disc } from "lucide-react";
import { Movie, QueueItem } from "../types";

interface QueueManagerProps {
  queue: QueueItem[];
  movies: Movie[];
  onRemove: (itemId: string) => void;
  onMoveUp: (itemId: string) => void;
  onMoveDown: (itemId: string) => void;
  onToggleWatched: (itemId: string) => void;
  onPlayMovie: (movieId: string) => void;
}

export default function QueueManager({
  queue,
  movies,
  onRemove,
  onMoveUp,
  onMoveDown,
  onToggleWatched,
  onPlayMovie,
}: QueueManagerProps) {
  // Sort queue by order
  const sortedQueue = [...queue].sort((a, b) => a.order - b.order);

  const getMovieInfo = (movieId: string) => {
    return movies.find((m) => m.id === movieId);
  };

  return (
    <div id="queue-manager-container" className="bg-white border-2 border-slate-400 rounded p-4 shadow-sm font-sans">
      <div className="flex justify-between items-center border-b-2 border-slate-300 pb-2 mb-3">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 uppercase">
          <Disc className="w-4 h-4 text-red-700" />
          My Watch Instantly Queue ({queue.length} Titles)
        </h2>
        <span className="text-[10px] text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded uppercase">
          Dynamic Re-ordering Engine
        </span>
      </div>

      {sortedQueue.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-slate-300 rounded bg-slate-50 text-xs text-slate-500">
          Your Watch Instantly Queue is empty. 
          <br />
          Browse movies and click <strong className="text-slate-700">"Add to Queue"</strong> to build your list.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs grid-table">
            <thead>
              <tr className="bg-slate-100 text-slate-700 select-none text-[10px] uppercase">
                <th className="p-2 border border-slate-300 text-center w-12">Rank</th>
                <th className="p-2 border border-slate-300 w-16 text-center">Format</th>
                <th className="p-2 border border-slate-300">Movie Title & Year</th>
                <th className="p-2 border border-slate-300 text-center w-24">Running Time</th>
                <th className="p-2 border border-slate-300 text-center w-28">Streaming Status</th>
                <th className="p-2 border border-slate-300 text-center w-20">Priority</th>
                <th className="p-2 border border-slate-300 text-center w-12">Delete</th>
              </tr>
            </thead>
            <tbody>
              {sortedQueue.map((item, index) => {
                const movie = getMovieInfo(item.movieId);
                if (!movie) return null;

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      item.watched ? "bg-slate-100 text-slate-500" : ""
                    }`}
                  >
                    {/* Rank index */}
                    <td className="p-2 text-center font-bold text-slate-700 font-mono border border-slate-200">
                      {index + 1}
                    </td>

                    {/* Format Tag */}
                    <td className="p-2 text-center border border-slate-200">
                      <span className="px-1.5 py-0.5 bg-red-100 text-red-800 text-[9px] font-bold border border-red-200 rounded uppercase">
                        Instant
                      </span>
                    </td>

                    {/* Movie Title & Synopsis summary */}
                    <td className="p-2 border border-slate-200">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 group-hover:underline">
                          {movie.title} <span className="font-normal text-slate-500">({movie.year})</span>
                        </span>
                        <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 font-sans">
                          {movie.genres.join(" / ")} • Starring {movie.cast.slice(0, 2).join(", ")}
                        </span>
                      </div>
                    </td>

                    {/* Runtime */}
                    <td className="p-2 text-center font-mono border border-slate-200">
                      {movie.runtime} min
                    </td>

                    {/* Stream Play or Mark Complete status */}
                    <td className="p-2 text-center border border-slate-200">
                      <div className="flex flex-col items-center justify-center gap-1">
                        {item.watched ? (
                          <div className="flex items-center gap-1 text-emerald-700 text-[10px] font-bold">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Watched</span>
                          </div>
                        ) : (
                          <button
                            id={`queue-play-${movie.id}`}
                            onClick={() => onPlayMovie(movie.id)}
                            className="bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 border border-blue-900 text-white font-bold text-[10px] px-2 py-1 rounded shadow-[1px_1px_2px_rgba(0,0,0,0.3)] cursor-pointer flex items-center gap-1"
                          >
                            <PlayCircle className="w-3.5 h-3.5" />
                            <span>Watch Now</span>
                          </button>
                        )}
                        <button
                          id={`queue-watched-toggle-${item.id}`}
                          onClick={() => onToggleWatched(item.id)}
                          className="text-[9px] text-slate-500 hover:text-slate-800 underline cursor-pointer"
                        >
                          {item.watched ? "Mark Unwatched" : "Mark Watched"}
                        </button>
                      </div>
                    </td>

                    {/* Priority manipulation arrows */}
                    <td className="p-2 border border-slate-200">
                      <div className="flex justify-center items-center gap-1">
                        <button
                          id={`queue-up-${item.id}`}
                          onClick={() => onMoveUp(item.id)}
                          disabled={index === 0}
                          title="Move Item Up"
                          className="p-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-slate-600 hover:text-slate-900 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          id={`queue-down-${item.id}`}
                          onClick={() => onMoveDown(item.id)}
                          disabled={index === sortedQueue.length - 1}
                          title="Move Item Down"
                          className="p-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-slate-600 hover:text-slate-900 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Delete column */}
                    <td className="p-2 text-center border border-slate-200">
                      <button
                        id={`queue-remove-${item.id}`}
                        onClick={() => onRemove(item.id)}
                        title="Remove Movie"
                        className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
