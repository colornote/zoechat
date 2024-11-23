import type { Scale } from './interface'

// 抑郁量表
const depressionScale: Scale = {
    id: 'depression',
    name: '抑郁自评量表',
    description: '用于评估个人抑郁程度的简单测试',
    questions: [
        {
            id: 'd1',
            content: '过去一周内，我感到心情低落',
            options: [
                { id: 'd1_0', content: '很少或根本没有', score: 0 },
                { id: 'd1_1', content: '有时候', score: 1 },
                { id: 'd1_2', content: '经常', score: 2 },
                { id: 'd1_3', content: '大部分或全部时间', score: 3 },
            ],
        },
        {
            id: 'd2',
            content: '过去一周内，我对事物失去了兴趣',
            options: [
                { id: 'd2_0', content: '很少或根本没有', score: 0 },
                { id: 'd2_1', content: '有时候', score: 1 },
                { id: 'd2_2', content: '经常', score: 2 },
                { id: 'd2_3', content: '大部分或全部时间', score: 3 },
            ],
        },
        {
            id: 'd3',
            content: '过去一周内，我感到疲倦或没有精力',
            options: [
                { id: 'd3_0', content: '很少或根本没有', score: 0 },
                { id: 'd3_1', content: '有时候', score: 1 },
                { id: 'd3_2', content: '经常', score: 2 },
                { id: 'd3_3', content: '大部分或全部时间', score: 3 },
            ],
        },
    ],
    getResult: (answers: Map<string, string>, questions) => {
        let totalScore = 0
        questions.forEach(question => {
            const answerId = answers.get(question.id)
            const selectedOption = question.options.find(opt => opt.id === answerId)
            if (selectedOption) {
                totalScore += selectedOption.score
            }
        })

        let level: 'low' | 'medium' | 'high'
        let analysis = ''
        let recommendations: string[] = []

        if (totalScore <= 3) {
            level = 'low'
            analysis = '您的抑郁风险较低'
            recommendations = ['保持积极乐观的生活态度', '继续保持良好的生活习惯']
        } else if (totalScore <= 6) {
            level = 'medium'
            analysis = '您可能存在轻度抑郁倾向'
            recommendations = ['建议增加运动量', '保持规律的作息时间', '如有需要可以寻求心理咨询']
        } else {
            level = 'high'
            analysis = '您可能存在较严重的抑郁倾向'
            recommendations = ['建议及时寻求专业心理医生的帮助', '与家人朋友多交流沟通', '保持规律的生活作息']
        }

        return { totalScore, analysis, level, recommendations }
    }
}

// 焦虑量表
const anxietyScale: Scale = {
    id: 'anxiety',
    name: '焦虑自评量表',
    description: '用于评估个人焦虑程度的简单测试',
    questions: [
        {
            id: 'a1',
            content: '过去一周内，我感到紧张或焦虑',
            options: [
                { id: 'a1_0', content: '很少或根本没有', score: 0 },
                { id: 'a1_1', content: '有时候', score: 1 },
                { id: 'a1_2', content: '经常', score: 2 },
                { id: 'a1_3', content: '大部分或全部时间', score: 3 },
            ],
        },
        {
            id: 'a2',
            content: '过去一周内，我无缘无故感到害怕',
            options: [
                { id: 'a2_0', content: '很少或根本没有', score: 0 },
                { id: 'a2_1', content: '有时候', score: 1 },
                { id: 'a2_2', content: '经常', score: 2 },
                { id: 'a2_3', content: '大部分或全部时间', score: 3 },
            ],
        },
        {
            id: 'a3',
            content: '过去一周内，我容易心烦意乱',
            options: [
                { id: 'a3_0', content: '很少或根本没有', score: 0 },
                { id: 'a3_1', content: '有时候', score: 1 },
                { id: 'a3_2', content: '经常', score: 2 },
                { id: 'a3_3', content: '大部分或全部时间', score: 3 },
            ],
        },
    ],
    getResult: (answers: Map<string, string>, questions) => {
        let totalScore = 0
        questions.forEach(question => {
            const answerId = answers.get(question.id)
            const selectedOption = question.options.find(opt => opt.id === answerId)
            if (selectedOption) {
                totalScore += selectedOption.score
            }
        })

        let level: 'low' | 'medium' | 'high'
        let analysis = ''
        let recommendations: string[] = []

        if (totalScore <= 3) {
            level = 'low'
            analysis = '您的焦虑水平在正常范围内'
            recommendations = ['继续保持良好的心态', '培养健康的生活方式']
        } else if (totalScore <= 6) {
            level = 'medium'
            analysis = '您可能存在轻度焦虑'
            recommendations = ['学习放松技巧', '适当运动', '保持充足睡眠']
        } else {
            level = 'high'
            analysis = '您可能存在较严重的焦虑'
            recommendations = ['建议寻求专业心理咨询', '学习呼吸放松法', '规律作息，适量运动']
        }

        return { totalScore, analysis, level, recommendations }
    }
}

// 压力量表
const stressScale: Scale = {
    id: 'stress',
    name: '压力自评量表',
    description: '用于评估个人压力水平的简单测试',
    questions: [
        {
            id: 's1',
            content: '过去一周内，我感到压力很大',
            options: [
                { id: 's1_0', content: '很少或根本没有', score: 0 },
                { id: 's1_1', content: '有时候', score: 1 },
                { id: 's1_2', content: '经常', score: 2 },
                { id: 's1_3', content: '大部分或全部时间', score: 3 },
            ],
        },
        {
            id: 's2',
            content: '过去一周内，我感到难以应对生活中的事情',
            options: [
                { id: 's2_0', content: '很少或根本没有', score: 0 },
                { id: 's2_1', content: '有时候', score: 1 },
                { id: 's2_2', content: '经常', score: 2 },
                { id: 's2_3', content: '大部分或全部时间', score: 3 },
            ],
        },
        {
            id: 's3',
            content: '过去一周内，我感到无法控制重要事情',
            options: [
                { id: 's3_0', content: '很少或根本没有', score: 0 },
                { id: 's3_1', content: '有时候', score: 1 },
                { id: 's3_2', content: '经常', score: 2 },
                { id: 's3_3', content: '大部分或全部时间', score: 3 },
            ],
        },
    ],
    getResult: (answers: Map<string, string>, questions) => {
        let totalScore = 0
        questions.forEach(question => {
            const answerId = answers.get(question.id)
            const selectedOption = question.options.find(opt => opt.id === answerId)
            if (selectedOption) {
                totalScore += selectedOption.score
            }
        })

        let level: 'low' | 'medium' | 'high'
        let analysis = ''
        let recommendations: string[] = []

        if (totalScore <= 3) {
            level = 'low'
            analysis = '您的压力水平在正常范围内'
            recommendations = ['继续保持良好的压力管理', '培养积极的生活态度']
        } else if (totalScore <= 6) {
            level = 'medium'
            analysis = '您可能承受着中等程度的压力'
            recommendations = ['学习时间管理技巧', '培养兴趣爱好', '适当运动放松']
        } else {
            level = 'high'
            analysis = '您可能承受着较大的压力'
            recommendations = ['建议寻求专业帮助', '学习压力管理技巧', '与亲友分享交流']
        }

        return { totalScore, analysis, level, recommendations }
    }
}

export const DefaultScales: Scale[] = [
    depressionScale,
    anxietyScale,
    stressScale
] 