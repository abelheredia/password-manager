import { Button, Typography, Card, Alert } from 'antd';
import { TextField } from '../../components';
import { useAuth } from '../../hooks';

const { Title, Text } = Typography;

export const Register = () => {
  const {
    handleGoToLogin,
    registerForm,
    handleRegister,
    loading,
    showAlert,
    alert
  } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-[450px] shadow-lg border-none">
        <div className="flex flex-col items-center mb-6">
          <Title level={2} className="m-0 text-center">
            Crear Cuenta
          </Title>
          <Text type="secondary">
            Únete para gestionar tus contraseñas de forma segura
          </Text>
        </div>

        <form className="flex flex-col gap-3">
          <TextField hookForm={registerForm} name="nombre" label="Nombre" />
          <TextField hookForm={registerForm} name="apellido" label="Apellido" />
          <TextField
            hookForm={registerForm}
            name="username"
            label="Nombre de Usuario"
          />
          <TextField
            hookForm={registerForm}
            name="email"
            label="Correo Electrónico"
          />
          <TextField
            hookForm={registerForm}
            name="password"
            label="Contraseña"
          />

          <Button
            type="primary"
            size="large"
            className="w-full mt-4 bg-blue-600"
            onClick={handleRegister}
            loading={loading}
          >
            Registrarse
          </Button>

          <div className="text-center mt-4">
            <Text type="secondary">¿Ya tienes cuenta? </Text>
            <Button type="link" className="p-0" onClick={handleGoToLogin}>
              Inicia sesión
            </Button>
          </div>
        </form>
      </Card>
      {showAlert && (
        <Alert
          message={alert.message}
          type={alert.type}
          style={{ position: 'absolute', bottom: 50 }}
        />
      )}
    </div>
  );
};
