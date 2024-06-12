import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { FileCog, LogOut, MenuIcon, Settings2, SlidersHorizontal } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuthContext } from '@/store/auth';
import { MenuItem } from '@/types/menu/menu';

interface NavbarProps {
    menuItems: MenuItem[]
}


const Navbar: React.FC<NavbarProps> = ({ menuItems }) => {
    const location = useLocation();
    const { session, setSessionStorage } = useAuthContext()
    const isItemActive = (itemPath: string) => {
        return location.pathname === itemPath || location.pathname.startsWith(itemPath + '/');
    };

    const handleLogout = () => {
        setSessionStorage(JSON.stringify({
            status: "unauthenticated",
            data: {
                token: "",
                expired_at: 0,
                user_info: {
                    username: '',
                    role: ''
                }
            }
        }))
        window.location.href = '/'
    }

    return (
        <div className="bg-gray-100 p-4 px-10 flex justify-between items-center">
            <div className='text-white hidden md:block'>
                <img src="/image/logo.png" alt="Jasamarga " className="h-[46px] w-auto" />
            </div>

            <div className='w-full px-10 hidden lg:block md:block'>
                <NavigationMenu className='justify-start'>
                    <NavigationMenuList>
                        {
                            menuItems.map((item) => (
                                <NavLink
                                    to={item.to}
                                    key={item.id}
                                    className={`
                                        transition-transform py-2 px-3 flex items-center mb-1 ${isItemActive(item.to) ?
                                            ' border-b-2 border-gray-500 text-black' : 'hover:text-gray-700 rounded-2xl'} ${isItemActive(item.to) ?
                                                '' : 'hover:translate-x-0.5'}`}
                                >
                                    <span>{item.label}</span>
                                </NavLink>
                            ))
                        }
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <NavigationMenu className='md:hidden'>
                <NavigationMenuList className="flex items-center gap-2">
                    <Sheet>
                        <SheetTrigger className="text-black">
                            <MenuIcon />
                        </SheetTrigger>
                        <SheetContent side={'left'} className='bg-gray-100'>
                            <SheetHeader>
                                <div>
                                    <img src="/image/logo.png" alt="Jasamarga " className="h-[40px] w-auto mb-4" />
                                </div>
                            </SheetHeader>
                            <NavigationMenuItem style={{ listStyle: 'none' }} className='mt-5'>
                                {
                                    menuItems.map((item) => {
                                        return (
                                            <SheetClose asChild key={item.id}>
                                                <NavLink
                                                    className={`transition-transform py-2 px-3 flex items-center text-black ${isItemActive(item.to) ? 'bg-yellow-400 rounded-2xl' : 'hover:bg-gray-700 rounded-2xl'
                                                        } ${isItemActive(item.to) ? '' : 'hover:translate-x-0.5'}`}
                                                    to={item.to}
                                                >
                                                    <span className="mr-3">{item.icon}</span>
                                                    {item.label}
                                                </NavLink>
                                            </SheetClose>
                                        )
                                    })
                                }
                            </NavigationMenuItem>
                        </SheetContent>
                    </Sheet>
                </NavigationMenuList>
            </NavigationMenu>

            <div className='flex justify-between lg:w-[6%] sm:w-[20%] md:w-[10%]'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center text-black'>
                        <img
                            className="w-8 h-8 rounded-full"
                            src="https://avatars.githubusercontent.com/u/124599?v=4"
                            alt="User Profile"
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-[200px] bg-white'>
                        <DropdownMenuLabel>
                            <div>
                                <p>{session.data.user_info.role}</p>
                                <p className="text-xs font-light">{session.data.user_info.username}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <NavLink to={'/'} onClick={() => handleLogout()}>
                                <div className='ml-3'>
                                    <div className="flex items-center">
                                        <LogOut className="mr-3" size={15} />Logout
                                    </div>
                                </div>
                            </NavLink>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center text-black'>
                        <SlidersHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-[200px] bg-white'>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <NavLink to={'/'} onClick={() => handleLogout()}>
                                <div className='ml-3'>
                                    <div className="flex items-center">
                                        <Settings2 className="mr-3" size={15} /> Setting
                                    </div>
                                </div>
                                <div className='ml-3 mt-3'>
                                    <div className="flex items-center">
                                        <FileCog className="mr-3" size={15} /> Setting
                                    </div>
                                </div>
                            </NavLink>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        </div>
    );
};

export default Navbar;