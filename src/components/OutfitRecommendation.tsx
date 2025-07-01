
import { Shirt, Umbrella } from "lucide-react";

interface OutfitData {
  top: string;
  bottom: string;
  outer: string;
  shoes: string;
  accessories: string[];
  tip: string;
}

interface OutfitProps {
  outfit: OutfitData;
}

const OutfitRecommendation = ({ outfit }: OutfitProps) => {
  const outfitItems = [
    { label: "상의", value: outfit.top, icon: "👕" },
    { label: "하의", value: outfit.bottom, icon: "👖" },
    { label: "겉옷", value: outfit.outer, icon: "🧥" },
    { label: "신발", value: outfit.shoes, icon: "👟" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center space-x-2 mb-6">
        <div className="bg-gradient-to-r from-orange-400 to-pink-400 rounded-full p-2">
          <Shirt className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">오늘의 코디 추천</h3>
      </div>
      
      <div className="space-y-4 mb-6">
        {outfitItems.map((item) => (
          <div key={item.label} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">{item.label}</p>
              <p className="text-lg font-semibold text-gray-800">{item.value}</p>
            </div>
          </div>
        ))}
        
        {outfit.accessories.length > 0 && (
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <span className="text-2xl">🎒</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">액세서리</p>
              <p className="text-lg font-semibold text-gray-800">
                {outfit.accessories.join(", ")}
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-4">
        <div className="flex items-start space-x-2">
          <span className="text-lg">💡</span>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">오늘의 팁</p>
            <p className="text-sm text-gray-600">{outfit.tip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitRecommendation;
