# Password Manager

Aplicación web para gestionar contraseñas de forma centralizada. Permite registrar, visualizar, editar, eliminar y copiar credenciales de distintos servicios, con autenticación de usuario y rutas protegidas.

## Tecnologías

| Tecnología            | Uso                           |
| --------------------- | ----------------------------- |
| React 18 + TypeScript | Framework principal           |
| Zustand               | Manejo de estado global       |
| Ant Design            | Componentes de UI             |
| Tailwind CSS          | Estilos utilitarios           |
| React Router DOM v6   | Navegación y rutas protegidas |
| React Hook Form + Yup | Formularios y validación      |
| Axios                 | Comunicación con la API       |

## Requisitos

- Node.js >= 16
- npm o yarn
- API backend disponible (configura la URL base en `src/api.ts`)

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd password-manager

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start
```

## Scripts disponibles

| Comando         | Descripción                      |
| --------------- | -------------------------------- |
| `npm start`     | Inicia el servidor de desarrollo |
| `npm run build` | Genera la build de producción    |
| `npm test`      | Ejecuta los tests                |
| `npm run eject` | Expone la configuración de CRA   |

## Rutas

| Ruta            | Descripción                                       |
| --------------- | ------------------------------------------------- |
| `/login`        | Inicio de sesión                                  |
| `/registro`     | Registro de nuevo usuario                         |
| `/recuperacion` | Recuperación de contraseña                        |
| `/passwords`    | Gestión de contraseñas _(requiere autenticación)_ |

## Estructura del proyecto

```
src/
├── adapters/       # Transformadores de datos (API → modelo interno)
├── components/     # Componentes reutilizables (TextField, TextArea, ProtectedRoute)
├── constants/      # Constantes globales (rutas, columnas de tabla)
├── hooks/          # Custom hooks (autenticación, contraseñas, alertas)
├── pages/          # Páginas de la aplicación
│   ├── auth/       # Login, Register, ForgotPassword
│   └── passwords/  # Listado y gestión de contraseñas
├── router/         # Configuración de rutas
├── schemas/        # Esquemas de validación Yup
├── services/       # Llamadas a la API REST
├── stores/         # Stores de Zustand (auth, passwords)
└── types/          # Tipos e interfaces TypeScript
```

## Funcionalidades

- **Autenticación**: login, registro y recuperación de contraseña con JWT.
- **Rutas protegidas**: acceso a `/passwords` solo con sesión activa.
- **CRUD de contraseñas**: crear, listar, editar y eliminar entradas.
- **Búsqueda**: filtrar contraseñas por descripción.
- **Copiar al portapapeles**: copia rápida de la contraseña de una entrada.
- **Lazy loading**: carga diferida de páginas para mejor rendimiento.

## Ejemplo de payload para la API

```json
{
  "passwords": [
    {
      "description": "netflix",
      "user": "usuario@email.com",
      "email": "usuario@email.com",
      "password": "MiContraseña123"
    }
  ]
}
```
