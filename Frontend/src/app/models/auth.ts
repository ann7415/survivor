export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role?: 'Visitor'|'Startup'|'Admin';
}

export interface LoginResponse {
  token: string;
}

export interface AuthResponse {
  token?: string;
  message: string;
  success?: boolean;
}

export interface LoginResponse extends AuthResponse {
  token: string;
}
