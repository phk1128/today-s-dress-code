
import { useState } from 'react';
import { useWardrobe } from '../hooks/useWardrobe';
import { ClothingItem } from '../types/auth';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Plus, Trash2 } from 'lucide-react';

const WardrobeManager = () => {
  const { wardrobe, addItem, removeItem } = useWardrobe();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'top' as ClothingItem['category'],
    type: '',
    color: '',
    warmth: 'mild' as ClothingItem['warmth']
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
        warmth: 'mild'
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
                placeholder="예: 흰색 티셔츠"
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
              <Label htmlFor="color">색상</Label>
              <Input
                id="color"
                value={newItem.color}
                onChange={(e) => setNewItem({...newItem, color: e.target.value})}
                placeholder="예: 흰색"
              />
            </div>
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

          <div className="flex space-x-2">
            <Button type="submit" className="flex-1">추가</Button>
            <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>취소</Button>
          </div>
        </form>
      )}

      <div className="grid gap-3">
        {wardrobe.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-600">
                {categoryLabels[item.category]} • {item.type} • {warmthLabels[item.warmth]}
              </p>
              {item.color && <p className="text-xs text-gray-500">{item.color}</p>}
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
