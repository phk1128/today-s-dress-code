
export interface User {
  id: string;
  email: string;
  name: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  favoriteColors: string[];
  preferredBrands: string[];
  bodyType: 'slim' | 'regular' | 'large';
  style: 'casual' | 'formal' | 'trendy' | 'classic';
}

export interface ClothingItem {
  id: string;
  name: string;
  category: 'top' | 'bottom' | 'outer' | 'shoes' | 'accessory';
  type: string;
  color?: string;
  brand?: string;
  graphic?: string;
  fit: 'tight' | 'regular' | 'loose' | 'oversized';
  warmth: 'very_cold' | 'cold' | 'mild' | 'warm' | 'very_warm';
  formalness: 'very_casual' | 'casual' | 'semi_formal' | 'formal' | 'very_formal';
  wearCount: number;
  lastWorn?: string;
  isFavorite: boolean;
}

export interface UserWardrobe {
  userId: string;
  items: ClothingItem[];
}

export interface OutfitRecommendation {
  situation: 'daily' | 'date' | 'interview' | 'school' | 'exercise' | 'party';
  items: ClothingItem[];
  reason: string;
  trendScore?: number;
}

export interface CodiHistory {
  id: string;
  userId: string;
  items: ClothingItem[];
  situation: string;
  date: string;
  rating?: number;
}
