export interface UserProfile {
    id: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    roles?: string[];
    emailVerified?: boolean;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: UserProfile | null;
    loading: boolean;
}
