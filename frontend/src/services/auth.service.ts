import axios from 'axios';
import type { LoginRequest, SignupRequest, AuthResponse } from '@/types/auth.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost';
const API_PORT = import.meta.env.VITE_API_PORT || 5000;

export const authService = {
    async login(data: LoginRequest): Promise<AuthResponse> {
        try {
            const response = await axios.post(`${API_URL}:${API_PORT}/auth/login`, data);

            // Sauvegarder le token
            if (response.data.success) {
                localStorage.setItem('access_token', response.data.data.session.access_token);
                localStorage.setItem('refresh_token', response.data.data.session.refresh_token);
            }

            return response.data;
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.error || 'Erreur de connexion'
            };
        }
    },

    async signup(data: SignupRequest): Promise<AuthResponse> {
        try {
            const response = await axios.post(`${API_URL}:${API_PORT}/api/auth/register`, data);

            return {
                data: response.data,
                success: true,
                message: response.data.data.message
            };

        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.error || "Erreur d'inscription"
            };
        }
    },

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
};
