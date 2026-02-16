import { Button, Typography, Card, Alert } from 'antd';
import { TextField } from '../../components';
import { useAuth } from '../../hooks';
const { Title, Text } = Typography;

export const Login = () => {
  const {
    handleGoToRegister,
    handleGoToForgotPassword,
    loginForm,
    handleLogin,
    loading,
    alert,
    showAlert
  } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-[400px] shadow-lg border-none">
        <div className="flex flex-col items-center mb-8">
          <Title level={2} className="m-0">
            Bienvenido
          </Title>
          <Text type="secondary">Ingresa tus credenciales para continuar</Text>
        </div>

        <form className="flex flex-col gap-4">
          <TextField
            hookForm={loginForm}
            name="email"
            label="Correo Electrónico"
          />

          <div className="flex flex-col gap-1">
            <TextField
              hookForm={loginForm}
              name="password"
              label="Contraseña"
              type="password"
            />
            <div className="text-right">
              <Button
                type="link"
                className="p-0 text-xs"
                onClick={handleGoToForgotPassword}
              >
                ¿Olvidaste tu contraseña?
              </Button>
            </div>
          </div>

          <Button
            type="primary"
            size="large"
            className="w-full mt-4 bg-blue-600"
            onClick={handleLogin}
            loading={loading}
          >
            Iniciar Sesión
          </Button>

          <div className="text-center mt-6">
            <Text type="secondary">¿No tienes una cuenta? </Text>
            <Button type="link" className="p-0" onClick={handleGoToRegister}>
              Regístrate aquí
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
