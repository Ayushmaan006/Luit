import React from 'react';
import { Compass, Clock, MapPin, ArrowRight, Sunset, Laptop, Music } from 'lucide-react';
import { Cafe } from '../types/cafe.ts';

interface CuratedTrailsProps {
  cafes: Cafe[];
  onSelectCafe: (cafe: Cafe) => void;
}

export const CuratedTrails: React.FC<CuratedTrailsProps> = ({ cafes, onSelectCafe }) => {
  const trails = [
    {
      id: 'trail-sunset',
      title: 'Sunset Along the Mighty Luit',
      duration: '4 – 5 Hours (Best around 3:30 PM)',
      theme: 'Scenic River Vistas & Literary Nostalgia',
      icon: Sunset,
      accentColor: 'text-amber-500',
      description:
        'Experience the golden hour when the sun sinks behind the Nilachal hills across the Brahmaputra. Start with afternoon iced tea by Dighalipukhuri, stroll past Latasil to browse books at The Steaming Mug, and finish with a sunset high-tea on the riverfront deck.',
      stops: [
        {
          cafeId: '11th-avenue-dighalipukhuri',
          name: '11th Avenue Cafe Bistro',
          area: 'Dighalipukhuri',
          highlight: 'Order a chilled peach iced tea on the lakefront balcony.',
        },
        {
          cafeId: 'steaming-mug-uzanbazar',
          name: 'The Steaming Mug',
          area: 'Uzan Bazar',
          highlight: 'Browse Assamese literature with a Kazi Nemu cold brew.',
        },
        {
          cafeId: 'heritage-brahmaputra-panbazar',
          name: 'Heritage Brahmaputra Riverfront Cafe',
          area: 'Panbazar Ghat',
          highlight: 'Watch ferries cross the Brahmaputra at dusk with smoked pork baos.',
        },
      ],
    },
    {
      id: 'trail-coworking',
      title: 'Digital Nomad & Deep Focus Corridor',
      duration: 'Full Day (8:30 AM – 6:00 PM)',
      theme: '200+ Mbps Fiber Wi-Fi, Sourdough & Specialty V60s',
      icon: Laptop,
      accentColor: 'text-emerald-500',
      description:
        'Tailored for remote software developers, designers, and writers looking for ergonomic desks, silent study atmosphere, and serious single-origin pourovers.',
      stops: [
        {
          cafeId: 'brown-creams-beltola',
          name: 'Brown Creams Artisan Bakehouse',
          area: 'Beltola',
          highlight: '8:00 AM warm double-butter croissant and espresso to start the day.',
        },
        {
          cafeId: 'bean-journal-zooroad',
          name: 'Bean Journal Cafe & Roastery',
          area: 'Zoo Road',
          highlight: '200 Mbps fiber internet, individual power sockets, and Meghalaya honey-processed V60.',
        },
      ],
    },
    {
      id: 'trail-nightlife',
      title: 'Rooftops, Blues & Twilight Beats',
      duration: 'Evening (6:30 PM – Midnight)',
      theme: 'Live Northeast Rock, Skyline Hill Views & Woodfired Pizza',
      icon: Music,
      accentColor: 'text-indigo-400',
      description:
        'Guwahati has a legendary acoustic and rock music soul. Spend the twilight hours absorbing views of the Assam hills from an open-air rooftop, followed by live guitar sets and juicy burgers.',
      stops: [
        {
          cafeId: 'terra-mayaa-gsroad',
          name: 'Terra Mayaa Cafe & Sky Lounge',
          area: 'GS Road, Christian Basti',
          highlight: 'Woodfired Burrata Margherita and cascara spritz as city lights turn on.',
        },
        {
          cafeId: 'cafe-hendrix-gsroad',
          name: 'Cafe Hendrix',
          area: 'Dispur / Down Town',
          highlight: 'Legendary live blues guitars, vintage vinyl wall, and crispy chicken tenders.',
        },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      
      {/* Title */}
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
          <Compass className="w-4 h-4 text-amber-600" />
          <span>Curated Guwahati Itineraries</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          Guwahati Cafe Trails
        </h2>
        <p className="mt-2 text-sm text-stone-600 leading-relaxed">
          Thematic morning-to-night routes connecting Guwahati’s finest coffee corners, lakeside promenades, and scenic viewpoints.
        </p>
      </div>

      {/* Trails Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {trails.map((trail) => {
          const Icon = trail.icon;
          return (
            <div
              key={trail.id}
              className="bg-white rounded-2xl border border-stone-200/90 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${trail.accentColor}`} />
                  </div>
                  <span className="text-xs text-stone-500 font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{trail.duration}</span>
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-stone-900 leading-snug">
                  {trail.title}
                </h3>
                <p className="text-xs font-semibold text-amber-800 mt-0.5">
                  {trail.theme}
                </p>

                <p className="mt-3 text-xs text-stone-600 leading-relaxed">
                  {trail.description}
                </p>

                {/* Trail Stops List */}
                <div className="mt-6 space-y-3 pt-4 border-t border-stone-100">
                  <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    Recommended Route Stops:
                  </p>

                  {trail.stops.map((stop, idx) => {
                    const matchedCafe = cafes.find((c) => c.id === stop.cafeId);
                    return (
                      <div
                        key={stop.cafeId}
                        className="p-3 rounded-xl bg-stone-50/80 border border-stone-200/60 flex items-start justify-between gap-2 group hover:bg-stone-100 transition-colors"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                            <span className="w-4 h-4 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center text-[10px] font-mono">
                              {idx + 1}
                            </span>
                            <span>{stop.name}</span>
                          </div>
                          <p className="text-[11px] text-stone-500 pl-5">
                            {stop.area} · <span className="text-stone-700 italic">{stop.highlight}</span>
                          </p>
                        </div>

                        {matchedCafe && (
                          <button
                            onClick={() => onSelectCafe(matchedCafe)}
                            className="shrink-0 text-xs text-amber-800 hover:text-amber-950 font-semibold p-1 hover:bg-amber-100 rounded transition-colors"
                            title="View cafe menu & reviews"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 text-center">
                <span className="text-xs text-stone-500 font-medium">
                  Click any stop arrow to inspect menu and reviews
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
