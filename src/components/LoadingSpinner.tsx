
const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-orange-200 rounded-full animate-spin"></div>
        <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-lg font-medium text-gray-700 mb-2">날씨 확인 중...</p>
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
