import Navbar from './navbar';
import { Outlet } from 'react-router-dom';
import { LayoutProvider } from '@/store/layout';
import { useAuthContext } from '@/store/auth';
import { useEffect } from 'react';
import { LayoutDashboardIcon, Map } from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboardIcon />, to: '/dashboard/home' },
  { id: 'master-data', label: 'Master Data', icon: <Map />, to: '/dashboard/master-data' },
  
];

export const LayoutDashboard: React.FC = () => {
  const { session } = useAuthContext()

  useEffect(() => {
    if (session && session.status !== "authenticated") {
      // window.location.href = '/'
    }
  }, [])

  return (
    <LayoutProvider>
      <div className="flex">
        <div className="flex-1 overflow-y-auto">
          <div className="sticky top-0 z-10">
            <Navbar menuItems={menuItems} />
          </div>
          <div className="md:container px-2 m-auto py-8 max-w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </LayoutProvider>
  );
};