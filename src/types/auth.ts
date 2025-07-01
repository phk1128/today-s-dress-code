
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface ClothingItem {
  id: string;
  name: string;
  category: 'top' | 'bottom' | 'outer' | 'shoes' | 'accessory';
  type: string;
  color?: string;
  warmth: 'very_cold' | 'cold' | 'mild' | 'warm' | 'very_warm';
}

export interface UserWardrobe {
  userId: string;
  items: ClothingItem[];
}
