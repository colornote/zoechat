import React from 'react';
import { Box, Text, Button } from '@radix-ui/themes';
import { Scale, Question } from './interface';

interface ScaleTestProps {
    scale: Scale;
    currentQuestion: number;
    selectedAnswers: Map<string, string>;
    onAnswer: (questionId: string, optionId: string) => void;
}

const ScaleTest: React.FC<ScaleTestProps> = ({
    scale,
    currentQuestion,
    selectedAnswers,
    onAnswer,
}) => {
    const question = scale.questions[currentQuestion];
    const selectedOption = selectedAnswers.get(question.id);

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <Box className="bg-white rounded-lg shadow-lg p-6">
                <Text as="p" size="5" className="font-bold mb-4">
                    {scale.name}
                </Text>

                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <Text as="p" className="text-gray-600">
                            问题 {currentQuestion + 1}/{scale.questions.length}
                        </Text>
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div
                                className="h-full bg-blue-500 rounded-full transition-all"
                                style={{ width: `${((currentQuestion + 1) / scale.questions.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    <Text as="p" size="3" className="mb-6">
                        {question.content}
                    </Text>

                    <div className="space-y-3">
                        {question.options.map((option) => (
                            <Button
                                key={option.id}
                                onClick={() => onAnswer(question.id, option.id)}
                                variant={selectedOption === option.id ? "solid" : "soft"}
                                className={`w-full justify-start h-auto p-4 ${selectedOption === option.id
                                    ? 'bg-blue-50 border-blue-500'
                                    : 'hover:bg-gray-50'
                                    }`}
                            >
                                {option.content}
                            </Button>
                        ))}
                    </div>
                </div>
            </Box>
        </div>
    );
};

export default ScaleTest; 