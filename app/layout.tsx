"use client"
import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'react-hot-toast'
import { Header } from '@/components/Header'
import { useIp } from '@/hooks/useIp';
import ThemesProvider from '@/providers/ThemesProvider'
import '@/styles/globals.scss'
import '@/styles/theme-config.css'


interface LogLayoutProps {
  children: React.ReactNode;
}

const LogLayout: React.FC<LogLayoutProps> = ({ children }) => {
  const { ipInfo, loading } = useIp();

  useEffect(() => {
    const logAccess = async () => {
      if (loading || !ipInfo) return;

      const logData = {
        path: window.location.pathname,
        method: 'GET',
        status_code: 200,
        ip: ipInfo.ip,
        user_agent: navigator.userAgent,
        referer_url: document.referrer,
        duration: 100,
        query_params: window.location.search,
        country: ipInfo.country,
        region: ipInfo.region,
        city: ipInfo.city
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
  }, [ipInfo, loading]);

  return (
    <div>
      {children}
    </div>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <>{children}</>;
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ThemesProvider>
          <LogLayout>
            <Header />
            <Layout>
              {children}
            </Layout>
            <Toaster />
          </LogLayout>
        </ThemesProvider>
        <Analytics />
      </body>
    </html>
  )
}
