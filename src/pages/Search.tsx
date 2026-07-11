import { useSearchParams, Link } from "react-router-dom";
import { Search as SearchIcon, Film, Play, Star } from "lucide-react";
import { Movie, QueueItem } from "../types";

interface SearchProps {
  movies: Movie[];
  queue: QueueItem[];
  onAddToQueue: (movieId: string) => void;
  onPlayMovie: (movieId: string) => void;
}

export default function Search({ movies, queue, onAddToQueue, onPlayMovie }: SearchProps) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  // Perform filtering
  const results = movies.filter((movie) => {
    if (!query) return false;
    const lowerQuery = query.toLowerCase();
    return (
      movie.title.toLowerCase().includes(lowerQuery) ||
      movie.cast.some((c) => c.toLowerCase().includes(lowerQuery)) ||
      movie.director.toLowerCase().includes(lowerQuery) ||
      movie.genres.some((g) => g.toLowerCase().includes(lowerQuery)) ||
      movie.synopsis.toLowerCase().includes(lowerQuery)
    );
  });

  const isInQueue = (movieId: string) => {
    return queue.some((item) => item.movieId === movieId);
  };

  return (
    <div className="bg-white border border-slate-300 rounded p-4 shadow-sm font-sans select-none">
      <div className="border-b-2 border-red-800 pb-2 mb-4">
        <h2 className="text-sm font-bold text-red-800 uppercase flex items-center gap-1.5">
          <SearchIcon className="w-4 h-4 text-slate-500" />
          Netflix Search Query results
        </h2>
        <p className="text-[10px] text-slate-500 mt-0.5">
          Displaying instant titles matching query string: <strong className="text-slate-800 italic">"{query}"</strong>
        </p>
      </div>

      {results.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed border-slate-300 bg-slate-50 rounded">
          <Film className="w-8 h-8 text-slate-400 mx-auto mb-2 animate-bounce" />
          <h4 className="text-xs font-bold text-slate-700 uppercase">No DVD Results Found</h4>
          <p className="text-[11px] text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
            We couldn't locate any matching streaming streams in our server catalog. 
            Check your spelling or search for older classics like <Link to="/movie/1" className="text-blue-600 underline">The Departed</Link> or <Link to="/movie/4" className="text-blue-600 underline">Cars</Link>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {results.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col justify-between border border-slate-300 p-2 rounded bg-slate-50 hover:border-slate-400 transition-colors text-center group"
            >
              <Link to={`/movie/${movie.id}`} className="block">
                <div className="aspect-[3/4] bg-slate-200 border border-slate-300 overflow-hidden relative rounded-sm shadow-sm">
                  <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                  <div className="absolute top-1 right-1 bg-black/60 text-yellow-500 px-1 py-0.5 rounded text-[9px] font-bold">
                    ★ {movie.avgRating}
                  </div>
                </div>
                <h4 className="text-[11px] font-bold text-slate-800 mt-2 line-clamp-1 group-hover:text-red-700">
                  {movie.title}
                </h4>
                <div className="text-[9px] text-slate-500 mt-0.5">
                  {movie.year} • {movie.rating}
                </div>
              </Link>

              <div className="mt-2.5 pt-2 border-t border-slate-200 flex flex-col gap-1.5">
                <button
                  id={`search-play-${movie.id}`}
                  onClick={() => onPlayMovie(movie.id)}
                  className="bg-gradient-to-b from-[#e50914] to-[#b80710] text-white font-bold text-[10px] py-1 rounded cursor-pointer shadow-sm flex items-center justify-center gap-1"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Stream Instant</span>
                </button>
                <button
                  id={`search-queue-${movie.id}`}
                  onClick={() => onAddToQueue(movie.id)}
                  className="text-[9px] text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  {isInQueue(movie.id) ? "In Queue" : "+ Queue"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
