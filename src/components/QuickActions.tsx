
interface QuickActionsProps {
  onQuickQuestion: (question: string) => void;
  isLoading: boolean;
}

const QuickActions = ({ onQuickQuestion, isLoading }: QuickActionsProps) => {
  const quickQuestions = [
    { text: "반팔 입어도 될까?", emoji: "👕" },
    { text: "우산 챙겨야 해?", emoji: "☂️" },
    { text: "겉옷 필요해?", emoji: "🧥" },
  ];

  return (
    <div className="space-y-3">
      <p className="text-center text-sm text-gray-600 mb-4">또는 빠른 질문하기</p>
      
      {quickQuestions.map((question) => (
        <button
          key={question.text}
          onClick={() => onQuickQuestion(question.text)}
          disabled={isLoading}
          className="w-full bg-white text-gray-700 font-medium py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="mr-2">{question.emoji}</span>
          {question.text}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
