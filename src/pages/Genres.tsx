import { useState } from "react";
import { Link } from "react-router-dom";
import { Film, Star } from "lucide-react";
import { Movie, QueueItem } from "../types";

interface GenresProps {
  movies: Movie[];
  queue: QueueItem[];
  onAddToQueue: (movieId: string) => void;
  onPlayMovie: (movieId: string) => void;
}

export default function Genres({ movies, queue, onAddToQueue, onPlayMovie }: GenresProps) {
  const allGenres = [
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
    "Sport",
    "Thriller",
    "War"
  ];

  const [activeGenre, setActiveGenre] = useState("Action");

  const genreMovies = movies.filter((m) => m.genres.includes(activeGenre));

  const isInQueue = (movieId: string) => {
    return queue.some((item) => item.movieId === movieId);
  };

  return (
    <div className="bg-white border border-slate-300 rounded p-4 shadow-sm font-sans select-none">
      <div className="border-b-2 border-red-800 pb-2 mb-4">
        <h2 className="text-sm font-bold text-red-800 uppercase flex items-center gap-1.5">
          <Film className="w-4 h-4" />
          Browse DVD Titles By Genre
        </h2>
        <p className="text-[10px] text-slate-500 mt-0.5">
          Select a category from the early-2000s registry index to view digital encodes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Left Genre list sidebar */}
        <div className="md:col-span-1 bg-slate-50 border border-slate-300 rounded p-1">
          <div className="bg-gradient-to-b from-slate-200 to-slate-300 px-2 py-1 border-b border-slate-400 text-[10px] font-bold text-slate-700 uppercase tracking-wide">
            Genre Directory
          </div>
          <div className="flex flex-col mt-1">
            {allGenres.map((g) => {
              const active = g === activeGenre;
              return (
                <button
                  id={`genre-btn-${g}`}
                  key={g}
                  onClick={() => setActiveGenre(g)}
                  className={`w-full text-left px-2.5 py-1.5 text-xs font-sans transition-all border-b border-slate-200/50 cursor-pointer ${
                    active
                      ? "bg-red-800 text-white font-bold"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {g} ({movies.filter((m) => m.genres.includes(g)).length})
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Movie Grid */}
        <div className="md:col-span-3">
          <div className="mb-3 flex justify-between items-center bg-slate-100 p-2 border border-slate-300 rounded text-xs">
            <span className="font-bold text-slate-700">
              Active Selection: <span className="text-red-800">{activeGenre}</span>
            </span>
            <span className="text-slate-500 font-mono text-[10px]">
              {genreMovies.length} Titles Found
            </span>
          </div>

          {genreMovies.length === 0 ? (
            <div className="p-12 text-center border border-slate-200 bg-slate-50 text-slate-500 text-xs rounded">
              Currently no active titles loaded for this genre. Check back in next month's catalog.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {genreMovies.map((movie) => (
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
                      {movie.year} • Rated {movie.rating}
                    </div>
                  </Link>

                  <div className="mt-2.5 pt-2 border-t border-slate-200 flex flex-col gap-1">
                    <button
                      id={`genre-play-${movie.id}`}
                      onClick={() => onPlayMovie(movie.id)}
                      className="bg-gradient-to-b from-[#e50914] to-[#b80710] text-white font-bold text-[10px] py-1 rounded cursor-pointer shadow-sm"
                    >
                      Watch Instant
                    </button>
                    <button
                      id={`genre-queue-${movie.id}`}
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
      </div>
    </div>
  );
}
