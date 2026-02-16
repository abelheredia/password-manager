export interface Password {
  id: number;
  description: string;
  user: string;
  email?: string;
  password: string;
  main: number;
}

export interface PasswordResponse {
  id: number;
  descripcion: string;
  usuario: string;
  usuario_id: number;
  email_servicio: string;
  password: string;
  main: number;
}
