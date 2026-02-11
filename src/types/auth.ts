export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  mensaje: string;
  token: string;
  usuario: {
    id: number;
    username: string;
  };
}

export interface Profile {
  id: number;
  username: string;
  iat: number;
  exp: number;
}

export interface ForgotPasswordData {
  email: string;
}
