
import { useState } from 'react';
import { useWardrobe } from '../hooks/useWardrobe';
import { ClothingItem } from '../types/auth';
import { Button } from './ui/button';
import { Input } from './ui/input';  
import { Label } from './ui/label';
import { Plus, Trash2, Heart, HeartIcon } from 'lucide-react';

const WardrobeManager = () => {
  const { wardrobe, addItem, removeItem, toggleFavorite } = useWardrobe();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'top' as ClothingItem['category'],
    type: '',
    color: '',
    brand: '',
    graphic: '',
    fit: 'regular' as ClothingItem['fit'],
    warmth: 'mild' as ClothingItem['warmth'],
    formalness: 'casual' as ClothingItem['formalness']
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.name && newItem.type) {
      addItem(newItem);
      setNewItem({
        name: '',
        category: 'top',
        type: '',
        color: '',
        brand: '',
        graphic: '',
        fit: 'regular',
        warmth: 'mild',
        formalness: 'casual'
      });
      setShowAddForm(false);
    }
  };

  const categoryLabels = {
    top: '상의',
    bottom: '하의',
    outer: '겉옷',
    shoes: '신발',
    accessory: '액세서리'
  };

  const warmthLabels = {
    very_cold: '매우 추움용',
    cold: '추움용',
    mild: '보통',
    warm: '따뜻함용',
    very_warm: '매우 더움용'
  };

  const formalLabels = {
    very_casual: '매우 캐주얼',
    casual: '캐주얼',
    semi_formal: '세미 포멀',
    formal: '포멀',
    very_formal: '매우 포멀'
  };

  const fitLabels = {
    tight: '타이트',
    regular: '레귤러',
    loose: '루즈',
    oversized: '오버사이즈'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">내 옷장</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-orange-400 to-pink-400"
        >
          <Plus className="w-4 h-4 mr-2" />
          옷 추가
        </Button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddItem} className="bg-white p-4 rounded-xl shadow-md space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">옷 이름</Label>  
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                placeholder="예: 유니클로 흰색 티셔츠"
                required
              />
            </div>
            <div>
              <Label htmlFor="category">카테고리</Label>
              <select
                id="category"
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value as ClothingItem['category']})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">종류</Label>
              <Input
                id="type"
                value={newItem.type}
                onChange={(e) => setNewItem({...newItem, type: e.target.value})}
                placeholder="예: 반팔 티셔츠"
                required
              />
            </div>
            <div>
              <Label htmlFor="brand">브랜드</Label>
              <Input
                id="brand"
                value={newItem.brand}
                onChange={(e) => setNewItem({...newItem, brand: e.target.value})}
                placeholder="예: 유니클로"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="color">색상</Label>
              <Input
                id="color"
                value={newItem.color}
                onChange={(e) => setNewItem({...newItem, color: e.target.value})}
                placeholder="예: 흰색"
              />
            </div>
            <div>
              <Label htmlFor="graphic">그래픽/패턴</Label>
              <Input
                id="graphic"
                value={newItem.graphic}
                onChange={(e) => setNewItem({...newItem, graphic: e.target.value})}
                placeholder="예: 로고, 체크무늬"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="fit">핏</Label>
              <select
                id="fit"
                value={newItem.fit}
                onChange={(e) => setNewItem({...newItem, fit: e.target.value as ClothingItem['fit']})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {Object.entries(fitLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="warmth">보온성</Label>
              <select
                id="warmth"
                value={newItem.warmth}
                onChange={(e) => setNewItem({...newItem, warmth: e.target.value as ClothingItem['warmth']})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {Object.entries(warmthLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="formalness">격식</Label>
              <select
                id="formalness"
                value={newItem.formalness}
                onChange={(e) => setNewItem({...newItem, formalness: e.target.value as ClothingItem['formalness']})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {Object.entries(formalLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button type="submit" className="flex-1">추가</Button>
            <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>취소</Button>
          </div>
        </form>
      )}

      <div className="grid gap-3">
        {wardrobe.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(item.id)}
                    className="p-1"
                  >
                    {item.isFavorite ? (
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    ) : (
                      <HeartIcon className="w-4 h-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  {categoryLabels[item.category]} • {item.type} • {formalLabels[item.formalness]}
                </p>
                <div className="text-xs text-gray-500 space-y-1">
                  {item.brand && <p>브랜드: {item.brand}</p>}
                  {item.color && <p>색상: {item.color}</p>}
                  {item.graphic && <p>패턴: {item.graphic}</p>}
                  <p>핏: {fitLabels[item.fit]} • 보온성: {warmthLabels[item.warmth]}</p>
                  <p>착용 횟수: {item.wearCount}회 {item.isFavorite && '• ❤️ 즐겨찾기'}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {wardrobe.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>아직 등록된 옷이 없습니다.</p>
          <p className="text-sm">옷을 추가해서 맞춤 추천을 받아보세요!</p>
        </div>
      )}
    </div>
  );
};

export default WardrobeManager;
