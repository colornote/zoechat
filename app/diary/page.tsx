'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Diary {
  id: number
  title: string
  content: string
  created_at: string
}

export default function DiaryPage() {
  const router = useRouter()
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDiaries()
  }, [])

  const fetchDiaries = async () => {
    try {
      const response = await fetch('/be/api/diary', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch diaries')
      const data = await response.json()
      setDiaries(data.diaries)
    } catch (error) {
      console.error('获取日记列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>加载中...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 mb-8">
      <h1 className="text-3xl font-bold mb-4 text-center">我的日记</h1>
      <button className="mb-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#cc8d88] hover:bg-[#b47e79] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#cc8d88]" onClick={() => router.push('/diary/new')}>写日记</button>
      {diaries.length === 0 ? (
        <p>还没有日记，开始写第一篇吧！</p>
      ) : (
        <ul className="space-y-4">
          {diaries.map((diary) => (
            <li key={diary.id} className="bg-white border border-gray-300 rounded-lg shadow-md p-4 cursor-pointer hover:bg-gray-50" onClick={() => router.push(`/diary/${diary.id}`)}>
              <h2 className="text-xl font-semibold">{diary.title}</h2>
              <p className="text-gray-700 line-clamp-2">{diary.content}</p>
              <small className="text-gray-500">{new Date(diary.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
