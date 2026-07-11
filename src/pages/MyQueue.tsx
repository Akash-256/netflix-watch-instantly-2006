import { Disc, HelpCircle, RefreshCw } from "lucide-react";
import QueueManager from "../components/QueueManager";
import { Movie, QueueItem, UserAccount } from "../types";

interface MyQueueProps {
  queue: QueueItem[];
  movies: Movie[];
  account: UserAccount;
  onRemove: (itemId: string) => void;
  onMoveUp: (itemId: string) => void;
  onMoveDown: (itemId: string) => void;
  onToggleWatched: (itemId: string) => void;
  onPlayMovie: (movieId: string) => void;
}

export default function MyQueue({
  queue,
  movies,
  account,
  onRemove,
  onMoveUp,
  onMoveDown,
  onToggleWatched,
  onPlayMovie,
}: MyQueueProps) {
  // Calculated stats
  const activeCount = queue.filter((q) => !q.watched).length;
  const watchedCount = queue.filter((q) => q.watched).length;

  return (
    <div className="flex flex-col gap-6 font-sans select-none">
      
      {/* Subscription Plan Context Card */}
      <div className="bg-white border border-slate-350 p-4 rounded shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] text-red-800 font-bold tracking-wider uppercase block">
            Subscriber Account Plan
          </span>
          <h2 className="text-sm font-bold text-slate-800 uppercase mt-0.5">
            Unlimited Streaming + 3 DVDs At-A-Time ($14.99/mo)
          </h2>
          <p className="text-[11px] text-slate-500 mt-1 max-w-xl">
            Watch Instantly (Beta) is included at no extra charge. Streaming minutes used this period: <strong>{watchedCount * 115} min / Unlimited</strong>. Your bandwidth speeds allow for smooth stream playback without DVD queue degradation.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded text-xs">
          <div className="flex flex-col text-right">
            <span className="text-[9px] text-slate-400 font-bold uppercase">Streaming Minutes</span>
            <span className="font-extrabold text-emerald-700 uppercase tracking-tight text-xs">UNLIMITED</span>
          </div>
          <div className="w-px h-5 bg-slate-300"></div>
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 font-bold uppercase">Active Items</span>
            <span className="font-bold text-slate-700">{activeCount} Titles</span>
          </div>
        </div>
      </div>

      {/* Main Queue Management Component */}
      <QueueManager
        queue={queue}
        movies={movies}
        onRemove={onRemove}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        onToggleWatched={onToggleWatched}
        onPlayMovie={onPlayMovie}
      />

      {/* Quick Queue Tips */}
      <div className="bg-slate-100 border border-slate-300 p-3 rounded text-xs text-slate-600 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-start gap-2">
          <Disc className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
          <div>
            <strong className="text-slate-700 block mb-0.5">How Queueing Works</strong>
            Items in your Watch Instantly Queue can be played at any time. Moving them up or down doesn't affect DVD shipments.
          </div>
        </div>

        <div className="flex items-start gap-2">
          <RefreshCw className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
          <div>
            <strong className="text-slate-700 block mb-0.5">Continuous Buffer Cache</strong>
            You can mark streams as "Watched" once completed to clear them from your active queue list or keep them for future viewing.
          </div>
        </div>

        <div className="flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
          <div>
            <strong className="text-slate-700 block mb-0.5">Technical Help</strong>
            Experiencing DRM errors? Click the DRM License Helper inside the Help Center to clear system cookie caches.
          </div>
        </div>
      </div>

    </div>
  );
}
