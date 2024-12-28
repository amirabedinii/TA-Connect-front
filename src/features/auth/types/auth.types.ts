export interface SignUpCredentials {
  first_name: string;
  last_name: string;
  username: string;
  student_number: string;
  password: string;
  password_confirmation: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface LoginResponse {
  refresh: string;
  access: string;
}

export interface AuthError {
  message: string;
  status: number;
}
