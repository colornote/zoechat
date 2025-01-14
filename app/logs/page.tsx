'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '../AdminLayout';

interface Log {
  id: number
  ip: string
  user_agent: string
  path: string
  method: string
  status_code: number
  referer_url: string
  user_id: number
  username: string
  duration: number
  query_params: string
  country: string
  region: string
  city: string
  created_at: string
  updated_at: string
}

export default function LogListPage() {
  const router = useRouter()
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)

  useEffect(() => {
    fetchLogs()
  }, [page])

  const fetchLogs = async () => {
    try {
      const response = await fetch(`/be/api/logs?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch logs')
      const data = await response.json()
      setLogs(data.logs)
    } catch (error) {
      console.error('获取访问日志失败:', error)
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
        <h1 className="text-3xl font-bold mb-4 text-center">访问日志管理</h1>
        <ul className="space-y-4">
          {logs.map((log) => (
            <li key={log.id} className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <p><strong>路径:</strong> {log.path}</p>
                  <p><strong>方法:</strong> {log.method}</p>
                  <p><strong>状态码:</strong> {log.status_code}</p>
                  <p><strong>IP:</strong> {log.ip}</p>
                  <p><strong>用户:</strong> {log.username}</p>
                  <p><strong>创建于:</strong> {new Date(log.created_at).toLocaleString()}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  )
}
