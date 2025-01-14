'use client'

import { useState, useEffect } from 'react'
import { ArrowLeftIcon, CalendarIcon, EnvelopeClosedIcon, PersonIcon, FileTextIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { FaUser } from 'react-icons/fa'
import AdminLayout from '../../AdminLayout'

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
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full size-8 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!user) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-gray-900">用户不存在</h2>
            <button
              onClick={() => router.back()}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-tomato-600 hover:bg-tomato-700"
            >
              <ArrowLeftIcon className="mr-2 size-4" />
              返回用户列表
            </button>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-3xl mx-auto">
          {/* 返回按钮 */}
          <button
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tomato-500"
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            返回用户列表
          </button>

          {/* 用户信息卡片 */}
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg overflow-hidden">
            {/* 顶部个人信息区域 */}
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center">
                <div className="shrink-0">
                  {user.avatar ? (
                    <img
                      className="size-20 rounded-full object-cover border-4 border-white shadow-lg"
                      src={user.avatar}
                      alt={user.username}
                    />
                  ) : (
                    <div className="size-20 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-lg">
                      <FaUser className="size-10 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="ml-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    {user.username || '未设置用户名'}
                    {user.is_admin && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-tomato-100 text-tomato-800">
                        管理员
                      </span>
                    )}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">ID: {user.id}</p>
                </div>
              </div>
            </div>

            {/* 详细信息列表 */}
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <EnvelopeClosedIcon className="mr-2 size-4" />
                    电子邮箱
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.email}</dd>
                </div>

                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <FileTextIcon className="mr-2 size-4" />
                    日记数量
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {stats?.diary_count || 0} 篇
                  </dd>
                </div>

                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <CalendarIcon className="mr-2 size-4" />
                    注册时间
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {new Date(user.created_at).toLocaleString()}
                  </dd>
                </div>

                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <CalendarIcon className="mr-2 size-4" />
                    最后更新
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {new Date(user.updated_at).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
