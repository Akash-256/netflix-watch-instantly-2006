import React, { useState, FormEvent } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Play, Plus, Check, Star, ArrowLeft, Send, MessageCircle } from "lucide-react";
import { Movie, QueueItem, Review } from "../types";

interface MovieDetailsProps {
  movies: Movie[];
  queue: QueueItem[];
  onAddToQueue: (movieId: string) => void;
  onPlayMovie: (movieId: string) => void;
  userRatings: Record<string, number>;
  onRateMovie: (movieId: string, rating: number) => void;
  onAddReview: (movieId: string, review: Omit<Review, "id" | "date">) => void;
}

export default function MovieDetails({
  movies,
  queue,
  onAddToQueue,
  onPlayMovie,
  userRatings,
  onRateMovie,
  onAddReview,
}: MovieDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === id);

  // Review state
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  if (!movie) {
    return (
      <div className="bg-white border border-slate-300 rounded p-8 text-center font-sans">
        <h3 className="text-sm font-bold text-red-800 uppercase mb-2">Title Not Found</h3>
        <p className="text-xs text-slate-500 mb-4">The movie ID could not be identified on our stream servers.</p>
        <Link to="/" className="text-xs text-blue-600 hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  const isInQueue = (movieId: string) => {
    return queue.some((item) => item.movieId === movieId);
  };

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewText.trim()) return;

    onAddReview(movie.id, {
      author: reviewAuthor.trim(),
      rating: reviewRating,
      text: reviewText.trim(),
    });

    setReviewAuthor("");
    setReviewText("");
    alert("Thank you! Your customer review has been posted.");
  };

  // Find similar movies (intersecting genres, excluding current movie)
  const similarMovies = movies
    .filter((m) => m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g)))
    .slice(0, 4);

  const activeRating = userRatings[movie.id] || 0;

  return (
    <div className="flex flex-col gap-6 font-sans select-none">
      
      {/* Back button link */}
      <div>
        <button
          id="back-to-browse-btn"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 hover:underline font-bold bg-white border border-slate-300 px-3 py-1 rounded shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Previous Screen</span>
        </button>
      </div>

      {/* Main Showcase Panel */}
      <div className="bg-white border-2 border-slate-300 rounded p-4 shadow-sm flex flex-col md:flex-row gap-6">
        
        {/* Left Side: Poster and Stream Stats */}
        <div className="w-full md:w-56 flex-shrink-0 flex flex-col gap-3">
          <div className="aspect-[3/4] bg-slate-200 border border-slate-300 rounded-sm overflow-hidden relative shadow">
            <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
            <span className="absolute bottom-2 left-2 bg-black/75 border border-slate-700 text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase font-mono">
              Rated: {movie.rating}
            </span>
          </div>

          {/* Local User Rating Interactivity */}
          <div className="border border-slate-300 bg-slate-50 p-2.5 rounded text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
              Rate This Title
            </span>
            <div className="flex justify-center items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  id={`rate-${movie.id}-star-${star}`}
                  key={star}
                  onClick={() => onRateMovie(movie.id, star)}
                  className="p-0.5 cursor-pointer hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= activeRating
                        ? "fill-amber-400 text-amber-500"
                        : "text-slate-300 hover:text-slate-400"
                    }`}
                  />
                </button>
              ))}
            </div>
            {activeRating > 0 && (
              <span className="text-[9px] text-emerald-700 font-bold block mt-1">
                Your Rating: {activeRating} Stars! Saved.
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Synopsis, Details, Cast, and Action Buttons */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-200 pb-2 mb-3">
              <h1 className="text-2xl font-black italic text-slate-900 uppercase">
                {movie.title}
              </h1>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="bg-slate-200 px-1.5 py-0.5 rounded font-bold text-slate-700">
                  {movie.rating} Classification
                </span>
                <span>{movie.year} Release</span>
                <span>{movie.runtime} Minutes</span>
                <span className="text-amber-600 font-bold">★ Avg: {movie.avgRating} / 5</span>
              </div>
            </div>

            {/* Synopsis */}
            <div className="mb-4">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase mb-1">Synopsis:</h3>
              <p className="text-xs text-slate-800 leading-relaxed bg-slate-50 border border-slate-150 p-3 rounded">
                {movie.synopsis}
              </p>
            </div>

            {/* Movie Stats List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs border-b border-slate-200 pb-4 mb-4">
              <div>
                <span className="text-slate-500 font-bold block">DIRECTOR:</span>
                <span className="text-slate-900 font-medium">{movie.director}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">GENRES:</span>
                <span className="text-slate-900 font-medium">{movie.genres.join(", ")}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 font-bold block">STARRING CAST:</span>
                <span className="text-slate-950">{movie.cast.join(", ")}</span>
              </div>
            </div>
          </div>

          {/* Watch & Add to Queue panel */}
          <div className="flex flex-wrap gap-3 bg-slate-100 p-3 rounded border border-slate-300">
            <button
              id="details-watch-btn"
              onClick={() => onPlayMovie(movie.id)}
              className="bg-gradient-to-b from-[#e50914] to-[#b80710] hover:from-[#ff1a26] hover:to-[#e50914] text-white font-black text-xs uppercase px-6 py-2.5 rounded shadow cursor-pointer flex items-center gap-1.5 active:translate-y-px"
            >
              <Play className="w-4 h-4 fill-white" />
              Watch Instantly (Beta)
            </button>

            <button
              id="details-queue-btn"
              onClick={() => onAddToQueue(movie.id)}
              className="bg-gradient-to-b from-slate-100 to-slate-250 hover:from-white hover:to-slate-200 text-slate-800 border border-slate-400 font-bold text-xs px-4 py-2.5 rounded shadow cursor-pointer flex items-center gap-1.5 active:translate-y-px"
            >
              {isInQueue(movie.id) ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3px]" />
                  <span>In Your Queue</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-slate-600" />
                  <span>Add to Queue</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* REVIEWS & COMMUNITY OPINIONS */}
      <div className="bg-white border border-slate-300 rounded p-4 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4 uppercase flex items-center gap-1.5">
          <MessageCircle className="w-4 h-4 text-red-700" />
          Netflix Community Reviews ({movie.reviews.length} customer ratings)
        </h3>

        {/* Existing Reviews list */}
        <div className="flex flex-col gap-3 mb-6">
          {movie.reviews.map((rev) => (
            <div key={rev.id} className="border border-slate-200 p-3 rounded bg-slate-50 text-xs">
              <div className="flex justify-between items-center mb-1 pb-1 border-b border-slate-200/50">
                <span className="font-bold text-slate-800">{rev.author}</span>
                <span className="text-slate-400 font-mono text-[10px]">{rev.date}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-500 font-bold mb-1.5 text-[11px]">
                <span>Rating:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3 h-3 ${s <= rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed font-sans">{rev.text}</p>
            </div>
          ))}
        </div>

        {/* Compose a Review Form */}
        <form onSubmit={handleReviewSubmit} className="bg-slate-50 border border-slate-300 rounded p-4 text-xs flex flex-col gap-3">
          <h4 className="font-bold text-slate-800 uppercase text-[11px]">Write A Review:</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Your Name/Nickname:</label>
              <input
                id="review-author-input"
                type="text"
                placeholder="e.g. CinemaLover88"
                value={reviewAuthor}
                onChange={(e) => setReviewAuthor(e.target.value)}
                required
                className="bg-white border border-slate-400 p-2 rounded outline-none text-xs text-slate-800 focus:border-red-700"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Star Rating:</label>
              <select
                id="review-rating-select"
                value={reviewRating}
                onChange={(e) => setReviewRating(parseInt(e.target.value))}
                className="bg-white border border-slate-400 p-2 rounded outline-none text-xs text-slate-800 cursor-pointer font-sans"
              >
                <option value={5}>5 Stars - Phenomenal</option>
                <option value={4}>4 Stars - Great DVD</option>
                <option value={3}>3 Stars - Average/Rentable</option>
                <option value={2}>2 Stars - Subpar</option>
                <option value={1}>1 Star - Terribly Boring</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Review text (Be detailed):</label>
            <textarea
              id="review-text-textarea"
              placeholder="Post your thoughts about the plot, audio, video quality, compression encoding..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={3}
              required
              className="bg-white border border-slate-400 p-2 rounded outline-none text-xs text-slate-800 focus:border-red-700 resize-none font-sans"
            />
          </div>

          <button
            id="review-submit-btn"
            type="submit"
            className="self-start bg-gradient-to-b from-slate-200 to-slate-400 hover:from-white hover:to-slate-300 border border-slate-500 text-slate-800 font-bold px-4 py-1.5 rounded flex items-center gap-1.5 shadow cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post Customer Review</span>
          </button>
        </form>
      </div>

      {/* SIMILAR DVD RELEASES */}
      {similarMovies.length > 0 && (
        <div className="bg-white border border-slate-300 rounded p-4 shadow-sm">
          <h3 className="text-xs font-bold text-red-800 uppercase tracking-wide border-b border-red-800 pb-1.5 mb-3">
            Similar DVD Recommendations For You
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {similarMovies.map((sm) => (
              <Link
                key={sm.id}
                to={`/movie/${sm.id}`}
                className="flex flex-col items-center p-2 border border-slate-200 rounded hover:border-slate-400 hover:bg-slate-50 transition-all text-center group"
              >
                <div className="w-16 aspect-[3/4] bg-slate-200 border border-slate-300 rounded overflow-hidden shadow-sm">
                  <img src={sm.poster} alt={sm.title} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-[11px] font-bold text-slate-800 mt-1.5 line-clamp-1 group-hover:text-red-700">
                  {sm.title}
                </h4>
                <div className="text-[9px] text-slate-500 mt-0.5">{sm.year}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
