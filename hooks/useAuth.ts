// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = '/be/api';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuth = (): AuthState => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
            checkLoginStatus(token);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
            const { id, name, email: userEmail, token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({ id, name, email: userEmail }));
            setUser({ id, name, email: userEmail });
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
        localStorage.removeItem('user');
        setUser(null);
    };

    const checkLoginStatus = async (token: string) => {
        try {
            await axios.get(`${API_BASE_URL}/check`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            console.error('检查登录状态失败', error);
            logout();
        }
    };

    return { user, login, register, logout };
};
