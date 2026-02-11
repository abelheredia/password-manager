import { Button, Typography, Card } from 'antd';
import { TextField } from '../../components';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks';

const { Title, Text } = Typography;

export const ForgotPassword = () => {
  const { handleGoToLogin, forgotForm } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-[400px] shadow-lg border-none">
        <div className="mb-6">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            className="mb-4 p-0 flex items-center gap-1 text-gray-500"
            onClick={handleGoToLogin}
          >
            Volver
          </Button>
          <Title level={3} className="m-0">
            Recuperar Contraseña
          </Title>
          <Text type="secondary">
            Ingresa tu correo y te enviaremos instrucciones para restablecer tu
            acceso.
          </Text>
        </div>

        <form className="flex flex-col gap-5">
          <TextField
            hookForm={forgotForm}
            name="email"
            label="Correo Electrónico de recuperación"
          />

          <Button type="primary" size="large" className="w-full bg-blue-600">
            Enviar
          </Button>
        </form>
      </Card>
    </div>
  );
};
