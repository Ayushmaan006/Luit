import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Cafe } from '../types/cafe.ts';
import { GUWAHATI_CENTER, NEIGHBORHOOD_COORDINATES } from '../data/cafesData.ts';
import { MapPin, Navigation, Star, Wifi, Trees, ArrowRight, ExternalLink, Layers } from 'lucide-react';

interface GuwahatiCafeMapProps {
  cafes: Cafe[];
  selectedCafe: Cafe | null;
  onSelectCafe: (cafe: Cafe) => void;
  activeNeighborhood?: string;
  onSelectNeighborhood?: (nh: string) => void;
}

export const GuwahatiCafeMap: React.FC<GuwahatiCafeMapProps> = ({
  cafes,
  selectedCafe,
  onSelectCafe,
  activeNeighborhood = 'All Neighborhoods',
  onSelectNeighborhood,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);
  const [selectedMapCafe, setSelectedMapCafe] = useState<Cafe | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return; // already initialized

    const map = L.map(mapContainerRef.current, {
      center: [GUWAHATI_CENTER.lat, GUWAHATI_CENTER.lng],
      zoom: 13,
      minZoom: 11,
      maxZoom: 18,
      zoomControl: false,
    });

    // Clean modern OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add zoom controls at top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Sync Markers with Filtered Cafes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear previous markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    const bounds: L.LatLngExpression[] = [];

    cafes.forEach((cafe) => {
      const coords = cafe.coordinates || NEIGHBORHOOD_COORDINATES[cafe.neighborhood] || GUWAHATI_CENTER;
      const latLng: [number, number] = [coords.lat, coords.lng];
      bounds.push(latLng);

      const isSelected = selectedCafe?.id === cafe.id || activeMarkerId === cafe.id;

      // Custom Amber / Stone Pin
      const markerHtml = `
        <div class="custom-cafe-marker relative cursor-pointer group">
          <div class="w-9 h-9 rounded-full ${
            isSelected
              ? 'bg-amber-400 text-stone-950 ring-4 ring-amber-400/50 scale-115'
              : 'bg-stone-900 text-amber-400 ring-2 ring-white/90 shadow-lg'
          } flex items-center justify-center font-bold text-xs transition-all shadow-md">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.5 3H6c-1.1 0-2 .9-2 2v5.71c0 3.83 2.95 7.18 6.78 7.29 3.96.12 7.22-3.06 7.22-7V8h.5c1.93 0 3.5-1.57 3.5-3.5S20.43 3 18.5 3zM16 5v3H6V5h10zm2.5 3H18V5h.5c.83 0 1.5.67 1.5 1.5S19.33 8 18.5 8zM4 19h16v2H4z"/>
            </svg>
          </div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${
            isSelected ? 'bg-amber-400' : 'bg-stone-900'
          }"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: '',
        html: markerHtml,
        iconSize: [36, 42],
        iconAnchor: [18, 42],
        popupAnchor: [0, -42],
      });

      const marker = L.marker(latLng, { icon: customIcon }).addTo(map);

      // Popup Content Card
      const popupHtml = `
        <div class="w-64 text-stone-900 font-['Plus_Jakarta_Sans',sans-serif]">
          <div class="relative h-28 w-full bg-stone-900 overflow-hidden">
            <img 
              src="${cafe.coverImage}" 
              alt="${cafe.name}" 
              class="w-full h-full object-cover"
              onerror="this.style.display='none'"
            />
            <div class="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-stone-900/80 text-amber-300 text-[10px] font-bold font-mono">
              ★ ${cafe.rating.toFixed(1)}
            </div>
            <div class="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-stone-900/80 text-white text-[10px] font-mono">
              ${cafe.priceRange} · ₹${cafe.costForTwo} for 2
            </div>
          </div>
          <div class="p-3">
            <p class="text-[10px] font-bold uppercase tracking-wider text-amber-800">${cafe.neighborhood}</p>
            <h4 class="font-serif font-bold text-sm text-stone-900 leading-snug mt-0.5">${cafe.name}</h4>
            <p class="text-[11px] text-stone-600 line-clamp-1 mt-0.5">${cafe.tagline}</p>
            ${cafe.vibes && cafe.vibes.length > 0 ? `<p class="text-[10px] text-amber-900 font-medium mt-1 truncate">✨ ${cafe.vibes.join(' · ')}</p>` : ''}
            
            <div class="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
              <span class="text-stone-500">${cafe.hasWifi ? '⚡ Wi-Fi' : ''} ${cafe.hasOutdoorSeating ? '🌿 Outdoor Deck' : ''}</span>
              <button 
                id="popup-btn-${cafe.id}" 
                class="font-bold text-amber-800 hover:text-amber-950 flex items-center gap-0.5"
              >
                View Menu &rarr;
              </button>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        closeButton: true,
        maxWidth: 280,
      });

      marker.on('click', () => {
        setActiveMarkerId(cafe.id);
        setSelectedMapCafe(cafe);
      });

      marker.on('popupopen', () => {
        // Wire up popup button click
        setTimeout(() => {
          const btn = document.getElementById(`popup-btn-${cafe.id}`);
          if (btn) {
            btn.onclick = () => onSelectCafe(cafe);
          }
        }, 50);
      });

      markersRef.current[cafe.id] = marker;
    });

    // Auto-fit bounds if markers exist and no specific neighborhood chosen
    if (bounds.length > 0 && activeNeighborhood === 'All Neighborhoods') {
      try {
        map.fitBounds(bounds as L.LatLngBoundsExpression, {
          padding: [50, 50],
          maxZoom: 15,
        });
      } catch (e) {
        console.warn('Could not fit bounds', e);
      }
    }
  }, [cafes, activeMarkerId, selectedCafe, activeNeighborhood, onSelectCafe]);

  // Handle active neighborhood flyTo
  const handleFlyToNeighborhood = (nhName: string) => {
    if (onSelectNeighborhood) onSelectNeighborhood(nhName);
    const map = mapRef.current;
    if (!map) return;

    if (nhName === 'All Neighborhoods') {
      map.flyTo([GUWAHATI_CENTER.lat, GUWAHATI_CENTER.lng], 13, { duration: 1.2 });
      return;
    }

    const coords = NEIGHBORHOOD_COORDINATES[nhName];
    if (coords) {
      map.flyTo([coords.lat, coords.lng], 15, { duration: 1.2 });
    }
  };

  // Focus a cafe on map
  const handleFocusCafe = (cafe: Cafe) => {
    setSelectedMapCafe(cafe);
    setActiveMarkerId(cafe.id);
    const map = mapRef.current;
    if (!map) return;

    const coords = cafe.coordinates || NEIGHBORHOOD_COORDINATES[cafe.neighborhood] || GUWAHATI_CENTER;
    map.flyTo([coords.lat, coords.lng], 16, { duration: 0.8 });

    const marker = markersRef.current[cafe.id];
    if (marker) {
      marker.openPopup();
    }
  };

  return (
    <div className="bg-stone-100 rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs relative flex flex-col h-[680px]">
      
      {/* Top Map Toolbar: Zone Switcher & Quick Navigation */}
      <div className="bg-stone-900/95 backdrop-blur-md text-stone-100 p-3 sm:px-5 flex flex-wrap items-center justify-between gap-3 z-10 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-sm font-bold text-white leading-none">
              Guwahati Cafe Geographical Map
            </h3>
            <p className="text-[11px] text-stone-400 mt-0.5">
              Pinned locations across Brahmaputra Riverfront, Uzan Bazar, GS Road & Outskirts
            </p>
          </div>
        </div>

        {/* Quick Neighborhood Pan Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          {[
            { label: 'All Guwahati', value: 'All Neighborhoods' },
            { label: 'Brahmaputra / Panbazar', value: 'Panbazar & Riverfront' },
            { label: 'Uzan Bazar & Latasil', value: 'Uzan Bazar & Latasil' },
            { label: 'GS Road', value: 'GS Road & Christian Basti' },
            { label: 'Zoo Road', value: 'Zoo Road & Bhangagarh' },
            { label: 'Six Mile', value: 'Six Mile & Khanapara' },
            { label: 'Beltola', value: 'Beltola & Jayanagar' },
          ].map((nh) => (
            <button
              key={nh.value}
              onClick={() => handleFlyToNeighborhood(nh.value)}
              className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
                activeNeighborhood === nh.value
                  ? 'bg-amber-400 text-stone-950 font-semibold'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white'
              }`}
            >
              {nh.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map View & Side Cafe Strip */}
      <div className="relative flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Leaflet Map Canvas */}
        <div ref={mapContainerRef} className="flex-1 w-full h-full z-0 min-h-[350px]" />

        {/* Side Pinned Cafes Drawer on Desktop / Bottom Bar on Mobile */}
        <div className="w-full md:w-80 bg-white/95 backdrop-blur-md border-t md:border-t-0 md:border-l border-stone-200 z-10 flex flex-col max-h-56 md:max-h-full">
          <div className="p-3 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-amber-700" />
              <span>Pinned Cafes ({cafes.length})</span>
            </span>
            <span className="text-[11px] text-stone-500">Click to focus pin</span>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {cafes.map((cafe) => {
              const isSelected = selectedMapCafe?.id === cafe.id;
              return (
                <div
                  key={cafe.id}
                  onClick={() => handleFocusCafe(cafe)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex gap-3 items-center ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-300 shadow-xs'
                      : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <img
                    src={cafe.coverImage}
                    alt={cafe.name}
                    className="w-12 h-12 rounded-lg object-cover shrink-0 bg-stone-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {cafe.name}
                      </h4>
                      <span className="text-[10px] font-mono font-semibold text-stone-800 shrink-0">
                        ★ {cafe.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-900 truncate">
                      {cafe.neighborhood}
                    </p>
                    <div className="flex items-center justify-between gap-1 mt-1 text-[10px] text-stone-500">
                      <span>{cafe.priceRange} · ₹{cafe.costForTwo} for 2</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCafe(cafe);
                        }}
                        className="text-amber-800 hover:text-amber-950 font-semibold inline-flex items-center gap-0.5"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom helper tip */}
          <div className="p-2.5 bg-stone-50 border-t border-stone-200 text-[11px] text-stone-500 text-center">
            Tap any pin on the map to inspect menu and directions
          </div>
        </div>

      </div>

    </div>
  );
};
