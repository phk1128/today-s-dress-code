
import { Button } from './ui/button';

interface SituationSelectorProps {
  onSituationSelect: (situation: string) => void;
  isLoading: boolean;
}

const SituationSelector = ({ onSituationSelect, isLoading }: SituationSelectorProps) => {
  const situations = [
    { key: 'daily', label: '일상', emoji: '👕', color: 'from-blue-400 to-blue-500' },
    { key: 'date', label: '데이트', emoji: '💕', color: 'from-pink-400 to-pink-500' },
    { key: 'interview', label: '면접', emoji: '💼', color: 'from-gray-600 to-gray-700' },
    { key: 'school', label: '등교', emoji: '🎒', color: 'from-green-400 to-green-500' },
    { key: 'exercise', label: '운동', emoji: '💪', color: 'from-orange-400 to-orange-500' },
    { key: 'party', label: '파티', emoji: '🎉', color: 'from-purple-400 to-purple-500' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 text-center">어떤 상황인가요?</h3>
      <div className="grid grid-cols-2 gap-3">
        {situations.map((situation) => (
          <Button
            key={situation.key}
            onClick={() => onSituationSelect(situation.key)}
            disabled={isLoading}
            className={`bg-gradient-to-r ${situation.color} text-white font-medium py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50`}
          >
            <span className="mr-2">{situation.emoji}</span>
            {situation.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SituationSelector;
