'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '../AdminLayout';

interface User {
  id: number
  email: string
  username: string
  avatar: string
  created_at: string
  updated_at: string
}

export default function UserListPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(10)

  useEffect(() => {
    fetchUsers()
  }, [page, search])

  const fetchUsers = async () => {
    try {
      const response = await fetch(`/be/api/auth/users?page=${page}&limit=${limit}&search=${search}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data.users)
    } catch (error) {
      console.error('获取用户列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>加载中...</div>
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">用户管理</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索用户"
          className="border border-gray-300 rounded-md p-2 mb-4 w-full"
        />
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
              <div className="flex items-center">
                <img src={user.avatar} alt="用户头像" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <h2 className="text-xl font-semibold">{user.username}</h2>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              </div>
              <button className="mt-2 text-blue-600 hover:underline" onClick={() => router.push(`/user/${user.id}`)}>查看详情</button>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  )
}
