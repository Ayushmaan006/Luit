import React from 'react';
import { Search, Wifi, Trees, RotateCcw, SlidersHorizontal, ArrowUpDown, LayoutGrid, MapPin, Sparkles } from 'lucide-react';
import { CUISINE_OPTIONS, GUWAHATI_NEIGHBORHOODS, VIBE_OPTIONS } from '../data/cafesData.ts';
import { CafeFilterState, PriceTier } from '../types/cafe.ts';

interface FilterBarProps {
  filters: CafeFilterState;
  onFilterChange: (newFilters: Partial<CafeFilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
  viewMode: 'grid' | 'map';
  onToggleViewMode: (mode: 'grid' | 'map') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  viewMode,
  onToggleViewMode,
}) => {
  const isFiltered =
    filters.searchQuery !== '' ||
    filters.neighborhood !== 'All Neighborhoods' ||
    filters.cuisine !== 'All Cuisines' ||
    filters.vibe !== 'All Vibes' ||
    filters.hasWifi !== null ||
    filters.hasOutdoorSeating !== null ||
    filters.priceRange !== 'ALL';

  return (
    <div className="bg-white border-b border-stone-200 shadow-xs sticky top-16 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 space-y-3">
        
        {/* Row 1: Search, Neighborhood tabs, and Sorting */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Search by cafe name or dish..."
              className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-9 pr-3 py-1.5 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white transition-all"
            />
          </div>

          {/* Quick Segmented Controls: Neighborhoods */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {GUWAHATI_NEIGHBORHOODS.slice(0, 5).map((nh) => {
              const isSelected = filters.neighborhood === nh;
              return (
                <button
                  key={nh}
                  onClick={() => onFilterChange({ neighborhood: nh })}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-amber-100 text-amber-900 font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {nh === 'All Neighborhoods' ? 'All Areas' : nh.split('&')[0].trim()}
                </button>
              );
            })}
          </div>

          {/* Controls: View Mode Toggle & Sort By */}
          <div className="flex items-center gap-3 shrink-0 self-end lg:self-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center p-0.5 bg-stone-100 rounded-lg border border-stone-200">
              <button
                type="button"
                onClick={() => onToggleViewMode('grid')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-500 hover:text-stone-900 font-medium'
                }`}
                title="Grid Card View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
              <button
                type="button"
                onClick={() => onToggleViewMode('map')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md transition-all ${
                  viewMode === 'map'
                    ? 'bg-amber-400 text-stone-950 shadow-xs font-semibold'
                    : 'text-stone-500 hover:text-stone-900 font-medium'
                }`}
                title="Geographical Map View"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Map</span>
              </button>
            </div>

            {/* Sort By Dropdown */}
            <div className="flex items-center gap-1.5">
              <label className="text-xs text-stone-500 flex items-center gap-1 font-medium whitespace-nowrap">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>Sort:</span>
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  onFilterChange({
                    sortBy: e.target.value as CafeFilterState['sortBy'],
                  })
                }
                aria-label="Sort cafes by"
                className="text-xs bg-stone-50 border border-stone-200 rounded-md px-2.5 py-1 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="recommended">Curator's Choice</option>
                <option value="rating">Top Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 2: Secondary Interactive Filters (Cuisine, Wi-Fi, Outdoor, Price Tier) */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-stone-100">
          
          {/* Cuisine Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-stone-500 font-medium whitespace-nowrap">Cuisine:</span>
            <select
              value={filters.cuisine}
              onChange={(e) => onFilterChange({ cuisine: e.target.value })}
              aria-label="Filter by cuisine"
              className="text-xs bg-stone-50 border border-stone-200 rounded-md px-2 py-1 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              {CUISINE_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Vibe Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-stone-500 font-medium flex items-center gap-1 whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Vibe:</span>
            </span>
            <select
              value={filters.vibe}
              onChange={(e) => onFilterChange({ vibe: e.target.value })}
              aria-label="Filter by vibe"
              className="text-xs bg-stone-50 border border-stone-200 rounded-md px-2 py-1 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              {VIBE_OPTIONS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div className="h-4 w-px bg-stone-200 mx-1 hidden sm:block" />

          {/* Wi-Fi Filter Button */}
          <button
            onClick={() =>
              onFilterChange({
                hasWifi: filters.hasWifi === true ? null : true,
              })
            }
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
              filters.hasWifi === true
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            <span>Wi-Fi Available</span>
          </button>

          {/* Outdoor Seating Filter Button */}
          <button
            onClick={() =>
              onFilterChange({
                hasOutdoorSeating:
                  filters.hasOutdoorSeating === true ? null : true,
              })
            }
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
              filters.hasOutdoorSeating === true
                ? 'bg-amber-50 text-amber-800 border-amber-300 font-semibold'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Trees className="w-3.5 h-3.5" />
            <span>Outdoor Seating</span>
          </button>

          <div className="h-4 w-px bg-stone-200 mx-1 hidden sm:block" />

          {/* Price Range Segmented Group */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-stone-500 font-medium mr-1 whitespace-nowrap">Price:</span>
            {(['ALL', '₹', '₹₹', '₹₹₹'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => onFilterChange({ priceRange: tier })}
                className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
                  filters.priceRange === tier
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tier === 'ALL' ? 'Any' : tier}
              </button>
            ))}
          </div>

          {/* Reset Filters & Results Count */}
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-stone-500 font-medium tabular-nums whitespace-nowrap">
              {totalResults} {totalResults === 1 ? 'cafe' : 'cafes'}
            </span>

            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="inline-flex items-center gap-1 text-xs text-amber-700 hover:text-amber-900 font-medium px-2 py-0.5 rounded hover:bg-amber-50 transition-colors whitespace-nowrap"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
