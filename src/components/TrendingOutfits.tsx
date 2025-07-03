
import { useState, useEffect } from 'react';
import { useWardrobe } from '../hooks/useWardrobe';
import { Button } from './ui/button';
import { Shirt } from 'lucide-react';

const TrendingOutfits = () => {
  const { getTrendingOutfits } = useWardrobe();
  const [trendingOutfits, setTrendingOutfits] = useState([]);

  useEffect(() => {
    setTrendingOutfits(getTrendingOutfits());
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-full p-2">
          <Shirt className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">요즘 트렌드 코디</h3>
      </div>
      
      <div className="space-y-3">
        {trendingOutfits.map((outfit, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800">인기 코디 #{index + 1}</h4>
              <div className="flex items-center space-x-1">
                <span className="text-sm text-purple-600 font-medium">🔥 {outfit.trendScore}%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              {outfit.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center space-x-2 text-sm">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span className="text-gray-700">{item.name}</span>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-gray-600 mt-2">{outfit.reason}</p>
          </div>
        ))}
      </div>
      
      <div className="text-center text-xs text-gray-500">
        <p>💡 다른 사용자들의 코디 데이터를 기반으로 한 추천이에요!</p>
      </div>
    </div>
  );
};

export default TrendingOutfits;
