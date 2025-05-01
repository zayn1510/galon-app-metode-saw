import { MenuItem } from '@/types/menu';
import {
    LayoutDashboard,
    Folder,
    File,
    Users,
    MapPin,
    Package,
    Settings,
  } from 'lucide-react';

  
  export const menuItems: MenuItem[] = [
    { 
      name: 'Dashboard', 
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/dashboard' 
    },
    { 
      name: 'Data Master', 
      icon: <Folder className="w-5 h-5" />,
      submenu: [
        { 
          name: 'Data Kriteria', 
          path: '/dashboard/kriteria',
          icon: <File className="w-4 h-4" />
        },
        { 
          name: 'Data Kecamatan', 
          path: '/dashboard/kecamatan',
          icon: <MapPin className="w-4 h-4" />
        },
        { 
          name: 'Data Depot', 
          path: '/dashboard/depot',
          icon: <Package className="w-4 h-4" />
        },
        { 
          name: 'Data User', 
          path: '/dashboard/users',
          icon: <Users className="w-4 h-4" />
        },
      
      ]
    },

    { 
      name: 'Pengaturan Akun', 
      icon: <Settings className="w-5 h-5" />,
      path: '/dashboard/profil' 
    },
  ];