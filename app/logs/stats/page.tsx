'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '../../AdminLayout'
import Link from 'next/link'

interface Stats {
  total_requests: number;
  unique_users: number;
  unique_ips: number;
  avg_duration: number;
  status_codes: { status_code: number; count: number }[];
  top_paths: { path: string; count: number }[];
}

export default function LogStatsPage() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/be/api/logs/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('获取访问统计信息失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: number) => {
    if (status >= 500) return 'text-red-600 bg-red-50'
    if (status >= 400) return 'text-orange-600 bg-orange-50'
    if (status >= 300) return 'text-blue-600 bg-blue-50'
    if (status >= 200) return 'text-green-600 bg-green-50'
    return 'text-gray-600 bg-gray-50'
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="sm:flex sm:items-center sm:justify-between mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-gray-900">访问统计信息</h1>
              <Link 
                href="/logs" 
                className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-tomato-700 bg-tomato-50 rounded-full hover:bg-tomato-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                返回日志列表
              </Link>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">总请求数</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats?.total_requests}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">唯一用户数</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats?.unique_users}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">唯一IP数</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats?.unique_ips}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">平均请求时长</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats?.avg_duration} ms</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Codes & Top Paths */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">状态码统计</h2>
              <div className="space-y-3">
                {stats?.status_codes.map((status) => (
                  <div key={status.status_code} className="flex items-center">
                    <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(status.status_code)}`}>
                      {status.status_code}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <div
                            className="bg-tomato-600 h-2 rounded-full"
                            style={{ width: `${(status.count / stats.total_requests) * 100}%` }}
                          />
                        </div>
                        <span className="ml-2 text-sm text-gray-500">{status.count} 次</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">热门路径</h2>
              <div className="space-y-3">
                {stats?.top_paths.map((path, index) => (
                  <div key={path.path} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                      {index + 1}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 truncate" title={path.path}>
                            {path.path}
                          </div>
                          <div className="flex items-center mt-1">
                            <div className="flex-1 bg-gray-100 rounded-full h-2">
                              <div
                                className="bg-tomato-600 h-2 rounded-full"
                                style={{ width: `${(path.count / stats.total_requests) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <span className="ml-2 text-sm text-gray-500">{path.count} 次</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
