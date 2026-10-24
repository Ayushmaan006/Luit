import React, { useState } from 'react';
import {
  X,
  Star,
  MapPin,
  Clock,
  Phone,
  Instagram,
  Wifi,
  Trees,
  Dog,
  ExternalLink,
  Upload,
  Camera,
  FileText,
  MessageSquare,
  Sparkles,
  Info,
  CheckCircle2,
  Plus,
  Share2,
  Check,
  Copy,
  MessageCircle
} from 'lucide-react';
import { Cafe, GalleryPhoto, MenuImageCard, Review } from '../types/cafe.ts';
import { getCurrentCafeStatus, getFormattedSchedule } from '../utils/hours.ts';
import { PriceIndexCard } from './PriceIndexCard.tsx';

interface CafeDetailModalProps {
  cafe: Cafe;
  allCafes?: Cafe[];
  onClose: () => void;
  onAddReview: (cafeId: string, review: Review) => void;
  onAddPhoto: (cafeId: string, photo: GalleryPhoto) => void;
  onAddMenuImage: (cafeId: string, menuImage: MenuImageCard) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const CafeDetailModal: React.FC<CafeDetailModalProps> = ({
  cafe,
  allCafes = [],
  onClose,
  onAddReview,
  onAddPhoto,
  onAddMenuImage,
  isFavorite,
  onToggleFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'photos' | 'reviews'>('overview');
  const [photoFilter, setPhotoFilter] = useState<'All' | 'Ambience' | 'Food & Drink' | 'View' | 'Menu'>('All');
  
  // Real-time operating hours status and weekly schedule
  const currentStatus = getCurrentCafeStatus(cafe.dailyHours, cafe.timings);
  const weeklySchedule = getFormattedSchedule(cafe.dailyHours, cafe.timings);
  
  // Review form states
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [visitType, setVisitType] = useState('Coffee Date');
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState(false);

  // Photo upload modal/form states
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoCategory, setPhotoCategory] = useState<'Ambience' | 'Food & Drink' | 'View' | 'Menu'>('Food & Drink');
  const [photoUploader, setPhotoUploader] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Menu image upload states
  const [showMenuUpload, setShowMenuUpload] = useState(false);
  const [menuImageTitle, setMenuImageTitle] = useState('');
  const [menuImagePreview, setMenuImagePreview] = useState<string | null>(null);
  const [menuUploader, setMenuUploader] = useState('');

  // Share state & handlers
  const [copiedLink, setCopiedLink] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  const getShareUrl = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('cafe', cafe.id);
      return url.toString();
    } catch {
      return window.location.href;
    }
  };

  const copyLinkToClipboard = async () => {
    const url = getShareUrl();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedLink(true);
      setShareToast(`Link to ${cafe.name} copied to clipboard!`);
      setShowShareMenu(false);
      setTimeout(() => {
        setCopiedLink(false);
        setShareToast(null);
      }, 3500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleShare = async () => {
    const shareUrl = getShareUrl();
    const shareData = {
      title: `${cafe.name} — Guwahati Cafe Repository`,
      text: `Check out ${cafe.name} in ${cafe.neighborhood}, Guwahati! Known for: ${cafe.specialties?.slice(0, 2).join(', ') || 'Specialty Coffee & Tea'}.`,
      url: shareUrl,
    };

    if (navigator.share && typeof navigator.canShare === 'function') {
      try {
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          setShareToast('Recommendation shared successfully!');
          setTimeout(() => setShareToast(null), 3000);
          setShowShareMenu(false);
          return;
        }
      } catch (err: any) {
        if (err.name === 'AbortError') return;
      }
    }

    // Toggle menu or copy if no native share
    copyLinkToClipboard();
  };

  const handleWhatsAppShare = () => {
    const shareUrl = getShareUrl();
    const msg = encodeURIComponent(
      `Check out ${cafe.name} in ${cafe.neighborhood}, Guwahati on Luit Brew:\n${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank', 'noopener,noreferrer');
    setShowShareMenu(false);
  };

  // Handle Photo File selection
  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Photo
  const handlePhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoPreview) return;

    const newPhoto: GalleryPhoto = {
      id: `photo-${Date.now()}`,
      url: photoPreview,
      caption: photoCaption.trim() || `${cafe.name} - ${photoCategory}`,
      category: photoCategory,
      uploadedBy: photoUploader.trim() || 'Guwahati Cafe Visitor',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    onAddPhoto(cafe.id, newPhoto);
    setPhotoPreview(null);
    setPhotoCaption('');
    setPhotoUploader('');
    setShowPhotoUpload(false);
  };

  // Handle Menu Image File selection
  const handleMenuFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMenuImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Menu Image
  const handleMenuSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuImagePreview) return;

    const newMenuCard: MenuImageCard = {
      id: `menu-card-${Date.now()}`,
      url: menuImagePreview,
      title: menuImageTitle.trim() || 'Official Cafe Menu Board',
      uploadedBy: menuUploader.trim() || 'Community Contributor',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    onAddMenuImage(cafe.id, newMenuCard);
    setMenuImagePreview(null);
    setMenuImageTitle('');
    setMenuUploader('');
    setShowMenuUpload(false);
  };

  // Submit Review
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      userName: reviewerName.trim() || 'Assam Coffee Lover',
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: reviewText.trim(),
      visitType: visitType
    };

    onAddReview(cafe.id, newReview);
    setReviewText('');
    setReviewerName('');
    setShowReviewForm(false);
    setReviewSuccessMsg(true);
    setTimeout(() => setReviewSuccessMsg(false), 4000);
  };

  const filteredPhotos = photoFilter === 'All'
    ? cafe.galleryImages
    : cafe.galleryImages.filter(p => p.category === photoFilter);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex justify-center items-start p-2 sm:p-4 md:p-6 transition-opacity">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-stone-200 overflow-hidden my-4 relative animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-cafe-title"
      >
        {/* Modal Top Actions: Share & Close */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={handleShare}
            aria-label={`Share ${cafe.name}`}
            className="p-2 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white backdrop-blur-md transition-colors"
            title="Share Cafe"
          >
            {copiedLink ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
          </button>

          <button
            onClick={onClose}
            aria-label="Close details"
            className="p-2 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Header Banner */}
        <div className="relative h-64 sm:h-80 w-full bg-stone-900 overflow-hidden">
          {cafe.coverImage ? (
            <img
              src={cafe.coverImage}
              alt={cafe.name}
              className="w-full h-full object-cover object-center brightness-75"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-amber-900 to-stone-900" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />

          {/* Header Overlay Info */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1.5 flex-wrap">
              <span>{cafe.neighborhood}</span>
              <span aria-hidden="true">·</span>
              <span>{cafe.cuisineTypes.join(', ')}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{cafe.priceRange} (Avg ₹{cafe.costForTwo} for two)</span>
              <span aria-hidden="true">·</span>
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold tracking-normal ${
                currentStatus.isOpen
                  ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                  : 'bg-rose-500/25 text-rose-300 border border-rose-500/40'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${currentStatus.isOpen ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                <span>{currentStatus.statusBadge}</span>
              </span>
            </div>

            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 id="modal-cafe-title" className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  {cafe.name}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-stone-300 max-w-2xl line-clamp-2">
                  {cafe.tagline}
                </p>
                {cafe.vibes && cafe.vibes.length > 0 && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-200/90 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{cafe.vibes.join(' · ')}</span>
                  </div>
                )}
              </div>

              {/* Rating Box */}
              <div className="hidden sm:flex flex-col items-end shrink-0 bg-stone-900/80 backdrop-blur-md p-3 rounded-xl border border-stone-700/80">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-lg font-mono">
                  <Star className="w-5 h-5 fill-amber-400" />
                  <span>{cafe.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-stone-300 mt-0.5 font-normal">
                  {cafe.reviewsCount} {cafe.reviewsCount === 1 ? 'review' : 'reviews'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Toolbar & Navigation Tabs */}
        <div className="border-b border-stone-200 px-6 bg-stone-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-2 text-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-2 font-medium rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'overview'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              Overview & Vibe
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-3 py-2 font-medium rounded-lg whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                activeTab === 'menu'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Full Menu ({cafe.menuCategories.reduce((sum, c) => sum + c.items.length, 0)})</span>
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-3 py-2 font-medium rounded-lg whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                activeTab === 'photos'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Photos ({cafe.galleryImages.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-3 py-2 font-medium rounded-lg whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                activeTab === 'reviews'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Reviews ({cafe.reviewsCount})</span>
            </button>
          </div>

          <div className="flex items-center gap-2 py-2">
            {/* Share Button with Direct Copy / Native Share / WhatsApp */}
            <div className="relative">
              <button
                onClick={handleShare}
                aria-label={`Share ${cafe.name}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap shadow-xs ${
                  copiedLink
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>Share</span>
                  </>
                )}
              </button>

              {/* Share Options Dropdown */}
              {showShareMenu && (
                <div className="absolute right-0 top-full mt-1.5 w-60 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-30 animate-in fade-in zoom-in-95">
                  <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider px-2 py-1">
                    Recommend {cafe.name}
                  </div>
                  
                  <button
                    onClick={copyLinkToClipboard}
                    className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-stone-700 hover:bg-stone-100 rounded-lg transition-colors text-left font-medium"
                  >
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>Copy Direct Link</span>
                  </button>

                  <button
                    onClick={handleWhatsAppShare}
                    className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors text-left font-medium"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Share via WhatsApp</span>
                  </button>

                  {typeof navigator !== 'undefined' && 'share' in navigator && (
                    <button
                      onClick={handleShare}
                      className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-stone-700 hover:bg-stone-100 rounded-lg transition-colors text-left font-medium border-t border-stone-100 mt-1 pt-2"
                    >
                      <Share2 className="w-3.5 h-3.5 text-amber-700" />
                      <span>Open System Share Sheet</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                cafe.mapsQuery || `${cafe.name} ${cafe.address}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-700" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>

            <button
              onClick={() => onToggleFavorite(cafe.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                isFavorite
                  ? 'bg-rose-50 border-rose-300 text-rose-700'
                  : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {isFavorite ? 'Saved in Favorites' : 'Save Cafe'}
            </button>
          </div>
        </div>

        {/* Tab Content Container */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Quick Key Amenities Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                
                {/* Wi-Fi & Work Setup */}
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1">
                    <Wifi className="w-4 h-4 text-emerald-600" />
                    <span>Wi-Fi & Connectivity</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    {cafe.hasWifi
                      ? cafe.wifiSpeedDesc || 'High-speed Wi-Fi available for work & browsing'
                      : 'Wi-Fi not actively provided; best for disconnect & conversation'}
                  </p>
                </div>

                {/* Outdoor & Ambience */}
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1">
                    <Trees className="w-4 h-4 text-amber-700" />
                    <span>Outdoor & Seating</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    {cafe.hasOutdoorSeating
                      ? cafe.outdoorType || 'Outdoor open-air deck or garden available'
                      : 'Cozy fully air-conditioned indoor seating'}
                  </p>
                </div>

                {/* Pet Friendliness */}
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1">
                    <Dog className="w-4 h-4 text-amber-800" />
                    <span>Pet Policy</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    {cafe.isPetFriendly
                      ? 'Pet friendly! Furry companions are welcomed on outdoor decks'
                      : 'Indoor dining only; guide animals permitted'}
                  </p>
                </div>

              </div>

              {/* Atmosphere & Vibe Tags */}
              {cafe.vibes && cafe.vibes.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase font-semibold tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Atmosphere & Vibes</span>
                  </h3>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {cafe.vibes.map((vibe, i) => (
                      <span
                        key={i}
                        className="bg-amber-50 text-amber-950 border border-amber-200/80 px-3 py-1 rounded-md font-medium inline-flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>{vibe}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Specialties Section */}
              {cafe.specialties && cafe.specialties.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase font-semibold tracking-wider text-stone-400 mb-2">
                    Known For & Must-Try Offerings
                  </h3>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {cafe.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="bg-amber-50 text-amber-900 border border-amber-200/80 px-3 py-1 rounded-md font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Daily Operating & Closing Hours Schedule Card */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-stone-900 leading-none">
                        Daily Operating Hours
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Guwahati standard opening & closing schedule
                      </p>
                    </div>
                  </div>

                  {/* Current Status Badge */}
                  <div className={`px-2.5 py-1 rounded-md text-xs font-semibold border flex items-center gap-1.5 ${currentStatus.colorClass}`}>
                    <span className={`w-2 h-2 rounded-full ${currentStatus.isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    <span>{currentStatus.statusBadge}</span>
                    <span className="text-stone-400 font-normal">·</span>
                    <span className="font-normal">{currentStatus.detailText}</span>
                  </div>
                </div>

                {/* 7-Day Schedule Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-xs">
                  {weeklySchedule.map((daySchedule) => (
                    <div
                      key={daySchedule.day}
                      className={`p-2.5 rounded-lg border transition-all flex flex-col justify-between ${
                        daySchedule.isToday
                          ? 'bg-amber-100/70 border-amber-300 ring-1 ring-amber-300/50 shadow-xs'
                          : 'bg-white border-stone-200/80 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className={`text-xs font-semibold ${daySchedule.isToday ? 'text-amber-950 font-bold' : 'text-stone-700'}`}>
                          {daySchedule.day.slice(0, 3)}
                        </span>
                        {daySchedule.isToday && (
                          <span className="text-[9px] font-mono uppercase bg-amber-200 text-amber-900 px-1 py-0.2 rounded font-bold">
                            Today
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] font-mono">
                        {daySchedule.isClosed ? (
                          <span className="text-rose-600 font-semibold block text-center py-2">
                            Closed
                          </span>
                        ) : (
                          <div className="space-y-1 text-stone-700">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-stone-400">Open</span>
                              <span className="font-semibold text-stone-900 tabular-nums">{daySchedule.open}</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-stone-400">Close</span>
                              <span className="font-semibold text-stone-900 tabular-nums">{daySchedule.close}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparative Guwahati Price Index Analysis */}
              <PriceIndexCard cafe={cafe} allCafes={allCafes} />

              {/* Location & Contact Details */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-700">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-stone-900">Address & Landmark</p>
                      <p className="mt-0.5">{cafe.address}</p>
                      {cafe.landmark && (
                        <p className="text-stone-500 italic mt-0.5">Near {cafe.landmark}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {cafe.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-stone-900">Phone: </span>
                        <a href={`tel:${cafe.phone}`} className="hover:underline text-amber-800">
                          {cafe.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {cafe.instagram && (
                    <div className="flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-stone-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-stone-900">Instagram: </span>
                        <span className="text-stone-600">{cafe.instagram}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-[11px] text-stone-500">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Summary: {cafe.timings}</span>
                  </div>
                </div>
              </div>

              {/* Curated Vibe Features */}
              {cafe.features && cafe.features.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase font-semibold tracking-wider text-stone-400 mb-2">
                    Atmosphere & Amenities
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {cafe.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: MENU (Text Items & Uploaded Menu Images) */}
          {activeTab === 'menu' && (
            <div className="space-y-8">
              
              {/* Header with Upload Menu Card Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Menu Offerings
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <p className="text-xs text-stone-500">
                      Average cost for two: <span className="font-mono font-semibold text-stone-800">₹{cafe.costForTwo}</span> · All prices in INR (₹)
                    </p>
                    <PriceIndexCard cafe={cafe} allCafes={allCafes} variant="compact" />
                  </div>
                </div>

                <button
                  onClick={() => setShowMenuUpload(!showMenuUpload)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold bg-amber-400 text-stone-950 rounded-lg hover:bg-amber-300 transition-colors shrink-0"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Menu Card / Photo</span>
                </button>
              </div>

              {/* Menu Image Upload Form Drawer */}
              {showMenuUpload && (
                <form
                  onSubmit={handleMenuSubmit}
                  className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-3 animate-in fade-in"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                      Upload Menu Image or Board
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowMenuUpload(false)}
                      className="text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Select Menu Photo
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMenuFileChange}
                        required
                        className="w-full text-xs text-stone-600 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-stone-900 file:text-white hover:file:bg-stone-800"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Menu Title / Season (e.g. "Beverages & Teas")
                      </label>
                      <input
                        type="text"
                        value={menuImageTitle}
                        onChange={(e) => setMenuImageTitle(e.target.value)}
                        placeholder="e.g. All-Day Breakfast & Pour-Overs"
                        className="w-full bg-white border border-stone-300 rounded-md px-3 py-1.5 text-xs"
                      />
                    </div>
                  </div>

                  {menuImagePreview && (
                    <div className="mt-2">
                      <p className="text-xs font-medium text-stone-700 mb-1">Preview:</p>
                      <img
                        src={menuImagePreview}
                        alt="Menu preview"
                        className="max-h-48 rounded-lg border border-stone-300 object-cover"
                      />
                    </div>
                  )}

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowMenuUpload(false);
                        setMenuImagePreview(null);
                      }}
                      className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!menuImagePreview}
                      className="px-4 py-1.5 text-xs font-semibold bg-stone-900 text-white rounded-md hover:bg-stone-800 disabled:opacity-50"
                    >
                      Add Menu Photo
                    </button>
                  </div>
                </form>
              )}

              {/* Uploaded Menu Image Cards Showcase */}
              {cafe.menuImages && cafe.menuImages.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-semibold tracking-wider text-stone-500 mb-3">
                    Uploaded Menu Cards & Boards ({cafe.menuImages.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {cafe.menuImages.map((m) => (
                      <div
                        key={m.id}
                        className="group relative rounded-xl border border-stone-200 overflow-hidden bg-stone-100"
                      >
                        <img
                          src={m.url}
                          alt={m.title}
                          className="w-full h-44 object-cover object-top group-hover:scale-105 transition-transform"
                        />
                        <div className="p-2.5 bg-white border-t border-stone-200">
                          <p className="text-xs font-semibold text-stone-900 truncate">
                            {m.title}
                          </p>
                          <p className="text-[10px] text-stone-500 mt-0.5">
                            Added by {m.uploadedBy || 'Contributor'} · {m.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Categorized Menu Items List */}
              {cafe.menuCategories.map((cat, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="font-serif text-base font-bold text-stone-900 border-b border-stone-200 pb-1.5 flex items-center justify-between">
                    <span>{cat.category}</span>
                    <span className="text-xs font-sans text-stone-400 font-normal">
                      {cat.items.length} items
                    </span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cat.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="p-3.5 rounded-xl border border-stone-100 hover:border-stone-200 bg-white hover:bg-stone-50/50 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              {/* Veg / Non-Veg Indicator */}
                              <span
                                className={`w-3.5 h-3.5 border flex items-center justify-center p-0.5 rounded-xs shrink-0 ${
                                  item.isVeg
                                    ? 'border-emerald-600'
                                    : 'border-rose-600'
                                }`}
                                title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    item.isVeg
                                      ? 'bg-emerald-600'
                                      : 'bg-rose-600'
                                  }`}
                                />
                              </span>

                              <span className="text-xs sm:text-sm font-semibold text-stone-900">
                                {item.name}
                              </span>
                            </div>

                            <span className="text-xs font-bold font-mono text-stone-900 shrink-0">
                              ₹{item.price}
                            </span>
                          </div>

                          <p className="mt-1.5 text-xs text-stone-500 leading-relaxed pl-5">
                            {item.description}
                          </p>
                        </div>

                        {item.isSignature && (
                          <div className="mt-2.5 pl-5">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded">
                              <Sparkles className="w-3 h-3 text-amber-600" />
                              House Specialty
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            </div>
          )}

          {/* TAB 3: PHOTO GALLERY & UPLOADS */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              
              {/* Header with Photo Upload Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Visitor & Ambience Gallery
                  </h3>
                  <p className="text-xs text-stone-500">
                    Real community photos of coffee, food, views, and cosy corners
                  </p>
                </div>

                <button
                  onClick={() => setShowPhotoUpload(!showPhotoUpload)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors shrink-0"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Upload Photo</span>
                </button>
              </div>

              {/* Photo Upload Form Drawer */}
              {showPhotoUpload && (
                <form
                  onSubmit={handlePhotoSubmit}
                  className="p-4 rounded-xl bg-stone-100 border border-stone-200 space-y-3 animate-in fade-in"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                      Share your Guwahati Cafe Snapshot
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPhotoUpload(false)}
                      className="text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Select Photo
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoFileChange}
                        required
                        className="w-full text-xs text-stone-600 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-amber-400 file:text-stone-950 hover:file:bg-amber-300"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Category
                      </label>
                      <select
                        value={photoCategory}
                        onChange={(e) =>
                          setPhotoCategory(
                            e.target.value as 'Ambience' | 'Food & Drink' | 'View' | 'Menu'
                          )
                        }
                        className="w-full bg-white border border-stone-300 rounded-md px-3 py-1.5 text-xs"
                      >
                        <option value="Food & Drink">Food & Drink</option>
                        <option value="Ambience">Ambience & Interior</option>
                        <option value="View">River / Outdoor View</option>
                        <option value="Menu">Menu & Specials</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Your Name / Handle
                      </label>
                      <input
                        type="text"
                        value={photoUploader}
                        onChange={(e) => setPhotoUploader(e.target.value)}
                        placeholder="e.g. Partha S."
                        className="w-full bg-white border border-stone-300 rounded-md px-3 py-1.5 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1 text-xs">
                      Short Caption
                    </label>
                    <input
                      type="text"
                      value={photoCaption}
                      onChange={(e) => setPhotoCaption(e.target.value)}
                      placeholder="e.g. Pour over with cinnamon cake on a rainy Latasil afternoon"
                      className="w-full bg-white border border-stone-300 rounded-md px-3 py-1.5 text-xs"
                    />
                  </div>

                  {photoPreview && (
                    <div className="mt-2">
                      <p className="text-xs font-medium text-stone-700 mb-1">Preview:</p>
                      <img
                        src={photoPreview}
                        alt="Upload preview"
                        className="max-h-48 rounded-lg border border-stone-300 object-cover"
                      />
                    </div>
                  )}

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPhotoUpload(false);
                        setPhotoPreview(null);
                      }}
                      className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!photoPreview}
                      className="px-4 py-1.5 text-xs font-semibold bg-stone-900 text-white rounded-md hover:bg-stone-800 disabled:opacity-50"
                    >
                      Post Photo
                    </button>
                  </div>
                </form>
              )}

              {/* Photo Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                {(['All', 'Ambience', 'Food & Drink', 'View', 'Menu'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPhotoFilter(cat)}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      photoFilter === cat
                        ? 'bg-amber-100 text-amber-900 font-semibold'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative rounded-xl overflow-hidden bg-stone-100 border border-stone-200 aspect-[4/3]"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white">
                      <p className="text-xs font-medium leading-snug">
                        {photo.caption}
                      </p>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-stone-300">
                        <span>{photo.category}</span>
                        <span>{photo.uploadedBy || 'Visitor'} · {photo.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPhotos.length === 0 && (
                <div className="text-center py-12 text-stone-500 text-xs">
                  No photos found in this category yet. Be the first to upload one!
                </div>
              )}

            </div>
          )}

          {/* TAB 4: REVIEWS & RATINGS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              
              {/* Rating Summary Card */}
              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-3xl font-bold text-stone-900 font-mono">
                      {cafe.rating.toFixed(1)}
                    </span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.round(cafe.rating)
                              ? 'fill-amber-400 text-amber-500'
                              : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Based on {cafe.reviewsCount} verified community visits across Guwahati
                  </p>
                </div>

                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-4 py-2 text-xs font-semibold bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap"
                >
                  Write a Review
                </button>
              </div>

              {reviewSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Thank you! Your review and star rating has been posted to this cafe.</span>
                </div>
              )}

              {/* Review Submission Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleReviewSubmit}
                  className="p-5 rounded-xl bg-white border border-stone-300 shadow-sm space-y-4 animate-in fade-in"
                >
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <h4 className="font-serif text-sm font-bold text-stone-900">
                      Rate & Review {cafe.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Star Rating Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Your Rating (1 to 5 Stars)
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setReviewRating(star)}
                          className="p-1 focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= (hoverRating || reviewRating)
                                ? 'fill-amber-400 text-amber-500'
                                : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-mono font-medium text-stone-600 ml-2">
                        {reviewRating} of 5 Stars
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder="e.g. Kaushik B."
                        required
                        className="w-full bg-stone-50 border border-stone-300 rounded-md px-3 py-1.5 text-xs text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Visit Occasion
                      </label>
                      <select
                        value={visitType}
                        onChange={(e) => setVisitType(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 rounded-md px-3 py-1.5 text-xs text-stone-900"
                      >
                        <option value="Work & Study">Work & Remote Study</option>
                        <option value="Coffee Date">Coffee Date</option>
                        <option value="Solo Reading">Solo Reading & Chill</option>
                        <option value="Hangout with Friends">Hangout with Friends</option>
                        <option value="Family Outing">Family Outing</option>
                        <option value="Sunset View">Sunset & Scenery</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Your Review & Experience
                    </label>
                    <textarea
                      rows={3}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Tell future visitors about the coffee quality, seating comfort, Wi-Fi reliability, or must-try food..."
                      required
                      className="w-full bg-stone-50 border border-stone-300 rounded-md p-3 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-semibold bg-stone-900 text-white rounded-md hover:bg-stone-800"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase font-semibold tracking-wider text-stone-500">
                  Recent Visitor Feedback ({cafe.reviews.length})
                </h4>

                {cafe.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl border border-stone-200/90 bg-white hover:bg-stone-50/50 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs">
                          {rev.userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-stone-900 leading-none">
                            {rev.userName}
                          </p>
                          {rev.visitType && (
                            <p className="text-[10px] text-stone-500 mt-0.5">
                              {rev.visitType} · {rev.date}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= rev.rating
                                ? 'fill-amber-400 text-amber-500'
                                : 'text-stone-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-stone-700 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Floating Toast Notification */}
        {shareToast && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-xl shadow-2xl border border-stone-700 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{shareToast}</span>
          </div>
        )}

      </div>
    </div>
  );
};
