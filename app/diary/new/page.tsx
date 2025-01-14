'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewDiaryPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mood, setMood] = useState('')
  const [weather, setWeather] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      alert('请填写标题和内容')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/be/api/diary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title,
          content,
          mood: mood || undefined,
          weather: weather || undefined,
          is_private: true
        })
      })

      if (!response.ok) throw new Error('Failed to create diary')
      
      router.push('/diary')
      router.refresh()
    } catch (error) {
      console.error('创建日记失败:', error)
      alert('创建日记失败，请重试')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center">写日记</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">标题</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">内容</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2 w-full min-h-[200px] focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">心情</label>
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">天气</label>
            <input
              type="text"
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="mb-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#cc8d88] hover:bg-[#b47e79] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#cc8d88]" disabled={submitting}>{submitting ? '保存中...' : '保存'}</button>
            <button type="button" className="mb-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#f5f3f3] hover:bg-[#e0dede] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#cc8d88]" onClick={() => router.back()}>取消</button>
          </div>
        </form>
      </div>
    </div>
  )
}