import { useAuth } from '../hooks';
import { Typography, Button } from 'antd';
const { Title } = Typography;

export const Head = () => {
  const { profile, handleLogout } = useAuth();

  return (
    <div className="flex justify-between items-center mb-3 w-full">
      <Title level={2}>{profile.username} 🙂</Title>
      <Button color="red" variant="solid" onClick={handleLogout}>
        Cerrar Sesión
      </Button>
    </div>
  );
};
