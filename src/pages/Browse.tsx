import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Film, Star, ArrowUpDown } from "lucide-react";
import { Movie, QueueItem } from "../types";

interface BrowseProps {
  movies: Movie[];
  queue: QueueItem[];
  onAddToQueue: (movieId: string) => void;
  onPlayMovie: (movieId: string) => void;
}

export default function Browse({ movies, queue, onAddToQueue, onPlayMovie }: BrowseProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlGenre = searchParams.get("genre");

  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedRating, setSelectedRating] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"title" | "year" | "rating">("title");

  // Sync state with URL parameter if available
  useEffect(() => {
    if (urlGenre) {
      setSelectedGenre(urlGenre);
    } else {
      setSelectedGenre("All");
    }
  }, [urlGenre]);

  const genres = ["All", "Action", "Adventure", "Animation", "Comedy", "Crime", "Drama", "Family", "Fantasy", "Mystery", "Romance", "Sci-Fi", "Thriller"];
  const years = ["All", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999"];
  const ratings = ["All", "G", "PG", "PG-13", "R"];

  const isInQueue = (movieId: string) => {
    return queue.some((item) => item.movieId === movieId);
  };

  // Filter movies
  const filteredMovies = movies.filter((movie) => {
    const matchGenre = selectedGenre === "All" || movie.genres.includes(selectedGenre);
    const matchYear = selectedYear === "All" || movie.year.toString() === selectedYear;
    const matchRating = selectedRating === "All" || movie.rating === selectedRating;
    const matchSearch =
      searchQuery.trim() === "" ||
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.cast.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      movie.director.toLowerCase().includes(searchQuery.toLowerCase());

    return matchGenre && matchYear && matchRating && matchSearch;
  });

  // Sort movies
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "year") {
      return b.year - a.year; // newest first
    } else if (sortBy === "rating") {
      return b.avgRating - a.avgRating; // highest rated first
    }
    return 0;
  });

  return (
    <div className="bg-white border border-slate-300 rounded p-4 shadow-sm font-sans select-none">
      <div className="border-b-2 border-red-800 pb-2 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div>
          <h2 className="text-sm font-bold text-red-800 uppercase flex items-center gap-1.5">
            <Film className="w-4 h-4" />
            Watch Instantly - Complete Title Directory
          </h2>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Currently displaying {sortedMovies.length} movies based on your filter options.
          </p>
        </div>

        {/* Search & Sort controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <input
              id="browse-filter-search"
              type="text"
              placeholder="Filter by title, cast..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-slate-400 px-2 py-1 text-xs rounded w-44"
            />
            <Search className="absolute right-2 top-2 w-3 h-3 text-slate-400" />
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-600">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort:</span>
            <select
              id="browse-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 px-1 py-0.5 text-xs rounded font-bold cursor-pointer"
            >
              <option value="title">Alphabetical (A-Z)</option>
              <option value="year">Release Year</option>
              <option value="rating">Viewer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Options Panel */}
      <div className="bg-slate-100 border border-slate-300 p-3 rounded mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-600 uppercase">Genre:</label>
          <select
            id="filter-genre-select"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-white border border-slate-400 p-1 text-xs rounded cursor-pointer font-sans"
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-600 uppercase">Release Year:</label>
          <select
            id="filter-year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-white border border-slate-400 p-1 text-xs rounded cursor-pointer font-sans"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y === "All" ? "All Years" : `${y}`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-600 uppercase">Rating Classification:</label>
          <select
            id="filter-rating-select"
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="bg-white border border-slate-400 p-1 text-xs rounded cursor-pointer font-sans"
          >
            {ratings.map((r) => (
              <option key={r} value={r}>
                {r === "All" ? "All Ratings (G to R)" : `Rated ${r}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Movies Grid */}
      {sortedMovies.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed border-slate-300 rounded bg-slate-50 text-slate-500 text-xs">
          No matching digital titles found. Try adjusting your filters or resetting the search field.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {sortedMovies.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col justify-between border border-slate-300 p-2 rounded bg-slate-50 hover:border-slate-400 transition-all text-center group"
            >
              <Link to={`/movie/${movie.id}`} className="block">
                <div className="aspect-[3/4] bg-slate-200 border border-slate-300 overflow-hidden relative rounded-sm shadow-sm">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-1.5 right-1.5 bg-black/70 text-yellow-500 font-bold text-[9px] px-1 py-0.5 rounded flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-yellow-500 text-yellow-500" />
                    <span>{movie.avgRating}</span>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-900 mt-2 line-clamp-2 h-8 leading-snug group-hover:text-red-700 group-hover:underline">
                  {movie.title}
                </h4>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {movie.year} • {movie.rating} • {movie.runtime}m
                </div>
              </Link>

              <div className="mt-2.5 pt-2 border-t border-slate-200 flex flex-col gap-1.5">
                <button
                  id={`browse-play-${movie.id}`}
                  onClick={() => onPlayMovie(movie.id)}
                  className="bg-gradient-to-b from-[#e50914] to-[#b80710] hover:from-[#ff1a26] hover:to-[#e50914] text-white font-bold text-[10px] py-1 rounded cursor-pointer shadow-sm active:translate-y-px uppercase"
                  style={{ textShadow: "0.5px 0.5px 0.5px black" }}
                >
                  Watch Instant
                </button>
                <button
                  id={`browse-queue-${movie.id}`}
                  onClick={() => onAddToQueue(movie.id)}
                  className="bg-gradient-to-b from-slate-100 to-slate-250 border border-slate-400 text-slate-700 font-bold text-[10px] py-1 rounded cursor-pointer shadow-sm"
                >
                  {isInQueue(movie.id) ? "✓ In Queue" : "+ Add to Queue"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
