'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: number
  email: string
  username: string
  avatar: string
  is_admin: boolean
  created_at: string
  updated_at: string
}

interface UserStats {
  diary_count: number
}

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [params.id])

  const fetchUser = async () => {
    try {
      const response = await fetch(`/be/api/auth/users/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch user')
      const data = await response.json()
      setUser(data.user)
      setStats(data.stats)
    } catch (error) {
      console.error('获取用户详情失败:', error)
      router.push('/user')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>加载中...</div>
  }

  if (!user) {
    return <div>用户不存在</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-2">{user.username}</h2>
        <p className="mb-2">邮箱：{user.email}</p>
        <p className="mb-2">头像：<img src={user.avatar} alt="用户头像" className="w-20 h-20 rounded-full" /></p>
        <p className="text-gray-500">创建于 {new Date(user.created_at).toLocaleString()}</p>
        <p className="text-gray-500">更新于 {new Date(user.updated_at).toLocaleString()}</p>
        <p className="text-gray-500">日记数量：{stats?.diary_count || 0}</p>
        <button className="bg-gray-300 rounded-md px-4 py-2 mt-4" onClick={() => router.back()}>返回</button>
      </div>
    </div>
  )
}
