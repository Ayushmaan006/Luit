import React from 'react';
import { Search, MapPin, Wifi, Sunset, Sparkles } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onQuickFilter: (filterKey: string) => void;
  totalCafesCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onQuickFilter,
  totalCafesCount,
}) => {
  return (
    <section className="relative bg-stone-900 text-stone-100 overflow-hidden border-b border-stone-800">
      {/* Background Image with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_guwahati_river_cafe_1792856938034.jpg"
          alt="Brahmaputra river sunset cafe in Guwahati"
          className="w-full h-full object-cover object-center brightness-60 contrast-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl">
          {/* Subtle location kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-3">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Guwahati, Assam · Gateway to Northeast India</span>
            <span aria-hidden="true" className="text-stone-500">·</span>
            <span>{totalCafesCount} Curated Sanctuaries</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] text-balance">
            Where Brahmaputra breezes meet artisan roasts & estate teas.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl text-balance font-normal">
            The definitive repository of Guwahati’s vibrant cafe culture. Discover riverbank decks in Panbazar, quiet bookish bistros in Uzan Bazar, and high-speed co-working coffee hubs along GS Road.
          </p>

          {/* Quick Search Bar */}
          <div className="mt-8 max-w-2xl bg-stone-900/90 backdrop-blur-md p-2 rounded-xl border border-stone-700/80 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-amber-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search cafes by name, neighborhood, pasta, cold brew, or dish..."
                className="w-full bg-transparent pl-3 pr-4 py-2.5 text-sm text-stone-100 placeholder-stone-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="mr-2 text-xs text-stone-400 hover:text-white px-2 py-1 rounded bg-stone-800"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick Curated Discovery Tags */}
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-stone-300">
            <span className="text-stone-400 font-medium">Popular right now:</span>
            <button
              onClick={() => onQuickFilter('outdoor')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-stone-700/60 transition-colors"
            >
              <Sunset className="w-3.5 h-3.5 text-amber-400" />
              Brahmaputra Sunset Decks
            </button>
            <button
              onClick={() => onQuickFilter('wifi')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-stone-700/60 transition-colors"
            >
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              Work & Study (100+ Mbps)
            </button>
            <button
              onClick={() => onQuickFilter('orthodox')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-stone-700/60 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Assam Orthodox & Sourdough
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
