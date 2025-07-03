
import { useState, useEffect } from 'react';
import { ClothingItem, UserWardrobe, CodiHistory, OutfitRecommendation } from '../types/auth';
import { useAuth } from './useAuth';

export const useWardrobe = () => {
  const { user } = useAuth();
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([]);
  const [codiHistory, setCodiHistory] = useState<CodiHistory[]>([]);

  useEffect(() => {
    if (user) {
      loadWardrobe();
      loadCodiHistory();
    }
  }, [user]);

  const loadWardrobe = () => {
    if (!user) return;
    
    const savedWardrobe = localStorage.getItem(`wardrobe_${user.id}`);
    if (savedWardrobe) {
      setWardrobe(JSON.parse(savedWardrobe));
    } else {
      // 더 자세한 기본 옷장 데이터
      const defaultWardrobe: ClothingItem[] = [
        { 
          id: '1', 
          name: '유니클로 흰색 기본 티셔츠', 
          category: 'top', 
          type: '반팔 티셔츠', 
          color: '흰색', 
          brand: '유니클로',
          fit: 'regular',
          warmth: 'warm',
          formalness: 'casual',
          wearCount: 15,
          isFavorite: true
        },
        { 
          id: '2', 
          name: '리바이스 501 청바지', 
          category: 'bottom', 
          type: '청바지', 
          color: '인디고', 
          brand: '리바이스',
          fit: 'regular',
          warmth: 'mild',
          formalness: 'casual',
          wearCount: 20,
          isFavorite: true
        },
        { 
          id: '3', 
          name: '노스페이스 블랙 패딩', 
          category: 'outer', 
          type: '패딩', 
          color: '검은색', 
          brand: '노스페이스',
          fit: 'regular',
          warmth: 'very_cold',
          formalness: 'casual',
          wearCount: 8,
          isFavorite: false
        },
        { 
          id: '4', 
          name: '아디다스 스탠스미스', 
          category: 'shoes', 
          type: '스니커즈', 
          color: '흰색', 
          brand: '아디다스',
          fit: 'regular',
          warmth: 'mild',
          formalness: 'casual',
          wearCount: 25,
          isFavorite: true
        },
      ];
      setWardrobe(defaultWardrobe);
      saveWardrobe(defaultWardrobe);
    }
  };

  const loadCodiHistory = () => {
    if (!user) return;
    
    const savedHistory = localStorage.getItem(`codi_history_${user.id}`);
    if (savedHistory) {
      setCodiHistory(JSON.parse(savedHistory));
    }
  };

  const saveWardrobe = (newWardrobe: ClothingItem[]) => {
    if (!user) return;
    localStorage.setItem(`wardrobe_${user.id}`, JSON.stringify(newWardrobe));
  };

  const saveCodiHistory = (newHistory: CodiHistory[]) => {
    if (!user) return;
    localStorage.setItem(`codi_history_${user.id}`, JSON.stringify(newHistory));
  };

  const addItem = (item: Omit<ClothingItem, 'id' | 'wearCount' | 'isFavorite'>) => {
    const newItem: ClothingItem = {
      ...item,
      id: Date.now().toString(),
      wearCount: 0,
      isFavorite: false
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

  const toggleFavorite = (itemId: string) => {
    const newWardrobe = wardrobe.map(item => 
      item.id === itemId ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setWardrobe(newWardrobe);
    saveWardrobe(newWardrobe);
  };

  const addCodiHistory = (items: ClothingItem[], situation: string, rating?: number) => {
    if (!user) return;
    
    const newCodi: CodiHistory = {
      id: Date.now().toString(),
      userId: user.id,
      items,
      situation,
      date: new Date().toISOString(),
      rating
    };
    
    const newHistory = [newCodi, ...codiHistory].slice(0, 50); // 최근 50개만 저장
    setCodiHistory(newHistory);
    saveCodiHistory(newHistory);

    // 착용 횟수 업데이트
    const updatedWardrobe = wardrobe.map(wardrobeItem => {
      const usedItem = items.find(item => item.id === wardrobeItem.id);
      return usedItem ? { ...wardrobeItem, wearCount: wardrobeItem.wearCount + 1, lastWorn: new Date().toISOString() } : wardrobeItem;
    });
    setWardrobe(updatedWardrobe);
    saveWardrobe(updatedWardrobe);
  };

  // 상황별 추천 시스템
  const getRecommendationBySituation = (situation: OutfitRecommendation['situation'], weather: any): OutfitRecommendation => {
    const temp = weather.temperature;
    let formalLevel: ClothingItem['formalness'][];
    let preferredFits: ClothingItem['fit'][];

    switch (situation) {
      case 'interview':
        formalLevel = ['formal', 'semi_formal'];
        preferredFits = ['regular', 'tight'];
        break;
      case 'date':
        formalLevel = ['semi_formal', 'casual'];
        preferredFits = ['regular', 'tight'];
        break;
      case 'exercise':
        formalLevel = ['very_casual', 'casual'];
        preferredFits = ['loose', 'regular'];
        break;
      case 'party':
        formalLevel = ['semi_formal', 'formal'];
        preferredFits = ['tight', 'regular'];
        break;
      default:
        formalLevel = ['casual', 'very_casual'];
        preferredFits = ['regular', 'loose'];
    }

    // 온도에 따른 보온성 필터
    let requiredWarmth: ClothingItem['warmth'][];
    if (temp < 5) requiredWarmth = ['very_cold', 'cold'];
    else if (temp < 10) requiredWarmth = ['cold', 'mild'];
    else if (temp < 20) requiredWarmth = ['mild', 'warm'];
    else requiredWarmth = ['warm', 'very_warm'];

    // 사용자 선호도 반영 (자주 입는 옷, 좋아하는 브랜드)
    const favoriteItems = wardrobe.filter(item => item.isFavorite);
    const frequentItems = wardrobe.filter(item => item.wearCount > 10);
    const preferredColors = user?.preferences?.favoriteColors || [];
    const preferredBrands = user?.preferences?.preferredBrands || [];

    const getScore = (item: ClothingItem) => {
      let score = 0;
      if (item.isFavorite) score += 3;
      if (item.wearCount > 10) score += 2;
      if (preferredColors.includes(item.color || '')) score += 2;
      if (preferredBrands.includes(item.brand || '')) score += 2;
      if (formalLevel.includes(item.formalness)) score += 3;
      if (preferredFits.includes(item.fit)) score += 1;
      if (requiredWarmth.includes(item.warmth)) score += 2;
      return score;
    };

    // 카테고리별 최적 아이템 선택
    const tops = wardrobe.filter(item => item.category === 'top').sort((a, b) => getScore(b) - getScore(a));
    const bottoms = wardrobe.filter(item => item.category === 'bottom').sort((a, b) => getScore(b) - getScore(a));
    const outers = wardrobe.filter(item => item.category === 'outer').sort((a, b) => getScore(b) - getScore(a));
    const shoes = wardrobe.filter(item => item.category === 'shoes').sort((a, b) => getScore(b) - getScore(a));

    const selectedItems: ClothingItem[] = [];
    if (tops.length > 0) selectedItems.push(tops[0]);
    if (bottoms.length > 0) selectedItems.push(bottoms[0]);
    if (temp < 15 && outers.length > 0) selectedItems.push(outers[0]);
    if (shoes.length > 0) selectedItems.push(shoes[0]);

    // 트렌드 스코어 계산 (다른 사용자들의 착용 빈도 기반 - 모킹)
    const trendScore = Math.floor(Math.random() * 100) + 1;

    return {
      situation,
      items: selectedItems,
      reason: getSituationReason(situation, selectedItems),
      trendScore
    };
  };

  const getSituationReason = (situation: OutfitRecommendation['situation'], items: ClothingItem[]): string => {
    const favoriteCount = items.filter(item => item.isFavorite).length;
    const brandMention = items.filter(item => item.brand).map(item => item.brand).join(', ');
    
    switch (situation) {
      case 'interview':
        return `면접에 적합한 정장 스타일로 추천드려요. ${favoriteCount > 0 ? '평소 자주 입으시는 ' : ''}${brandMention ? brandMention + ' 브랜드로 ' : ''}신뢰감 있는 코디입니다.`;
      case 'date':
        return `데이트에 완벽한 세미 포멀 룩이에요! ${favoriteCount > 0 ? '좋아하시는 ' : ''}아이템들로 멋스럽게 코디했어요.`;
      case 'exercise':
        return `운동하기 편한 캐주얼 룩으로 추천해요. 움직임이 자유로운 핏으로 선택했습니다.`;
      case 'party':
        return `파티에 어울리는 트렌디한 룩입니다! ${trendScore && trendScore > 80 ? '요즘 인기 많은 ' : ''}스타일이에요.`;
      default:
        return `일상에 편안한 룩으로 ${favoriteCount > 0 ? '자주 입으시는 ' : ''}아이템들을 활용했어요.`;
    }
  };

  // 트렌드 기반 추천 (다른 사용자들의 코디 히스토리 기반 - 모킹)
  const getTrendingOutfits = (): OutfitRecommendation[] => {
    const mockTrendingCombos = [
      { items: ['후드티', '청바지', '스니커즈'], popularity: 85 },
      { items: ['니트', '슬랙스', '로퍼'], popularity: 78 },
      { items: ['셔츠', '치노팬츠', '운동화'], popularity: 82 }
    ];

    return mockTrendingCombos.map((combo, index) => ({
      situation: 'daily' as const,
      items: wardrobe.filter(item => combo.items.some(trending => item.type.includes(trending))).slice(0, 3),
      reason: `요즘 ${combo.popularity}%의 사용자들이 선택하는 인기 코디예요!`,
      trendScore: combo.popularity
    }));
  };

  return {
    wardrobe,
    codiHistory,
    addItem,
    removeItem,
    toggleFavorite,
    addCodiHistory,
    getRecommendationBySituation,
    getTrendingOutfits
  };
};
