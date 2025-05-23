import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:flex lg:flex-col items-center justify-center bg-[#5060D8] text-center">
        <span className="text-white font-bold text-9xl">Password Manager</span>
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <Outlet />
      </div>
    </div>
  );
};
