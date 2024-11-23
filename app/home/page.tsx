'use client'

export default function Home() {
  return <main className="p-4">
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">AI心理助手Zoe</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-2 border-dashed border-gray-200 rounded-lg h-96 p-6">
              <h2 className="text-2xl font-semibold mb-4">欢迎来到Zoe Chat</h2>
              <p className="text-gray-600 mb-6">
                Zoe Chat是一个由AI驱动的心理健康助手,可以通过聊天和心理测试的方式为您提供心理咨询、心理科普等服务。
              </p>
              <div className="space-x-4">
                <a
                  href="/chat"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  开始聊天
                </a>
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  了解更多
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white fixed bottom-0 w-full">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">&copy; 2023 Zoe Chat. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </main>
}


// // pages/dashboard.tsx
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { useAuth } from '../hooks/useAuth';

// const DashboardPage = () => {
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) {
//       // 未登录，重定向到登录页面
//       router.push('/login');
//     }
//   }, [user, router]);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     // 仪表盘内容 JSX
//     // ...
//   );
// };

// export default DashboardPage;