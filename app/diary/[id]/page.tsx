'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Diary {
  id: number
  title: string
  content: string
  mood?: string
  weather?: string
  created_at: string
  updated_at: string
}

export default function DiaryDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [diary, setDiary] = useState<Diary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDiary()
  }, [params.id])

  const fetchDiary = async () => {
    try {
      const response = await fetch(`/be/api/diary/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch diary')
      const data = await response.json()
      setDiary(data.diary)
    } catch (error) {
      console.error('获取日记详情失败:', error)
      router.push('/diary')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/be/api/diary/${params.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!response.ok) throw new Error('Failed to delete diary')
      
      router.push('/diary')
      router.refresh()
    } catch (error) {
      console.error('删除日记失败:', error)
      alert('删除日记失败，请重试')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <p>加载中...</p>
      </div>
    )
  }

  if (!diary) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <p>日记不存在</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-2">{diary.title}</h2>
        <p className="mb-2">{diary.content}</p>
        <p className="text-gray-500">心情：{diary.mood || '无'}</p>
        <p className="text-gray-500">天气：{diary.weather || '无'}</p>
        <p className="text-gray-500">创建于 {formatDate(diary.created_at)}</p>
        <div className="flex gap-3 mt-4">
          <button className="mb-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#cc8d88] hover:bg-[#b47e79] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#cc8d88]  " onClick={handleDelete}>删除</button>
          <button className="mb-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#cc8d88] hover:bg-[#b47e79] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#cc8d88]" onClick={() => router.back()}>返回</button>
        </div>
      </div>
    </div>
  )
}
