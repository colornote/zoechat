'use client'

import React, { useEffect } from 'react'
import { useState } from 'react'
import type { Scale, ScaleResult } from './interface'
import ScaleContext from './scaleContext'

export function ScaleProvider({ children, scales }: { children: React.ReactNode, scales: Scale[] }) {
    const [currentScale, setCurrentScale] = useState<Scale | null>(null)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Map<string, string>>(new Map())
    const [showResult, setShowResult] = useState(false)
    const [testResult, setTestResult] = useState<ScaleResult | null>(null)
    const [showTest, setShowTest] = useState(false)

    useEffect(() => {
        if (scales.length > 0 && !currentScale) {
            startTest(scales[0])
        }
    }, [scales])

    const startTest = (scale: Scale) => {
        setCurrentScale(scale)
        setCurrentQuestion(0)
        setAnswers(new Map())
        setShowResult(false)
        setTestResult(null)
        setShowTest(true)
    }

    const closeTest = () => {
        setCurrentScale(null)
        setShowTest(false)
        setShowResult(false)
    }

    const handleAnswer = (questionId: string, optionId: string) => {
        setAnswers(prev => {
            const newAnswers = new Map(prev)
            newAnswers.set(questionId, optionId)
            return newAnswers
        })

        if (currentScale) {
            if (currentQuestion < currentScale.questions.length - 1) {
                setCurrentQuestion(prev => prev + 1)
            } else {
                const result = currentScale.getResult?.(answers, currentScale.questions)
                if (result) {
                    setTestResult(result)
                    setShowResult(true)
                }
            }
        }
    }

    const retakeTest = () => {
        setCurrentQuestion(0)
        setAnswers(new Map())
        setShowResult(false)
        setTestResult(null)
    }

    return (
        <ScaleContext.Provider
            value={{
                currentScale,
                currentQuestion,
                answers,
                showResult,
                testResult,
                showTest,
                sacleList: scales,
                startTest,
                handleAnswer,
                retakeTest,
                closeTest,
                selectedAnswers: answers,
            }}
        >
            {children}
        </ScaleContext.Provider>
    )
} 