import React from 'react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { NavLink, useLocation } from 'react-router-dom';
import { useLayoutContext } from '../../store/layout/index';

interface SidebarProps {
  menuItems: MenuItem[];
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  to: string;
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  const location = useLocation();
  const { isCollapse } = useLayoutContext();
  const isItemActive = (itemPath: string) => {
    return location.pathname === itemPath || location.pathname.startsWith(itemPath + '/');
  };

  return (
    <NavigationMenu className={`bg-gray-800 md:p-4 py-7 px-10 md:block text-white transform p-4 hidden duration-300 h-screen sticky top-0 ${isCollapse ? 'w-[unset]' : 'w-[250px]'} transition-all ease-in-out`}>
      <div className={`flex justify-center items-center h-[50px] mt-5 ${isCollapse ? 'ease-in-out duration-300' : ''}`}>
        {
          isCollapse ?
            <img src="/image/logo-icon.png" alt="Jasamarga " className={`h-[45px] w-auto mb-4 transition-all ease-in-out`} />
            :
            <img src="/image/logo.png" alt="Jasamarga " className={`h-[64px] w-auto mb-4 transition-all ease-in-out`} />
        }
      </div>
      <NavigationMenuList className={`block mt-10 ${isCollapse ? 'w-[unset]' : 'w-[250px]'} ease-in-out duration-300`}>
        <div>
          <NavigationMenuItem>
            {menuItems.map((item) => (
              <NavLink
                className={`transition-transform py-2 px-3 flex items-center mb-1 ${isItemActive(item.to) ? 'bg-yellow-400 rounded-2xl text-black' : 'hover:bg-gray-700 rounded-2xl'} ${isItemActive(item.to) ? '' : 'hover:translate-x-0.5'}`}
                to={item.to}
                key={item.id}
              >
                <span className="mr-3">{item.icon}</span>
                {!isCollapse && item.label}
              </NavLink>
            ))}
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Sidebar;