import React from 'react';
import { Coffee, Heart, PlusCircle, Compass, BookOpen, MapPin } from 'lucide-react';

interface NavbarProps {
  activeSection: 'all' | 'map' | 'trails' | 'guide' | 'favorites';
  onSelectSection: (section: 'all' | 'map' | 'trails' | 'guide' | 'favorites') => void;
  favoritesCount: number;
  onOpenSubmitModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onSelectSection,
  favoritesCount,
  onOpenSubmitModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-stone-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onSelectSection('all')}
          className="flex items-center gap-2.5 text-left text-stone-100 hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
            <Coffee className="w-4 h-4" />
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-white">
            Luit Brew
          </span>
        </button>

        {/* Zone 2: 5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
          <button
            onClick={() => onSelectSection('all')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeSection === 'all'
                ? 'text-amber-400 font-semibold border-b-2 border-amber-400'
                : 'hover:text-white hover:border-b-2 hover:border-stone-500'
            }`}
          >
            Guwahati Cafes
          </button>

          <button
            onClick={() => onSelectSection('map')}
            className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeSection === 'map'
                ? 'text-amber-400 font-semibold border-b-2 border-amber-400'
                : 'hover:text-white hover:border-b-2 hover:border-stone-500'
            }`}
          >
            <MapPin className="w-4 h-4 opacity-80 text-amber-400" />
            <span>Map View</span>
          </button>

          <button
            onClick={() => onSelectSection('trails')}
            className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeSection === 'trails'
                ? 'text-amber-400 font-semibold border-b-2 border-amber-400'
                : 'hover:text-white hover:border-b-2 hover:border-stone-500'
            }`}
          >
            <Compass className="w-4 h-4 opacity-75" />
            <span>Trails</span>
          </button>

          <button
            onClick={() => onSelectSection('guide')}
            className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeSection === 'guide'
                ? 'text-amber-400 font-semibold border-b-2 border-amber-400'
                : 'hover:text-white hover:border-b-2 hover:border-stone-500'
            }`}
          >
            <BookOpen className="w-4 h-4 opacity-75" />
            <span>Brew Guide</span>
          </button>

          <button
            onClick={() => onSelectSection('favorites')}
            className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeSection === 'favorites'
                ? 'text-amber-400 font-semibold border-b-2 border-amber-400'
                : 'hover:text-white hover:border-b-2 hover:border-stone-500'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-400" />
            <span>Saved</span>
            {favoritesCount > 0 && (
              <span className="text-xs bg-rose-500/20 text-rose-300 font-mono px-1.5 py-0.5 rounded-full ml-0.5">
                {favoritesCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSubmitModal}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 rounded-lg hover:bg-amber-300 active:scale-98 transition-all shadow-sm whitespace-nowrap shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit a Cafe</span>
          </button>
        </div>

      </div>

      {/* Mobile sub-bar */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-800/80 px-2 py-2 text-xs text-stone-300 overflow-x-auto">
        <button
          onClick={() => onSelectSection('all')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeSection === 'all' ? 'text-amber-400 bg-stone-800' : ''
          }`}
        >
          All Cafes
        </button>
        <button
          onClick={() => onSelectSection('map')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1 ${
            activeSection === 'map' ? 'text-amber-400 bg-stone-800' : ''
          }`}
        >
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Map</span>
        </button>
        <button
          onClick={() => onSelectSection('trails')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeSection === 'trails' ? 'text-amber-400 bg-stone-800' : ''
          }`}
        >
          Trails
        </button>
        <button
          onClick={() => onSelectSection('guide')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeSection === 'guide' ? 'text-amber-400 bg-stone-800' : ''
          }`}
        >
          Brew Guide
        </button>
        <button
          onClick={() => onSelectSection('favorites')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap flex items-center gap-1 ${
            activeSection === 'favorites' ? 'text-amber-400 bg-stone-800' : ''
          }`}
        >
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span>Saved ({favoritesCount})</span>
        </button>
      </div>
    </header>
  );
};
