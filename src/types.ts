export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  rating: string; // PG, R, etc.
  runtime: number; // in minutes
  genres: string[];
  synopsis: string;
  director: string;
  cast: string[];
  poster: string; // Unsplash image URL or stylized placeholder
  videoUrl: string; // Working mp4 stream
  avgRating: number; // 1-5 scale
  reviews: Review[];
}

export interface QueueItem {
  id: string; // unique item id
  movieId: string;
  addedAt: string;
  watched: boolean;
  order: number;
}

export interface UserAccount {
  username: string;
  email: string;
  preferredConnection: "Dial-up" | "DSL" | "Cable";
  preferredQuality: "240p" | "360p" | "480p";
  preferredPlayer: "Windows Media Player 10" | "RealPlayer" | "QuickTime 7";
  rememberLogin: boolean;
  membershipLevel?: "Standard" | "Gold" | "Platinum";
}

export interface UserSettings {
  preferredConnection: string;
  preferredQuality: string;
  subtitlesEnabled: boolean;
  autoplayNext: boolean;
  // Compatibility fields for both legacy WMPPlayer and custom pages
  connectionType?: "Dial-up" | "DSL" | "Cable";
  streamingQuality?: "240p" | "360p" | "480p";
  quality?: "Low (240p)" | "Medium (360p)" | "High (480p)";
  autoplay?: boolean;
  subtitles?: boolean;
  bufferSize?: number;
}

export interface HelpMessage {
  id: string;
  sender: "user" | "gemini";
  text: string;
  timestamp: string;
}
