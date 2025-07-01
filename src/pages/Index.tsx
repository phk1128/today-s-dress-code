
import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Thermometer, Shirt } from "lucide-react";
import WeatherCard from "../components/WeatherCard";
import OutfitRecommendation from "../components/OutfitRecommendation";
import QuickActions from "../components/QuickActions";
import LoadingSpinner from "../components/LoadingSpinner";

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
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [outfitData, setOutfitData] = useState<OutfitData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
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

  const getOutfitRecommendation = (weather: WeatherData): OutfitData => {
    const temp = weather.temperature;
    const hasRain = weather.precipitation > 50;
    const isWindy = weather.windSpeed > 4;
    
    if (temp < 5) {
      return {
        top: "기모 니트",
        bottom: "기모 바지",
        outer: "패딩 또는 두꺼운 코트",
        shoes: hasRain ? "방수 부츠" : "부츠",
        accessories: hasRain ? ["목도리", "우산", "장갑"] : ["목도리", "장갑"],
        tip: `매우 추우니 보온에 신경쓰세요! ${hasRain ? "비도 오니 우산 필수!" : ""}`
      };
    } else if (temp < 10) {
      return {
        top: "두꺼운 니트",
        bottom: "청바지 또는 면바지",
        outer: "코트 또는 점퍼",
        shoes: hasRain ? "방수 운동화" : "운동화 또는 부츠",
        accessories: hasRain ? ["우산", "머플러"] : isWindy ? ["머플러", "모자"] : ["머플러"],
        tip: `쌀쌀하니 겉옷은 필수예요! ${hasRain ? "비 소식이 있어 우산을 꼭 챙기세요." : ""}`
      };
    } else if (temp < 15) {
      return {
        top: "얇은 니트 또는 맨투맨",
        bottom: "청바지",
        outer: "가디건 또는 얇은 재킷",
        shoes: hasRain ? "방수 스니커즈" : "스니커즈",
        accessories: hasRain ? ["우산"] : isWindy ? ["가벼운 스카프"] : [],
        tip: `일교차가 클 수 있어요. ${hasRain ? "비가 와서 우산과 가벼운 겉옷 추천!" : "가벼운 겉옷 추천!"}`
      };
    } else if (temp < 20) {
      return {
        top: "긴팔 셔츠",
        bottom: "면바지 또는 청바지",
        outer: hasRain ? "방수 재킷" : "얇은 재킷 (선택사항)",
        shoes: hasRain ? "방수 신발" : "스니커즈",
        accessories: hasRain ? ["우산"] : [],
        tip: `완벽한 날씨! ${hasRain ? "다만 비 소식이 있어 우산을 준비하세요." : "가벼운 겉옷 정도면 충분해요."}`
      };
    } else if (temp < 25) {
      return {
        top: "반팔 또는 얇은 긴팔",
        bottom: "면바지 또는 청바지",
        outer: hasRain ? "얇은 방수 재킷" : "필요없음",
        shoes: hasRain ? "방수 스니커즈" : "스니커즈 또는 샌들",
        accessories: hasRain ? ["우산"] : ["선글라스"],
        tip: `선선하고 좋은 날씨예요! ${hasRain ? "비 예보가 있어 우산만 챙기시면 돼요." : ""}`
      };
    } else {
      return {
        top: "반팔 티셔츠",
        bottom: "반바지 또는 얇은 바지",
        outer: hasRain ? "얇은 방수 재킷" : "필요없음",
        shoes: hasRain ? "방수 샌들" : "샌들 또는 통풍 좋은 신발",
        accessories: hasRain ? ["우산", "선글라스"] : ["선글라스", "모자"],
        tip: `더우니 통풍 좋은 옷을 입으세요! ${hasRain ? "소나기 가능성이 있어 우산을 챙기세요." : ""}`
      };
    }
  };

  const handleGetRecommendation = async () => {
    setIsLoading(true);
    setShowRecommendation(false);
    
    // Mock API 호출 시뮬레이션
    setTimeout(() => {
      const currentWeather = mockWeatherByLocation[selectedLocation];
      setWeatherData(currentWeather);
      setOutfitData(getOutfitRecommendation(currentWeather));
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
      const recommendation = getOutfitRecommendation(currentWeather);
      
      // 질문에 따른 맞춤 답변
      if (question.includes("반팔")) {
        recommendation.tip = currentWeather.temperature > 20 
          ? "네! 반팔 입기 딱 좋은 날씨예요 👕" 
          : "아직 쌀쌀해요. 긴팔을 추천드려요 🧥";
      } else if (question.includes("우산")) {
        recommendation.tip = currentWeather.precipitation > 30 
          ? `${selectedLocation}에 비 소식이 있어요! 우산 꼭 챙기세요 ☂️` 
          : `${selectedLocation}은 비 걱정 없어요 ☀️`;
      } else if (question.includes("겉옷")) {
        recommendation.tip = currentWeather.temperature < 18 
          ? `${selectedLocation} 날씨가 쌀쌀해서 겉옷이 필요해요 🧥` 
          : `${selectedLocation}은 겉옷 없이도 괜찮을 것 같아요 ☀️`;
      }
      
      setOutfitData(recommendation);
      setIsLoading(false);
      setShowRecommendation(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full mb-4">
            <Shirt className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">오늘 뭐 입지?</h1>
          <p className="text-gray-600">날씨 기반 옷차림 추천 서비스</p>
        </div>

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
              {isLoading ? `${selectedLocation} 날씨 확인 중...` : `🧥 ${selectedLocation} 오늘 뭐 입지?`}
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

        {/* 푸터 */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>매일 아침 옷차림 고민 끝! 👔</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
