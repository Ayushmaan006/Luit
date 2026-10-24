import { Cafe, GalleryPhoto, MenuImageCard, Review } from '../types/cafe.ts';
import { INITIAL_CAFES } from '../data/cafesData.ts';

const STORAGE_KEYS = {
  CUSTOM_CAFES: 'luitbrew_custom_cafes_v1',
  REVIEWS_BY_CAFE: 'luitbrew_reviews_by_cafe_v1',
  PHOTOS_BY_CAFE: 'luitbrew_photos_by_cafe_v1',
  MENUS_BY_CAFE: 'luitbrew_menus_by_cafe_v1',
  FAVORITES: 'luitbrew_favorites_v1'
};

export function getStoredCafes(): Cafe[] {
  try {
    const customJson = localStorage.getItem(STORAGE_KEYS.CUSTOM_CAFES);
    const customCafes: Cafe[] = customJson ? JSON.parse(customJson) : [];

    // Merge base initial cafes with any overrides or user-added cafes
    const allCafes = [...INITIAL_CAFES, ...customCafes];

    // Load any user-submitted reviews
    const reviewsMapJson = localStorage.getItem(STORAGE_KEYS.REVIEWS_BY_CAFE);
    const reviewsMap: Record<string, Review[]> = reviewsMapJson ? JSON.parse(reviewsMapJson) : {};

    // Load any user-uploaded photos
    const photosMapJson = localStorage.getItem(STORAGE_KEYS.PHOTOS_BY_CAFE);
    const photosMap: Record<string, GalleryPhoto[]> = photosMapJson ? JSON.parse(photosMapJson) : {};

    // Load any user-uploaded menu images
    const menusMapJson = localStorage.getItem(STORAGE_KEYS.MENUS_BY_CAFE);
    const menusMap: Record<string, MenuImageCard[]> = menusMapJson ? JSON.parse(menusMapJson) : {};

    return allCafes.map(cafe => {
      const extraReviews = reviewsMap[cafe.id] || [];
      const combinedReviews = [...extraReviews, ...cafe.reviews];
      
      const totalRating = combinedReviews.reduce((sum, r) => sum + r.rating, 0);
      const avgRating = combinedReviews.length > 0 
        ? Number((totalRating / combinedReviews.length).toFixed(1)) 
        : cafe.rating;

      const extraPhotos = photosMap[cafe.id] || [];
      const extraMenus = menusMap[cafe.id] || [];

      return {
        ...cafe,
        vibes: cafe.vibes || ['Quiet Study'],
        reviews: combinedReviews,
        reviewsCount: combinedReviews.length,
        rating: avgRating,
        galleryImages: [...extraPhotos, ...cafe.galleryImages],
        menuImages: [...extraMenus, ...cafe.menuImages]
      };
    });
  } catch (err) {
    console.error('Error reading cafes from storage:', err);
    return INITIAL_CAFES;
  }
}

export function saveCustomCafe(newCafe: Cafe): Cafe[] {
  try {
    const customJson = localStorage.getItem(STORAGE_KEYS.CUSTOM_CAFES);
    const customCafes: Cafe[] = customJson ? JSON.parse(customJson) : [];
    customCafes.unshift(newCafe);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_CAFES, JSON.stringify(customCafes));
  } catch (err) {
    console.error('Error saving custom cafe:', err);
  }
  return getStoredCafes();
}

export function saveReview(cafeId: string, review: Review): Cafe[] {
  try {
    const reviewsMapJson = localStorage.getItem(STORAGE_KEYS.REVIEWS_BY_CAFE);
    const reviewsMap: Record<string, Review[]> = reviewsMapJson ? JSON.parse(reviewsMapJson) : {};
    
    if (!reviewsMap[cafeId]) {
      reviewsMap[cafeId] = [];
    }
    reviewsMap[cafeId].unshift(review);
    localStorage.setItem(STORAGE_KEYS.REVIEWS_BY_CAFE, JSON.stringify(reviewsMap));
  } catch (err) {
    console.error('Error saving review:', err);
  }
  return getStoredCafes();
}

export function savePhoto(cafeId: string, photo: GalleryPhoto): Cafe[] {
  try {
    const photosMapJson = localStorage.getItem(STORAGE_KEYS.PHOTOS_BY_CAFE);
    const photosMap: Record<string, GalleryPhoto[]> = photosMapJson ? JSON.parse(photosMapJson) : {};

    if (!photosMap[cafeId]) {
      photosMap[cafeId] = [];
    }
    photosMap[cafeId].unshift(photo);
    localStorage.setItem(STORAGE_KEYS.PHOTOS_BY_CAFE, JSON.stringify(photosMap));
  } catch (err) {
    console.error('Error saving photo:', err);
  }
  return getStoredCafes();
}

export function saveMenuImage(cafeId: string, menuImage: MenuImageCard): Cafe[] {
  try {
    const menusMapJson = localStorage.getItem(STORAGE_KEYS.MENUS_BY_CAFE);
    const menusMap: Record<string, MenuImageCard[]> = menusMapJson ? JSON.parse(menusMapJson) : {};

    if (!menusMap[cafeId]) {
      menusMap[cafeId] = [];
    }
    menusMap[cafeId].unshift(menuImage);
    localStorage.setItem(STORAGE_KEYS.MENUS_BY_CAFE, JSON.stringify(menusMap));
  } catch (err) {
    console.error('Error saving menu image:', err);
  }
  return getStoredCafes();
}

export function getFavorites(): string[] {
  try {
    const favs = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return favs ? JSON.parse(favs) : [];
  } catch {
    return [];
  }
}

export function toggleFavoriteInStorage(cafeId: string): string[] {
  try {
    const current = getFavorites();
    const updated = current.includes(cafeId)
      ? current.filter(id => id !== cafeId)
      : [...current, cafeId];
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}
