
import { useState, useEffect } from 'react';
import { ClothingItem, UserWardrobe } from '../types/auth';
import { useAuth } from './useAuth';

export const useWardrobe = () => {
  const { user } = useAuth();
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([]);

  useEffect(() => {
    if (user) {
      loadWardrobe();
    }
  }, [user]);

  const loadWardrobe = () => {
    if (!user) return;
    
    const savedWardrobe = localStorage.getItem(`wardrobe_${user.id}`);
    if (savedWardrobe) {
      setWardrobe(JSON.parse(savedWardrobe));
    } else {
      // 기본 옷장 데이터
      const defaultWardrobe: ClothingItem[] = [
        { id: '1', name: '흰색 티셔츠', category: 'top', type: '반팔 티셔츠', color: '흰색', warmth: 'warm' },
        { id: '2', name: '청바지', category: 'bottom', type: '청바지', color: '파란색', warmth: 'mild' },
        { id: '3', name: '검은색 패딩', category: 'outer', type: '패딩', color: '검은색', warmth: 'very_cold' },
        { id: '4', name: '운동화', category: 'shoes', type: '스니커즈', color: '흰색', warmth: 'mild' },
      ];
      setWardrobe(defaultWardrobe);
      saveWardrobe(defaultWardrobe);
    }
  };

  const saveWardrobe = (newWardrobe: ClothingItem[]) => {
    if (!user) return;
    localStorage.setItem(`wardrobe_${user.id}`, JSON.stringify(newWardrobe));
  };

  const addItem = (item: Omit<ClothingItem, 'id'>) => {
    const newItem: ClothingItem = {
      ...item,
      id: Date.now().toString()
    };
    const newWardrobe = [...wardrobe, newItem];
    setWardrobe(newWardrobe);
    saveWardrobe(newWardrobe);
  };

  const removeItem = (itemId: string) => {
    const newWardrobe = wardrobe.filter(item => item.id !== itemId);
    setWardrobe(newWardrobe);
    saveWardrobe(newWardrobe);
  };

  return {
    wardrobe,
    addItem,
    removeItem
  };
};
