// types/menu.ts
import { ReactElement, ReactNode } from 'react';

export interface MenuItem {
  name: string;
  icon: ReactElement;
  path?: string;
  submenu?: SubMenuItem[];
}

export interface SubMenuItem {
  name: string;
  path: string;
  icon: ReactElement;
}