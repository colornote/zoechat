'use client';

import React, { useState } from 'react';
import * as Label from '@radix-ui/react-label';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await login(email, password);
            alert('登录成功'); // Show alert on successful login
            window.location.href = '/';
        } catch (error) {
            console.error('登录失败', error);
            alert('登录失败，请检查您的邮箱和密码'); // Show alert on login failure
        }
    };

    return (
        <div className="min-h-screen bg-pink-50 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-center text-pink-900">登录</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label.Root htmlFor="email" className="block text-sm font-medium text-pink-800">
                            邮箱
                        </Label.Root>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-pink-200 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-6">
                        <Label.Root htmlFor="password" className="block text-sm font-medium text-pink-800">
                            密码
                        </Label.Root>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-pink-200 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#cc8d88] hover:bg-[#b47e79] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#cc8d88]"
                    >
                        登录
                    </button>
                </form>
                <p className="mt-8 text-center text-sm text-gray-500">
                    还没有账号?{' '}
                    <a href="/register" className="font-medium text-[#cc8d88] hover:text-[#b47e79]">
                        注册
                    </a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
