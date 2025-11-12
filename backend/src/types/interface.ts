export interface SignupPayload {
    email: string;
    password: string;
    fullName: string;
    organizationId?: string;
}

export interface LoginPayload {
    email: string,
    password: string
}