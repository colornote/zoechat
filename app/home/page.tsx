'use client'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-gradient-to-r from-[#cc8d88] to-[#d4a5a1] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">AI心理助手Spark</h1>
          <p className="mt-2 text-pink-50">您的专属心理健康伙伴</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          {/* Decorative elements */}
          <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 text-[#cc8d88] opacity-20">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22c6.627 0 12-5.373 12-12S18.627-2 12-2 0 3.373 0 10s5.373 12 12 12zm0-3a9 9 0 110-18 9 9 0 010 18zM7.5 8.5c0-1.105.672-2 1.5-2s1.5.895 1.5 2S9.828 10.5 9 10.5s-1.5-.895-1.5-2zm6 0c0-1.105.672-2 1.5-2s1.5.895 1.5 2-.672 2-1.5 2-1.5-.895-1.5-2zm-7.021 4.149a.5.5 0 01.707-.707c1.414 1.414 3.314 2.207 5.314 2.207s3.9-.793 5.314-2.207a.5.5 0 01.707.707c-1.607 1.607-3.714 2.5-6.021 2.5s-4.414-.893-6.021-2.5z"/>
            </svg>
          </div>
          <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 text-[#cc8d88] opacity-20">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            让心理健康触手可及
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            无论何时何地，Spark都在这里倾听您的心声，为您提供专业的心理支持
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 relative">
          {/* Decorative floating elements */}
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-[#cc8d88] opacity-10">
            <svg className="w-16 h-16 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313-12.454z"/>
            </svg>
          </div>
          <div className="absolute -right-8 top-1/3 -translate-y-1/2 text-[#cc8d88] opacity-10">
            <svg className="w-20 h-20 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="size-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="size-6 text-[#cc8d88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">智能对话</h3>
            <p className="text-gray-600">随时随地与AI助手展开对话，获得心理支持和建议</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="size-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="size-6 text-[#cc8d88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">心理测评</h3>
            <p className="text-gray-600">专业的心理测试工具，帮助您更好地了解自己</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="size-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="size-6 text-[#cc8d88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">心理科普</h3>
            <p className="text-gray-600">获取专业的心理健康知识和自我提升建议</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-pink-50 rounded-2xl p-8 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute left-4 bottom-4 text-[#cc8d88] opacity-10">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </div>
          <div className="absolute right-4 top-4 text-[#cc8d88] opacity-10">
            <svg className="w-16 h-16 animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 100-16 8 8 0 000 16z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">准备好开始您的心理健康之旅了吗？</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            立即开始与Spark对话，探索更好的自己
          </p>
          <div className="space-x-4">
            <a
              href="/chat"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-[#cc8d88] hover:bg-[#b47e79] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#cc8d88] transition-colors"
            >
              开始对话
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-[#cc8d88] bg-pink-100 hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#cc8d88] transition-colors"
            >
              了解更多
            </a>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">&copy; 2024 Sparks Zone. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}