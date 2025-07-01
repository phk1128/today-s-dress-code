
import { Cloud, Sun, CloudRain, Thermometer } from "lucide-react";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  precipitation: number;
}

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  const getWeatherIcon = (condition: string) => {
    if (condition.includes("비") || condition.includes("rain")) {
      return <CloudRain className="w-8 h-8 text-blue-500" />;
    } else if (condition.includes("흐림") || condition.includes("구름")) {
      return <Cloud className="w-8 h-8 text-gray-500" />;
    } else {
      return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  const getBackgroundColor = (condition: string) => {
    if (condition.includes("비")) {
      return "from-blue-100 to-blue-50";
    } else if (condition.includes("흐림")) {
      return "from-gray-100 to-gray-50";
    } else {
      return "from-yellow-100 to-orange-50";
    }
  };

  return (
    <div className={`bg-gradient-to-r ${getBackgroundColor(weather.condition)} rounded-2xl p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">현재 날씨</h3>
          <p className="text-sm text-gray-600">{weather.location}</p>
        </div>
        {getWeatherIcon(weather.condition)}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Thermometer className="w-5 h-5 text-red-500" />
          <div>
            <p className="text-2xl font-bold text-gray-800">{weather.temperature}°C</p>
            <p className="text-xs text-gray-600">체감 {weather.feelsLike}°C</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-lg font-medium text-gray-700">{weather.condition}</p>
          <p className="text-sm text-gray-600">습도 {weather.humidity}%</p>
        </div>
      </div>
      
      <div className="flex justify-between text-sm text-gray-600">
        <span>바람: {weather.windSpeed}m/s</span>
        <span>강수확률: {weather.precipitation}%</span>
      </div>
    </div>
  );
};

export default WeatherCard;
