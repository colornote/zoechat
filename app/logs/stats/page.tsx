'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LogStatsPage() {
  const router = useRouter()
  const [stats, setStats] = useState(null)
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

  if (loading) {
    return <div>加载中...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">访问统计信息</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p><strong>总请求数:</strong> {stats?.total_requests}</p>
        <p><strong>唯一IP数:</strong> {stats?.unique_ips}</p>
        <p><strong>唯一用户数:</strong> {stats?.unique_users}</p>
        <p><strong>平均请求时长:</strong> {stats?.avg_duration} ms</p>
        <h2 className="text-xl font-semibold mt-4">状态码统计</h2>
        <ul>
          {stats?.status_codes.map((status) => (
            <li key={status.status_code}>状态码 {status.status_code}: {status.count} 次</li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mt-4">热门路径</h2>
        <ul>
          {stats?.top_paths.map((path) => (
            <li key={path.path}>路径 {path.path}: {path.count} 次</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
