import { Avatar, Button } from 'antd';

import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks';

export const Profile = () => {
  const { handleLogout } = useAuth();

  return (
    <div className="flex min-w-0 max-w-full items-center gap-2">
      <Avatar icon={<UserOutlined />} size="large" />
      <Button
        color="magenta"
        variant="outlined"
        onClick={handleLogout}
        size="large"
        icon={<PoweroffOutlined />}
      />
    </div>
  );
};
