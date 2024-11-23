'use client'

import { createContext } from 'react'
import { Scale, ScaleResult } from './interface'

interface ScaleContextProps {
    currentScale: Scale | null
    currentQuestion: number
    answers: Map<string, string>
    showResult: boolean
    testResult: ScaleResult | null
    showTest: boolean
    sacleList: Scale[]
    startTest: (scale: Scale) => void
    handleAnswer: (questionId: string, optionId: string) => void
    retakeTest: () => void
    closeTest: () => void
    selectedAnswers: Map<string, string>
}

const ScaleContext = createContext<ScaleContextProps>({
    currentScale: null,
    currentQuestion: 0,
    answers: new Map(),
    showResult: false,
    testResult: null,
    showTest: false,
    sacleList: [],
    startTest: () => { },
    handleAnswer: () => { },
    retakeTest: () => { },
    closeTest: () => { },
    selectedAnswers: new Map(),
})

export default ScaleContext 