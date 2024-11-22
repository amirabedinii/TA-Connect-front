export interface SignUpCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface LoginResponse {
  refresh: string;
  access: string;
}

export interface AuthError {
  message: string;
  status: number;
}
