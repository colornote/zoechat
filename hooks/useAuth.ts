// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = '/be/api';
const AUTH_BASE_URL = `${API_BASE_URL}/auth`;

interface User {
    id: number;
    email: string;
    username: string;
    is_admin: boolean;
    avatar: string;
    created_at: string;
    updated_at: string;
}

interface AuthState {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
    updateUsername: (username: string) => Promise<void>;
    updateAvatar: (file: File) => Promise<void>;
    getCurrentUser: () => Promise<void>;
}

export const useAuth = (): AuthState => {
    const [user, setUser] = useState<User | null>(null);

    const getCurrentUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const response = await axios.get(`${AUTH_BASE_URL}/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data.user);
        } catch (error) {
            console.error('获取用户信息失败', error);
            logout();
            throw error;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getCurrentUser();
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            await getCurrentUser();
        } catch (error) {
            console.error('登录失败', error);
            throw error;
        }
    };

    const register = async (email: string, password: string) => {
        try {
            await axios.post(`${API_BASE_URL}/register`, { email, password });
        } catch (error) {
            console.error('注册失败', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const updateUsername = async (username: string) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('未登录');

            const response = await axios.put(
                `${AUTH_BASE_URL}/username`,
                { username },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setUser(response.data.user);
        } catch (error) {
            console.error('更新用户名失败', error);
            throw error;
        }
    };

    const updateAvatar = async (file: File) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('未登录');

            const formData = new FormData();
            formData.append('avatar', file);

            const response = await axios.post(
                `${AUTH_BASE_URL}/avatar`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            setUser(response.data.user);
        } catch (error) {
            console.error('更新头像失败', error);
            throw error;
        }
    };

    return { user, login, register, logout, updateUsername, updateAvatar, getCurrentUser };
};
