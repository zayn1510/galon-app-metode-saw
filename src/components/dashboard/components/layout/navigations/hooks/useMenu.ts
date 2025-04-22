// hooks/useMenu.ts
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MenuItem } from '@/types/menu';
import { menuItems } from '../constants/menuItems';


interface UseMenuReturn {
  menuItems: MenuItem[];
  activeMenu: string;
  openSubmenu: string | null;
  toggleSubmenu: (menuName: string) => void;
}

export const useMenu = (): UseMenuReturn => {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string>(pathname);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    setActiveMenu(pathname);
    const currentSubmenu = menuItems.find(item => 
      item.submenu?.some(sub => sub.path === pathname)
    );
    if (currentSubmenu) {
      setOpenSubmenu(currentSubmenu.name);
    }
  }, [pathname]);

  const toggleSubmenu = (menuName: string) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  return {
    menuItems,
    activeMenu,
    openSubmenu,
    toggleSubmenu
  };
};