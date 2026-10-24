export type PriceTier = '₹' | '₹₹' | '₹₹₹';

export type CuisineType =
  | 'Continental'
  | 'Assamese & Regional Fusion'
  | 'Bakery & Artisanal Desserts'
  | 'Fast Food & Snacks'
  | 'Italian & Pizza'
  | 'Pan-Asian'
  | 'Specialty Coffee & Tea';

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  category: 'Ambience' | 'Food & Drink' | 'View' | 'Menu';
  uploadedBy?: string;
  date: string;
}

export interface MenuItem {
  name: string;
  price: number;
  description: string;
  isVeg: boolean;
  isSignature?: boolean;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export interface MenuImageCard {
  id: string;
  url: string;
  title: string;
  uploadedBy?: string;
  date: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number; // 1 to 5
  date: string;
  comment: string;
  visitType?: string; // e.g. "Work & Study", "Coffee Date", "Solo Reading", "Hangout with Friends"
}

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface DayHours {
  open: string;
  close: string;
  isClosed?: boolean;
}

export type WeeklyHours = Record<DayOfWeek, DayHours>;

export type CafeVibe =
  | 'Quiet Study'
  | 'Lively Social'
  | 'Romantic Date'
  | 'Family Friendly'
  | 'Scenic Vistas'
  | 'Live Music & Arts';

export interface Cafe {
  id: string;
  name: string;
  tagline: string;
  neighborhood: string;
  address: string;
  landmark: string;
  mapsQuery: string;
  coordinates?: { lat: number; lng: number };
  cuisineTypes: CuisineType[];
  vibes: CafeVibe[];
  priceRange: PriceTier;
  costForTwo: number;
  hasWifi: boolean;
  wifiSpeedDesc?: string;
  hasOutdoorSeating: boolean;
  outdoorType?: string;
  isPetFriendly: boolean;
  timings: string;
  dailyHours?: WeeklyHours;
  phone: string;
  instagram?: string;
  coverImage: string;
  galleryImages: GalleryPhoto[];
  menuCategories: MenuCategory[];
  menuImages: MenuImageCard[];
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  specialties: string[];
  features: string[];
  isCommunityAdded?: boolean;
}

export interface CafeFilterState {
  searchQuery: string;
  neighborhood: string;
  cuisine: string;
  vibe: string;
  hasWifi: boolean | null;
  hasOutdoorSeating: boolean | null;
  priceRange: PriceTier | 'ALL';
  sortBy: 'recommended' | 'rating' | 'reviews' | 'priceAsc' | 'priceDesc';
}
