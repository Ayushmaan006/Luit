import React from 'react';
import { Star, Wifi, Trees, Heart, MapPin, ArrowRight, Utensils, Camera, Sparkles } from 'lucide-react';
import { Cafe } from '../types/cafe.ts';

interface CafeCardProps {
  cafe: Cafe;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectCafe: (cafe: Cafe) => void;
}

export const CafeCard: React.FC<CafeCardProps> = ({
  cafe,
  isFavorite,
  onToggleFavorite,
  onSelectCafe,
}) => {
  return (
    <article className="group bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full">
      
      {/* Cover Image Slot with Fallback Container */}
      <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
        {cafe.coverImage ? (
          <img
            src={cafe.coverImage}
            alt={cafe.name}
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Graceful styled fallback container
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.classList.add('bg-gradient-to-br', 'from-amber-100', 'to-stone-200');
              }
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
            <Utensils className="w-8 h-8 mb-2 stroke-1" />
            <span className="text-xs font-medium">{cafe.name}</span>
          </div>
        )}

        {/* Favorite Button (Functional Affordance) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(cafe.id);
          }}
          aria-label={isFavorite ? `Remove ${cafe.name} from favorites` : `Add ${cafe.name} to favorites`}
          className="absolute top-3 right-3 p-2 rounded-full bg-stone-900/60 hover:bg-stone-900/80 backdrop-blur-md text-white transition-colors focus:outline-none"
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'
            }`}
          />
        </button>

        {/* Quiet Price Tier Overlay */}
        <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-stone-900/75 backdrop-blur-md text-white text-xs font-mono font-medium">
          {cafe.priceRange} · ₹{cafe.costForTwo} for 2
        </div>

        {/* Photo count indicator */}
        {cafe.galleryImages.length > 0 && (
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-stone-900/75 backdrop-blur-md text-stone-200 text-xs flex items-center gap-1 font-mono">
            <Camera className="w-3 h-3" />
            <span>{cafe.galleryImages.length}</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Kicker (Zero-Pill Discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mb-1.5 flex-wrap">
            <span className="text-amber-800 font-semibold">{cafe.neighborhood}</span>
            <span aria-hidden="true">·</span>
            <span>{cafe.cuisineTypes.slice(0, 2).join(', ')}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug group-hover:text-amber-700 transition-colors">
            {cafe.name}
          </h3>

          {/* Tagline */}
          <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {cafe.tagline}
          </p>

          {/* Vibe Tags (Zero-Pill: clean unboxed typographic indicator) */}
          {cafe.vibes && cafe.vibes.length > 0 && (
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-amber-900/80 font-medium overflow-hidden">
              <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
              <span className="truncate">{cafe.vibes.join(' · ')}</span>
            </div>
          )}

          {/* Signature Specialties Unboxed Line */}
          {cafe.specialties && cafe.specialties.length > 0 && (
            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center gap-1 text-xs text-stone-600 truncate">
              <span className="text-stone-400 shrink-0 font-medium">Signature:</span>
              <span className="truncate font-medium text-stone-800">
                {cafe.specialties.slice(0, 2).join(' · ')}
              </span>
            </div>
          )}

          {/* Amenities & Feature Indicators (Clean unboxed icons with text) */}
          <div className="mt-3 flex items-center gap-3 text-xs text-stone-600 flex-wrap">
            {cafe.hasWifi && (
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <Wifi className="w-3.5 h-3.5" />
                <span>Wi-Fi</span>
              </span>
            )}
            {cafe.hasOutdoorSeating && (
              <span className="flex items-center gap-1 text-amber-800 font-medium">
                <Trees className="w-3.5 h-3.5" />
                <span>Outdoor Deck</span>
              </span>
            )}
            <span className="flex items-center gap-1 ml-auto font-semibold text-stone-900">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span className="tabular-nums">{cafe.rating.toFixed(1)}</span>
              <span className="text-stone-400 font-normal">({cafe.reviewsCount})</span>
            </span>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2">
          <button
            onClick={() => onSelectCafe(cafe)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg bg-stone-900 text-white hover:bg-stone-800 active:bg-stone-950 transition-colors whitespace-nowrap"
          >
            <span>Menu & Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              cafe.mapsQuery || `${cafe.name} ${cafe.address}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Get directions to ${cafe.name}`}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 border border-stone-200 transition-colors shrink-0"
            title="Directions on Google Maps"
          >
            <MapPin className="w-4 h-4" />
          </a>
        </div>

      </div>

    </article>
  );
};
