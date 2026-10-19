import { Typography } from 'antd';
const { Title } = Typography;
import { Profile } from './Profile';

export const Head = () => {
  return (
    <div className="flex justify-between items-center mb-3 w-full gap-2">
      <Title level={4}>Password Manager 🔐</Title>
      <Profile />
    </div>
  );
};
