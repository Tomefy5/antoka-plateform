export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    email: string;
    password: string;
    passwordConfirm: string;
    fullName: string;
}

export interface AuthResponse {
    success: boolean;
    data?: {
        user: {
            id: string;
            email: string;
            full_name: string;
        };
        session: {
            access_token: string;
            refresh_token: string;
        };
    };
    message?: string;
    error?: string;
}
