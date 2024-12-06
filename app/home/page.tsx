'use client'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight">AI心理助手Spark</h1>
          <p className="mt-2 text-indigo-100">您的专属心理健康伙伴</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            让心理健康触手可及
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            无论何时何地，Spark都在这里倾听您的心声，为您提供专业的心理支持
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="size-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="size-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">智能对话</h3>
            <p className="text-gray-600">随时随地与AI助手展开对话，获得心理支持和建议</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="size-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="size-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">心理测评</h3>
            <p className="text-gray-600">专业的心理测试工具，帮助您更好地了解自己</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="size-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="size-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">心理科普</h3>
            <p className="text-gray-600">获取专业的心理健康知识和自我提升建议</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">准备好开始您的心理健康之旅了吗？</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            立即开始与Spark对话，探索更好的自己
          </p>
          <div className="space-x-4">
            <a
              href="/chat"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              开始对话
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
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