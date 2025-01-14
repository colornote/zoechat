"use client"
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'react-hot-toast'
import { Header } from '@/components/Header'
import ThemesProvider from '@/providers/ThemesProvider'
import '@/styles/globals.scss'
import '@/styles/theme-config.css'
import { useEffect } from 'react';
import { metadata } from './metadata';

const LogLayout = ({ children }) => {
  useEffect(() => {
    const logAccess = async () => {
      const logData = {
        path: window.location.pathname,
        method: 'GET',
        status_code: 200,
        ip: '192.168.1.1', // 这里可以使用实际的 IP 地址
        user_agent: navigator.userAgent,
        referer_url: document.referrer,
        duration: 100, // 这里可以计算实际的访问时长
        query_params: window.location.search,
        country: 'China',
        region: 'Beijing',
        city: 'Beijing'
      };

      try {
        await fetch('/be/api/logs/push', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(logData)
        });
      } catch (error) {
        console.error('记录访问日志失败:', error);
      }
    };

    const intervalId = setInterval(logAccess, 60000); // 每分钟记录一次

    return () => clearInterval(intervalId); // 清理定时器
  }, []);

  return <>{children}</>;
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemesProvider>
          <LogLayout>
            <Header />
            {children}
            <Toaster />
          </LogLayout>
        </ThemesProvider>
        <Analytics />
      </body>
    </html>
  )
}
