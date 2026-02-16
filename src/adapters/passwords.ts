import { Password, PasswordResponse } from '../types';

export const passwordAdapter = (data: PasswordResponse[]): Password[] => {
  return data.map((item: PasswordResponse) => ({
    id: item.id,
    description: item.descripcion,
    user: item.usuario,
    email: item.email_servicio,
    password: item.password,
    main: item.main
  }));
};
