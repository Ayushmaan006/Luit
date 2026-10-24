import React, { useState, useEffect, useMemo } from 'react';
import { Cafe, CafeFilterState, CafeVibe, GalleryPhoto, MenuImageCard, Review } from './types/cafe.ts';
import {
  getFavorites,
  getStoredCafes,
  saveCustomCafe,
  saveMenuImage,
  savePhoto,
  saveReview,
  toggleFavoriteInStorage,
} from './utils/storage.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { FilterBar } from './components/FilterBar.tsx';
import { CafeCard } from './components/CafeCard.tsx';
import { CafeDetailModal } from './components/CafeDetailModal.tsx';
import { SubmitCafeModal } from './components/SubmitCafeModal.tsx';
import { CuratedTrails } from './components/CuratedTrails.tsx';
import { BrewGuide } from './components/BrewGuide.tsx';
import { GuwahatiCafeMap } from './components/GuwahatiCafeMap.tsx';
import { Coffee, Heart, MapPin, Sparkles, AlertCircle, Compass } from 'lucide-react';

export default function App() {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<'all' | 'map' | 'trails' | 'guide' | 'favorites'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Filter state
  const [filters, setFilters] = useState<CafeFilterState>({
    searchQuery: '',
    neighborhood: 'All Neighborhoods',
    cuisine: 'All Cuisines',
    vibe: 'All Vibes',
    hasWifi: null,
    hasOutdoorSeating: null,
    priceRange: 'ALL',
    sortBy: 'recommended',
  });

  // Load initial data on mount and check URL parameter for deep linking
  useEffect(() => {
    const loadedCafes = getStoredCafes();
    setCafes(loadedCafes);
    setFavorites(getFavorites());

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const cafeParam = urlParams.get('cafe');
      if (cafeParam) {
        const found = loadedCafes.find((c) => c.id === cafeParam);
        if (found) {
          setSelectedCafe(found);
        }
      }
    } catch (err) {
      console.warn('Failed to parse URL query', err);
    }
  }, []);

  // Update selected cafe and sync with browser URL
  const handleSelectCafe = (cafe: Cafe | null) => {
    setSelectedCafe(cafe);
    try {
      const url = new URL(window.location.href);
      if (cafe) {
        url.searchParams.set('cafe', cafe.id);
      } else {
        url.searchParams.delete('cafe');
      }
      window.history.replaceState({}, '', url.toString());
    } catch (err) {
      console.warn('URL sync error', err);
    }
  };

  // Update favorites
  const handleToggleFavorite = (id: string) => {
    const updated = toggleFavoriteInStorage(id);
    setFavorites(updated);
  };

  // Submit new review for a cafe
  const handleAddReview = (cafeId: string, review: Review) => {
    const updatedCafes = saveReview(cafeId, review);
    setCafes(updatedCafes);
    const updatedTarget = updatedCafes.find((c) => c.id === cafeId);
    if (updatedTarget) setSelectedCafe(updatedTarget);
  };

  // Upload photo for a cafe
  const handleAddPhoto = (cafeId: string, photo: GalleryPhoto) => {
    const updatedCafes = savePhoto(cafeId, photo);
    setCafes(updatedCafes);
    const updatedTarget = updatedCafes.find((c) => c.id === cafeId);
    if (updatedTarget) setSelectedCafe(updatedTarget);
  };

  // Upload menu image for a cafe
  const handleAddMenuImage = (cafeId: string, menuImage: MenuImageCard) => {
    const updatedCafes = saveMenuImage(cafeId, menuImage);
    setCafes(updatedCafes);
    const updatedTarget = updatedCafes.find((c) => c.id === cafeId);
    if (updatedTarget) setSelectedCafe(updatedTarget);
  };

  // Add custom cafe
  const handleSubmitNewCafe = (newCafe: Cafe) => {
    const updatedCafes = saveCustomCafe(newCafe);
    setCafes(updatedCafes);
    handleSelectCafe(newCafe);
    setActiveSection('all');
  };

  // Quick filter shortcuts from hero
  const handleQuickFilter = (key: string) => {
    setActiveSection('all');
    if (key === 'outdoor') {
      setFilters((prev) => ({ ...prev, hasOutdoorSeating: true, searchQuery: '' }));
    } else if (key === 'wifi') {
      setFilters((prev) => ({ ...prev, hasWifi: true, searchQuery: '' }));
    } else if (key === 'orthodox') {
      setFilters((prev) => ({ ...prev, cuisine: 'Specialty Coffee & Tea', searchQuery: '' }));
    }
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      neighborhood: 'All Neighborhoods',
      cuisine: 'All Cuisines',
      vibe: 'All Vibes',
      hasWifi: null,
      hasOutdoorSeating: null,
      priceRange: 'ALL',
      sortBy: 'recommended',
    });
  };

  // Filtered & Sorted cafes
  const filteredCafes = useMemo(() => {
    return cafes
      .filter((cafe) => {
        // Section: favorites
        if (activeSection === 'favorites' && !favorites.includes(cafe.id)) {
          return false;
        }

        // Neighborhood filter
        if (
          filters.neighborhood !== 'All Neighborhoods' &&
          cafe.neighborhood !== filters.neighborhood
        ) {
          return false;
        }

        // Cuisine filter
        if (
          filters.cuisine !== 'All Cuisines' &&
          !cafe.cuisineTypes.some(
            (c) => c.toLowerCase() === filters.cuisine.toLowerCase()
          )
        ) {
          return false;
        }

        // Vibe filter
        if (
          filters.vibe !== 'All Vibes' &&
          !cafe.vibes?.includes(filters.vibe as CafeVibe)
        ) {
          return false;
        }

        // Wi-Fi filter
        if (filters.hasWifi === true && !cafe.hasWifi) {
          return false;
        }

        // Outdoor seating filter
        if (filters.hasOutdoorSeating === true && !cafe.hasOutdoorSeating) {
          return false;
        }

        // Price range filter
        if (filters.priceRange !== 'ALL' && cafe.priceRange !== filters.priceRange) {
          return false;
        }

        // Search query filter (matches name, address, cuisine, specialties, dish items)
        if (filters.searchQuery.trim() !== '') {
          const q = filters.searchQuery.toLowerCase().trim();
          const matchesName = cafe.name.toLowerCase().includes(q);
          const matchesTagline = cafe.tagline.toLowerCase().includes(q);
          const matchesAddress = cafe.address.toLowerCase().includes(q);
          const matchesNeighborhood = cafe.neighborhood.toLowerCase().includes(q);
          const matchesSpecialties = cafe.specialties?.some((s) =>
            s.toLowerCase().includes(q)
          );
          const matchesMenu = cafe.menuCategories.some((cat) =>
            cat.items.some(
              (item) =>
                item.name.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q)
            )
          );

          if (
            !matchesName &&
            !matchesTagline &&
            !matchesAddress &&
            !matchesNeighborhood &&
            !matchesSpecialties &&
            !matchesMenu
          ) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (filters.sortBy === 'reviews') {
          return b.reviewsCount - a.reviewsCount;
        }
        if (filters.sortBy === 'priceAsc') {
          return a.costForTwo - b.costForTwo;
        }
        if (filters.sortBy === 'priceDesc') {
          return b.costForTwo - a.costForTwo;
        }
        // Recommended
        return 0;
      });
  }, [cafes, filters, activeSection, favorites]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Bar Navigation */}
      <Navbar
        activeSection={viewMode === 'map' && activeSection === 'all' ? 'map' : activeSection}
        onSelectSection={(section) => {
          if (section === 'map') {
            setActiveSection('all');
            setViewMode('map');
          } else {
            setActiveSection(section);
            if (section === 'all') {
              setViewMode('grid');
            }
          }
        }}
        favoritesCount={favorites.length}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        
        {/* Render Active View */}
        {activeSection === 'trails' && (
          <CuratedTrails
            cafes={cafes}
            onSelectCafe={(cafe) => handleSelectCafe(cafe)}
          />
        )}

        {activeSection === 'guide' && <BrewGuide />}

        {(activeSection === 'all' || activeSection === 'favorites') && (
          <>
            {/* Hero Section shown on main directory view when in grid mode */}
            {activeSection === 'all' && viewMode === 'grid' && (
              <Hero
                searchQuery={filters.searchQuery}
                onSearchChange={(q) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
                onQuickFilter={handleQuickFilter}
                totalCafesCount={cafes.length}
              />
            )}

            {/* Saved Spots Header */}
            {activeSection === 'favorites' && (
              <div className="bg-stone-900 text-stone-100 py-12 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">
                      <Heart className="w-4 h-4 fill-rose-400" />
                      <span>Personal Guwahati Collection</span>
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-white">
                      Your Saved Cafes ({filteredCafes.length})
                    </h1>
                    <p className="mt-1 text-xs sm:text-sm text-stone-300">
                      Bookmarked spots for your next coffee run, weekend study session, or sunset dinner.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveSection('all')}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-800 text-stone-200 hover:bg-stone-700 transition-colors"
                  >
                    Back to All Cafes
                  </button>
                </div>
              </div>
            )}

            {/* Search & Filter Toolbar */}
            <FilterBar
              filters={filters}
              onFilterChange={(newF) => setFilters((prev) => ({ ...prev, ...newF }))}
              onResetFilters={handleResetFilters}
              totalResults={filteredCafes.length}
              viewMode={viewMode}
              onToggleViewMode={setViewMode}
            />

            {/* Main Cafe View: Geographical Map vs Cards Grid */}
            {viewMode === 'map' ? (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-in fade-in duration-200">
                <GuwahatiCafeMap
                  cafes={filteredCafes}
                  selectedCafe={selectedCafe}
                  onSelectCafe={(c) => handleSelectCafe(c)}
                  activeNeighborhood={filters.neighborhood}
                  onSelectNeighborhood={(nh) =>
                    setFilters((prev) => ({ ...prev, neighborhood: nh }))
                  }
                />
              </section>
            ) : (
              /* Cafes Cards Grid */
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {filteredCafes.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {filteredCafes.map((cafe) => (
                      <CafeCard
                        key={cafe.id}
                        cafe={cafe}
                        isFavorite={favorites.includes(cafe.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onSelectCafe={(c) => handleSelectCafe(c)}
                      />
                    ))}
                  </div>
                ) : (
                  /* Empty State */
                  <div className="text-center py-20 px-4 max-w-md mx-auto">
                    <div className="w-12 h-12 rounded-full bg-stone-200 text-stone-500 mx-auto flex items-center justify-center mb-3">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                      No cafes found matching your filters
                    </h3>
                    <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                      Try clearing some of your search parameters or check out cafes in other neighborhoods across Guwahati.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-4 py-2 text-xs font-semibold bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* Bottom Callout Banner for Community Cafe Submissions */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="bg-stone-900 rounded-2xl p-6 sm:p-8 text-stone-100 flex flex-col sm:flex-row items-center justify-between gap-6 border border-stone-800">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Did we miss your favorite Guwahati hangout?
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    Submit a Guwahati Cafe or Tea Lounge
                  </h3>
                  <p className="text-xs text-stone-400 max-w-xl">
                    Whether it's a hidden corner in Jalukbari, a new roastery in Beltola, or a quiet tea room in Panbazar, help fellow coffee lovers find it.
                  </p>
                </div>

                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="px-5 py-2.5 text-xs font-semibold bg-amber-400 text-stone-950 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap shadow-sm shrink-0"
                >
                  + Add Cafe to Repository
                </button>
              </div>
            </section>
          </>
        )}

      </main>

      {/* Cafe Detail Modal (Menu, Photos, Reviews, Wi-Fi details) */}
      {selectedCafe && (
        <CafeDetailModal
          cafe={selectedCafe}
          allCafes={cafes}
          onClose={() => handleSelectCafe(null)}
          onAddReview={handleAddReview}
          onAddPhoto={handleAddPhoto}
          onAddMenuImage={handleAddMenuImage}
          isFavorite={favorites.includes(selectedCafe.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Community Submit Cafe Modal */}
      <SubmitCafeModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmit={handleSubmitNewCafe}
      />

      {/* Footer (Quiet & Editorial, Anti-Slop Discipline) */}
      <footer className="border-t border-stone-200 bg-white py-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-900 text-sm">Luit Brew</span>
            <span aria-hidden="true">·</span>
            <span>The Guwahati Cafe Repository</span>
            <span aria-hidden="true">·</span>
            <span>Assam, India</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setActiveSection('all');
                setViewMode('grid');
              }}
              className="hover:text-stone-900 transition-colors"
            >
              All Cafes
            </button>
            <button
              onClick={() => {
                setActiveSection('all');
                setViewMode('map');
              }}
              className="hover:text-stone-900 transition-colors"
            >
              Cafe Map
            </button>
            <button
              onClick={() => setActiveSection('trails')}
              className="hover:text-stone-900 transition-colors"
            >
              Curated Trails
            </button>
            <button
              onClick={() => setActiveSection('guide')}
              className="hover:text-stone-900 transition-colors"
            >
              Assam Brew Guide
            </button>
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="text-amber-800 font-semibold hover:text-amber-950 transition-colors"
            >
              Submit Cafe
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
