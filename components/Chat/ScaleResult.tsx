import React from 'react';
import { Box, Text, Button } from '@radix-ui/themes';
import type { Scale, ScaleResult } from './interface';

interface ScaleResultProps {
    scale: Scale;
    result: ScaleResult;
    onRetake: () => void;
    onClose: () => void;
}

const ScaleResult: React.FC<ScaleResultProps> = ({
    scale,
    result,
    onRetake,
    onClose,
}) => {
    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <Box className="bg-white rounded-lg shadow-lg p-6">
                <Text size="5" className="font-bold mb-4">
                    {scale.name} - 测试结果
                </Text>

                <div className="mb-6">
                    <div className={`text-lg font-semibold mb-2 ${result.level === 'low' ? 'text-green-600' :
                        result.level === 'medium' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                        得分: {result.totalScore}
                    </div>
                    <Text className="text-gray-700 mb-4">
                        {result.analysis}
                    </Text>
                </div>

                <div className="mb-6">
                    <Text size="3" className="font-semibold mb-2">
                        建议:
                    </Text>
                    <ul className="list-disc pl-5 space-y-2">
                        {result.recommendations.map((rec, index) => (
                            <li key={index} className="text-gray-700">
                                {rec}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex gap-3">
                    <Button onClick={onRetake} variant="soft">
                        重新测试
                    </Button>
                    <Button onClick={onClose} variant="surface">
                        返回
                    </Button>
                </div>
            </Box>
        </div>
    );
};

export default ScaleResult; 