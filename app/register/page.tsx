'use client';

// RegistrationPage.js

import React, { useState } from 'react';
import * as Label from '@radix-ui/react-label';

function RegistrationPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 在这里处理登录逻辑,例如调用API
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-center">注册</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label.Root htmlFor="email" className="block text-sm font-medium text-gray-700">
                            邮箱
                        </Label.Root>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <Label.Root htmlFor="password" className="block text-sm font-medium text-gray-700">
                            密码
                        </Label.Root>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-6">
                        <Label.Root htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            确认密码
                        </Label.Root>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        注册
                    </button>
                </form>
                <p className="mt-8 text-center text-sm text-gray-500">
                    已有账号?
                    <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        登录
                    </a>
                </p>
            </div>
        </div>
    );
}

export default RegistrationPage;

