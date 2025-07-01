import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Thermometer, Shirt, User, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useWardrobe } from "../hooks/useWardrobe";
import WeatherCard from "../components/WeatherCard";
import OutfitRecommendation from "../components/OutfitRecommendation";
import QuickActions from "../components/QuickActions";
import LoadingSpinner from "../components/LoadingSpinner";
import LoginForm from "../components/LoginForm";
import WardrobeManager from "../components/WardrobeManager";
import { Button } from "../components/ui/button";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  precipitation: number;
}

interface OutfitData {
  top: string;
  bottom: string;
  outer: string;
  shoes: string;
  accessories: string[];
  tip: string;
}

const Index = () => {
  const { user, logout } = useAuth();
  const { wardrobe } = useWardrobe();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [outfitData, setOutfitData] = useState<OutfitData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showWardrobe, setShowWardrobe] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("서울");

  // 지역별 날씨 데이터 - 실제로는 OpenWeatherMap API를 사용
  const mockWeatherByLocation: Record<string, WeatherData> = {
    "서울": {
      location: "서울",
      temperature: 18,
      condition: "흐림",
      humidity: 65,
      windSpeed: 3.2,
      feelsLike: 16,
      precipitation: 20
    },
    "경기도": {
      location: "경기도",
      temperature: 16,
      condition: "비",
      humidity: 85,
      windSpeed: 4.5,
      feelsLike: 14,
      precipitation: 80
    },
    "부산": {
      location: "부산",
      temperature: 22,
      condition: "맑음",
      humidity: 55,
      windSpeed: 2.8,
      feelsLike: 24,
      precipitation: 5
    },
    "대구": {
      location: "대구",
      temperature: 25,
      condition: "맑음",
      humidity: 45,
      windSpeed: 1.5,
      feelsLike: 27,
      precipitation: 0
    },
    "인천": {
      location: "인천",
      temperature: 17,
      condition: "흐림",
      humidity: 70,
      windSpeed: 5.2,
      feelsLike: 15,
      precipitation: 30
    }
  };

  const getPersonalizedOutfitRecommendation = (weather: WeatherData): OutfitData => {
    const temp = weather.temperature;
    const hasRain = weather.precipitation > 50;
    const isWindy = weather.windSpeed > 4;
    
    // 사용자의 옷장에서 적절한 옷 찾기
    const availableTops = wardrobe.filter(item => item.category === 'top');
    const availableBottoms = wardrobe.filter(item => item.category === 'bottom');
    const availableOuters = wardrobe.filter(item => item.category === 'outer');
    const availableShoes = wardrobe.filter(item => item.category === 'shoes');
    const availableAccessories = wardrobe.filter(item => item.category === 'accessory');

    // 온도에 따른 보온성 필터링
    let requiredWarmth: string[];
    if (temp < 5) {
      requiredWarmth = ['very_cold', 'cold'];
    } else if (temp < 10) {
      requiredWarmth = ['cold', 'mild'];
    } else if (temp < 20) {
      requiredWarmth = ['mild', 'warm'];
    } else {
      requiredWarmth = ['warm', 'very_warm'];
    }

    const suitableTops = availableTops.filter(item => requiredWarmth.includes(item.warmth));
    const suitableBottoms = availableBottoms.filter(item => requiredWarmth.includes(item.warmth));
    const suitableOuters = availableOuters.filter(item => 
      temp < 15 ? ['very_cold', 'cold', 'mild'].includes(item.warmth) : true
    );

    // 개인화된 추천 생성
    const recommendation: OutfitData = {
      top: suitableTops.length > 0 ? suitableTops[0].name : getGenericRecommendation(temp, 'top'),
      bottom: suitableBottoms.length > 0 ? suitableBottoms[0].name : getGenericRecommendation(temp, 'bottom'),
      outer: temp < 15 && suitableOuters.length > 0 ? suitableOuters[0].name : 
             temp < 15 ? getGenericRecommendation(temp, 'outer') : "필요없음",
      shoes: availableShoes.length > 0 ? availableShoes[0].name : getGenericRecommendation(temp, 'shoes'),
      accessories: [],
      tip: ""
    };

    // 액세서리 추천
    if (hasRain) {
      const umbrella = availableAccessories.find(item => item.name.includes('우산'));
      if (umbrella) {
        recommendation.accessories.push(umbrella.name);
      } else {
        recommendation.accessories.push('우산');
      }
    }

    if (temp < 10) {
      const scarf = availableAccessories.find(item => item.name.includes('목도리') || item.name.includes('머플러'));
      if (scarf) {
        recommendation.accessories.push(scarf.name);
      }
    }

    // 개인화된 팁 생성
    const hasPersonalItems = suitableTops.length > 0 || suitableBottoms.length > 0 || suitableOuters.length > 0;
    if (hasPersonalItems) {
      recommendation.tip = `${user?.name}님의 옷장에서 선택한 맞춤 코디예요! ${hasRain ? '비 소식이 있어 우산을 꼭 챙기세요 ☂️' : ''}`;
    } else {
      recommendation.tip = `옷장에 적절한 옷이 부족해요. 새로운 옷을 추가해보세요! ${hasRain ? '그리고 우산도 꼭 챙기세요 ☂️' : ''}`;
    }

    return recommendation;
  };

  const getGenericRecommendation = (temp: number, category: string): string => {
    // ... keep existing code (generic recommendation logic from original getOutfitRecommendation function)
    if (category === 'top') {
      if (temp < 5) return '기모 니트';
      if (temp < 10) return '두꺼운 니트';
      if (temp < 15) return '얇은 니트 또는 맨투맨';
      if (temp < 20) return '긴팔 셔츠';
      if (temp < 25) return '반팔 또는 얇은 긴팔';
      return '반팔 티셔츠';
    }
    if (category === 'bottom') {
      if (temp < 5) return '기모 바지';
      if (temp < 20) return '청바지 또는 면바지';
      return '반바지 또는 얇은 바지';
    }
    if (category === 'outer') {
      if (temp < 5) return '패딩 또는 두꺼운 코트';
      if (temp < 10) return '코트 또는 점퍼';
      if (temp < 15) return '가디건 또는 얇은 재킷';
      return '얇은 재킷 (선택사항)';
    }
    if (category === 'shoes') {
      return '운동화';
    }
    return '';
  };

  const handleGetRecommendation = async () => {
    setIsLoading(true);
    setShowRecommendation(false);
    
    setTimeout(() => {
      const currentWeather = mockWeatherByLocation[selectedLocation];
      setWeatherData(currentWeather);
      setOutfitData(getPersonalizedOutfitRecommendation(currentWeather));
      setIsLoading(false);
      setShowRecommendation(true);
    }, 1500);
  };

  const handleQuickQuestion = async (question: string) => {
    setIsLoading(true);
    setShowRecommendation(false);
    
    setTimeout(() => {
      const currentWeather = mockWeatherByLocation[selectedLocation];
      setWeatherData(currentWeather);
      const recommendation = getPersonalizedOutfitRecommendation(currentWeather);
      
      // 질문에 따른 맞춤 답변
      if (question.includes("반팔")) {
        recommendation.tip = currentWeather.temperature > 20 
          ? `네! ${user?.name}님 옷장의 반팔 입기 딱 좋은 날씨예요 👕` 
          : `아직 쌀쌀해요. ${user?.name}님 옷장의 긴팔을 추천드려요 🧥`;
      } else if (question.includes("우산")) {
        recommendation.tip = currentWeather.precipitation > 30 
          ? `${selectedLocation}에 비 소식이 있어요! 우산 꼭 챙기세요 ☂️` 
          : `${selectedLocation}은 비 걱정 없어요 ☀️`;
      } else if (question.includes("겉옷")) {
        recommendation.tip = currentWeather.temperature < 18 
          ? `${selectedLocation} 날씨가 쌀쌀해서 ${user?.name}님 옷장의 겉옷이 필요해요 🧥` 
          : `${selectedLocation}은 겉옷 없이도 괜찮을 것 같아요 ☀️`;
      }
      
      setOutfitData(recommendation);
      setIsLoading(false);
      setShowRecommendation(true);
    }, 1200);
  };

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              onClick={() => setShowWardrobe(!showWardrobe)}
              className="flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>내 옷장</span>
            </Button>
            
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full">
              <Shirt className="w-8 h-8 text-white" />
            </div>
            
            <Button
              variant="outline"
              onClick={logout}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>로그아웃</span>
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">안녕하세요, {user.name}님!</h1>
          <p className="text-gray-600">내 옷장 기반 맞춤 코디 추천</p>
        </div>

        {showWardrobe ? (
          <WardrobeManager />
        ) : (
          <>
            {/* 지역 선택 */}
            {!showRecommendation && (
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3 text-center">지역을 선택하세요</p>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(mockWeatherByLocation).map((location) => (
                    <button
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedLocation === location
                          ? "bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-md"
                          : "bg-white text-gray-700 border border-gray-200 hover:border-orange-200"
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 메인 버튼 */}
            {!showRecommendation && (
              <div className="mb-8">
                <button
                  onClick={handleGetRecommendation}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-400 to-pink-400 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
                >
                  {isLoading ? `${selectedLocation} 날씨 확인 중...` : `🧥 ${selectedLocation} 맞춤 코디 추천받기`}
                </button>
              </div>
            )}

            {/* 빠른 질문 버튼들 */}
            {!showRecommendation && (
              <QuickActions onQuickQuestion={handleQuickQuestion} isLoading={isLoading} />
            )}

            {/* 로딩 스피너 */}
            {isLoading && <LoadingSpinner />}

            {/* 결과 영역 */}
            {showRecommendation && weatherData && outfitData && (
              <div className="space-y-6">
                <WeatherCard weather={weatherData} />
                <OutfitRecommendation outfit={outfitData} />
                
                {/* 다시 추천받기 버튼 */}
                <button
                  onClick={() => setShowRecommendation(false)}
                  className="w-full bg-white text-gray-700 font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
                >
                  🔄 다시 추천받기
                </button>
              </div>
            )}
          </>
        )}

        {/* 푸터 */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>매일 아침 옷차림 고민 끝! 👔</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
