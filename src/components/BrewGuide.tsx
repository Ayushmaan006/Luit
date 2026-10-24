import React from 'react';
import { BookOpen, Sparkles, Coffee, Flame, Droplets, Leaf } from 'lucide-react';

export const BrewGuide: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-200">
      
      {/* Title */}
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>Regional Flavor Notes</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          The Assam Tea & Northeast Coffee Primer
        </h2>
        <p className="mt-2 text-sm text-stone-600 leading-relaxed">
          Assam is globally famous for its tea estates, but Guwahati’s modern cafe wave is pioneering something fresh: marrying single-origin Northeast arabica coffees with rare orthodox flushes and indigenous aromatics.
        </p>
      </div>

      {/* Grid Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Assam Orthodox vs Assam CTC */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-800 mb-3">
              <Leaf className="w-5 h-5 text-amber-600" />
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Assam Orthodox vs. Assam CTC
              </h3>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Understanding the two legendary styles of Assam tea you will find across Guwahati cafes:
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
                <div className="flex items-center justify-between text-xs font-bold text-amber-950 mb-1">
                  <span>Assam Orthodox Golden Tips (Whole Leaf)</span>
                  <span className="text-[10px] font-mono uppercase bg-amber-200/70 text-amber-900 px-1.5 py-0.5 rounded">
                    Sip Clear / No Milk
                  </span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Carefully hand-rolled tender buds and young leaves. Produces a luminous amber liquor with pronounced honey, malt, and floral muscatel notes. Best enjoyed in a glass pot without milk.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex items-center justify-between text-xs font-bold text-stone-900 mb-1">
                  <span>Assam CTC (Crush, Tear, Curl)</span>
                  <span className="text-[10px] font-mono uppercase bg-stone-200 text-stone-800 px-1.5 py-0.5 rounded">
                    Chai / Milk Tea
                  </span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Pelletized robust black tea known worldwide for its bold, punchy, astringent body. The indispensable foundation for Guwahati’s simmered Kadak Masala Chai with ginger, cardamom, and thick milk.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
            Tip: Try the First Flush Orthodox at The Steaming Mug in Uzan Bazar.
          </div>
        </div>

        {/* Card 2: Northeast Single-Origin Coffee Beans */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-stone-900 mb-3">
              <Coffee className="w-5 h-5 text-amber-700" />
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Northeast India Single-Origin Beans
              </h3>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Guwahati cafes source beans directly from high-altitude agro-forest plantations across Assam and Meghalaya:
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <p className="text-xs font-bold text-stone-900 mb-0.5">
                  Karbi Anglong Hills, Assam (Elevation: 800m – 1,100m)
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Shade-grown under jackfruit and silver oak canopies. Medium body with notes of toasted dark cocoa, roasted hazelnuts, and warm jaggery sweetness.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <p className="text-xs font-bold text-stone-900 mb-0.5">
                  Khasi Hills, Meghalaya (Elevation: 1,300m – 1,600m)
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Cool misty mountain microclimate yields delicate acidity, crisp red berry notes, white florals, and clean cane sugar finish when brewed via V60.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
            Tip: Check out Bean Journal Roastery at Zoo Tiniali for single-origin pour-over flights.
          </div>
        </div>

        {/* Card 3: Indigenous Culinary Twists */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs">
          <div className="flex items-center gap-2 text-stone-900 mb-3">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Indigenous Botanicals in Guwahati Menus
            </h3>
          </div>

          <div className="space-y-2 text-xs text-stone-700">
            <div className="p-3 rounded-lg bg-stone-50">
              <span className="font-bold text-stone-900">Kazi Nemu (Assam Lemon):</span>
              <p className="text-stone-600 mt-0.5">
                The state's GI-tagged oblong lemon, famous for its intensely aromatic, non-bitter rind. Featured in artisanal cold brews, iced cascara spritzes, and salad reductions.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-stone-50">
              <span className="font-bold text-stone-900">Bhut Jolokia (Ghost Pepper Honey):</span>
              <p className="text-stone-600 mt-0.5">
                Infused into wildflower honey to create a fiery-sweet glaze over crispy fried chicken burgers and woodfired pizzas.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-stone-50">
              <span className="font-bold text-stone-900">Assam Gur (Liquid Date Palm & Cane Jaggery):</span>
              <p className="text-stone-600 mt-0.5">
                Replaces refined syrups in cinnamon lattes, affogatos, and French toast batters for a deep molasses-caramel finish.
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Recommended Brewing Gear */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs">
          <div className="flex items-center gap-2 text-stone-900 mb-3">
            <Droplets className="w-5 h-5 text-sky-600" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Barista Gear You'll Spot
            </h3>
          </div>

          <div className="space-y-2 text-xs text-stone-700">
            <div className="p-3 rounded-lg bg-stone-50">
              <span className="font-bold text-stone-900">Hario V60 Ceramic Dripper</span>
              <p className="text-stone-600 mt-0.5">
                60-degree cone angle allows optimal extraction speed, bringing out the delicate floral nuances of Meghalaya washed beans.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-stone-50">
              <span className="font-bold text-stone-900">Kyoto-Style Cold Drip Towers</span>
              <p className="text-stone-600 mt-0.5">
                Slowly drops icy water drop-by-drop through coffee grounds over 12 hours, eliminating acidity and bitterness.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-stone-50">
              <span className="font-bold text-stone-900">Brass Samovars & Milk Kettles</span>
              <p className="text-stone-600 mt-0.5">
                Used in traditional tea rooms for continuous gentle heating of CTC decoction without burning the brew.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
