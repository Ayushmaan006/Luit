import React, { useState } from 'react';
import { X, Plus, Upload, CheckCircle2, Coffee, Sparkles } from 'lucide-react';
import { Cafe, CafeVibe, CuisineType, PriceTier } from '../types/cafe.ts';
import { CUISINE_OPTIONS, GUWAHATI_NEIGHBORHOODS, NEIGHBORHOOD_COORDINATES, VIBE_OPTIONS } from '../data/cafesData.ts';
import { parseTimingsToWeekly } from '../utils/hours.ts';

interface SubmitCafeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newCafe: Cafe) => void;
}

export const SubmitCafeModal: React.FC<SubmitCafeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [neighborhood, setNeighborhood] = useState('Uzan Bazar & Latasil');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<CuisineType[]>([
    'Specialty Coffee & Tea',
    'Continental',
  ]);
  const [selectedVibes, setSelectedVibes] = useState<CafeVibe[]>([
    'Quiet Study',
    'Romantic Date',
  ]);
  const [priceRange, setPriceRange] = useState<PriceTier>('₹₹');
  const [costForTwo, setCostForTwo] = useState<number>(500);
  const [hasWifi, setHasWifi] = useState(true);
  const [wifiSpeedDesc, setWifiSpeedDesc] = useState('100 Mbps fiber with charging points');
  const [hasOutdoorSeating, setHasOutdoorSeating] = useState(true);
  const [outdoorType, setOutdoorType] = useState('Garden lawn or open balcony');
  const [isPetFriendly, setIsPetFriendly] = useState(true);
  const [timings, setTimings] = useState('10:00 AM – 10:00 PM');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [coverImagePreview, setCoverImagePreview] = useState<string>('');
  const [specialtyItem, setSpecialtyItem] = useState('');

  if (!isOpen) return null;

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleCuisine = (c: CuisineType) => {
    if (selectedCuisines.includes(c)) {
      if (selectedCuisines.length > 1) {
        setSelectedCuisines(selectedCuisines.filter((item) => item !== c));
      }
    } else {
      setSelectedCuisines([...selectedCuisines, c]);
    }
  };

  const toggleVibe = (vibe: CafeVibe) => {
    if (selectedVibes.includes(vibe)) {
      if (selectedVibes.length > 1) {
        setSelectedVibes(selectedVibes.filter((v) => v !== vibe));
      }
    } else {
      setSelectedVibes([...selectedVibes, vibe]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !address.trim()) return;

    const newCafe: Cafe = {
      id: `custom-cafe-${Date.now()}`,
      name: name.trim(),
      tagline: tagline.trim() || 'A welcoming local cafe hangout in Guwahati',
      neighborhood,
      address: address.trim(),
      landmark: landmark.trim() || 'Guwahati, Assam',
      mapsQuery: `${name.trim()} ${address.trim()} Guwahati`,
      coordinates: {
        lat: Number(((NEIGHBORHOOD_COORDINATES[neighborhood]?.lat || 26.1680) + (Math.random() - 0.5) * 0.005).toFixed(4)),
        lng: Number(((NEIGHBORHOOD_COORDINATES[neighborhood]?.lng || 91.7720) + (Math.random() - 0.5) * 0.005).toFixed(4)),
      },
      cuisineTypes: selectedCuisines,
      vibes: selectedVibes,
      priceRange,
      costForTwo: Number(costForTwo) || 500,
      hasWifi,
      wifiSpeedDesc: hasWifi ? wifiSpeedDesc : undefined,
      hasOutdoorSeating,
      outdoorType: hasOutdoorSeating ? outdoorType : undefined,
      isPetFriendly,
      timings: timings.trim() || '10:00 AM – 10:00 PM',
      dailyHours: parseTimingsToWeekly(timings.trim() || '10:00 AM – 10:00 PM'),
      phone: phone.trim() || '+91 361 200 0000',
      instagram: instagram.trim() ? (instagram.startsWith('@') ? instagram : `@${instagram}`) : undefined,
      coverImage: coverImagePreview || '/src/assets/images/cafe_artisan_pour_over_1792856939697.jpg',
      galleryImages: coverImagePreview ? [
        {
          id: `photo-init-${Date.now()}`,
          url: coverImagePreview,
          caption: `${name} exterior and ambience`,
          category: 'Ambience',
          uploadedBy: 'Cafe Submitter',
          date: 'Just now'
        }
      ] : [],
      menuCategories: [
        {
          category: 'House Specialties',
          items: [
            {
              name: specialtyItem.trim() || 'Signature House Roast Coffee',
              price: 180,
              description: 'Freshly prepared house brew crafted with care.',
              isVeg: true,
              isSignature: true,
            },
            {
              name: 'Guwahati Spiced Grilled Sandwich',
              price: 220,
              description: 'Crispy grilled sandwich with herb relish and cheese.',
              isVeg: true,
            }
          ]
        }
      ],
      menuImages: [],
      rating: 5.0,
      reviewsCount: 1,
      reviews: [
        {
          id: `rev-initial-${Date.now()}`,
          userName: 'Community Submitter',
          rating: 5,
          date: new Date().toISOString().split('T')[0],
          comment: 'Submitted to Luit Brew directory! Great new spot in Guwahati with lovely energy.',
          visitType: 'Community Discovery'
        }
      ],
      specialties: specialtyItem.trim() ? [specialtyItem.trim(), 'Artisan Brews'] : ['Artisan Brews', 'Cozy Ambience'],
      features: [
        hasWifi ? 'Wi-Fi Available' : '',
        hasOutdoorSeating ? 'Outdoor Seating' : '',
        isPetFriendly ? 'Pet Friendly' : '',
        'UPI & Card Accepted'
      ].filter(Boolean),
      isCommunityAdded: true,
    };

    onSubmit(newCafe);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex justify-center items-center p-3 sm:p-6">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-modal-title"
      >
        {/* Header */}
        <div className="bg-stone-900 text-stone-100 p-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Coffee className="w-4 h-4" />
            </div>
            <div>
              <h3 id="submit-modal-title" className="font-serif text-lg font-bold text-white">
                Submit a Guwahati Cafe
              </h3>
              <p className="text-xs text-stone-400">
                Help build Guwahati’s community repository of coffee shops & tea spaces
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-4 text-xs text-stone-800">
          
          {/* Cafe Name & Tagline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Cafe Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Brahmaputra Bakes & Brews"
                required
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                One-Line Tagline / Vibe
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Quaint garden tea room with freshly baked scones"
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Neighborhood & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Neighborhood *
              </label>
              <select
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs"
              >
                {GUWAHATI_NEIGHBORHOODS.filter((n) => n !== 'All Neighborhoods').map((nh) => (
                  <option key={nh} value={nh}>
                    {nh}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Nearby Landmark
              </label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="e.g. Opposite Latasil Field / Near Dighalipukhuri"
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Full Street Address *
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Tayabullah Road, Uzan Bazar, Guwahati, Assam 781001"
              required
              className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 focus:bg-white"
            />
          </div>

          {/* Cuisines Selection (Checkable buttons) */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1.5">
              Cuisine & Offerings (Select applicable)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CUISINE_OPTIONS.filter((c) => c !== 'All Cuisines').map((cuisine) => {
                const isSelected = selectedCuisines.includes(cuisine as CuisineType);
                return (
                  <button
                    key={cuisine}
                    type="button"
                    onClick={() => toggleCuisine(cuisine as CuisineType)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cuisine}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Atmosphere & Vibes Selection (Checkable buttons) */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Atmosphere & Vibes (Select applicable)</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {VIBE_OPTIONS.filter((v) => v !== 'All Vibes').map((vibe) => {
                const isSelected = selectedVibes.includes(vibe as CafeVibe);
                return (
                  <button
                    key={vibe}
                    type="button"
                    onClick={() => toggleVibe(vibe as CafeVibe)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {vibe}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing & Cost for Two */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Price Tier
              </label>
              <div className="flex gap-2">
                {(['₹', '₹₹', '₹₹₹'] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setPriceRange(tier)}
                    className={`flex-1 py-1.5 rounded-md font-mono text-xs font-semibold ${
                      priceRange === tier
                        ? 'bg-stone-900 text-white'
                        : 'bg-white border border-stone-300 text-stone-700'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Average Cost for Two (in ₹)
              </label>
              <input
                type="number"
                min="100"
                max="5000"
                step="50"
                value={costForTwo}
                onChange={(e) => setCostForTwo(Number(e.target.value))}
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs font-mono"
              />
            </div>
          </div>

          {/* Amenities: Wi-Fi, Outdoor, Pet */}
          <div className="space-y-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
            <div className="flex items-center gap-4 flex-wrap">
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={hasWifi}
                  onChange={(e) => setHasWifi(e.target.checked)}
                  className="rounded text-amber-600"
                />
                <span>Wi-Fi Available</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={hasOutdoorSeating}
                  onChange={(e) => setHasOutdoorSeating(e.target.checked)}
                  className="rounded text-amber-600"
                />
                <span>Outdoor Seating / Deck</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={isPetFriendly}
                  onChange={(e) => setIsPetFriendly(e.target.checked)}
                  className="rounded text-amber-600"
                />
                <span>Pet Friendly</span>
              </label>
            </div>

            {hasWifi && (
              <div>
                <label className="block font-medium text-stone-600 mb-0.5 text-[11px]">
                  Wi-Fi Details / Speed
                </label>
                <input
                  type="text"
                  value={wifiSpeedDesc}
                  onChange={(e) => setWifiSpeedDesc(e.target.value)}
                  placeholder="e.g. 100 Mbps fiber with charging points at every desk"
                  className="w-full bg-white border border-stone-300 rounded px-2.5 py-1 text-xs"
                />
              </div>
            )}

            {hasOutdoorSeating && (
              <div>
                <label className="block font-medium text-stone-600 mb-0.5 text-[11px]">
                  Outdoor Seating Type
                </label>
                <input
                  type="text"
                  value={outdoorType}
                  onChange={(e) => setOutdoorType(e.target.value)}
                  placeholder="e.g. Riverfront wooden deck, rooftop terrace, or shaded garden"
                  className="w-full bg-white border border-stone-300 rounded px-2.5 py-1 text-xs"
                />
              </div>
            )}
          </div>

          {/* Operational Hours, Phone, IG */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Timings
              </label>
              <input
                type="text"
                value={timings}
                onChange={(e) => setTimings(e.target.value)}
                placeholder="e.g. 10:00 AM – 10:30 PM"
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 361..."
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Instagram
              </label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="@cafename"
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 text-xs"
              />
            </div>
          </div>

          {/* Signature Dish & Cover Photo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Signature Must-Try Item
              </label>
              <input
                type="text"
                value={specialtyItem}
                onChange={(e) => setSpecialtyItem(e.target.value)}
                placeholder="e.g. Kazi Nemu Cold Brew or Smoked Pork Bao"
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Cover Photo (File Upload)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="w-full text-xs text-stone-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-stone-900 file:text-white"
              />
            </div>
          </div>

          {coverImagePreview && (
            <div>
              <p className="font-semibold text-stone-700 mb-1">Photo Preview:</p>
              <img
                src={coverImagePreview}
                alt="Cafe cover preview"
                className="h-32 rounded-lg object-cover border border-stone-300"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-lg shadow-sm transition-colors"
            >
              Add Cafe to Repository
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
